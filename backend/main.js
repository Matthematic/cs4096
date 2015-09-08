var express = require('express');
var app = express();

app.use(express.static('.tmp/'));
app.use(express.static('frontend/pages'));
app.use('/bower_components', express.static('bower_components'));

app.get('/', function(req, res) {
    return res.sendFile('index.html');
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('listening for stuff\n');
});