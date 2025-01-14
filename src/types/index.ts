export interface Chain {
  name: string;
  symbol: string;
  logo: string;
  color: string;
}

export interface CardData {
  chain: Chain;
  address: string;
  orientation: 'horizontal' | 'vertical';
  backgroundImage?: string;
  mnemonicLength: 12 | 24;
}
