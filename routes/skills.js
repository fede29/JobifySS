var express = require('express');
var router = express.Router();

router.get("/skills", function(req, res, next){
	req.db.query("SELECT * FROM skills", function (err, skills){
		var metadata={
			version:0.1,
			count:1
		};
		var data={
			skills,
			metadata
		};
		res.status(200).send(data);
	});
});

router.get("/skills/categories/:category", function(req, res, next){
	req.db.skills.find({category:req.params.category}, function(err, skills){
		var metadata={
			version:0.1,
			count:1
		};
		var data = {
			skills,
			metadata
		};
		res.status(200).send(data);
	});
});
	
	

module.exports = router;
