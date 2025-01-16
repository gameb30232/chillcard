import { CARD_CONFIG } from "@/config/constants";
import { theme } from "@/config/theme";

// Pure function to generate mnemonic spaces
export const generateMnemonicSpaces = (length: 12 | 24) =>
  Array.from({ length }, (_, i) => i + 1);

// Pure function to format address
export const formatAddress = (address: string) => ({
  firstHalf: address.slice(0, Math.ceil(address.length / 2)),
  secondHalf: address.slice(Math.ceil(address.length / 2)),
});

// Get card dimensions based on orientation
export const getCardDimensions = (orientation: "horizontal" | "vertical") =>
  theme.card.dimensions[orientation];

export const getQRCodeSize = (isVertical: boolean) =>
  theme.card.elements.qr.sizes[isVertical ? 'vertical' : 'horizontal'];