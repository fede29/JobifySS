var express = require('express');
var router = express.Router();

router.get('/job_positions',function(request,response,next){
	var db = request.db;
	db.query("SELECT * FROM job_positions", function (err, data){
		response.status(200).send(data);
	});
});

module.exports = router;
