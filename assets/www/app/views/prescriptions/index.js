app.views.PrescriptionsIndex = Ext.extend(Ext.Panel, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    title: 'Prescriptions',
                    items: [
                        {xtype:'spacer'},
                        {xtype:'spacer'},
                        {

                            id: 'add',
                            text: '+',
                            ui: 'action',
                            listeners: {
                                'tap': function () {
                                    Ext.dispatch({
                                        controller: app.controllers.prescriptions,
                                        action: 'add'
                                    })
                                }
                            }
                        }
                    ]
                }

            ],
            items: [
                {
                    xtype: 'list',
                    store: app.stores.prescriptions,
                    itemTpl:
                            ['<h4>{name}</h4>',
                             '<p>{quantity}</p>',
                             '<p>{doctor_name}</p>'
                            ],
                    onItemDisclosure: function (record) {
                        Ext.dispatch({
                            controller: app.controllers.prescriptions,
                            action: 'show',
                            id: record.getId()
                                })
                    }
                }
            ],
            initComponent: function() {
                app.stores.prescriptions.load();
                app.views.PrescriptionsIndex.superclass.initComponent.apply(this, arguments);
            }
        });