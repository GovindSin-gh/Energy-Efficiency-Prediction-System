import { useState } from 'react';

export default function PredictionForm({ onSubmit, loading }) {
    const [formData, setFormData] = useState({
        Relative_Compactness: '',
        Surface_Area: '',
        Wall_Area: '',
        Roof_Area: '',
        Overall_Height: '',
        Orientation: '',
        Glazing_Area: '',
        Glazing_Area_Distribution: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const validate = () => {
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = 'Required';
            } else if (isNaN(formData[key])) {
                newErrors[key] = 'Must be numeric';
            }
        });
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {};

        Object.keys(formData).forEach(key => {
            if (key === 'Orientation' || key === 'Glazing_Area_Distribution') {
                payload[key.toLowerCase()] = parseInt(formData[key]);
            } else {
                payload[key.toLowerCase()] = parseFloat(formData[key]);
            }
        });
        console.log(payload);
        onSubmit(payload);
    };

    const inputFields = [
        { name: 'Relative_Compactness', label: 'Relative Compactness', min: 0.5, max: 1.0, step: 'any' }, // float
        { name: 'Surface_Area', label: 'Surface Area', min: 400, max: 900, step: 'any' }, // float
        { name: 'Wall_Area', label: 'Wall Area', min: 200, max: 500, step: 'any' }, // float
        { name: 'Roof_Area', label: 'Roof Area', min: 100, max: 300, step: 'any' }, // float
        { name: 'Overall_Height', label: 'Overall Height', min: 3, max: 10, step: 'any' },
        { name: 'Orientation', label: 'Orientation', min: 1, max: 4, step: 'any' }, // int
        { name: 'Glazing_Area', label: 'Glazing Area', min: 0, max: 0.4, step: 'any' }, // float
        { name: 'Glazing_Area_Distribution', label: 'Glazing Area Distribution', min: 0, max: 5, step: 'any' } // int
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Building Parameters</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inputFields.map(field => (
                        <div key={field.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                value={formData[field.name]}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border ${errors[field.name] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                            {errors[field.name] && (
                                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Processing...
                        </div>
                    ) : (
                        'Predict'
                    )}
                </button>
            </form>
        </div>
    );
}