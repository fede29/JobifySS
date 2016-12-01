//begin express
var express = require('express');
var app = express();

//require

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
var common = require('./routes/common');

//configuration file
var config = require('./config.json');

//connection to database
console.log("Connecting to DB...");
var localdb_url = "postgres://"+config.postgres.user+":"+config.postgres.password+"@"+config.postgres.host+"/"+config.postgres.db;
var connectionString = process.env.DATABASE_URL || localdb_url;
var massiveInstance = massive.connectSync({connectionString: connectionString});
var db = app.get('db');

console.log("Configuring App...");
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//========express configuration=============//

app.set('db', massiveInstance);
app.set('port', (process.env.PORT || 5000));
//setting views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

//esto hay que cambiar ->
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/images', express.static(__dirname + "/images"));
app.use('/src', express.static(__dirname + "/src"));
app.use('/views/pages', express.static(__dirname + "/views/pages"));
//<-

//error handling
function errorHandler(err,req,res,next) {
    console.log("Despues del Error");
    console.log(err.message);
	res.status(500);
	res.render('Error', {error: err});
};

app.use(errorHandler);

//para  uso de la base de datos
var db = app.get('db');

app.use(function(request, response, next){ //hay que cambiar para que lo use solo cuando lo necesita.
	request.db = db;
    request.version = config.version;
	next();
});

app.use('/',routes,job_positions,categories,skills,common);

//===========================================================================//

//start listening
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
