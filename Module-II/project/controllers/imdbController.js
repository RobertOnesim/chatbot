var imdbController = function (urlDB) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;
    var imdb = require('imdb-api');

    var query = function(req, res){

        req.checkBody('content', 'Content is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: { statusCode:400, errorMessage: errors}});
            return;
        }

        var content = req.body.content;

        imdb.get(content)
            .then(function(data){
                if(data.series === true){
                    data.episodes().then(function(dataE) {
                        data._episodes = dataE;
                        res.status(200);
                        res.send({data: data, error: null});
                    });
                }else{
                    res.status(200);
                    res.send({data: data, error: null});
                }
            })
            .catch(function(err){
                res.status(400);
                res.send({data: null, error: { statusCode:400, errorMessage: err}});
            });

    };

    return {
        query: query
    }
};



module.exports = imdbController;
