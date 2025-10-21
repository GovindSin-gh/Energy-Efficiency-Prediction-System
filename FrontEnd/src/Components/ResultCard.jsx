export default function ResultCard({ result, refresh }) {
    console.log(result);
    const getEfficiencyColor = (efficiency) => {
        if (efficiency === 'Low') return 'bg-green-100 text-green-800';
        if (efficiency === 'Moderate') return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };


    const getEfficiencyEmoji = (efficiency) => {
        if (efficiency === 'Low') return '🟢';
        if (efficiency === 'Moderate') return '🟡';
        return '🔴';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Prediction Results</h2>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium text-gray-700">Heating Load:</span>
                    <span className="text-lg font-semibold text-gray-900">{result.heating_load} kWh/m²</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium text-gray-700">Cooling Load:</span>
                    <span className="text-lg font-semibold text-gray-900">{result.cooling_load} kWh/m²</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-medium text-gray-700">Efficiency:</span>
                    <span className={`px-3 py-1 rounded-full font-medium ${getEfficiencyColor(result.efficiency)}`}>
                        {getEfficiencyEmoji(result.efficiency)} {result.efficiency}
                    </span>
                </div>
                <div className="p-4 bg-blue-50 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-gray-700 mb-1">Recommendation:</p>
                    <p className="text-gray-900">{result.recommendation}</p>
                </div>
            </div>
            <button
                onClick={refresh}
                className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
                Refresh
            </button>

        </div>
    );
}