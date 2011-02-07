app.views.Viewport = Ext.extend(Ext.Panel, {
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            initComponent: function() {
                //put instances of cards into app.views namespace
                Ext.apply(app.views, {
                            doctorsIndex: new app.views.DoctorsIndex(),
                            doctorsShow: new app.views.DoctorsShow()
                            //contactForm: new app.views.ContactForm()
                        });
                //put instances of cards into viewport
                Ext.apply(this, {
                            items: [
                                app.views.doctorsIndex,
                                app.views.doctorsShow,
                                //app.views.contactForm,
                            ]
                        });
                app.views.Viewport.superclass.initComponent.apply(this, arguments);
            }
        });