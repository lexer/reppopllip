app.views.ActivityIndex = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'Activity',
            items: [
                {xtype:'spacer'}
            ]
        }
    ],
    layout: 'fit',
    styleHtmlContent:true,
    items: [
        {
            id: 'activity_list',
            xtype: 'list',
            store: app.stores.prescriptions,
            itemTpl:
                    ['<h4>{name}</h4>',
                        '<p>take:{take:date("H:i")}</p>',
//                        '<p>taken: {taken}</p>',
                        '<p>{description}</p>',
                        '<p>Take: {frequency_name}</p>',
                        '<p>Quantity: {quantity}</p>',
                        '<p>Doctor: {doctor_name}</p>',
                        '<button onclick="Ext.getCmp(\'activity_list\').onItemTake(\'{id}\')" >Take</button>'
                    ],
//            onItemDisclosure: function (record) {
//                Ext.dispatch({
//                    controller: app.controllers.prescriptions,
//                    action: 'show',
//                    id: record.getId(),
//                    animation: {type:'slide', direction:'left'}
//
//                })
//            },
            onItemTake: function(id) {
                 Ext.dispatch({
                                controller: app.controllers.activity,
                                action: 'take',
                                id: id,
                                activityList: Ext.getCmp('activity_list')
                 });
            }
        }
    ]
});