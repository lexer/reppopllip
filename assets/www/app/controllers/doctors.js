app.controllers.doctors = new Ext.Controller({
            createModel:function(entity) {
                return new app.models.Doctor({
                            id: entity.id,
                            name: entity.name,
                            address: entity.address,
                            city:entity.city,
                            state:entity.state,
                            phone: entity.phone
                        });
            },

            index: function(options) {
                var controller = this;
                db.Doctor.all().list(null, function(doctors) {
                    var models = [];

                    for (var i = 0; i < doctors.length; i++) {
                        models.push(controller.createModel(doctors[i]));
                    }

                    app.stores.doctors.loadData(models, false);

                    app.views.viewport.setActiveItem(
                            app.views.doctorsIndex, options.animation
                    );
                });
            },
            show: function(options) {
                var id = options.id;
                var controller = this;

                db.Doctor.all().filter("id", '=', id).one(function(doctor) {
                    var model = controller.createModel(doctor);
                    app.views.doctorsShow.updateWithRecord(model);
                    app.views.viewport.setActiveItem(
                            app.views.doctorsShow, options.animation
                    );
                });
            },

            edit: function(options) {
                var id = options.id;
                var controller = this;

                db.Doctor.all().filter("id", '=', id).one(function(doctor) {
                    var model = controller.createModel(doctor);
                    app.views.doctorsEdit.updateWithRecord(model);
                    app.views.viewport.setActiveItem(
                            app.views.doctorsEdit, options.animation
                    );
                });
            },

            update: function(options) {
                var data = options.doctor.data;

                db.Doctor.all().filter("id", '=', data.id).one(function(doctor) {
                    persistence.transaction(function(tx) {

                        doctor.name = data.name;
                        doctor.address = data.address;
                        doctor.city = data.city;
                        doctor.state = data.state;
                        doctor.phone = data.phone;

                        persistence.flush(tx, function() {

                            Ext.dispatch({
                                        controller: app.controllers.doctors,
                                        action: 'show',
                                        id: doctor.id,
                                        animation: {type:'slide', direction:'left'}
                                    });

                        });
                    });
                });
            },
            add: function(options) {
                var doctor = new app.models.Doctor();
                app.views.doctorsEdit.updateWithRecord(doctor);
                app.views.viewport.setActiveItem(
                        app.views.doctorsEdit, options.animation
                );
            } ,
            create: function(options) {
                var data = options.doctor.data;

                var doctor = new db.Doctor();

                doctor.name = data.name;
                doctor.address = data.address;
                doctor.city = data.city;
                doctor.state = data.state;
                doctor.phone = data.phone;

                persistence.add(doctor);

                Ext.dispatch({
                            controller: app.controllers.doctors,
                            action: 'index',
                            //id: doctor.id,
                            animation: {type:'slide', direction:'left'}
                        });

            },
    
            destroy: function(options) {
                var id = options.id;

                db.Doctor.all().filter("id", '=', id).one(function(doctor) {
                    persistence.remove(doctor);

                    Ext.dispatch({
                            controller: app.controllers.doctors,
                            action: 'index',
                            animation: {type:'slide', direction:'left'}
                        });
                });
            }

        });