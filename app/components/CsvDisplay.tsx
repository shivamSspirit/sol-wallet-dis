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
            <div className="flex justify-center items-center h-64" data-oid="m1b0d7z">
                <div className="text-lg" data-oid="f79hfdo">
                    Loading CSV data...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6" data-oid="6:brpq3">
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                    data-oid="htykta9"
                >
                    <strong data-oid="i8grft7">Error:</strong> {error}
                </div>
                <button
                    onClick={refreshData}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    data-oid="tgv988e"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6" data-oid="35xnqhl">
            <div className="flex justify-between items-center mb-6" data-oid="h1tgfoy">
                <h1 className="text-3xl font-bold" data-oid="f6awjf6">
                    CSV Data Display
                </h1>
                <button
                    onClick={refreshData}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    data-oid="xrch503"
                >
                    Refresh Data
                </button>
            </div>

            {/* JSON Display */}
            <div className="mb-8" data-oid="hjraraq">
                <h2 className="text-xl font-semibold mb-4" data-oid="31x50iv">
                    JSON Format
                </h2>
                <div
                    className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96"
                    data-oid="ph19eng"
                >
                    <pre className="text-sm" data-oid="ww9j9:l">
                        {JSON.stringify(jsonData, null, 2)}
                    </pre>
                </div>
            </div>

            {/* Table Display */}
            {jsonData.length > 0 && (
                <div className="mb-8" data-oid="k73gvwg">
                    <h2 className="text-xl font-semibold mb-4" data-oid="2gazfmj">
                        Table View
                    </h2>
                    <div className="overflow-x-auto" data-oid="8e1-u4k">
                        <table
                            className="min-w-full border-collapse border border-gray-300"
                            data-oid="0x:n5we"
                        >
                            <thead data-oid="y9ivbe0">
                                <tr className="bg-gray-100" data-oid="_-skkee">
                                    {Object.keys(jsonData[0]).map((key) => (
                                        <th
                                            key={key}
                                            className="border border-gray-300 px-4 py-2 text-left font-semibold"
                                            data-oid="al9.a85"
                                        >
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody data-oid="fkqnh6n">
                                {jsonData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50" data-oid="7e83n69">
                                        {Object.values(row).map((value, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className="border border-gray-300 px-4 py-2"
                                                data-oid="0dm1gh8"
                                            >
                                                {`${value}` || '-'}
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
                <div className="bg-blue-50 p-4 rounded-lg" data-oid="rrfw62l">
                    <h3 className="font-semibold mb-2" data-oid="y_1wfi7">
                        Data Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-oid="ljj0ppn">
                        <div data-oid="fii-.ry">
                            <div className="text-2xl font-bold text-blue-600" data-oid="0.zyct-">
                                {jsonData.length}
                            </div>
                            <div className="text-sm text-gray-600" data-oid="5wm7i7v">
                                Total Records
                            </div>
                        </div>
                        <div data-oid="041z6ww">
                            <div className="text-2xl font-bold text-green-600" data-oid="dj:u2tw">
                                {Object.keys(jsonData[0]).length}
                            </div>
                            <div className="text-sm text-gray-600" data-oid="d9mzqpz">
                                Columns
                            </div>
                        </div>
                        <div className="col-span-2" data-oid="_oojeyj">
                            <div className="text-sm text-gray-600" data-oid="so0ua8t">
                                Columns:
                            </div>
                            <div className="text-sm font-medium" data-oid="kdiqwld">
                                {Object.keys(jsonData[0]).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
