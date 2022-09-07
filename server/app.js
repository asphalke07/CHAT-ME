const http=require('http');
const express=require('express');
const socketio=require('socket.io');
const cors = require('cors');

//getting the router parameters
const router=require('./router');



//setting up the server
const app=express();
const server=http.createServer(app); //creating server using http and express
// const io=socketio(server); //making connection to the server

const io=socketio(server,{
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});


//socket.io connections
io.on('connection',function(socket){
    console.log("we have a new connection");

    socket.on('user',({name,room},callback)=>{
        console.log(name,room);
    });

    socket.on('disconnect',function(){
        console.log("User just left the room!!");
    });
});


//making REST Api calls
app.use(router);

//giving a port for connection
server.listen(process.env.PORT || 5000,function(){
    console.log("Server is running on port 5000");
});