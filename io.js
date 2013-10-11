var express = require('express'),
    socket  = require('socket.io');

var app = express.createServer();
var io  = socket.listen(app);

app.get('/', function(req, res){
    res.sendfile(__dirname + '/views/chat.html');
});

app.listen(3000);

io.sockets.on('connection', function(socket){
    var message = 'connection established';
    socket.emit('push', message);

    socket.on('join', function(nickname){
        socket.set('nickname', nickname);
    });

    socket.on('pull', function(message){
        console.log(message);

        socket.get('nickname', function(err, nickname){
            socket.emit('push', nickname + ': ' + message);
            socket.broadcast.emit('push', nickname + ': ' + message);
        });
    });
});