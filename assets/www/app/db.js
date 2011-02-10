var db = {
    Doctor: null,
    Prescription: null,


    init: function(callback) {
        persistence.store.websql.config(persistence, 'pillpopper', 'pill popper database', 5 * 1024 * 1024);

        //persistence.reset();

        this.Doctor = persistence.define('Doctor', {
                    name: "TEXT",
                    address: "TEXT",
                    city: "TEXT",
                    state: "TEXT",
                    phone: "TEXT"
                });

        this.Prescription = persistence.define('Prescription', {
                    name: "TEXT",
                    description: "TEXT",
                    quantity: "INT"
                });

        this.Doctor.hasMany('prescriptions', this.Prescription, 'doctor');

        persistence.schemaSync(function(tx) {
            // tx is the transaction object of the transaction that was
            // automatically started
            console.log("Schema Sync!");
            callback();
        });
    },

    seed: function() {

        var doctor = new this.Doctor({
                    name: "Sammy Caranza",
                    address: "111 Lawrence Street",
                    city: "Brooklyn",
                    state: "NY",
                    phone: "34234324324"
                });
        var prescription = new this.Prescription({
                    name: "MegaPill",
                    description: "Very powerful pill",
                    quantity: 3
                });

        prescription.doctor = doctor;
        persistence.add(doctor);
        persistence.add(prescription);
    }
}

//Doctor.all()
//.filter("name",'=',"Krevedko")
//.or(new persistence.PropertyFilter('name', '=', "Kurnikova"))
//.order("name", false)
//.list(null,function(results) {
//	results.forEach(function (r) {
//		console.log(r.name);
//		});
//});
//},