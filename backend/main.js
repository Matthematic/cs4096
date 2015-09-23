var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	//password: 'apples',
	database: 'test',
	port: '3307'
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
		return res.sendFile('login.html');  // i tried changing this so we could load the login
											//   page on default, but it kept loading index.html and ignoring this,
											//   so I just renamed the files as a temp fix
	});

	app.post('/api/create-login', function(req, res) {

		connection.query(
			'INSERT INTO Users(UserID, UserName, Email, Password) ' +
			'VALUES (NULL, \"' + req.body.username + '\", \"' + req.body.email + '\", \"' + req.body.password + '\")',
			function(err){
				if(err) {
					console.log('Could not create login. Error ' + err.stack);
				} else {
					console.log('Account Created.');
				}
			}
		);

	});

	// need to send a "message" to a user, maybe an email
	app.post('/api/invite-user', function(req, res) {
		var subject = '"You have been invited!"';
		var content = '"FatalCatharsis has invited you to a game!"';
		var sql = 'INSERT INTO Messages(sender, receiver, `subject`, content)' +
				'SELECT "FatalCatharsis", "' + req.body.username + '", ' + subject + ', ' + content;
		console.log("query: " + sql);
		connection.query( sql, function(err, rows, fields) {
			if(err) {
				console.log('Invite could not be sent' + err.stack);
			} else {
				console.log('Invite sent');
			}

			console.log(rows);
			res.send(rows);
		});
	});

	// need to send a "message" to a user, maybe an email
	app.post('/api/load_messages', function(req, res) {
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

	// need to push these through the validation system
	app.post('/api/login', function(req, res) {
		console.log("email_username: " + req.body.email_username);
		console.log("password: " + req.body.password);
	});

	app.post('/api/load_open_games__ranked', function(req, res) {
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

	app.post('/api/load_open_games__social', function(req, res) {
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

	app.post('/api/create_game', function(req, res) {
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

	var server = app.listen(3000, function() {
		var host = server.address().address;
		var port = server.address().port;

		console.log('listening for stuff\n');
	});
});


