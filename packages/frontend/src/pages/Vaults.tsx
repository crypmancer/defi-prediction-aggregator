import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Coins, TrendingUp, Lock } from 'lucide-react'

interface Vault {
  address: string
  depositToken: string
  totalAssets: string
  totalShares: string
  performanceFeeBps: number
  managementFeeBps: number
  minDeposit: string
  vaultCap: string
}

export default function Vaults() {
  const { data: vaults, isLoading, error } = useQuery({
    queryKey: ['vaults'],
    queryFn: async () => {
      const response = await axios.get('/api/vaults')
      return response.data.data as Vault[]
    },
    refetchInterval: 30000,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading vaults...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400">Error loading vaults</div>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Yield Vaults</h1>
        <div className="text-gray-400">
          {vaults?.length || 0} {vaults?.length === 1 ? 'vault' : 'vaults'}
        </div>
      </div>

      <div className="grid gap-6">
        {vaults?.map((vault) => {
          const apy = calculateAPY(vault)
          const totalAssets = formatTokenAmount(vault.totalAssets)
          const utilization = parseFloat(vault.vaultCap) > 0
            ? (parseFloat(vault.totalAssets) / parseFloat(vault.vaultCap)) * 100
            : 0

          return (
            <Link
              key={vault.address}
              to={`/vaults/${vault.address}`}
              className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-primary-500 transition cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <Coins className="h-5 w-5 text-primary-400" />
                    <h3 className="text-xl font-semibold text-white">Prediction Market Vault</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-gray-400 text-sm">Total Assets</div>
                      <div className="text-white font-semibold">{totalAssets} tokens</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Estimated APY</div>
                      <div className="text-green-400 font-semibold flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{apy}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Fees</div>
                      <div className="text-white text-sm">
                        {vault.performanceFeeBps / 100}% perf / {vault.managementFeeBps / 100}% mgmt
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Lock className="h-4 w-4" />
                      <span>Min: {formatTokenAmount(vault.minDeposit)}</span>
                    </div>
                    {parseFloat(vault.vaultCap) > 0 && (
                      <div className="text-gray-400">
                        Utilization: {utilization.toFixed(1)}%
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
        <div className="text-center py-12 text-gray-400">
          No vaults available at the moment
        </div>
      )}
    </div>
  )
}
