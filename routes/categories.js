var express = require('express');
var router = express.Router();

router.get("/categories", function(request, response){
	request.db.query("SELECT * FROM categories", function (err, data){
		response.status(200).send(data);
	});
});

module.exports = router;
