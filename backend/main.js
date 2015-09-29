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
    		return res.sendFile('login.html', {root: "./frontend/pages"});  // i tried changing this so we could load the login
    											//   page on default, but it kept loading index.html and ignoring this,
    											//   so I just renamed the files as a temp fix
  	});

    app.get('/profile', function(req, res) {
        return res.sendFile('dashboard.html', {root: "./frontend/pages"});
    });

    app.get('/register' , function(req,res) {
        return res.sendFile('account_registration.html', { root: "./frontend/pages" });
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
            m.sender = user.username;
            m.receiver = req.body.username;
    		m.subject = 'You have been invited!';
    		m.content = req.body.username + ' has invited you to a game!';

    		database.MessageDTO.push(m, function(err) {
                var ret = {};
                if(err) {
                    ret.success = false;
                    ret.message = "An unkown error has occurred.";
                } else {
                    ret.success = true;
                    ret.message = null;
                }
                res.json(ret);
            });
  	});

    // need to send a "message" to a user, maybe an email
  	apiRouter.post('/load_messages', authenticate.auth, function(req, res) {
    		var sql = 'SELECT * FROM Messages';
    		console.log("query: " + sql);
    		connection.query( sql, function(err, rows, fields) {
      			if(err) {
      				  console.log('Could not retrieve all messages' + err.stack);
      			} else {
      				  console.log('retrieved all messages');
      			}

      			console.log(rows);
      			res.send(rows);
    		});
  	});

    apiRouter.post('/load_open_games__ranked', function(req, res) {
    		var sql = 'SELECT * FROM OpenGames WHERE queuetype = "Ranked"';
    		console.log("query: " + sql);
    		connection.query( sql, function(err, rows, fields) {
      			if(err) {
      			  	console.log('Could not load open_games_ranked data' + err.stack);
      			} else {
      				  console.log('loaded open_games_ranked data');
      			}

      			console.log(rows);
      			res.send(rows);
    		});
  	});

    apiRouter.post('/load_open_games__social', function(req, res) {
    		var sql = 'SELECT * FROM OpenGames WHERE queuetype = "Social"';
    		console.log("query: " + sql);
    		connection.query( sql, function(err, rows, fields) {
      			if(err) {
      				  console.log('Could not load open_games_social data' + err.stack);
      			} else {
      				  console.log('loaded open_games_social data');
      			}

      			console.log(rows);
      			res.send(rows);
    		});
  	});

    apiRouter.post('/create_game', function(req, res) {
    		console.log(req);
    		var sql = 'INSERT INTO OpenGames(username, elo, gametype, queuetype) ' +
    					'SELECT "Dyrus", 4000, "Classic", "' + req.body.queuetype + '"';
    		console.log("query: " + sql);
    		connection.query( sql, function(err, rows, fields) {
      			if(err) {
      			  	console.log('Could not create a game' + err.stack);
      			} else {
      			  	console.log('Game created successfully');
      				  res.send(true);
      			}
    		});
  	});

    app.use('/api', apiRouter);

    var server = app.listen(3000, function() {
        var host = server.address().address;
        var port = server.address().port;

        console.log('The thunderdome awaits...\n');
    });

});
