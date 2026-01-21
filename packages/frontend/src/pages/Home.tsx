import { Link } from 'react-router-dom'
import { TrendingUp, Coins, Brain, Shield, Github, Twitter, MessageCircle, Mail } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-16 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-6 relative">
        {/* Gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl -z-10" />
        
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 dark:from-primary-400 dark:via-primary-300 dark:to-primary-200 bg-clip-text text-transparent animate-fade-in">
            AI-Enhanced Prediction Markets
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Aggregate prediction markets from multiple platforms, leverage AI for smart betting,
            and earn passive income through yield-generating vaults.
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 pt-4">
          <Link
            to="/markets"
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 hover:scale-105 active:scale-95"
          >
            Explore Markets
          </Link>
          <Link
            to="/vaults"
            className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            View Vaults
          </Link>
        </div>
        
        <div className="flex justify-center space-x-4 pt-4">
          <a
            href="https://github.com/crypmancer/defi-prediction-aggregator"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://twitter.com/oraclevault"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="https://t.me/cryp_mancer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Telegram"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
          <a
            href="mailto:crypmancer@gmail.com"
            className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl group-hover:bg-primary-500/30 transition-colors" />
            <TrendingUp className="h-10 w-10 text-primary-500 dark:text-primary-400 relative z-10" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Market Aggregation</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Access prediction markets from Polymarket, Augur, Kalshi, and more in one place.
          </p>
        </div>
        <div className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl group-hover:bg-primary-500/30 transition-colors" />
            <Brain className="h-10 w-10 text-primary-500 dark:text-primary-400 relative z-10" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">AI Analysis</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Get AI-powered insights and confidence scores for smarter betting decisions.
          </p>
        </div>
        <div className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl group-hover:bg-primary-500/30 transition-colors" />
            <Coins className="h-10 w-10 text-primary-500 dark:text-primary-400 relative z-10" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Yield Vaults</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Earn passive income by depositing into automated prediction market strategies.
          </p>
        </div>
        <div className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-primary-500/20 rounded-lg blur-xl group-hover:bg-primary-500/30 transition-colors" />
            <Shield className="h-10 w-10 text-primary-500 dark:text-primary-400 relative z-10" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Secure & Decentralized</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Built on blockchain with smart contracts for transparent and secure operations.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Platform Stats</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-primary-50/50 dark:bg-primary-900/20">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">50+</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Active Markets</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary-50/50 dark:bg-primary-900/20">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">$1M+</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Total Volume</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary-50/50 dark:bg-primary-900/20">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">10K+</div>
            <div className="text-slate-600 dark:text-slate-400 mt-2 font-medium">Users</div>
          </div>
        </div>
      </div>
    </div>
  )
}
