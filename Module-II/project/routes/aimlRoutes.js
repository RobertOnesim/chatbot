var express = require('express');

var routes = function (urlDB) {

    var aimlRouter = express.Router();
    var aimlController = require('../controllers/aimlController')(urlDB);

    aimlRouter.route('/')
        .post(aimlController.addQuestionAnswer);


    return aimlRouter;
};

module.exports = routes;
