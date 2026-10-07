import React, { useEffect, useState } from 'react';

export default function ResultSection({ result, isLoading }) {
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    if (!result) return;

    const targetPct =
      result.prediction === 'Graduate'
        ? (result.probabilities_percent?.Graduate ?? result.graduate_probability * 100)
        : result.prediction === 'Enrolled'
        ? (result.probabilities_percent?.Enrolled ?? result.enrolled_probability * 100)
        : (result.probabilities_percent?.Dropout ?? result.dropout_probability * 100);

    let start = 0;
    const duration = 750; // ms
    const startTime = performance.now();

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayPct(Number((targetPct * easeProgress).toFixed(2)));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayPct(Number(targetPct.toFixed(2)));
      }
    };

    requestAnimationFrame(updateCounter);
  }, [result]);

  if (!result) {
    return (
      <section className="section-result" id="result">
        <div className="editorial-shell">
          <span className="label-meta" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--text-muted)' }}>
            07 / Model Output
          </span>

          <div className="result-placeholder-box">
            <span className="label-meta" style={{ color: 'var(--accent)' }}>Awaiting Input Profile</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              Ready For Inference
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Complete the student indicators above or select a preset sample, then click <strong>Predict Student Outcome</strong> to generate the distribution.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const {
    prediction,
    dropout_probability,
    enrolled_probability,
    graduate_probability,
    probabilities_percent
  } = result;

  const graduatePct = probabilities_percent?.Graduate ?? Number((graduate_probability * 100).toFixed(2));
  const enrolledPct = probabilities_percent?.Enrolled ?? Number((enrolled_probability * 100).toFixed(2));
  const dropoutPct = probabilities_percent?.Dropout ?? Number((dropout_probability * 100).toFixed(2));

  const stateClass = prediction.toLowerCase();

  const getAnalysis = (pred) => {
    switch (pred) {
      case 'Graduate':
        return 'The decision tree model identifies a strong, positive completion trajectory characterized by high first-semester unit approval and verified tuition compliance. The student exhibits strong retention momentum.';
      case 'Enrolled':
        return 'The model signals an in-progress trajectory with intermediate course evaluations. While the student remains active, their pacing suggests potential term delays. Periodic academic check-ins are recommended.';
      case 'Dropout':
        return 'Critical attrition signals detected. The student exhibits zero or minimal approved units in the first term, alongside financial risk indicators. Immediate advisory intervention and tutoring outreach are advised.';
      default:
        return '';
    }
  };

  const probaStack = [
    {
      name: 'Graduate',
      pct: graduatePct,
      type: 'graduate',
      isPredicted: prediction === 'Graduate'
    },
    {
      name: 'Enrolled',
      pct: enrolledPct,
      type: 'enrolled',
      isPredicted: prediction === 'Enrolled'
    },
    {
      name: 'Dropout',
      pct: dropoutPct,
      type: 'dropout',
      isPredicted: prediction === 'Dropout'
    }
  ];

  return (
    <section className="section-result" id="result">
      <div className="editorial-shell">
        <span className="label-meta" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--accent)' }}>
          07 / Inference Output
        </span>

        <div className="result-hero-layout">
          <div className="result-display-primary">
            <span className="label-meta">Predicted Academic Outcome</span>

            <div className={`result-outcome-title ${stateClass}`} id="predicted-outcome-text">
              {prediction}
            </div>

            <div className="result-score-line">
              <span>{displayPct.toFixed(2)}%</span>
              <span className="label">Confidence Certainty</span>
            </div>

            <p className="result-analysis-text">
              {getAnalysis(prediction)}
            </p>
          </div>

          <div className="probabilities-editorial-stack">
            <span className="label-meta">Class Probability Distribution</span>

            {probaStack.map((item) => (
              <div key={item.name} className="proba-editorial-row">
                <div className="proba-row-header">
                  <div className="proba-name">
                    <span>{item.name}</span>
                    {item.isPredicted && (
                      <span
                        className="proba-pill-badge"
                        style={{
                          background:
                            item.type === 'graduate'
                              ? 'rgba(200, 255, 61, 0.15)'
                              : item.type === 'enrolled'
                              ? 'rgba(244, 184, 63, 0.15)'
                              : 'rgba(255, 92, 108, 0.15)',
                          color:
                            item.type === 'graduate'
                              ? 'var(--accent)'
                              : item.type === 'enrolled'
                              ? 'var(--warning)'
                              : 'var(--danger)'
                        }}
                      >
                        PREDICTED
                      </span>
                    )}
                  </div>

                  <span
                    className={`proba-pct-number ${
                      item.isPredicted ? `highlight-${item.type}` : ''
                    }`}
                  >
                    {item.pct.toFixed(2)}%
                  </span>
                </div>

                <div className="proba-editorial-track">
                  <div
                    className={`proba-editorial-fill ${item.type}`}
                    style={{ width: `${Math.max(item.pct, item.pct > 0 ? 2 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
