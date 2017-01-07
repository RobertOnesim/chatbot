var userController = function (urlDB) {

    var mongodb = require('mongodb').MongoClient;
    var objectId = require('mongodb').ObjectID;
    var lodash = require('lodash');

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
            res.send({data: null, error: {statusCode: 400, errorMessage: errors}});
            return;
        }

        var newUser = {
            username: req.body.username,
            password: req.body.password
        };
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.findOne({username: req.body.username})
                    .then(function (result) {
                        if (result) {
                            res.status(400);
                            res.send({
                                data: null,
                                error: {
                                    statusCode: 400,
                                    errorMessage: {param: "username", msg: "This username already exists"}
                                }
                            });
                        } else {
                            collection.insertOne(newUser)
                                .then(function (results) {
                                    res.status(201);
                                    res.send({data: results.ops[0], error: null});
                                    db.close();
                                })
                                .catch(function (err) {
                                    res.status(400);
                                    res.send({data: null, error: {statusCode: 400, errorMessage: err}});
                                });
                        }
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({data: null, error: {statusCode: 400, errorMessage: err}});
                    });
            })
            .catch(function (err) {
                res.status(500);
                res.send({data: null, error: {statusCode: 500, errorMessage: err}});
            });
    };

    var loginUser = function (req, res) {
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: {statusCode: 400, errorMessage: errors}});
            return;
        }
        var user = {
            username: req.body.username,
            password: req.body.password
        };
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.findOne(user)
                    .then(function (result) {
                        if (result) {
                            res.status(200);
                            res.send({data: result, error: null});
                        } else {
                            res.status(404);
                            res.send({data: null, error: {statusCode: 404, errorMessage: 'User not found'}});
                        }
                        db.close();
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({data: null, error: {statusCode: 400, errorMessage: err}});
                    });
            })
            .catch(function (err) {
                res.status(400);
                res.send({data: null, error: {statusCode: 400, errorMessage: err}});
            });
    };

    var updateUser = function (req, res) {
        req.checkParams('username', 'Username is required').notEmpty();
        req.checkBody('predicates', 'Predicates are required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send({data: null, error: {statusCode: 400, errorMessage: errors}});
            return;
        }
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.findOne({username: req.params.username})
                    .then(function (result) {
                        if (result) {
                            if (result.predicates === undefined) {
                                result.predicates = req.body.predicates;
                            } else {
                                for (var atr in req.body.predicates) {
                                    if (lodash.isArray(req.body.predicates[atr])) {
                                        if (result.predicates[atr]) {
                                            result.predicates[atr] = lodash.union(result.predicates[atr], req.body.predicates[atr]);
                                        }
                                        else {
                                            result.predicates[atr] = req.body.predicates[atr];
                                        }
                                    } else if (result.predicates[atr]) {
                                        result.predicates[atr] = req.body.predicates[atr];
                                    }
                                    else {
                                        result.predicates[atr] = req.body.predicates[atr];
                                    }
                                }
                            }
                            collection.updateOne({username: req.params.username}, result)
                                .then(function (results) {
                                    res.status(200);
                                    res.send({data: result, error: null});
                                    db.close();
                                })
                                .catch(function () {
                                    res.status(400);
                                    res.send({
                                        data: null,
                                        error: {statusCode: 400, errorMessage: "The object was the same"}
                                    });
                                });
                        } else {
                            res.status(404);
                            res.send({data: null, error: {statusCode: 404, errorMessage: 'User not found'}});
                        }
                        db.close();
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({data: null, error: {statusCode: 400, errorMessage: err}});
                    });
            })
            .catch(function (err) {
                res.status(400);
                res.send({data: null, error: {statusCode: 400, errorMessage: err}});
            });

    };

    return {
        getUsers: getUsers,
        postUser: postUser,
        loginUser: loginUser,
        updateUser: updateUser
    }
};

module.exports = userController;
