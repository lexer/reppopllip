Ext.regApplication({
    name: 'app',
    launch: function() {
        var that = this;
        this.launched = true;

        console.log('Launched');

        db.init(function() {
            //db.seed();
        
//            Ext.apply(app.views, {
//                doctorsIndex: new app.views.DoctorsIndex(),
//                doctorsShow: new app.views.DoctorsShow(),
//                doctorsEdit: new app.views.DoctorsEdit(),
//                prescriptionsShow: new app.views.PrescriptionsShow(),
//                prescriptionsEdit: new app.views.PrescriptionsEdit(),
//                prescriptionsIndex: new app.views.PrescriptionsIndex(),
//                myInfoShow: new app.views.MyInfoShow(),
//                myInfoEdit: new app.views.MyInfoEdit(),
//                activityIndex: new app.views.ActivityIndex()
//            });

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
