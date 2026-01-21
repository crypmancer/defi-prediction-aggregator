import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'

interface Market {
  marketId: string
  platform: string
  question: string
  endTime: number
  totalVolume: number
  yesPrice: number
  noPrice: number
  resolved: boolean
  aiConfidence?: number
}

export default function Markets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['markets'],
    queryFn: async () => {
      const response = await axios.get('/api/predictions')
      return response.data.data as Market[]
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading markets...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400">Error loading markets</div>
      </div>
    )
  }

  const markets = data || []

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Prediction Markets</h1>
        <div className="text-gray-400">
          {markets.length} {markets.length === 1 ? 'market' : 'markets'}
        </div>
      </div>

      <div className="grid gap-4">
        {markets.map((market) => (
          <Link
            key={market.marketId}
            to={`/markets/${market.marketId}`}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-primary-500 transition cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2 py-1 bg-slate-700 text-xs text-gray-300 rounded">
                    {market.platform}
                  </span>
                  {market.aiConfidence && (
                    <span className="px-2 py-1 bg-primary-900 text-xs text-primary-300 rounded">
                      AI: {(market.aiConfidence / 100).toFixed(0)}%
                    </span>
                  )}
                  {market.resolved && (
                    <span className="px-2 py-1 bg-green-900 text-xs text-green-300 rounded">
                      Resolved
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{market.question}</h3>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>Yes: {(market.yesPrice / 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 rotate-180" />
                    <span>No: {(market.noPrice / 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>${(market.totalVolume / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(market.endTime * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {markets.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No markets available at the moment
        </div>
      )}
    </div>
  )
}
