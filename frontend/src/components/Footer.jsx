import React from 'react';

export default function Footer() {
  return (
    <footer className="editorial-footer">
      <div className="editorial-shell">
        <div className="footer-top-row">
          <div>
            <div className="footer-brand-huge">
              Student Dropout<br />
              Predictor
            </div>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', maxWidth: '420px', fontSize: '0.95rem' }}>
              Empowering academic institutions with early machine learning predictive intelligence to support student completion and degree attainment.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span className="label-meta">Navigation Index</span>
            <a href="#hero" className="nav-item-link">01 / Top of Page</a>
            <a href="#problem" className="nav-item-link">02 / The Problem</a>
            <a href="#signals" className="nav-item-link">03 / 12 Signals</a>
            <a href="#stats" className="nav-item-link">04 / Statistics</a>
            <a href="#importance" className="nav-item-link">05 / Feature Importance</a>
            <a href="#predict" className="nav-item-link highlight">06 / Run Prediction</a>
            <a href="#result" className="nav-item-link">07 / Model Output</a>
            <a href="#verification" className="nav-item-link">08 / Verification</a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span>Trained Model: DecisionTreeClassifier (72.97% Accuracy)</span>
          <span>Preserved Pipeline • Strict Feature Order Integrity</span>
        </div>
      </div>
    </footer>
  );
}
