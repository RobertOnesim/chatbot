var userController = function (urlDB) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;

    var getUsers = function (req, res) {
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.find()
                    .toArray()
                    .then(function (results) {
                        res.status(200);
                        res.send({data: results, error: null});
                        db.close();
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({data: null, error: {statusCode: 400, errorMessage: err}});
                    });
            })
            .catch(function (err) {
                res.status(500);
                res.send({data: null, error: {statusCode: 400, errorMessage: err}});
            });
    };

    var postUser = function (req, res) {
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: { statusCode:400, errorMessage: errors}});
            return;
        }

        var newUser = req.body;
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.findOne({username: req.body.username})
                    .then(function (result) {
                        if (result) {
                            res.status(400);
                            res.send({data: null, error: { statusCode:400, errorMessage: {param: "username", msg: "This username already exists"}}});
                        } else {
                            collection.insertOne(newUser)
                                .then(function (results) {
                                    res.status(201);
                                    res.send({data: results.ops[0], error: null});
                                    db.close();
                                })
                                .catch(function (err) {
                                    res.status(400);
                                    res.send({data: null, error: { statusCode:400, errorMessage: err}});
                                });
                        }
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({data: null, error: { statusCode:400, errorMessage: err}});
                    });
            })
            .catch(function (err) {
                res.status(500);
                res.send({data: null, error: { statusCode:500, errorMessage: err}});
            });
    };

    var loginUser = function (req, res) {
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: { statusCode:400, errorMessage: errors}});
            return;
        }
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.findOne(req.body)
                    .then(function (result) {
                        if (result) {
                            res.status(200);
                            res.send({data: result, error: null});
                        } else {
                            res.status(404);
                            res.send({data: null, error: { statusCode:404, errorMessage: 'User not found'}});
                        }
                        db.close();
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({data: null, error: { statusCode:400, errorMessage: err}});
                    });
            })
            .catch(function (err) {
                res.status(400);
                res.send({data: null, error: { statusCode:400, errorMessage: err}});
            });
    };

    var updateUser = function (req, res) {

    };

    return {
        getUsers: getUsers,
        postUser: postUser,
        loginUser: loginUser,
        updateUser: updateUser
    }
};

module.exports = userController;
