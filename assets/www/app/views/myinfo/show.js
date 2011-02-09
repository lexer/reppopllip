app.views.MyInfoShow = Ext.extend(Ext.Panel, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    title: 'My info',
                    items: [
                        {xtype:'spacer'},
                        {xtype:'spacer'},
                        {xtype:'spacer'}
                    ]
                }
            ],
            styleHtmlContent:true,
            scroll: 'vertical',
            items: [

            ],
            initComponent: function() {
                app.stores.doctors.load();                app.stores.doctors.load();                app.stores.doctors.load();                app.stores.doctors.load();
                app.views.MyInfoShow.superclass.initComponent.apply(this, arguments);
            }
        });