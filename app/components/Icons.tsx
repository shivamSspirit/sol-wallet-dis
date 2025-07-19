"use client";

import React from 'react';
import {
  Smartphone, 
  Chrome, 
  Tablet, 
  Lock, 
  Monitor
} from 'lucide-react';

export const PlatformIcon = ({ platform }: { platform: string }) => {
  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("ios")) return Smartphone;
    if (p.includes("android")) return Tablet;
    if (p.includes("chrome")) return Chrome;
    if (p.includes("edge") || p.includes("brave")) return Monitor;
    if (p.includes("hardware")) return Lock;
    if (p.includes("desktop") || p.includes("windows") || p.includes("mac") || p.includes("linux")) return Monitor;
    return Monitor; // default
  };

  const IconComponent = getIcon(platform);

  return (
    <div
      className="flex items-center space-x-1 px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300 border border-gray-600"
      title={platform}
    >
      <IconComponent size={16} strokeWidth={2} className="mr-1" />
      <span className="truncate max-w-16">{platform}</span>
    </div>
  );
}; 