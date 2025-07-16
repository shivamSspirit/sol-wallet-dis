import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d7ff',
          300: '#4fa5ff',
          500: '#0066cc',
          700: '#004080'
        },
        accent: {
          neon: '#00ffff',
          purple: '#7e3af2',
        },
        dark: {
          900: '#0a0a1a',
          800: '#121229',
          700: '#1a1a3a'
        }
      },
      fontFamily: {
        web3: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 
            'background-position': '0% 50%'
          },
          '50%': { 
            'background-position': '100% 50%'
          }
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(126, 58, 242, 0.4)',
        'glow': '0 0 20px rgba(0, 255, 255, 0.3)'
      },
      perspective: {
        '1000': '1000px',
      },
      transformOrigin: {
        'center-top': 'center top',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // or 'base' depending on your preference
    }),
  ],
}

export default config
