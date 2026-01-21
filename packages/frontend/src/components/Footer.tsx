import { Link } from 'react-router-dom'
import { Github, Twitter, MessageCircle, Mail, TrendingUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary-400" />
              <span className="text-xl font-bold text-white">OracleVault</span>
            </Link>
            <p className="text-gray-400 text-sm">
              AI-Enhanced Decentralized Prediction Aggregator & Vaults
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/crypmancer/defi-prediction-aggregator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/oraclevault"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/cryp_mancer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="mailto:crypmancer@gmail.com"
                className="text-gray-400 hover:text-primary-400 transition"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/markets" className="text-gray-400 hover:text-primary-400 transition text-sm">
                  Markets
                </Link>
              </li>
              <li>
                <Link to="/vaults" className="text-gray-400 hover:text-primary-400 transition text-sm">
                  Vaults
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition text-sm">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.oraclevault.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/crypmancer/defi-prediction-aggregator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition text-sm"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-primary-400 transition text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Cookie Policy coming soon')
                  }}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition text-sm">
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/cryp_mancer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition text-sm"
                >
                  Telegram Support
                </a>
              </li>
              <li>
                <a
                  href="https://docs.oraclevault.com/faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition text-sm"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/crypmancer/defi-prediction-aggregator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition text-sm"
                >
                  Report Issue
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} OracleVault. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Mainnet Beta</span>
              </span>
              <a
                href="#"
                className="hover:text-primary-400 transition"
                onClick={(e) => {
                  e.preventDefault()
                  alert('Status page coming soon')
                }}
              >
                Status
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              ⚠️ This is experimental software. Use at your own risk. Always conduct thorough testing before
              deploying to mainnet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
