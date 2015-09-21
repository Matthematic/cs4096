var LocalStrategy = require('passport-local').Strategy;
var database = require('./database.js');

var secret = 'notevencloselistenbaby';

module.exports = {
    "register": function(username, email, password) {
        database.UserDTO.getByName(username, function(err, dto) {
            if(err != null) {
                return {success: false, message: "The server had an unexpected error. Please try again later."};
            }

            if(dto != null) {
                return {success: false, message: "That username already exists."};
            } else {
                var newUser = new database.UserDTO();

                newUser.UserName = username;
                newUser.Password = password;
                newUser.Email = email;

                database.UserDTO.push(newUser, function(err) {
                    if(err) throw err;
                    return {success: true, message: null};
                });
            }

        });
    },

    "signin": function(username, password) {
        database.UserDTO.getByName(username, function(err, dto) {
            if(err) {
                return {success: false, message: "The server had an unexpected error. Please try again later."};
            }

            if(dto == null) {
                return {success: false, message: "Authentication failed. User not found."};
            } else {
                if(dto.password != password) {
                    return {success: false, message: "Authentication failed. Password is incorrect."};
                } else {

                    var token = jwt.sign(dto, app.get(secret), {
                          expiresInMinutes: 1440
                    });

                    return {
                        success: true,
                        message: null,
                        token: token
                    };
                }
            }


        });
    },

    "auth": function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, app.get(secret), function(err, decoded) {
                if(err) {
                    return {success: false, message: 'Failed to authenticate token.'};
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            })
        }

    }
};
