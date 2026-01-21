// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title OracleVault
 * @notice Main vault contract for yield generation through prediction market strategies
 */
contract OracleVault is ReentrancyGuard, Ownable, Pausable {
    using SafeERC20 for IERC20;

    // Token that the vault accepts
    IERC20 public immutable depositToken;
    
    // Total assets under management
    uint256 public totalAssets;
    
    // Total shares issued
    uint256 public totalShares;
    
    // Performance fee (basis points, e.g., 200 = 2%)
    uint256 public performanceFeeBps;
    
    // Management fee (basis points per year)
    uint256 public managementFeeBps;
    
    // Last fee collection timestamp
    uint256 public lastFeeCollection;
    
    // Minimum deposit amount
    uint256 public minDeposit;
    
    // Maximum deposit amount (0 = unlimited)
    uint256 public maxDeposit;
    
    // Vault cap (0 = unlimited)
    uint256 public vaultCap;
    
    // Events
    event Deposited(address indexed user, uint256 amount, uint256 shares);
    event Withdrawn(address indexed user, uint256 shares, uint256 amount);
    event FeesCollected(uint256 performanceFee, uint256 managementFee);
    event StrategyExecuted(address indexed strategy, uint256 amount, uint256 profit);
    event VaultConfigUpdated(uint256 performanceFee, uint256 managementFee, uint256 vaultCap);
    
    // User balances
    mapping(address => uint256) public shares;
    
    constructor(
        address _depositToken,
        uint256 _performanceFeeBps,
        uint256 _managementFeeBps,
        uint256 _minDeposit,
        uint256 _vaultCap
    ) Ownable(msg.sender) {
        require(_depositToken != address(0), "Invalid token address");
        require(_performanceFeeBps <= 1000, "Performance fee too high"); // Max 10%
        require(_managementFeeBps <= 500, "Management fee too high"); // Max 5%
        
        depositToken = IERC20(_depositToken);
        performanceFeeBps = _performanceFeeBps;
        managementFeeBps = _managementFeeBps;
        minDeposit = _minDeposit;
        vaultCap = _vaultCap;
        lastFeeCollection = block.timestamp;
    }
    
    /**
     * @notice Deposit tokens into the vault
     * @param amount Amount of tokens to deposit
     * @return shares Amount of shares minted
     */
    function deposit(uint256 amount) external nonReentrant whenNotPaused returns (uint256 shares) {
        require(amount >= minDeposit, "Amount below minimum");
        require(maxDeposit == 0 || amount <= maxDeposit, "Amount exceeds maximum");
        require(vaultCap == 0 || totalAssets + amount <= vaultCap, "Vault cap exceeded");
        
        // Collect fees before deposit
        _collectFees();
        
        depositToken.safeTransferFrom(msg.sender, address(this), amount);
        
        if (totalShares == 0) {
            shares = amount;
        } else {
            shares = (amount * totalShares) / totalAssets;
        }
        
        totalAssets += amount;
        totalShares += shares;
        shares[msg.sender] += shares;
        
        emit Deposited(msg.sender, amount, shares);
        return shares;
    }
    
    /**
     * @notice Withdraw tokens from the vault
     * @param sharesAmount Amount of shares to redeem
     * @return amount Amount of tokens withdrawn
     */
    function withdraw(uint256 sharesAmount) external nonReentrant returns (uint256 amount) {
        require(sharesAmount > 0, "Invalid shares amount");
        require(shares[msg.sender] >= sharesAmount, "Insufficient shares");
        
        // Collect fees before withdrawal
        _collectFees();
        
        amount = (sharesAmount * totalAssets) / totalShares;
        
        shares[msg.sender] -= sharesAmount;
        totalShares -= sharesAmount;
        totalAssets -= amount;
        
        depositToken.safeTransfer(msg.sender, amount);
        
        emit Withdrawn(msg.sender, sharesAmount, amount);
        return amount;
    }
    
    /**
     * @notice Get the current value of shares in underlying tokens
     * @param sharesAmount Amount of shares
     * @return Value in underlying tokens
     */
    function sharesToTokens(uint256 sharesAmount) external view returns (uint256) {
        if (totalShares == 0) return 0;
        return (sharesAmount * totalAssets) / totalShares;
    }
    
    /**
     * @notice Get the amount of shares for a given token amount
     * @param tokenAmount Amount of tokens
     * @return Amount of shares
     */
    function tokensToShares(uint256 tokenAmount) external view returns (uint256) {
        if (totalShares == 0) return tokenAmount;
        return (tokenAmount * totalShares) / totalAssets;
    }
    
    /**
     * @notice Execute a strategy (only owner or authorized strategies)
     * @param strategy Address of the strategy contract
     * @param amount Amount to allocate to strategy
     * @param data Additional data for strategy execution
     */
    function executeStrategy(
        address strategy,
        uint256 amount,
        bytes calldata data
    ) external onlyOwner nonReentrant {
        require(strategy != address(0), "Invalid strategy");
        require(amount <= totalAssets, "Insufficient assets");
        
        uint256 balanceBefore = depositToken.balanceOf(address(this));
        depositToken.safeTransfer(strategy, amount);
        
        // Strategy should return tokens to this contract
        // In a real implementation, you'd have a strategy interface
        
        uint256 balanceAfter = depositToken.balanceOf(address(this));
        uint256 profit = balanceAfter > balanceBefore ? balanceAfter - balanceBefore : 0;
        
        if (profit > 0) {
            totalAssets = balanceAfter;
        }
        
        emit StrategyExecuted(strategy, amount, profit);
    }
    
    /**
     * @notice Collect performance and management fees
     */
    function _collectFees() internal {
        if (totalAssets == 0) {
            lastFeeCollection = block.timestamp;
            return;
        }
        
        uint256 timeElapsed = block.timestamp - lastFeeCollection;
        uint256 managementFee = (totalAssets * managementFeeBps * timeElapsed) / (10000 * 365 days);
        
        // Performance fee is collected on profit (simplified - in production, track high water mark)
        // For now, we'll just collect management fee
        
        if (managementFee > 0) {
            // In production, transfer to fee recipient
            // For now, we'll just update the accounting
            totalAssets -= managementFee;
        }
        
        lastFeeCollection = block.timestamp;
        
        emit FeesCollected(0, managementFee);
    }
    
    /**
     * @notice Update vault configuration
     */
    function updateConfig(
        uint256 _performanceFeeBps,
        uint256 _managementFeeBps,
        uint256 _vaultCap
    ) external onlyOwner {
        require(_performanceFeeBps <= 1000, "Performance fee too high");
        require(_managementFeeBps <= 500, "Management fee too high");
        
        performanceFeeBps = _performanceFeeBps;
        managementFeeBps = _managementFeeBps;
        vaultCap = _vaultCap;
        
        emit VaultConfigUpdated(_performanceFeeBps, _managementFeeBps, _vaultCap);
    }
    
    /**
     * @notice Pause vault operations
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @notice Unpause vault operations
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @notice Emergency withdraw (only owner)
     */
    function emergencyWithdraw(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }
}
