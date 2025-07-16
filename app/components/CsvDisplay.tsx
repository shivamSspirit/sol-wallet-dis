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
            <div className="flex justify-center items-center h-64" data-oid="031-hu.">
                <div className="text-lg" data-oid="v-tso8_">
                    Loading CSV data...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6" data-oid="spmpo8m">
                <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                    data-oid="wqny1vg"
                >
                    <strong data-oid="s6umn38">Error:</strong> {error}
                </div>
                <button
                    onClick={refreshData}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    data-oid="5ac-_2q"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6" data-oid="x6b262g">
            <div className="flex justify-between items-center mb-6" data-oid="zllyu.4">
                <h1 className="text-3xl font-bold" data-oid="41f29tk">
                    CSV Data Display
                </h1>
                <button
                    onClick={refreshData}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    data-oid="xxch67t"
                >
                    Refresh Data
                </button>
            </div>

            {/* JSON Display */}
            <div className="mb-8" data-oid="9udx5ym">
                <h2 className="text-xl font-semibold mb-4" data-oid="bwgd.8s">
                    JSON Format
                </h2>
                <div
                    className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96"
                    data-oid="ipl418f"
                >
                    <pre className="text-sm" data-oid="foh2ld:">
                        {JSON.stringify(jsonData, null, 2)}
                    </pre>
                </div>
            </div>

            {/* Table Display */}
            {jsonData.length > 0 && (
                <div className="mb-8" data-oid="8gb9z_q">
                    <h2 className="text-xl font-semibold mb-4" data-oid="lw_ah_-">
                        Table View
                    </h2>
                    <div className="overflow-x-auto" data-oid="h.et-xw">
                        <table
                            className="min-w-full border-collapse border border-gray-300"
                            data-oid="p9lg8z7"
                        >
                            <thead data-oid="_f3qvs3">
                                <tr className="bg-gray-100" data-oid="jj2tf9h">
                                    {Object.keys(jsonData[0]).map((key) => (
                                        <th
                                            key={key}
                                            className="border border-gray-300 px-4 py-2 text-left font-semibold"
                                            data-oid="y4hx1pk"
                                        >
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody data-oid="qrb_dgk">
                                {jsonData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50" data-oid="fhr7kjb">
                                        {Object.values(row).map((value, cellIndex) => (
                                            <td
                                                key={cellIndex}
                                                className="border border-gray-300 px-4 py-2"
                                                data-oid="5ez7b76"
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
                <div className="bg-blue-50 p-4 rounded-lg" data-oid="-j9jgz5">
                    <h3 className="font-semibold mb-2" data-oid="fb.z46l">
                        Data Statistics
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-oid="glm_lp8">
                        <div data-oid="ddjfa:g">
                            <div className="text-2xl font-bold text-blue-600" data-oid="ry1drsf">
                                {jsonData.length}
                            </div>
                            <div className="text-sm text-gray-600" data-oid="s1:hdgs">
                                Total Records
                            </div>
                        </div>
                        <div data-oid="xsyoip.">
                            <div className="text-2xl font-bold text-green-600" data-oid="akvs7wo">
                                {Object.keys(jsonData[0]).length}
                            </div>
                            <div className="text-sm text-gray-600" data-oid=".pny.1-">
                                Columns
                            </div>
                        </div>
                        <div className="col-span-2" data-oid="ztc0-9o">
                            <div className="text-sm text-gray-600" data-oid="89wquf5">
                                Columns:
                            </div>
                            <div className="text-sm font-medium" data-oid="qku1pbn">
                                {Object.keys(jsonData[0]).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
