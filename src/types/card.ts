export interface Chain {
  name: string;
  symbol: string;
  logo?: string;
  color: string;
}

export interface CardData {
  chain: Chain;
  address: string;
  orientation: "horizontal" | "vertical";
  backgroundImage?: string;
  mnemonicLength: 12 | 24;
}

export interface CardFrontProps {
  chain: {
    name: string;
    symbol: string;
    logo?: string;
    color: string;
  };
  address: string;
  orientation: "horizontal" | "vertical";
  backgroundImage?: string;
}

export interface CardBackProps {
  mnemonicLength: 12 | 24;
  orientation: "horizontal" | "vertical";
}

export interface BackgroundProps {
  backgroundImage?: string;
  color?: string;
}

export interface QRCodeProps {
  address: string;
  isVertical: boolean;
}

export interface MnemonicGridProps {
  mnemonicLength: 12 | 24;
  isVertical: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  orientation: "horizontal" | "vertical";
}

export type Orientation = "horizontal" | "vertical";

export type MnemonicLength = 12 | 24;
