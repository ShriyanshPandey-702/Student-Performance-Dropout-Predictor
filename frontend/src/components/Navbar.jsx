import React, { useState, useEffect } from 'react';

export default function Navbar({ backendStatus }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`editorial-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="editorial-shell nav-content">
        <a href="#hero" className="nav-brand">
          <span className="nav-brand-title">Student Dropout Predictor</span>
          <span className="nav-brand-sub">ML Academic Analytics</span>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#problem" className="nav-item-link">The Problem</a>
          </li>
          <li>
            <a href="#signals" className="nav-item-link">12 Signals</a>
          </li>
          <li>
            <a href="#stats" className="nav-item-link">Statistics</a>
          </li>
          <li>
            <a href="#importance" className="nav-item-link">Feature Importance</a>
          </li>
          <li>
            <a href="#predict" className="nav-item-link highlight">Run Prediction</a>
          </li>
          <li>
            <a href="#verification" className="nav-item-link">Verification</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
