app.views.PrescriptionsIndex = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'Prescriptions',
            items: [
                {xtype:'spacer'},
                {

                    id: 'add',
                    text: '+',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            Ext.dispatch({
                                controller: app.controllers.prescriptions,
                                action: 'add',
                                animation: {type:'slide', direction:'left'}
                            })
                        }
                    }
                }
            ]
        }

    ],
    layout: 'fit',
    styleHtmlContent:true,
    items: [
        {
            xtype: 'list',
            store: app.stores.prescriptions,
            itemTpl:
                    ['<h4>{name}</h4>',
                        '<p>{description}</p>',
                        '<p>{quantity}</p>',
                        '<p>{doctor_name}</p>'
                    ],
            onItemDisclosure: function (record) {
                Ext.dispatch({
                    controller: app.controllers.prescriptions,
                    action: 'show',
                    id: record.getId(),
                    animation: {type:'slide', direction:'left'}

                })
            }
        }
    ]
});