import React,{useState} from 'react';
// import Chat from './Chat';
import {Link} from 'react-router-dom';
import "./Join.css";

function User(){
    const [Name,setName]=useState('');
    const [Room,setRoom]=useState('');

    function handleName(event){
        setName(event.target.value);
    }

    function handleRoom(event){
        setRoom(event.target.value);
    }

    function handleSubmit(event){
        if(!Name || !Room){
            event.preventDefault();
        }
    }
  
  
    return (

    <div className="joinOuterContainer">
        <div className="joinInnerContainer">
            <h1 className="heading">New user</h1>
            <div><input type="text" placeholder="Name" className="joinInput" onChange={handleName} /></div>
            <div><input type="text" placeholder="Room" className="joinInput mt-20" onChange={handleRoom}/></div>
            <Link onClick={handleSubmit} to={`/Chat?name=${Name}&room=${Room}`}>
                <button className="button m-20" type="submit">Sign In</button>
            </Link>
        </div>
    </div>
  )
}

export default User;