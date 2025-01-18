import type { Chain } from "@/config/chains/types";

export type CardOrientation = 'horizontal' | 'vertical';

export type Corner = {
  name: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  x: number;
  y: number;
}

export interface CardData {
  chain: Chain;
  address: string;
  orientation: CardOrientation;
  backgroundImage?: string;
  mnemonicLength: 12 | 24;
}

export interface CardProps {
  children: React.ReactNode;
  orientation: CardOrientation;
}

export interface CardFrontProps {
  chain: Chain;
  address: string;
  orientation: CardOrientation;
  backgroundImage?: string;
}

export interface CardBackProps {
  mnemonicLength: 12 | 24;
  orientation: CardOrientation;
}

export interface QRCodeProps {
  address: string;
  isVertical?: boolean;
}

export interface MnemonicGridProps {
  mnemonicLength: 12 | 24;
  isVertical: boolean;
}

export interface MnemonicSpaceProps {
  number: number;
}

export interface BackgroundProps {
  backgroundImage?: string;
  color: string;
}
