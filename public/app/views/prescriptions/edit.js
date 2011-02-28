app.views.PrescriptionsEdit = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'Add prescription',
            items: [
                {
                    id: 'cancel_edit_prescription',
                    text: 'Cancel',
                    ui: 'back',
                    listeners: {
                        'tap': function () {
                            if (this.record.getId()) {
                                Ext.dispatch({
                                    controller: app.controllers.prescriptions,
                                    action: 'show',
                                    id: this.record.getId(),
                                    animation: {type:'slide', direction:'right'}
                                });
                            } else {
                                Ext.dispatch({
                                    controller: app.controllers.prescriptions,
                                    action: 'index',
                                    animation: {type:'slide', direction:'right'}
                                });
                            }
                        }
                    }
                },
                {xtype:'spacer'},
                {
                    id: 'save_prescription',
                    text: 'Save',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            this.form.updateRecord(this.record, true);

                            if (this.record.getId()) {
                                Ext.dispatch({
                                    controller: app.controllers.prescriptions,
                                    action: 'update',
                                    prescription: this.record,
                                    animation: {type:'slide', direction:'right'}
                                });
                            } else {
                                Ext.dispatch({
                                    controller: app.controllers.prescriptions,
                                    action: 'create',
                                    prescription: this.record,
                                    animation: {type:'slide', direction:'right'}
                                });
                            }
                        }
                    }
                }
            ]
        }
    ],
    scroll: 'vertical',
    items: [
        {
            id: 'form',
            xtype: 'form',
            submitOnAction: false,
            items: [
                {
                    name : 'name',
                    placeHolder: "Flexril",
                    label: 'Name',
                    xtype: 'textfield'
                },
                {
                    name : 'description',
                    placeHolder: "For the nerve pain..",
                    label: 'Description',
                    xtype: 'textfield'
                },
                {
                    name : 'quantity',
                    label: 'Quantity',
                    xtype: 'numberfield'
                },
                {
                    id: 'doctors_select',
                    placeHolder: 'Select doctor',
                    name : 'doctor_id',
                    label: 'Doctor',
                    xtype: 'selectfield',
                    modal: true
                },
                {
                    id: 'frequencies_select',
                    placeHolder: 'Select frequency',
                    name : 'frequency',
                    label: 'Frequency',
                    xtype: 'selectfield',
                    modal: true
                },
                {
                    placeHolder: 'Select time',
                    name : 'time',
                    label: 'Time',
                    xtype: 'timepickerfield',
                    modal: true
                }
            ]
        },
        {
            xtype:'button',
            id  : 'delete_prescription',
            ui:  'decline',
            text: 'Delete',
            handler: function() {
                var id = this.record.getId();

//                        Ext.Msg.confirm("Confirmation", "Are you sure you want to delete doctor?", function(result) {
//                            if (result == 'yes')
//                            {
                Ext.dispatch({
                    controller: app.controllers.prescriptions,
                    action: 'destroy',
                    id: id,
                    animation: {type:'slide', direction:'right'}
                });
//                            }
//                        });

            }
        }
    ],
    updateWithRecord: function(record, doctors, frequencies) {
        var form = this.getComponent('form');
        var doctorsSelect = form.getComponent('doctors_select');
        var frequenciesSelect = form.getComponent('frequencies_select');

        frequenciesSelect.setOptions(frequencies, false);
//
//        frequenciesSelect.setOptions();

        if (doctors.length < 1)
        {
            doctorsSelect.disable();
            doctorsSelect.placeHolder = "You haven't added doctor yet";
            doctorsSelect.setOptions(doctors, false);
        }
        else {
             doctorsSelect.enable();
             doctorsSelect.placeHolder = "Select doctor";
             doctorsSelect.setOptions(doctors, false);
        }
        form.load(record);

        var deleteBtn = this.getComponent('delete_prescription');

        var toolbar = this.getDockedItems()[0];

        toolbar.getComponent('cancel_edit_prescription').record = record;
        toolbar.getComponent('save_prescription').record = record;
        toolbar.getComponent('save_prescription').form = form;

        if (record.getId()) {
            toolbar.setTitle(record.get('name'));
            deleteBtn.record = record;
            deleteBtn.show();
        }
        else {
            deleteBtn.hide();
        }
    }
});