var express = require('express');
var router = express.Router();

router.get("/skills", function(request, response){
	request.db.query("SELECT * FROM skills", function (err, data){
		response.status(200).send(data);
	});
});

module.exports = router;
