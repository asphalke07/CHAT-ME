const express=require('express');
const socketio=require('socket.io');
const http=require('http');

//getting the router parameters
const router=require('./router');


//setting up the server
const app=express();
const server=http.createServer(app); //creating server using http and express
const io=socketio(server); //making connection to the server

//socket.io connections
io.on('connection',function(socket){
    console.log("we have a new connection");
    socket.on('disconnect',function(){
        console.log("User just left the room!!");
    })
});

//making REST Api calls
app.use(router);

//giving a port for connection
server.listen(process.env.PORT || 5000,function(){
    console.log("Server is running on port 5000");
});