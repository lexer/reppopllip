app.views.Viewport = Ext.extend(Ext.Panel, {
            dockedItems: [
                new Ext.TabBar({
                            dock : 'bottom',
                            ui   : 'dark',
                            layout: { pack: 'center'},
                            cardLayout: this.layout,
                            cardSwitchAnimation: this.cardSwitchAnimation,
                            items: [
                                {
                                    iconCls: 'activity',
                                    text: 'Activity',
                                    controller: app.controllers.activity,
                                    action: 'index'
                                },
                                {
                                    iconCls: 'prescriptions',
                                    text: 'Prescriptions',
                                    controller: app.controllers.prescriptions,
                                    action: 'index'
                                },
                                {
                                    iconCls: 'doctors',
                                    text: 'Doctors',
                                    controller: app.controllers.doctors,
                                    action: 'index'
                                },
                                {
                                    iconCls: 'myinfo',
                                    text: 'My info',
                                    controller: app.controllers.myinfo,
                                    action: 'show'
                                }
                            ],
                            listeners: {
                                'render' : function(bar) {
                                    var tabs = bar.query('.tab')[0].activate();
                                },
                                'change': function (bar, currentTab, card) {
                                    var tabs = bar.query('.tab');

                                    var previousTab = null;

                                    for (var i = 0; i < tabs.length; i++) {
                                        if (tabs[i].active) {
                                            previousTab = tabs[i];
                                            tabs[i].deactivate();
                                        }
                                    }

                                    var direction = (bar.items.indexOf(currentTab) < bar.items.indexOf(previousTab)) ? 'right' : 'left';

                                    Ext.dispatch({
                                                controller: currentTab.controller,
                                                action: currentTab.action,
                                                animation: {type:'slide', direction:direction}
                                            });

                                    currentTab.activate();
                                }
                            }
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
                            doctorsEdit: new app.views.DoctorsEdit(),
                            prescriptionsIndex: new app.views.PrescriptionsIndex(),
                            myInfoShow: new app.views.MyInfoShow(),
                            activityIndex: new app.views.ActivityIndex()
                        });
                //put instances of cards into viewport
                Ext.apply(this, {
                            items: [
                                app.views.activityIndex,
                                app.views.doctorsIndex,
                                app.views.doctorsShow,
                                app.views.doctorsEdit,
                                app.views.prescriptionsIndex,
                                app.views.myInfoShow
                            ]
                        });
                app.views.Viewport.superclass.initComponent.apply(this, arguments);
            }
        });