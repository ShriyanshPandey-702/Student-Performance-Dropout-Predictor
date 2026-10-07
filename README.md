# Student Dropout Prediction System

An end-to-end machine learning web application built around an existing trained Decision Tree classification model (~72.97% test accuracy) predicting student academic outcomes: **Dropout**, **Enrolled**, or **Graduate**.

---

## 📌 Architecture & Preserved ML Assets

- **Trained Model File**: `student_dropout_model.pkl` (DecisionTreeClassifier, max_depth=5, 100% preserved without retraining or modification)
- **Feature Schema File**: `selected_features.pkl` (Exact 12 features preserved in strict order)
- **Target Classes**:
  1. `Dropout`
  2. `Enrolled`
  3. `Graduate`

### Exact Selected Feature Order
1. `Previous qualification`
2. `Previous qualification (grade)`
3. `Admission grade`
4. `Displaced`
5. `Debtor`
6. `Tuition fees up to date`
7. `Scholarship holder`
8. `Age at enrollment`
9. `Curricular units 1st sem (enrolled)`
10. `Curricular units 1st sem (evaluations)`
11. `Curricular units 1st sem (approved)`
12. `Curricular units 1st sem (grade)`

---

## 🛠️ Project Structure

```
Student-Dropout-Predictor/
├── backend/
│   ├── main.py               # FastAPI application with CORS, model inference, and static hosting
│   ├── schemas.py            # Pydantic input/output schemas with validation
│   ├── requirements.txt      # Python dependencies (scikit-learn 1.6.1, FastAPI, pandas, etc.)
│   └── test_api.py           # Pytest test suite validating /health and /predict
│
├── frontend/
│   ├── index.html            # HTML entry point with Barlow Condensed & Inter typography
│   ├── package.json          # React, Vite, Lucide-icons dependencies
│   ├── vite.config.js        # Vite config with /api reverse-proxy to port 8000
│   └── src/
│       ├── main.jsx          # React DOM entry
│       ├── App.jsx           # Editorial storytelling orchestrator & state
│       ├── index.css         # Dark cinematic editorial design system (#080A09, #C8FF3D)
│       └── components/
│           ├── Navbar.jsx    # Minimal sticky editorial navigation
│           ├── Hero.jsx      # Bold typography hero (01 / Student Outcomes, Predicted)
│           ├── ProblemSection.jsx # Problem statement (02 / Not Every Student Who Struggles Is Lost)
│           ├── ModelSection.jsx   # 12 Signals in 3 editorial rows (03 / 12 Signals. 1 Prediction)
│           ├── StatsSection.jsx   # Wide horizontal statistics bar (04 / Benchmark Statistics)
│           ├── FeatureImportanceSection.jsx # Feature importance with 60.10% hero & bars
│           ├── StudentForm.jsx    # Editorial form with sharp inputs & Yes/No controls
│           ├── ResultSection.jsx  # Hero outcome with animated percentage counter & bars
│           ├── ModelVerification.jsx # Technical metadata grid (12 Selected Attributes)
│           └── Footer.jsx         # Minimal academic analytics footer
│
├── student_dropout_model.pkl # Trained Decision Tree model (unmodified)
├── selected_features.pkl     # Selected feature order (unmodified)
├── data.csv                  # Dataset
└── README.md                 # Project documentation
```

---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.10+ (Python 3.12 recommended)
- Node.js 18+ and npm

---

### Step 1: Set Up and Start Backend

In a terminal:

```bash
# Navigate to project root
cd /Users/shriyansh/Desktop/Student-Dropout-Predictor

# Create Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Start FastAPI backend on port 8000
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

- **API Root**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Swagger Documentation**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check Endpoint**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### Step 2: Set Up and Start Frontend

In a separate terminal:

```bash
# Navigate to frontend folder
cd /Users/shriyansh/Desktop/Student-Dropout-Predictor/frontend

# Install dependencies (only needed once)
npm install

# Start Vite development server
npm run dev
```

- **Frontend Dashboard**: [http://127.0.0.1:5173](http://127.0.0.1:5173)

---

### Alternative: All-in-One Serving via FastAPI
If you build the frontend once:
```bash
cd frontend && npm run build && cd ..
uvicorn backend.main:app --host 127.0.0.1 --port 8000
```
Then visit [http://127.0.0.1:8000](http://127.0.0.1:8000) to view both the UI and backend served seamlessly together.

---

## 🧪 Validation Sample Test

### Sample Values
- **Previous qualification**: `1`
- **Previous qualification (grade)**: `142`
- **Admission grade**: `141`
- **Displaced**: `1` (Yes)
- **Debtor**: `0` (No)
- **Tuition fees up to date**: `1` (Yes)
- **Scholarship holder**: `0` (No)
- **Age at enrollment**: `18`
- **Curricular units 1st sem (enrolled)**: `6`
- **Curricular units 1st sem (evaluations)**: `6`
- **Curricular units 1st sem (approved)**: `6`
- **Curricular units 1st sem (grade)**: `13`

### Expected & Produced Model Output
- **Predicted Outcome**: `Graduate`
- **Graduate Probability**: `80.55%`
- **Enrolled Probability**: `12.60%`
- **Dropout Probability**: `6.85%`

### Testing via curl
```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "Previous qualification": 1,
    "Previous qualification (grade)": 142,
    "Admission grade": 141,
    "Displaced": 1,
    "Debtor": 0,
    "Tuition fees up to date": 1,
    "Scholarship holder": 0,
    "Age at enrollment": 18,
    "Curricular units 1st sem (enrolled)": 6,
    "Curricular units 1st sem (evaluations)": 6,
    "Curricular units 1st sem (approved)": 6,
    "Curricular units 1st sem (grade)": 13
  }'
```

### Running Automated Test Suite
```bash
PYTHONPATH=. .venv/bin/pytest backend/test_api.py -v
```
