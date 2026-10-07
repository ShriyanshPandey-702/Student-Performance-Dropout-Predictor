import React from 'react';

export default function ModelSection() {
  const signalGroups = [
    {
      num: '01',
      title: 'Academic Background',
      signals: [
        { name: 'Previous qualification', detail: 'Educational qualification level (Code 1–43)' },
        { name: 'Previous qualification (grade)', detail: 'Secondary school grade (Scale 0–200)' },
        { name: 'Admission grade', detail: 'University entrance exam grade (Scale 0–200)' },
        { name: 'Age at enrollment', detail: 'Student age at time of matriculation' }
      ]
    },
    {
      num: '02',
      title: 'Financial & Demographic',
      signals: [
        { name: 'Displaced', detail: 'Living away from hometown / displaced student' },
        { name: 'Debtor', detail: 'Outstanding student debt obligations' },
        { name: 'Tuition fees up to date', detail: 'Current compliance with tuition payments' },
        { name: 'Scholarship holder', detail: 'Recipient of active merit / need scholarship' }
      ]
    },
    {
      num: '03',
      title: 'First Semester Milestone',
      signals: [
        { name: 'Curricular units enrolled', detail: 'Total courses registered in 1st semester' },
        { name: 'Curricular units evaluated', detail: 'Exams and formal evaluations attended' },
        { name: 'Curricular units approved', detail: 'Courses passed (key predictive indicator)' },
        { name: 'Curricular units grade', detail: 'Grade point average (Scale 0–20)' }
      ]
    }
  ];

  return (
    <section className="section-signals" id="signals">
      <div className="editorial-shell">
        <div className="section-head-editorial">
          <span className="label-meta" style={{ color: 'var(--accent)' }}>03 / The Signals</span>
          <h2 className="section-title-large">
            12 Signals.<br />
            1 Prediction.
          </h2>
        </div>

        <div className="signals-grid">
          {signalGroups.map((group) => (
            <div key={group.num} className="signal-group">
              <div className="signal-group-header">
                <h3 className="signal-group-title">{group.title}</h3>
                <span className="signal-group-num">{group.num}</span>
              </div>

              <ul className="signal-list">
                {group.signals.map((sig, idx) => (
                  <li key={idx} className="signal-item">
                    <span className="signal-item-name">{sig.name}</span>
                    <span className="signal-item-detail">{sig.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
