var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'apples',
    database: 'test'
});

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

connection.connect(function(err) {
    if(err) {
        console.error('error connecting to database: ' + err.stack);
    }

    console.log('connected to database: ' + connection.threadId);

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

    app.post('/api/create-login', function(req, res) {

        connection.query('INSERT INTO Users(UserID, UserName, Email, Password) VALUES (NULL, \"' + req.body.username + '\", \"' + req.body.password + '\", \"' + req.body.email + '\")', function(err){
            if(err) {
                console.log('Could not create login. Error ' + err.stack);
            } else {
                console.log('Account Created.');
            }
        });

    });

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('listening for stuff\n');
    });
});


