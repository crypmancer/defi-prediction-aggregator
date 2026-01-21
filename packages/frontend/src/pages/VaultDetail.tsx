import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Coins, TrendingUp, Lock, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { useToast } from '../contexts/ToastContext'
import { USE_MOCK_DATA } from '../config'
import { mockAPI, type Vault } from '../services/mockData'

export default function VaultDetail() {
  const { address } = useParams()
  const { isConnected } = useWallet()
  const toast = useToast()
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawShares, setWithdrawShares] = useState('')

  const { data: vault, isLoading } = useQuery({
    queryKey: ['vault', address],
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        return await mockAPI.getVault(address!)
      }
      const response = await axios.get(`/api/vaults/${address}`)
      return response.data.data as Vault
    },
    enabled: !!address,
    refetchInterval: 10000,
  })

  if (isLoading) {
    return <div className="text-center py-12 text-slate-600 dark:text-slate-400 animate-pulse">Loading vault...</div>
  }

  if (!vault) {
    return <div className="text-center py-12 text-red-600 dark:text-red-400">Vault not found</div>
  }

  const formatTokenAmount = (amount: string) => {
    const num = parseFloat(amount) / 1e18
    return num.toFixed(4)
  }

  const calculateShares = (amount: string) => {
    if (!amount || parseFloat(vault.totalAssets) === 0) return '0'
    const shares = (parseFloat(amount) * parseFloat(vault.totalShares)) / parseFloat(vault.totalAssets)
    return shares.toFixed(4)
  }

  const handleDeposit = async () => {
    if (!isConnected) {
      toast.warning('Please connect your wallet first')
      return
    }
    if (!depositAmount || parseFloat(depositAmount) < parseFloat(formatTokenAmount(vault.minDeposit))) {
      toast.warning(`Minimum deposit: ${formatTokenAmount(vault.minDeposit)}`)
      return
    }
    // In production, this would interact with the smart contract
    toast.success(`Deposit: ${depositAmount} tokens`)
  }

  const handleWithdraw = async () => {
    if (!isConnected) {
      toast.warning('Please connect your wallet first')
      return
    }
    if (!withdrawShares) {
      toast.warning('Please enter shares to withdraw')
      return
    }
    // In production, this would interact with the smart contract
    toast.success(`Withdraw: ${withdrawShares} shares`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-br from-white to-primary-50/30 dark:from-slate-800 dark:to-primary-900/20 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
            <Coins className="h-7 w-7 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Prediction Market Vault</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-medium">Total Assets</div>
            <div className="text-slate-900 dark:text-white font-bold text-xl">
              {formatTokenAmount(vault.totalAssets)} tokens
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-medium">Total Shares</div>
            <div className="text-slate-900 dark:text-white font-bold text-xl">
              {formatTokenAmount(vault.totalShares)}
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-medium">Performance Fee</div>
            <div className="text-slate-900 dark:text-white font-bold text-xl">
              {vault.performanceFeeBps / 100}%
            </div>
          </div>
          <div className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-slate-600 dark:text-slate-400 text-sm mb-2 font-medium">Management Fee</div>
            <div className="text-slate-900 dark:text-white font-bold text-xl">
              {vault.managementFeeBps / 100}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Deposit */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span>Deposit</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Amount</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Min: {formatTokenAmount(vault.minDeposit)} tokens
              </div>
              {depositAmount && (
                <div className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-medium">
                  You will receive: {calculateShares(depositAmount)} shares
                </div>
              )}
            </div>
            <button
              onClick={handleDeposit}
              disabled={!isConnected || !depositAmount}
              className="w-full px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
            >
              {isConnected ? 'Deposit' : 'Connect Wallet to Deposit'}
            </button>
          </div>
        </div>

        {/* Withdraw */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <span>Withdraw</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">Shares</label>
              <input
                type="number"
                value={withdrawShares}
                onChange={(e) => setWithdrawShares(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
              {withdrawShares && parseFloat(vault.totalShares) > 0 && (
                <div className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-medium">
                  You will receive: {(
                    (parseFloat(withdrawShares) * parseFloat(vault.totalAssets)) / parseFloat(vault.totalShares)
                  ).toFixed(4)} tokens
                </div>
              )}
            </div>
            <button
              onClick={handleWithdraw}
              disabled={!isConnected || !withdrawShares}
              className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-red-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
            >
              {isConnected ? 'Withdraw' : 'Connect Wallet to Withdraw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
