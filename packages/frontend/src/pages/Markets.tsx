import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TrendingUp, Clock, DollarSign } from 'lucide-react'
import { USE_MOCK_DATA } from '../config'
import { mockAPI, type Market } from '../services/mockData'

export default function Markets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['markets'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return await mockAPI.getMarkets()
      }
      const response = await axios.get('/api/predictions')
      return response.data.data as Market[]
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-600 dark:text-slate-400 animate-pulse">Loading markets...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600 dark:text-red-400">Error loading markets</div>
      </div>
    )
  }

  const markets = data || []

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Prediction Markets</h1>
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-medium">
          {markets.length} {markets.length === 1 ? 'market' : 'markets'}
        </div>
      </div>

      <div className="grid gap-4">
        {markets.map((market, index) => (
          <Link
            key={market.marketId}
            to={`/markets/${market.marketId}`}
            className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-1"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3 flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-full">
                    {market.platform}
                  </span>
                  {market.aiConfidence && (
                    <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-xs font-medium text-primary-600 dark:text-primary-400 rounded-full border border-primary-200 dark:border-primary-800">
                      AI: {(market.aiConfidence / 100).toFixed(0)}%
                    </span>
                  )}
                  {market.resolved && (
                    <span className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-xs font-medium text-green-600 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                      Resolved
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {market.question}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-700 dark:text-green-300">Yes: {(market.yesPrice / 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400 rotate-180" />
                    <span className="font-medium text-red-700 dark:text-red-300">No: {(market.noPrice / 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>${(market.totalVolume / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center space-x-2">
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
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No markets available at the moment
        </div>
      )}
    </div>
  )
}
