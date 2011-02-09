app.controllers.prescriptions = new Ext.Controller({
            index: function(options) {
                app.views.viewport.setActiveItem(
                        app.views.prescriptionsIndex, options.animation
                );
            }
        });