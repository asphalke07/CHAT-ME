const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

//getting users array and implementing functions
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

//getting the router parameters
const router=require('./router');



//setting up the server
const app=express();
// const server=http.createServer(app); //creating server using http and express
const server=app.listen(5000);
// const io=socketio(server); //making connection to the server
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});


//making REST Api calls
app.use(cors());
app.use(router);

//socket.io connections
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });



//giving a port for connection
// server.listen(process.env.PORT || 5000,function(){
//     console.log("Server is running on port 5000");
// });