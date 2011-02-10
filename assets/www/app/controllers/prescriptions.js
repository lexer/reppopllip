app.controllers.prescriptions = new Ext.Controller({
            index: function(options) {
                app.stores.prescriptions.sync();
                app.views.viewport.setActiveItem(
                        app.views.prescriptionsIndex, options.animation
                );
            },
            show: function(options) {
                app.stores.prescriptions.sync();
                var id = options.id,
                        prescription = app.stores.prescriptions.getById(id);
                if (prescription) {
                    app.views.prescriptionsShow.updateWithRecord(prescription);
                    app.views.viewport.setActiveItem(
                            app.views.prescriptionsShow, options.animation
                    );
                }
            },
            edit: function(options) {
                app.stores.prescriptions.load();
                var id = options.id,
                        prescription = app.stores.prescriptions.getById(id);
                if (prescription) {
                    app.views.prescriptionsEdit.updateWithRecord(prescription);
                    app.views.viewport.setActiveItem(
                            app.views.prescriptionsEdit, options.animation
                    );
                }
            },
            add: function(options) {
                    var prescription = new app.models.Prescription();
                    app.views.prescriptionsEdit.updateWithRecord(prescription);
                    app.views.viewport.setActiveItem(
                            app.views.prescriptionsEdit, options.animation
                    );

            }
        });