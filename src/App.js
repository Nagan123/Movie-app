// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import Wishlist from './Wishlist';
import PrivateRoute from './PrivateRoute';
import './home.css';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const getUser = async (token) => {
    try {
      const response = await axios.get('http://localhost:3001/user', {
        headers: { 'x-access-token': token }
      });
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) getUser(token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={<PrivateRoute user={user} component={Home} handleLogout={handleLogout} />}
        />
        <Route
          path="/wishlist"
          element={<PrivateRoute user={user} component={Wishlist} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
