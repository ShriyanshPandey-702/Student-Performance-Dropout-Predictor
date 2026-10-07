import React from 'react';

export default function Hero() {
  return (
    <header className="hero-section" id="hero">
      <div className="editorial-shell">
        <div className="hero-grid">
          <div className="hero-main-title">
            <span className="label-meta" style={{ display: 'block', marginBottom: '1.25rem', color: 'var(--accent)' }}>
              01 / Introduction
            </span>
            <h1 className="hero-headline">
              Student<br />
              Outcomes,<br />
              <span className="accent-line">Predicted.</span>
            </h1>
          </div>

          <div className="hero-sidebar">
            <p className="hero-description">
              A Decision Tree classification model designed to identify student academic outcomes from 12 selected attributes.
            </p>

            <div className="hero-meta-list">
              <div className="hero-meta-row">
                <span className="hero-meta-label">Model Architecture</span>
                <span className="hero-meta-val">Decision Tree Classifier</span>
              </div>
              <div className="hero-meta-row">
                <span className="hero-meta-label">Selected Features</span>
                <span className="hero-meta-val highlight">12 Selected Attributes</span>
              </div>
              <div className="hero-meta-row">
                <span className="hero-meta-label">Test Set Accuracy</span>
                <span className="hero-meta-val highlight">72.97%</span>
              </div>
              <div className="hero-meta-row">
                <span className="hero-meta-label">Prediction Target</span>
                <span className="hero-meta-val">Graduate / Enrolled / Dropout</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-bar">
          <a href="#predict" className="hero-cta-link">
            <span>Explore Predictor</span>
            <span>↓</span>
          </a>

          <div className="scroll-indicator">
            <span>Scroll to explore</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1V11M6 11L1 6M6 11L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
