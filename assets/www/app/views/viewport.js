app.views.Viewport = Ext.extend(Ext.Panel, {
            dockedItems: [
                new Ext.TabBar({
                            dock : 'bottom',
                            ui   : 'dark',
                            layout: { pack: 'center'},
                            items: [
                                {
                                    iconCls: 'activity',
                                    text: 'Activity'
                                },
                                {
                                    iconCls: 'prescriptions',
                                    text: 'Prescriptions'
                                },
                                {
                                    iconCls: 'doctors',
                                    text: 'Doctors'
                                },
                                {
                                    iconCls: 'myinfo',
                                    text: 'My info'
                                }
                            ]
                        })
            ],
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            initComponent: function() {
                //put instances of cards into app.views namespace
                Ext.apply(app.views, {
                            doctorsIndex: new app.views.DoctorsIndex(),
                            doctorsShow: new app.views.DoctorsShow(),
                            doctorsEdit: new app.views.DoctorsEdit()
                        });
                //put instances of cards into viewport
                Ext.apply(this, {
                            items: [
                                app.views.doctorsIndex,
                                app.views.doctorsShow,
                                app.views.doctorsEdit
                            ]
                        });
                app.views.Viewport.superclass.initComponent.apply(this, arguments);
            }
        });