import { Router } from "express";
import { vaultService } from "../services/vault";
import { logger } from "../utils/logger";

export const vaultRoutes = Router();

/**
 * GET /api/vaults
 * Get all vaults
 */
vaultRoutes.get("/", async (req, res) => {
  try {
    const vaults = await vaultService.getAllVaults();
    res.json({ success: true, data: vaults });
  } catch (error) {
    logger.error("Error fetching vaults:", error);
    res.status(500).json({ success: false, error: "Failed to fetch vaults" });
  }
});

/**
 * GET /api/vaults/:address
 * Get vault details
 */
vaultRoutes.get("/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const vault = await vaultService.getVaultDetails(address);
    
    if (!vault) {
      return res.status(404).json({ success: false, error: "Vault not found" });
    }
    
    res.json({ success: true, data: vault });
  } catch (error) {
    logger.error("Error fetching vault:", error);
    res.status(500).json({ success: false, error: "Failed to fetch vault" });
  }
});

/**
 * POST /api/vaults/:address/deposit
 * Deposit into vault
 */
vaultRoutes.post("/:address/deposit", async (req, res) => {
  try {
    const { address } = req.params;
    const { amount, userAddress } = req.body;
    
    if (!amount || !userAddress) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    
    const result = await vaultService.deposit(address, userAddress, amount);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error depositing:", error);
    res.status(500).json({ success: false, error: "Failed to deposit" });
  }
});

/**
 * POST /api/vaults/:address/withdraw
 * Withdraw from vault
 */
vaultRoutes.post("/:address/withdraw", async (req, res) => {
  try {
    const { address } = req.params;
    const { shares, userAddress } = req.body;
    
    if (!shares || !userAddress) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    
    const result = await vaultService.withdraw(address, userAddress, shares);
    res.json({ success: true, data: result });
  } catch (error) {
    logger.error("Error withdrawing:", error);
    res.status(500).json({ success: false, error: "Failed to withdraw" });
  }
});
