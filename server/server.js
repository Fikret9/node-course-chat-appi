const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

var express = require('express');
var app = express();
var server = http.createServer(app) ;
var io = socketIO(server);

io.on('connection',(socket) =>{
	console.log('New user connected'); 

	// Welcome user when he connects to chat room
	// Broadcasts to all other users new user joined

	 
	
	var welcomeMessage = 'Welcome to the chatroom ' ;
	var infoMessage = 'new user joined chatroom ';

	socket.emit('newMessage',{
			from: 'Admin',
			text: welcomeMessage,
			createdAt: new Date().getTime()
	})

	socket.broadcast.emit('newMessage',{
		 	from: 'admin',
		 	text: infoMessage,
		 	createdAt: new Date().getTime()
		 }) 
 

	socket.on('createMessage', (message) => {		
		io.emit('newMessage',{
			from: message.from,
			text:message.text,
			createdAt: new Date().getTime()
		})
	// socket.broadcast.emit('newMessage',{
	// 	 	from: message.from,
	// 	 	text:message.text,
	// 	 	createdAt: new Date().getTime()
	// 	 })
	

	});

	socket.on('disconnect',(socket) =>{
	console.log('Client disconnect !');
	});
});





app.use(express.static(publicPath));


server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});