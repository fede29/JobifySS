var express = require('express');
var router = express.Router();

router.get('/job_positions',function(req,res,next){
	req.db.query("SELECT * FROM job_positions", function (err, job_positions){
		var metadata={
			version:0.1,
			count:1
		};
		var data = {
			job_positions,
			metadata
		};	
		res.status(200).send(data);
	});
});

router.get('/job_positions/categories/:category',function(req,res,next){
	req.db.job_positions.find({category:req.params.category}, function(err, job_positions){
		var metadata={
			version:0.1,
			count:1
		};
		var data = {
			job_positions,
			metadata
		};
		res.status(200).send(data);
	});
});

module.exports = router;
