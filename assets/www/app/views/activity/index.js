app.views.activityIndex = new Ext.extend(Ext.Panel, {

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
    layout: 'fit',
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
    ]
});
