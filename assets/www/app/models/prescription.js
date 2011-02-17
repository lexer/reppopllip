app.models.Prescription = Ext.regModel("app.models.Prescription", {
            fields: [
                {name: "id", type: "string"},
                {name: "name", type: "string"},
                {name: "description", type: "string"},
                {name: "quantity", type: "int", defaultValue: parseInt(1)},
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