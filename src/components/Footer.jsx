import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css"; // Import your CSS file for styling
import { Logo } from "./Logo";
export const Footer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="footer-container">
      <Logo />
      <div className="footer-contact">
        <ul>
          <li>📞 🇬🇧 +855 1597 4825</li>
          <li>📞 🇰🇭 +855 8161 9258</li>
        </ul>
      </div>

      <div className="allrights-reserved">
        <p>Premium Coding © 2023 all rights reserved</p>
      </div>
    </nav>
  );
};
