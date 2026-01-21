import { Link } from 'react-router-dom'
import { Github, Twitter, MessageCircle, Mail, TrendingUp } from 'lucide-react'
import { useToast } from '../contexts/ToastContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const toast = useToast()

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <TrendingUp className="h-6 w-6 text-primary-500 dark:text-primary-400 group-hover:scale-110 transition-transform" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
                OracleVault
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              AI-Enhanced Decentralized Prediction Aggregator & Vaults
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/crypmancer/defi-prediction-aggregator"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/oraclevault"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/cryp_mancer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:crypmancer@gmail.com"
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/markets" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/vaults" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Vaults
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.oraclevault.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/crypmancer/defi-prediction-aggregator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                  onClick={(e) => {
                    e.preventDefault()
                    toast.info('Cookie Policy coming soon')
                  }}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/cryp_mancer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                >
                  Telegram Support
                </a>
              </li>
              <li>
                <a
                  href="https://docs.oraclevault.com/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/crypmancer/defi-prediction-aggregator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm inline-block hover:translate-x-1 duration-200"
                >
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              © {currentYear} OracleVault. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-700 dark:text-green-400 font-medium">Mainnet Beta</span>
              </span>
              <a
                href="#"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  toast.info('Status page coming soon')
                }}
              >
                Status
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-500 dark:text-slate-500 text-xs">
              ⚠️ This is experimental software. Use at your own risk. Always conduct thorough testing before
              deploying to mainnet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
