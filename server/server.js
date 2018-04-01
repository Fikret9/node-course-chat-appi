const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');

var express = require('express');
var app = express();
var server = http.createServer(app) ;
var io = socketIO(server);

io.on('connection',(socket) =>{
	console.log('New user connected');  
	socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined !'));
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chatroom '));
	
	socket.on('createMessage', (message, callback) => {		
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();			
	});

	socket.on('createLocationMessage', (coords) => {		
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});

	socket.on('disconnect',(socket) =>{
	console.log('Client disconnect !');
	});
});





app.use(express.static(publicPath));


server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});