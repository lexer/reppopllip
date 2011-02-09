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
//                                    Ext.dispatch({
//                                        controller: app.controllers.doctors,
//                                        action: 'edit',
//                                        id: this.record.getId()
//                                    });
                                }
                            }
                        }
                    ]
                }

            ],
            items: [
//                {
//                    xtype: 'list',
//                    store: app.stores.doctors,
//                    itemTpl: '{id} {name}',
//                    onItemDisclosure: function (record) {
//                        Ext.dispatch({
//                            controller: app.controllers.doctors,
//                            action: 'show',
//                            id: record.getId()
//                        });
//                    }
//                }
            ],
            initComponent: function() {
//                app.stores.doctors.load();
                app.views.PrescriptionsIndex.superclass.initComponent.apply(this, arguments);
            }
        });