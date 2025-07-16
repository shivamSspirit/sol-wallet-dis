"use client";

import React, { useState } from 'react';
import { useWalletSearch } from '@/lib/hooks/useWalletSearch';

const FEATURE_OPTIONS = [
  'Multi-Chain', 
  'NFT Support', 
  'Staking', 
  'DEX Swap'
];

const CATEGORY_OPTIONS = [
  'Browser', 
  'Mobile', 
  'Desktop', 
  'Hardware'
];

export function WalletSearch({ initialWallets }) {
  const { wallets, searchParams, updateSearch } = useWalletSearch(initialWallets);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

  return (
    <div className="bg-dark-800 rounded-2xl p-6 mb-8">
      <div className="flex items-center space-x-4 mb-6">
        {/* Main Search Input */}
        <div className="flex-grow relative">
          <input 
            type="text" 
            placeholder="Search wallets..."
            value={searchParams.query}
            onChange={(e) => updateSearch({ query: e.target.value })}
            className="
              w-full 
              bg-dark-700 
              text-white 
              rounded-lg 
              px-4 
              py-3 
              focus:ring-2 
              focus:ring-accent-purple 
              transition-all
            "
          />
          <svg 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            width="24" 
            height="24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>

        {/* Advanced Search Toggle */}
        <button 
          onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
          className="
            bg-accent-purple 
            text-white 
            px-4 
            py-3 
            rounded-lg 
            hover:bg-accent-neon 
            transition-colors
          "
        >
          {isAdvancedSearchOpen ? 'Close' : 'Advanced'}
        </button>
      </div>

      {/* Advanced Search Filters */}
      {isAdvancedSearchOpen && (
        <div 
          className="
            grid 
            grid-cols-1 
            md:grid-cols-3 
            gap-4 
            bg-dark-700 
            rounded-lg 
            p-6 
            animate-fade-in
          "
        >
          {/* Category Filter */}
          <div>
            <h4 className="text-white mb-3">Category</h4>
            <div className="space-y-2">
              {CATEGORY_OPTIONS.map(category => (
                <label 
                  key={category} 
                  className="flex items-center space-x-2 text-slate-300"
                >
                  <input 
                    type="checkbox" 
                    checked={searchParams.filters.category === category.toLowerCase()}
                    onChange={() => updateSearch({ 
                      filters: { 
                        ...searchParams.filters, 
                        category: category.toLowerCase() 
                      } 
                    })}
                    className="
                      text-accent-purple 
                      focus:ring-accent-neon 
                      rounded
                    "
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Features Filter */}
          <div>
            <h4 className="text-white mb-3">Features</h4>
            <div className="space-y-2">
              {FEATURE_OPTIONS.map(feature => (
                <label 
                  key={feature} 
                  className="flex items-center space-x-2 text-slate-300"
                >
                  <input 
                    type="checkbox" 
                    checked={searchParams.filters.features.includes(feature)}
                    onChange={() => {
                      const currentFeatures = searchParams.filters.features;
                      const newFeatures = currentFeatures.includes(feature)
                        ? currentFeatures.filter(f => f !== feature)
                        : [...currentFeatures, feature];
                      
                      updateSearch({ 
                        filters: { 
                          ...searchParams.filters, 
                          features: newFeatures 
                        } 
                      });
                    }}
                    className="
                      text-accent-purple 
                      focus:ring-accent-neon 
                      rounded
                    "
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Security Level Filter */}
          <div>
            <h4 className="text-white mb-3">Security Level</h4>
            <div className="space-y-2">
              {['Low', 'Medium', 'High'].map(level => (
                <label 
                  key={level} 
                  className="flex items-center space-x-2 text-slate-300"
                >
                  <input 
                    type="radio" 
                    name="securityLevel"
                    checked={searchParams.filters.securityLevel === level.toLowerCase()}
                    onChange={() => updateSearch({ 
                      filters: { 
                        ...searchParams.filters, 
                        securityLevel: level.toLowerCase() as 'low' | 'medium' | 'high' 
                      } 
                    })}
                    className="
                      text-accent-purple 
                      focus:ring-accent-neon 
                      rounded-full
                    "
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="mt-6">
        <p className="text-slate-400 mb-4">
          Found {wallets.length} wallets
        </p>
      </div>
    </div>
  );
} 