app.views.PrescriptionsEdit = Ext.extend(Ext.Panel, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    title: 'Edit prescription',
                    items: [
                        {
                            id: 'cancel',
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
                            id: 'apply',
                            text: 'Apply',
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
            submitOnAction: false,
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
                            name : 'description',
                            label: 'Description',
                            xtype: 'textfield'
                        },
                        {
                            name : 'quantity',
                            label: 'Quantity',
                            xtype: 'numberfield'
                        },
                        {
                            id: 'doctorsSelect',
                            name : 'doctor_id',
                            label: 'Doctor',
                            xtype: 'selectfield'
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
                                    controller: app.controllers.prescriptions,
                                    action: 'destroy',
                                    id: id,
                                    animation: {type:'slide', direction:'right'}
                                });
//                            }
//                        });

                    }
                }
            ]
            ,
            updateWithRecord: function(record, doctors) {
                var form = this.getComponent('form');
                this.query('#doctorsSelect')[0].setOptions(doctors, false);
                form.load(record);
                var toolbar = this.getDockedItems()[0];
                this.getComponent('delete').record = record;
                toolbar.getComponent('cancel').record = record;
                toolbar.getComponent('apply').record = record;
                toolbar.getComponent('apply').form = form;
            }
        });