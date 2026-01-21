<div align="center">

# 🎯 OracleVault

### AI-Enhanced Decentralized Prediction Aggregator & Vaults

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat&logo=solidity&logoColor=white)](https://soliditylang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)

**Aggregate prediction markets • AI-powered insights • Yield-generating vaults**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Smart Contracts](#-smart-contracts)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Security](#-security)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🎯 Overview

OracleVault is a comprehensive DeFi platform that revolutionizes prediction markets by:

- **Aggregating** prediction markets from multiple platforms (Polymarket, Augur, Kalshi, etc.)
- **Enhancing** decision-making with AI-powered analysis and confidence scores
- **Automating** betting strategies based on AI recommendations
- **Generating** passive yield through automated prediction market vaults

Built on scalable blockchain infrastructure with full DeFi composability, OracleVault aims to simplify access to prediction markets, enhance accuracy through AI, and provide new yield opportunities for DeFi users.

### Target Audience

- Crypto traders and DeFi enthusiasts
- Prediction market participants
- AI and automation enthusiasts
- Yield farmers seeking new opportunities

## ✨ Features

### 🔄 Market Aggregation
- Unified interface for multiple prediction market platforms
- Real-time price updates and market data
- Cross-platform market comparison
- Historical data and analytics

### 🤖 AI-Powered Analysis
- GPT-4 integration for market analysis
- Confidence scores for predictions
- Risk assessment and recommendations
- Automated betting suggestions

### ⚡ Automated Betting
- Strategy-based automated execution
- Configurable risk parameters
- Confidence threshold filtering
- Multi-market portfolio management

### 💰 Yield Vaults
- Automated prediction market strategies
- Performance and management fees
- Transparent fee structure
- Flexible deposit/withdrawal

### 🔐 Security
- OpenZeppelin audited contracts
- Reentrancy protection
- Access control mechanisms
- Emergency pause functionality

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Markets    │  │    Vaults    │  │  AI Analysis  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│              Backend API (Express/Node.js)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Aggregator   │  │   Vault      │  │  AI Service  │  │
│  │   Service    │  │   Service    │  │              │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│            Smart Contracts (Solidity)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Oracle     │  │ Prediction   │  │ Automated    │  │
│  │   Vault      │  │ Aggregator   │  │  Betting     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
                ┌───────▼────────┐
                │   Blockchain   │
                │  (EVM Chains)  │
                └────────────────┘
```

## 🛠️ Tech Stack

### Smart Contracts
- **Solidity** ^0.8.20 - Smart contract language
- **Hardhat** - Development framework and testing
- **OpenZeppelin** - Security libraries
- **Ethers.js** ^6.8.0 - Ethereum interaction

### Backend
- **Node.js** + **TypeScript** - Runtime and language
- **Express** - Web framework
- **OpenAI API** - AI analysis integration
- **Winston** - Logging
- **Node-cron** - Scheduled tasks

### Frontend
- **React** ^18.2.0 - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Ethers.js** - Wallet integration

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **MetaMask** or compatible Web3 wallet
- **OpenAI API Key** (optional, for AI features)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/crypmancer/defi-prediction-aggregator.git
   cd defi-prediction-aggregator
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install workspace dependencies**
   ```bash
   # Install all workspace dependencies
   cd packages/contracts && npm install
   cd ../backend && npm install
   cd ../frontend && npm install
   cd ../..
   ```

4. **Set up environment variables**

   Create `.env` files in each package:
   
   **packages/contracts/.env**
   ```env
   SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
   PRIVATE_KEY=your_private_key_here
   ETHERSCAN_API_KEY=your_etherscan_key
   ```
   
   **packages/backend/.env**
   ```env
   PORT=3001
   OPENAI_API_KEY=your_openai_api_key
   LOG_LEVEL=info
   ```
   
   **packages/frontend/.env**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

### Quick Start

1. **Start local blockchain** (optional, for testing)
   ```bash
   cd packages/contracts
   npx hardhat node
   ```

2. **Deploy contracts** (in a new terminal)
   ```bash
   cd packages/contracts
   npm run deploy:local
   ```

3. **Start backend**
   ```bash
   cd packages/backend
   npm run dev
   ```

4. **Start frontend** (in a new terminal)
   ```bash
   cd packages/frontend
   npm run dev
   ```

5. **Or run everything together** (from root)
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application!

## 📁 Project Structure

```
defi-prediction-aggregator/
├── packages/
│   ├── contracts/              # Smart contracts
│   │   ├── contracts/
│   │   │   ├── OracleVault.sol
│   │   │   ├── PredictionAggregator.sol
│   │   │   ├── AutomatedBetting.sol
│   │   │   └── MockERC20.sol
│   │   ├── scripts/
│   │   │   └── deploy.ts
│   │   ├── test/
│   │   │   ├── OracleVault.test.ts
│   │   │   └── PredictionAggregator.test.ts
│   │   ├── hardhat.config.ts
│   │   └── package.json
│   │
│   ├── backend/               # Backend API
│   │   ├── src/
│   │   │   ├── routes/
│   │   │   │   ├── prediction.ts
│   │   │   │   ├── vault.ts
│   │   │   │   └── ai.ts
│   │   │   ├── services/
│   │   │   │   ├── aggregator.ts
│   │   │   │   ├── prediction.ts
│   │   │   │   ├── vault.ts
│   │   │   │   └── ai.ts
│   │   │   ├── utils/
│   │   │   │   └── logger.ts
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   └── frontend/              # Frontend application
│       ├── src/
│       │   ├── components/
│       │   │   └── Layout.tsx
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   ├── Markets.tsx
│       │   │   ├── MarketDetail.tsx
│       │   │   ├── Vaults.tsx
│       │   │   └── VaultDetail.tsx
│       │   ├── contexts/
│       │   │   └── WalletContext.tsx
│       │   ├── App.tsx
│       │   └── main.tsx
│       └── package.json
│
├── package.json              # Root package.json
├── README.md                 # This file
├── DEPLOYMENT.md            # Deployment guide
├── CONTRIBUTING.md          # Contribution guidelines
└── env.example              # Environment variables template
```

## 📜 Smart Contracts

### OracleVault

Main vault contract for yield generation through prediction market strategies.

**Key Functions:**
- `deposit(uint256 amount)` - Deposit tokens into vault
- `withdraw(uint256 shares)` - Withdraw tokens from vault
- `executeStrategy(address strategy, uint256 amount, bytes data)` - Execute strategy
- `updateConfig(...)` - Update vault parameters

**Features:**
- Performance and management fees
- Minimum/maximum deposit limits
- Vault capacity limits
- Emergency pause functionality

### PredictionAggregator

Aggregates prediction market data from multiple platforms.

**Key Functions:**
- `updateMarket(...)` - Add or update market data
- `resolveMarket(string marketId, bool outcome)` - Resolve a market
- `updateAIConfidence(string marketId, uint256 confidence)` - Update AI confidence
- `getActiveMarkets()` - Get all active markets

**Features:**
- Multi-platform support
- Market resolution tracking
- AI confidence scores
- Query by platform

### AutomatedBetting

AI-powered automated betting system.

**Key Functions:**
- `placeBet(string marketId, bool side, uint256 amount, uint256 strategyId)` - Place automated bet
- `executeBet(address user, uint256 betIndex)` - Execute bet after resolution
- `createStrategy(...)` - Create new betting strategy

**Features:**
- Strategy-based betting
- Confidence threshold filtering
- Risk management
- Automated execution

## 🔌 API Documentation

### Predictions

#### Get All Markets
```http
GET /api/predictions
```

#### Get Market by ID
```http
GET /api/predictions/:marketId
```

#### Get Markets by Platform
```http
GET /api/predictions/platform/:platform
```

#### Get Active Markets
```http
GET /api/predictions/active
```

### Vaults

#### Get All Vaults
```http
GET /api/vaults
```

#### Get Vault Details
```http
GET /api/vaults/:address
```

#### Deposit into Vault
```http
POST /api/vaults/:address/deposit
Content-Type: application/json

{
  "amount": "1000000000000000000",
  "userAddress": "0x..."
}
```

#### Withdraw from Vault
```http
POST /api/vaults/:address/withdraw
Content-Type: application/json

{
  "shares": "1000000000000000000",
  "userAddress": "0x..."
}
```

### AI

#### Analyze Market
```http
POST /api/ai/analyze
Content-Type: application/json

{
  "marketId": "market-123",
  "marketData": { ... }
}
```

#### Get Betting Recommendation
```http
POST /api/ai/betting-recommendation
Content-Type: application/json

{
  "marketId": "market-123",
  "userPreferences": {
    "riskTolerance": "medium",
    "maxBetSize": 1000
  }
}
```

#### Get AI Confidence
```http
GET /api/ai/confidence/:marketId
```

## 💻 Development

### Available Scripts

**Root level:**
```bash
npm run dev              # Start backend and frontend
npm run build            # Build all packages
npm test                 # Run all tests
npm run deploy           # Deploy contracts
```

**Contracts:**
```bash
cd packages/contracts
npm run compile          # Compile contracts
npm test                 # Run tests
npm run deploy           # Deploy to network
npm run deploy:local     # Deploy to local network
```

**Backend:**
```bash
cd packages/backend
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
```

**Frontend:**
```bash
cd packages/frontend
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

## 🧪 Testing

### Contract Tests

```bash
cd packages/contracts
npm test
```

Tests cover:
- Deposit/withdraw functionality
- Fee calculations
- Access control
- Emergency functions
- Market aggregation
- AI confidence updates

### Backend Tests

```bash
cd packages/backend
npm test
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. **Deploy Contracts**
   ```bash
   cd packages/contracts
   npm run deploy
   ```

2. **Deploy Backend**
   ```bash
   cd packages/backend
   npm run build
   npm start
   ```

3. **Deploy Frontend**
   ```bash
   cd packages/frontend
   npm run build
   # Deploy dist/ folder to hosting service
   ```

## 🔒 Security

### Smart Contract Security

- ✅ OpenZeppelin battle-tested libraries
- ✅ Reentrancy guards on critical functions
- ✅ Access control for admin functions
- ✅ Pausable contracts for emergencies
- ✅ Input validation and bounds checking

### Best Practices

- ⚠️ **Always audit contracts before mainnet deployment**
- ⚠️ **Never commit private keys or secrets**
- ⚠️ **Use multi-sig for admin functions in production**
- ⚠️ **Test thoroughly on testnets first**
- ⚠️ **Monitor contracts after deployment**

### Reporting Security Issues

Please report security vulnerabilities privately to:
- **Email**: crypmancer@gmail.com
- **Telegram**: [@cryp_mancer](https://t.me/cryp_mancer)

## 🗺️ Roadmap

### MVP (Months 1-3) ✅
- [x] Core smart contracts
- [x] Basic market aggregation
- [x] AI integration
- [x] Frontend UI
- [ ] Security audits
- [ ] Testnet deployment

### Phase 2 (Months 4-6)
- [ ] Mainnet deployment
- [ ] Additional prediction market integrations
- [ ] Advanced AI strategies
- [ ] Mobile app
- [ ] Governance token

### Phase 3 (Year 1+)
- [ ] Cross-chain bridges
- [ ] Institutional features
- [ ] Advanced analytics dashboard
- [ ] Public API for third-party integrations
- [ ] DAO governance

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

This software is provided "as is" without warranty of any kind. Use at your own risk. Always conduct thorough testing and security audits before deploying to mainnet. This is experimental software and should not be used with funds you cannot afford to lose.

## 📞 Contact

- **Telegram**: [@cryp_mancer](https://t.me/cryp_mancer)
- **Email**: crypmancer@gmail.com
- **GitHub**: [crypmancer/defi-prediction-aggregator](https://github.com/crypmancer/defi-prediction-aggregator)

---

<div align="center">

**Built with ❤️ for the DeFi and prediction market community**

⭐ Star this repo if you find it helpful!

</div>
