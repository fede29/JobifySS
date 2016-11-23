var express = require('express');
var router = express.Router();

//Listar todo
router.get("/categories", function(req, res, next){
	req.db.query("SELECT * FROM categories", function (err, categories){
        if (err){
            return next(err);
        };
		var metadata = {
			version:0.1,
			count:categories.length
		};
		var data = {
			categories,
			metadata
		};
		res.status(200).send(data);
	});
});

//Alta de categoria
router.post('/categories', function(req, res, next){
    //Error 400 Incumplimiento de Precondiciones
    if ( !req.body.hasOwnProperty("name") ||  req.body.name === "" || !req.body.hasOwnProperty("description")){
        res.status(400).send("Incumplimiento de precondiciones");
        return;
    }
	req.db.categories.insert({name:req.body.name,description:req.body.description},function (err,data){
        if (err){
            return next(err);
        };
		res.status(201).send(data);
	});
});


//Baja de Categoria
router.delete('/categories/:name', function(req, res, next){
    //Error 404 No existe el recurso solicitado
    var category = req.db.categories.findSync({name:req.params.name});
    if (category.length === 0){
        res.status(404).send("No existe el recurso solicitado");
        return;
    }
    
	req.db.categories.destroy({name:req.params.name},function(err, data){
        if (err){
            return next(err);
        };
		res.status(204).send(data);
	});
});

//Modificacion de Categoria
router.put('/categories/:name', function(req, res, next){
    //Error 400 Incumplimiento de precondiciones
    if ( !req.body.hasOwnProperty("name") ||  req.body.name === "" || !req.body.hasOwnProperty("description")){
        res.status(400).send("Incumplimiento de precondiciones");
        return;
    }
    
    //Error 404 No existe el recurso solicitado
    var category = req.db.categories.findSync({name:req.params.name});
    if (category.length === 0){
        res.status(404).send("No existe el recurso solicitado");
        return;
    }
    
	req.db.categories.update({name:req.params.name, description:req.body.description},function(err, data){
        if (err){
            return next(err);
        };
		res.status(200).send(data);
	});
});

module.exports = router;
