"use client";

import React from 'react';
import {
  RefreshCcw,
  ImageIcon,
  Lock,
  Wallet,
  Bell,
  Link
} from 'lucide-react';

// Shared utility function for generating styles
const getColorStyles = (type: 'custody' | 'status', value: string) => {
  const stylesMap = {
    custody: {
      'self-custody': "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      'mpc': "bg-amber-500/20 text-amber-300 border-amber-500/30",
      'custodial': "bg-blue-500/20 text-blue-300 border-blue-500/30",
      'default': "bg-red-500/20 text-red-300 border-red-500/30"
    },
    status: {
      'yes': "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      'partial': "bg-amber-500/20 text-amber-300 border-amber-500/30",
      'default': "bg-red-500/20 text-red-300 border-red-500/30"
    }
  } as const;

  const styles = stylesMap[type];
  const normalizedValue = value.toLowerCase();
  return (styles as Record<string, string>)[normalizedValue] || styles['default'];
};

export const FeatureItem = ({
  icon: Icon, 
  label,
  enabled,
  compact = false
}: { 
  icon: React.ComponentType<any>, 
  label: string, 
  enabled: boolean, 
  compact?: boolean 
}) => {
  // Common styles for enabled and disabled states
  const getBaseStyles = (isEnabled: boolean) => `
    flex items-center justify-center 
    p-2 rounded-lg text-center 
    transition-all duration-300 
    ${isEnabled 
      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30" 
      : "bg-gray-700/50 text-gray-500 border border-gray-600 hover:bg-gray-700/60"}
  `;

  // Compact version with icon and label
  if (compact) {
    return (
      <div 
        className={getBaseStyles(enabled)}
        title={`${label} ${enabled ? 'Supported' : 'Not Supported'}`}
      >
        <div className="flex items-center space-x-2">
          <Icon 
            size={16} 
            strokeWidth={2}
            className={enabled ? "text-emerald-300" : "text-gray-500"} 
          />
          <span className="text-xs font-medium leading-tight">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // Expanded version with more detailed representation
  return (
    <div 
      className="flex items-center justify-between py-2 group" 
      data-oid="i7x98ra"
    >
      <div className="flex items-center space-x-3" data-oid="28lhl95">
        <Icon 
          size={16} 
          strokeWidth={2}
          className={`
            ${enabled ? "text-emerald-400" : "text-gray-500"}
            transition-colors duration-300 
            group-hover:scale-110
          `}
        />
        <span 
          className={`
            text-sm 
            ${enabled ? "text-white" : "text-gray-400"}
            transition-colors duration-300
            group-hover:text-emerald-300
          `}
          data-oid="0.lt8se"
        >
          {label}
        </span>
      </div>
      <span
        className={`
          text-sm 
          ${enabled ? "text-emerald-400" : "text-gray-500"}
          transition-all duration-300
          group-hover:scale-110
        `}
        data-oid="lrfati2"
      >
        {enabled ? "✅" : "❌"}
      </span>
    </div>
  );
};

export const CustodyBadge = ({ custodyModel }: { custodyModel: string }) => {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-medium border ${getColorStyles('custody', custodyModel)}`}
      data-oid="o9:y::9"
    >
      {custodyModel}
    </span>
  );
};

export const SolanaPayStatus = ({ status }: { status: string }) => {
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold border ${getColorStyles('status', status)}`}
      data-oid="8d61n8w"
    >
      {status}
    </span>
  );
}; 