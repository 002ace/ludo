import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import Home from './pages/Home';
import './App.css';
import Play from './pages/Play';
import Setting from './pages/Setting';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import Feedback from './pages/Feedback';
import Chat from './pages/Chat';
import  Login from "../src/pages/Login"
import  Signup from  "../src/pages/Signup"


function App() {
  return (
    <Router>
      <div className="root-ludo mx-auto ">
        <Routes>
          {/* Define Routes */}

          <Route path="/" element={<Home />} />
          <Route path="/game?" element={<Game />} />
          <Route path="/play" element={<Play />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chat"   element={<Chat/>} />
          <Route path = "/login" element = {<Login />}  />
          <Route path = "/signup" element = {<Signup/>}  />

          


        </Routes>
      </div>
    </Router>                                                                                     
  );
}

export default App;
