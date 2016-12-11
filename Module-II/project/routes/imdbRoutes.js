var express = require('express');

var routes = function (urlDB) {

    var imdbRouter = express.Router();
    var imdbController = require('../controllers/imdbController')(urlDB);

    imdbRouter.route('/')
        .post(imdbController.query);


    return imdbRouter;
};

module.exports = routes;
