var express = require('express');
var router = express.Router();

router.get('/common/:name', function(req,res,next){
    var elements = {};
    
    var job_positions = req.db.job_positions.findSync({name:req.params.name});
    //job_positions.forEach(function(item, index, arr){
    //    item.resource = "job_position";
    //});
    
    var skills = req.db.skills.findSync({name:req.params.name});
    //skills.forEach(function(item, index, arr){
    //    item.resource = "skill";
    //});
    
    var categories = req.db.categories.findSync({name:req.params.name});
    //categories.forEach(function(item, index, arr){
    //    item.resource = "category";
    //});
    
    elements = {
        job_positions,
        skills,
        categories
    }
    res.status(200).send(elements);
});


module.exports = router;
