import os
import sys
from pathlib import Path
from typing import Dict, Any

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np

from backend.schemas import StudentFeaturesInput, PredictionResponse, HealthResponse

# Initialize FastAPI App
app = FastAPI(
    title="Student Dropout Prediction API",
    description="Backend API for predicting student academic outcomes using trained DecisionTreeClassifier model.",
    version="1.0.0"
)

# Enable CORS for Frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Locate model and feature artifact paths
BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent

MODEL_CANDIDATES = [
    PROJECT_ROOT / "student_dropout_model.pkl",
    BASE_DIR / "student_dropout_model.pkl"
]

FEATURES_CANDIDATES = [
    PROJECT_ROOT / "selected_features.pkl",
    BASE_DIR / "selected_features.pkl"
]

model_path = next((p for p in MODEL_CANDIDATES if p.exists()), None)
features_path = next((p for p in FEATURES_CANDIDATES if p.exists()), None)

# Global model and feature references
model = None
selected_features = []
model_classes = []

def load_artifacts():
    global model, selected_features, model_classes

    if not model_path or not model_path.exists():
        raise FileNotFoundError(f"Model file 'student_dropout_model.pkl' not found. Checked: {MODEL_CANDIDATES}")
    
    if not features_path or not features_path.exists():
        raise FileNotFoundError(f"Selected features file 'selected_features.pkl' not found. Checked: {FEATURES_CANDIDATES}")

    # Load artifacts via joblib without retraining
    selected_features = joblib.load(features_path)
    model = joblib.load(model_path)
    model_classes = list(getattr(model, "classes_", []))

    print(f" Loaded model successfully from {model_path}")
    print(f" Loaded {len(selected_features)} features in exact order: {selected_features}")
    print(f" Model classes: {model_classes}")

# Load on startup
try:
    load_artifacts()
except Exception as e:
    print(f"Error loading model artifacts: {e}", file=sys.stderr)

@app.get("/", tags=["General"])
def root():
    return {
        "message": "Student Dropout Prediction API is active",
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse, tags=["Diagnostics"])
def health_check():
    """Verify backend status and model readiness."""
    if model is None or not selected_features:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model or features artifacts are not loaded."
        )

    return HealthResponse(
        status="healthy",
        model_loaded=True,
        features_loaded=True,
        model_type=type(model).__name__,
        classes=model_classes,
        features=selected_features,
        features_count=len(selected_features)
    )

@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
def predict(student: StudentFeaturesInput):
    """
    Predict student outcome (Dropout, Enrolled, Graduate) and class probabilities.
    Strictly adheres to the feature order specified in selected_features.pkl.
    """
    if model is None or not selected_features:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Model is not loaded."
        )

    try:
        # Map input attributes by their official feature names in selected_features.pkl
        feature_data: Dict[str, Any] = {
            "Previous qualification": student.previous_qualification,
            "Previous qualification (grade)": student.previous_qualification_grade,
            "Admission grade": student.admission_grade,
            "Displaced": student.displaced,
            "Debtor": student.debtor,
            "Tuition fees up to date": student.tuition_fees_up_to_date,
            "Scholarship holder": student.scholarship_holder,
            "Age at enrollment": student.age_at_enrollment,
            "Curricular units 1st sem (enrolled)": student.curricular_units_1st_sem_enrolled,
            "Curricular units 1st sem (evaluations)": student.curricular_units_1st_sem_evaluations,
            "Curricular units 1st sem (approved)": student.curricular_units_1st_sem_approved,
            "Curricular units 1st sem (grade)": student.curricular_units_1st_sem_grade,
        }

        # Build DataFrame with exact feature order specified by selected_features.pkl
        input_row = [feature_data[col] for col in selected_features]
        df_input = pd.DataFrame([input_row], columns=selected_features)

        # Call model.predict() and model.predict_proba()
        raw_pred = model.predict(df_input)[0]
        raw_probas = model.predict_proba(df_input)[0]

        # Map class probabilities
        class_probas = {cls: float(prob) for cls, prob in zip(model_classes, raw_probas)}

        dropout_prob = float(class_probas.get("Dropout", 0.0))
        enrolled_prob = float(class_probas.get("Enrolled", 0.0))
        graduate_prob = float(class_probas.get("Graduate", 0.0))

        # Percentage format (e.g., 80.55)
        percentages = {
            "Dropout": round(dropout_prob * 100, 2),
            "Enrolled": round(enrolled_prob * 100, 2),
            "Graduate": round(graduate_prob * 100, 2)
        }

        return PredictionResponse(
            prediction=str(raw_pred),
            dropout_probability=dropout_prob,
            enrolled_probability=enrolled_prob,
            graduate_probability=graduate_prob,
            probabilities_percent=percentages
        )

    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction error: {str(exc)}"
        )

# Optional: Serve built frontend static assets if available
frontend_dist = PROJECT_ROOT / "frontend" / "dist"
if frontend_dist.exists():
    from fastapi.staticfiles import StaticFiles
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="static")

