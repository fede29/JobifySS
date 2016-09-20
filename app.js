var express = require('express');
var pg = require('pg');
var massive  = require('massive');
var bodyParser = require ('body-parser');
var serveStatic = require('serve-static');
var multer = require('multer');

var config = require('./config.json');

var connectionString = process.env.DATABASE_URL || "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;

var massiveInstance = massive.connectSync({connectionString: connectionString});

var app = express();

app.set('db', massiveInstance);

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// setting views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
/*
db.job_positions.find({name : "developer"}, function(err, res){
	console.log(res);
});

var new_jpos = {
	name : 'test_name',
	description : 'test_description',
	category: 'test_category'
};

db.job_positions.save(new_jpos, function(err, result){
	console.log(result);
});

db.job_positions.find({name:"test_name"}, function(err, res){
	console.log(res);
});

db.query("SELECT * FROM job_positions", function(err, data){
	//res.status(200).send(data);
	console.log(data);
});

*/
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

app.post("/process_post", urlencodedParser, function(request, response){	
	res = {
		first_name: request.body.first_name,
		last_name: request.body.last_name
	};
	console.log(res);
	response.end(JSON.stringify(res));
});
//<-

app.get("/job_positions", function(request, response){
	db.query("SELECT * FROM job_positions", function (err, data){
		response.status(200).send(data);
	});
});

app.get("/categories", function(request, response){
	db.query("SELECT * FROM categories", function (err, data){
		response.status(200).send(data);
	});
});

app.get("/skills", function(request, response){
	db.query("SELECT * FROM skills", function (err, data){
		response.status(200).send(data);
	});
});
	


//inicio de app
app.get('/', function(request, response){
	response.render('pages/jobify');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

