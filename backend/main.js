var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var session = require('express-session');

var database = require('./database');
var connection = database.connection;

require('./signup.js')(passport);

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

    app.use(session({secret: 'supersecretsession'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    app.get('/', function(req, res) {
        console.log("going to root");
        return res.sendFile('index.html');
    });

    app.get('/sign-in' , function(req,res) {
        console.info("blah");
        return res.sendFile('account_registration.html', { root: "./frontend/pages" });
    });

    app.get('/api/sign-in-redirect', function(req, res) {
        if(req.isAuthenticated()) {
            res.redirect('/');
        } else {
            res.redirect('/sign-in?error=1');
        }
    });

    app.post('/api/create-login', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/api/sign-in-redirect',
        failureFlash: true
    }));

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('listening for stuff\n');
    });
})



