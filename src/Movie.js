import React from 'react';
import axios from 'axios';

function Movie(props) {
  const { Title, Poster, Year, Plot, imdbID } = props.movie;
  const { user, isInWishlist, refreshWishlist } = props;

  const addToWishlist = async () => {
    await axios.post('http://localhost:3001/wishlist', {
      user_id: user.id,
      movie_id: imdbID,
      title: Title,
      poster: Poster,
      year: Year,
      plot: Plot,
    });
    refreshWishlist();
  };

  const removeFromWishlist = async () => {
    await axios.delete('http://localhost:3001/wishlist', {
      data: { user_id: user.id, movie_id: imdbID }
    });
    refreshWishlist();
  };

  return (
    <div className="movie">
      <h2>{Title}</h2>
      <img src={Poster} alt={Title} />
      <p><strong>Year:</strong> {Year}</p>
      <p><strong>Plot:</strong> {Plot}</p>
      {isInWishlist ? (
        <button onClick={removeFromWishlist}>Remove from Wishlist</button>
      ) : (
        <button onClick={addToWishlist}>Add to Wishlist</button>
      )}
    </div>
  );
}

export default Movie;
