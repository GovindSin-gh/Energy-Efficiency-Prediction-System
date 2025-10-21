import { useState } from 'react';

export default function PredictionForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        relative_compactness: 0.80,
        surface_area: 660,
        wall_area: 330,
        roof_area: 165,
        overall_height: 3.5,
        orientation: 2,
        glazing_area: 0.1,
        glazing_area_distribution: 0
    });

    const getCompactnessLevel = (value) => {
        if (value >= 0.62 && value <= 0.72) return 'Low';
        if (value >= 0.73 && value <= 0.85) return 'Medium';
        if (value >= 0.86 && value <= 0.98) return 'High';
        return '';
    };

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: parseFloat(value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <h2 className="text-2xl font-bold text-white">Building Parameters</h2>
                <p className="text-blue-100 mt-1">Enter your building details for energy prediction</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-800">
                            How compact is your building's shape?
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="0.62"
                                max="0.98"
                                step="0.01"
                                value={formData.relative_compactness}
                                onChange={(e) => handleChange('relative_compactness', e.target.value)}
                                className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="w-32 text-right">
                                <span className="text-lg font-bold text-gray-800">{formData.relative_compactness}</span>
                                <span className={`block text-sm font-medium ${
                                    getCompactnessLevel(formData.relative_compactness) === 'Low' ? 'text-green-600' :
                                    getCompactnessLevel(formData.relative_compactness) === 'Medium' ? 'text-yellow-600' :
                                    'text-red-600'
                                }`}>
                                    {getCompactnessLevel(formData.relative_compactness)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-800">
                            What is the total surface area of your building? (m²)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="513"
                                max="808.5"
                                step="0.5"
                                value={formData.surface_area}
                                onChange={(e) => handleChange('surface_area', e.target.value)}
                                className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <span className="text-lg font-bold text-gray-800 w-20 text-right">
                                {formData.surface_area} m²
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-800">
                            What is the total wall area of your building? (m²)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="245"
                                max="416.5"
                                step="0.5"
                                value={formData.wall_area}
                                onChange={(e) => handleChange('wall_area', e.target.value)}
                                className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <span className="text-lg font-bold text-gray-800 w-20 text-right">
                                {formData.wall_area} m²
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-base font-semibold text-gray-800">
                            What is the roof area of your building? (m²)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="110.25"
                                max="220.25"
                                step="0.25"
                                value={formData.roof_area}
                                onChange={(e) => handleChange('roof_area', e.target.value)}
                                className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <span className="text-lg font-bold text-gray-800 w-30 text-right">
                                {formData.roof_area} m²
                            </span>
                        </div>
                    </div>
                </div>

          {/* Right column */}

               <div className="space-y-6">
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      Is your building single-storey or double-storey?
    </label>
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => handleChange('overall_height', 3.5)}
        className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${
          formData.overall_height === 3.5
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Single-Storey
      </button>
      <button
        type="button"
        onClick={() => handleChange('overall_height', 7)}
        className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${
          formData.overall_height === 7
            ? 'bg-blue-600 text-white shadow-lg scale-105'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Double-Storey
      </button>
    </div>
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      Which direction does your building face?
    </label>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {[
        { label: 'North', value: 2 },
        { label: 'East', value: 3 },
        { label: 'South', value: 4 },
        { label: 'West', value: 5 },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange('orientation', option.value)}
          className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
            formData.orientation === option.value
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      What percentage of your building surface is glass?
    </label>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {[
        { label: 'No Glass', value: 0 },
        { label: 'Small (10%)', value: 0.1 },
        { label: 'Medium (25%)', value: 0.25 },
        { label: 'Large (40%)', value: 0.4 },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange('glazing_area', option.value)}
          className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
            formData.glazing_area === option.value
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>

  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-800 mb-2">
      How is the glass distributed on your building?
    </label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {[
        { label: 'None', value: 0 },
        { label: 'North Only', value: 1 },
        { label: 'East Only', value: 2 },
        { label: 'South Only', value: 3 },
        { label: 'West Only', value: 4 },
        { label: 'Uniform', value: 5 },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => handleChange('glazing_area_distribution', option.value)}
          className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
            formData.glazing_area_distribution === option.value
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl text-sm hover:from-blue-700 hover:to-blue-800 transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
  >
    {loading ? (
      <div className="flex items-center justify-center">
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
        Processing...
      </div>
    ) : (
      'Predict Energy Efficiency'
    )}
  </button>
</div>

            </form>
        </div>
    );
}