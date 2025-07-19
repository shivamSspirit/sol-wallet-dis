"use client";

import React from 'react';
import NextImage from 'next/image';
import { 
  RefreshCcw,
  ImageIcon,
  Lock,
  Wallet,
  Bell,
  Link
} from 'lucide-react';

import { Wallet as WalletType } from './WalletTypes';
import { PlatformIcon } from './Icons';
import { 
  FeatureItem, 
  CustodyBadge, 
  SolanaPayStatus 
} from './FeatureComponents';

const WalletAvatar = ({
  walletName,
  imageUrl,
  bgColor = "bg-gradient-to-br from-blue-500 to-purple-600",
  textColor = "text-white"
}: { 
  walletName: string; 
  imageUrl?: string; 
  bgColor?: string; 
  textColor?: string; 
}) => {
  const getInitial = (name: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden"
      data-oid="0m8tsyl"
    >
      {imageUrl ? (
        <NextImage
          src={imageUrl}
          alt={walletName || "Wallet"}
          fill
          className="object-cover"
          data-oid="1d6sk:p" 
        />
      ) : (
        <div
          className={`w-full h-full rounded-full ${bgColor} ${textColor} flex items-center justify-center font-bold select-none`}
          style={{ fontSize: "2em" }}
          data-oid="q507zf9"
        >
          {getInitial(walletName)}
        </div>
      )}
    </div>
  );
};

