import { cn } from "@/lib/utils";
import { CARD_CONFIG, CARD_DIMENSIONS } from "@/config/constants";

// Pure function to generate mnemonic spaces
export const generateMnemonicSpaces = (length: 12 | 24) =>
  Array.from({ length }, (_, i) => i + 1);

// Pure function to format address
export const formatAddress = (address: string) => ({
  firstHalf: address.slice(0, Math.ceil(address.length / 2)),
  secondHalf: address.slice(Math.ceil(address.length / 2)),
});

// Card styling
export const cardStyles = {
  base: cn(
    "crypto-card",
    "rounded-xl p-6 relative overflow-hidden transition-all duration-300",
    "bg-gradient-to-br from-gray-900 to-gray-800",
    "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
    "backdrop-blur-xl backdrop-saturate-150",
    "hover:shadow-xl transition-shadow",
    "hover:brightness-110 transition-all",  // Slight brightness increase
    "hover:translate-y-2 transition-transform",  // Slight upward movement
    //"hover:scale-105"
  ),
  decorations: {
    topGradient: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16",
    bottomGradient: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12",
    overlay: "absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"
  },
  qrContainer: "bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-[1.02]"
};

// Get card dimensions based on orientation
export const getCardDimensions = (orientation: "horizontal" | "vertical") =>
  orientation === "vertical"
    ? CARD_DIMENSIONS.CREDIT_CARD.VERTICAL
    : CARD_DIMENSIONS.CREDIT_CARD.HORIZONTAL;

export const getQRCodeSize = (isVertical: boolean) =>
  isVertical ? CARD_CONFIG.QR.VERTICAL_SIZE : CARD_CONFIG.QR.HORIZONTAL_SIZE;
