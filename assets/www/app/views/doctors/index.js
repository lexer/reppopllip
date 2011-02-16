app.views.doctorsIndex = new Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'Doctors',
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
                                controller: app.controllers.doctors,
                                action: 'add',
                                animation: {type:'slide', direction:'left'}
                            });
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
            store: app.stores.doctors,
            itemTpl:[
                '<h4>{name}</h4>',
                '<p>{address}</p>',
                '<p>{city}, {state}</p>',
                '<p>{phone}</p>'
            ],
            onItemDisclosure: function (record) {
                Ext.dispatch({
                    controller: app.controllers.doctors,
                    action: 'show',
                    id: record.getId(),
                    animation: {type:'slide', direction:'left'}
                });
            }
        }
    ]
});