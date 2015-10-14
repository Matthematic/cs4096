var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

var database = require('./database');
var authenticate = require('./authenticate');
var tetris = require('./tetris');
var connection = database.connection;

var open_games_ranked = [{'username':'matthew', 'elo':'2300', 'gametype':'Classic'}];
var open_games_social = [{'username':'user1', 'elo':'2300', 'gametype':'Classic'}];

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
    		return res.sendFile('frontpage.html', {root: "./frontend/pages"});
  	});

    app.get('/profile', function(req, res) {
        return res.sendFile('dashboard.html', {root: "./frontend/pages"});
    });

    app.get('/register' , function(req,res) {
        return res.sendFile('account_registration.html', { root: "./frontend/pages" });
    });

    app.get('/login', function(req, res) {
        return res.sendFile('login.html', {root: "./frontend/pages"});
    });

    app.get('/matchmaking', function(req, res) {
        return res.sendFile('matchmaking.html', {root: "./frontend/pages"});
    });

    app.get('/stats/ranked', function(req, res) {
        return res.sendFile('ranked.html', {root: "./frontend/pages"});
    });

    app.get('/stats/social', function(req, res) {
        return res.sendFile('social.html', {root: "./frontend/pages"});
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

    // need to send a "message" to a user, maybe an email
  	apiRouter.post('/invite-user', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);
        var m = new database.MessageDTO();
        m.sender = user.UserName;
        m.receiver = req.body.username;
    		m.subject = 'You have been invited!';
    		m.content = req.body.username + ' has invited you to a game!';

    		database.MessageDTO.push(m, function(err) {
            var ret = {};
            if(err != null) {
                ret.success = false;
                ret.message = "An unknown error has occurred.";
                console.log(err.stack);
            } else {
                ret.success = true;
                ret.message = null;
            }
            res.json(ret);
        });
  	});

    apiRouter.post('/load-username-display', authenticate.auth, function(req, res) {
            user = jwt.decode(req.cookies.token);
            res.send(user.UserName);
    });

    // need to send a "message" to a user, maybe an email
  	apiRouter.post('/load-messages', authenticate.auth, function(req, res, next) {
    	user = jwt.decode(req.cookies.token);

        database.MessageDTO.getByReceiver(user.UserName, function(err, rows) {
            var ret = {};

            if(err != null) {
                ret.success = false;
                ret.message = "An unknown error has occurred.";
                res.json(ret);
                next();
                return;
            }

            if(rows != null) {
                ret.success = true;
                ret.messages = rows;
            }

            res.json(ret);
            next();
            return;
        });
  	});

    apiRouter.post('/load-open-games-ranked', function(req, res) {
        res.send(open_games_ranked);
    });

    apiRouter.post('/load-open-games-social', function(req, res) {
            res.send(open_games_social);
    });

    apiRouter.post('/create_game', authenticate.auth, function(req, res) {
        if (req.body.queuetype == 'ranked') {
            open_games_ranked.push({'username': user.UserName,'elo': '1500','gametype': 'Classic'});
        }
        else if (req.body.queuetype == 'social') {
            open_games_social.push({'username': user.UserName,'elo': '1700','gametype': 'Classic'});
        }
    });

    app.use('/api', apiRouter);

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('The thunderdome awaits...\n');
    });

    var io = require('socket.io')(server);

    io.on('connection', function(socket) {
        var username;
        var gameid;
        console.log("a user connected.");

        socket.on('join-game', function(name){
            username = name;
            var gameData = tetris.newGame("anonymousPengin");
            gameid = gameData.gameid;
            socket.emit('join-response', gameData);

        });

        socket.on('left', function() {
            tetris.left(gameid, username);
        });
        socket.on('right', function() {
            tetris.right(gameid, username);
        });
        socket.on('up', function() {
            tetris.up(gameid, username);
        });
        socket.on('down', function() {
            tetris.down(gameid, username);
        });
    });

});
