import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Coins, TrendingUp, Lock, DollarSign } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '../contexts/WalletContext'
import { USE_MOCK_DATA } from '../config'
import { mockAPI, type Vault } from '../services/mockData'

export default function VaultDetail() {
  const { address } = useParams()
  const { isConnected } = useWallet()
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
    return <div className="text-center py-12 text-gray-400">Loading vault...</div>
  }

  if (!vault) {
    return <div className="text-center py-12 text-red-400">Vault not found</div>
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
      alert('Please connect your wallet first')
      return
    }
    if (!depositAmount || parseFloat(depositAmount) < parseFloat(formatTokenAmount(vault.minDeposit))) {
      alert(`Minimum deposit: ${formatTokenAmount(vault.minDeposit)}`)
      return
    }
    // In production, this would interact with the smart contract
    alert(`Deposit: ${depositAmount} tokens`)
  }

  const handleWithdraw = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    if (!withdrawShares) {
      alert('Please enter shares to withdraw')
      return
    }
    // In production, this would interact with the smart contract
    alert(`Withdraw: ${withdrawShares} shares`)
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <Coins className="h-6 w-6 text-primary-400" />
          <h1 className="text-3xl font-bold text-white">Prediction Market Vault</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <div className="text-gray-400 text-sm mb-1">Total Assets</div>
            <div className="text-white font-semibold text-lg">
              {formatTokenAmount(vault.totalAssets)} tokens
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Total Shares</div>
            <div className="text-white font-semibold text-lg">
              {formatTokenAmount(vault.totalShares)}
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Performance Fee</div>
            <div className="text-white font-semibold text-lg">
              {vault.performanceFeeBps / 100}%
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Management Fee</div>
            <div className="text-white font-semibold text-lg">
              {vault.managementFeeBps / 100}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Deposit */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary-400" />
            <span>Deposit</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Amount</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
              <div className="text-xs text-gray-500 mt-1">
                Min: {formatTokenAmount(vault.minDeposit)} tokens
              </div>
              {depositAmount && (
                <div className="text-xs text-primary-400 mt-1">
                  You will receive: {calculateShares(depositAmount)} shares
                </div>
              )}
            </div>
            <button
              onClick={handleDeposit}
              disabled={!isConnected || !depositAmount}
              className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
            >
              {isConnected ? 'Deposit' : 'Connect Wallet to Deposit'}
            </button>
          </div>
        </div>

        {/* Withdraw */}
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary-400" />
            <span>Withdraw</span>
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Shares</label>
              <input
                type="number"
                value={withdrawShares}
                onChange={(e) => setWithdrawShares(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
              {withdrawShares && parseFloat(vault.totalShares) > 0 && (
                <div className="text-xs text-primary-400 mt-1">
                  You will receive: {(
                    (parseFloat(withdrawShares) * parseFloat(vault.totalAssets)) / parseFloat(vault.totalShares)
                  ).toFixed(4)} tokens
                </div>
              )}
            </div>
            <button
              onClick={handleWithdraw}
              disabled={!isConnected || !withdrawShares}
              className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition"
            >
              {isConnected ? 'Withdraw' : 'Connect Wallet to Withdraw'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
