//goog.provide('app');

var app = Ext.regApplication({
    name: 'app',
    version: '0.1.2',
    launch: function() {
        var that = this;
        this.launched = true;

        console.log('Launched');

        db.init(function() {


            Ext.apply(app.views, {
                doctorsIndex: new app.views.DoctorsIndex(),
                doctorsShow: new app.views.DoctorsShow(),
                doctorsEdit: new app.views.DoctorsEdit(),
                prescriptionsShow: new app.views.PrescriptionsShow(),
                prescriptionsEdit: new app.views.PrescriptionsEdit(),
                prescriptionsIndex: new app.views.PrescriptionsIndex(),
                myinfoShow: new app.views.MyinfoShow(),
                myinfoEdit: new app.views.MyinfoEdit(),
                activityIndex: new app.views.ActivityIndex()
            });

            app.views.viewport = new app.views.Viewport();

            Ext.dispatch({
                controller: app.controllers.activity,
                action: 'index' });
        });
    },
    mainLaunch: function() {
        if (!device || !this.launched) {
            return;
        }
        //console.log('mainLaunch');
        alert('launched inside phonegap');
    }
});
