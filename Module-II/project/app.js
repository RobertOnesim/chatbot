var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cors = require('cors');

var app = express();

var port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressValidator());

var urlDB = 'mongodb://localhost:27017/chatbot';

var userRoutes = require('./routes/userRoutes')(urlDB);
var aimlRoutes = require('./routes/aimlRoutes')(urlDB);


app.use('/api/chatbot/user', userRoutes);
app.use('/api/chatbot/aiml', aimlRoutes);

app.get('/api/chatbot/', function (req, res) {
    res.send({message: 'Hello. my API for user ...'});
});

app.listen(port, function () {
    console.log('gulp is running on PORT:' + port);
});

module.exports = app;