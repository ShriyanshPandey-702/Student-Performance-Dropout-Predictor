import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True
    assert data["features_loaded"] is True
    assert data["model_type"] == "DecisionTreeClassifier"
    assert data["classes"] == ["Dropout", "Enrolled", "Graduate"]
    assert data["features_count"] == 12

def test_prediction_known_validation_sample():
    # User's known validation test sample
    payload = {
        "Previous qualification": 1,
        "Previous qualification (grade)": 142.0,
        "Admission grade": 141.0,
        "Displaced": 1,
        "Debtor": 0,
        "Tuition fees up to date": 1,
        "Scholarship holder": 0,
        "Age at enrollment": 18,
        "Curricular units 1st sem (enrolled)": 6,
        "Curricular units 1st sem (evaluations)": 6,
        "Curricular units 1st sem (approved)": 6,
        "Curricular units 1st sem (grade)": 13.0
    }

    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    res = response.json()

    print("\nAPI Response:", res)

    # Verify predictions
    assert res["prediction"] == "Graduate"
    
    # Expected: Dropout ~6.85%, Enrolled ~12.60%, Graduate ~80.55%
    assert abs(res["probabilities_percent"]["Graduate"] - 80.55) < 0.05
    assert abs(res["probabilities_percent"]["Enrolled"] - 12.60) < 0.05
    assert abs(res["probabilities_percent"]["Dropout"] - 6.85) < 0.05
    
    # Check probability keys
    assert abs(res["graduate_probability"] - 0.8055) < 0.005
    assert abs(res["enrolled_probability"] - 0.1260) < 0.005
    assert abs(res["dropout_probability"] - 0.0685) < 0.005

def test_prediction_with_snake_case_fields():
    # Test snake_case payload support
    payload = {
        "previous_qualification": 1,
        "previous_qualification_grade": 142.0,
        "admission_grade": 141.0,
        "displaced": 1,
        "debtor": 0,
        "tuition_fees_up_to_date": 1,
        "scholarship_holder": 0,
        "age_at_enrollment": 18,
        "curricular_units_1st_sem_enrolled": 6,
        "curricular_units_1st_sem_evaluations": 6,
        "curricular_units_1st_sem_approved": 6,
        "curricular_units_1st_sem_grade": 13.0
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    res = response.json()
    assert res["prediction"] == "Graduate"
