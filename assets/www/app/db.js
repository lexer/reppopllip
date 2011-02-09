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

        this.Prescription = persistence.define('Doctor', {
                    name: "TEXT",
                    description: "TEXT",
                    city: "TEXT",
                    quantity: "INT"
                });

                {name: "id", type: "string"},
                {name: "name", type: "string"},
                {name: "description", type: "string"},
                {name: "quantity", type: "int"},
                {name: 'doctor_id', type: 'string'}

        persistence.schemaSync(function(tx) {
            // tx is the transaction object of the transaction that was
            // automatically started
            console.log("Schema Sync!");
            callback();
        });
    },

    seed: function() {
        var doctorSammy = new this.Doctor({name: "Sammy"});
        var docotrAnthony = new this.Doctor({name: "Anthony"});
        persistence.add(doctorSammy);
        persistence.add(docotrAnthony);
    }
}