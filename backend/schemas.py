from pydantic import BaseModel, Field, ConfigDict
from typing import Dict, List, Optional

class StudentFeaturesInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    previous_qualification: int = Field(
        ...,
        alias="Previous qualification",
        ge=1,
        le=50,
        description="Previous qualification code (1 = Secondary Education, etc.)"
    )
    previous_qualification_grade: float = Field(
        ...,
        alias="Previous qualification (grade)",
        ge=0.0,
        le=200.0,
        description="Grade of previous qualification (scale 0-200)"
    )
    admission_grade: float = Field(
        ...,
        alias="Admission grade",
        ge=0.0,
        le=200.0,
        description="Admission grade (scale 0-200)"
    )
    displaced: int = Field(
        ...,
        alias="Displaced",
        ge=0,
        le=1,
        description="Displaced student (1: Yes, 0: No)"
    )
    debtor: int = Field(
        ...,
        alias="Debtor",
        ge=0,
        le=1,
        description="Student has debt (1: Yes, 0: No)"
    )
    tuition_fees_up_to_date: int = Field(
        ...,
        alias="Tuition fees up to date",
        ge=0,
        le=1,
        description="Tuition fees are up to date (1: Yes, 0: No)"
    )
    scholarship_holder: int = Field(
        ...,
        alias="Scholarship holder",
        ge=0,
        le=1,
        description="Scholarship holder (1: Yes, 0: No)"
    )
    age_at_enrollment: int = Field(
        ...,
        alias="Age at enrollment",
        ge=14,
        le=100,
        description="Age at enrollment"
    )
    curricular_units_1st_sem_enrolled: int = Field(
        ...,
        alias="Curricular units 1st sem (enrolled)",
        ge=0,
        le=50,
        description="Number of curricular units enrolled in 1st semester"
    )
    curricular_units_1st_sem_evaluations: int = Field(
        ...,
        alias="Curricular units 1st sem (evaluations)",
        ge=0,
        le=60,
        description="Number of evaluations in 1st semester"
    )
    curricular_units_1st_sem_approved: int = Field(
        ...,
        alias="Curricular units 1st sem (approved)",
        ge=0,
        le=50,
        description="Number of approved units in 1st semester"
    )
    curricular_units_1st_sem_grade: float = Field(
        ...,
        alias="Curricular units 1st sem (grade)",
        ge=0.0,
        le=20.0,
        description="Average grade in 1st semester (scale 0-20)"
    )

class PredictionResponse(BaseModel):
    prediction: str
    dropout_probability: float
    enrolled_probability: float
    graduate_probability: float
    probabilities_percent: Dict[str, float]

class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    features_loaded: bool
    model_type: str
    classes: List[str]
    features: List[str]
    features_count: int
