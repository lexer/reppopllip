app.views.Viewport = Ext.extend(Ext.Panel, {
            fullscreen: true,
            layout: 'card',
            cardSwitchAnimation: 'slide',
            initComponent: function() {
                //put instances of cards into app.views namespace
                Ext.apply(app.views, {
                            doctorsList: new app.views.DoctorsList(),
                            doctorDetail: new app.views.DoctorDetail()
                            //contactForm: new app.views.ContactForm()
                        });
                //put instances of cards into viewport
                Ext.apply(this, {
                            items: [
                                app.views.doctorsList,
                                app.views.doctorDetail,
                                //app.views.contactForm,
                            ]
                        });
                app.views.Viewport.superclass.initComponent.apply(this, arguments);
            }
        });