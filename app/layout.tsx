import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Solana Wallet Matrix',
  description: 'Discover and manage Solana wallets with ease',
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
  )
}
