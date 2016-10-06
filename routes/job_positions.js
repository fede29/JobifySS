var express = require('express');
var router = express.Router();

//listar todo
router.get('/job_positions',function(req,res,next){
	req.db.query("SELECT * FROM job_positions", function (err, job_positions){
		if (err){
			return next(err);
		}
		var metadata={
			version:0.1,
			count:job_positions.length
		};
		var data = {
			job_positions,
			metadata
		};	
		res.status(200).send(data);
	});
	//Error 500, Unexpected error.
});

//listar por categoria
router.get('/job_positions/categories/:category',function(req,res,next){
	req.db.job_positions.find({category:req.params.category}, function(err, job_positions){
		var metadata={
			version:0.1,
			count:job_positions.length
		};
		var data = {
			job_positions,
			metadata
		};
		res.status(200).send(data);
	});
	//Error 404, Categoria Inexistente
	//Error 500, Unexpected Error
});

//Alta de puesto
router.post('/job_positions/categories/:category', function(req, res, next){
	req.db.job_positions.insert({name:req.body.name,description:req.body.description,category:req.params.category},function (err,data){
		res.status(201).send(data);
	});
	//Error 400 Incumplimiento de Precondiciones
	//Error 404 Categoria Inexistente
	//Error 500 Unexpected Error
});


//Baja de Puesto
router.delete('/job_positions/categories/:category/:name', function(req, res, next){
	req.db.job_positions.destroy({name:req.params.name, category:req.params.category},function(err, data){
		res.status(204).send(data);
	});
	//Error 404 No existe el recurso solicitado
	//Error 500 Unexpected Error
});

//Modificacion de puesto
router.put('/job_positions/categories/:category/:name', function(req, res, next){
	req.db.job_positions.update({name:req.params.name, category:req.params.category, description:req.body.description},function(err, data){
		res.status(200).send(data);
	});
	//Error 404 No existe el recurso solicitado
	//Error 500 Unexpected Error
});

module.exports = router;
