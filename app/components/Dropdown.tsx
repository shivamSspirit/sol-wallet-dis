"use client";

import React from 'react';

export const Dropdown = ({
  options,
  selectedValue,
  onSelect,
  placeholder,
  label
}: {
  options: string[],
  selectedValue: string | null,
  onSelect: (value: string | null) => void,
  placeholder: string,
  label: string
}) => (
  <div className="relative group">
    <label
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
      {label}
    </label>
    <div className="absolute inset-0 bg-gradient-to-r from-solana-purple/10 to-solana-green/10 opacity-0 group-hover:opacity-50 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
    <div className="relative">
      <select
        value={selectedValue || ''}
        onChange={(e) => onSelect(e.target.value || null)}
        className="
          relative z-10 
          w-full 
          bg-transparent 
          border 
          border-solana-purple/30 
          rounded-xl 
          px-4 
          py-2 
          text-text-primary 
          appearance-none 
          focus:outline-none 
          focus:ring-2 
          focus:ring-solana-green/50 
          transition-all 
          duration-300 
          group-hover:border-solana-green/50
          group-hover:text-solana-green
          pr-8 // Add right padding for the arrow
        "
      >
        <option value="" className="bg-background-card text-text-primary">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-background-card text-text-primary"
          >
            {option}
          </option>
        ))}
      </select>
      {/* Custom dropdown arrow */}
      <div className="
        pointer-events-none 
        absolute 
        inset-y-0 
        right-0 
        flex 
        items-center 
        px-2 
        text-solana-green
        font-bold
      ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 stroke-[5]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
); 