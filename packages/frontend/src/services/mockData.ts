// Mock data for frontend development without backend

export interface Market {
  marketId: string
  platform: string
  question: string
  endTime: number
  totalVolume: number
  yesPrice: number
  noPrice: number
  resolved: boolean
  outcome?: boolean
  aiConfidence?: number
  lastUpdated: number
}

export interface Vault {
  address: string
  depositToken: string
  totalAssets: string
  totalShares: string
  performanceFeeBps: number
  managementFeeBps: number
  minDeposit: string
  vaultCap: string
}

export interface AIAnalysis {
  confidence: number
  recommendation: "yes" | "no" | "neutral"
  reasoning: string
  riskLevel: "low" | "medium" | "high"
  expectedValue: number
}

// Mock markets data
export const mockMarkets: Market[] = [
  {
    marketId: "polymarket-btc-100k",
    platform: "Polymarket",
    question: "Will BTC reach $100K by Q2 2024?",
    endTime: Math.floor(Date.now() / 1000) + 86400 * 60, // 60 days from now
    totalVolume: 5000000,
    yesPrice: 6000, // 60%
    noPrice: 4000, // 40%
    resolved: false,
    aiConfidence: 7200, // 72%
    lastUpdated: Math.floor(Date.now() / 1000)
  },
  {
    marketId: "augur-eth-5k",
    platform: "Augur",
    question: "Will ETH reach $5,000 by end of 2024?",
    endTime: Math.floor(Date.now() / 1000) + 86400 * 90, // 90 days from now
    totalVolume: 3000000,
    yesPrice: 5500, // 55%
    noPrice: 4500, // 45%
    resolved: false,
    aiConfidence: 6800, // 68%
    lastUpdated: Math.floor(Date.now() / 1000)
  },
  {
    marketId: "kalshi-election",
    platform: "Kalshi",
    question: "Will the incumbent win the 2024 election?",
    endTime: Math.floor(Date.now() / 1000) + 86400 * 120, // 120 days from now
    totalVolume: 8000000,
    yesPrice: 4800, // 48%
    noPrice: 5200, // 52%
    resolved: false,
    aiConfidence: 5500, // 55%
    lastUpdated: Math.floor(Date.now() / 1000)
  },
  {
    marketId: "polymarket-ai-breakthrough",
    platform: "Polymarket",
    question: "Will there be a major AI breakthrough announced in 2024?",
    endTime: Math.floor(Date.now() / 1000) + 86400 * 200, // 200 days from now
    totalVolume: 2500000,
    yesPrice: 7000, // 70%
    noPrice: 3000, // 30%
    resolved: false,
    aiConfidence: 7500, // 75%
    lastUpdated: Math.floor(Date.now() / 1000)
  },
  {
    marketId: "augur-recession",
    platform: "Augur",
    question: "Will there be a recession in 2024?",
    endTime: Math.floor(Date.now() / 1000) + 86400 * 150, // 150 days from now
    totalVolume: 6000000,
    yesPrice: 3500, // 35%
    noPrice: 6500, // 65%
    resolved: false,
    aiConfidence: 4200, // 42%
    lastUpdated: Math.floor(Date.now() / 1000)
  }
]

// Mock vaults data
export const mockVaults: Vault[] = [
  {
    address: "0x1234567890123456789012345678901234567890",
    depositToken: "0xTokenAddress",
    totalAssets: "1000000000000000000000", // 1000 tokens
    totalShares: "1000000000000000000000",
    performanceFeeBps: 200, // 2%
    managementFeeBps: 100, // 1%
    minDeposit: "10000000000000000000", // 10 tokens
    vaultCap: "1000000000000000000000000" // 1M tokens
  },
  {
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    depositToken: "0xTokenAddress2",
    totalAssets: "500000000000000000000", // 500 tokens
    totalShares: "500000000000000000000",
    performanceFeeBps: 250, // 2.5%
    managementFeeBps: 150, // 1.5%
    minDeposit: "5000000000000000000", // 5 tokens
    vaultCap: "500000000000000000000000" // 500K tokens
  }
]

