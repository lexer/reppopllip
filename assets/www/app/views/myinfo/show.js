app.views.MyinfoShow = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'My info',
            items: [
                {xtype:'spacer'},
                {
                    text: 'Edit',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            Ext.dispatch({
                                controller: app.controllers.myinfo,
                                action: 'edit',
                                animation: {type:'slide', direction:'left'}
                            });
                        }
                    }
                }
            ]
        }
    ],
    layout: 'fit',
    scroll: 'vertical',
    styleHtmlContent:true,
    items: [
        {
            id: "myinfo_details",
            store: app.stores.myinfo,
            tpl:[
                '<h4>My Information</h4>',
                '<p>{name}</p>',
                '<p>{address}</p>',
                '<p>{city}</p>',
                '<p>{state}</p>',
                '<p>phone: {phone}</p>',
                '<p>email: {email}</p>',
                '<h4>EMERGENCY CONTACT</h4>',
                '<p>{emergency_name}</p>',
                '<p>{emergency_address}</p>',
                '<p>{emergency_city}</p>',
                '<p>{emergency_state}</p>',
                '<p>phone: {emergency_phone}</p>',
                '<p>email: {emergency_email}</p>'
            ]
        }
    ],
    updateWithRecord: function(myinfo) {
        this.getComponent('myinfo_details').update(myinfo.data);
        var toolbar = this.getDockedItems()[0];
    }
});