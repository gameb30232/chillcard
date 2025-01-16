import { APP_SETTINGS } from "@/config";
import { MEASUREMENTS } from "@/config";

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
  MEASUREMENTS.CARD.DIMENSIONS[orientation.toUpperCase()];

export const getQRCodeSize = (isVertical: boolean) =>
  MEASUREMENTS.QR.SIZE[isVertical ? 'VERTICAL' : 'HORIZONTAL'];