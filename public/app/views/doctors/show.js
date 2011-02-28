app.views.DoctorsShow = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'View doctor',
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    listeners: {
                        'tap': function () {
                            Ext.dispatch({
                                controller: app.controllers.doctors,
                                action: 'index',
                                animation: {type:'slide', direction:'right'}
                            });
                        }
                    }
                },
                {xtype:'spacer'},
                {
                    id: 'edit_doctor',
                    text: 'Edit',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            Ext.dispatch({
                                controller: app.controllers.doctors,
                                action: 'edit',
                                id: this.record.getId(),
                                animation: {type:'slide', direction:'left'}
                            });
                        }
                    }
                }
            ]
        }
    ],
    styleHtmlContent:true,
    scroll: 'vertical',
    layout: 'fit',
    items: [
        {
            id: 'doctor_details',
            tpl:[
                '<h4>{name}</h4>',
                '<p>{address}</p>',
                '<p>{city}, {state}</p>',
                '<p>{phone}</p>'
            ]}

    ],
    updateWithRecord: function(record) {
        this.getComponent('doctor_details').update(record.data);
        var toolbar = this.getDockedItems()[0];
        toolbar.setTitle(record.get('name'));
        toolbar.getComponent('edit_doctor').record = record;
    }
});