export const WalletCard = ({
  wallet,
  index,
  isLoaded
}: { 
  wallet: WalletType; 
  index: number; 
  isLoaded: boolean; 
}) => {
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
      data-oid="dke03ba"
    >
      {/* Creative Background Pattern - Reduced opacity */}
      <div className="absolute inset-0 opacity-2" data-oid="wiuhj1l">
        <div
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-solana-purple/10 to-transparent rounded-full blur-2xl"
          data-oid=":y.up-3"
        ></div>
        <div
          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-solana-green/8 to-transparent rounded-full blur-xl"
          data-oid="9:snh3k"
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-radial from-solana-purple/5 via-transparent to-transparent rounded-full"
          data-oid="3fli1kg"
        ></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 pb-1 flex-shrink-0" data-oid="xf74t3x">
        <div
          className="flex items-center justify-between mb-6"
          data-oid="39fq:cp"
        >
          {/* Left: Avatar */}
          <div className="w-14 h-14 flex-shrink-0" data-oid="i.z--d7">
            <div
              className="w-full h-full rounded-full ring-2 ring-slate-700 shadow bg-slate-900 overflow-hidden relative"
              data-oid="w.zwbjc"
            >
              <WalletAvatar
                walletName={wallet.name}
                imageUrl={wallet.imageLogo}
                bgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
                textColor="text-white"
                data-oid="np5xvm9" 
              />
            </div>
          </div>
          
          {/* Center: Name and badges */}
          <div className="flex-1 min-w-0 px-4" data-oid="_rg9k1a">
            <h3
              className="text-xl md:text-2xl font-bold text-white truncate mb-1 print:text-slate-900 group-hover:text-solana-green/80 transition-colors duration-300 tracking-tight leading-tight"
              data-oid="aocl2mb"
            >
              {wallet.name}
            </h3>
            <div className="flex items-center space-x-2" data-oid="ny.0duz">
              <CustodyBadge custodyModel={wallet.custodyModel} />
            </div>
          </div>
          
          {/* Right: Link icon */}
          <a
            href={wallet.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-300/80 transition-all duration-300 ml-2 flex items-center justify-center group relative"
            title="Open website"
            data-oid="wallet-link"
            style={{ minWidth: 30, minHeight: 30 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 group-hover:text-cyan-300/80 group-hover:drop-shadow-[0_0_5px_rgba(34,211,238,0.3)] transition-all duration-300 ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              data-oid="v-a2bn_"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                data-oid="bgcv:9l" 
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Platforms Section */}
      <div
        className="relative z-10 px-6 pt-1 pb-2 flex-shrink-0"
        data-oid="2.s097g"
      >
        <div
          className="text-xs font-bold text-slate-300/90 mb-2 uppercase tracking-widest"
          data-oid="34vk_oq"
        >
          Platforms
        </div>
        <div
          className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          data-oid="r9lad9o"
        >
          {wallet.platforms.slice(0, 4).map((platform: string) => (
            <PlatformIcon
              key={platform}
              platform={platform}
              data-oid="_iwpoa:" 
            />
          ))}
          {wallet.platforms.length > 4 && (
            <div
              className="px-3 py-1.5 bg-slate-700/80 rounded-lg text-xs text-slate-300 font-medium inline-block"
              data-oid="1g0ankh"
            >
              +{wallet.platforms.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* Solana Pay QR Section */}
      <div
        className="relative z-10 px-6 pt-1 pb-2 mt-2 flex-shrink-0"
        data-oid="hin1omb"
      >
        <div
          className="bg-gradient-to-r from-slate-700/60 to-slate-600/60 border border-slate-600/80 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden"
          data-oid="u.lbe2c"
        >
          <div
            className="relative z-10 flex items-center justify-between"
            data-oid="bv_3nk8"
          >
            <div className="flex items-center space-x-3" data-oid="wf1dfus">
              <div
                className="w-14 h-9 p-2 bg-black rounded-md flex items-center justify-center relative overflow-hidden"
                data-oid="0.v5hsq"
              >
                <span className="relative z-10 text-base" data-oid="qd4cp6k">
                  <NextImage 
                    src="/solana-pay-logo-small.svg" 
                    width={60} 
                    height={25} 
                    alt="Solana Pay" 
                    className="w-16 h-6"
                  />
                </span>
              </div>
              <div data-oid="ux-46yz">
                <div
                  className="text-sm font-bold text-slate-200 tracking-wide"
                  data-oid="ba1wqgv"
                >
                  Solana Pay QR
                </div>
                <div
                  className="text-xs text-slate-400/80 font-medium tracking-wide"
                  data-oid="9:iu4bx"
                >
                  Payment Integration
                </div>
              </div>
            </div>
            <SolanaPayStatus status={wallet.solanaPayQR} data-oid="weeyua2" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div
        className="relative z-10 px-6 pt-1 pb-1 flex-shrink-0"
        data-oid="8:1iwau"
      >
        <div
          className="text-xs font-bold text-slate-300/90 mb-2 uppercase tracking-widest"
          data-oid="8riozi4"
        >
          Features
        </div>
        <div className="grid grid-cols-3 gap-3" data-oid="t7tqh8_">
          <FeatureItem
            icon={RefreshCcw}
            label="DEX"
            enabled={wallet.inAppDexSwap}
            compact
          />
          <FeatureItem
            icon={ImageIcon}
            label="NFT"
            enabled={wallet.nftGallery}
            compact
          />
          <FeatureItem
            icon={Lock}
            label="Stake"
            enabled={wallet.inAppStaking}
            compact
          />
          <FeatureItem
            icon={Wallet}
            label="Fiat"
            enabled={wallet.fiatOnOffRamp}
            compact
          />
          <FeatureItem
            icon={Bell}
            label="Push"
            enabled={wallet.pushNotifications}
            compact
          />
          <FeatureItem
            icon={Link}
            label="Multichain"
            enabled={wallet.multiChain}
            compact
          />
        </div>
      </div>

      {/* Notes Section */}
      <div
        className="relative z-10 px-6 pt-1 pb-2 flex-shrink-0"
        data-oid="mabi7k6"
      >
        <div
          className="bg-slate-700/40 rounded-lg px-1 py-2 border border-slate-600/60 backdrop-blur-sm flex items-center h-8 relative overflow-hidden"
          data-oid="2-kppvu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-5 h-5 mr-1 text-cyan-400 group-hover:text-cyan-300/80 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            data-oid="7xpj.72"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              data-oid="-t6exkd" 
            />
          </svg>
          <div
            className="
              flex 
              flex-row 
              gap-2 
              overflow-x-auto 
              whitespace-nowrap 
              scrollbar-none 
              w-full
            "
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <p
              className="
                relative 
                z-10 
                text-sm 
                text-slate-300/90 
                leading-relaxed 
                inline-block 
                flex-shrink-0 
                font-medium 
                tracking-wide
              "
              data-oid="3iqffc:"
            >
              {wallet.description ||
                `${wallet.name} is a cryptocurrency wallet supporting various features and platforms.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 