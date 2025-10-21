import { useState } from 'react';
import axios from 'axios';
import Navbar from './Components/Navbar';
import PredictionForm from './Components/PredictionForm';
import ResultCard from './Components/ResultCard';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePrediction = async (data) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('https://energy-efficiency-prediction-system.onrender.com/predict', data);
      setResult(response.data);
    } catch (err) {
      setError('Backend unreachable. Please ensure FastAPI server is running ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PredictionForm onSubmit={handlePrediction} loading={loading} />
        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
}