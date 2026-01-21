// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./PredictionAggregator.sol";

/**
 * @title AutomatedBetting
 * @notice AI-powered automated betting system based on prediction market analysis
 */
contract AutomatedBetting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    PredictionAggregator public aggregator;
    
    struct Bet {
        string marketId;
        bool side; // true = yes, false = no
        uint256 amount;
        uint256 price;
        uint256 timestamp;
        bool executed;
        address executor;
    }
    
    struct Strategy {
        string name;
        uint256 minConfidence; // Minimum AI confidence (basis points)
        uint256 maxBetSize; // Maximum bet per market
        uint256 maxTotalExposure; // Maximum total exposure
        bool active;
    }
    
    // User bets
    mapping(address => Bet[]) public userBets;
    mapping(address => uint256) public totalBets;
    
    // Strategies
    mapping(uint256 => Strategy) public strategies;
    uint256 public strategyCount;
    
    // Total exposure per market
    mapping(string => uint256) public marketExposure;
    
    // Total exposure across all markets
    uint256 public totalExposure;
    
    // Events
    event BetPlaced(
        address indexed user,
        string indexed marketId,
        bool side,
        uint256 amount,
        uint256 price
    );
    event BetExecuted(
        address indexed user,
        string indexed marketId,
        bool side,
        uint256 amount,
        uint256 profit
    );
    event StrategyCreated(uint256 indexed strategyId, string name);
    event StrategyUpdated(uint256 indexed strategyId, bool active);
    
    constructor(address _aggregator) Ownable(msg.sender) {
        require(_aggregator != address(0), "Invalid aggregator");
        aggregator = PredictionAggregator(_aggregator);
    }
    
    /**
     * @notice Place an automated bet based on AI analysis
     * @param marketId Market identifier
     * @param side true for yes, false for no
     * @param amount Bet amount
     * @param strategyId Strategy to use
     */
    function placeBet(
        string memory marketId,
        bool side,
        uint256 amount,
        uint256 strategyId
    ) external nonReentrant {
        require(amount > 0, "Invalid amount");
        require(strategies[strategyId].active, "Strategy not active");
        
        PredictionAggregator.PredictionMarket memory market = aggregator.getMarket(marketId);
        require(bytes(market.marketId).length > 0, "Market not found");
        require(!market.resolved, "Market resolved");
        require(block.timestamp < market.endTime, "Market ended");
        
        uint256 confidence = aggregator.aiConfidence(marketId);
        require(confidence >= strategies[strategyId].minConfidence, "Confidence too low");
        
        require(
            marketExposure[marketId] + amount <= strategies[strategyId].maxBetSize,
            "Exceeds max bet size"
        );
        
        require(
            totalExposure + amount <= strategies[strategyId].maxTotalExposure,
            "Exceeds max total exposure"
        );
        
        uint256 price = side ? market.yesPrice : market.noPrice;
        
        Bet memory bet = Bet({
            marketId: marketId,
            side: side,
            amount: amount,
            price: price,
            timestamp: block.timestamp,
            executed: false,
            executor: msg.sender
        });
        
        userBets[msg.sender].push(bet);
        totalBets[msg.sender]++;
        marketExposure[marketId] += amount;
        totalExposure += amount;
        
        emit BetPlaced(msg.sender, marketId, side, amount, price);
    }
    
    /**
     * @notice Execute a bet after market resolution
     * @param user Address of the bettor
     * @param betIndex Index of the bet in user's bet array
     */
    function executeBet(address user, uint256 betIndex) external nonReentrant {
        require(betIndex < userBets[user].length, "Invalid bet index");
        
        Bet storage bet = userBets[user][betIndex];
        require(!bet.executed, "Bet already executed");
        
        PredictionAggregator.PredictionMarket memory market = aggregator.getMarket(bet.marketId);
        require(market.resolved, "Market not resolved");
        
        bet.executed = true;
        
        // Calculate profit/loss
        uint256 profit = 0;
        if (bet.side == market.outcome) {
            // Win: profit = amount * (1 / price - 1)
            // Simplified: if price was 60% (6000 bps), and you bet 100, you get 100/0.6 = 166.67, profit = 66.67
            profit = (bet.amount * 10000) / bet.price - bet.amount;
        } else {
            // Loss: lose the bet amount
            profit = 0;
        }
        
        // In production, you'd transfer tokens here
        // For now, we just emit the event
        
        emit BetExecuted(user, bet.marketId, bet.side, bet.amount, profit);
    }
    
    /**
     * @notice Create a new betting strategy
     */
    function createStrategy(
        string memory name,
        uint256 minConfidence,
        uint256 maxBetSize,
        uint256 maxTotalExposure
    ) external onlyOwner returns (uint256) {
        require(minConfidence <= 10000, "Invalid confidence");
        
        uint256 strategyId = strategyCount++;
        strategies[strategyId] = Strategy({
            name: name,
            minConfidence: minConfidence,
            maxBetSize: maxBetSize,
            maxTotalExposure: maxTotalExposure,
            active: true
        });
        
        emit StrategyCreated(strategyId, name);
        return strategyId;
    }
    
    /**
     * @notice Update strategy
     */
    function updateStrategy(
        uint256 strategyId,
        bool active
    ) external onlyOwner {
        require(strategyId < strategyCount, "Invalid strategy");
        strategies[strategyId].active = active;
        
        emit StrategyUpdated(strategyId, active);
    }
    
    /**
     * @notice Get user bets
     */
    function getUserBets(address user) external view returns (Bet[] memory) {
        return userBets[user];
    }
    
    /**
     * @notice Get strategy details
     */
    function getStrategy(uint256 strategyId) external view returns (Strategy memory) {
        return strategies[strategyId];
    }
}
