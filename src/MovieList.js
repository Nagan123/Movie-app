import React from 'react';
import Movie from './Movie';

const MovieList = ({ movies, user, wishlist, refreshWishlist }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          user={user}
          isInWishlist={wishlist.some(w => w.movie_id === movie.imdbID)}
          refreshWishlist={refreshWishlist}
        />
      ))}
    </div>
  );
};

export default MovieList;
