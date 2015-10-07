var database = require('./database.js');
var jwt = require('jsonwebtoken');

var secret = 'notevencloselistenbaby';

module.exports = {
    "register": function(req, callback) {
        database.UserDTO.getByName(req.body.username, function(err, dto) {
            if(err != null) {
                callback({success: false, message: "The server had an unexpected error. Please try again later."});
                return;
            }

            if(dto != null) {
                callback({success: false, message: "That username already exists."});
                return;
            } else {
                var newUser = new database.UserDTO();

                newUser.UserName = req.body.username;
                newUser.Password = req.body.password;
                newUser.Email = req.body.email;

                database.UserDTO.push(newUser, function(err) {
                    if(err) {
                        callback({success: false, message: "The server had an unexpected error"});
                        return;
                    }

                    database.UserDTO.getByName(newUser.UserName, function(err, dto) {
                        if(err || dto == null) {
                            callback({success: false, message: "The server had an unexpected error"});
                            return;
                        }

                        var token = jwt.sign(dto, secret, {
                              expiresInMinutes: 1440
                        });

                        callback({
                            success: true,
                            message: null,
                            token: token
                        });
                        return;
                    });
                });
            }

        });
    },

    "signin": function(req, callback) {
        database.UserDTO.getByName(req.body.username, function(err, dto) {
            if(err) {
                callback({success: false, message: "The server had an unexpected error. Please try again later."});
                return;
            }

            if(dto == null) {
                callback({success: false, message: "Authentication failed. User not found."});
                return;
            } else {
                if(dto.Password != req.body.password) {
                    callback({success: false, message: "Authentication failed. Password is incorrect."});
                    return;
                } else {

                    var token = jwt.sign(dto, secret, {
                          expiresInMinutes: 1440
                    });

                    callback({
                        success: true,
                        message: null,
                        token: token
                    });
                    return;
                }
            }


        });
    },

    "auth": function(req, res, next) {
        var token = req.cookies.token;
        console.log(req.cookies);

        if(token) {
            jwt.verify(token, secret, function(err, decoded) {
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
