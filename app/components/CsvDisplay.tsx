'use client';

import { useState, useEffect } from 'react';

export default function CSVDisplay() {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCSVData();
  }, []);

  const fetchCSVData = async () => {
    try {
      setLoading(true);
      console.log('Fetching CSV data...');
      
      const response = await fetch('/api/csv-data');
      const result = await response.json();
      
      if (response.ok) {
        setJsonData(result.data);
        setError('');
        console.log('CSV data loaded successfully:', result.data);
      } else {
        setError(result.error || 'Failed to load CSV data');
        console.error('API Error:', result);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchCSVData();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading CSV data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
        <button
          onClick={refreshData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">CSV Data Display</h1>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Refresh Data
        </button>
      </div>

      {/* JSON Display */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">JSON Format</h2>
        <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
          <pre className="text-sm">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      </div>

      {/* Table Display */}
      {jsonData.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Table View</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  {Object.keys(jsonData[0]).map((key) => (
                    <th key={key} className="border border-gray-300 px-4 py-2 text-left font-semibold">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jsonData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">
                        {`${value}`|| '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistics */}
      {jsonData.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Data Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold text-blue-600">{jsonData.length}</div>
              <div className="text-sm text-gray-600">Total Records</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Object.keys(jsonData[0]).length}</div>
              <div className="text-sm text-gray-600">Columns</div>
            </div>
            <div className="col-span-2">
              <div className="text-sm text-gray-600">Columns:</div>
              <div className="text-sm font-medium">{Object.keys(jsonData[0]).join(', ')}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}