var express = require('express');
var router = express.Router();

//Listar todo
router.get("/skills", function(req, res, next){
	req.db.query("SELECT * FROM skills", function (err, skills){
        if (err){
            return next(err);
        };
		var metadata={
			version:0.1,
			count:skills.length
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
    //Error 404 categoria inexistente
    var category = req.db.categories.findSync({name:req.params.category});
    if (category.length === 0){
        res.status(404).send("Categoria Inexistente");
        return;
    };
    
	req.db.skills.find({category:req.params.category}, function(err, skills){
        if (err){
            return next(err);
        };
		var metadata={
			version:0.1,
			count:skills.length
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
    //Error 400 Incumplimiento de Precondiciones
    if ( !req.body.hasOwnProperty("name") ||  req.body.name === "" || !req.body.hasOwnProperty("description")){
        res.status(400).send("Incumplimiento de precondiciones");
        return;
    };
    
    //Error 404 Categoria Inexistente
    var category = req.db.categories.findSync({name:req.params.category});
    if (category.length === 0){
        res.status(404).send("Categoria Inexistente");
        return;
    };
    
	req.db.skills.insert({name:req.body.name,description:req.body.description,category:req.params.category},function (err,data){
        if (err){
            return next(err);
        };
		res.status(201).send(data);
	});
});


//Baja de Puesto
router.delete('/skills/categories/:category/:name', function(req, res, next){
    //Error 404 No existe el recurso solicitado
    var skill = req.db.skills.findSync({name:req.params.name, category:req.params.category});
    if (skill.length === 0){
        res.status(404).send("No existe el recurso solicitado");
        return;
    }
    
	req.db.skills.destroy({name:req.params.name, category:req.params.category},function(err, data){
        if (err){
            return next(err);
        };
		res.status(204).send(data);
	});
});

//Modificacion de puesto
router.put('/skills/categories/:category/:name', function(req, res, next){
    //Error 404 No existe el recurso solicitado
    var skill = req.db.skills.findSync({name:req.params.name, category:req.params.category});
    if (skill.length === 0){
        res.status(404).send("No existe el recurso solicitado");
        return;
    }
    
	req.db.skills.update({name:req.params.name, category:req.params.category, description:req.body.description},function(err, data){
        if (err){
            return next(err);
        };
		res.status(200).send(data);
	});
});

module.exports = router;
