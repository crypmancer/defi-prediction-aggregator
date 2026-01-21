// Configuration for API usage
// Set to true to use mock data (no backend required)
// Set to false to use real API calls
// You can also set VITE_USE_MOCK_DATA=true in .env file
export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false' // Default to true (use mock data)
