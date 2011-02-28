app.controllers.prescriptions = new Ext.Controller({
    index: function(options) {
        var controller = this;

        db.Prescription.all().prefetch("doctor").list(null, function(pills) {
            var models = [];

            for (var i = 0; i < pills.length; i++) {
                models.push(app.models.Prescription.createFromEntity(pills[i]));
            }

            app.stores.prescriptions.loadData(models, false);

            app.views.viewport.setActiveItem(
                    app.views.prescriptionsIndex, options.animation
                    );
        });
    },
    show: function(options) {
        var id = options.id;
        var controller = this;

        db.Prescription.all().prefetch("doctor").filter("id", '=', id).one(function(prescription) {
            var model = app.models.Prescription.createFromEntity(prescription);
            app.views.prescriptionsShow.updateWithRecord(model);
            app.views.viewport.setActiveItem(
                    app.views.prescriptionsShow, options.animation
                    );
        });
    },

    edit: function(options) {
        var id = options.id;
        var controller = this;

        db.Prescription.all().filter("id", '=', id).one(function(prescription) {
            var model = app.models.Prescription.createFromEntity(prescription);

            db.Doctor.all().list(null, function(ds) {
                var doctors = _.map(ds, function(d) {
                    return {
                        text: d.name,
                        value: d.id };
                });

                var frequencies = app.stores.frequencies.clone();


                app.views.prescriptionsEdit.updateWithRecord(model, doctors, frequencies);
                app.views.viewport.setActiveItem(
                        app.views.prescriptionsEdit, options.animation
                        );
            });
        });
    },

    update: function(options){
        var data = options.prescription.data;

        db.Prescription.all().prefetch("doctor").filter("id", '=', data.id).one(function(prescription) {
            persistence.transaction(function(tx) {

                prescription.name = data.name;
                prescription.description = data.description;
                prescription.quantity = data.quantity;
                prescription.doctor = data.doctor_id;
                prescription.frequency = data.frequency;
                prescription.time = data.time;

                persistence.flush(tx, function() {

                    Ext.dispatch({
                        controller: app.controllers.prescriptions,
                        action: 'show',
                        id: prescription.id,
                        animation: options.animation
                    });

                });
            });
        });
    },

    add: function(options) {
        db.Doctor.all().list(null, function(ds) {

            var doctors = _.map(ds, function(d) {
                return {
                    text: d.name,
                    value: d.id };
            });

            var prescription = new app.models.Prescription();

            var frequencies = app.stores.frequencies.clone();

            app.views.prescriptionsEdit.updateWithRecord(prescription, doctors, frequencies);
            app.views.viewport.setActiveItem(
                    app.views.prescriptionsEdit, options.animation
                    );
        });
    },

    create: function(options) {
        var data = options.prescription.data;

        var prescription = new db.Prescription();

        prescription.name = data.name;
        prescription.description = data.description;
        prescription.quantity = data.quantity;
        prescription.doctor = data.doctor_id;
        prescription.frequency = data.frequency;
        prescription.time = data.time;

        persistence.add(prescription);

        Ext.dispatch({
            controller: app.controllers.prescriptions,
            action: 'index',
            animation: options.animation
        });
    },

    destroy: function(options) {
        var id = options.id;

        db.Prescription.all().filter("id", '=', id).one(function(prescription) {
            persistence.remove(prescription);

            Ext.dispatch({
                controller: app.controllers.prescriptions,
                action: 'index',
                animation: options.animation
            });
        });
    }
});