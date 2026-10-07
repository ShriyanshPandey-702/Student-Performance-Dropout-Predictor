import React from 'react';

export default function ModelVerification() {
  const metadata = [
    { key: 'Model Architecture', value: 'Decision Tree Classifier' },
    { key: 'Implementation Class', value: 'sklearn.tree.DecisionTreeClassifier' },
    { key: 'Max Tree Depth', value: '5' },
    { key: 'Features Evaluated', value: '12 Selected Attributes', highlight: true },
    { key: 'Test Set Accuracy', value: '72.97%', highlight: true },
    { key: 'Binary Feature Handling', value: 'Direct Flag Encoding (Yes: 1 / No: 0)' },
    { key: 'Artifact Persistence', value: 'student_dropout_model.pkl & selected_features.pkl' }
  ];

  return (
    <section className="section-verification" id="verification">
      <div className="editorial-shell">
        <span className="label-meta" style={{ display: 'block', marginBottom: '2.5rem', color: 'var(--accent)' }}>
          08 / Technical Specification
        </span>

        <h2 className="section-title-large" style={{ marginBottom: '3rem' }}>
          Model<br />
          Verification.
        </h2>

        <div className="verification-table">
          {metadata.map((item, idx) => (
            <div key={idx} className="verification-row">
              <span className="verification-key">{item.key}</span>
              <span className={`verification-value ${item.highlight ? 'highlight' : ''}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
