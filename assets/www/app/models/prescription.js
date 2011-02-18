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
        {name: 'taken', type: 'date'}
    ]

//            associations: [
//                {type: 'belongsTo', model: 'Doctor',    name: 'doctor'}
//            ],
//            proxy: {
//                type: "prescriptionstorage"
//            }
});

app.stores.frequencies = {
    items: [
        {value:0, text: "1 Times per Day"},
        {value:1, text: "2 Times per Day"},
        {value:2, text: "3 Times per Day"},
        {value:3, text: "4 Times per Day"},
        {value:4, text: "Every 1 Hours"},
        {value:5, text: "Every 2 Hours"},
        {value:6, text: "Every 3 Hours"},
        {value:7, text: "Every 4 Hours"}
    ],
    getByValue: function(val) {
        return _.detect(this.items,
                function(f) {
                    return f.value == val;
                });
    },

    clone: function(){
        _.map(this.items, function(f) {
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