var PillPopper = {
	Doctor: null,

    init: function() {	
		this.initDb();
		
		//var doctor = new Doctor({name: "Krevedko"});		
		//Doctor.all().add(doctor);
				
		Doctor.all()
			.filter("name",'=',"Krevedko")
			.or(new persistence.PropertyFilter('name', '=', "Kurnikova"))
			.order("name", false)
			.list(null,function(results) {
				results.forEach(function (r) {
					console.log(r.name);		
					});
		});
    },
	
	initDb: function() {
		persistence.store.websql.config(persistence, 'pillpopper','pill popper database', 5 * 1024 * 1024);
		
		//persistence.reset();
	
		Doctor = persistence.define('Doctor', {
		  name: "TEXT"
		});
		
		persistence.schemaSync(function(tx) { 
			// tx is the transaction object of the transaction that was
			// automatically started
			//alert("Schema Sync!");
		});
	}
};