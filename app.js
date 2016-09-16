var express = require('express');
var pg = require('pg');
var app = express();
var massive  = require('massive');
var connectionString = process.env.DATABASE_URL

var massiveInstance = massive.connectSync({connectionString: connectionString});


//connect to database

var bodyParser = require ('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// setting views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//esto hay que cambiar ->
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/images', express.static(__dirname + "/images"));
//app.use('/', express.static(__dirname));
//<-


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
	pos = positions;
	response.end(JSON.stringify(pos));
});


//inicio de app
app.get('/', function(request, response){
	response.render('pages/jobify');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


//posiciones hardcodeadas
var positions = [{
	"name": "developer",
	"description": "a software developer",
	"category": "software"
	},{
	"name": "project manager",
	"description": "a project manager",
	"category": "management"
	}
];

