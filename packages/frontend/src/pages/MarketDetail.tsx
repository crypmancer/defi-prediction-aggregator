import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { TrendingUp, Clock, DollarSign, Brain } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { USE_MOCK_DATA } from '../config'
import { mockAPI, type Market } from '../services/mockData'

export default function MarketDetail() {
  const { marketId } = useParams()
  const { isConnected } = useWallet()
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
    return <div className="text-center py-12 text-gray-400">Loading market...</div>
  }

  if (!market) {
    return <div className="text-center py-12 text-red-400">Market not found</div>
  }

  const handleBet = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    if (!betSide || !betAmount) {
      alert('Please select a side and enter an amount')
      return
    }
    // In production, this would interact with the smart contract
    alert(`Bet placed: ${betSide} ${betAmount}`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <span className="px-3 py-1 bg-slate-700 text-sm text-gray-300 rounded">
            {market.platform}
          </span>
          {market.resolved && (
            <span className="px-3 py-1 bg-green-900 text-sm text-green-300 rounded">
              {market.outcome ? 'Yes' : 'No'}
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">{market.question}</h1>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-400">
            <DollarSign className="h-4 w-4" />
            <span>Volume: ${(market.totalVolume / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Ends: {new Date(market.endTime * 1000).toLocaleString()}</span>
          </div>
          {market.aiConfidence && (
            <div className="flex items-center space-x-2 text-primary-400">
              <Brain className="h-4 w-4" />
              <span>AI Confidence: {(market.aiConfidence / 100).toFixed(0)}%</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Market Prices */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Market Prices</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-white font-medium">Yes</span>
              </div>
              <span className="text-2xl font-bold text-green-400">
                {(market.yesPrice / 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-700 rounded">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-red-400 rotate-180" />
                <span className="text-white font-medium">No</span>
              </div>
              <span className="text-2xl font-bold text-red-400">
                {(market.noPrice / 100).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        {aiAnalysis && (
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary-400" />
              <span>AI Analysis</span>
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Confidence</span>
                  <span className="text-primary-400 font-semibold">
                    {(aiAnalysis.confidence / 100).toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full"
                    style={{ width: `${aiAnalysis.confidence / 100}%` }}
                  />
                </div>
              </div>
              <div>
                <span className="text-gray-400">Recommendation: </span>
                <span className="text-white font-semibold capitalize">
                  {aiAnalysis.recommendation}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Risk Level: </span>
                <span className="text-white font-semibold capitalize">
                  {aiAnalysis.riskLevel}
                </span>
              </div>
              <p className="text-gray-300 text-sm mt-3">{aiAnalysis.reasoning}</p>
            </div>
          </div>
        )}
      </div>

      {/* Betting Interface */}
      {!market.resolved && (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4">Place a Bet</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setBetSide('yes')}
                className={`flex-1 p-4 rounded-lg border-2 transition ${
                  betSide === 'yes'
                    ? 'border-green-500 bg-green-900/20'
                    : 'border-slate-600 hover:border-green-500'
                }`}
              >
                <div className="text-green-400 font-semibold">Yes</div>
                <div className="text-gray-400 text-sm">{(market.yesPrice / 100).toFixed(2)}%</div>
              </button>
              <button
                onClick={() => setBetSide('no')}
                className={`flex-1 p-4 rounded-lg border-2 transition ${
                  betSide === 'no'
                    ? 'border-red-500 bg-red-900/20'
                    : 'border-slate-600 hover:border-red-500'
                }`}
              >
                <div className="text-red-400 font-semibold">No</div>
                <div className="text-gray-400 text-sm">{(market.noPrice / 100).toFixed(2)}%</div>
              </button>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Amount</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <button
              onClick={handleBet}
              disabled={!isConnected || !betSide || !betAmount}
              className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
            >
              {isConnected ? 'Place Bet' : 'Connect Wallet to Bet'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
