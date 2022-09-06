import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Chat from './components/Chat';
import User from "./components/User";

function App() {
   return(
      <Router>
         <Routes>
         <Route path="/" element={<User/>}/>
         <Route path ="/Chat" element={<Chat/>}/>
         </Routes>
         
      </Router>
   );
 

}

export default App;