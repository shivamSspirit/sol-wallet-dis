'use client';

import { useState, useEffect } from 'react';
import CSVDisplay from './components/CsvDisplay';
import WalletManager from './components/WalletManager';

export default function Page() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const wallets = [
        {
            name: 'Phantom',
            category: 'browser',
            platforms: ['Browser', 'Mobile', 'Desktop'],
            features: ['NFT Support', 'Staking', 'DeFi', 'Hardware Wallet', 'Multi-chain'],
            security: 'High',
            popularity: 95,
            logo: '👻',
            description: 'Most popular Solana wallet with comprehensive features',
        },
        {
            name: 'Solflare',
            category: 'browser',
            platforms: ['Browser', 'Mobile', 'Desktop'],
            features: ['NFT Support', 'Staking', 'DeFi', 'Hardware Wallet', 'Ledger Support'],
            security: 'High',
            popularity: 88,
            logo: '🔥',
            description: 'Feature-rich wallet with excellent hardware support',
        },
        {
            name: 'Backpack',
            category: 'browser',
            platforms: ['Browser', 'Mobile'],
            features: ['xNFT Support', 'Social Features', 'DeFi', 'Multi-chain'],
            security: 'High',
            popularity: 75,
            logo: '🎒',
            description: 'Next-gen wallet with xNFT ecosystem integration',
        },
        {
            name: 'Glow',
            category: 'browser',
            platforms: ['Browser'],
            features: ['Staking', 'DeFi', 'Simple UI', 'Fast Transactions'],
            security: 'Medium',
            popularity: 65,
            logo: '✨',
            description: 'Clean and simple wallet focused on ease of use',
        },
        {
            name: 'Slope',
            category: 'mobile',
            platforms: ['Mobile'],
            features: ['NFT Support', 'DeFi', 'Mobile-First', 'Social Trading'],
            security: 'Medium',
            popularity: 60,
            logo: '📱',
            description: 'Mobile-first wallet with social features',
        },
        {
            name: 'Coin98',
            category: 'browser',
            platforms: ['Browser', 'Mobile', 'Desktop'],
            features: ['Multi-chain', 'DeFi', 'NFT Support', 'Cross-chain Bridge'],
            security: 'High',
            popularity: 70,
            logo: '🌐',
            description: 'Multi-chain wallet with extensive DeFi integration',
        },
        {
            name: 'Trust Wallet',
            category: 'mobile',
            platforms: ['Mobile'],
            features: ['Multi-chain', 'NFT Support', 'DeFi', 'Staking', 'Built-in Browser'],
            security: 'High',
            popularity: 85,
            logo: '🛡️',
            description: 'Popular multi-chain mobile wallet',
        },
        {
            name: 'Exodus',
            category: 'desktop',
            platforms: ['Desktop', 'Mobile'],
            features: [
                'Multi-chain',
                'Built-in Exchange',
                'Portfolio Tracking',
                'Hardware Support',
            ],

            security: 'High',
            popularity: 80,
            logo: '🚀',
            description: 'Desktop-focused wallet with built-in exchange',
        },
    ];

    const categories = [
        { id: 'all', name: 'All Wallets', icon: '🌟' },
        { id: 'browser', name: 'Browser Extension', icon: '🌐' },
        { id: 'mobile', name: 'Mobile App', icon: '📱' },
        { id: 'desktop', name: 'Desktop App', icon: '💻' },
    ];

    const filteredWallets = wallets.filter((wallet) => {
        const matchesCategory = selectedCategory === 'all' || wallet.category === selectedCategory;
        const matchesSearch =
            wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            wallet.features.some((feature) =>
                feature.toLowerCase().includes(searchTerm.toLowerCase()),
            );
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
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="nc:_9nd">
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
                                label: 'Desktop Apps',
                                value: wallets.filter((w) => w.category === 'desktop').length,
                                icon: '💻',
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

                                {/* Features */}
                                <div className="mb-4" data-oid="ng7fd_g">
                                    <div className="text-xs text-gray-400 mb-2" data-oid="2d8fx4d">
                                        KEY FEATURES
                                    </div>
                                    <div className="flex flex-wrap gap-1" data-oid="o5cmnp8">
                                        {wallet.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
                                                data-oid="r2emruk"
                                            >
                                                {feature}
                                            </span>
                                        ))}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-oid="8ngpoy:">
                            <div data-oid="oprgwqb">
                                <h4 className="text-white font-medium mb-2" data-oid="pau4_31">
                                    Security Levels
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="vq21_ys">
                                    <div className="flex items-center space-x-2" data-oid="e0zmw06">
                                        <div
                                            className="w-3 h-3 bg-green-400 rounded-full"
                                            data-oid="hw2g74p"
                                        ></div>
                                        <span className="text-gray-300" data-oid="kn67ye:">
                                            High - Hardware wallet support, audited code
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid=".uehsw4">
                                        <div
                                            className="w-3 h-3 bg-yellow-400 rounded-full"
                                            data-oid=".zt9mkc"
                                        ></div>
                                        <span className="text-gray-300" data-oid="p1nza3b">
                                            Medium - Standard security practices
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="pir_vjh">
                                        <div
                                            className="w-3 h-3 bg-red-400 rounded-full"
                                            data-oid="pvjkdkp"
                                        ></div>
                                        <span className="text-gray-300" data-oid="757g:k0">
                                            Low - Basic security implementation
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div data-oid="o_c_jky">
                                <h4 className="text-white font-medium mb-2" data-oid="u0arghx">
                                    Platform Types
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="zgqbe0e">
                                    <div className="flex items-center space-x-2" data-oid="m8obje0">
                                        <span data-oid="9fgalkt">🌐</span>
                                        <span className="text-gray-300" data-oid=".m6rqma">
                                            Browser Extension
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="vwr6a8p">
                                        <span data-oid="swriff7">📱</span>
                                        <span className="text-gray-300" data-oid="a6971h5">
                                            Mobile Application
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="s5-l-k.">
                                        <span data-oid="h657wkl">💻</span>
                                        <span className="text-gray-300" data-oid="40p11k7">
                                            Desktop Application
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div data-oid="_:v23e4">
                                <h4 className="text-white font-medium mb-2" data-oid="psjddy7">
                                    Integration
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="z5n5ke9">
                                    <div className="text-gray-300" data-oid="w_tj85r">
                                        • Embeddable widget available
                                    </div>
                                    <div className="text-gray-300" data-oid="bbt_63u">
                                        • REST API for developers
                                    </div>
                                    <div className="text-gray-300" data-oid="kyp88hq">
                                        • Real-time updates
                                    </div>
                                    <div className="text-gray-300" data-oid="7a89uwr">
                                        • Custom filtering options
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
