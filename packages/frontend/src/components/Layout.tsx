import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWallet } from '../contexts/WalletContext'
import { useTheme } from '../contexts/ThemeContext'
import { useToast } from '../contexts/ToastContext'
import { Wallet, TrendingUp, Coins, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { account, connectWallet, disconnectWallet, isConnected } = useWallet()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!')
      return
    }
    try {
      await connectWallet()
      if (isConnected) {
        toast.success('Wallet connected successfully!')
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to connect wallet'
      toast.error(errorMessage.includes('User rejected') ? 'Connection rejected' : 'Failed to connect wallet')
    }
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300" data-theme={theme}>
      <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <TrendingUp className="h-8 w-8 text-primary-500 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-xl group-hover:bg-primary-400/30 transition-colors" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
                  OracleVault
                </span>
              </Link>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link
                  to="/markets"
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-all duration-200 ${
                    isActive('/markets')
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-semibold'
                      : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  Markets
                </Link>
                <Link
                  to="/vaults"
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-all duration-200 ${
                    isActive('/vaults')
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 font-semibold'
                      : 'border-transparent text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  Vaults
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Toggle theme"
                type="button"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>

              {isConnected ? (
                <>
                  <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                    <Wallet className="h-4 w-4 text-primary-500 dark:text-primary-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {account?.slice(0, 6)}...{account?.slice(-4)}
                    </span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConnectWallet}
                  className="px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg hover:shadow-primary-500/50 hover:scale-105 active:scale-95"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
              <button
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/markets"
                className={`block px-3 py-2 rounded-md transition-colors ${
                  isActive('/markets')
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Markets
              </Link>
              <Link
                to="/vaults"
                className={`block px-3 py-2 rounded-md transition-colors ${
                  isActive('/vaults')
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Vaults
              </Link>
            </div>
          </div>
        )}
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-12rem)] animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  )
}
