var http = require('http');
var dispatcher = require ('httpdispatcher');
var fs = require('fs');
var index = fs.readFileSync('index.html');
var connect = require('connect');
var serveStatic = require('serve-static');

const PORT=8080;

connect().use(serveStatic(__dirname)).listen(PORT, function(){
	console.log('Server running on 8080...');
});

