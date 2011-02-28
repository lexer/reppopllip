app.models.Doctor = Ext.regModel("app.models.Doctor", {
            fields: [
                {name: "id", type: "string"},
                {name: "name", type: "string"},
                {name: "address", type: "string"},
                {name: "city", type: "string"},
                {name: "state", type: "string"},
                {name: "phone", type: "string"}
            ]
//            associations: [
//                {type: 'hasMany', model: 'Prescription',    name: 'prescriptions'}
//            ],

//            proxy: {
//                type: "doctorstorage"
//            }
        });

app.stores.doctors = new Ext.data.Store({
            model: "app.models.Doctor",
            proxy: {
                type: 'memory'
            }
        });