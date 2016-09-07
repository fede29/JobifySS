var express = require('express');
var app = express();
var bodyParser = require ('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/images', express.static(__dirname + "/images"));
app.use('/', express.static(__dirname));

console.log(__dirname);

app.get('/jobify', function(request, response){
	response.sendFile(__dirname + "/" + "Jobify.html");
});

app.get('/index.html', function(request, response){
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

app.get("/job_positions", function(request, response){
	pos = positions;
	response.end(JSON.stringify(pos));
});

var server = app.listen(8080, function () {
	
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Server running on port : "+ port);

});

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

