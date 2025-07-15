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
            <div className="flex justify-center items-center h-64" data-oid="a-up31_">
                <div className="text-lg" data-oid="q93quen">
                    Loading wallet data...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6" data-oid="kl7imgo">
            <div className="flex justify-between items-center mb-6" data-oid="8uhye0m">
                <h1 className="text-3xl font-bold" data-oid="p.l1y7.">
                    Wallet Manager
                </h1>
                <div className="space-x-2" data-oid="vscrjbh">
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        data-oid="eag1t1w"
                    >
                        {showForm ? 'Cancel' : 'Add New Wallet'}
                    </button>
                    <button
                        onClick={fetchWallets}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        data-oid=".acr_2y"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div
                    className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                    data-oid="qfm_rek"
                >
                    <strong data-oid="pyu-1.c">Error:</strong> {error}
                </div>
            )}

            {/* Add Wallet Form */}
            {showForm && (
                <div className="mb-8 bg-gray-50 p-6 rounded-lg" data-oid="dwzupkz">
                    <h2 className="text-xl font-semibold mb-4" data-oid="5j4c14h">
                        Add New Wallet
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4" data-oid="t6t-5ot">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-oid="r4ximx-">
                            <div data-oid="qd3qm5i">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="f2pzx50"
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
                                    data-oid="b7u:x.c"
                                />
                            </div>
                            <div data-oid="7vgxx74">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="r2dnnz1"
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
                                    data-oid="sw5a1ak"
                                />
                            </div>
                            <div data-oid="quv9_0q">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="qmb07jl"
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
                                    data-oid="-994omf"
                                />
                            </div>
                            <div data-oid="9tht5v3">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="kne10k-"
                                >
                                    Currency
                                </label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="8be9w5v"
                                >
                                    <option value="ETH" data-oid="tsl:46o">
                                        ETH
                                    </option>
                                    <option value="BTC" data-oid="kl03tff">
                                        BTC
                                    </option>
                                    <option value="USDT" data-oid="26:onc9">
                                        USDT
                                    </option>
                                    <option value="USDC" data-oid="d-1oq_e">
                                        USDC
                                    </option>
                                </select>
                            </div>
                            <div data-oid="us112px">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="d.az_-d"
                                >
                                    Network
                                </label>
                                <select
                                    name="network"
                                    value={formData.network}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="w10in_a"
                                >
                                    <option value="Ethereum" data-oid="of-tgay">
                                        Ethereum
                                    </option>
                                    <option value="Bitcoin" data-oid="onyl7lr">
                                        Bitcoin
                                    </option>
                                    <option value="Polygon" data-oid="rw88ko-">
                                        Polygon
                                    </option>
                                    <option value="BSC" data-oid="p1q-7_k">
                                        BSC
                                    </option>
                                </select>
                            </div>
                            <div data-oid="kkgjudh">
                                <label
                                    className="block text-sm font-medium mb-1"
                                    data-oid="bsap:yk"
                                >
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    data-oid="gsh84v3"
                                >
                                    <option value="Active" data-oid="duzzavh">
                                        Active
                                    </option>
                                    <option value="Inactive" data-oid="u_v8rt2">
                                        Inactive
                                    </option>
                                    <option value="Frozen" data-oid="zlz5271">
                                        Frozen
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-2" data-oid="yu.uv85">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                                data-oid="lp9i_vx"
                            >
                                {submitting ? 'Adding...' : 'Add Wallet'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                data-oid="6ci0_rs"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Wallets Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden" data-oid="ilemu4:">
                <div className="px-6 py-4 bg-gray-50" data-oid="wgguuoe">
                    <h2 className="text-xl font-semibold" data-oid="mstcwlr">
                        Wallet Data ({wallets.length} wallets)
                    </h2>
                </div>

                {wallets.length === 0 ? (
                    <div className="p-6 text-center text-gray-500" data-oid="e5_a4ck">
                        No wallets found. Add your first wallet above.
                    </div>
                ) : (
                    <div className="overflow-x-auto" data-oid="841m8e1">
                        <table className="min-w-full divide-y divide-gray-200" data-oid="j0x.a2k">
                            <thead className="bg-gray-50" data-oid="gwjn7wn">
                                <tr data-oid=".fisww_">
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="vdjolmp"
                                    >
                                        ID
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="xnjherz"
                                    >
                                        Wallet Address
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="6b62j5f"
                                    >
                                        Owner
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="2gu2.j2"
                                    >
                                        Balance
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="9:b57i7"
                                    >
                                        Network
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="7a2gnvw"
                                    >
                                        Status
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="dx6gk4:"
                                    >
                                        Created
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        data-oid="143k-ss"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200" data-oid="73rkvsb">
                                {wallets.map((wallet, index) => (
                                    <tr
                                        key={wallet.id || index}
                                        className="hover:bg-gray-50"
                                        data-oid="9fytid6"
                                    >
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="s.zkxxx"
                                        >
                                            {wallet.id}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900"
                                            data-oid="iqdgoqd"
                                        >
                                            {wallet.walletAddress?.slice(0, 10)}...
                                            {wallet.walletAddress?.slice(-8)}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="txy9z0t"
                                        >
                                            {wallet.ownerName}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="r0a_ysj"
                                        >
                                            {wallet.balance} {wallet.currency}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid="mpv3en1"
                                        >
                                            {wallet.network}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap"
                                            data-oid="jjsi-bj"
                                        >
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${
                                                    wallet.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : wallet.status === 'Inactive'
                                                          ? 'bg-gray-100 text-gray-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                                data-oid="tr.re5m"
                                            >
                                                {wallet.status}
                                            </span>
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                            data-oid=".tdfk1f"
                                        >
                                            {wallet.createdAt}
                                        </td>
                                        <td
                                            className="px-6 py-4 whitespace-nowrap text-sm"
                                            data-oid="qf_3d9y"
                                        >
                                            <button
                                                onClick={() => handleDelete(wallet.walletAddress)}
                                                className="text-red-600 hover:text-red-900"
                                                data-oid="ce3-777"
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
            <div className="mt-8" data-oid="aqnvl:9">
                <details className="bg-gray-50 p-4 rounded-lg" data-oid="pjac9vk">
                    <summary className="cursor-pointer font-semibold mb-2" data-oid="rzqmtah">
                        View JSON Data
                    </summary>
                    <pre
                        className="text-sm bg-white p-4 rounded border overflow-auto max-h-64"
                        data-oid="i4ftfcq"
                    >
                        {JSON.stringify(wallets, null, 2)}
                    </pre>
                </details>
            </div>
        </div>
    );
}
