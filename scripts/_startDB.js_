var massive = require ('massive');

var config = require('../config.json');

//connection to database
var localdb_url = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;
var connectionString = process.env.DATABASE_URL || localdb_url;
var db = massive.connectSync({connectionString: connectionString});

db.start_db([],function(err, res){
	console.log("Empezando la Base de Datos");
});

