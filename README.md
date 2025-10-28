# 🏡 Energy Efficiency Prediction System

A web-based application that predicts the Heating Load and Cooling Load of buildings using a Machine Learning model.  
This project helps in estimating the energy efficiency of buildings and suggests recommendations to improve performance.

---

## 🚀 Features

✔️ User-friendly UI built with React  
✔️ FastAPI backend for ML model inference  
✔️ Predicts:
- Heating Load (y1)
- Cooling Load (y2)

✔️ Efficiency classification:
| Efficiency Level | Meaning |
|----------------|---------|
| High Efficiency | Optimal performance achieved |
| Moderate Efficiency | Acceptable, can improve |
| Low Efficiency | Add insulation |

✔️ Real-time predictions using Axios  
✔️ Trained using Kaggle **Energy Efficiency Dataset**  
✔️ Deployed frontend + backend separately

---

## 🔍 Objective

To provide an instant estimation of building energy performance using ML  
and help architects/engineers take better design decisions.

---

## 🧠 Machine Learning Model

- Algorithm: **Linear Regression**
- Libraries Used: `scikit-learn`, `pandas`, `numpy`
- Trained in Jupyter Notebook
- Model stored as `.pkl` and loaded in FastAPI

Dataset Source:  
📌 https://www.kaggle.com/datasets/elikplim/eergy-efficiency-dataset

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React.js, Axios |
| Backend | FastAPI |
| ML Model | Scikit-learn |
| Styling | Tailwind CSS |
| Deployment | GitHub Pages (Frontend), Render (Backend) |

---

## 🔄 System Workflow

1️⃣ User enters building parameters  
2️⃣ React sends input to FastAPI using Axios  
3️⃣ ML model predicts heating & cooling loads  
4️⃣ Backend classifies efficiency level  
5️⃣ Frontend displays predictions & recommendations

---

## 📌 Flowchart

```

User (React UI)
|
v
Axios → FastAPI Backend → ML Model → Predictions
|                                 |
+--------- Recommendations --------+
|
v
UI Output Display

````

---

## 📡 API Endpoint

**POST** `/predict`

✅ Example Request:

```json
{
  "relative_compactness": 0.82,
  "surface_area": 660,
  "wall_area": 330,
  "roof_area": 165,
  "orientation": 2,
  "glazing_area": 0.1,
  "glazing_area_distribution": 0
}
````

✅ Example Response:

```json
{
  "Heating_Load": 11.40,
  "Cooling_Load": 14.06,
  "Efficiency": "High",
  "Recommendation": "Optimal performance achieved"
}
```

---

## 🧩 Project Structure

```
project-root/
│── README.md
│
├── backend/
│   ├── app.py
│   ├── models/
│   │   ├── model.pkl
│   │   └── scaler.pkl
│   └── requirements.txt
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

---

## ▶️ How to Run

### ✅ Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### ✅ Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🌎 Deployment

* Frontend: **GitHub Pages**
* Backend: **Render**
* Frontend communicates with backend using **public API URL**

Example:

```js
axios.post("https://your-backend-url/predict", formData)
```

---

## 🎯 Future Enhancements

🔹 Add more ML models (XGBoost, Random Forest)
🔹 Visualize past predictions in dashboard
🔹 User authentication & database storage

---

## 👥 Authors

* **Govind Singh** – ML + Backend (FastAPI)
* **Ritik Sharma** – React development
* **Tavishi Jain** – Interface design

---

## 📜 License

This project is developed for academic purposes.

---

### ⭐ If you like this project, please give it a star on GitHub!

---

