Ext.data.ProxyMgr.registerType("prescriptionstorage", Ext.extend(Ext.data.Proxy, {
            create: function(operation, callback, scope) {

            },
            read: function(operation, callback, scope) {
                var thisProxy = this;

                db.Doctor.all().list(null, function(dbDoctors) {
                    var doctors = [];

                    for (var i = 0; i < dbDoctors.length; i++) {
                        var dbDoctor = dbDoctors[i];
                        var doctor = new thisProxy.model({
                                    id: dbDoctor.id,
                                    name: dbDoctor.name
                                });
                        doctors.push(doctor);
                    }

                    //return model instances in a result set
                    operation.resultSet = new Ext.data.ResultSet({
                                records: doctors,
                                total  : doctors.length,
                                loaded : true
                            });

                    //announce success
                    operation.setSuccessful();
                    operation.setCompleted();

                    //finish with callback
                    if (typeof callback == "function") {
                        callback.call(scope || thisProxy, operation);
                    }
                });
            },
            update: function(operation, callback, scope) {
                var records = operation.records,
                        length = records.length,
                        record, id, i;

                var updatedRecordsCount = 0;

                operation.setStarted();

                for (i = 0; i < length; i++) {
                    record = records[i];

                    data = record.data;

                    db.Doctor.all().filter("id", '=', data.id).one(function(doctor) {
                        updatedRecordsCount++;

                        persistence.transaction(function(tx) {

                            doctor.name = data.name;

                            persistence.flush(tx, function() {
                                if (updatedRecordsCount == length) {

                                    operation.setCompleted();
                                    operation.setSuccessful();

                                    if (typeof callback == 'function') {
                                        callback.call(scope || this, operation);
                                    }
                                }
                            });
                        });

                    })
                }
            },
            destroy: function(operation, callback, scope) {

            }
        })
);

app.models.Prescription = Ext.regModel("app.models.Prescription", {
            fields: [
                {name: "id", type: "string"},
                {name: "name", type: "string"},
                {name: "description", type: "string"},
                {name: "quantity", type: "int"},
                {name: 'doctor_id', type: 'string'}
            ],
            associations: [
                {type: 'belongsTo', model: 'Doctor'}
            ],
            proxy: {
                type: "prescriptionstorage"
            }
        });

app.stores.prescriptions = new Ext.data.Store({
            model: "app.models.Prescription"
        });