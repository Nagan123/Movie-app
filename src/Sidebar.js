import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
		  <li><Link to="/wishlist">Wishlist</Link></li>
          <li><button onClick={onLogoutClick}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
