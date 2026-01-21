# Deployment Guide

This guide covers deploying OracleVault to various blockchain networks and hosting services.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MetaMask or compatible wallet
- RPC access to target blockchain
- API keys for verification (Etherscan, etc.)

## Smart Contract Deployment

### 1. Prepare Environment

Create a `.env` file in `packages/contracts/`:

```bash
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_key
```

### 2. Deploy to Sepolia (Testnet)

```bash
cd packages/contracts
npm run deploy
```

The script will deploy:
1. MockERC20 token (for testing)
2. PredictionAggregator
3. OracleVault
4. AutomatedBetting

### 3. Verify Contracts

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### 4. Update Contract Addresses

After deployment, update contract addresses in:
- Backend configuration
- Frontend environment variables

## Backend Deployment

### Option 1: VPS/Server

1. **Build the application**
   ```bash
   cd packages/backend
   npm run build
   ```

2. **Set environment variables**
   ```bash
   export PORT=3001
   export OPENAI_API_KEY=your_key
   # ... other variables
   ```

3. **Run with PM2** (recommended)
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name oraclevault-backend
   ```

### Option 2: Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t oraclevault-backend .
docker run -p 3001:3001 --env-file .env oraclevault-backend
```

### Option 3: Cloud Platforms

#### Heroku
```bash
heroku create oraclevault-backend
heroku config:set OPENAI_API_KEY=your_key
git push heroku main
```

#### Railway
- Connect GitHub repository
- Set environment variables in dashboard
- Deploy automatically

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd packages/frontend
   vercel
   ```

3. **Set environment variables**
   - `VITE_API_URL`: Your backend API URL

### Option 2: Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment variables**
   - Add `VITE_API_URL` in Netlify dashboard

### Option 3: Static Hosting

1. **Build**
   ```bash
   cd packages/frontend
   npm run build
   ```

2. **Upload `dist/` folder** to your hosting service

## Network-Specific Configuration

### Ethereum Mainnet
- Update RPC URLs
- Use mainnet private keys (secure storage!)
- Higher gas costs
- Real funds at risk

### Polygon
- Lower gas costs
- Faster transactions
- Good for MVP

### Arbitrum
- Very low gas costs
- Fast transactions
- EVM compatible

## Security Checklist

- [ ] Contracts audited by security firm
- [ ] Private keys stored securely (never commit!)
- [ ] Environment variables properly configured
- [ ] Rate limiting on API endpoints
- [ ] CORS properly configured
- [ ] HTTPS enabled
- [ ] Monitoring and logging set up
- [ ] Emergency pause functions tested
- [ ] Multi-sig for admin functions (recommended)

## Post-Deployment

1. **Verify contracts** on block explorer
2. **Test all functions** on testnet first
3. **Monitor** contract interactions
4. **Set up alerts** for critical events
5. **Document** contract addresses and ABIs

## Troubleshooting

### Contract Deployment Fails
- Check RPC URL is correct
- Ensure account has enough ETH for gas
- Verify network ID matches

### Backend Won't Start
- Check environment variables
- Verify port is available
- Check logs for errors

### Frontend Can't Connect
- Verify API URL is correct
- Check CORS settings
- Ensure backend is running

## Support

For deployment issues, contact:
- Telegram: [@cryp_mancer](https://t.me/cryp_mancer)
- Email: crypmancer@gmail.com
