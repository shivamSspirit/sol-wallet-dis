"use client";

import React, { useState } from 'react';
import Link from 'next/link';

type WalletCardProps = {
  wallet: {
    name: string;
    description: string;
    features: string[];
    securityLevel: 'low' | 'medium' | 'high';
    website?: string;
  };
};

export function WalletCard({ wallet }: WalletCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getSecurityLevelColor = () => {
    switch (wallet.securityLevel) {
      case 'high': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div 
      className={`
        group relative 
        bg-dark-800 
        rounded-2xl 
        overflow-hidden 
        transition-all 
        duration-500 
        hover:scale-[1.03] 
        hover:rotate-1 
        hover:shadow-2xl 
        hover:shadow-purple-500/20 
        perspective-1000
        w-full  // Ensure full width on mobile
        max-w-md  // Limit maximum width
        mx-auto  // Center on smaller screens
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Gradient Background */}
      <div 
        className={`
          absolute 
          inset-0 
          bg-gradient-to-r 
          from-primary-300 
          to-accent-purple 
          opacity-0 
          group-hover:opacity-30 
          transition-opacity 
          duration-500 
          blur-xl
        `}
      />

      {/* Card Content */}
      <div 
        className={`
          relative 
          z-10 
          p-4  // Reduced padding for mobile
          sm:p-6  // Larger padding on larger screens
          transform 
          transition-transform 
          duration-300 
          ${isHovered ? 'rotate-y-3 rotate-x-2' : ''}
        `}
      >
        {/* Wallet Name */}
        <h3 
          className="
            text-xl  // Smaller on mobile
            sm:text-2xl  // Larger on larger screens
            font-bold 
            text-white 
            mb-3  // Reduced margin
            sm:mb-4  // Larger margin on larger screens
            group-hover:text-accent-neon 
            transition-colors
          "
        >
          {wallet.name}
        </h3>

        {/* Security Level */}
        <div 
          className={`
            inline-block 
            px-2  // Smaller on mobile
            sm:px-3  // Larger on larger screens
            py-1 
            rounded-full 
            text-xs 
            font-semibold 
            mb-3  // Reduced margin
            sm:mb-4  // Larger margin on larger screens
            ${getSecurityLevelColor()}
          `}
        >
          {wallet.securityLevel.toUpperCase()} Security
        </div>

        {/* Description */}
        <p 
          className="
            text-slate-300 
            mb-4  // Reduced margin
            sm:mb-6  // Larger margin on larger screens
            line-clamp-3 
            group-hover:text-white 
            transition-colors
            text-left 
            text-sm  // Smaller font on mobile
            sm:text-base  // Larger font on larger screens
          "
        >
          {wallet.description}
        </p>

        {/* Features */}
        <div className="
          flex 
          flex-wrap 
          gap-2 
          mb-4  // Reduced margin
          sm:mb-6  // Larger margin on larger screens
        ">
          {wallet.features.slice(0, 3).map((feature, index) => (
            <span 
              key={index} 
              className="
                bg-dark-700 
                text-slate-300 
                px-2 
                py-1 
                rounded-md 
                text-xs 
                group-hover:bg-accent-purple 
                group-hover:text-white 
                transition-colors
              "
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="
          flex 
          flex-col  // Stack vertically on mobile
          sm:flex-row  // Side by side on larger screens
          justify-between 
          items-start  // Align to start
          sm:items-center  // Center on larger screens
          space-y-2  // Vertical spacing on mobile
          sm:space-y-0  // Remove vertical spacing on larger screens
          sm:space-x-2  // Horizontal spacing on larger screens
        ">
          {wallet.website && (
            <Link 
              href={wallet.website} 
              target="_blank" 
              className="
                text-slate-400 
                hover:text-accent-neon 
                transition-colors 
                flex 
                items-center 
                group
                w-full  // Full width on mobile
                sm:w-auto  // Auto width on larger screens
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="
                  w-5  // Smaller on mobile
                  sm:w-6  // Larger on larger screens
                  h-5 
                  sm:h-6 
                  group-hover:scale-110 
                  group-hover:rotate-6 
                  transition-transform
                " 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
              <span className="sm:hidden ml-2">Visit Website</span>
            </Link>
          )}
          
          <button 
            className="
              bg-accent-purple 
              text-white 
              px-3  // Smaller on mobile
              sm:px-4  // Larger on larger screens
              py-2 
              rounded-lg 
              hover:bg-accent-neon 
              transition-colors 
              group-hover:opacity-100 
              opacity-0
              w-full  // Full width on mobile
              sm:w-auto  // Auto width on larger screens
            "
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
} 