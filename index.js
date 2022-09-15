const { Socket } = require('dgram');
const { SocketAddress } = require('net');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile('/Users/shahi/Desktop/Web Projects/socket_example/index.html');
});

var clients = 0;
io.on('connection', function (socket) {
    clients++;
    console.log('A user connected');

    setInterval(function () {
        socket.send(clients + " Client Connect " + Date.now());
    }, 1000);

    ///Custom
    socket.on('myMessage', function (res) {
        socket.emit('myMessage', res + " Client" + Date.now());
    });

    ///broadcast
    io.sockets.emit('broadcast', 'broadcast Client' + + Date.now());

    socket.on('newclientconnect', function (res) {
        socket.broadcast.emit('newclientconnect', res + ' newclientconnect broadcast Client' + + Date.now())
    });

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});