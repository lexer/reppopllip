app.controllers.doctors = new Ext.Controller({
            index: function(options) {
                app.views.viewport.setActiveItem(
                        app.views.doctorsList, options.animation
                );
            },
            show: function(options) {
                var id = parseInt(options.id),
                        doctor = app.stores.doctors.getById(id);
                if (doctor) {
                    app.views.doctorDetail.updateWithRecord(doctor);
                    app.views.viewport.setActiveItem(
                            app.views.doctorDetail, options.animation
                    );
                }
            },
            edit: function(options) {
            }
        });