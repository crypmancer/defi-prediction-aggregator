// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title PredictionAggregator
 * @notice Aggregates prediction market data from multiple platforms
 */
contract PredictionAggregator is Ownable, Pausable {
    
    struct PredictionMarket {
        string marketId;
        string platform; // e.g., "Polymarket", "Augur", "Kalshi"
        string question;
        uint256 endTime;
        uint256 totalVolume;
        uint256 yesPrice; // Price in basis points (10000 = 100%)
        uint256 noPrice; // Price in basis points
        bool resolved;
        bool outcome; // true = yes, false = no
        uint256 lastUpdated;
    }
    
    struct MarketSource {
        address sourceContract;
        bool active;
        uint256 lastUpdate;
    }
    
    // Mapping from market ID to market data
    mapping(string => PredictionMarket) public markets;
    
    // List of all market IDs
    string[] public marketIds;
    
    // Mapping from platform to source contracts
    mapping(string => MarketSource) public sources;
    
    // AI confidence scores (0-10000, where 10000 = 100%)
    mapping(string => uint256) public aiConfidence;
    
    // Events
    event MarketAdded(string indexed marketId, string platform, string question);
    event MarketUpdated(string indexed marketId, uint256 yesPrice, uint256 noPrice, uint256 volume);
    event MarketResolved(string indexed marketId, bool outcome);
    event SourceAdded(string indexed platform, address sourceContract);
    event AIConfidenceUpdated(string indexed marketId, uint256 confidence);
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @notice Add or update a prediction market
     */
    function updateMarket(
        string memory marketId,
        string memory platform,
        string memory question,
        uint256 endTime,
        uint256 yesPrice,
        uint256 noPrice,
        uint256 volume
    ) external onlyOwner {
        require(bytes(marketId).length > 0, "Invalid market ID");
        require(yesPrice + noPrice <= 10000, "Invalid prices");
        require(endTime > block.timestamp, "Invalid end time");
        
        bool isNew = bytes(markets[marketId].marketId).length == 0;
        
        markets[marketId] = PredictionMarket({
            marketId: marketId,
            platform: platform,
            question: question,
            endTime: endTime,
            totalVolume: volume,
            yesPrice: yesPrice,
            noPrice: noPrice,
            resolved: false,
            outcome: false,
            lastUpdated: block.timestamp
        });
        
        if (isNew) {
            marketIds.push(marketId);
            emit MarketAdded(marketId, platform, question);
        }
        
        emit MarketUpdated(marketId, yesPrice, noPrice, volume);
    }
    
    /**
     * @notice Resolve a market
     */
    function resolveMarket(string memory marketId, bool outcome) external onlyOwner {
        require(bytes(markets[marketId].marketId).length > 0, "Market not found");
        require(!markets[marketId].resolved, "Market already resolved");
        require(block.timestamp >= markets[marketId].endTime, "Market not ended");
        
        markets[marketId].resolved = true;
        markets[marketId].outcome = outcome;
        
        emit MarketResolved(marketId, outcome);
    }
    
    /**
     * @notice Add a source for market data
     */
    function addSource(string memory platform, address sourceContract) external onlyOwner {
        require(sourceContract != address(0), "Invalid source");
        sources[platform] = MarketSource({
            sourceContract: sourceContract,
            active: true,
            lastUpdate: block.timestamp
        });
        
        emit SourceAdded(platform, sourceContract);
    }
    
    /**
     * @notice Update AI confidence score for a market
     */
    function updateAIConfidence(string memory marketId, uint256 confidence) external onlyOwner {
        require(bytes(markets[marketId].marketId).length > 0, "Market not found");
        require(confidence <= 10000, "Invalid confidence");
        
        aiConfidence[marketId] = confidence;
        
        emit AIConfidenceUpdated(marketId, confidence);
    }
    
    /**
     * @notice Get market data
     */
    function getMarket(string memory marketId) external view returns (PredictionMarket memory) {
        return markets[marketId];
    }
    
    /**
     * @notice Get all market IDs
     */
    function getAllMarketIds() external view returns (string[] memory) {
        return marketIds;
    }
    
    /**
     * @notice Get markets by platform
     */
    function getMarketsByPlatform(string memory platform) external view returns (string[] memory) {
        string[] memory result = new string[](marketIds.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < marketIds.length; i++) {
            if (keccak256(bytes(markets[marketIds[i]].platform)) == keccak256(bytes(platform))) {
                result[count] = marketIds[i];
                count++;
            }
        }
        
        // Resize array
        string[] memory finalResult = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }
    
    /**
     * @notice Get active markets (not resolved, not ended)
     */
    function getActiveMarkets() external view returns (string[] memory) {
        string[] memory result = new string[](marketIds.length);
        uint256 count = 0;
        
        for (uint256 i = 0; i < marketIds.length; i++) {
            PredictionMarket memory market = markets[marketIds[i]];
            if (!market.resolved && market.endTime > block.timestamp) {
                result[count] = marketIds[i];
                count++;
            }
        }
        
        // Resize array
        string[] memory finalResult = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            finalResult[i] = result[i];
        }
        
        return finalResult;
    }
    
    /**
     * @notice Pause contract
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
}
