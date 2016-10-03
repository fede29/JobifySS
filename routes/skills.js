var express = require('express');
var router = express.Router();

//Listar todo
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

//Listar por categoria
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
	
//Alta de puesto
router.post('/skills/categories/:category', function(req, res, next){
	req.db.skills.insert({name:req.body.name,description:req.body.description,category:req.params.category},function (err,data){
		res.status(201).send(data);
	});
	//Error 400 Incumplimiento de Precondiciones
	//Error 404 Categoria Inexistente
	//Error 500 Unexpected Error
});


//Baja de Puesto
router.delete('/skills/categories/:category/:name', function(req, res, next){
	req.db.skills.destroy({name:req.params.name, category:req.params.category},function(err, data){
		res.status(204).send(data);
	});
	//Error 404 No existe el recurso solicitado
	//Error 500 Unexpected Error
});

//Modificacion de puesto
router.put('/skills/categories/:category/:name', function(req, res, next){
	req.db.skills.update({name:req.params.name, category:req.params.category, description:req.body.description},function(err, data){
		res.status(200).send(data);
	});
	//Error 404 No existe el recurso solicitado
	//Error 500 Unexpected Error
});

module.exports = router;
