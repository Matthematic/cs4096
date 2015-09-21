var LocalStrategy = require('passport-local').Strategy;
var database = require('./database.js');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.UserName);
    });

    passport.deserializeUser(function(id, done) {
        database.UserDTO.getById(id, function(err, dto) {
            if(err) throw err;
            done(null, dto);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done) {
        process.nextTick(function() {

        database.UserDTO.getByName(username, function(err, dto) {
            if(err != null) return done(err);

            if(dto != null) {
                console.log("blast");
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
                var newUser = new database.UserDTO();

                newUser.UserName = username;
                newUser.Password = password;
                newUser.Email = req.body.Email;

                database.UserDTO.push(newUser, function(err) {
                    if(err) throw err;
                    return done(null, newUser);
                });
            }

        });

        });
    }));
};