var express = require('express');
var router = express.Router();

//Listar todo
router.get("/categories", function(request, response){
	request.db.query("SELECT * FROM categories", function (err, categories){
		var metadata = {
			version:0.1,
			count:categories.length
		};
		var data = {
			categories,
			metadata
		};
		response.status(200).send(data);
	});
});

//Alta de puesto
router.post('/categories', function(req, res, next){
	req.db.categories.insert({name:req.body.name,description:req.body.description},function (err,data){
		res.status(201).send(data);
	});
	//Error 400 Incumplimiento de Precondiciones
	//Error 404 Categoria Inexistente
	//Error 500 Unexpected Error
});


//Baja de Puesto
router.delete('/categories/:name', function(req, res, next){
	req.db.job_positions.destroy({name:req.params.name},function(err, data){
		res.status(204).send(data);
	});
	//Error 404 No existe el recurso solicitado
	//Error 500 Unexpected Error
});

//Modificacion de puesto
router.put('/categories/:name', function(req, res, next){
	req.db.job_positions.update({name:req.params.name, description:req.body.description},function(err, data){
		res.status(200).send(data);
	});
	//Error 404 No existe el recurso solicitado
	//Error 500 Unexpected Error
});

module.exports = router;
