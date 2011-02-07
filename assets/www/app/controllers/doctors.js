app.controllers.doctors = new Ext.Controller({
            index: function(options) {
                app.views.viewport.setActiveItem(
                        app.views.doctorsIndex, options.animation
                );
            },
            show: function(options) {
                var id = parseInt(options.id),
                        doctor = app.stores.doctors.getById(id);
                if (doctor) {
                    app.views.doctorsShow.updateWithRecord(doctor);
                    app.views.viewport.setActiveItem(
                            app.views.doctorsShow, options.animation
                    );
                }
            },
            edit: function(options) {
                var id = parseInt(options.id),
                        doctor = app.stores.doctors.getById(id);
                if (doctor) {
                    app.views.doctorsEdit.updateWithRecord(doctor);
                    app.views.viewport.setActiveItem(
                            app.views.doctorsEdit, options.animation
                    );
                }
            }
        });