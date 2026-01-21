export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent mb-4">
          Terms of Service
        </h1>
        <p className="text-slate-600 dark:text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg space-y-6 text-slate-700 dark:text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using OracleVault ("the Platform"), you accept and agree to be bound by the terms
            and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">2. Description of Service</h2>
          <p>
            OracleVault is a decentralized prediction market aggregator and yield vault platform that:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Aggregates prediction markets from multiple platforms</li>
            <li>Provides AI-powered analysis and recommendations</li>
            <li>Offers automated betting strategies</li>
            <li>Enables yield generation through vault deposits</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">3. Eligibility</h2>
          <p>
            You must be at least 18 years old and have the legal capacity to enter into contracts in your jurisdiction.
            You are responsible for ensuring that your use of the Platform complies with all applicable laws and
            regulations in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">4. Risk Disclosure</h2>
          <p className="mb-2">
            <strong className="text-red-600 dark:text-red-400">IMPORTANT RISK WARNING:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Cryptocurrency and blockchain technology involve substantial risk of loss</li>
            <li>Prediction markets are speculative and may result in total loss of funds</li>
            <li>AI recommendations are for informational purposes only and do not constitute financial advice</li>
            <li>Past performance does not guarantee future results</li>
            <li>Smart contracts are experimental technology and may contain bugs or vulnerabilities</li>
            <li>You may lose all funds deposited into vaults or used for betting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">5. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Maintain the security of your wallet and private keys</li>
            <li>Not use the Platform for any illegal activities</li>
            <li>Not attempt to hack, disrupt, or interfere with the Platform</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Only use funds you can afford to lose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">6. Fees</h2>
          <p>
            The Platform may charge fees for certain services, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Performance fees on vault profits</li>
            <li>Management fees on vault assets</li>
            <li>Transaction fees (gas fees) on blockchain networks</li>
          </ul>
          <p className="mt-2">
            All fees are disclosed before you commit to any transaction. You are responsible for all gas fees
            associated with blockchain transactions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">7. No Financial Advice</h2>
          <p>
            The Platform, including AI analysis and recommendations, does not provide financial, investment, or
            trading advice. All information is provided for informational purposes only. You should conduct your
            own research and consult with a qualified financial advisor before making any investment decisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">8. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, ORACLEVAULT AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES,
            WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless OracleVault, its operators, and affiliates from any claims,
            damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Platform
            or violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">10. Modification of Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Material changes will be notified through the
            Platform or via email. Your continued use of the Platform after such modifications constitutes acceptance
            of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">11. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the Platform at any time, with or without
            cause or notice, for any reason including violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to
            conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">13. Contact</h2>
          <p>
            For questions about these Terms, please contact us at:
          </p>
          <ul className="list-none space-y-1 mt-2">
            <li>Email: <a href="mailto:crypmancer@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">crypmancer@gmail.com</a></li>
            <li>Telegram: <a href="https://t.me/cryp_mancer" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">@cryp_mancer</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
