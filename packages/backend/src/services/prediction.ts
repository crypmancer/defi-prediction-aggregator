import { logger } from "../utils/logger";

interface Market {
  marketId: string;
  platform: string;
  question: string;
  endTime: number;
  totalVolume: number;
  yesPrice: number;
  noPrice: number;
  resolved: boolean;
  outcome?: boolean;
  lastUpdated: number;
  aiConfidence?: number;
}

class PredictionService {
  private markets: Map<string, Market> = new Map();

  /**
   * Get all markets
   */
  async getAllMarkets(): Promise<Market[]> {
    return Array.from(this.markets.values());
  }

  /**
   * Get a specific market
   */
  async getMarket(marketId: string): Promise<Market | null> {
    return this.markets.get(marketId) || null;
  }

  /**
   * Get markets by platform
   */
  async getMarketsByPlatform(platform: string): Promise<Market[]> {
    return Array.from(this.markets.values()).filter(
      market => market.platform.toLowerCase() === platform.toLowerCase()
    );
  }

  /**
   * Get active markets (not resolved, not ended)
   */
  async getActiveMarkets(): Promise<Market[]> {
    const now = Math.floor(Date.now() / 1000);
    return Array.from(this.markets.values()).filter(
      market => !market.resolved && market.endTime > now
    );
  }

  /**
   * Update or create a market
   */
  async updateMarket(marketData: {
    marketId: string;
    platform: string;
    question: string;
    endTime: number;
    yesPrice: number;
    noPrice: number;
    volume: number;
  }): Promise<void> {
    const existing = this.markets.get(marketData.marketId);
    
    const market: Market = {
      marketId: marketData.marketId,
      platform: marketData.platform,
      question: marketData.question,
      endTime: marketData.endTime,
      totalVolume: marketData.volume,
      yesPrice: marketData.yesPrice,
      noPrice: marketData.noPrice,
      resolved: existing?.resolved || false,
      outcome: existing?.outcome,
      lastUpdated: Math.floor(Date.now() / 1000),
      aiConfidence: existing?.aiConfidence
    };
    
    this.markets.set(marketData.marketId, market);
    logger.info(`Market updated: ${marketData.marketId}`);
  }

  /**
   * Resolve a market
   */
  async resolveMarket(marketId: string, outcome: boolean): Promise<void> {
    const market = this.markets.get(marketId);
    if (!market) {
      throw new Error("Market not found");
    }
    
    if (market.resolved) {
      throw new Error("Market already resolved");
    }
    
    market.resolved = true;
    market.outcome = outcome;
    market.lastUpdated = Math.floor(Date.now() / 1000);
    
    this.markets.set(marketId, market);
    logger.info(`Market resolved: ${marketId}, outcome: ${outcome}`);
  }

  /**
   * Update AI confidence for a market
   */
  async updateAIConfidence(marketId: string, confidence: number): Promise<void> {
    const market = this.markets.get(marketId);
    if (!market) {
      throw new Error("Market not found");
    }
    
    market.aiConfidence = confidence;
    this.markets.set(marketId, market);
  }
}

export const predictionService = new PredictionService();
