export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 space-y-6 text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
          <p>
            OracleVault ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our decentralized
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.1 Blockchain Data</h3>
          <p>
            When you interact with our smart contracts, blockchain transactions are publicly recorded. This includes:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Wallet addresses</li>
            <li>Transaction hashes</li>
            <li>Transaction amounts and timestamps</li>
            <li>Smart contract interactions</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.2 Usage Data</h3>
          <p>We may collect information about how you use the Platform:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Pages visited and features used</li>
            <li>IP address (for security and analytics)</li>
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Referral sources</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mt-4 mb-2">2.3 Optional Information</h3>
          <p>If you contact us, we may collect:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Email address</li>
            <li>Telegram username</li>
            <li>Any other information you voluntarily provide</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Provide and maintain the Platform</li>
            <li>Process transactions and interact with smart contracts</li>
            <li>Improve user experience and platform functionality</li>
            <li>Analyze usage patterns and platform performance</li>
            <li>Detect and prevent fraud or security issues</li>
            <li>Respond to your inquiries and provide support</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">4. Decentralized Nature</h2>
          <p>
            OracleVault is built on blockchain technology, which means:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>All blockchain transactions are public and immutable</li>
            <li>We cannot delete or modify blockchain data</li>
            <li>Your wallet address and transaction history are publicly visible</li>
            <li>Smart contract interactions are transparent and verifiable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">5. Information Sharing</h2>
          <p>We do not sell your personal information. We may share information:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>With service providers who assist in platform operations</li>
            <li>When required by law or legal process</li>
            <li>To protect our rights, property, or safety</li>
            <li>In connection with a business transfer or merger</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies and Tracking</h2>
          <p>
            We may use cookies and similar tracking technologies to enhance your experience. You can control
            cookies through your browser settings. Note that disabling cookies may affect platform functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">7. Third-Party Services</h2>
          <p>
            The Platform may integrate with third-party services (e.g., RPC providers, analytics tools).
            These services have their own privacy policies, and we encourage you to review them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">8. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method of
            transmission over the internet or electronic storage is 100% secure. You are responsible for
            maintaining the security of your wallet and private keys.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">9. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of information (subject to blockchain limitations)</li>
            <li>Object to processing of your information</li>
            <li>Data portability</li>
          </ul>
          <p className="mt-2">
            Note: Blockchain data cannot be deleted due to the immutable nature of blockchain technology.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
          <p>
            The Platform is not intended for users under 18 years of age. We do not knowingly collect
            information from children.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Material changes will be notified through
            the Platform. Your continued use after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
          <p>
            For questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <ul className="list-none space-y-1 mt-2">
            <li>Email: crypmancer@gmail.com</li>
            <li>Telegram: <a href="https://t.me/cryp_mancer" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">@cryp_mancer</a></li>
          </ul>
        </section>
      </div>
    </div>
  )
}
