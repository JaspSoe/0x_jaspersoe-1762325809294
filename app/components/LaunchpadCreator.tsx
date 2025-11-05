'use client'

import { useState } from 'react'

interface LaunchpadCreatorProps {
  onBack: () => void
}

export default function LaunchpadCreator({ onBack }: LaunchpadCreatorProps) {
  const [step, setStep] = useState(1)
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [twitter, setTwitter] = useState('')
  const [telegram, setTelegram] = useState('')
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentComplete, setDeploymentComplete] = useState(false)
  const [launchpadUrl, setLaunchpadUrl] = useState('')

  const handleDeploy = () => {
    setIsDeploying(true)
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 10)
      setLaunchpadUrl(`https://solana-dapp.io/launch/${randomId}`)
      setIsDeploying(false)
      setDeploymentComplete(true)
    }, 3000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(launchpadUrl)
    alert('Link copied to clipboard!')
  }

  if (deploymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solana-darker via-solana-dark to-solana-darker flex items-center justify-center p-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-solana-green/30 rounded-full blur-3xl animate-float"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center text-4xl animate-bounce">
            ✅
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Launchpad Deployed!
          </h1>
          
          <p className="text-gray-300 mb-8">
            Your memecoin launchpad is now live on Solana. Share the link below to start your launch!
          </p>

          <div className="bg-black/30 rounded-lg p-4 mb-6 flex items-center gap-3">
            <input
              type="text"
              value={launchpadUrl}
              readOnly
              className="flex-1 bg-transparent border-none outline-none text-solana-green font-mono"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-lg bg-solana-purple/20 hover:bg-solana-purple/30 border border-solana-purple/50 transition-all"
            >
              📋 Copy
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold gradient-text mb-1">{tokenName}</div>
              <div className="text-gray-400 text-sm">{tokenSymbol}</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold gradient-text mb-1">{totalSupply}</div>
              <div className="text-gray-400 text-sm">Total Supply</div>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-solana-green mb-1">Active</div>
              <div className="text-gray-400 text-sm">Status</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.open(launchpadUrl, '_blank')}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-bold transition-all"
            >
              🚀 View Launchpad
            </button>
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition-all"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isDeploying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-solana-darker via-solana-dark to-solana-darker flex items-center justify-center p-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-solana-purple/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-md w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-solana-purple to-solana-green flex items-center justify-center text-4xl animate-spin">
            ⚡
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Deploying to Solana...</h2>
          
          <div className="space-y-3 mb-6">
            <DeploymentStep text="Creating SPL Token..." complete />
            <DeploymentStep text="Deploying Smart Contract..." complete />
            <DeploymentStep text="Setting up Launchpad UI..." active />
            <DeploymentStep text="Generating Share Link..." />
          </div>
          
          <p className="text-gray-400 text-sm">This usually takes 30-60 seconds</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-solana-darker via-solana-dark to-solana-darker">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-solana-purple/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-solana-green/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

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
                <h1 className="text-xl font-bold gradient-text">Create Launchpad</h1>
                <p className="text-xs text-gray-400">Step {step} of 3</p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm font-semibold ${step >= 1 ? 'text-solana-green' : 'text-gray-500'}`}>Token Info</span>
            <span className={`text-sm font-semibold ${step >= 2 ? 'text-solana-green' : 'text-gray-500'}`}>Socials</span>
            <span className={`text-sm font-semibold ${step >= 3 ? 'text-solana-green' : 'text-gray-500'}`}>Review</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-solana-purple to-solana-green transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Token Info */}
        {step === 1 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Token Information</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Token Name *</label>
                <input
                  type="text"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  placeholder="e.g., Moon Dog"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Token Symbol *</label>
                <input
                  type="text"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                  placeholder="e.g., MDOG"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all"
                  maxLength={10}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Total Supply *</label>
                <input
                  type="text"
                  value={totalSupply}
                  onChange={(e) => setTotalSupply(e.target.value)}
                  placeholder="e.g., 1000000000"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people about your token..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!tokenName || !tokenSymbol || !totalSupply}
              className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Social Links →
            </button>
          </div>
        )}

        {/* Step 2: Socials */}
        {step === 2 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Social Links</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-2">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourtoken.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Twitter/X</label>
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@yourtoken"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Telegram</label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="https://t.me/yourtoken"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-solana-purple outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-bold transition-all"
              >
                Next: Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Review & Deploy</h2>
            
            <div className="space-y-4 mb-6">
              <ReviewItem label="Token Name" value={tokenName} />
              <ReviewItem label="Symbol" value={tokenSymbol} />
              <ReviewItem label="Total Supply" value={totalSupply} />
              {description && <ReviewItem label="Description" value={description} />}
              {website && <ReviewItem label="Website" value={website} />}
              {twitter && <ReviewItem label="Twitter" value={twitter} />}
              {telegram && <ReviewItem label="Telegram" value={telegram} />}
            </div>

            <div className="p-4 rounded-lg bg-solana-green/10 border border-solana-green/30 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">ℹ️</span>
                <div className="flex-1">
                  <div className="font-semibold text-solana-green mb-1">Ready to Deploy</div>
                  <div className="text-sm text-gray-300">Your launchpad will be deployed to Solana mainnet. This action cannot be undone.</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 font-bold transition-all"
              >
                ← Back
              </button>
              <button
                onClick={handleDeploy}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-solana-purple to-solana-green hover:opacity-90 font-bold transition-all glow-effect"
              >
                🚀 Deploy Now
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function DeploymentStep({ text, complete, active }: { text: string, complete?: boolean, active?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        complete ? 'bg-solana-green' : active ? 'bg-solana-purple animate-pulse' : 'bg-white/10'
      }`}>
        {complete ? '✓' : active ? '⋯' : '○'}
      </div>
      <span className={complete || active ? 'text-white' : 'text-gray-500'}>{text}</span>
    </div>
  )
}

function ReviewItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-start p-3 rounded-lg bg-white/5">
      <span className="text-gray-400">{label}</span>
      <span className="font-semibold text-right ml-4">{value}</span>
    </div>
  )
}