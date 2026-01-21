import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletProvider } from './contexts/WalletContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Markets from './pages/Markets'
import Vaults from './pages/Vaults'
import MarketDetail from './pages/MarketDetail'
import VaultDetail from './pages/VaultDetail'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Contact from './pages/Contact'
import About from './pages/About'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/markets/:marketId" element={<MarketDetail />} />
              <Route path="/vaults" element={<Vaults />} />
              <Route path="/vaults/:address" element={<VaultDetail />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </QueryClientProvider>
  )
}

export default App
