var wolframController = function (urlDB) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;

    var query = function(req, res){

        req.checkBody('content', 'Content is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: { statusCode:400, errorMessage: errors}});
            return;
        }

        var content = req.body.content;

        var Client = require('node-wolfram');
        var Wolfram = new Client('VWHLPH-699HL3R8Y7');
        Wolfram.query(content, function(err, result) {
            if(err){
                console.log(err);
                res.status(500);
                res.send(err);
            }
            else
            {
                var text = null;
                for(var a=0; a<result.queryresult.pod.length; a++)
                {
                    var pod = result.queryresult.pod[a];
                    // console.log(pod.$.title,": ");
                    for(var b=0; b<pod.subpod.length; b++)
                    {
                        var subpod = pod.subpod[b];
                        for(var c=0; c<subpod.plaintext.length; c++)
                        {
                            if(pod.$.title === "Result") {
                                text = subpod.plaintext[c];
                            }
                            // console.log('\t', subpod.plaintext[c]);
                        }
                    }
                }
                if( text === null){
                    res.status(400);
                    res.send({data: null, error: {errorMessage: "Bad request"}});
                }else{
                    res.status(200);
                    res.send({data: {result: text}, error: null});
                }
            }
        });

    };

    return {
        query: query
    }
};



module.exports = wolframController;
