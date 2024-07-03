import React, { useState } from 'react';

function Search(props) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.searchMovies(query);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleInputChange} placeholder="Enter movie title" />
      <button type="submit">Search</button>
    </form>
  );
}

export default Search;
