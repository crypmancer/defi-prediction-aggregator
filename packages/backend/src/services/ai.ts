import OpenAI from "openai";
import { logger } from "../utils/logger";
import { predictionService } from "./prediction";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

interface MarketAnalysis {
  confidence: number; // 0-10000 (basis points)
  recommendation: "yes" | "no" | "neutral";
  reasoning: string;
  riskLevel: "low" | "medium" | "high";
  expectedValue: number;
}

interface BettingRecommendation {
  marketId: string;
  side: "yes" | "no";
  confidence: number;
  recommendedAmount: number;
  reasoning: string;
  riskLevel: string;
}

class AIService {
  /**
   * Analyze a prediction market using AI
   */
  async analyzeMarket(marketId: string, marketData: any): Promise<MarketAnalysis> {
    try {
      if (!process.env.OPENAI_API_KEY) {
        logger.warn("OpenAI API key not set, using mock analysis");
        return this.getMockAnalysis(marketData);
      }

      const prompt = this.buildAnalysisPrompt(marketData);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert prediction market analyst. Analyze markets objectively and provide confidence scores based on data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.3,
      });

      const analysisText = response.choices[0]?.message?.content || "";
      return this.parseAnalysis(analysisText, marketData);
    } catch (error) {
      logger.error("Error in AI analysis:", error);
      return this.getMockAnalysis(marketData);
    }
  }

  /**
   * Get betting recommendation
   */
  async getBettingRecommendation(
    marketId: string,
    userPreferences?: {
      riskTolerance?: "low" | "medium" | "high";
      maxBetSize?: number;
    }
  ): Promise<BettingRecommendation> {
    const market = await predictionService.getMarket(marketId);
    if (!market) {
      throw new Error("Market not found");
    }

    const analysis = await this.analyzeMarket(marketId, market);
    
    // Calculate recommended bet size based on Kelly Criterion (simplified)
    const kellyFraction = this.calculateKellyFraction(
      analysis.confidence / 10000,
      market.yesPrice / 10000,
      market.noPrice / 10000
    );
    
    const maxBet = userPreferences?.maxBetSize || 1000;
    const recommendedAmount = Math.min(maxBet * kellyFraction, maxBet * 0.1); // Cap at 10% of max

    return {
      marketId,
      side: analysis.recommendation === "yes" ? "yes" : "no",
      confidence: analysis.confidence,
      recommendedAmount,
      reasoning: analysis.reasoning,
      riskLevel: analysis.riskLevel
    };
  }

  /**
   * Get confidence score for a market
   */
  async getConfidence(marketId: string): Promise<number> {
    const market = await predictionService.getMarket(marketId);
    if (!market) {
      throw new Error("Market not found");
    }

    if (market.aiConfidence !== undefined) {
      return market.aiConfidence;
    }

    const analysis = await this.analyzeMarket(marketId, market);
    await predictionService.updateAIConfidence(marketId, analysis.confidence);
    
    return analysis.confidence;
  }

  /**
   * Build analysis prompt for AI
   */
  private buildAnalysisPrompt(marketData: any): string {
    return `
Analyze this prediction market:

Question: ${marketData.question}
Platform: ${marketData.platform}
Current Yes Price: ${(marketData.yesPrice / 100).toFixed(2)}%
Current No Price: ${(marketData.noPrice / 100).toFixed(2)}%
Total Volume: ${marketData.totalVolume}
End Time: ${new Date(marketData.endTime * 1000).toISOString()}

Provide:
1. Confidence score (0-100) for the "yes" outcome
2. Recommendation: "yes", "no", or "neutral"
3. Brief reasoning (2-3 sentences)
4. Risk level: "low", "medium", or "high"
5. Expected value estimate (0-100)

Format your response as JSON:
{
  "confidence": <number 0-100>,
  "recommendation": "<yes|no|neutral>",
  "reasoning": "<text>",
  "riskLevel": "<low|medium|high>",
  "expectedValue": <number 0-100>
}
    `.trim();
  }

  /**
   * Parse AI response
   */
  private parseAnalysis(text: string, marketData: any): MarketAnalysis {
    try {
      // Try to extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          confidence: Math.round(parsed.confidence * 100), // Convert to basis points
          recommendation: parsed.recommendation,
          reasoning: parsed.reasoning,
          riskLevel: parsed.riskLevel,
          expectedValue: parsed.expectedValue
        };
      }
    } catch (error) {
      logger.warn("Failed to parse AI response, using fallback");
    }

    // Fallback to mock analysis
    return this.getMockAnalysis(marketData);
  }

  /**
   * Get mock analysis (fallback)
   */
  private getMockAnalysis(marketData: any): MarketAnalysis {
    // Simple heuristic: if yes price is below 50%, confidence increases
    const priceDiff = (5000 - marketData.yesPrice) / 100;
    const confidence = Math.max(3000, Math.min(8000, 5000 + priceDiff * 50));
    
    return {
      confidence: Math.round(confidence),
      recommendation: marketData.yesPrice < 5000 ? "yes" : "no",
      reasoning: "Based on current market pricing and volume analysis.",
      riskLevel: marketData.totalVolume > 1000000 ? "medium" : "high",
      expectedValue: 55
    };
  }

  /**
   * Calculate Kelly Fraction for optimal bet sizing
   */
  private calculateKellyFraction(
    winProbability: number,
    yesPrice: number,
    noPrice: number
  ): number {
    // Kelly Criterion: f = (bp - q) / b
    // where b = odds, p = win probability, q = loss probability
    const odds = yesPrice < 0.5 ? (1 / yesPrice - 1) : (1 / noPrice - 1);
    const p = winProbability;
    const q = 1 - p;
    const kelly = (odds * p - q) / odds;
    
    // Return fraction (0-1), but cap at 0.25 (25%) for safety
    return Math.max(0, Math.min(0.25, kelly));
  }
}

export const aiService = new AIService();
