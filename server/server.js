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
	socket.on('disconnect',(socket) =>{
	console.log('Client disconnect !');
	});
});





app.use(express.static(publicPath));


server.listen(port,() => {
  console.log(`Server is up on port ${port}`);
});