var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var database = require('./database');
var authenticate = require('./authenticate');
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
    app.use(cookieParser());

    app.get('/', function(req, res) {
        return res.sendFile('index.html');
    });

    app.get('/profile', authenticate.auth, function(req, res) {
        return res.sendFile('index.html', {root: "./frontend/pages"});
    });

    app.get('/register' , function(req,res) {
        return res.sendFile('account_registration.html', { root: "./frontend/pages" });
    });

    var apiRouter = express.Router();

    apiRouter.post('/create-login', function(req, res, next) {
        authenticate.register(req, function(data){
            res.json(data);
            next();
        });
    });

    apiRouter.post('/sign-in', function(req, res, next) {
        authenticate.signin(req, function(data) {
            res.json(data);
            next();
        });
    });

    app.use('/api', apiRouter);

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('The thunderdome awaits...\n');
    });
})
