app.controllers.myinfo = new Ext.Controller({

    show: function(options) {
        var myinfo = window.localStorage.getItem("myInfo");

        var model = new app.models.MyInfo(JSON.parse(myinfo));
        app.views.myinfoShow.updateWithRecord(model);
        app.views.viewport.setActiveItem(
                app.views.myinfoShow, options.animation
                );
    },

    edit: function(options) {
        var myinfo = window.localStorage.getItem("myInfo");
        var model = new app.models.MyInfo(JSON.parse(myinfo));
        app.views.myinfoEdit.updateWithRecord(model);

        app.views.viewport.setActiveItem(
                app.views.myinfoEdit, options.animation
                );
    },

    update: function(options) {
        var data = options.myinfo.data;
        window.localStorage.removeItem("myInfo");
        window.localStorage.setItem("myInfo", JSON.stringify(data));
        Ext.dispatch({
            controller: app.controllers.myinfo,
            action: 'show',
            animation: options.animation

        });
    }
});