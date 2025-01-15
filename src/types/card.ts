export interface Chain {
  name: string;
  symbol: string;
  logo?: string;
  color: string;
}

export interface CardData {
  chain: Chain;
  address: string;
  orientation: Orientation;
  backgroundImage?: string;
  mnemonicLength: 12 | 24;
}

export type CardFrontProps = Omit<CardData, 'mnemonicLength'>

export type MnemonicLength = CardData['mnemonicLength'] // This gets the type '12 | 24'

export type MnemonicSpaceProps = {
  number: number
}

export type CardBackProps = Pick<CardData, 'mnemonicLength' | 'orientation'>

export type BackgroundProps = {
  backgroundImage?: CardData['backgroundImage']
  color: Chain['color']  // Making it required since it comes from Chain
}

export type QRCodeProps = Pick<CardData, 'address'> & {
  isVertical: boolean;
}

export type MnemonicGridProps = Pick<CardData, 'mnemonicLength'> & {
  isVertical: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  orientation: Orientation;
}

export type Orientation = "horizontal" | "vertical";
