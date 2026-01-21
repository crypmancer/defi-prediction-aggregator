import { Router } from "express";
import { predictionService } from "../services/prediction";
import { logger } from "../utils/logger";

export const predictionRoutes = Router();

/**
 * GET /api/predictions
 * Get all prediction markets
 */
predictionRoutes.get("/", async (req, res) => {
  try {
    const markets = await predictionService.getAllMarkets();
    res.json({ success: true, data: markets });
  } catch (error) {
    logger.error("Error fetching markets:", error);
    res.status(500).json({ success: false, error: "Failed to fetch markets" });
  }
});

/**
 * GET /api/predictions/:marketId
 * Get specific market
 */
predictionRoutes.get("/:marketId", async (req, res) => {
  try {
    const { marketId } = req.params;
    const market = await predictionService.getMarket(marketId);
    
    if (!market) {
      return res.status(404).json({ success: false, error: "Market not found" });
    }
    
    res.json({ success: true, data: market });
  } catch (error) {
    logger.error("Error fetching market:", error);
    res.status(500).json({ success: false, error: "Failed to fetch market" });
  }
});

/**
 * GET /api/predictions/platform/:platform
 * Get markets by platform
 */
predictionRoutes.get("/platform/:platform", async (req, res) => {
  try {
    const { platform } = req.params;
    const markets = await predictionService.getMarketsByPlatform(platform);
    res.json({ success: true, data: markets });
  } catch (error) {
    logger.error("Error fetching markets by platform:", error);
    res.status(500).json({ success: false, error: "Failed to fetch markets" });
  }
});

/**
 * GET /api/predictions/active
 * Get active markets
 */
predictionRoutes.get("/active", async (req, res) => {
  try {
    const markets = await predictionService.getActiveMarkets();
    res.json({ success: true, data: markets });
  } catch (error) {
    logger.error("Error fetching active markets:", error);
    res.status(500).json({ success: false, error: "Failed to fetch active markets" });
  }
});
