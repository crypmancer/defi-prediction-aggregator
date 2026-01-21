# Frontend - OracleVault

React frontend for the OracleVault prediction market aggregator.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🔗 Wallet integration (MetaMask)
- 📊 Market browsing and details
- 💰 Vault management
- 🤖 AI analysis display
- 📱 Responsive design

## Development

### Using Mock Data (No Backend Required)

By default, the frontend uses mock data, so you can develop without running the backend:

```bash
npm run dev
```

The app will work with sample data for:
- Prediction markets
- Vaults
- AI analysis

### Using Real API

To connect to the backend API:

1. Set `VITE_USE_MOCK_DATA=false` in your `.env` file
2. Make sure the backend is running on `http://localhost:3001`
3. Restart the dev server

## Environment Variables

See `env.example` for all available configuration options.

Key variables:
- `VITE_API_URL` - Backend API URL
- `VITE_USE_MOCK_DATA` - Use mock data (true/false)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── contexts/      # React contexts (Wallet, etc.)
├── services/      # API services and mock data
└── config.ts      # Configuration
```
