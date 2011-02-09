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