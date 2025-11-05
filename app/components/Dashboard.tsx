'use client'

import { useState } from 'react'

interface DashboardProps {
  onBack: () => void
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d' | 'all'>('7d')

  const launches = [
    { name: 'MoonDog', symbol: 'MDOG', volume: '$234.5K', holders: 1247, change: '+234%', status: 'active', time: '2h ago' },
    { name: 'SolPepe', symbol: 'SOLP', volume: '$189.2K', holders: 892, change: '+156%', status: 'active', time: '5h ago' },
    { name: 'RocketCat', symbol: 'RCAT', volume: '$145.8K', holders: 634, change: '+98%', status: 'active', time: '8h ago' },
    { name: 'DiamondHands', symbol: 'DMDH', volume: '$98.3K', holders: 421, change: '+67%', status: 'active', time: '12h ago' },
    { name: 'ShibaSol', symbol: 'SHSL', volume: '$76.4K', holders: 356, change: '+45%', status: 'active', time: '1d ago' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-solana-darker via-solana-dark to-solana-darker">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-solana-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-solana-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-white/10 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold gradient-text">Analytics Dashboard</h1>
                <p className="text-xs text-gray-400">Real-time launchpad metrics</p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Volume"
            value="$12.4M"
            change="+23.5%"
            icon="💰"
            color="purple"
          />
          <StatCard
            title="Active Launches"
            value="127"
            change="+12.3%"
            icon="🚀"
            color="green"
          />
          <StatCard
            title="Total Holders"
            value="8,932"
            change="+34.7%"
            icon="👥"
            color="blue"
          />
          <StatCard
            title="Avg. ROI"
            value="156%"
            change="+8.2%"
            icon="📈"
            color="pink"
          />
        </div>

        {/* Timeframe Selector */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Recent Launches</h2>
          <div className="flex gap-2 bg-white/5 rounded-lg p-1">
            {(['24h', '7d', '30d', 'all'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-gradient-to-r from-solana-purple to-solana-green text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf === 'all' ? 'All' : tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Launches Table */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Token
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Volume
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Holders
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {launches.map((launch, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center font-bold">
                          {launch.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold">{launch.name}</div>
                          <div className="text-sm text-gray-400">{launch.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">
                      {launch.volume}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {launch.holders.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-solana-green font-semibold">
                        {launch.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-solana-green/20 text-solana-green text-xs font-semibold">
                        {launch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                      {launch.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <ChartCard title="Volume Trends" />
          <ChartCard title="Holder Growth" />
        </div>
      </main>
    </div>
  )
}

function StatCard({ title, value, change, icon, color }: { title: string, value: string, change: string, icon: string, color: string }) {
  const colorClasses = {
    purple: 'from-solana-purple/20 to-transparent border-solana-purple/30',
    green: 'from-solana-green/20 to-transparent border-solana-green/30',
    blue: 'from-blue-500/20 to-transparent border-blue-500/30',
    pink: 'from-pink-500/20 to-transparent border-pink-500/30',
  }

  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} backdrop-blur-sm border`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <span className="text-solana-green text-sm font-semibold">{change}</span>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{title}</div>
    </div>
  )
}

function ChartCard({ title }: { title: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center bg-white/5 rounded-lg">
        <div className="text-center text-gray-400">
          <div className="text-4xl mb-2">📊</div>
          <div>Chart visualization</div>
        </div>
      </div>
    </div>
  )
}