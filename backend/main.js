var express = require('express');
var app = express();

app.use(express.static('.'));

app.get('/', function(req, res) {
    return res.sendFile('index.html');
});

app.post('/api/')

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('listening for stuff\n');
});