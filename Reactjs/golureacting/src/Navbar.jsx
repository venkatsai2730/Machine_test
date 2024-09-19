import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => (
  <nav className="navbar">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/employee-list">Employee List</Link></li>
      <li>Admin1</li>
      <li><Link to="/logout" onClick={() => setIsAuthenticated(false)}>Logout</Link></li>
    </ul>
  </nav>
);

export default Navbar;
