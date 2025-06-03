import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="app-container">
      <Navbar 
        onLoginClick={() => setShowLogin(true)} 
        onRegisterClick={() => setShowRegister(true)} 
      />
      <Routes>
        <Route path="/" element={<Home onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}   />} />
      </Routes>
      {showLogin && (
        <div className="modal">
          <Login onClose={() => setShowLogin(false)}
          onRegisterClick={() => setShowRegister(true)}  />
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <Register onClose={() => setShowRegister(false)} 
          onLoginClick={() => setShowLogin(true)} />
        </div>
      )}
    </div>
  );
}

export default App;
