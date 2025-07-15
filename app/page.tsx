'use client';

import { useState, useEffect } from 'react';
import CSVDisplay from './components/CsvDisplay';
import WalletManager from './components/WalletManager';

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsLoaded(true);
        fetchWalletData();
    }, []);

    const fetchWalletData = async () => {
        try {
            const response = await fetch('/api/csv-data');
            const result = await response.json();

            if (response.ok && result.data) {
                // Transform CSV data to match our component structure
                const transformedWallets = result.data
                    .filter((wallet) => wallet.Name && wallet.Name.trim() !== '') // Filter out empty rows
                    .map((wallet) => ({
                        name: wallet.Name,
                        category: getCategoryFromPlatforms(wallet.Platforms),
                        platforms: wallet.Platforms
                            ? wallet.Platforms.split(';').map((p) => p.trim())
                            : [],
                        custodyModel: wallet['Custody Model'] || 'Unknown',
                        inAppDexSwap: wallet['In-app DEX Swap'] === 'Yes',
                        nftGallery: wallet['NFT Gallery'] === 'Yes',
                        inAppStaking: wallet['In-app Staking'] === 'Yes',
                        fiatOnOffRamp:
                            wallet['Fiat On/Off Ramp'] === 'Yes' ||
                            wallet['Fiat On/Off Ramp'] === 'Partial',
                        pushNotifications: wallet['Push Notifications'] === 'Yes',
                        solanaPayQR: wallet['Solana Pay QR'] || 'No',
                        multiChain: wallet['Multi-Chain'] === 'Yes',
                        openSource: wallet['Open Source'] === 'Yes',
                        logo: getWalletLogo(wallet.Name),
                        description: wallet.Notes || `${wallet.Name} wallet`,
                        security: getSecurityLevel(wallet.Category),
                        popularity: getPopularityScore(wallet.Name),
                    }));

                setWallets(transformedWallets);
            }
        } catch (error) {
            console.error('Error fetching wallet data:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryFromPlatforms = (platforms) => {
        if (!platforms) return 'other';
        const platformStr = platforms.toLowerCase();
        if (
            platformStr.includes('chrome') ||
            platformStr.includes('firefox') ||
            platformStr.includes('edge')
        ) {
            return 'browser';
        }
        if (platformStr.includes('ios') || platformStr.includes('android')) {
            return 'mobile';
        }
        if (platformStr.includes('desktop')) {
            return 'desktop';
        }
        if (platformStr.includes('hardware')) {
            return 'hardware';
        }
        return 'other';
    };

    const getWalletLogo = (name) => {
        const logoMap = {
            Phantom: '👻',
            Solflare: '🔥',
            Backpack: '🎒',
            Glow: '✨',
            Exodus: '🚀',
            'Trust Wallet': '🛡️',
            'Coinbase Wallet': '🔵',
            'Atomic Wallet': '⚛️',
            'Brave Wallet': '🦁',
            Ledger: '🔐',
            Trezor: '🔒',
            SafePal: '🛡️',
            Keystone: '🗝️',
            Tangem: '💳',
            MetaMask: '🦊',
            Binance: '🟡',
            OKX: '⭕',
            Coin98: '🌐',
            'Math Wallet': '📊',
            Guarda: '🛡️',
            TokenPocket: '💰',
            Enkrypt: '🔐',
            Robinhood: '🏹',
            Torus: '🌀',
            Tiplink: '🔗',
            Fuse: '⚡',
            Helium: '📡',
            Bitget: '📈',
            Jupiter: '🪐',
        };

        for (const [key, emoji] of Object.entries(logoMap)) {
            if (name.toLowerCase().includes(key.toLowerCase())) {
                return emoji;
            }
        }
        return '💼'; // Default wallet icon
    };

    const getSecurityLevel = (category) => {
        if (category === 'Cold Wallet') return 'High';
        if (category === 'Hot Wallet') return 'Medium';
        return 'Medium';
    };

    const getPopularityScore = (name) => {
        const popularityMap = {
            Phantom: 95,
            Solflare: 88,
            'Trust Wallet': 85,
            Exodus: 80,
            Backpack: 75,
            Coin98: 70,
            Glow: 65,
            'Atomic Wallet': 75,
            'Coinbase Wallet': 80,
            Ledger: 90,
            Trezor: 85,
            MetaMask: 70,
        };

        for (const [key, score] of Object.entries(popularityMap)) {
            if (name.toLowerCase().includes(key.toLowerCase())) {
                return score;
            }
        }
        return Math.floor(Math.random() * 40) + 40; // Random score between 40-80 for unknown wallets
    };

    const categories = [
        { id: 'all', name: 'All Wallets', icon: '🌟' },
        { id: 'browser', name: 'Browser Extension', icon: '🌐' },
        { id: 'mobile', name: 'Mobile App', icon: '📱' },
        { id: 'desktop', name: 'Desktop App', icon: '💻' },
        { id: 'hardware', name: 'Hardware Wallet', icon: '🔐' },
        { id: 'other', name: 'Other', icon: '⚙️' },
    ];

    const filteredWallets = wallets.filter((wallet) => {
        const matchesCategory = selectedCategory === 'all' || wallet.category === selectedCategory;
        const matchesSearch =
            wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallet.platforms.some((platform) =>
                platform.toLowerCase().includes(searchTerm.toLowerCase()),
            ) ||
            wallet.custodyModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallet.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getSecurityColor = (security) => {
        switch (security) {
            case 'High':
                return 'text-green-400 bg-green-400/10';
            case 'Medium':
                return 'text-yellow-400 bg-yellow-400/10';
            case 'Low':
                return 'text-red-400 bg-red-400/10';
            default:
                return 'text-gray-400 bg-gray-400/10';
        }
    };

    if (loading) {
        return (
            <div
                className="min-h-screen bg-black text-white flex items-center justify-center"
                data-oid="loading-screen"
            >
                <div className="text-center" data-oid="loading-content">
                    <div
                        className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto mb-4"
                        data-oid="loading-spinner"
                    ></div>
                    <p className="text-green-400 text-lg" data-oid="loading-text">
                        Loading wallet data...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden" data-oid="ljm7-yz">
            {/* Animated background */}
            <div
                className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
                data-oid="yv7mw77"
            >
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"
                    data-oid="chbwtpw"
                ></div>
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
                    data-oid="0dbg2mt"
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"
                    data-oid="izqb2s."
                ></div>
            </div>

            <div className="relative z-10" data-oid="0k0lg8h">
                {/* Header */}
                <header
                    className={`backdrop-blur-xl bg-black/20 border-b border-green-500/20 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                    data-oid="_dte5p7"
                >
                    <div className="max-w-7xl mx-auto px-6 py-6" data-oid="mq:wv_o">
                        <div className="flex items-center justify-between" data-oid="y_3bft-">
                            <div className="flex items-center space-x-4" data-oid="3rbkga8">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center"
                                    data-oid="m1d.b7j"
                                >
                                    <span
                                        className="text-black font-bold text-xl"
                                        data-oid="t-e71:z"
                                    >
                                        W
                                    </span>
                                </div>
                                <div data-oid="3h.zki8">
                                    <h1
                                        className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                                        data-oid="g9.wl96"
                                    >
                                        Solana Wallet Inventory
                                    </h1>
                                    <p className="text-gray-400 text-sm" data-oid="ui.qto3">
                                        Comprehensive wallet ecosystem dashboard
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4" data-oid="jmgj-xv">
                                <button
                                    className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 transition-all duration-300"
                                    data-oid="fohx_vq"
                                >
                                    API Access
                                </button>
                                <button
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-black font-medium hover:from-green-400 hover:to-green-500 transition-all duration-300"
                                    data-oid="1jri8rv"
                                >
                                    Embed Widget
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Controls */}
                <div
                    className={`max-w-7xl mx-auto px-6 py-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    data-oid="-y281:k"
                >
                    <div
                        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-8"
                        data-oid="l0p-a:l"
                    >
                        <div className="flex flex-col lg:flex-row gap-6" data-oid="jesa-g6">
                            {/* Search */}
                            <div className="flex-1" data-oid="mhio0s3">
                                <div className="relative" data-oid="rxmukg8">
                                    <input
                                        type="text"
                                        placeholder="Search wallets or features..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-black/30 border border-green-500/30 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                                        data-oid="2olh4jr"
                                    />

                                    <div
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400"
                                        data-oid="i1fj799"
                                    >
                                        🔍
                                    </div>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2" data-oid="vcnnbk5">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 ${
                                            selectedCategory === category.id
                                                ? 'bg-green-500/20 border-green-400 text-green-400'
                                                : 'bg-black/20 border-white/10 text-gray-400 hover:border-green-500/50 hover:text-green-400'
                                        }`}
                                        data-oid="gei4dcu"
                                    >
                                        <span data-oid="6ffmqwn">{category.icon}</span>
                                        <span className="text-sm font-medium" data-oid="crt2t6o">
                                            {category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8" data-oid="nc:_9nd">
                        {[
                            { label: 'Total Wallets', value: wallets.length, icon: '💼' },
                            {
                                label: 'Browser Extensions',
                                value: wallets.filter((w) => w.category === 'browser').length,
                                icon: '🌐',
                            },
                            {
                                label: 'Mobile Apps',
                                value: wallets.filter((w) => w.category === 'mobile').length,
                                icon: '📱',
                            },
                            {
                                label: 'Hardware Wallets',
                                value: wallets.filter((w) => w.category === 'hardware').length,
                                icon: '🔐',
                            },
                            {
                                label: 'Solana Pay Support',
                                value: wallets.filter((w) => w.solanaPayQR === 'Yes').length,
                                icon: '💳',
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 p-6 transition-all duration-1000 delay-${(index + 1) * 100} ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                data-oid="vl4d6x9"
                            >
                                <div
                                    className="flex items-center justify-between"
                                    data-oid="2nytt1l"
                                >
                                    <div data-oid="9paiazm">
                                        <p className="text-gray-400 text-sm" data-oid="mi2dm7i">
                                            {stat.label}
                                        </p>
                                        <p
                                            className="text-2xl font-bold text-green-400"
                                            data-oid="pbo8__y"
                                        >
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className="text-2xl" data-oid="y226ana">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Wallet Grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="w_m7fw3"
                    >
                        {filteredWallets.map((wallet, index) => (
                            <div
                                key={wallet.name}
                                className={`backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-6 hover:border-green-500/50 hover:bg-white/10 transition-all duration-500 group cursor-pointer transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                data-oid="ugir3nw"
                            >
                                {/* Header */}
                                <div
                                    className="flex items-start justify-between mb-4"
                                    data-oid="ys0axhu"
                                >
                                    <div className="flex items-center space-x-3" data-oid="_5mtdzy">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl flex items-center justify-center text-2xl border border-green-500/30"
                                            data-oid=":hi469k"
                                        >
                                            {wallet.logo}
                                        </div>
                                        <div data-oid="q7ebr6y">
                                            <h3
                                                className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300"
                                                data-oid="a:91x-z"
                                            >
                                                {wallet.name}
                                            </h3>
                                            <div
                                                className="flex items-center space-x-2 mt-1"
                                                data-oid="dnruy:b"
                                            >
                                                <div
                                                    className="flex items-center space-x-1"
                                                    data-oid="w6w8kvf"
                                                >
                                                    <div
                                                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                                        data-oid="uyc78cq"
                                                    ></div>
                                                    <span
                                                        className="text-xs text-green-400"
                                                        data-oid="jz.slz6"
                                                    >
                                                        Active
                                                    </span>
                                                </div>
                                                <div
                                                    className={`px-2 py-1 rounded-full text-xs ${getSecurityColor(wallet.security)}`}
                                                    data-oid="28vd5-l"
                                                >
                                                    {wallet.security} Security
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right" data-oid="ex86sjk">
                                        <div className="text-sm text-gray-400" data-oid="9pyir.7">
                                            Popularity
                                        </div>
                                        <div
                                            className="text-lg font-bold text-green-400"
                                            data-oid="y1ncy70"
                                        >
                                            {wallet.popularity}%
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-gray-300 text-sm mb-4 leading-relaxed"
                                    data-oid="z5lk5:4"
                                >
                                    {wallet.description}
                                </p>

                                {/* Platforms */}
                                <div className="mb-4" data-oid="u:j8yd3">
                                    <div className="text-xs text-gray-400 mb-2" data-oid="t10yuv6">
                                        PLATFORMS
                                    </div>
                                    <div className="flex flex-wrap gap-2" data-oid="1naf6jm">
                                        {wallet.platforms.map((platform) => (
                                            <span
                                                key={platform}
                                                className="px-2 py-1 bg-black/30 border border-green-500/30 rounded-lg text-xs text-green-400"
                                                data-oid="e4me5ap"
                                            >
                                                {platform}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Custody Model */}
                                <div className="mb-4" data-oid="custody-model">
                                    <div
                                        className="text-xs text-gray-400 mb-2"
                                        data-oid="custody-label"
                                    >
                                        CUSTODY MODEL
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="custody-content"
                                    >
                                        <span
                                            className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                wallet.custodyModel === 'Self-custody'
                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                    : wallet.custodyModel === 'MPC'
                                                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                            }`}
                                            data-oid="custody-badge"
                                        >
                                            {wallet.custodyModel}
                                        </span>
                                    </div>
                                </div>

                                {/* Key Features Grid */}
                                <div className="mb-4" data-oid="features-grid">
                                    <div
                                        className="text-xs text-gray-400 mb-2"
                                        data-oid="features-label"
                                    >
                                        KEY FEATURES
                                    </div>
                                    <div
                                        className="grid grid-cols-2 gap-2 text-xs"
                                        data-oid="features-content"
                                    >
                                        <div
                                            className={`flex items-center space-x-1 ${wallet.inAppDexSwap ? 'text-green-400' : 'text-gray-500'}`}
                                            data-oid="dex-swap"
                                        >
                                            <span data-oid="dex-icon">
                                                {wallet.inAppDexSwap ? '✅' : '❌'}
                                            </span>
                                            <span data-oid="dex-text">DEX Swap</span>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-1 ${wallet.nftGallery ? 'text-green-400' : 'text-gray-500'}`}
                                            data-oid="nft-gallery"
                                        >
                                            <span data-oid="nft-icon">
                                                {wallet.nftGallery ? '✅' : '❌'}
                                            </span>
                                            <span data-oid="nft-text">NFT Gallery</span>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-1 ${wallet.inAppStaking ? 'text-green-400' : 'text-gray-500'}`}
                                            data-oid="staking"
                                        >
                                            <span data-oid="staking-icon">
                                                {wallet.inAppStaking ? '✅' : '❌'}
                                            </span>
                                            <span data-oid="staking-text">Staking</span>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-1 ${wallet.fiatOnOffRamp ? 'text-green-400' : 'text-gray-500'}`}
                                            data-oid="fiat-ramp"
                                        >
                                            <span data-oid="fiat-icon">
                                                {wallet.fiatOnOffRamp ? '✅' : '❌'}
                                            </span>
                                            <span data-oid="fiat-text">Fiat Ramp</span>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-1 ${wallet.pushNotifications ? 'text-green-400' : 'text-gray-500'}`}
                                            data-oid="notifications"
                                        >
                                            <span data-oid="notif-icon">
                                                {wallet.pushNotifications ? '✅' : '❌'}
                                            </span>
                                            <span data-oid="notif-text">Push Notifications</span>
                                        </div>
                                        <div
                                            className={`flex items-center space-x-1 ${wallet.multiChain ? 'text-green-400' : 'text-gray-500'}`}
                                            data-oid="multi-chain"
                                        >
                                            <span data-oid="chain-icon">
                                                {wallet.multiChain ? '✅' : '❌'}
                                            </span>
                                            <span data-oid="chain-text">Multi-Chain</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Solana Pay QR - Critical Feature */}
                                <div className="mb-4" data-oid="solana-pay">
                                    <div
                                        className="text-xs text-gray-400 mb-2"
                                        data-oid="solana-pay-label"
                                    >
                                        SOLANA PAY QR (CRITICAL)
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="solana-pay-content"
                                    >
                                        <span
                                            className={`px-3 py-1 rounded-lg text-xs font-bold border-2 ${
                                                wallet.solanaPayQR === 'Yes'
                                                    ? 'bg-green-500/20 text-green-300 border-green-400'
                                                    : wallet.solanaPayQR === 'Partial'
                                                      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400'
                                                      : 'bg-red-500/20 text-red-300 border-red-400'
                                            }`}
                                            data-oid="solana-pay-badge"
                                        >
                                            {wallet.solanaPayQR}
                                        </span>
                                        {wallet.solanaPayQR === 'Yes' && (
                                            <span
                                                className="text-xs text-green-400 animate-pulse"
                                                data-oid="solana-pay-star"
                                            >
                                                ⭐ Critical Feature
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Popularity Bar */}
                                <div className="mb-4" data-oid="jyf3yzz">
                                    <div
                                        className="flex justify-between text-xs text-gray-400 mb-1"
                                        data-oid="q5xu6z7"
                                    >
                                        <span data-oid="7yxryvl">Market Adoption</span>
                                        <span data-oid="iw.jain">{wallet.popularity}%</span>
                                    </div>
                                    <div
                                        className="w-full bg-black/30 rounded-full h-2"
                                        data-oid="b2:pzg4"
                                    >
                                        <div
                                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${wallet.popularity}%` }}
                                            data-oid="i8k2r2m"
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    className="w-full py-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl text-green-400 hover:from-green-500/20 hover:to-green-600/20 hover:border-green-400 transition-all duration-300 text-sm font-medium"
                                    data-oid="-8bmbx8"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div
                        className="mt-12 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6"
                        data-oid=":ixyfht"
                    >
                        <h3 className="text-lg font-bold text-green-400 mb-4" data-oid="mklyoyf">
                            Legend & Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-oid="8ngpoy:">
                            <div data-oid="custody-legend">
                                <h4
                                    className="text-white font-medium mb-2"
                                    data-oid="custody-title"
                                >
                                    Custody Models
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="custody-items">
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="self-custody"
                                    >
                                        <div
                                            className="w-3 h-3 bg-green-400 rounded-full"
                                            data-oid="self-custody-dot"
                                        ></div>
                                        <span
                                            className="text-gray-300"
                                            data-oid="self-custody-text"
                                        >
                                            Self-custody - You control your keys
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="mpc-custody"
                                    >
                                        <div
                                            className="w-3 h-3 bg-yellow-400 rounded-full"
                                            data-oid="mpc-custody-dot"
                                        ></div>
                                        <span className="text-gray-300" data-oid="mpc-custody-text">
                                            MPC - Multi-party computation
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="custodial"
                                    >
                                        <div
                                            className="w-3 h-3 bg-red-400 rounded-full"
                                            data-oid="custodial-dot"
                                        ></div>
                                        <span className="text-gray-300" data-oid="custodial-text">
                                            Custodial - Third-party holds keys
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div data-oid="solana-pay-legend">
                                <h4
                                    className="text-white font-medium mb-2"
                                    data-oid="solana-pay-title"
                                >
                                    Solana Pay QR Support
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="solana-pay-items">
                                    <div className="flex items-center space-x-2" data-oid="pay-yes">
                                        <span data-oid="pay-yes-icon">✅</span>
                                        <span className="text-green-300" data-oid="pay-yes-text">
                                            Yes - Full support
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="pay-partial"
                                    >
                                        <span data-oid="pay-partial-icon">⚠️</span>
                                        <span
                                            className="text-yellow-300"
                                            data-oid="pay-partial-text"
                                        >
                                            Partial - Limited support
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="pay-no">
                                        <span data-oid="pay-no-icon">❌</span>
                                        <span className="text-red-300" data-oid="pay-no-text">
                                            No - Not supported
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div data-oid="features-legend">
                                <h4
                                    className="text-white font-medium mb-2"
                                    data-oid="features-title"
                                >
                                    Key Features
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="features-items">
                                    <div className="text-gray-300" data-oid="feature-dex">
                                        • In-app DEX swap
                                    </div>
                                    <div className="text-gray-300" data-oid="feature-nft">
                                        • NFT gallery support
                                    </div>
                                    <div className="text-gray-300" data-oid="feature-staking">
                                        • In-app staking
                                    </div>
                                    <div className="text-gray-300" data-oid="feature-fiat">
                                        • Fiat on/off ramps
                                    </div>
                                    <div className="text-gray-300" data-oid="feature-notifications">
                                        • Push notifications
                                    </div>
                                </div>
                            </div>
                            <div data-oid="platform-legend">
                                <h4
                                    className="text-white font-medium mb-2"
                                    data-oid="platform-title"
                                >
                                    Platform Types
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="platform-items">
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="platform-browser"
                                    >
                                        <span data-oid="browser-icon">🌐</span>
                                        <span className="text-gray-300" data-oid="browser-text">
                                            Browser Extension
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="platform-mobile"
                                    >
                                        <span data-oid="mobile-icon">📱</span>
                                        <span className="text-gray-300" data-oid="mobile-text">
                                            Mobile Application
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center space-x-2"
                                        data-oid="platform-hardware"
                                    >
                                        <span data-oid="hardware-icon">🔐</span>
                                        <span className="text-gray-300" data-oid="hardware-text">
                                            Hardware Wallet
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer
                    className="backdrop-blur-xl bg-black/20 border-t border-green-500/20 mt-16"
                    data-oid="pfihukh"
                >
                    <div className="max-w-7xl mx-auto px-6 py-8" data-oid="y:dvmkp">
                        <div
                            className="flex flex-col md:flex-row justify-between items-center"
                            data-oid="j-tcz5j"
                        >
                            <div className="text-gray-400 text-sm" data-oid="0a7o5e-">
                                © 2024 Solana Wallet Inventory. Built for builders, merchants, and
                                users.
                            </div>
                            <div
                                className="flex items-center space-x-6 mt-4 md:mt-0"
                                data-oid="0d1fhg5"
                            >
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    data-oid="vhn2gmt"
                                >
                                    API Docs
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    data-oid="c6zpxiq"
                                >
                                    Submit Wallet
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    data-oid="mo0xnmr"
                                >
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
