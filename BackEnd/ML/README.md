# ⚡ Energy Efficiency API

A FastAPI-based backend that serves machine learning models to predict **heating load** and **cooling load** of residential buildings using the **Energy Efficiency Dataset (Kaggle)**.  
The API provides actionable insights by categorizing energy efficiency and offering recommendations to improve building performance.

---

## 🚀 Features
- Predict **Heating Load** (kWh/m²) using a Ridge Regression model.
- Predict **Cooling Load** (kWh/m²) using a Lasso Regression model.
- Input validation with **Pydantic** (ensures clean and correct data).
- Preprocessing with **Scaler** to normalize features.
- Categorized efficiency levels (`Low`, `Moderate`, `High`) with recommendations.
- Built-in **logging** and **error handling**.
- **CORS enabled** → ready to connect with MERN/React frontend.
- Interactive API docs powered by **Swagger UI** at `/docs`.

---

## 📊 Dataset
- **Name**: [Energy Efficiency Dataset (Kaggle)](https://www.kaggle.com/datasets/elikplim/eergy-efficiency-dataset)  
- **Features**: Relative compactness, surface area, wall area, roof area, overall height, orientation, glazing area, glazing distribution.  
- **Targets**: Heating Load, Cooling Load.  
- Preprocessing:
  - Standard scaling applied.
  - Encoded categorical features with `Enum` mapping.
  - Two ML models trained:
    - `y1_ridge.pkl` → Heating Load.
    - `y2_lasso.pkl` → Cooling Load.

---

## 🛠️ Tech Stack
- **FastAPI** – API framework
- **Scikit-learn** – Machine Learning (Ridge & Lasso Regression)
- **Pydantic** – Input validation
- **Pickle** – Model serialization
- **Logging** – Debugging & monitoring
- **CORS Middleware** – For frontend integration

---

## ⚙️ Setup & Installation

Clone the repo:
```bash
git clone https://github.com/yourusername/ml-backend.git
cd ml-backend
````

Create a virtual environment & install dependencies:

```bash
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

Run the FastAPI server:

```bash
uvicorn app:app --reload
```

Now open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to explore the API interactively.

---

## 🔌 API Endpoints

### 1️⃣ Root

**GET /**
Returns a welcome message.

```json
{
  "message": "Welcome to Energy Efficiency API!"
}
```

### 2️⃣ Predict

**POST /predict**
Accepts building parameters and returns predictions.

📥 Example Request:

```json
{
  "relative_compactness": 0.71,
  "surface_area": 609.5,
  "wall_area": 300,
  "roof_area": 150.25,
  "overall_height": 3.5,
  "orientation": 2,
  "glazing_area": 0.25,
  "glazing_area_distribution": 2
}
```

📤 Example Response:

```json
{
  "heating_load": 18.53,
  "cooling_load": 21.7,
  "efficiency": "Moderate",
  "recommendation": "Acceptable, but can be improved"
}
```

---

## 🌐 Deployment

The API is deployed on **Render**:
👉 [Render Link – Coming Soon](#)

---

## 📌 Notes

* Error handling with `HTTPException` for invalid inputs or prediction failures.
* Logging ensures both input & output are traceable.
* CORS enabled: ready for frontend integration (React, MERN stack).

---

## 📜 License

This project currently has **no license**.
⚠️ That means others can see the code but legally **cannot use, modify, or distribute it**.
If you want it open-source, consider adding one (MIT, Apache 2.0, etc.).

---

## 👤 Author

* **Govind Singh** – MLOps & ML Enthusiast

---

