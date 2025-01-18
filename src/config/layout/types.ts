export type CardOrientation = 'horizontal' | 'vertical';

export type Corner = {
  name: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  x: number;
  y: number;
}

export type CryptoCardData = {
  coinName: string;
  ticker: string;
  walletAddress: string;
};

export type CardBackConfig = {
  orientation: CardOrientation;
  mnemonicLength: 12 | 24;
};
