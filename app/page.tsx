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
        <div className="min-h-screen bg-black text-white overflow-hidden" data-oid="6_hqpu9">
            {/* Animated background */}
            <div
                className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
                data-oid="565vvq0"
            >
                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"
                    data-oid="w4dkiqa"
                ></div>
                <div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"
                    data-oid="bvx_3no"
                ></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"
                    data-oid="012ie95"
                ></div>
            </div>

            <div className="relative z-10" data-oid="w_jr07n">
                {/* Header */}
                <header
                    className={`backdrop-blur-xl bg-black/20 border-b border-green-500/20 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                    data-oid="vgvxmak"
                >
                    <div className="max-w-7xl mx-auto px-6 py-6" data-oid="-1htjeh">
                        <div className="flex items-center justify-between" data-oid="pfa:kt9">
                            <div className="flex items-center space-x-4" data-oid=".e0hxms">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center"
                                    data-oid=":cqk-td"
                                >
                                    <span
                                        className="text-black font-bold text-xl"
                                        data-oid="plew0if"
                                    >
                                        W
                                    </span>
                                </div>
                                <div data-oid="j1r1-i1">
                                    <h1
                                        className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"
                                        data-oid="ibwxfr9"
                                    >
                                        Solana Wallet Inventory
                                    </h1>
                                    <p className="text-gray-400 text-sm" data-oid="wgp498i">
                                        Comprehensive wallet ecosystem dashboard
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4" data-oid="uctrn9z">
                                <button
                                    className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 hover:bg-green-500/20 transition-all duration-300"
                                    data-oid="lfp-6vj"
                                >
                                    API Access
                                </button>
                                <button
                                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-black font-medium hover:from-green-400 hover:to-green-500 transition-all duration-300"
                                    data-oid="y:2at4c"
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
                    data-oid="sa-s464"
                >
                    <div
                        className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 mb-8"
                        data-oid="38klh5k"
                    >
                        <div className="flex flex-col lg:flex-row gap-6" data-oid="r6h838g">
                            {/* Search */}
                            <div className="flex-1" data-oid="-qb7h6q">
                                <div className="relative" data-oid="29l20mk">
                                    <input
                                        type="text"
                                        placeholder="Search wallets or features..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-black/30 border border-green-500/30 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                                        data-oid="26q:00t"
                                    />

                                    <div
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400"
                                        data-oid="wtjjo-e"
                                    >
                                        🔍
                                    </div>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2" data-oid="5ikl1fs">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 ${
                                            selectedCategory === category.id
                                                ? 'bg-green-500/20 border-green-400 text-green-400'
                                                : 'bg-black/20 border-white/10 text-gray-400 hover:border-green-500/50 hover:text-green-400'
                                        }`}
                                        data-oid="4lna.k4"
                                    >
                                        <span data-oid="gh_wqbo">{category.icon}</span>
                                        <span className="text-sm font-medium" data-oid="f.43exi">
                                            {category.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" data-oid="9sd38fd">
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
                                data-oid="09wnkdt"
                            >
                                <div
                                    className="flex items-center justify-between"
                                    data-oid="daavm79"
                                >
                                    <div data-oid=":25rgc8">
                                        <p className="text-gray-400 text-sm" data-oid=":oxexnc">
                                            {stat.label}
                                        </p>
                                        <p
                                            className="text-2xl font-bold text-green-400"
                                            data-oid=".ky7ye8"
                                        >
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className="text-2xl" data-oid="4se1_.0">
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Wallet Grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        data-oid="-e2fdv:"
                    >
                        {filteredWallets.map((wallet, index) => (
                            <div
                                key={wallet.name}
                                className={`backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 p-6 hover:border-green-500/50 hover:bg-white/10 transition-all duration-500 group cursor-pointer transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                data-oid="22fcb__"
                            >
                                {/* Header */}
                                <div
                                    className="flex items-start justify-between mb-4"
                                    data-oid="d_352o1"
                                >
                                    <div className="flex items-center space-x-3" data-oid="wntab16">
                                        <div
                                            className="w-12 h-12 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-xl flex items-center justify-center text-2xl border border-green-500/30"
                                            data-oid="pi2oxcd"
                                        >
                                            {wallet.logo}
                                        </div>
                                        <div data-oid="5pj2:4l">
                                            <h3
                                                className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300"
                                                data-oid="2wpq0_e"
                                            >
                                                {wallet.name}
                                            </h3>
                                            <div
                                                className="flex items-center space-x-2 mt-1"
                                                data-oid="dnlpg9h"
                                            >
                                                <div
                                                    className="flex items-center space-x-1"
                                                    data-oid=":3q-0_k"
                                                >
                                                    <div
                                                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                                                        data-oid="fa-7by9"
                                                    ></div>
                                                    <span
                                                        className="text-xs text-green-400"
                                                        data-oid="xhmriid"
                                                    >
                                                        Active
                                                    </span>
                                                </div>
                                                <div
                                                    className={`px-2 py-1 rounded-full text-xs ${getSecurityColor(wallet.security)}`}
                                                    data-oid="latfsla"
                                                >
                                                    {wallet.security} Security
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right" data-oid="gevchyi">
                                        <div className="text-sm text-gray-400" data-oid="lhlfydf">
                                            Popularity
                                        </div>
                                        <div
                                            className="text-lg font-bold text-green-400"
                                            data-oid="divgw:t"
                                        >
                                            {wallet.popularity}%
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p
                                    className="text-gray-300 text-sm mb-4 leading-relaxed"
                                    data-oid="y_pnv.m"
                                >
                                    {wallet.description}
                                </p>

                                {/* Platforms */}
                                <div className="mb-4" data-oid="676ka_x">
                                    <div className="text-xs text-gray-400 mb-2" data-oid="9yhc765">
                                        PLATFORMS
                                    </div>
                                    <div className="flex flex-wrap gap-2" data-oid="r5.mh7:">
                                        {wallet.platforms.map((platform) => (
                                            <span
                                                key={platform}
                                                className="px-2 py-1 bg-black/30 border border-green-500/30 rounded-lg text-xs text-green-400"
                                                data-oid="6mna_8t"
                                            >
                                                {platform}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-4" data-oid="w.ikqg6">
                                    <div className="text-xs text-gray-400 mb-2" data-oid="et9t9rk">
                                        KEY FEATURES
                                    </div>
                                    <div className="flex flex-wrap gap-1" data-oid="bsp5vck">
                                        {wallet.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-300 hover:border-green-500/50 hover:text-green-400 transition-all duration-300"
                                                data-oid="4sctv_4"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Popularity Bar */}
                                <div className="mb-4" data-oid="h.b1.-x">
                                    <div
                                        className="flex justify-between text-xs text-gray-400 mb-1"
                                        data-oid="1ypf6p_"
                                    >
                                        <span data-oid=":.vpsvh">Market Adoption</span>
                                        <span data-oid="o6x-.k9">{wallet.popularity}%</span>
                                    </div>
                                    <div
                                        className="w-full bg-black/30 rounded-full h-2"
                                        data-oid="0_ft3:m"
                                    >
                                        <div
                                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${wallet.popularity}%` }}
                                            data-oid="xue067t"
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button
                                    className="w-full py-2 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/30 rounded-xl text-green-400 hover:from-green-500/20 hover:to-green-600/20 hover:border-green-400 transition-all duration-300 text-sm font-medium"
                                    data-oid="xrptfi0"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div
                        className="mt-12 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6"
                        data-oid="m_xbxl9"
                    >
                        <h3 className="text-lg font-bold text-green-400 mb-4" data-oid="_44.phz">
                            Legend & Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-oid=":f:p1x9">
                            <div data-oid="yvknrxn">
                                <h4 className="text-white font-medium mb-2" data-oid="q4yb_tc">
                                    Security Levels
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="bfvy3o9">
                                    <div className="flex items-center space-x-2" data-oid="vgvyvpb">
                                        <div
                                            className="w-3 h-3 bg-green-400 rounded-full"
                                            data-oid="k9b74fa"
                                        ></div>
                                        <span className="text-gray-300" data-oid="lkis805">
                                            High - Hardware wallet support, audited code
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="zri3hkk">
                                        <div
                                            className="w-3 h-3 bg-yellow-400 rounded-full"
                                            data-oid="g_t.owi"
                                        ></div>
                                        <span className="text-gray-300" data-oid=".yp6vcv">
                                            Medium - Standard security practices
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="dx_r7jg">
                                        <div
                                            className="w-3 h-3 bg-red-400 rounded-full"
                                            data-oid="2jmvec_"
                                        ></div>
                                        <span className="text-gray-300" data-oid="z5c8vu5">
                                            Low - Basic security implementation
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div data-oid="t2n55vp">
                                <h4 className="text-white font-medium mb-2" data-oid="bj5tn:b">
                                    Platform Types
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="er2m797">
                                    <div className="flex items-center space-x-2" data-oid="myea5xs">
                                        <span data-oid="1u3n-bz">🌐</span>
                                        <span className="text-gray-300" data-oid="2e5rgsz">
                                            Browser Extension
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="u8fwqf1">
                                        <span data-oid="v1klk5:">📱</span>
                                        <span className="text-gray-300" data-oid="olglr9-">
                                            Mobile Application
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2" data-oid="z:w0fbg">
                                        <span data-oid="rxq4im0">💻</span>
                                        <span className="text-gray-300" data-oid="byfw9a4">
                                            Desktop Application
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div data-oid="43ufwvv">
                                <h4 className="text-white font-medium mb-2" data-oid="vyjmggr">
                                    Integration
                                </h4>
                                <div className="space-y-2 text-sm" data-oid="k4-_jzi">
                                    <div className="text-gray-300" data-oid="53zkua:">
                                        • Embeddable widget available
                                    </div>
                                    <div className="text-gray-300" data-oid="wbx8eul">
                                        • REST API for developers
                                    </div>
                                    <div className="text-gray-300" data-oid="nor5mae">
                                        • Real-time updates
                                    </div>
                                    <div className="text-gray-300" data-oid="lv_rj0_">
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
                    data-oid="2:0wsiv"
                >
                    <div className="max-w-7xl mx-auto px-6 py-8" data-oid="unk27rr">
                        <div
                            className="flex flex-col md:flex-row justify-between items-center"
                            data-oid=":0e78tz"
                        >
                            <div className="text-gray-400 text-sm" data-oid="ha4eq_:">
                                © 2024 Solana Wallet Inventory. Built for builders, merchants, and
                                users.
                            </div>
                            <div
                                className="flex items-center space-x-6 mt-4 md:mt-0"
                                data-oid="31bq77z"
                            >
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    data-oid="6y1x30u"
                                >
                                    API Docs
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    data-oid="ko:404_"
                                >
                                    Submit Wallet
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                                    data-oid="fx964e."
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
