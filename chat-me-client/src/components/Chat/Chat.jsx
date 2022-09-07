import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";


let socket; //defining socket here


function Chat(){

  const [name,setName]=useState('');
  const [room,setRoom]=useState('');
  const ENDPOINT="localhost:5000";

  //use of useLocation hook
  let location=useLocation();

  useEffect(()=>{
    const {name,room}=queryString.parse(location.search);
    
    socket=io(ENDPOINT);

    setName(name);
    setRoom(room);
    // console.log(socket);

    socket.emit('user',{name,room},()=>{
      //callback for an error
    });

    return()=>{
      socket.emit('disconnect');
      socket.off();
    }
  },[ENDPOINT,location.search]);



  return (
    // <div>App</div>
    <h1>hello akshay</h1>
  )
}

export default Chat;