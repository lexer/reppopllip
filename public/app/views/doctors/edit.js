app.views.DoctorsEdit = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'Add doctor',
            items: [
                {
                    id: 'cancel_edit_doctor',
                    text: 'Cancel',
                    ui: 'back',
                    listeners: {
                        'tap': function () {
                            if (this.record.getId()) {
                                Ext.dispatch({
                                    controller: app.controllers.doctors,
                                    action: 'show',
                                    id: this.record.getId(),
                                    animation: {type:'slide', direction:'right'}
                                });
                            } else {
                                Ext.dispatch({
                                    controller: app.controllers.doctors,
                                    action: 'index',
                                    animation: {type:'slide', direction:'right'}
                                });
                            }
                        }
                    }
                },
                {xtype:'spacer'},
                {
                    id: 'save_doctor',
                    text: 'Save',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            this.form.updateRecord(this.record, true);

                            if (this.record.getId()) {
                                Ext.dispatch({
                                    controller: app.controllers.doctors,
                                    action: 'update',
                                    doctor: this.record,
                                    animation: {type:'slide', direction:'right'}
                                });
                            } else {
                                Ext.dispatch({
                                    controller: app.controllers.doctors,
                                    action: 'create',
                                    doctor: this.record,
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
                    xtype: 'textfield',
                    placeHolder: "John Doe",
                    name: 'name',
                    label: 'Name'
                },
                {
                    xtype: 'textfield',
                    placeHolder: '111, Lawrence Street..',
                    name: 'address',
                    label: 'Address'
                },
                {
                    xtype: 'textfield',
                    placeHolder: 'New York',
                    name: 'city',
                    label: 'City'
                },
                {
                    xtype: 'textfield',
                    placeHolder: 'NY',
                    name: 'state',
                    label: 'State'
                },
                {
                    xtype: 'textfield',
                    placeHolder: '000-000-0000',
                    name: 'phone',
                    label: 'Phone'
                },
                {
                    xtype: 'emailfield',
                    placeHolder: "john@doe.com",
                    name: 'email',
                    label: 'Email'
                }
            ]
        },
        {
            xtype:'button',
            id  : 'delete_doctor',
            ui:  'decline',
            text: 'Delete',
            handler: function() {
                var id = this.record.getId();

//                        Ext.Msg.confirm("Confirmation", "Are you sure you want to delete doctor?", function(result) {
//                            if (result == 'yes')
//                            {
                Ext.dispatch({
                    controller: app.controllers.doctors,
                    action: 'destroy',
                    id: id
                });
//                            }
//                        });

            }
        }
    ]
    ,
    updateWithRecord: function(record) {
        var form = this.getComponent('form');
        form.load(record);

        var deleteBtn = this.getComponent('delete_doctor');

        var toolbar = this.getDockedItems()[0];

        toolbar.getComponent('cancel_edit_doctor').record = record;
        toolbar.getComponent('save_doctor').record = record;
        toolbar.getComponent('save_doctor').form = form;

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