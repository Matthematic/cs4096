var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
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
        if(err) callback(err, null);

        if(rows) {
            var u = new UserDTO();
            u.UserID = rows[0].UserID;
            u.Email = rows[0].Email;
            u.UserName = rows[0].UserName;
            u.Password = rows[0].Password;

            callback(null, u);
        } else {
            callback(null, null);
        }
    });
};

UserDTO.getByName = function(name, callback) {
    connection.query("SELECT * FROM Users WHERE UserName=\"" + name +'\"', function(err, rows) {
        if(err) callback(err, null);

        if(rows.length != 0) {
            var u = new UserDTO();
            u.Email = rows[0].Email;
            u.UserName = rows[0].UserName;
            u.Password = rows[0].Password;

            callback(null, u);
        } else {
            callback(null, null);
        }
    });
};

UserDTO.push = function(dto, callback) {
    connection.query('INSERT INTO Users(UserID, UserName, Email, Password) VALUES (' + dto.UserID + ',\"' + dto.UserName + '\",\"' + dto.Email + '\",\"' + dto.Password + '\")', function(err) {
        callback(err);
    });
};

module.exports = {
    "connection": connection,
    "UserDTO" : UserDTO
};

