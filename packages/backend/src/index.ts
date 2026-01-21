import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { predictionRoutes } from "./routes/prediction";
import { vaultRoutes } from "./routes/vault";
import { aiRoutes } from "./routes/ai";
import { aggregatorService } from "./services/aggregator";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/predictions", predictionRoutes);
app.use("/api/vaults", vaultRoutes);
app.use("/api/ai", aiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start aggregator service
aggregatorService.start();

// Start server
app.listen(PORT, () => {
  logger.info(`OracleVault Backend running on port ${PORT}`);
});

export default app;