// Mock AI analysis
export const mockAIAnalysis: Record<string, AIAnalysis> = {
  "polymarket-btc-100k": {
    confidence: 7200,
    recommendation: "yes",
    reasoning: "Based on current market trends, institutional adoption, and historical patterns, there's a strong likelihood BTC will reach $100K. The halving event and increasing ETF adoption support this prediction.",
    riskLevel: "medium",
    expectedValue: 65
  },
  "augur-eth-5k": {
    confidence: 6800,
    recommendation: "yes",
    reasoning: "Ethereum's upgrade roadmap and growing DeFi ecosystem suggest continued growth. However, market volatility remains a factor.",
    riskLevel: "medium",
    expectedValue: 58
  },
  "kalshi-election": {
    confidence: 5500,
    recommendation: "neutral",
    reasoning: "Political markets are highly unpredictable. Current polling data suggests a close race with many variables.",
    riskLevel: "high",
    expectedValue: 50
  },
  "polymarket-ai-breakthrough": {
    confidence: 7500,
    recommendation: "yes",
    reasoning: "Rapid pace of AI development and major tech companies' investments indicate high probability of significant breakthroughs this year.",
    riskLevel: "low",
    expectedValue: 70
  },
  "augur-recession": {
    confidence: 4200,
    recommendation: "no",
    reasoning: "Economic indicators show mixed signals. While some risks exist, current data suggests recession is less likely than markets indicate.",
    riskLevel: "high",
    expectedValue: 38
  }
}

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API functions
export const mockAPI = {
  // Markets
  getMarkets: async (): Promise<Market[]> => {
    await delay(500) // Simulate network delay
    return mockMarkets
  },

  getMarket: async (marketId: string): Promise<Market | null> => {
    await delay(300)
    return mockMarkets.find(m => m.marketId === marketId) || null
  },

  getMarketsByPlatform: async (platform: string): Promise<Market[]> => {
    await delay(400)
    return mockMarkets.filter(m => m.platform.toLowerCase() === platform.toLowerCase())
  },

  getActiveMarkets: async (): Promise<Market[]> => {
    await delay(400)
    const now = Math.floor(Date.now() / 1000)
    return mockMarkets.filter(m => !m.resolved && m.endTime > now)
  },

  // Vaults
  getVaults: async (): Promise<Vault[]> => {
    await delay(500)
    return mockVaults
  },

  getVault: async (address: string): Promise<Vault | null> => {
    await delay(300)
    return mockVaults.find(v => v.address.toLowerCase() === address.toLowerCase()) || null
  },

  // AI
  analyzeMarket: async (marketId: string, marketData?: Market): Promise<AIAnalysis> => {
    await delay(1000) // Simulate AI processing time
    return mockAIAnalysis[marketId] || {
      confidence: 5000,
      recommendation: "neutral",
      reasoning: "Insufficient data for analysis.",
      riskLevel: "medium",
      expectedValue: 50
    }
  },

  getBettingRecommendation: async (
    marketId: string,
    userPreferences?: { riskTolerance?: string; maxBetSize?: number }
  ) => {
    await delay(800)
    const analysis = mockAIAnalysis[marketId] || mockAIAnalysis["polymarket-btc-100k"]
    const market = mockMarkets.find(m => m.marketId === marketId) || mockMarkets[0]
    
    const maxBet = userPreferences?.maxBetSize || 1000
    const recommendedAmount = Math.min(maxBet * 0.1, maxBet * 0.25) // 10-25% of max

    return {
      marketId,
      side: analysis.recommendation === "yes" ? "yes" : "no",
      confidence: analysis.confidence,
      recommendedAmount: Math.round(recommendedAmount),
      reasoning: analysis.reasoning,
      riskLevel: analysis.riskLevel
    }
  },

  getConfidence: async (marketId: string): Promise<number> => {
    await delay(300)
    const market = mockMarkets.find(m => m.marketId === marketId)
    return market?.aiConfidence || 5000
  }
}
