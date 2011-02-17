app.controllers.prescriptions = new Ext.Controller({
    createModel:function(entity) {
        return new app.models.Prescription({
            id: entity.id,
            name: entity.name,
            doctor_name: entity.doctor ? entity.doctor.name : "",
            doctor_id: entity.doctor ? entity.doctor.id : "",
            description: entity.description,
            quantity: entity.quantity
        });
    },
    index: function(options) {
        var controller = this;

        db.Prescription.all().prefetch("doctor").list(null, function(pills) {
            var models = [];

            for (var i = 0; i < pills.length; i++) {
                models.push(controller.createModel(pills[i]));
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
            var model = controller.createModel(prescription);
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
            var model = controller.createModel(prescription);

            db.Doctor.all().list(null, function(doctors) {
                var doctorsSelect = $.map(doctors, function(d) {
                    return {
                        text: d.name,
                        value: d.id };
                });
                app.views.prescriptionsEdit.updateWithRecord(model, doctorsSelect);
                app.views.viewport.setActiveItem(
                        app.views.prescriptionsEdit, options.animation
                        );
            });
        });
    },

    update: function(options) {
        var data = options.prescription.data;

        db.Prescription.all().prefetch("doctor").filter("id", '=', data.id).one(function(prescription) {
            persistence.transaction(function(tx) {

                prescription.name = data.name;
                prescription.description = data.description;
                prescription.quantity = data.quantity;
                prescription.doctor = data.doctor_id;

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
        db.Doctor.all().list(null, function(doctors) {
            var doctorsSelect = $.map(doctors, function(d) {
                return {
                    text: d.name,
                    value: d.id };
            });

            var prescription = new app.models.Prescription();

            app.views.prescriptionsEdit.updateWithRecord(prescription, doctorsSelect);
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

        persistence.add(prescription);

        Ext.dispatch({
            controller: app.controllers.prescriptions,
            action: 'index',
            animation: options.animation
        });
//        }

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