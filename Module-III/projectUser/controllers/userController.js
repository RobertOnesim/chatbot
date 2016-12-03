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
                        res.send(results);
                        db.close();
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({msg: err})
                    });
            })
            .catch(function (err) {
                res.status(500);
                res.send({msg: err})
            });
    };

    var postUser = function (req, res) {
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send(errors);
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
                            res.send({param: "username", msg: "This username already exists"});
                        } else {
                            collection.insertOne(newUser)
                                .then(function (results) {
                                    res.status(201);
                                    res.send(results.ops[0]);
                                    db.close();
                                })
                                .catch(function (err) {
                                    res.status(400);
                                    res.send({msg: err})
                                });
                        }
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({msg: err})
                    });
            })
            .catch(function (err) {
                res.status(500);
                res.send({msg: err})
            });
    };

    var loginUser = function (req, res) {
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.status(400);
            res.send(errors);
            return;
        }
        mongodb.connect(urlDB)
            .then(function (db) {
                var collection = db.collection('user');
                collection.findOne(req.body)
                    .then(function (result) {
                        if (result) {
                            res.status(200);
                            res.send({msg: "Success", user: result});
                        } else {
                            res.status(404);
                            res.send({msg: 'Not found'});
                        }
                        db.close();
                    })
                    .catch(function (err) {
                        res.status(400);
                        res.send({msg: err})
                    });
            })
            .catch(function (err) {
                res.status(400);
                res.send({msg: err})
            });
    };

    var updateUser = function (req, res){

    };

    return {
        getUsers: getUsers,
        postUser: postUser,
        loginUser: loginUser,
        updateUser: updateUser
    }
};

module.exports = userController;
