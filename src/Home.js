import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import MovieList from './MovieList';
import Search from './Search';
import './App.css';

const Home = ({ user, handleLogout }) => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await axios.get(`http://localhost:3001/wishlist/${user.id}`);
      setWishlist(response.data);
    };
    fetchWishlist();
  }, [user]);

  const searchMovies = async (query) => {
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: '36cbe0b7',
        s: query,
      },
    });

    if (response.data.Search) {
      setMovies(response.data.Search);
    } else {
      setMovies([]);
    }
  };

  const refreshWishlist = () => {
    const fetchWishlist = async () => {
      const response = await axios.get(`http://localhost:3001/wishlist/${user.id}`);
      setWishlist(response.data);
    };
    fetchWishlist();
  };

  return (
    <div className="home-container">
      <Header user={user} />
      <div className="main-content">
        <Sidebar handleLogout={handleLogout} />
        <div className="content">
          <h1>Welcome To Movie APP</h1>
          <Search searchMovies={searchMovies} />
          <MovieList movies={movies} user={user} wishlist={wishlist} refreshWishlist={refreshWishlist} />
        </div>
      </div>
    </div>
  );
};

export default Home;
