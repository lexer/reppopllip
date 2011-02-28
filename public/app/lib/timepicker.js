Ext.TimePicker = Ext.extend(Ext.Picker, {
    hourText: 'Hour',
    minuteText: 'Minute',
    ampmText: 'AM/PM',
    slotOrder: ['hour', 'minute', 'ampm'],

    initComponent: function() {
        var hours = [],
                minutes = [],
                ampm = []

        for (i = 0; i < 12; i++) {
            hours.push({
                text: i + 1,
                value: i + 1
            });
        }

        for (i = 0; i < 59; i++) {
            minutes.push({
                text: i + 1,
                value: i + 1
            });
        }

        ampm.push({text:"am",value:"am"});
        ampm.push({text:"pm",value:"pm"});

        this.slots = [];

        this.slotOrder.forEach(function(item) {
            this.slots.push(this.createSlot(item, hours, minutes, ampm));
        }, this);

        Ext.TimePicker.superclass.initComponent.call(this);
    },

    afterRender: function() {
        Ext.TimePicker.superclass.afterRender.apply(this, arguments);

        this.setValue(this.value);
    },

    createSlot: function(name, hours, minutes, ampm) {
        switch (name) {
            case 'hour':
                return {
                    name: 'hour',
                    align: 'center',
                    data: hours,
                    title: this.useTitles ? this.hourText : false,
                    flex: 3
                };
            case 'minute':
                return {
                    name: 'minute',
                    align: 'right',
                    data: minutes,
                    title: this.useTitles ? this.minuteText : false,
                    flex: 4
                };
            case 'ampm':
                return {
                    name: 'ampm',
                    align: 'center',
                    data: ampm,
                    title: this.useTitles ? this.ampmText : false,
                    flex: 2
                };
        }
    },

    onSlotPick: function(slot, value) {
//        var name = slot.name,
//                date, daysInMonth, daySlot;
//
//        if (name === "month" || name === "year") {
//            daySlot = this.child('[name=day]');
//            date = this.getValue();
//            daysInMonth = this.getDaysInMonth(date.getMonth() + 1, date.getFullYear());
//            daySlot.store.clearFilter();
//            daySlot.store.filter({
//                fn: function(r) {
//                    return r.get('extra') === true || r.get('value') <= daysInMonth;
//                }
//            });
//            daySlot.scroller.updateBoundary(true);
//        }

        Ext.DatePicker.superclass.onSlotPick.apply(this, arguments);
    },



    getValue: function() {
        var value = Ext.TimePicker.superclass.getValue.call(this);

        var hour = value.hour;
        var minute = value.minute;
        var ampm = value.ampm;

        if (ampm == "am") {
            if (hour == 12) {
                hour = 0;
            }
        } else {
            if (hour < 12) {
                hour = hour + 12;
            }
        }

        return new Date(1970, 0, 0, hour, minute);
    },



    setValue: function(value, animated) {
        if (!Ext.isDate(value) && !Ext.isObject(value)) {
            value = null;
        }


        if (Ext.isDate(value)) {

            var hour = value.getHours();
            var ampm = "am";

            if (hour == 0) {
                hour = 12;
            } else if (hour >= 12) {
                ampm = "pm"
                if (hour > 12) {
                    hour = hour - 12;
                }
            }

            this.value = {
                hour : hour,
                minute: value.getMinutes(),
                ampm: ampm
            };
        } else {
            this.value = value;
        }

        return Ext.TimePicker.superclass.setValue.call(this, this.value, animated);
    }

});

Ext.reg('timepicker', Ext.TimePicker);

Ext.form.TimePicker = Ext.extend(Ext.form.Field, {
    ui: 'select',



    picker: null,


    destroyPickerOnHide: false,

    initComponent: function() {
        this.addEvents(

        /**
         * @event change
         * Fires when a date is selected
         * @param {Ext.form.DatePicker} this
         * @param {Date} date The new date
         */
                'select'
                );

        this.tabIndex = -1;
        this.useMask = true;

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },



    getTimePicker: function() {
        if (!this.timePicker) {
            if (this.picker instanceof Ext.TimePicker) {
                this.timePicker = this.picker;
            } else {
                this.timePicker = new Ext.TimePicker(Ext.apply(this.picker || {}));
            }

            this.timePicker.setValue(this.value || null);

            this.timePicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.timePicker;
    },

    onMaskTap: function() {
        if (Ext.form.TimePicker.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }

        this.getTimePicker().show();
    },

    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('select', this, this.getValue());
    },

    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.timePicker) {
            this.timePicker.destroy();
        }
    },

    setValue: function(value, animated) {
        if (this.timePicker) {
            this.timePicker.setValue(value, animated);
            this.value = (value != null) ? this.timePicker.getValue() : null;
        } else {
            if (!Ext.isDate(value) && !Ext.isObject(value)) {
                value = null;
            }

            if (Ext.isObject(value)) {
                this.value = new Date(value.year, value.month - 1, value.day);
            } else {
                this.value = value;
            }
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }

        return this;
    },

    getValue: function(format) {
        var value = this.value || null;
        return (format && Ext.isDate(value)) ? value.format("h:i A") : value;
    },

    onDestroy: function() {
        if (this.timePicker) {
            this.timePicker.destroy();
        }

        Ext.form.TimePicker.superclass.onDestroy.call(this);
    }
});

Ext.reg('timepickerfield', Ext.form.TimePicker);
