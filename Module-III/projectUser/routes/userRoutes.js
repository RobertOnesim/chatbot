var express = require('express');

var routes = function (urlDB) {

    var userRouter = express.Router();
    var userController = require('../controllers/userController')(urlDB);

    userRouter.route('/')
        .get(userController.getUsers)
        .post(userController.postUser);

    userRouter.route('/:username')
        .put(userController.updateUser);

    userRouter.route('/login')
        .post(userController.loginUser);

    return userRouter;
};

module.exports = routes;
