import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#top" className="navbar-logo">
          <span className="logo-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#6D5EF5" />
                  <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
              </defs>
              <circle cx="7" cy="24" r="3.5" fill="url(#flowGrad)" />
              <circle cx="16" cy="8" r="3.5" fill="url(#flowGrad)" />
              <circle cx="25" cy="24" r="3.5" fill="url(#flowGrad)" />
              <path
                d="M9.8 22 15 10.5M18 10.5l4.6 11.5"
                stroke="url(#flowGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="logo-text">FlowForge</span>
        </a>

        {/* Navigation Links */}
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
        </div>

        {/* Auth Buttons */}
        <div className="navbar-actions">
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Get Started</button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${menuOpen ? "is-open" : ""}`}>
        <a href="#features" onClick={() => setMenuOpen(false)}>
          Features
        </a>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
          How It Works
        </a>
        <a href="#pricing" onClick={() => setMenuOpen(false)}>
          Pricing
        </a>
        <div className="navbar-mobile-actions">
          <button className="login-btn">Log in</button>
          <button className="signup-btn">Get Started</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
