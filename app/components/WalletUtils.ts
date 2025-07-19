export const getCategoryFromPlatforms = (platforms: string | undefined): string => {
  if (!platforms) return "other";
  const platformStr = platforms.toLowerCase();
  if (platformStr.includes("hardware")) {
    return "hardware";
  }
  if (
    platformStr.includes("chrome") ||
    platformStr.includes("firefox") ||
    platformStr.includes("edge")
  ) {
    return "browser";
  }
  if (platformStr.includes("ios") || platformStr.includes("android")) {
    return "mobile";
  }
  if (platformStr.includes("desktop")) {
    return "desktop";
  }
  return "other";
};

export const getWalletLogo = (name: string): string => {
  const logoMap: { [key: string]: string } = {
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
    Trezor: "🔑",
    SafePal: "💳",
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

export const getSecurityLevel = (category: string): string => {
  if (category === "Cold Wallet") return "High";
  if (category === "Hot Wallet") return "Medium";
  return "Medium";
};

export const getPopularityScore = (name: string): number => {
  const popularityMap: { [key: string]: number } = {
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