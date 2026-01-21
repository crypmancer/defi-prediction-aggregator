import { expect } from "chai";
import { ethers } from "hardhat";
import { PredictionAggregator } from "../typechain-types";

describe("PredictionAggregator", function () {
  let aggregator: PredictionAggregator;
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const AggregatorFactory = await ethers.getContractFactory("PredictionAggregator");
    aggregator = await AggregatorFactory.deploy();
  });

  describe("Market Management", function () {
    it("Should add a new market", async function () {
      const marketId = "test-market-1";
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await expect(
        aggregator.updateMarket(
          marketId,
          "Polymarket",
          "Will BTC reach $100K?",
          endTime,
          6000, // 60% yes
          4000, // 40% no
          1000000
        )
      ).to.emit(aggregator, "MarketAdded");

      const market = await aggregator.getMarket(marketId);
      expect(market.question).to.equal("Will BTC reach $100K?");
    });

    it("Should update existing market", async function () {
      const marketId = "test-market-1";
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await aggregator.updateMarket(
        marketId,
        "Polymarket",
        "Will BTC reach $100K?",
        endTime,
        6000,
        4000,
        1000000
      );

      await aggregator.updateMarket(
        marketId,
        "Polymarket",
        "Will BTC reach $100K?",
        endTime,
        6500,
        3500,
        1500000
      );

      const market = await aggregator.getMarket(marketId);
      expect(market.yesPrice).to.equal(6500);
      expect(market.totalVolume).to.equal(1500000);
    });

    it("Should resolve a market", async function () {
      const marketId = "test-market-1";
      const endTime = Math.floor(Date.now() / 1000) - 86400; // Past time

      await aggregator.updateMarket(
        marketId,
        "Polymarket",
        "Will BTC reach $100K?",
        endTime,
        6000,
        4000,
        1000000
      );

      await expect(aggregator.resolveMarket(marketId, true))
        .to.emit(aggregator, "MarketResolved");

      const market = await aggregator.getMarket(marketId);
      expect(market.resolved).to.be.true;
      expect(market.outcome).to.be.true;
    });
  });

  describe("AI Confidence", function () {
    it("Should update AI confidence", async function () {
      const marketId = "test-market-1";
      const endTime = Math.floor(Date.now() / 1000) + 86400;

      await aggregator.updateMarket(
        marketId,
        "Polymarket",
        "Will BTC reach $100K?",
        endTime,
        6000,
        4000,
        1000000
      );

      await expect(aggregator.updateAIConfidence(marketId, 7500))
        .to.emit(aggregator, "AIConfidenceUpdated");

      expect(await aggregator.aiConfidence(marketId)).to.equal(7500);
    });
  });
});
