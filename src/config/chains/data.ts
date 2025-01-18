import { Chain } from "./types";

// Static data as fallback
export const STATIC_CRYPTOCURRENCIES: Chain[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    color: "#F7931A",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    color: "#627EEA",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    color: "#E84142",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    color: "#F3BA2F",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    color: "#0033AD",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
  },
  {
    name: "Solana",
    symbol: "SOL",
    color: "#14F195",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    color: "#E6007A",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg",
  },
  {
    name: "Ripple",
    symbol: "XRP",
    color: "#23292F",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    color: "#C2A633",
    logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg",
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    color: "#8247E5",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    color: "#2A5ADA",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg",
  },
];

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
      color: CHAIN_COLORS[coin.id] || STATIC_CRYPTOCURRENCIES.find(c => 
        c.symbol.toLowerCase() === coin.symbol.toLowerCase()
      )?.color || '#000000'
    }));
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return STATIC_CRYPTOCURRENCIES;
  }
};

// Initialize with static data, then update from API
export let CRYPTOCURRENCIES: Chain[] = STATIC_CRYPTOCURRENCIES;

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