app.models.Doctor = Ext.regModel("app.models.Doctor", {
    fields: [
        {name: "id", type: "int"},
        {name: "name", type: "string"}
    ]
});

app.stores.doctors = new Ext.data.Store({
    model: "app.models.Doctor",
    data : [
        {id: 1, name: 'Spencer'},
        {id: 2, name: 'Maintz'},
        {id: 3, name: 'Conran'},
        {id: 4, name: 'Avins'}
    ]
});