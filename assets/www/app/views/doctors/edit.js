app.views.DoctorsEdit = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'Edit doctor',
            items: [
                {
                    id: 'cancel',
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
                    id: 'apply',
                    text: 'Apply',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            this.form.updateRecord(this.record, true);

                            if (this.record.getId()) {
                                Ext.dispatch({
                                    controller: app.controllers.doctors,
                                    action: 'update',
                                    doctor: this.record
                                });
                            } else {
                                Ext.dispatch({
                                    controller: app.controllers.doctors,
                                    action: 'create',
                                    doctor: this.record
                                });
                            }
                        }
                    }
                }
            ]
        }
    ],
    submitOnAction: false,
    layout: 'fit',
    items: [
        {
            id: 'form',
            xtype: 'form',
            submitOnAction: false,
            items: [
                {
                    name : 'name',
                    label: 'Name',
                    xtype: 'textfield'
                },
                {
                    name : 'address',
                    label: 'Address',
                    xtype: 'textfield'
                },
                {
                    name : 'city',
                    label: 'City',
                    xtype: 'textfield'
                },
                {
                    name : 'state',
                    label: 'State',
                    xtype: 'textfield'
                },
                {
                    name : 'phone',
                    label: 'Phone',
                    xtype: 'textfield'
                }
            ]
        },
        {
            xtype:'button',
            id  : 'delete',
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
        var toolbar = this.getDockedItems()[0];
        this.getComponent('delete').record = record;
        toolbar.getComponent('cancel').record = record;
        toolbar.getComponent('apply').record = record;
        toolbar.getComponent('apply').form = form;
    }
});