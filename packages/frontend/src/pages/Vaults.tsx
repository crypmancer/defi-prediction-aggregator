import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Coins, TrendingUp, Lock } from 'lucide-react'
import { USE_MOCK_DATA } from '../config'
import { mockAPI, type Vault } from '../services/mockData'

export default function Vaults() {
  const { data: vaults, isLoading, error } = useQuery({
    queryKey: ['vaults'],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return await mockAPI.getVaults()
      }
      const response = await axios.get('/api/vaults')
      return response.data.data as Vault[]
    },
    refetchInterval: 30000,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-slate-600 dark:text-slate-400 animate-pulse">Loading vaults...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600 dark:text-red-400">Error loading vaults</div>
      </div>
    )
  }

  const formatTokenAmount = (amount: string) => {
    const num = parseFloat(amount) / 1e18
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toFixed(2)
  }

  const calculateAPY = (vault: Vault) => {
    // Mock APY calculation - in production, this would be based on historical performance
    return 12.5
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Yield Vaults</h1>
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 font-medium">
          {vaults?.length || 0} {vaults?.length === 1 ? 'vault' : 'vaults'}
        </div>
      </div>

      <div className="grid gap-6">
        {vaults?.map((vault, index) => {
          const apy = calculateAPY(vault)
          const totalAssets = formatTokenAmount(vault.totalAssets)
          const utilization = parseFloat(vault.vaultCap) > 0
            ? (parseFloat(vault.totalAssets) / parseFloat(vault.vaultCap)) * 100
            : 0

          return (
            <Link
              key={vault.address}
              to={`/vaults/${vault.address}`}
              className="group bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-1"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <Coins className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Prediction Market Vault</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Total Assets</div>
                      <div className="text-slate-900 dark:text-white font-bold text-lg">{totalAssets} tokens</div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Estimated APY</div>
                      <div className="text-green-600 dark:text-green-400 font-bold text-lg flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{apy}%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <div className="text-slate-600 dark:text-slate-400 text-sm mb-1">Fees</div>
                      <div className="text-slate-900 dark:text-white text-sm font-medium">
                        {vault.performanceFeeBps / 100}% perf / {vault.managementFeeBps / 100}% mgmt
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <Lock className="h-4 w-4" />
                      <span>Min: <strong className="text-slate-900 dark:text-white">{formatTokenAmount(vault.minDeposit)}</strong></span>
                    </div>
                    {parseFloat(vault.vaultCap) > 0 && (
                      <div className="text-slate-600 dark:text-slate-400 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        Utilization: <strong className="text-slate-900 dark:text-white">{utilization.toFixed(1)}%</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {(!vaults || vaults.length === 0) && (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">
          No vaults available at the moment
        </div>
      )}
    </div>
  )
}
