app.views.PrescriptionsEdit = Ext.extend(Ext.form.FormPanel, {
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
                                    Ext.dispatch({
                                                controller: app.controllers.prescriptions,
                                                action: 'show',
                                                id: this.record.getId(),
                                                animation: {type:'slide', direction:'right'}
                                            });
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
                                    this.record.save();
                                    Ext.dispatch({
                                                controller: app.controllers.prescriptions,
                                                action: 'show',
                                                id: this.record.getId()
                                            });
                                }
                            }
                        }
                    ]
                }
            ],
            submitOnAction: false,
            items: [
                {
                    name : 'name',
                    label: 'Name',
                    xtype: 'textfield'
                },
                {
                    name : 'quantity',
                    label: 'Quantity',
                    xtype: 'numberfield'
                }
            ],
            updateWithRecord: function(record) {
                this.load(record);
                var toolbar = this.getDockedItems()[0];
                toolbar.getComponent('cancel').record = record;
                toolbar.getComponent('apply').record = record;
                toolbar.getComponent('apply').form = this;
            }
        });