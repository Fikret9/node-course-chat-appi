const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const port = process.env.PORT || 3000;
const {generateMessage,generateLocationMessage} = require('./utils/message');

var express = require('express');
var app = express();
var server = http.createServer(app) ;
var io = socketIO(server);
var users  = new Users();

io.on('connection',(socket) =>{
	console.log('New user connected');  
	
    socket.on('join', (params,callback)=>{
    	if (!isRealString(params.name) || !isRealString(params.room)){
    		return callback('Name and Room name are required');
    	}

    	socket.join(params.room);
    	console.log('socket id',socket.id);
    	console.log('users before' ,users);
    	users.removeUser(socket.id);
    	console.log('users after' ,users);
    	users.addUser(socket.id, params.name, params.room);

    	io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    	socket.emit('newMessage', generateMessage('Admin','Welcome to the chatroom '));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} joined `));
       
    	callback();
    });

	socket.on('createMessage', (message, callback) => {		
		io.emit('newMessage',generateMessage(message.from,message.text));
		callback();			
	});

	socket.on('createLocationMessage', (coords) => {		
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});
	console.log('socket is ',socket.id);
	socket.on('disconnect',() =>{
		console.log('disconnecting',socket);
		var user = users.removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('updateUserList',users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.. `));
		} 
	});
  }); 



app.use(express.static(publicPath));


server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});