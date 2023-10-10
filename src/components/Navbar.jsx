import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { Logo } from "./Logo";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <Logo />

      {/* Mobile menu toggle button */}
      <div className="mobile-menu-toggle" onClick={toggleMenu}>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        <div className={`bar ${menuOpen ? "open" : ""}`}></div>
      </div>

      {/* Navbar elements */}
      <div className={`navbar-items ${menuOpen ? "open" : ""}`}>
        <Link to="/games">Games</Link>
        <Link to="/free_robux">Free Robux</Link>
        <Link to="/students">Students</Link>
      </div>
    </nav>
  );
};
