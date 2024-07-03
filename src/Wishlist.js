import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import './App.css';

const Wishlist = ({ user, handleLogout }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await axios.get(`http://localhost:3001/wishlist/${user.id}`);
      setWishlist(response.data);
    };
    fetchWishlist();
  }, [user]);

  const removeFromWishlist = async (movie_id) => {
    await axios.delete('http://localhost:3001/wishlist', {
      data: { user_id: user.id, movie_id },
    });
    setWishlist(wishlist.filter(movie => movie.movie_id !== movie_id));
  };

  return (
    <div className="home-container">
      <Header user={user} />
      <div className="main-content">
        <Sidebar handleLogout={handleLogout} />
        <div className="content">
          <h2>Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <p>No movies in your wishlist</p>
          ) : (
            wishlist.map((movie) => (
              <div key={movie.movie_id} className="wishlist-item">
                <img src={movie.poster} alt={movie.title} />
				
                <h3>Movie Tittle : {movie.title}</h3><br/><br/>
                <p><strong>Year:</strong> {movie.year}</p>
                <button onClick={() => removeFromWishlist(movie.movie_id)}>
                  Remove from Wishlist
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
