$(function(){
    var socket, username;
    
    $('#modal').modal('show');

    $('#modal').on('submit', 'form', function(e){
        e.preventDefault();
        username = $(this).find('input').val();
        if (username) {
            $('#modal').modal('hide');
        } else {
            $(this).find('.form-group').addClass('has-error');
        }
    });
    
    $('#modal').on('hide.bs.modal', function(){
        socket = io.connect('http://localhost:3000');

        socket.on('connect', function(){
            $('#status').html('connected');
            socket.emit('join', username);
        });

        socket.on('push', function(message){
            $('#pull').append('<p>' + message + '</p>');
        });
    });

    $('#push').on('submit', 'form', function(e){
        e.preventDefault();
        var message = $(this).find('textarea').val();
        $(this).find('textarea').val('');
        socket.emit('pull', message);
    });
});