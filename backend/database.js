var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'apples',
    database: 'test'
});

var UserDTO = function() {
    this.UserID = null;
    this.Email = null;
    this.UserName = null;
    this.Password = null;
};

UserDTO.getById = function(id, callback) {
    connection.query("SELECT * FROM Users WHERE UserID=" + id, function(err, rows) {
        if(err) {
            callback(err, null);
            return;
        }

        if(rows) {
            if(rows.length != 0) {
                var u = new UserDTO();
                u.UserID = rows[0].UserID;
                u.Email = rows[0].Email;
                u.UserName = rows[0].UserName;
                u.Password = rows[0].Password;
                callback(null, u);
                return;
            } else {
                callback(null, null);
                return;
            }

        } else {
            callback(null, null);
            return;
        }
    });
};

UserDTO.getByName = function(name, callback) {
    connection.query("SELECT * FROM Users WHERE UserName=\"" + name +'\"', function(err, rows) {
        if(err) {
            callback(err, null);
            console.log("happend here.");
            console.log(err);
            return;
        }

        if(typeof rows === "undefined") {
            callback(null, null);
            return;
        }

        if(rows.length != 0) {
            var u = new UserDTO();
            u.Email = rows[0].Email;
            u.UserName = rows[0].UserName;
            u.Password = rows[0].Password;

            callback(null, u);
            return;
        } else {
            callback(null, null);
            return;
        }
    });
};

UserDTO.push = function(dto, callback) {
    connection.query('INSERT INTO Users(UserID, UserName, Email, Password) VALUES (' + dto.UserID + ',\"' + dto.UserName + '\",\"' + dto.Email + '\",\"' + dto.Password + '\")', function(err) {
        callback(err);
    });
};

var MessageDTO = function() {
    this.id = null;
    this.sender = null;
    this.receiver = null;
    this.subject = null;
    this.content = null;
    this.type = null;
    this.timestamp = null;
};

var StatsDTO = function() {
    this.username = null;
    this.wins = null;
    this.games_played = null;
    this.elo = null;
    this.total_points = null;
    this.total_rows_cleared = null;
};


MessageDTO.getBySender = function(sender, callback) {
    connection.query('SELECT * FROM Messages WHERE sender=\"' + sender + '\"', function(err, rows) {
        if(err) {
            callback(err, null);
            console.log("Could not retrieve messages.");
            console.log(err);
            return;
        }

        if(typeof rows === "undefined") {
            callback(null, null);
            return;
        }

        if(rows.length != 0) {
            var i;
            var ret = [];
            for(i = 0; i < rows.length; i++) {
                var u = new MessageDTO();
                u.id = rows[i].id;
                u.sender = rows[i].sender;
                u.receiver = rows[i].receiver;
                u.subject = rows[i].subject;
                u.content = rows[i].content;
                u.type = rows[i].type;
                u.type = rows[i].timestamp;
                ret.push(u);
            }
            callback(null, ret);
                    return;
        } else {
            callback(null, null);
                    return;
        }
    });
};

MessageDTO.getByReceiver = function(receiver, callback) {
    connection.query('SELECT * FROM Messages WHERE receiver=\"' + receiver + '\" ORDER BY timestamp DESC', function(err, rows) {
        if(err) {
            callback(err, null);
            console.log("get by receiver failed.");
            console.log(err);
            return;
        }

        if(typeof rows === 'undefined') {
            callback(null, null);
            return;
        }

        var i;
        var ret = [];
        for(i = 0; i < rows.length; i++) {
            var u = new MessageDTO();
            u.id = rows[i].id;
            u.sender = rows[i].sender;
            u.receiver = rows[i].receiver;
            u.subject = rows[i].subject;
            u.content = rows[i].content;
            u.type = rows[i].type;
            u.timestamp = rows[i].timestamp;
            ret.push(u);
        }
        callback(null, ret);
        return;
    });
};

MessageDTO.push = function(dto, callback) {
    connection.query('INSERT INTO Messages(id, sender, receiver, subject, content, type, timestamp) VALUES (' + dto.id + ', \"' + dto.sender + '\", \"' + dto.receiver + '\", \"' + dto.subject + '\", \"' + dto.content + '\", \"' + dto.type + '\",  NOW() )', function(err) {
        callback(err);
    });
};

MessageDTO.pull = function(id, callback) {
    connection.query('DELETE FROM Messages WHERE id=' + id, function(err) {
        callback(err);
    });
};

StatsDTO.getByUsername = function(username, callback) {
    connection.query('SELECT * FROM UserStats WHERE username=\"' + username + '\"', function(err, rows) {
        if(err) {
            callback(err, null);
            console.log("statsDTO get by username failed.");
            console.log(err);
            return;
        }

        if(typeof rows === 'undefined') {
            callback(null, null);
            return;
        }

        var ret = [];
        var s = new StatsDTO();
        s.username = rows[0].username;
        s.wins = rows[0].wins;
        s.games_played = rows[0].games_played;
        s.elo = rows[0].elo;
        s.total_points = rows[0].total_points;
        s.total_rows_cleared = rows[0].total_rows_cleared;
        ret.push(s);
        callback(null, ret);
        return;
    });
};

StatsDTO.update = function(dto, callback) {
    connection.query('UPDATE UserStats SET wins=' + dto.wins +
        ', games_played=' + dto.games_played +
        ', elo=' + dto.elo +
        ', total_points=' + dto.total_points +
        ', total_rows_cleared=' + dto.total_rows_cleared +
        ' WHERE username=' + dto.username,
        function(err) {
            callback(err);
        }
    );
};

module.exports = {
    "connection": connection,
    "UserDTO" : UserDTO,
    "MessageDTO" : MessageDTO,
    "StatsDTO" : StatsDTO
};
