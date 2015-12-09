var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

var database = require('./database');
var authenticate = require('./authenticate');
var tetris = require('./tetris');
var connection = database.connection;

var open_games_ranked = [];
var open_games_social = [];

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
        var token = req.cookies.token;

        if(token) {
            jwt.verify(token, 'notevencloselistenbaby', function(err, decoded) {
                if(err) {
                    res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    req.decoded = decoded;
                }
            });

        } else {
            console.log("error token auth");
            return res.sendFile('frontpage.html', {root: "./frontend/pages"});
        }

        return res.sendFile('dashboard.html', {root: "./frontend/pages"});
    });

    app.get('/profile', authenticate.authRedirect, function(req, res) {
        return res.sendFile('dashboard.html', {root: "./frontend/pages"});
    });

    app.get('/register', function(req,res) {
        return res.sendFile('account_registration.html', { root: "./frontend/pages" });
    });

    app.get('/login', function(req, res) {
        return res.sendFile('login.html', {root: "./frontend/pages"});
    });

    app.get('/matchmaking', authenticate.authRedirect, function(req, res) {
        return res.sendFile('matchmaking.html', {root: "./frontend/pages"});
    });

    app.get('/stats/ranked', authenticate.authRedirect, function(req, res) {
        return res.sendFile('ranked.html', {root: "./frontend/pages"});
    });

    app.get('/stats/social', authenticate.authRedirect, function(req, res) {
        return res.sendFile('social.html', {root: "./frontend/pages"});
    });

    app.get('/messages', authenticate.authRedirect, function(req, res) {
        return res.sendFile('messages.html', {root: "./frontend/pages"});
    });

    app.get('/game', authenticate.authRedirect, function(req, res) {
        return res.sendFile('game.html', {root: "./frontend/pages"});
    });

    app.get('/stats/ranked_leaderboards', function(req, res) {
        return res.sendFile('ranked_leaderboards.html', {root: "./frontend/pages"});
    });

    app.get('/stats/social_leaderboards', function(req, res) {
        return res.sendFile('social_leaderboards.html', {root: "./frontend/pages"});
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
        m.content = user.UserName + ' has invited you to a game!';
        m.type = 'invite';
        //m.gameobject = {'gameid': 0, 'queuetype': 'social'};

        var ret = {};
        var resultFunc = function(states) {
            // when the game is over, you will recieve an object filled
            // with states per player.
            // <username> : {
            //     score: <int>,
            //     level: <int>
            // },
        };

        var gameid = tetris.newGame(user.UserName, resultFunc);
        open_games_ranked.push({'id': gameid, 'username': user.UserName,'elo': '1500','gametype': 'Classic'});
        m.gameid = gameid;

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
            //res.json(ret);
        });

        ret.gameid = gameid;
        res.json(ret);
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

            ret.success = true;
            ret.messages = rows;

            res.json(ret);
            next();
            return;
        });
    });

    apiRouter.post('/load-friends', authenticate.auth, function(req, res, next) {
        user = jwt.decode(req.cookies.token);

        var query ="SELECT friend FROM Friends WHERE user='" + user.UserName + "'";
        console.log(query);
        connection.query(query, function(err, rows) {
            var ret = {};
            if(err) {
                res.send(err);
                return;
            }

            if(rows) {
                ret.success = true;
                ret.friends = rows;
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
        user = jwt.decode(req.cookies.token);
        var exists = false;
        var index = null;
        if (req.body.queuetype == 'ranked') {
            for (var i = 0; i < open_games_ranked.length; i++){
                if (open_games_ranked[i].username == user.UserName) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                var ret = {};
                var resultFunc = function(states) {
                    // when the game is over, you will recieve an object filled
                    // with states per player.
                    // <username> : {
                    //     score: <int>,
                    //     level: <int>
                    // },
                    console.log(states);
                    /*
                    database.StatsDTO.getByUsername(user.UserName, function(err, rows) {
                        if(err !== null) {
                            ret.success = false;
                            ret.message = "An unknown error has occurred.";
                            res.json(ret);
                            next();
                            return;
                        }

                        var stats = rows[0];
                        stats.total_points += states.
                        database.StatsDTO.update(stats, function(err) {
                            if (err !== null) {
                                console.log("Error updating stats");
                            }
                        });

                    });*/
                };

                var gameid = tetris.newGame(user.UserName, resultFunc);
                open_games_ranked.push({'id': gameid, 'username': user.UserName,'elo': '1500','gametype': 'Classic'});

                ret.gameid = gameid;
                res.json(ret);
            }
        }
        else if (req.body.queuetype == 'social') {
            for (var n = 0; n < open_games_social.length; n++){
                if (open_games_social[n].username == user.UserName) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                var ret = {};
                var resultFunc = function(states) {
                    // when the game is over, you will recieve an object filled
                    // with states per player.
                    // <username> : {
                    //     score: <int>,
                    //     level: <int>
                    // },
                };

                var gameid = tetris.newGame(user.UserName, resultFunc);
                open_games_social.push({'id': gameid, 'username': user.UserName,'elo': '1500','gametype': 'Classic'});

                ret.gameid = gameid;
                res.json(ret);
            }
        }
        console.log(open_games_ranked);
        console.log(open_games_social);
    });

    apiRouter.post('/remove_games', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);
        var index_social = null;
        var index_ranked = null;
        open_games_social.forEach(function(game) {
            if (game.username == user.UserName) {
                index_social = open_games_social.indexOf(game);
                //break;
            }
        });

        open_games_ranked.forEach(function(game) {
            if (game.username == user.UserName) {
                index_ranked = open_games_social.indexOf(game);
                //break;
            }
        });

        if (index_social !== null)
            open_games_social.splice(index_social, 1);

        if (index_ranked !== null)
            open_games_ranked.splice(index_ranked, 1);
    });

    apiRouter.post('/check_if_friends', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);
        var query ="SELECT 1 FROM Friends WHERE user='" + user.UserName + "' AND friend = '" + req.body.username + "'";
        console.log(query);
        connection.query(query, function(err, rows) {
            var ret = {};
            if(err) {
                ret.success = false;
                ret.message = "An unknown error has occurred.";
            } else if(rows.length > 0) {
                ret.success = false;
                ret.message = "Already Friends";
            } else {
                ret.success = true;
                ret.message = "Not already friends";
            }
            res.json(ret);
        });
    });

    apiRouter.post('/send_friend_request', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);
        var m = new database.MessageDTO();
        m.sender = user.UserName;
        m.receiver = req.body.username;
        m.subject = 'You have a friend request!';
        m.content = user.UserName + ' has added you to be their friend!';
        m.type = 'friend_request';
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

    apiRouter.post('/remove_friend_request', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);
        database.MessageDTO.pull(req.body.id, function(err) {
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

    apiRouter.post('/add_friend', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);

        var query = 'INSERT INTO Friends (user, friend) VALUES ("' + user.UserName + '", "' + req.body.username + '"), ("' + req.body.username + '", "' + user.UserName + '");';
        console.log(query);
        connection.query(query, function(err, rows) {
            var ret = {};
            if(err) {
                ret.success = false;
                ret.message = " An unknown error has occurred.";
            }
            else if(rows) {
                ret.success = true;
                ret.message = " friend added successfully";
            }
            else {
                ret.success = false;
                ret.message = null;
            }
            res.json(ret);
        });
    });

    apiRouter.post('/get_user_stats', authenticate.auth, function(req, res) {
        user = jwt.decode(req.cookies.token);
        database.StatsDTO.getByUsername(user.UserName, function(err, rows) {
            var ret = {};

            if(err !== null) {
                ret.success = false;
                ret.message = "An unknown error has occurred.";
                res.json(ret);
                next();
                return;
            }

            ret.success = true;
            ret.stats = rows;

            res.json(ret);
            return;
        });
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

        socket.on('join-game', function(data){
            var user = jwt.decode(data.token);
            username = user.UserName;
            gameid = data.gameid;

            var updateFunc = function(deltas) {
                socket.emit('update-game', deltas);
            };
            var endFunc = function(winner) {
                socket.emit('end', winner);
                socket.disconnect();
            };

            console.log(data);
            var retData = tetris.connect(data.gameid, user.UserName, updateFunc, endFunc);
            //var gameData = tetris.newGame("anonymousPengin", updateFunc, endFunc);

            socket.emit('join-response', retData);
        });
        socket.on('space', function() {
            tetris.space(gameid, username);
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
