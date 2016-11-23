var express = require('express');
var router = express.Router();

//listar todo
router.get('/job_positions',function(req,res,next){
	req.db.query("SELECT * FROM job_positions", function (err, job_positions){
		if (err){
			return next(err);
		}
		var metadata={
			version:req.version,
			count:job_positions.length
		};
		var data = {
			job_positions,
			metadata
		};	
		res.status(200).send(data);
	});
});

//listar por categoria
router.get('/job_positions/categories/:category',function(req,res,next){
    req.db.categories.find({name:req.params.category}, function (err, categories){
        if (err){
            return next(err);
        };
        //Error 404, Categoria Inexistente
        if (categories.length === 0){
            res.status(404).send("Categoria Inexistente");
        }
        else{
            req.db.job_positions.find({category:req.params.category}, function(err, job_positions){
                if (err){
                    return next(err);
                };
                var metadata={
                    version:req.version,
                    count:job_positions.length
                };
                var data = {
                    job_positions,
                    metadata
                };
                res.status(200).send(data);
            });
        }
	});
});

//Alta de puesto
router.post('/job_positions/categories/:category', function(req, res, next){
    //Error 400 Incumplimiento de Precondiciones
    if ( !req.body.hasOwnProperty("name") ||  req.body.name === "" || !req.body.hasOwnProperty("description")){
        res.status(400).send("Incumplimiento de precondiciones");
        return;
    }
    //Error 404 Categoria Inexistente
    var category = req.db.categories.findSync({name:req.params.category});
    if (category.length === 0){
        res.status(404).send("Categoria Inexistente");
    }else{
        req.db.job_positions.insert({name:req.body.name,description:req.body.description,category:req.params.category},function (err,data){
            console.log(err);
            if (err){
                return next(err);
            };
            res.status(201).send(data);
        });
    };
});


//Baja de Puesto
router.delete('/job_positions/categories/:category/:name', function(req, res, next){
    //Error 404 No existe el recurso solicitado
    var job_position = req.db.job_positions.findSync({name:req.params.name, category:req.params.category});
    if (job_position.length === 0){
        res.status(404).send("No existe el recurso solicitado");
        return;
    }
	req.db.job_positions.destroy({name:req.params.name, category:req.params.category},function(err, data){
        if (err){
            return next(err);
        };
		res.status(204).send(data);
	});
});

//Modificacion de puesto
router.put('/job_positions/categories/:category/:name', function(req, res, next){
    //Error 404 No existe el recurso solicitado
    var job_position = req.db.job_positions.findSync({name:req.params.name, category:req.params.category});
    if (job_position.length === 0){
        res.status(404).send("No existe el recurso solicitado");
        return;
    }
	req.db.job_positions.update({name:req.params.name, category:req.params.category, description:req.body.description},function(err, data){
        if (err){
            return next(err);
        };
		res.status(200).send(data);
	});
});

module.exports = router;
