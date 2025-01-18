import { Chain } from "./types";

// API endpoint
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

// Custom colors for top cryptocurrencies
const CHAIN_COLORS: Record<string, string> = {
  'bitcoin': '#F7931A',
  'ethereum': '#627EEA',
  'binancecoin': '#F3BA2F',
  'cardano': '#0033AD',
  'solana': '#14F195',
  'polkadot': '#E6007A',
  'ripple': '#23292F',
  'chainlink': '#2A5ADA',
};

export const fetchCryptocurrencies = async (): Promise<Chain[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }

    const data = await response.json();
    
    return data.map((coin: any) => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      logo: coin.image,
      color: CHAIN_COLORS[coin.id] || '#000000'
    }));
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return [];
  }
};

// Initialize as empty array, will be populated by API
export let CRYPTOCURRENCIES: Chain[] = [];

// Update cryptocurrencies data
export const updateCryptocurrencies = async () => {
  try {
    const data = await fetchCryptocurrencies();
    CRYPTOCURRENCIES = data;
  } catch (error) {
    console.error('Failed to update cryptocurrencies:', error);
  }
};

// Initial fetch
updateCryptocurrencies();