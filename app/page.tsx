"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";

import { Wallet } from "./components/WalletTypes";
import { 
  getCategoryFromPlatforms, 
  getWalletLogo, 
  getSecurityLevel, 
  getPopularityScore 
} from "./components/WalletUtils";
import { WalletCard as SolanaWalletCard } from "./components/WalletCard";
import { FeatureItem } from "./components/FeatureComponents";
import { Dropdown as ImportedDropdown } from "./components/Dropdown";
import { PlatformIcon as ImportedPlatformIcon } from "./components/Icons";

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);

  // State for new dropdowns
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>("All Platforms");
  const [selectedCustodyModel, setSelectedCustodyModel] = useState<string | null>("All Models");
  const [selectedFeature, setSelectedFeature] = useState<string | null>("All Features");

  // Platform options
  const platformOptions = [
    "All Platforms",
    "Android",
    "Chrome",
    "Firefox",
    "Windows",
    "Linux",
    "macOS",
    "Hardware"
  ];

  // Custody Model options
  const custodyModelOptions = [
    "All Models",
    "Self-custody",
    "Custodial",
    "MPC"
  ];

  // Feature options
  const featureOptions = [
    "All Features",
    "DEX",
    "NFT",
    "Fiat On-ramp",
    "Fiat Off-ramp",
    "Staking",
    "Push Notifications",
    "Solana Pay QR",
    "Multi-Chain"
  ];

  useEffect(() => {
    setIsLoaded(true);
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await fetch("/api/csv-data");
      const result = await response.json();

      if (response.ok && result.data) {
        // Transform CSV data to match our component structure
        const transformedWallets: Wallet[] = result.data
          .filter((wallet: any) => wallet.Name && wallet.Name.trim() !== "") // Filter out empty rows
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

  // Modify filtering logic
  const filteredWallets = wallets.filter((wallet) => {
    // Normalize search term
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    // Search term filtering (comprehensive and flexible)
    const matchesSearchTerm = !searchTerm || (
      // Search by wallet name
      wallet.name.toLowerCase().includes(normalizedSearchTerm) ||
      
      // Search by platforms
      wallet.platforms.some(platform => 
        platform.toLowerCase().includes(normalizedSearchTerm)
      ) ||
      
      // Search by description
      wallet.description.toLowerCase().includes(normalizedSearchTerm) ||
      
      // Search by custody model
      wallet.custodyModel.toLowerCase().includes(normalizedSearchTerm) ||
      
      // Search by features
      (normalizedSearchTerm === "dex" && wallet.inAppDexSwap) ||
      (normalizedSearchTerm === "nft" && wallet.nftGallery) ||
      (normalizedSearchTerm === "fiat" && wallet.fiatOnOffRamp) ||
      (normalizedSearchTerm === "staking" && wallet.inAppStaking) ||
      (normalizedSearchTerm === "notifications" && wallet.pushNotifications) ||
      (normalizedSearchTerm === "multichain" && wallet.multiChain) ||
      (normalizedSearchTerm === "solana pay" && wallet.solanaPayQR === "Yes")
    );

    // Platform filtering
    const matchesPlatform =
      !selectedPlatform ||
      selectedPlatform === "All Platforms" ||
      wallet.platforms.some(platform =>
        platform.toLowerCase().includes(selectedPlatform.toLowerCase().replace("all platforms", ""))
      );

    // Custody Model filtering
    const matchesCustodyModel =
      !selectedCustodyModel ||
      selectedCustodyModel === "All Models" ||
      wallet.custodyModel.toLowerCase() === selectedCustodyModel.toLowerCase().replace("all models", "");

    // Feature filtering
    const matchesFeature =
      !selectedFeature ||
      selectedFeature === "All Features" ||
      (selectedFeature === "DEX" && wallet.inAppDexSwap) ||
      (selectedFeature === "NFT" && wallet.nftGallery) ||
      (selectedFeature === "Fiat On-ramp" && wallet.fiatOnOffRamp) ||
      (selectedFeature === "Fiat Off-ramp" && wallet.fiatOnOffRamp) ||
      (selectedFeature === "Staking" && wallet.inAppStaking) ||
      (selectedFeature === "Push Notifications" && wallet.pushNotifications) ||
      (selectedFeature === "Solana Pay QR" && wallet.solanaPayQR === "Yes") ||
      (selectedFeature === "Multi-Chain" && wallet.multiChain);

    return matchesSearchTerm && matchesPlatform && matchesCustodyModel && matchesFeature;
  });

  if (loading) {
    return (
      <div
        className="min-h-screen bg-solana-gradient text-white flex items-center justify-center"
        data-oid="rp5-884"
      >
        <div className="text-center" data-oid="1_uki0o">
          <div
            className="w-16 h-16 border-4 border-solana-purple/30 border-t-solana-purple rounded-full animate-spin mx-auto mb-4"
            data-oid="k1ll:4w"
          ></div>
          <p
            className="text-solana-purple text-lg font-medium"
            data-oid="et94.fa"
          >
            Loading wallet data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-solana-gradient text-white overflow-x-hidden print:bg-white"
      data-oid="7b1mj:z"
    >
      {/* Animated background - hidden in print */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-background-secondary via-structure-darker to-background-primary print:hidden"
        data-oid="lf5j-wj"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(153,69,255,0.1),transparent_50%)]"
          data-oid="xxl97z2"
        ></div>
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-solana-purple/10 rounded-full blur-3xl animate-pulse"
          data-oid="w417dql"
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solana-green/10 rounded-full blur-3xl animate-pulse delay-1000"
          data-oid="w:-vv8a"
        ></div>
      </div>

      <div className="relative z-10" data-oid="g8:iw-:">
        {/* Header */}
        <header
          className={`backdrop-blur-xl bg-background-card/40 border-border-primary/10 transition-all duration-1000 shadow-sm print:bg-white print:border-slate-300 relative ${isLoaded ? "translate-y-0 opacity-100" : "-translate-y-full opacity-10"}`}
          data-oid="ufe677_"
        >
          {/* Full header gradient overlay */}
          <div
            className="absolute inset-0 opacity-50 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(153, 69, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(20, 241, 149, 0.05) 0%, transparent 50%)
              `
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-6 py-4 relative z-10" data-oid="23sye-1">
            <div
              className="flex items-center justify-between"
              data-oid="dmp:-02">

              <div className="flex items-center space-x-4" data-oid="h0g3vd3">
                <div
                  className="w-13 h-13 bg-gradient-to-r from-solana-purple/10 to-solana-green/20 rounded-lg flex items-center justify-center"
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
                          duration-500"
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
                    className="text-lg md:text-xl font-bold text-solana-gradient print:text-slate-900 tracking-tight leading-tight"
                    data-oid="se2fn1r">

                                        Solana Wallet Inventory
                                    </h1>
                  <p
                    className="text-text-secondary/80 text-xs md:text-sm print:text-slate-700 font-medium tracking-wide"
                    data-oid="d:3udu0">

                    Comprehensive Wallet Ecosystem Dashboard
                                    </p>
                                </div>
                            </div>

              <div
                className="flex items-center space-x-4 print:hidden"
                data-oid="hmwl_mm">
                <a
                  href="https://github.com/shivamSspirit/sol-wallet-dis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-transparent border border-border-primary/30 rounded-lg text-text-secondary hover:bg-solana-green/10 hover:text-solana-green hover:border-solana-green/50 transition-all duration-300 flex items-center justify-center"
                  data-oid="github-link">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
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
          className={`max-w-7xl mx-auto px-6 py-6 transition-all duration-1000 delay-300 print:py-4 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          data-oid="0-du3cf">



                    {/* Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 print:mb-4"
            data-oid="bo1xkje">

            {[
              { label: "Total Wallets", value: wallets.length, icon: <NextImage src="/images/wallet-state.png" width={30} height={20} alt="wallets"/> },
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
                icon: <NextImage src="/solana-pay-logo-small.svg" width={60} height={25} alt="Solana Pay"/>
              }].
              map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background-card/60 rounded-xl p-4 flex items-center space-x-4 border border-border-primary transition-all duration-300 hover:bg-[#00D97E]/10 hover:border-[#00D97E]/50 group"
                  data-oid="stat-item"
                >
                  <div className="text-3xl opacity-100 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
                  <div className="flex-1">
                    <div className="text-sm text-text-secondary truncate">{stat.label}</div>
                    <div className="text-2xl font-bold text-solana-green group-hover:text-[#00D97E] transition-colors">{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>


          <div
            className={`backdrop-blur-xl bg-background-card/40 rounded-2xl border border-border-primary/30 p-4 mb-6 print:bg-white print:border-slate-300 print:mb-4`}
            data-oid="1vb06ac">

            <div
              className="flex flex-col lg:flex-row gap-4 print:hidden"
              data-oid="t2nq-s1">

              {/* Search */}
              <div className="flex-1" data-oid="efv7mf1">
                <label 
                  htmlFor="wallet-search" 
                  className="
                    block 
                    mb-2 
                    text-xs 
                    font-semibold 
                    tracking-wide 
                    uppercase
                    bg-gradient-to-r 
                    from-solana-purple 
                    to-solana-green 
                    bg-clip-text 
                    text-transparent
                  "
                >
                  Search
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-solana-purple/10 to-solana-green/10 opacity-0 group-hover:opacity-50 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
                  <div className="relative">
                    <input
                      id="wallet-search"
                      type="text"
                      placeholder="Search wallets or features..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="
                        relative z-10 
                        w-full 
                        bg-transparent 
                        border 
                        border-solana-purple/30 
                        rounded-xl 
                        px-4 
                        py-2 
                        pl-12 
                        text-text-primary 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-solana-green/50 
                        transition-all 
                        duration-300 
                        group-hover:border-solana-green/50
                        group-hover:text-solana-green
                        pr-8
                      "
                      data-oid="e0a_np0" 
                    />
                    {/* Search Icon */}
                    <div
                      className="
                        pointer-events-none 
                        absolute 
                        inset-y-0 
                        left-4 
                        top-1/2 
                        transform 
                        -translate-y-1/2 
                        text-solana-green
                        font-bold
                      "
                      data-oid="4.n83yy"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 stroke-[3]" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                      </svg>
                                        </div>
                                        </div>
                                    </div>
                                </div>

              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ImportedDropdown 
                  options={platformOptions} 
                  selectedValue={selectedPlatform}
                  onSelect={setSelectedPlatform}
                  placeholder="Platform"
                  label="Platform"
                />
                <ImportedDropdown 
                  options={custodyModelOptions} 
                  selectedValue={selectedCustodyModel}
                  onSelect={setSelectedCustodyModel}
                  placeholder="Custody Model"
                  label="Custody Model"
                />
                <ImportedDropdown 
                  options={featureOptions} 
                  selectedValue={selectedFeature}
                  onSelect={setSelectedFeature}
                  placeholder="Features"
                  label="Features"
                />
                                    </div>
                                    </div>
                                </div>

          {/* Wallet Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2.5"
            data-oid="ys8wlky">

            {filteredWallets.map((wallet, index) =>
              <SolanaWalletCard
                key={wallet.name}
                wallet={wallet}
                index={index}
                isLoaded={isLoaded}
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
                  <div
                    className="text-gray-300 font-medium leading-relaxed"
                    data-oid="vow4nvj">

                    • Multi-Chain support
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