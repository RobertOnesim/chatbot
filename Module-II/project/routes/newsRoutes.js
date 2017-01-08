var express = require('express');

var routes = function (urlDB) {

    var newsRouter = express.Router();
    var newsController = require('../controllers/newsController')(urlDB);

    newsRouter.route('/')
        .get(newsController.getNews);

    newsRouter.route('/sources')
        .get(newsController.getSources);

    return newsRouter;
};

module.exports = routes;
