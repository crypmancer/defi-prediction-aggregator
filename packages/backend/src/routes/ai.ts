import { Router } from "express";
import { aiService } from "../services/ai";
import { logger } from "../utils/logger";

export const aiRoutes = Router();

/**
 * POST /api/ai/analyze
 * Analyze a prediction market with AI
 */
aiRoutes.post("/analyze", async (req, res) => {
  try {
    const { marketId, marketData } = req.body;
    
    if (!marketId || !marketData) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    
    const analysis = await aiService.analyzeMarket(marketId, marketData);
    res.json({ success: true, data: analysis });
  } catch (error) {
    logger.error("Error analyzing market:", error);
    res.status(500).json({ success: false, error: "Failed to analyze market" });
  }
});

/**
 * POST /api/ai/betting-recommendation
 * Get AI betting recommendation
 */
aiRoutes.post("/betting-recommendation", async (req, res) => {
  try {
    const { marketId, userPreferences } = req.body;
    
    if (!marketId) {
      return res.status(400).json({ success: false, error: "Missing marketId" });
    }
    
    const recommendation = await aiService.getBettingRecommendation(marketId, userPreferences);
    res.json({ success: true, data: recommendation });
  } catch (error) {
    logger.error("Error getting recommendation:", error);
    res.status(500).json({ success: false, error: "Failed to get recommendation" });
  }
});

/**
 * GET /api/ai/confidence/:marketId
 * Get AI confidence score for a market
 */
aiRoutes.get("/confidence/:marketId", async (req, res) => {
  try {
    const { marketId } = req.params;
    const confidence = await aiService.getConfidence(marketId);
    res.json({ success: true, data: { marketId, confidence } });
  } catch (error) {
    logger.error("Error getting confidence:", error);
    res.status(500).json({ success: false, error: "Failed to get confidence" });
  }
});
