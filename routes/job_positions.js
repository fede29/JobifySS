var express = require('express');
var router = express.Router();

router.get('/job_positions',function(req,res,next){
	req.db.query("SELECT * FROM job_positions", function (err, job_positions){
		var meta_data={
			version:0.1,
			count:1
		};
		var data = {
			job_positions,
			meta_data
		};	
		res.status(200).send(data);
	});
});

router.get('/job_positions/categories/:category',function(req,res,next){
	//res.status(200).send(req.params.category);
	console.log("1");
	var query = "SELECT * FROM job_positions where category=";
	query+=req.params.category;
	console.log(query)
	req.db.query(query, function(err, data){
		console.log("2");
		console.log(data)
		res.status(200).send(data);
	});
});

module.exports = router;
