var aimlController = function (urlDB) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;
    var fs = require('fs');

    var addQuestionAnswer = function(req, res){

        var question = req.body.question;
        var answer = req.body.answer;

        var content = "<category> <pattern> " + question + "</pattern> <template> " + answer + "</template> </category>";

        var fileName = '../aiml/file.aiml',
            buffer = new Buffer(content+"\n"+ "\n"+ "</aiml>"),
            fileSize = fs.statSync(fileName)['size'];

        fs.open(fileName, 'r+', function(err, fd) {
            fs.write(fd, buffer, 0, buffer.length, fileSize-8, function(err) {
                if(err) {
                    res.send({msg: "not good"})
                }else {
                    res.send({msg: "ieiii"});
                }
            });
        });

    };

    return {
        addQuestionAnswer: addQuestionAnswer
    }
};



module.exports = aimlController;
