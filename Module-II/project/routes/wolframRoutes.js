var express = require('express');

var routes = function (urlDB) {

    var wolframRouter = express.Router();
    var wolframController = require('../controllers/wolframController')(urlDB);

    wolframRouter.route('/')
        .post(wolframController.query);


    return wolframRouter;
};

module.exports = routes;
