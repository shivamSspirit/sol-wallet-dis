"use client";

import { useState, useEffect } from "react";
import CSVDisplay from "./components/CsvDisplay";
import WalletManager from "./components/WalletManager";
import Image from "next/image";

type Wallet = {
  name: string;
  category: string;
  platforms: string[];
  custodyModel: string;
  inAppDexSwap: boolean;
  nftGallery: boolean;
  inAppStaking: boolean;
  fiatOnOffRamp: boolean;
  pushNotifications: boolean;
  solanaPayQR: string;
  multiChain: boolean;
  openSource: boolean;
  logo: string;
  description: string;
  security: string;
  popularity: number;
  imageLogo: string;
  website: string;
};

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  console.log("wallets", wallets);

  useEffect(() => {
    setIsLoaded(true);
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await fetch("/api/csv-data");
      const result = await response.json();

      if (response.ok && result.data) {
        console.log("result.data", result.data);
        // Transform CSV data to match our component structure
        const transformedWallets: Wallet[] = result.data.
        filter((wallet: any) => wallet.Name && wallet.Name.trim() !== "") // Filter out empty rows
        .map((wallet: any) => ({
          name: wallet.Name,
          category: getCategoryFromPlatforms(wallet.Platforms),
          platforms: wallet.Platforms ?
          wallet.Platforms.split(";").map((p: string) => p.trim()) :
          [],
          custodyModel: wallet["Custody Model"] || "Unknown",
          inAppDexSwap: wallet["In-app DEX Swap"] === "Yes",
          nftGallery: wallet["NFT Gallery"] === "Yes",
          inAppStaking: wallet["In-app Staking"] === "Yes",
          fiatOnOffRamp:
          wallet["Fiat On/Off Ramp"] === "Yes" ||
          wallet["Fiat On/Off Ramp"] === "Partial",
          pushNotifications: wallet["Push Notifications"] === "Yes",
          solanaPayQR: wallet["Solana Pay QR"] || "No",
          multiChain: wallet["Multi-Chain"] === "Yes",
          openSource: wallet["Open Source"] === "Yes",
          logo: getWalletLogo(wallet.Name),
          description: wallet.Notes || `${wallet.Name} wallet`,
          security: getSecurityLevel(wallet.Category),
          popularity: getPopularityScore(wallet.Name),
          imageLogo: wallet.Logos,
          website: wallet.weblink
        }));

        setWallets(transformedWallets);
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryFromPlatforms = (platforms: string | undefined) => {
    if (!platforms) return "other";
    const platformStr = platforms.toLowerCase();
    if (
    platformStr.includes("chrome") ||
    platformStr.includes("firefox") ||
    platformStr.includes("edge"))
    {
      return "browser";
    }
    if (platformStr.includes("ios") || platformStr.includes("android")) {
      return "mobile";
    }
    if (platformStr.includes("desktop")) {
      return "desktop";
    }
    if (platformStr.includes("hardware")) {
      return "hardware";
    }
    return "other";
  };

  const getWalletLogo = (name: string) => {
    const logoMap = {
      Phantom: "👻",
      Solflare: "🔥",
      Backpack: "🎒",
      Glow: "✨",
      Exodus: "🚀",
      "Trust Wallet": "🛡️",
      "Coinbase Wallet": "🔵",
      "Atomic Wallet": "⚛️",
      "Brave Wallet": "🦁",
      Ledger: "🔐",
      Trezor: "🔒",
      SafePal: "🛡️",
      Keystone: "🗝️",
      Tangem: "💳",
      MetaMask: "🦊",
      Binance: "🟡",
      OKX: "⭕",
      Coin98: "🌐",
      "Math Wallet": "📊",
      Guarda: "🛡️",
      TokenPocket: "💰",
      Enkrypt: "🔐",
      Robinhood: "🏹",
      Torus: "🌀",
      Tiplink: "🔗",
      Fuse: "⚡",
      Helium: "📡",
      Bitget: "📈",
      Jupiter: "🪐"
    };

    for (const [key, emoji] of Object.entries(logoMap)) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return emoji;
      }
    }
    return "💼"; // Default wallet icon
  };

  const getSecurityLevel = (category: string) => {
    if (category === "Cold Wallet") return "High";
    if (category === "Hot Wallet") return "Medium";
    return "Medium";
  };

  const getPopularityScore = (name: string) => {
    const popularityMap = {
      Phantom: 95,
      Solflare: 88,
      "Trust Wallet": 85,
      Exodus: 80,
      Backpack: 75,
      Coin98: 70,
      Glow: 65,
      "Atomic Wallet": 75,
      "Coinbase Wallet": 80,
      Ledger: 90,
      Trezor: 85,
      MetaMask: 70
    };

    for (const [key, score] of Object.entries(popularityMap)) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return score;
      }
    }
    return Math.floor(Math.random() * 40) + 40; // Random score between 40-80 for unknown wallets
  };

  const categories = [
  { id: "all", name: "All Wallets", icon: "🌟" },
  { id: "browser", name: "Browser Extension", icon: "🌐" },
  { id: "mobile", name: "Mobile App", icon: "📱" },
  { id: "desktop", name: "Desktop App", icon: "💻" },
  { id: "hardware", name: "Hardware Wallet", icon: "🔐" }];


  const filteredWallets = wallets.filter((wallet) => {
    const matchesCategory =
    selectedCategory === "all" || wallet.category === selectedCategory;

    // Special handling for Solana Pay search
    if (searchTerm.toLowerCase() === "solana pay") {
      return wallet.solanaPayQR === "Yes" && matchesCategory;
    }

    const matchesSearch =
    wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wallet.platforms.some((platform) =>
    platform.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    wallet.custodyModel.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getSecurityColor = (security: string) => {
    switch (security) {
      case "High":
        return "text-green-400 bg-green-400/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "Low":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen bg-solana-gradient text-white flex items-center justify-center"
        data-oid="rp5-884">

        <div className="text-center" data-oid="1_uki0o">
          <div
            className="w-16 h-16 border-4 border-solana-purple/30 border-t-solana-purple rounded-full animate-spin mx-auto mb-4"
            data-oid="k1ll:4w">
          </div>
          <p
            className="text-solana-purple text-lg font-medium"
            data-oid="et94.fa">

            Loading wallet data...
          </p>
        </div>
      </div>);

  }

  return (
    <div
      className="min-h-screen bg-solana-gradient text-white overflow-x-hidden print:bg-white"
      data-oid="7b1mj:z">

      {/* Animated background - hidden in print */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-background-secondary via-structure-darker to-background-primary print:hidden"
        data-oid="lf5j-wj">

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,69,255,0.1),transparent_50%)]"
          data-oid="xxl97z2">
        </div>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-solana-purple/10 rounded-full blur-3xl animate-pulse"
          data-oid="w417dql">
        </div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solana-green/10 rounded-full blur-3xl animate-pulse delay-1000"
          data-oid="w:-vv8a">
        </div>
      </div>

      <div className="relative z-10" data-oid="g8:iw-:">
        {/* Header */}
        <header
          className={`backdrop-blur-xl bg-background-card/80 border-b border-border-primary transition-all duration-1000 print:bg-white print:border-slate-300 ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
          data-oid="ufe677_">

          <div className="max-w-7xl mx-auto px-6 py-6" data-oid="23sye-1">
            <div
              className="flex items-center justify-between"
              data-oid="dmp:-02">

              <div className="flex items-center space-x-4" data-oid="h0g3vd3">
                {/* Modify logo container */}
                <div
                  className="w-14 h-14 bg-gradient-to-r from-solana-purple/20 to-solana-green/40 rounded-lg flex items-center justify-center"
                  data-oid="cqgbdws">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    className="
                      w-10 
                      h-10 
                      transform 
                      transition-all 
                      duration-500 
                      group-hover:rotate-12 
                      group-hover:scale-110
                    "
                    data-oid="-lr4f5a">

                    {/* Glowing Effect */}
                    <defs data-oid="jvmiit0">
                      <filter
                        id="neon-glow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        data-oid="9:9c39b">

                        <feGaussianBlur
                          className="blur-lg"
                          stdDeviation="3"
                          result="coloredBlur"
                          data-oid="5jqmatv" />


                        <feMerge data-oid="q64sh8f">
                          <feMergeNode in="coloredBlur" data-oid="mk_3vcd" />
                          <feMergeNode in="SourceGraphic" data-oid="hvms_l3" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Wallet Matrix Symbol */}
                    <path
                      d="M10 25 L25 10 L40 25 L25 40 Z"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#neon-glow)"
                      className="
                          group-hover:stroke-solana-purple/70 
                          transition-colors 
                          duration-500
                        "




                      data-oid="b2guf1g" />


                    <circle
                      cx="25"
                      cy="25"
                      r="3"
                      fill="url(#gradient)"
                      filter="url(#neon-glow)"
                      className="
                          group-hover:fill-solana-purple/70 
                          transition-colors 
                          duration-500
                        "




                      data-oid="3rpuf7b" />


                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                      data-oid="5d6we73">

                      <stop
                        offset="0%"
                        stopColor="#9945FF"
                        data-oid="v0zh:or" />


                      <stop
                        offset="50%"
                        stopColor="#14F195"
                        data-oid="vxwkng." />


                      <stop
                        offset="100%"
                        stopColor="#00D4FF"
                        data-oid="ogixto2" />

                    </linearGradient>
                  </svg>
                </div>
                <div data-oid="j7p104i">
                  <h1
                    className="text-xl md:text-2xl font-black text-solana-gradient print:text-slate-900 text-shadow-[0_0_10px_rgba(153,69,255,0.5)] tracking-tight leading-tight"
                    data-oid="se2fn1r">

                    Solana Wallet Inventory
                  </h1>
                  <p
                    className="text-text-secondary/90 text-sm md:text-base print:text-slate-700 font-medium tracking-wide mt-2"
                    data-oid="d:3udu0">

                    Comprehensive wallet ecosystem dashboard
                  </p>
                </div>
              </div>
              <div
                className="flex items-center space-x-4 print:hidden"
                data-oid="hmwl_mm">

                <a
                  href="https://github.com/shivam-soni/solana-wallet-matrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background-card/50 border border-border-primary rounded-lg text-text-secondary hover:bg-background-card hover:text-solana-green hover:border-border-hover transition-all duration-300 flex items-center justify-center"
                  data-oid="github-link">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                    data-oid="h8bokoc">

                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      data-oid="kv_33mn" />

                  </svg>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Controls */}
        <div
          className={`max-w-7xl mx-auto px-6 py-8 transition-all duration-1000 delay-300 print:py-4 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          data-oid="0-du3cf">

          <div
            className={`backdrop-blur-xl bg-background-card/60 rounded-2xl border border-border-primary p-6 mb-8 print:bg-white print:border-slate-300 print:mb-4`}
            data-oid="1vb06ac">

            <div
              className="flex flex-col lg:flex-row gap-6 print:hidden"
              data-oid="t2nq-s1">

              {/* Search */}
              <div className="flex-1" data-oid="efv7mf1">
                <div className="relative" data-oid="y14yhie">
                  <input
                    type="text"
                    placeholder="Search wallets or features..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-solana-purple/10 border border-solana-purple/30 rounded-xl px-4 py-3 pl-12 text-text-primary placeholder-text-muted/70 focus:border-solana-green focus:outline-none focus:ring-2 focus:ring-solana-green/20 transition-all duration-300 font-medium tracking-wide"
                    data-oid="e0a_np0" />


                  <div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-solana-green"
                    data-oid="4.n83yy">

                    🔍
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2" data-oid="bodks2.">
                {categories.map((category) =>
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id ?
                  "bg-solana-green/20 border-solana-green text-solana-green" :
                  "bg-background-secondary/50 border-border-primary text-text-secondary hover:border-solana-green/50 hover:text-solana-green"}`
                  }
                  data-oid="ro62zaz">

                    <span data-oid="euk2h10">{category.icon}</span>
                    <span
                    className="text-sm font-semibold tracking-wide"
                    data-oid="fp20hhj">

                      {category.name}
                    </span>
                  </button>
                )}

                {/* Quick Filter for Solana Pay */}
                <button
                  onClick={() => {
                    if (searchTerm === "solana pay") {
                      setSearchTerm("");
                    } else {
                      setSearchTerm("solana pay");
                      setSelectedCategory("all");
                    }
                  }}
                  className={`px-4 py-2 rounded-xl border transition-all duration-300 flex items-center space-x-2 ${
                  searchTerm === "solana pay" ?
                  "bg-solana-purple/20 border-solana-purple text-solana-purple" :
                  "bg-background-secondary/50 border-border-primary text-text-secondary hover:border-solana-purple/50 hover:text-solana-purple"}`
                  }
                  data-oid="xxm04f_">

                  <span data-oid="oy6g.5h">💳</span>
                  <span
                    className="text-sm font-semibold tracking-wide"
                    data-oid="-pqmgxr">

                    Solana Pay
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 print:mb-4"
            data-oid="bo1xkje">

            {[
            { label: "Total Wallets", value: wallets.length, icon: "💼" },
            {
              label: "Browser Extensions",
              value: wallets.filter((w) => w.category === "browser").length,
              icon: "🌐"
            },
            {
              label: "Mobile Apps",
              value: wallets.filter((w) => w.category === "mobile").length,
              icon: "📱"
            },
            {
              label: "Hardware Wallets",
              value: wallets.filter((w) => w.category === "hardware").length,
              icon: "🔐"
            },
            {
              label: "Solana Pay Support",
              value: wallets.filter((w) => w.solanaPayQR === "Yes").length,
              icon: "💳"
            }].
            map((stat, index) =>
            <div
              key={stat.label}
              className="bg-background-card/60 rounded-xl p-4 flex items-center space-x-4 border border-border-primary"
              data-oid="stat-item"
            >
              <div className="text-3xl">{stat.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-text-secondary truncate">{stat.label}</div>
                <div className="text-2xl font-bold text-solana-green">{stat.value}</div>
              </div>
            </div>
            )}
          </div>

          {/* Wallet Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="ys8wlky">

            {filteredWallets.map((wallet, index) =>
            <WalletCard
              key={wallet.name}
              wallet={wallet}
              index={index}
              isLoaded={isLoaded}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
              data-oid=".3s79ag" />

            )}
          </div>

          {/* Legend */}
          <div
            className="mt-12 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6"
            data-oid="i26yexu">

            <h3
              className="text-xl md:text-2xl font-bold text-solana-green mb-6 tracking-tight"
              data-oid="ymo.to-">

              Legend & Information
            </h3>
            <div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              data-oid="z-r.87i">

              <div data-oid="yd3.a_1">
                <h4
                  className="text-white font-bold mb-3 text-base tracking-wide"
                  data-oid="f8jxwt_">

                  Custody Models
                </h4>
                <div className="space-y-3 text-sm" data-oid="gtvewpv">
                  <div
                    className="flex items-center space-x-3"
                    data-oid="0aoeu0h">

                    <div
                      className="w-3 h-3 bg-green-400 rounded-full flex-shrink-0"
                      data-oid="v3905b.">
                    </div>
                    <span
                      className="text-gray-300 font-medium leading-relaxed"
                      data-oid=":w11x0z">

                      Self-custody - You control your keys
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="m40cf6j">

                    <div
                      className="w-3 h-3 bg-yellow-400 rounded-full flex-shrink-0"
                      data-oid="o15ms0:">
                    </div>
                    <span
                      className="text-gray-300 font-medium leading-relaxed"
                      data-oid="1tk5sg_">

                      MPC - Multi-party computation
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="43t1_p1">

                    <div
                      className="w-3 h-3 bg-red-400 rounded-full flex-shrink-0"
                      data-oid="hrtbi-y">
                    </div>
                    <span
                      className="text-gray-300 font-medium leading-relaxed"
                      data-oid="56t-gme">

                      Custodial - Third-party holds keys
                    </span>
                  </div>
                </div>
              </div>
              <div data-oid="8a78g:8">
                <h4
                  className="text-white font-bold mb-3 text-base tracking-wide"
                  data-oid="7xtaes-">

                  Solana Pay QR Support
                </h4>
                <div className="space-y-3 text-sm" data-oid="5tagzs_">
                  <div
                    className="flex items-center space-x-3"
                    data-oid=":q13ytm">

                    <span className="flex-shrink-0" data-oid="1fffew9">
                      ✅
                    </span>
                    <span
                      className="text-green-300 font-medium leading-relaxed"
                      data-oid="t68dayp">

                      Yes - Full support
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="mfgv._1">

                    <span className="flex-shrink-0" data-oid="an7qqoc">
                      ⚠️
                    </span>
                    <span
                      className="text-yellow-300 font-medium leading-relaxed"
                      data-oid="tbfe4ft">

                      Partial - Limited support
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="dmus58e">

                    <span className="flex-shrink-0" data-oid="bbd:z2e">
                      ❌
                    </span>
                    <span
                      className="text-red-300 font-medium leading-relaxed"
                      data-oid=".p:n57t">

                      No - Not supported
                    </span>
                  </div>
                </div>
              </div>
              <div data-oid=".ef:b_-">
                <h4
                  className="text-white font-bold mb-3 text-base tracking-wide"
                  data-oid="80r0lai">

                  Key Features
                </h4>
                <div className="space-y-3 text-sm" data-oid="9ja1xb2">
                  <div
                    className="text-gray-300 font-medium leading-relaxed"
                    data-oid="47ax51l">

                    • In-app DEX swap
                  </div>
                  <div
                    className="text-gray-300 font-medium leading-relaxed"
                    data-oid="_frznpz">

                    • NFT gallery support
                  </div>
                  <div
                    className="text-gray-300 font-medium leading-relaxed"
                    data-oid="1_27d7j">

                    • In-app staking
                  </div>
                  <div
                    className="text-gray-300 font-medium leading-relaxed"
                    data-oid=".9yz2_y">

                    • Fiat on/off ramps
                  </div>
                  <div
                    className="text-gray-300 font-medium leading-relaxed"
                    data-oid="v2ndn22">

                    • Push notifications
                  </div>
                </div>
              </div>
              <div data-oid="yq7lj7y">
                <h4
                  className="text-white font-bold mb-3 text-base tracking-wide"
                  data-oid="sgdtw0u">

                  Platform Types
                </h4>
                <div className="space-y-3 text-sm" data-oid="ucb8g1m">
                  <div
                    className="flex items-center space-x-3"
                    data-oid="cnyzxut">

                    <span className="flex-shrink-0" data-oid="4_r:i9n">
                      🌐
                    </span>
                    <span
                      className="text-gray-300 font-medium leading-relaxed"
                      data-oid="1qn-z4c">

                      Browser Extension
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="ddn-18z">

                    <span className="flex-shrink-0" data-oid="r5-br-v">
                      📱
                    </span>
                    <span
                      className="text-gray-300 font-medium leading-relaxed"
                      data-oid="tn84qn9">

                      Mobile Application
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-3"
                    data-oid="mp.y.4c">

                    <span className="flex-shrink-0" data-oid="kdtl1:t">
                      🔐
                    </span>
                    <span
                      className="text-gray-300 font-medium leading-relaxed"
                      data-oid="q7_1udf">

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
          data-oid="r.f5344">

          <div className="max-w-7xl mx-auto px-6 py-8" data-oid="mm8tzsw">
            <div
              className="flex flex-col md:flex-row justify-between items-center"
              data-oid="fxjyoin">

              <div className="text-gray-400 text-sm" data-oid="wn7x1e5">
                © 2025 Solana Wallet Inventory. Built for builders, merchants,
                and users.
              </div>
              <div
                className="flex items-center space-x-6 mt-4 md:mt-0"
                data-oid="4wkpdsr">

                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                  data-oid="oyp-g7b">

                  API Docs
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                  data-oid="4x6awnt">

                  Submit Wallet
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                  data-oid="56vzj7x">

                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>);

}

/**
 * WalletAvatar always fills the size of its parent div.
 * To control the avatar size, set width/height on the parent.
 * Example: <div className="w-16 h-16"><WalletAvatar ... /></div>
 */
function WalletAvatar({
  walletName,
  imageUrl,
  bgColor = "bg-gradient-to-br from-blue-500 to-purple-600",
  textColor = "text-white"





}: {walletName: string;imageUrl?: string;bgColor?: string;textColor?: string;}) {
  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      data-oid="0m8tsyl">

      {imageUrl ?
      <Image
        src={imageUrl}
        alt={walletName || "Wallet"}
        fill
        className="object-cover"
        data-oid="1d6sk:p" /> :


      <div
        className={`w-full h-full rounded-full ${bgColor} ${textColor} flex items-center justify-center font-bold select-none`}
        style={{ fontSize: "2em" }}
        data-oid="q507zf9">

          {getInitial(walletName)}
        </div>
      }
    </div>);

}

/**
 * Modern, clean wallet card component with fixed layout and rich dark theme
 */
function WalletCard({
  wallet,
  index,
  isLoaded,
  expandedCard,
  setExpandedCard






}: {wallet: Wallet;index: number;isLoaded: boolean;expandedCard: string | null;setExpandedCard: (name: string | null) => void;}) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-slate-800/95 border border-slate-700/60 backdrop-blur-sm
        rounded-2xl shadow-2xl hover:shadow-purple-500/5
        transition-all duration-300 ease-in-out
        hover:border-purple-500/20 hover:bg-slate-800/90
        print:shadow-none print:border-slate-300 print:bg-white
        h-[429px] flex flex-col group
        ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
      `}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-oid="dke03ba">

      {/* Creative Background Pattern - Reduced opacity */}
      <div className="absolute inset-0 opacity-2" data-oid="wiuhj1l">
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-solana-purple/10 to-transparent rounded-full blur-2xl"
          data-oid=":y.up-3">
        </div>
        <div
          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-solana-green/8 to-transparent rounded-full blur-xl"
          data-oid="9:snh3k">
        </div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-radial from-solana-purple/5 via-transparent to-transparent rounded-full"
          data-oid="3fli1kg">
        </div>
      </div>

      {/* Animated Grid Pattern - Much more subtle */}
      <div
        className="absolute inset-0 opacity-[0.01] group-hover:opacity-[0.02] transition-opacity duration-300"
        data-oid="2f4x7sz">

        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(153, 69, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(153, 69, 255, 0.05) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px"
          }}
          data-oid="jr-remf">
        </div>
      </div>

      {/* Subtle Border Glow - Much reduced */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-solana-purple/5 via-transparent to-solana-green/5 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-sm"
        data-oid="916t:wy">
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pb-1 flex-shrink-0" data-oid="xf74t3x">
        <div
          className="flex items-center justify-between mb-6"
          data-oid="39fq:cp">

          {/* Left: Avatar */}
          <div className="w-14 h-14 flex-shrink-0" data-oid="i.z--d7">
            <div
              className="w-full h-full rounded-full ring-2 ring-slate-700 shadow bg-slate-900 overflow-hidden relative"
              data-oid="w.zwbjc">

              {/* Avatar glow effect - Much more subtle */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-solana-purple/5 to-solana-green/5 opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full"
                data-oid="-i-:ph7">
              </div>

              <WalletAvatar
                walletName={wallet.name}
                imageUrl={wallet.imageLogo}
                bgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
                textColor="text-white"
                data-oid="np5xvm9" />

            </div>
          </div>
          {/* Center: Name and badges */}
          <div className="flex-1 min-w-0 px-4" data-oid="_rg9k1a">
            <h3
              className="text-xl md:text-2xl font-bold text-white truncate mb-1 print:text-slate-900 group-hover:text-solana-green/80 transition-colors duration-300 tracking-tight leading-tight"
              data-oid="aocl2mb">

              {wallet.name}
            </h3>
            <div className="flex items-center space-x-2" data-oid="ny.0duz">
              <CustodyBadge
                custodyModel={wallet.custodyModel}
                data-oid="flvq:gg" />

            </div>
          </div>
          {/* Right: Link icon */}
          <a
            href={wallet.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-300/80 transition-all duration-300 
                       ml-2 flex items-center justify-center 
                       group relative"


            title="Open website"
            data-oid="wallet-link"
            style={{ minWidth: 30, minHeight: 30 }}>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 
                         group-hover:text-cyan-300/80 
                         group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]
                         transition-all duration-300 ease-in-out"



              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              data-oid="v-a2bn_">

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                data-oid="bgcv:9l" />

            </svg>
            <span
              className="absolute inset-0 rounded-full opacity-0 
                         group-hover:opacity-10 
                         bg-cyan-500 
                         animate-ping 
                         transition-opacity duration-300 ease-in-out"




              data-oid="xmfpp65">
            </span>
          </a>
        </div>
      </div>

      {/* Platforms Section - flex-shrink-0, single line, horizontal scroll if needed */}
      <div
        className="relative z-10 px-6 pt-1 pb-2 flex-shrink-0"
        data-oid="2.s097g">

        <div
          className="text-xs font-bold text-slate-300/90 mb-2 uppercase tracking-widest"
          data-oid="34vk_oq">

          Platforms
        </div>
        <div
          className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          data-oid="r9lad9o">

          {wallet.platforms.slice(0, 4).map((platform: string) =>
          <PlatformIcon
            key={platform}
            platform={platform}
            data-oid="_iwpoa:" />

          )}
          {wallet.platforms.length > 4 &&
          <div
            className="px-3 py-1.5 bg-slate-700/80 rounded-lg text-xs text-slate-300 font-medium inline-block"
            data-oid="1g0ankh">

              +{wallet.platforms.length - 4}
            </div>
          }
        </div>
      </div>

      {/* Solana Pay QR - flex-shrink-0 */}
      <div
        className="relative z-10 px-6 pt-1 pb-2 mt-2 flex-shrink-0"
        data-oid="hin1omb">

        <div
          className="bg-gradient-to-r from-slate-700/60 to-slate-600/60 border border-slate-600/80 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden"
          data-oid="u.lbe2c">

          {/* Subtle background pattern for Solana Pay section - Reduced */}
          <div className="absolute inset-0 opacity-5" data-oid="u5cc7cq">
            <div
              className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-purple-500/15 to-transparent rounded-full blur-lg"
              data-oid=".fhk3r1">
            </div>
          </div>

          <div
            className="relative z-10 flex items-center justify-between"
            data-oid="bv_3nk8">

            <div className="flex items-center space-x-3" data-oid="wf1dfus">
              <div
                className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center relative overflow-hidden"
                data-oid="0.v5hsq">

                {/* Icon glow effect - Much more subtle */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  data-oid="lhw603l">
                </div>

                <span className="relative z-10 text-base" data-oid="qd4cp6k">
                  💳
                </span>
              </div>
              <div data-oid="ux-46yz">
                <div
                  className="text-sm font-bold text-slate-200 tracking-wide"
                  data-oid="ba1wqgv">

                  Solana Pay QR
                </div>
                <div
                  className="text-xs text-slate-400/80 font-medium tracking-wide"
                  data-oid="9:iu4bx">

                  Payment Integration
                </div>
              </div>
            </div>
            <SolanaPayStatus status={wallet.solanaPayQR} data-oid="weeyua2" />
          </div>
        </div>
      </div>

      {/* Features Grid - flex-shrink-0 */}
      <div
        className="relative z-10 px-6 pt-1 pb-1 flex-shrink-0"
        data-oid="8:1iwau">

        <div
          className="text-xs font-bold text-slate-300/90 mb-2 uppercase tracking-widest"
          data-oid="8riozi4">

          Features
        </div>
        <div className="grid grid-cols-3 gap-3" data-oid="t7tqh8_">
          <FeatureItem
            icon="🔄"
            label="DEX"
            enabled={wallet.inAppDexSwap}
            compact
            data-oid="8j04_lc" />


          <FeatureItem
            icon="🖼️"
            label="NFT"
            enabled={wallet.nftGallery}
            compact
            data-oid="ymwgj6m" />


          <FeatureItem
            icon="🏦"
            label="Stake"
            enabled={wallet.inAppStaking}
            compact
            data-oid="ft88s5v" />


          <FeatureItem
            icon="💰"
            label="Fiat"
            enabled={wallet.fiatOnOffRamp}
            compact
            data-oid="oix:yny" />


          <FeatureItem
            icon="🔔"
            label="Push"
            enabled={wallet.pushNotifications}
            compact
            data-oid="6xgzxfg" />


          <FeatureItem
            icon="🔗"
            label="Multichain"
            enabled={wallet.multiChain}
            compact
            data-oid="vow4nvj" />

        </div>
      </div>

      {/* Notes - single line, always at bottom, no scroll */}
      <div
        className="relative z-10 px-6 pt-1 pb-2 flex-shrink-0"
        data-oid="mabi7k6">

        <div
          className="bg-slate-700/40 rounded-lg px-1 py-2 border border-slate-600/60 backdrop-blur-sm flex items-center h-8 relative overflow-hidden"
          data-oid="2-kppvu">

          {/* Subtle background glow - Much reduced */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-solana-green/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            data-oid="9hc0ez6">
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-5 h-5 mr-1 text-cyan-400 group-hover:text-cyan-300/80 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            data-oid="7xpj.72">

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              data-oid="-t6exkd" />

          </svg>
          <p
            className="relative z-10 text-sm text-slate-300/90 leading-relaxed truncate whitespace-nowrap overflow-hidden w-full text-start font-medium tracking-wide"
            data-oid="3iqffc:">

            {wallet.description ||
            `${wallet.name} is a cryptocurrency wallet supporting various features and platforms.`}
          </p>
        </div>
      </div>
    </div>);

}

/**
 * Custody model badge component
 */
function CustodyBadge({ custodyModel }: {custodyModel: string;}) {
  const getStyles = (model: string) => {
    switch (model) {
      case "self-custody":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "MPC":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "custodial":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-red-500/20 text-red-300 border-red-500/30";
    }
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getStyles(custodyModel)}`}
      data-oid="o9:y::9">

      {custodyModel}
    </span>);

}

/**
 * Solana Pay badge component
 */
function SolanaPayBadge() {
  return (
    <span
      className="px-2 py-0.5 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
      data-oid="yh:d5n8">

      Solana Pay
    </span>);

}

/**
 * Platform icon component
 */
function PlatformIcon({ platform }: {platform: string;}) {
  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("ios")) return "📱";
    if (p.includes("android")) return "🤖";
    if (
    p.includes("chrome") ||
    p.includes("firefox") ||
    p.includes("edge") ||
    p.includes("brave"))

    return "🌐";
    if (
    p.includes("desktop") ||
    p.includes("windows") ||
    p.includes("mac") ||
    p.includes("Linux"))

    return "💻";
    if (p.includes("hardware")) return "🔐";
    return "📦";
  };

  return (
    <div
      className="flex items-center space-x-1 px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300 border border-gray-600"
      title={platform}
      data-oid="q1o4c7c">

      <span className="text-sm" data-oid="hpuvmkr">
        {getIcon(platform)}
      </span>
      <span className="truncate max-w-16" data-oid="kanq97_">
        {platform}
      </span>
    </div>);

}

/**
 * Feature item component
 */
function FeatureItem({
  icon,
  label,
  enabled,
  compact = false





}: {icon: string;label: string;enabled: boolean;compact?: boolean;}) {
  if (compact) {
    return (
      <div
        className={`
        flex flex-row items-center justify-center gap-2 p-2 rounded-lg text-center h-full
        ${
        enabled ?
        "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
        "bg-gray-700/50 text-gray-500 border border-gray-600"}
      `
        }
        data-oid="48u-joc">

        <span className="text-sm" data-oid="rbs6vud">
          {icon}
        </span>
        <span className="text-xs font-medium leading-tight" data-oid="-e:202x">
          {label}
        </span>
      </div>);

  }
  return (
    <div className="flex items-center justify-between py-2" data-oid="i7x98ra">
      <div className="flex items-center space-x-2" data-oid="28lhl95">
        <span className="text-sm" data-oid="gtggzei">
          {icon}
        </span>
        <span className="text-sm text-gray-300" data-oid="0.lt8se">
          {label}
        </span>
      </div>
      <span
        className={`text-sm ${enabled ? "text-emerald-400" : "text-gray-500"}`}
        data-oid="lrfati2">

        {enabled ? "✅" : "❌"}
      </span>
    </div>);

}

/**
 * Solana Pay status component
 */
function SolanaPayStatus({ status }: {status: string;}) {
  const getStyles = (status: string) => {
    switch (status) {
      case "Yes":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "Partial":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-red-500/20 text-red-300 border-red-500/30";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold border ${getStyles(status)}`}
      data-oid="8d61n8w">

      {status}
    </span>);

}