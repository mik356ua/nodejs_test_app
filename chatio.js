var express = require('express'),
    app = express.createServer(),
    io  = require('socket.io').listen(app);

app.configure(function(){
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
    res.render('main.ejs');
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