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
var wolframRoutes = require('./routes/wolframRoutes')(urlDB);
var imdbRoutes = require('./routes/imdbRoutes')(urlDB);
var newsRoutes = require('./routes/newsRoutes')();

app.use('/api/chatbot/user', userRoutes);
app.use('/api/chatbot/aiml', aimlRoutes);
app.use('/api/chatbot/wolfram', wolframRoutes);
app.use('/api/chatbot/imdb', imdbRoutes);
app.use('/api/chatbot/news', newsRoutes);


app.get('/api/chatbot/', function (req, res) {
    res.send({message: 'Hello. my API for user ...'});
});

app.listen(port, function () {
    console.log('gulp is running on PORT:' + port);
});

module.exports = app;