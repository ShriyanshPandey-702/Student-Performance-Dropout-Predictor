import React from 'react';

export default function FeatureImportanceSection() {
  const featureImportances = [
    { name: 'Curricular units 1st sem (approved)', pct: 60.10 },
    { name: 'Tuition fees up to date', pct: 14.59 },
    { name: 'Curricular units 1st sem (enrolled)', pct: 7.95 },
    { name: 'Curricular units 1st sem (grade)', pct: 7.57 },
    { name: 'Scholarship holder', pct: 2.94 },
    { name: 'Admission grade', pct: 2.23 },
    { name: 'Curricular units 1st sem (evaluations)', pct: 2.08 },
    { name: 'Age at enrollment', pct: 1.40 },
    { name: 'Previous qualification (grade)', pct: 0.97 },
    { name: 'Displaced', pct: 0.16 },
    { name: 'Previous qualification', pct: 0.00 },
    { name: 'Debtor', pct: 0.00 }
  ];

  return (
    <section className="section-importance" id="importance">
      <div className="editorial-shell">
        <span className="label-meta" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--accent)' }}>
          05 / Feature Weighting
        </span>

        <div className="importance-layout">
          <div className="importance-hero-block">
            <h2 className="section-title-large">
              What Matters<br />
              Most?
            </h2>

            <div className="importance-number">
              60.10%
            </div>

            <div className="importance-hero-title">
              Curricular Units<br />
              1st Semester Approved
            </div>

            <p className="importance-hero-desc">
              Curricular units approved in the first semester contribute the largest share of the model's tree-split importance, making early academic performance the strongest signal among the selected attributes.
            </p>
          </div>

          <div className="importance-bars-list">
            <span className="label-meta">Relative Tree Split Gini Importance</span>

            {featureImportances.map((item, idx) => (
              <div key={idx} className="importance-bar-row">
                <div className="importance-bar-head">
                  <span className="importance-feature-name">{item.name}</span>
                  <span className="importance-feature-pct">{item.pct.toFixed(2)}%</span>
                </div>
                <div className="importance-track">
                  <div
                    className="importance-fill"
                    style={{ width: `${Math.max(item.pct, item.pct > 0 ? 1.5 : 0)}%` }}
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
