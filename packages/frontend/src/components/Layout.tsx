import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'
import { Wallet, TrendingUp, Coins, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { account, connectWallet, disconnectWallet, isConnected } = useWallet()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-primary-400" />
                <span className="text-xl font-bold text-white">OracleVault</span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link
                  to="/markets"
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                    isActive('/markets')
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                >
                  Markets
                </Link>
                <Link
                  to="/vaults"
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium ${
                    isActive('/vaults')
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                >
                  Vaults
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isConnected ? (
                <>
                  <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-slate-700 rounded-lg">
                    <Wallet className="h-4 w-4 text-primary-400" />
                    <span className="text-sm text-gray-300">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={connectWallet}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition flex items-center space-x-2"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
              <button
                className="md:hidden text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/markets"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Markets
              </Link>
              <Link
                to="/vaults"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vaults
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-12rem)]">
        {children}
      </main>
      <Footer />
    </div>
  )
}
