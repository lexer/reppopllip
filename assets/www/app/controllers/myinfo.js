app.controllers.myinfo = new Ext.Controller({

            show: function(options) {

                app.views.viewport.setActiveItem(
                        app.views.myInfoShow, options.animation);

            }
        });