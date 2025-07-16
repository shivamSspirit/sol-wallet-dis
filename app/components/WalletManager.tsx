/// app/components/WalletManager.js
'use client';

import { useState, useEffect } from 'react';

export default function WalletManager() {
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        walletAddress: '',
        ownerName: '',
        balance: '',
        currency: 'ETH',
        network: 'Ethereum',
        status: 'Active',
    });

    useEffect(() => {
        fetchWallets();
    }, []);

    const fetchWallets = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/csv-data');
            const result = await response.json();

            if (response.ok) {
                setWallets(result.data || []);
                setError('');
            } else {
                setError(result.error || 'Failed to load wallet data');
            }
        } catch (err) {
            setError('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/csv-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Reset form
                setFormData({
                    walletAddress: '',
                    ownerName: '',
                    balance: '',
                    currency: 'ETH',
                    network: 'Ethereum',
                    status: 'Active',
                });
                setShowForm(false);
                // Refresh data
                fetchWallets();
                alert('Wallet added successfully!');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err) {
            alert('Network error: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (walletAddress) => {
        if (!confirm('Are you sure you want to delete this wallet?')) return;

        try {
            const response = await fetch('/api/csv-data', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ walletAddress }),
            });

            const result = await response.json();

            if (response.ok) {
                fetchWallets();
                alert('Wallet deleted successfully!');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err) {
            alert('Network error: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64" data-oid="c1d:0ps">
                <div className="text-lg" data-oid="4:3nld6">
                    Loading wallet data...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6" data-oid="-1.5_h1">
            <div className="flex justify-between items-center mb-6" data-oid="4mgtkm.">
                <h1 className="text-3xl font-bold" data-oid="h7yl317">
                    Wallet Manager
                </h1>
                <div className="space-x-2" data-oid=".kdyf83">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        data-oid="wa_6c24"
                    >
                        {showForm ? 'Cancel' : 'Add New Wallet'}
                    </button>
                    <button
                        onClick={fetchWallets}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        data-oid="1v-0o4c"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div
                    className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                    data-oid="-gljh09"
                >
                    <strong data-oid="dudbyek">Error:</strong> {error}
                </div>
            )}

            {/* Add Wallet Form */}
            {showForm && (
                <div className="mb-8 bg-gray-50 p-6 rounded-lg" data-oid="x0cjq:0">
                    <h2 className="text-xl font-semibold mb-4" data-oid="3y-qbi6">
                        Add New Wallet
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4" data-oid="5kqeiq5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="hwgqp7g">
                            <div data-oid="o42awk-">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="qkv-z7k"
                                >
                                    Wallet Address *
                                </label>
                                <input
                                    type="text"
                                    name="walletAddress"
                                    value={formData.walletAddress}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0x..."
                                    data-oid="fun388h"
                                />
                            </div>
                            <div data-oid="::ybda:">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="tag-yf0"
                                >
                                    Owner Name *
                                </label>
                                <input
                                    type="text"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                    data-oid="cf79loc"
                                />
                            </div>
                            <div data-oid="kc7._tp">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="1tn.82i"
                                >
                                    Balance
                                </label>
                                <input
                                    type="number"
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleInputChange}
                                    step="0.000001"
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0.0"
                                    data-oid="7--v4ly"
                                />
                            </div>
                            <div data-oid="9-lk7v:">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="1.22hcg"
                                >
                                    Currency
                                </label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="ihf_3oi"
                                >
                                    <option value="ETH" data-oid="ynj0q3t">
                                        ETH
                                    </option>
                                    <option value="BTC" data-oid="xir.4jw">
                                        BTC
                                    </option>
                                    <option value="USDT" data-oid="fgvzhai">
                                        USDT
                                    </option>
                                    <option value="USDC" data-oid="j0pnnrz">
                                        USDC
                                    </option>
                                </select>
                            </div>
                            <div data-oid="imi4:ry">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="z3l-uqo"
                                >
                                    Network
                                </label>
                                <select
                                    name="network"
                                    value={formData.network}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="xsdc3kc"
                                >
                                    <option value="Ethereum" data-oid="yzsekp.">
                                        Ethereum
                                    </option>
                                    <option value="Bitcoin" data-oid="aqr-0-f">
                                        Bitcoin
                                    </option>
                                    <option value="Polygon" data-oid="znusfbd">
                                        Polygon
                                    </option>
                                    <option value="BSC" data-oid="p2ohpux">
                                        BSC
                                    </option>
                                </select>
                            </div>
                            <div data-oid="l.k13ms">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="n_.o2vu"
                                >
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="zjt6cos"
                                >
                                    <option value="Active" data-oid="gzlrgnb">
                                        Active
                                    </option>
                                    <option value="Inactive" data-oid="oja2e4y">
                                        Inactive
                                    </option>
                                    <option value="Frozen" data-oid=":9f40pn">
                                        Frozen
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-2" data-oid="p53-8-s">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                data-oid="c:::z01"
                            >
                                {submitting ? 'Adding...' : 'Add Wallet'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                data-oid=".4yw2gp"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Wallets Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden" data-oid="li_xxnj">
                <div className="px-6 py-4 bg-gray-50" data-oid="k80d8--">
                    <h2 className="text-xl font-semibold" data-oid="jg-2ukt">
                        Wallet Data ({wallets.length} wallets)
                    </h2>
                </div>

                {wallets.length === 0 ? (
                    <div className="p-6 text-center text-gray-500" data-oid="sanoi5c">
                        No wallets found. Add your first wallet above.
                    </div>
                ) : (
                    <div className="overflow-x-auto" data-oid="6ool0gz">
                        <table className="min-w-full divide-y divide-gray-200" data-oid="nayferx">
                            <thead className="bg-gray-50" data-oid="o-:n9nu">
                                <tr data-oid=":pdr7dc">
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="t4ezwxv"
                                    >
                                        ID
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="4v_lpqa"
                                    >
                                        Wallet Address
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="nf8m0p:"
                                    >
                                        Owner
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="cb9z5fk"
                                    >
                                        Balance
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="hk3ow22"
                                    >
                                        Network
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="fb5u.74"
                                    >
                                        Status
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="8nsloy2"
                                    >
                                        Created
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="c9wj71i"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200" data-oid="pona0bm">
                                {wallets.map((wallet, index) => (
                                    <tr
                                        key={wallet.id || index}
                                        className="hover:bg-gray-50"
                                        data-oid="nsj7cr6"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="3lhfhau"
                                        >
                                            {wallet.id}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900"
                                            data-oid="as-570u"
                                        >
                                            {wallet.walletAddress?.slice(0, 10)}...
                                            {wallet.walletAddress?.slice(-8)}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="68pncag"
                                        >
                                            {wallet.ownerName}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="6o43gyq"
                                        >
                                            {wallet.balance} {wallet.currency}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="1vp48e3"
                                        >
                                            {wallet.network}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap"
                                            data-oid="7v5.6dq"
                                        >
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    wallet.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : wallet.status === 'Inactive'
                                                          ? 'bg-gray-100 text-gray-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                                data-oid="j2rs4hu"
                                            >
                                                {wallet.status}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="bitmmk0"
                                        >
                                            {wallet.createdAt}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="e-awq39"
                                        >
                                            <button
                                                onClick={() => handleDelete(wallet.walletAddress)}
                                                className="text-red-600 hover:text-red-900"
                                                data-oid="enmxshl"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* JSON Preview (Optional) */}
            <div className="mt-8" data-oid="prrzcw7">
                <details className="bg-gray-50 p-4 rounded-lg" data-oid="gzcq-t1">
                    <summary className="cursor-pointer font-semibold mb-2" data-oid="p8dm_84">
                        View JSON Data
                    </summary>
                    <pre
                        className="text-sm bg-white p-4 rounded border overflow-auto max-h-64"
                        data-oid="gtvxnr2"
                    >
                        {JSON.stringify(wallets, null, 2)}
                    </pre>
                </details>
            </div>
        </div>
    );
}
