import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solana Wallet Matrix',
  description: 'Discover and manage Solana wallets with ease',
  
  // Social Media Meta Tags
  openGraph: {
    title: 'Solana Wallet Matrix - Comprehensive Wallet Ecosystem Dashboard',
    description: 'Explore, compare, and discover the best Solana wallets. Find wallets by platform, features, security, and more.',
    url: 'https://solana-wallet-matrix.vercel.app',
    siteName: 'Solana Wallet Matrix',
    images: [
      {
        url: '/images/solana-wallet-matrix-og.png',
        width: 1200,
        height: 630,
        alt: 'Solana Wallet Matrix - Discover Solana Wallets'
      }
    ],
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solana Wallet Matrix - Comprehensive Wallet Ecosystem Dashboard',
    description: 'Explore, compare, and discover the best Solana wallets. Find wallets by platform, features, security, and more.',
    images: ['/images/solana-wallet-matrix-og.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark-900 text-white`}>
                {children}
            </body>
        </html>
    );
}
