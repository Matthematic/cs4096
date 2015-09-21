var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var database = require('./database');
var authenticate = require('./signup');
var connection = database.connection;

process.on('SIGINT', function() {
    console.log('Closing database connection...');
    connection.end(function(err) {
        if(typeof err == "undefined") {
            console.log ('Could not close connection: ' + err.stack);
        } else {
            console.log ('Connection closed successfully.');
        }
    });
});

connection.query('SELECT 1', function(err, rows) {
    if(err) {
        console.error("Could not connect to the database.");
    } else {
        console.log('connected to database: ' + connection.threadId);
    }
    var app = express();

    app.use(express.static('.tmp/'));
    app.use(express.static('frontend/pages'));
    app.use('/bower_components', express.static('bower_components'));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.get('/', function(req, res) {
        return res.sendFile('index.html');
    });

    app.get('/register' , function(req,res) {
        return res.sendFile('account_registration.html', { root: "./frontend/pages" });
    });

    app.use(authenticate.auth);

    app.get('/profile', function(req, res) {
        return res.sendFile('index.html', './frontend/pages');
    });

    var apiRouter = express.Router();

    apiRouter.post('/api/create-login', function(req, res) {
        return res.json(authenticate.register(req.body.username, req.body.email, req.body.password));
    });

    apiRouter.post('/api/sign-in', function(req, res) {
        return res.json(authenticate.signin(req.body.username, req.body.password));
    });

    authRouter.get('/api/profile', function(req, res) {
        return res.sendFile('index.html', './frontend/pages');
    });

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('listening for stuff\n');
    });
})
