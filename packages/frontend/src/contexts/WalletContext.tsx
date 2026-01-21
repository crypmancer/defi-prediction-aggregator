import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'

interface WalletContextType {
  account: string | null
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isConnected: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)

  useEffect(() => {
    // Check if wallet is already connected
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            handleWalletConnection()
          }
        })
        .catch(console.error)
    }
  }, [])

  const handleWalletConnection = async () => {
    if (!window.ethereum) {
      // Toast will be handled in Layout component
      return
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      setProvider(provider)
      setSigner(signer)
      setAccount(address)

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          handleWalletConnection()
        }
      })
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const connectWallet = async () => {
    await handleWalletConnection()
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
    setSigner(null)
  }

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        signer,
        connectWallet,
        disconnectWallet,
        isConnected: !!account,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}
