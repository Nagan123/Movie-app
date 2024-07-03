import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Movie App</h1>
        <p>Welcome, {user.username}</p>
      </div>
    </header>
  );
};

export default Header;
