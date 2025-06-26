import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" onClick={closeMobileMenu}>
          Goal Tracker
        </NavLink>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          className={`navbar-nav ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
        >
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/goals"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Goals
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/aboutme"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Sign In
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              onClick={closeMobileMenu}
            >
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop active"
          onClick={closeMobileMenu}
        ></div>
      )}
    </nav>
  );
}

export default NavBar;
