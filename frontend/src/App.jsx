import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ModelSection from './components/ModelSection';
import StatsSection from './components/StatsSection';
import FeatureImportanceSection from './components/FeatureImportanceSection';
import StudentForm from './components/StudentForm';
import ResultSection from './components/ResultSection';
import ModelVerification from './components/ModelVerification';
import Footer from './components/Footer';

// Exact validation sample provided in requirements
const VALIDATION_SAMPLE = {
  previous_qualification: 1,
  previous_qualification_grade: 142.0,
  admission_grade: 141.0,
  displaced: 1,
  debtor: 0,
  tuition_fees_up_to_date: 1,
  scholarship_holder: 0,
  age_at_enrollment: 18,
  curricular_units_1st_sem_enrolled: 6,
  curricular_units_1st_sem_evaluations: 6,
  curricular_units_1st_sem_approved: 6,
  curricular_units_1st_sem_grade: 13.0,
};

// High-Risk Sample likely to Dropout
const HIGH_RISK_SAMPLE = {
  previous_qualification: 1,
  previous_qualification_grade: 110.0,
  admission_grade: 105.0,
  displaced: 0,
  debtor: 1,
  tuition_fees_up_to_date: 0,
  scholarship_holder: 0,
  age_at_enrollment: 28,
  curricular_units_1st_sem_enrolled: 6,
  curricular_units_1st_sem_evaluations: 2,
  curricular_units_1st_sem_approved: 0,
  curricular_units_1st_sem_grade: 0.0,
};

// Default empty/neutral form
const EMPTY_FORM = {
  previous_qualification: 1,
  previous_qualification_grade: 120.0,
  admission_grade: 120.0,
  displaced: 0,
  debtor: 0,
  tuition_fees_up_to_date: 1,
  scholarship_holder: 0,
  age_at_enrollment: 20,
  curricular_units_1st_sem_enrolled: 6,
  curricular_units_1st_sem_evaluations: 6,
  curricular_units_1st_sem_approved: 4,
  curricular_units_1st_sem_grade: 11.5,
};

export default function App() {
  const [formData, setFormData] = useState(VALIDATION_SAMPLE);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking'); // 'online' | 'offline' | 'checking'
  const [activePreset, setActivePreset] = useState('validation');

  const API_BASE = '/api';
  const FALLBACK_API_BASE = 'http://127.0.0.1:8000';

  // Check backend health
  const checkHealth = async () => {
    try {
      let res = await fetch(`${API_BASE}/health`).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch(`${FALLBACK_API_BASE}/health`);
      }
      if (res.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectPreset = (presetKey) => {
    setActivePreset(presetKey);
    setErrorMessage('');
    if (presetKey === 'validation') {
      setFormData(VALIDATION_SAMPLE);
    } else if (presetKey === 'high-risk') {
      setFormData(HIGH_RISK_SAMPLE);
    } else {
      setFormData(EMPTY_FORM);
    }
  };

  const handlePredict = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      let endpoint = `${API_BASE}/predict`;
      let res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch(() => null);

      if (!res || !res.ok) {
        endpoint = `${FALLBACK_API_BASE}/predict`;
        res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setPredictionResult(data);
      setBackendStatus('online');

      // Smoothly scroll to the result section
      setTimeout(() => {
        const resultEl = document.getElementById('result');
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err) {
      console.error('Prediction failed:', err);
      setErrorMessage(
        `Failed to run prediction: ${err.message}. Make sure the FastAPI backend is running on port 8000.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="editorial-app">
      <Navbar backendStatus={backendStatus} />
      <Hero />
      <ProblemSection />
      <ModelSection />
      <StatsSection />
      <FeatureImportanceSection />

      {errorMessage && (
        <div className="editorial-shell" style={{ marginTop: '3rem' }}>
          <div style={{
            padding: '1.25rem 1.5rem',
            background: 'rgba(255, 92, 108, 0.1)',
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            fontSize: '13px',
            letterSpacing: '0.04em',
            borderRadius: '2px'
          }}>
            ERROR: {errorMessage}
          </div>
        </div>
      )}

      <StudentForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handlePredict}
        isLoading={isLoading}
        onSelectPreset={handleSelectPreset}
        activePreset={activePreset}
      />

      <ResultSection
        result={predictionResult}
        isLoading={isLoading}
      />

      <ModelVerification />
      <Footer />
    </div>
  );
}
