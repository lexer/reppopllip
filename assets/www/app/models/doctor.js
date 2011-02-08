app.models.Doctor = Ext.regModel("app.models.Doctor", {
            fields: [
                {name: "id", type: "string"},
                {name: "name", type: "string"}
            ]
        });

Ext.data.ProxyMgr.registerType("doctorstorage", Ext.extend(Ext.data.Proxy, {
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

            },
            destroy: function(operation, callback, scope) {

            }
        })
);

app.stores.doctors = new Ext.data.Store({
            model: "app.models.Doctor",
            proxy: {
                type: "doctorstorage"
            }
//    data : [
//        {id: 1, name: 'Spencer'},
//        {id: 2, name: 'Maintz'},
//        {id: 3, name: 'Conran'},
//        {id: 4, name: 'Avins'}
//    ]
        });