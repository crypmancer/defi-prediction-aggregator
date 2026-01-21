import { Link } from 'react-router-dom'
import { TrendingUp, Coins, Brain, Shield, Github, Twitter, MessageCircle, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          AI-Enhanced Prediction Markets
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Aggregate prediction markets from multiple platforms, leverage AI for smart betting,
          and earn passive income through yield-generating vaults.
        </p>
        <div className="flex justify-center space-x-4 pt-4">
          <Link
            to="/markets"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
          >
            Explore Markets
          </Link>
          <Link
            to="/vaults"
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition"
          >
            View Vaults
          </Link>
        </div>
        <div className="flex justify-center space-x-4 pt-4">
          <a
            href="https://github.com/crypmancer/defi-prediction-aggregator"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-gray-300 hover:text-white"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/oraclevault"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-gray-300 hover:text-white"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/cryp_mancer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-gray-300 hover:text-white"
            aria-label="Telegram"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href="mailto:crypmancer@gmail.com"
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition text-gray-300 hover:text-white"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <TrendingUp className="h-10 w-10 text-primary-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Market Aggregation</h3>
          <p className="text-gray-400">
            Access prediction markets from Polymarket, Augur, Kalshi, and more in one place.
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <Brain className="h-10 w-10 text-primary-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">AI Analysis</h3>
          <p className="text-gray-400">
            Get AI-powered insights and confidence scores for smarter betting decisions.
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <Coins className="h-10 w-10 text-primary-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Yield Vaults</h3>
          <p className="text-gray-400">
            Earn passive income by depositing into automated prediction market strategies.
          </p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <Shield className="h-10 w-10 text-primary-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Secure & Decentralized</h3>
          <p className="text-gray-400">
            Built on blockchain with smart contracts for transparent and secure operations.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Stats</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400">50+</div>
            <div className="text-gray-400 mt-2">Active Markets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400">$1M+</div>
            <div className="text-gray-400 mt-2">Total Volume</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400">10K+</div>
            <div className="text-gray-400 mt-2">Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}
