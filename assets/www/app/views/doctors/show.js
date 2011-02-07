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
                            id: 'edit',
                            text: 'Edit',
                            ui: 'action',
                            listeners: {
                                'tap': function () {
                                    //Ext.dispatch({
                                    //    controller: app.controllers.contacts,
                                    //    action: 'edit',
                                    //    id: this.record.getId()
                                    //});
                                }
                            }
                        }
                    ]
                }
            ],
            styleHtmlContent:true,
            scroll: 'vertical',
            items: [
                {tpl:[
                    '<h4>{name}</h4>'
                ]},
                {
                    xtype:'button',
                    ui  : 'confirm-round',
                    text: 'dfgdfgfd'
                }
            ],
            updateWithRecord: function(record) {
                Ext.each(this.items.items, function(item) {
                    item.update(record.data);
                });
                var toolbar = this.getDockedItems()[0];
                toolbar.setTitle(record.get('name'));
                toolbar.getComponent('edit').record = record;
            },
            initComponent: function() {
                //        app.stores.doctors.load();
                app.views.DoctorsShow.superclass.initComponent.apply(this, arguments);
            }
        });