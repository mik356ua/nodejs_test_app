var express = require('express'),
    request = require('request'),
    url = require('url'),
    socket = require('socket.io');

var app = express.createServer();

app.get('/', function(req, resp){
    resp.sendfile(__dirname + '/views/index.html');
});

app.get('/tweets/:user', function(req, resp){
    var user = req.params.user;

    options = {
        protocol: 'http:',
        host: 'api.twitter.com',
        pathname: '/1.1/statuses/user_timeline.json',
        query: { screen_name: user, count: 10 }
    }

    var twitterUrl = url.format(options);
    // request(twitterUrl).pipe(resp);
    request(twitterUrl, function(err, msg, body){
        var tweets = JSON.parse(body);
        resp.render('tweets.ejs', {
            tweets: tweets,
            user: user
        })
    });
});

app.listen(3000);