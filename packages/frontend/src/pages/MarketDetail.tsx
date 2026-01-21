import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TrendingUp, Clock, DollarSign, Brain } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useToast } from '../contexts/ToastContext'
import { USE_MOCK_DATA } from '../config'
import { mockAPI, type Market } from '../services/mockData'

export default function MarketDetail() {
  const { marketId } = useParams()
  const { isConnected } = useWallet()
  const toast = useToast()
  const [betSide, setBetSide] = useState<'yes' | 'no' | null>(null)
  const [betAmount, setBetAmount] = useState('')

  const { data: market, isLoading } = useQuery({
    queryKey: ['market', marketId],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return await mockAPI.getMarket(marketId!)
      }
      const response = await axios.get(`/api/predictions/${marketId}`)
      return response.data.data as Market
    },
    enabled: !!marketId,
    refetchInterval: 10000,
  })

  const { data: aiAnalysis } = useQuery({
    queryKey: ['ai-analysis', marketId],
    queryFn: async () => {
      if (!market) return null
      if (USE_MOCK_DATA) {
        return await mockAPI.analyzeMarket(marketId!, market)
      }
      const response = await axios.post('/api/ai/analyze', {
        marketId,
        marketData: market,
      })
      return response.data.data
    },
    enabled: !!marketId && !!market,
  })

  if (isLoading) {
    return <div className="text-center py-12 text-slate-600 dark:text-slate-400 animate-pulse">Loading market...</div>
  }

  if (!market) {
    return <div className="text-center py-12 text-red-600 dark:text-red-400">Market not found</div>
  }

  const handleBet = async () => {
    if (!isConnected) {
      toast.warning('Please connect your wallet first')
      return
    }
    if (!betSide || !betAmount) {
      toast.warning('Please select a side and enter an amount')
      return
    }
    // In production, this would interact with the smart contract
    toast.success(`Bet placed: ${betSide} ${betAmount}`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center space-x-2 mb-4 flex-wrap gap-2">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 rounded-full">
            {market.platform}
          </span>
          {market.resolved && (
            <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-sm font-medium text-green-700 dark:text-green-300 rounded-full border border-green-200 dark:border-green-800">
              {market.outcome ? 'Yes' : 'No'}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{market.question}</h1>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <DollarSign className="h-4 w-4" />
            <span>Volume: <strong className="text-slate-900 dark:text-white">${(market.totalVolume / 1000).toFixed(0)}K</strong></span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
            <Clock className="h-4 w-4" />
            <span>Ends: <strong className="text-slate-900 dark:text-white">{new Date(market.endTime * 1000).toLocaleString()}</strong></span>
          </div>
          {market.aiConfidence && (
            <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
              <Brain className="h-4 w-4" />
              <span>AI Confidence: <strong className="font-semibold">{(market.aiConfidence / 100).toFixed(0)}%</strong></span>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Market Prices */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Market Prices</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-50/50 dark:from-green-900/20 dark:to-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-slate-900 dark:text-white font-medium">Yes</span>
              </div>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {(market.yesPrice / 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-900/20 dark:to-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400 rotate-180" />
                <span className="text-slate-900 dark:text-white font-medium">No</span>
              </div>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                {(market.noPrice / 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        {aiAnalysis && (
          <div className="bg-gradient-to-br from-white to-primary-50/30 dark:from-slate-800 dark:to-primary-900/20 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
              <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Brain className="h-5 w-5 text-primary-600 dark:text-primary-400" />
              </div>
              <span>AI Analysis</span>
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Confidence</span>
                  <span className="text-primary-600 dark:text-primary-400 font-bold">
                    {(aiAnalysis.confidence / 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${aiAnalysis.confidence / 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 pt-2">
                <div>
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Recommendation: </span>
                  <span className={`font-bold capitalize px-2 py-1 rounded ${
                    aiAnalysis.recommendation === 'yes' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : aiAnalysis.recommendation === 'no'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {aiAnalysis.recommendation}
                  </span>
                </div>
                <div>
                  <span className="text-slate-600 dark:text-slate-400 text-sm">Risk: </span>
                  <span className="text-slate-900 dark:text-white font-semibold capitalize">
                    {aiAnalysis.riskLevel}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{aiAnalysis.reasoning}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Betting Interface */}
      {!market.resolved && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Place a Bet</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setBetSide('yes')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                  betSide === 'yes'
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 shadow-md'
                    : 'border-slate-300 dark:border-slate-600 hover:border-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/20'
                }`}
              >
                <div className={`font-semibold ${betSide === 'yes' ? 'text-green-700 dark:text-green-300' : 'text-green-600 dark:text-green-400'}`}>Yes</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">{(market.yesPrice / 100).toFixed(2)}%</div>
              </button>
              <button
                onClick={() => setBetSide('no')}
                className={`flex-1 p-4 rounded-xl border-2 transition-all duration-200 ${
                  betSide === 'no'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30 shadow-md'
                    : 'border-slate-300 dark:border-slate-600 hover:border-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20'
                }`}
              >
                <div className={`font-semibold ${betSide === 'no' ? 'text-red-700 dark:text-red-300' : 'text-red-600 dark:text-red-400'}`}>No</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm mt-1">{(market.noPrice / 100).toFixed(2)}%</div>
              </button>
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Amount</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>
            <button
              onClick={handleBet}
              disabled={!isConnected || !betSide || !betAmount}
              className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
            >
              {isConnected ? 'Place Bet' : 'Connect Wallet to Bet'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
