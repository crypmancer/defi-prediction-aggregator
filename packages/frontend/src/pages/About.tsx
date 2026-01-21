import { TrendingUp, Brain, Shield, Users, Zap, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
          About OracleVault
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Revolutionizing prediction markets with AI and DeFi
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Our Mission</h2>
          <p>
            OracleVault aims to democratize access to prediction markets by aggregating markets from
            multiple platforms, providing AI-powered insights, and enabling passive yield generation through
            automated strategies. We believe that combining artificial intelligence with decentralized
            finance can create more efficient and accessible prediction markets for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-6 w-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Market Aggregation</h3>
                <p className="text-sm">
                  We aggregate prediction markets from leading platforms like Polymarket, Augur, Kalshi,
                  and more, giving you access to a wide range of markets in one place.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Brain className="h-6 w-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">AI Analysis</h3>
                <p className="text-sm">
                  Our AI-powered system analyzes markets and provides confidence scores, risk assessments,
                  and betting recommendations to help you make informed decisions.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Zap className="h-6 w-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Automated Strategies</h3>
                <p className="text-sm">
                  Set up automated betting strategies based on AI recommendations, with configurable risk
                  parameters and confidence thresholds.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-primary-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Yield Vaults</h3>
                <p className="text-sm">
                  Earn passive income by depositing into our automated prediction market vaults, which
                  execute strategies on your behalf.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Our Values</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-primary-400" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Decentralization</h3>
                <p className="text-sm text-gray-400">
                  Built on blockchain technology for transparency, security, and user control.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-primary-400" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Accessibility</h3>
                <p className="text-sm text-gray-400">
                  Making prediction markets accessible to everyone, regardless of technical expertise.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-primary-400" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Security First</h3>
                <p className="text-sm text-gray-400">
                  Prioritizing security through audited smart contracts and best practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Technology</h2>
          <p className="mb-4">
            OracleVault is built using cutting-edge technologies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong className="text-slate-900 dark:text-white">Smart Contracts:</strong> Solidity on EVM-compatible chains</li>
            <li><strong className="text-slate-900 dark:text-white">AI Integration:</strong> OpenAI GPT-4 for market analysis</li>
            <li><strong className="text-slate-900 dark:text-white">Frontend:</strong> React with TypeScript and Tailwind CSS</li>
            <li><strong className="text-slate-900 dark:text-white">Backend:</strong> Node.js with Express</li>
            <li><strong className="text-slate-900 dark:text-white">Blockchain:</strong> Ethereum, Polygon, Arbitrum, and more</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Get Started</h2>
          <p className="mb-4">
            Ready to explore prediction markets with AI-powered insights?
          </p>
          <div className="flex space-x-4">
            <Link
              to="/markets"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary-500/50 hover:scale-105 active:scale-95"
            >
              Explore Markets
            </Link>
            <Link
              to="/vaults"
              className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-primary-500 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              View Vaults
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-primary-500 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
