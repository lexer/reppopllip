app.views.PrescriptionsShow = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'View prescription',
            items: [
                {
                    text: 'Back',
                    ui: 'back',
                    listeners: {
                        'tap': function () {
                            Ext.dispatch({
                                controller: app.controllers.prescriptions,
                                action: 'index',
                                animation: {type:'slide', direction:'right'}
                            });
                        }
                    }
                },
                {xtype:'spacer'},
                {
                    id: 'edit_prescription',
                    text: 'Edit',
                    ui: 'action',
                    listeners: {
                        'tap': function () {
                            Ext.dispatch({
                                controller: app.controllers.prescriptions,
                                action: 'edit',
                                id: this.record.getId()
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
            tpl: ['<h4>{name}</h4>',
                '<p>{description}</p>',
                '<p>{quantity}</p>',
                '<p>{doctor_name}</p>'
            ]
        }
    ],
    updateWithRecord: function(record) {
        Ext.each(this.items.items, function(item) {
            item.update(record.data);
        });
        var toolbar = this.getDockedItems()[0];
        toolbar.setTitle(record.get('name'));
        toolbar.getComponent('edit_prescription').record = record;
    }
});