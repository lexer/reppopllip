app.models.Prescription = Ext.regModel("app.models.Prescription", {
    fields: [
        {name: "id", type: "string"},
        {name: "name", type: "string"},
        {name: "description", type: "string"},
        {name: "quantity", type: "int", defaultValue: 1},
        {name: 'doctor_id', type: 'string'},
        {name: 'doctor_name', type: 'string'},
        {name: 'frequency_name', type: 'string'},
        {name: 'frequency', type: 'integer'},
        {name: 'created', type: 'date'},
        {name: 'next_time', type: 'date'},
        {name: 'taken', type: 'date'}
    ]

//            associations: [
//                {type: 'belongsTo', model: 'Doctor',    name: 'doctor'}
//            ],
//            proxy: {
//                type: "prescriptionstorage"
//            }
});

app.models.Prescription.createFromEntity = function(entity) {
    return new app.models.Prescription({
        id: entity.id,
        name: entity.name,
        doctor_name: entity.doctor ? entity.doctor.name : "",
        doctor_id: entity.doctor ? entity.doctor.id : "",
        description: entity.description,
        quantity: entity.quantity,
        taken: entity.taken,
        frequency: entity.frequency,
        frequency_name: app.stores.frequencies.getByValue(entity.frequency).text,
        take: app.stores.frequencies.getTakeDate(entity, entity.frequency)
    });
}

app.stores.frequencies = {
    items: [
//        {value:0, text: "1 Times per Day" },
//        {value:1, text: "2 Times per Day"},
//        {value:2, text: "3 Times per Day"},
//        {value:3, text: "4 Times per Day" },
        {value:0, text: "Every 1 Hours" },
        {value:1, text: "Every 2 Hours"},
        {value:2, text: "Every 3 Hours"},
        {value:3, text: "Every 4 Hours"}
    ],

    getTakeDate: function(pill, frequencyValue) {
        var hourCount = 0;
        if (frequencyValue == 0) {
            hourCount = 1;
        }

        if (frequencyValue == 1) {
            hourCount = 2;
        }

        if (frequencyValue == 2) {
            hourCount = 3;
        }

        if (frequencyValue == 3) {
            hourCount = 4;
        }
        
        if (pill.taken == null) {
            return new Date();
        } else {
            var next = new Date(pill.taken).add(Date.HOUR, hourCount);
            if (next < new Date()) {
                return new Date();
            } else {
                return new Date(next);
            }
        }
    },

    getByValue: function(val) {
        return _.detect(this.items,
                function(f) {
                    return f.value == val;
                });
    },

    clone: function() {
        return _.map(this.items, function(f) {
            return { text: f.text, value: f.value};
        });
    }
};


app.stores.prescriptions = new Ext.data.Store({
    model: "app.models.Prescription",
    proxy: {
        type: 'memory'
    }
});