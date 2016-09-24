//begin express
var express = require('express');
var app = express();
//require
var pg = require('pg');
var massive  = require('massive');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var multer = require('multer');

//routes
var routes = require('./routes/index');
var job_positions = require('./routes/job_positions');
var categories = require('./routes/categories');
var skills = require('./routes/skills');


//configuration file
var config = require('./config.json');
//connection to database
var localdb_url = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;
var connectionString = process.env.DATABASE_URL || localdb_url;
var massiveInstance = massive.connectSync({connectionString: connectionString});
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//======================================================================
//express configuration

app.set('db', massiveInstance);
app.set('port', (process.env.PORT || 5000));
//setting views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//esto hay que cambiar ->
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/images', express.static(__dirname + "/images"));
//<-

var handleError = function(res){
	return function(err){
		console.log(err);
		res.send(500,{error: err.message});
	}
}

var db = app.get('db');

app.use(function(request, response, next){
	request.db = db;
	next();
});

app.use('/',routes,job_positions,categories,skills);

//solo de prueba ->
app.get('/test', function(request, response){
	response.sendFile(__dirname + "/" + "index.html");
});

app.get("/process_get", function(request, response){
	res = {
		first_name: request.query.first_name,
		last_name: request.query.last_name,
	};
	console.log(res);
	response.end(JSON.stringify(res));
});

app.post("/process_post", function(request, response){	
	res = {
		first_name: request.body.first_name,
		last_name: request.body.last_name
	};
	console.log(res);
	response.end(JSON.stringify(res));
});
//<-

//start listening
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

