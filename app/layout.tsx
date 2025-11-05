import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Solana dApp Factory - AI-Powered Memecoin Launchpad',
  description: 'Generate and deploy Solana memecoin launchpads instantly with AI-powered bot commands',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-solana-darker text-white antialiased">
        {children}
      </body>
    </html>
  )
}