var app = require('express')();
var https = require('https').createServer(app);
var io = require('socket.io')(https);


io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('chat message', function (msg) {
        // console.log('message: ' + JSON.stringify(msg));

        // send message back to client
        io.emit('chat message', msg);
    });
});

https.listen(3001, function () {
    console.log('listening on *:3001');
});