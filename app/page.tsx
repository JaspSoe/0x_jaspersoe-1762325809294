'use client'

import { useState, useEffect, useRef } from 'react'
import Dashboard from './components/Dashboard'
import LaunchpadCreator from './components/LaunchpadCreator'
import MyDapps from './components/MyDapps'

export default function Home() {
  const [view, setView] = useState<'home' | 'dashboard' | 'creator' | 'mydapps'>('home')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isTwitterConnected, setIsTwitterConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const connectWallet = () => {
    const mockAddress = 'Sol' + Math.random().toString(36).substring(2, 15)
    setWalletAddress(mockAddress)
    setIsWalletConnected(true)
  }

  const connectTwitter = () => {
    const mockHandle = '@user' + Math.floor(Math.random() * 10000)
    setTwitterHandle(mockHandle)
    setIsTwitterConnected(true)
  }

  const disconnectWallet = () => {
    setWalletAddress('')
    setIsWalletConnected(false)
  }

  if (view === 'dashboard') {
    return <Dashboard onBack={() => setView('home')} />
  }

  if (view === 'creator') {
    return <LaunchpadCreator onBack={() => setView('home')} />
  }

  if (view === 'mydapps') {
    return <MyDapps onBack={() => setView('home')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solana-darker via-solana-dark to-solana-darker">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-solana-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-solana-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center glow-effect">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Solana dApp Factory</h1>
                <p className="text-xs text-gray-400">AI-Powered Launch Platform</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-3">
              {!isTwitterConnected ? (
                <button
                  onClick={connectTwitter}
                  className="px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 transition-all"
                >
                  Connect 𝕏
                </button>
              ) : (
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-400">
                  {twitterHandle}
                </div>
              )}
              
              {!isWalletConnected ? (
                <button
                  onClick={connectWallet}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-semibold transition-all glow-effect"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={disconnectWallet}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-semibold transition-all"
                >
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 space-y-2 pb-4">
              {!isTwitterConnected ? (
                <button
                  onClick={() => {
                    connectTwitter()
                    setShowMobileMenu(false)
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 transition-all"
                >
                  Connect 𝕏
                </button>
              ) : (
                <div className="w-full px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-400 text-center">
                  {twitterHandle}
                </div>
              )}
              
              {!isWalletConnected ? (
                <button
                  onClick={() => {
                    connectWallet()
                    setShowMobileMenu(false)
                  }}
                  className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-semibold transition-all"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={() => {
                    disconnectWallet()
                    setShowMobileMenu(false)
                  }}
                  className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-semibold transition-all"
                >
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </button>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-solana-purple/20 text-solana-purple border border-solana-purple/50 text-sm font-semibold">
              🤖 AI-Powered dApp Generator
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Create Solana dApps
            <br />
            <span className="gradient-text">With AI Bot Commands</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Launch your memecoin launchpad in minutes. Just chat with our AI bot, authenticate with 𝕏, and deploy instantly on Solana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setView('creator')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-bold text-lg transition-all glow-effect"
            >
              🚀 Create Launchpad
            </button>
            <button
              onClick={() => setView('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm font-bold text-lg transition-all border border-white/20"
            >
              📊 View Dashboard
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard
            icon="🤖"
            title="AI Bot Interface"
            description="Simply type commands like '/create launchpad' and let our AI handle the rest"
            gradient="from-solana-purple/20 to-transparent"
          />
          <FeatureCard
            icon="⚡"
            title="Instant Deployment"
            description="Deploy your memecoin launchpad to Solana in under 60 seconds"
            gradient="from-solana-green/20 to-transparent"
          />
          <FeatureCard
            icon="🔐"
            title="𝕏 Authentication"
            description="Secure login with your Twitter/X account for verified identity"
            gradient="from-blue-500/20 to-transparent"
          />
          <FeatureCard
            icon="💎"
            title="Token Creation"
            description="Create SPL tokens with customizable supply, metadata, and branding"
            gradient="from-purple-500/20 to-transparent"
          />
          <FeatureCard
            icon="🌐"
            title="Shareable Links"
            description="Get instant shareable URLs for your launchpad to distribute widely"
            gradient="from-pink-500/20 to-transparent"
          />
          <FeatureCard
            icon="📈"
            title="Real-time Analytics"
            description="Track launches, holders, volume, and engagement in real-time"
            gradient="from-orange-500/20 to-transparent"
          />
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
              onClick={() => setView('creator')}
              title="New Launchpad"
              icon="🚀"
              color="purple"
            />
            <ActionCard
              onClick={() => setView('mydapps')}
              title="My dApps"
              icon="📱"
              color="green"
            />
            <ActionCard
              onClick={() => setView('dashboard')}
              title="Analytics"
              icon="📊"
              color="blue"
            />
            <ActionCard
              onClick={() => alert('Coming Soon: Browse trending launchpads')}
              title="Explore"
              icon="🔍"
              color="pink"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <StatCard number="1,247" label="dApps Created" />
          <StatCard number="$12.4M" label="Total Volume" />
          <StatCard number="8,932" label="Active Users" />
          <StatCard number="34,291" label="Tokens Launched" />
        </div>

        {/* Bot Command Examples */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Try These Commands</h2>
          <div className="space-y-3">
            <CommandExample command="/create launchpad" description="Start creating a new memecoin launchpad" />
            <CommandExample command="/deploy MyToken" description="Deploy your token to Solana mainnet" />
            <CommandExample command="/analytics" description="View your launchpad performance" />
            <CommandExample command="/share" description="Get shareable link for your dApp" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl bg-black/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Solana dApp Factory. Powered by AI & Solana.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-solana-green transition-colors">Docs</a>
              <a href="#" className="text-gray-400 hover:text-solana-green transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-solana-green transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-solana-green transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, gradient }: { icon: string, title: string, description: string, gradient: string }) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all hover:scale-105`}>
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function ActionCard({ onClick, title, icon, color }: { onClick: () => void, title: string, icon: string, color: string }) {
  const colorClasses = {
    purple: 'from-solana-purple/20 to-solana-purple/5 border-solana-purple/30 hover:border-solana-purple/50',
    green: 'from-solana-green/20 to-solana-green/5 border-solana-green/30 hover:border-solana-green/50',
    blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-500/50',
    pink: 'from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-500/50',
  }

  return (
    <button
      onClick={onClick}
      className={`p-6 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm border transition-all hover:scale-105 text-left`}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <div className="font-bold">{title}</div>
    </button>
  )
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
      <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{number}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function CommandExample({ command, description }: { command: string, description: string }) {
  return (
    <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-solana-green/50 transition-all group cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-solana-green/20 flex items-center justify-center group-hover:bg-solana-green/30 transition-colors">
          <span className="text-solana-green">$</span>
        </div>
        <div className="flex-1">
          <div className="font-mono text-solana-green mb-1">{command}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
      </div>
    </div>
  )
}