from fastapi import FastAPI , HTTPException
from pydantic import BaseModel , Field
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum
import pickle, logging, sys

app = FastAPI(title='Energy Efficiency API')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5000"] for frontend only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)  # send logs to stdout
    ]
)

logger = logging.getLogger(__name__)

class OverallHeight(Enum):
    low = 3.5
    high = 7.0

class Orientation(Enum):
    north = 2
    east = 3
    south = 4
    west = 5

class GlazingArea(Enum):
    none = 0.0
    small = 0.1
    medium = 0.25
    large = 0.4

class GlazingAreaDistribution(Enum):
    none = 0
    north = 1
    east = 2
    south = 3
    west = 4
    uniform = 5

class Efficiency(Enum):
    low = "Low"
    moderate = "Moderate"
    high = "High"

class Recommendation(Enum):
    improve = "Needs significant improvement"
    acceptable = "Acceptable, but can be improved"
    optimal = "Optimal performance achieved"

# Request schema
class BuildingParameters(BaseModel):
    relative_compactness: float = Field(..., ge=0.6, le=1.0, description="0.62-0.98",example=0.71)
    surface_area: float = Field(..., ge=500, le=820, description="m², 514-808.5",example=609.5)
    wall_area: float = Field(..., ge=240, le=420, description="m², 245-416.5",example=300)
    roof_area: float = Field(..., ge=110, le=225, description="m², 110.25-220.5",example=150.25)
    overall_height: OverallHeight = Field(..., description="Allowed: 3.5 or 7.0",example=3.5)
    orientation: Orientation = Field(..., description="Allowed: 2, 3, 4, 5",example=2)
    glazing_area: GlazingArea = Field(..., description="Allowed: 0, 0.1, 0.25, 0.4",example=0.25)
    glazing_area_distribution:GlazingAreaDistribution = Field(...,description="Allowed: 0,1,2,3,4,5",example=2)

# Response schema
class PredictionResponse(BaseModel):
    heating_load: float = Field(..., description="Predicted heating load in kWh/m²")
    cooling_load: float = Field(..., description="Predicted cooling load in kWh/m²")
    efficiency: Efficiency = Field(..., description="Energy efficiency category")
    recommendation: Recommendation = Field(..., description="Actionable advice based on efficiency")

# Load models & scaler
try:
    with open("models/y1_ridge.pkl", "rb") as f:
        y1_ridge = pickle.load(f)
    with open("models/y2_lasso.pkl", "rb") as f:
        y2_lasso = pickle.load(f)
    with open("models/scaler.pkl", "rb") as f:
        scaler = pickle.load(f)
    logger.info("Models and scaler loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model: {e}")

@app.get('/')
def read_root():
    logger.info("Root endpoint was called")
    return {'message':'Welcome to Energy Efficiency API!'}

@app.post('/predict',response_model=PredictionResponse)
def predict(features:BuildingParameters):
    try:
        logger.info(f"Input: {features.model_dump()}")
        input_list = [
            features.relative_compactness,
            features.surface_area,
            features.wall_area,
            features.roof_area,
            features.overall_height.value,
            features.orientation.value,
            features.glazing_area.value,
            features.glazing_area_distribution.value
        ]
        scaled = scaler.transform([input_list])
        heating , cooling = float(y1_ridge.predict(scaled)) , float(y2_lasso.predict(scaled))
        if heating > 30 or cooling > 35:
            efficiency, advice = "Low", "Needs significant improvement"
        elif heating > 20 or cooling > 25:
            efficiency, advice = "Moderate", "Acceptable, but can be improved"
        else:
            efficiency, advice = "High", "Optimal performance achieved"
        result = {"heating_load": heating, "cooling_load": cooling,
                  "efficiency": efficiency, "recommendation": advice}
        logger.info(f"Output: {result}")
        return result
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")