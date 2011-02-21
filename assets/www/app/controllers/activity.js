app.controllers.activity = new Ext.Controller({
    index: function(options) {
        var controller = this;

        db.Prescription.all().prefetch("doctor").list(null, function(pills) {
            var models = [];

            for (var i = 0; i < pills.length; i++) {
                models.push(app.models.Prescription.createFromEntity(pills[i]));
            }

            app.stores.prescriptions.loadData(models, false);

            app.views.viewport.setActiveItem(
                    app.views.activityIndex, options.animation
                    );
        });
    },

    take: function(options) {
        var id = options.id;
        db.Prescription.all().filter("id", '=', id).one(function(prescription) {
           persistence.transaction(function(tx) {
                prescription.taken = new Date();
                prescription.take = app.stores.frequencies.getTakeDate(prescription, prescription.frequency);
                persistence.flush(tx, function() {
                    var model = app.stores.prescriptions.getById(prescription.id);
                    model.data.taken = prescription.taken;
                    model.data.take = prescription.take;
                    options.activityList.refresh();
                });
           });
        });
    }
});