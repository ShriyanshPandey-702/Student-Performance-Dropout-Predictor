import React from 'react';

export default function StatsSection() {
  const stats = [
    {
      value: '72.97%',
      label: 'Test Accuracy',
      sub: 'Consistent out-of-sample performance',
      highlight: true
    },
    {
      value: '12',
      label: 'Selected Features',
      sub: 'Exact optimized feature subset',
      highlight: false
    },
    {
      value: '5',
      label: 'Max Tree Depth',
      sub: 'Constrained to prevent overfitting',
      highlight: false
    },
    {
      value: '3',
      label: 'Outcome Classes',
      sub: 'Graduate, Enrolled, Dropout',
      highlight: false
    }
  ];

  return (
    <section className="section-stats" id="stats">
      <div className="editorial-shell">
        <span className="label-meta" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--accent)' }}>
          04 / Benchmark Statistics
        </span>

        <div className="stats-bar">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-block">
              <div className={`stat-value ${stat.highlight ? 'highlight' : ''}`}>
                {stat.value}
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-subtext">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
