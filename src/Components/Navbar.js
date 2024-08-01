import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Remove the following line if you don't need custom styles
// import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">NewsOck</Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" to="/">General</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
