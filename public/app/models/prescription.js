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
        {name: 'time', type: 'date', defaultValue: new Date()},
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
        time: entity.time,
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
        {value:0, text: "Day" },
        {value:1, text: "1 Hour" },
        {value:2, text: "2 Hours"},
        {value:3, text: "3 Hours"},
        {value:4, text: "4 Hours"},
        {value:5, text: "5 Hours"},
        {value:6, text: "6 Hours"},
        {value:7, text: "7 Hours"},
        {value:8, text: "8 Hours"}
    ],

    getTakeDate: function(pill, frequency) {
        var now = new Date();
        now.setSeconds(0, 0);

        var time = new Date();
        time.setHours(pill.time.getHours(), pill.time.getMinutes(), 0, 0, 0);

        if (pill.taken != null) {
            time = new Date().add(Date.HOUR, frequency);
        }

        if (now < time) {
            return time;
        }

        return now;
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