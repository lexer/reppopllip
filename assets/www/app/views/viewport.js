app.views.Viewport = Ext.extend(Ext.Panel, {
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            initComponent: function() {
                //put instances of cards into app.views namespace
                Ext.apply(app.views, {
                            doctorsList: new app.views.DoctorsList()
                            //contactDetail: new app.views.ContactDetail(),
                            //contactForm: new app.views.ContactForm()
                        });
                //put instances of cards into viewport
                Ext.apply(this, {
                            items: [
                                app.views.doctorsList
                                //app.views.contactDetail,
                                //app.views.contactForm,
                            ]
                        });
                app.views.Viewport.superclass.initComponent.apply(this, arguments);
            }
        });