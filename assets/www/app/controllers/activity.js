app.controllers.activity = new Ext.Controller({
            index: function(options) {
                app.views.viewport.setActiveItem(
                        app.views.activityIndex, options.animation
                );
            }
        });