//Ext.data.ProxyMgr.registerType("prescriptionstorage", Ext.extend(Ext.data.Proxy, {
//            create: function(operation, callback, scope) {
//                var thisProxy = this;
//
//                var records = operation.records,
//                        length = records.length,
//                        record, id, i;
//
//                operation.setStarted();
//
//                for (i = 0; i < length; i++) {
//                    record = records[i];
//
//                    data = record.data;
//
//
//                    var prescription = new db.Prescription({
//                                name: data.name,
//                                quantity: data.quantity
//                            });
//
//                    persistence.add(prescription);
//
//                    data.id = prescription.id;
//                }
//
//                operation.setCompleted();
//                operation.setSuccessful();
//
//                if (typeof callback == 'function') {
//                    callback.call(scope || thisProxy, operation);
//                }
//            },
//            read: function(operation, callback, scope) {
//                var thisProxy = this;
//
//                db.Prescription.all().prefetch('doctor').list(null, function(results) {
//                    var pills = [];
//
//                    for (var i = 0; i < results.length; i++) {
//                        var result = results[i];
//                        var pill = new thisProxy.model({
//                                    id: result.id,
//                                    name: result.name,
//                                    quantity: result.quantity,
//                                    doctor_id: result.doctor.id,
//                                    doctor_name: result.doctor.name
//                                });
//                        pills.push(pill);
//                    }
//
//                    //return model instances in a result set
//                    operation.resultSet = new Ext.data.ResultSet({
//                                records: pills,
//                                total  : pills.length,
//                                loaded : true
//                            });
//
//                    //announce success
//                    operation.setSuccessful();
//                    operation.setCompleted();
//
//                    //finish with callback
//                    if (typeof callback == "function") {
//                        callback.call(scope || thisProxy, operation);
//                    }
//                });
//            },
//            update: function(operation, callback, scope) {
//                var thisProxy = this;
//
//                var records = operation.records,
//                        length = records.length,
//                        record, id, i;
//
//                var updatedRecordsCount = 0;
//
//                operation.setStarted();
//
//                for (i = 0; i < length; i++) {
//                    record = records[i];
//
//                    data = record.data;
//
//                    db.Prescription.all().filter("id", '=', data.id).one(function(prescription) {
//                        updatedRecordsCount++;
//
//                        persistence.transaction(function(tx) {
//
//                            prescription.name = data.name;
//                            prescription.quantity = data.quantity;
//
//                            persistence.flush(tx, function() {
//                                if (updatedRecordsCount == length) {
//
//                                    operation.setCompleted();
//                                    operation.setSuccessful();
//
//                                    if (typeof callback == 'function') {
//                                        callback.call(scope || thisProxy, operation);
//                                    }
//                                }
//                            });
//                        });
//
//                    })
//                }
//            },
//            destroy: function(operation, callback, scope) {
//
//            }
//        })
//);

app.models.Prescription = Ext.regModel("app.models.Prescription", {
            fields: [
                {name: "id", type: "string"},
                {name: "name", type: "string"},
                {name: "description", type: "string"},
                {name: "quantity", type: "int"},
                {name: 'doctor_id', type: 'string'},
                {name: 'doctor_name', type: 'string'}
            ]
//            associations: [
//                {type: 'belongsTo', model: 'Doctor',    name: 'doctor'}
//            ],
//            proxy: {
//                type: "prescriptionstorage"
//            }
        });

app.stores.prescriptions = new Ext.data.Store({
            model: "app.models.Prescription",
                        proxy: {
                type: 'memory'
            }
        });