import React,{useState, useEffect} from 'react';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";

import InfoBar from '../InfoBar/InfoBar';

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

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });

 
  },[ENDPOINT,location.search]) ;



  return (
  
    // <h1>hello akshay</h1>

    <div className="outerContainer">
    <div className="container">
        <InfoBar room={room} />
    </div>

  </div>
  )
}

export default Chat;