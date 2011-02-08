var db = {
    Doctor: null,


    init: function(callback) {
        persistence.store.websql.config(persistence, 'pillpopper', 'pill popper database', 5 * 1024 * 1024);

        //persistence.reset();

        this.Doctor = persistence.define('Doctor', {
                    name: "TEXT"
                });

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