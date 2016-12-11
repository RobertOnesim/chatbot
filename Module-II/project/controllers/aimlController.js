var aimlController = function (urlDB) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;
    var fs = require('fs');

    var addQuestionAnswer = function(req, res){

        req.checkBody('question', 'Question is required').notEmpty();
        req.checkBody('answer', 'Answer is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: { statusCode:400, errorMessage: errors}});
            return;
        }

        var question = req.body.question;
        var answer = req.body.answer;

        var content = "<category> <pattern> " + question + "</pattern> <template> " + answer + "</template> </category>";

        var fileName = '../aiml/file.aiml',
            buffer = new Buffer(content+"\n"+ "\n"+ "</aiml>"),
            fileSize = fs.statSync(fileName)['size'];

        fs.open(fileName, 'r+', function(err, fd) {
            fs.write(fd, buffer, 0, buffer.length, fileSize-8, function(err) {
                if(err) {
                    res.status(400);
                    res.send({data: null, error: {errorMessage: err}});
                }else {
                    res.status(200);
                    res.send({data: {successMessage: "Added content to file.aiml"}, error: null});
                }
            });
        });

    };

    return {
        addQuestionAnswer: addQuestionAnswer
    }
};



module.exports = aimlController;
