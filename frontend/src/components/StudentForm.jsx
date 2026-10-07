import React from 'react';

export default function StudentForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  onSelectPreset,
  activePreset
}) {
  const handleInputChange = (field, value) => {
    onChange({
      ...formData,
      [field]: value === '' ? '' : Number(value)
    });
  };

  const handleToggle = (field, value) => {
    onChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <section className="section-predict" id="predict">
      <div className="editorial-shell">
        <div className="predict-header-row">
          <div>
            <span className="label-meta" style={{ display: 'block', marginBottom: '1rem', color: 'var(--accent)' }}>
              06 / Interactive Inference
            </span>
            <h2 className="section-title-large">
              Run A<br />
              Prediction.
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '1.15rem' }}>
              Enter the student's academic and financial indicators to generate an immediate outcome prediction and class probabilities.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="presets-nav">
            <span className="preset-title">Load Sample:</span>
            <button
              type="button"
              id="preset-validation-btn"
              className={`preset-link-btn ${activePreset === 'validation' ? 'active' : ''}`}
              onClick={() => onSelectPreset('validation')}
            >
              [ Validation / Graduate ]
            </button>
            <button
              type="button"
              id="preset-high-risk-btn"
              className={`preset-link-btn ${activePreset === 'high-risk' ? 'active' : ''}`}
              onClick={() => onSelectPreset('high-risk')}
            >
              [ High-Risk / Dropout ]
            </button>
            <button
              type="button"
              id="preset-reset-btn"
              className="preset-link-btn reset"
              onClick={() => onSelectPreset('empty')}
            >
              [ Reset ]
            </button>
          </div>
        </div>

        <form onSubmit={onSubmit} className="editorial-form" id="student-prediction-form">
          {/* SEGMENT 01: Academic Background */}
          <div className="form-segment">
            <div className="form-segment-header">
              <h3 className="form-segment-title">01 / Academic Background</h3>
              <span className="label-meta">Prior Credentials</span>
            </div>

            <div className="form-fields-grid">
              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="previous-qualification" className="field-label">
                    Previous Qualification
                  </label>
                  <span className="field-hint">Code (1: Secondary Ed.)</span>
                </div>
                <input
                  id="previous-qualification"
                  type="number"
                  min="1"
                  max="50"
                  className="editorial-input"
                  value={formData.previous_qualification}
                  onChange={(e) => handleInputChange('previous_qualification', e.target.value)}
                  required
                />
              </div>

              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="previous-qualification-grade" className="field-label">
                    Previous Qualification Grade
                  </label>
                  <span className="field-hint">Scale 0–200</span>
                </div>
                <input
                  id="previous-qualification-grade"
                  type="number"
                  step="0.1"
                  min="0"
                  max="200"
                  className="editorial-input"
                  value={formData.previous_qualification_grade}
                  onChange={(e) => handleInputChange('previous_qualification_grade', e.target.value)}
                  required
                />
              </div>

              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="admission-grade" className="field-label">
                    Admission Grade
                  </label>
                  <span className="field-hint">Scale 0–200</span>
                </div>
                <input
                  id="admission-grade"
                  type="number"
                  step="0.1"
                  min="0"
                  max="200"
                  className="editorial-input"
                  value={formData.admission_grade}
                  onChange={(e) => handleInputChange('admission_grade', e.target.value)}
                  required
                />
              </div>

              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="age-at-enrollment" className="field-label">
                    Age at Enrollment
                  </label>
                  <span className="field-hint">Age in Years</span>
                </div>
                <input
                  id="age-at-enrollment"
                  type="number"
                  min="14"
                  max="90"
                  className="editorial-input"
                  value={formData.age_at_enrollment}
                  onChange={(e) => handleInputChange('age_at_enrollment', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* SEGMENT 02: Demographic & Financial Status */}
          <div className="form-segment">
            <div className="form-segment-header">
              <h3 className="form-segment-title">02 / Demographic & Financial Status</h3>
              <span className="label-meta">Socio-Economic Factors</span>
            </div>

            <div className="form-fields-grid">
              {/* Displaced */}
              <div className="editorial-field">
                <div className="field-label-row">
                  <span className="field-label">Displaced Student</span>
                  <span className="field-hint">Living Away from Home</span>
                </div>
                <div className="editorial-toggle-group">
                  <button
                    type="button"
                    id="toggle-displaced-no"
                    className={`editorial-toggle-option ${formData.displaced === 0 ? 'active' : ''}`}
                    onClick={() => handleToggle('displaced', 0)}
                  >
                    <span className="toggle-indicator" />
                    <span>No</span>
                  </button>
                  <button
                    type="button"
                    id="toggle-displaced-yes"
                    className={`editorial-toggle-option ${formData.displaced === 1 ? 'active' : ''}`}
                    onClick={() => handleToggle('displaced', 1)}
                  >
                    <span className="toggle-indicator" />
                    <span>Yes</span>
                  </button>
                </div>
              </div>

              {/* Debtor */}
              <div className="editorial-field">
                <div className="field-label-row">
                  <span className="field-label">Debtor Status</span>
                  <span className="field-hint">Outstanding Debt</span>
                </div>
                <div className="editorial-toggle-group">
                  <button
                    type="button"
                    id="toggle-debtor-no"
                    className={`editorial-toggle-option ${formData.debtor === 0 ? 'active' : ''}`}
                    onClick={() => handleToggle('debtor', 0)}
                  >
                    <span className="toggle-indicator" />
                    <span>No</span>
                  </button>
                  <button
                    type="button"
                    id="toggle-debtor-yes"
                    className={`editorial-toggle-option ${formData.debtor === 1 ? 'active' : ''}`}
                    onClick={() => handleToggle('debtor', 1)}
                  >
                    <span className="toggle-indicator" />
                    <span>Yes</span>
                  </button>
                </div>
              </div>

              {/* Tuition fees up to date */}
              <div className="editorial-field">
                <div className="field-label-row">
                  <span className="field-label">Tuition Fees Up To Date</span>
                  <span className="field-hint">Fee Compliance</span>
                </div>
                <div className="editorial-toggle-group">
                  <button
                    type="button"
                    id="toggle-tuition-no"
                    className={`editorial-toggle-option ${formData.tuition_fees_up_to_date === 0 ? 'active' : ''}`}
                    onClick={() => handleToggle('tuition_fees_up_to_date', 0)}
                  >
                    <span className="toggle-indicator" />
                    <span>No</span>
                  </button>
                  <button
                    type="button"
                    id="toggle-tuition-yes"
                    className={`editorial-toggle-option ${formData.tuition_fees_up_to_date === 1 ? 'active' : ''}`}
                    onClick={() => handleToggle('tuition_fees_up_to_date', 1)}
                  >
                    <span className="toggle-indicator" />
                    <span>Yes</span>
                  </button>
                </div>
              </div>

              {/* Scholarship holder */}
              <div className="editorial-field">
                <div className="field-label-row">
                  <span className="field-label">Scholarship Holder</span>
                  <span className="field-hint">Financial Aid</span>
                </div>
                <div className="editorial-toggle-group">
                  <button
                    type="button"
                    id="toggle-scholarship-no"
                    className={`editorial-toggle-option ${formData.scholarship_holder === 0 ? 'active' : ''}`}
                    onClick={() => handleToggle('scholarship_holder', 0)}
                  >
                    <span className="toggle-indicator" />
                    <span>No</span>
                  </button>
                  <button
                    type="button"
                    id="toggle-scholarship-yes"
                    className={`editorial-toggle-option ${formData.scholarship_holder === 1 ? 'active' : ''}`}
                    onClick={() => handleToggle('scholarship_holder', 1)}
                  >
                    <span className="toggle-indicator" />
                    <span>Yes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SEGMENT 03: First Semester Performance */}
          <div className="form-segment">
            <div className="form-segment-header">
              <h3 className="form-segment-title">03 / First Semester Performance</h3>
              <span className="label-meta">Academic Milestones</span>
            </div>

            <div className="form-fields-grid">
              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="sem1-enrolled" className="field-label">
                    Units Enrolled
                  </label>
                  <span className="field-hint">Courses Registered</span>
                </div>
                <input
                  id="sem1-enrolled"
                  type="number"
                  min="0"
                  max="30"
                  className="editorial-input"
                  value={formData.curricular_units_1st_sem_enrolled}
                  onChange={(e) => handleInputChange('curricular_units_1st_sem_enrolled', e.target.value)}
                  required
                />
              </div>

              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="sem1-evaluations" className="field-label">
                    Units Evaluated
                  </label>
                  <span className="field-hint">Exams Taken</span>
                </div>
                <input
                  id="sem1-evaluations"
                  type="number"
                  min="0"
                  max="50"
                  className="editorial-input"
                  value={formData.curricular_units_1st_sem_evaluations}
                  onChange={(e) => handleInputChange('curricular_units_1st_sem_evaluations', e.target.value)}
                  required
                />
              </div>

              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="sem1-approved" className="field-label">
                    Units Approved
                  </label>
                  <span className="field-hint">Courses Passed (Primary Signal)</span>
                </div>
                <input
                  id="sem1-approved"
                  type="number"
                  min="0"
                  max="30"
                  className="editorial-input"
                  value={formData.curricular_units_1st_sem_approved}
                  onChange={(e) => handleInputChange('curricular_units_1st_sem_approved', e.target.value)}
                  required
                />
              </div>

              <div className="editorial-field">
                <div className="field-label-row">
                  <label htmlFor="sem1-grade" className="field-label">
                    1st Semester Grade
                  </label>
                  <span className="field-hint">Scale 0–20 (e.g. 13.0)</span>
                </div>
                <input
                  id="sem1-grade"
                  type="number"
                  step="0.01"
                  min="0"
                  max="20"
                  className="editorial-input"
                  value={formData.curricular_units_1st_sem_grade}
                  onChange={(e) => handleInputChange('curricular_units_1st_sem_grade', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Large Editorial CTA Button */}
          <button
            type="submit"
            id="btn-predict-outcome"
            className="btn-editorial-predict"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-indicator-row">
                <span>Analyzing Student Profile</span>
                <span className="loading-line" />
              </div>
            ) : (
              <>
                <span>Predict Student Outcome</span>
                <span style={{ fontSize: '2rem', lineHeight: '1' }}>→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
