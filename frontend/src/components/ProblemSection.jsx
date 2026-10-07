import React from 'react';

export default function ProblemSection() {
  return (
    <section className="section-problem" id="problem">
      <div className="editorial-shell">
        <span className="label-meta" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--accent)' }}>
          02 / The Problem
        </span>

        <div className="problem-layout">
          <div className="problem-statement">
            Not Every<br />
            Student<br />
            Who Struggles<br />
            <span className="dim">Is Lost.</span>
          </div>

          <div className="problem-content">
            <p className="problem-paragraph">
              Higher education institutions worldwide face persistent student attrition.
              Traditional institutional reviews frequently detect academic distress too late—after
              unpaid fees, failed exams, or prolonged disengagement have already caused unrecoverable dropout.
            </p>

            <div className="problem-callout">
              <strong>Early Detection Is Everything:</strong> Academic background, socio-economic
              factors, and first-semester milestones contain predictive signals. By evaluating these
              12 indicators together, institutions gain the early warning window needed to deliver
              timely tutoring, financial counseling, and academic advising.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
