app.views.ActivityIndex = Ext.extend(Ext.Panel, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    title: 'Activity',
                    items: [
                        {xtype:'spacer'},
                        {xtype:'spacer'},
                        {xtype:'spacer'}
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
                app.views.ActivityIndex.superclass.initComponent.apply(this, arguments);
            }
        });