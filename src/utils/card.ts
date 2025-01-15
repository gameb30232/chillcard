import { cn } from "@/lib/utils";

// Pure function to generate mnemonic spaces
export const generateMnemonicSpaces = (length: 12 | 24) =>
  Array.from({ length }, (_, i) => i + 1);

// Pure function to format address
export const formatAddress = (address: string) => ({
  firstHalf: address.slice(0, Math.ceil(address.length / 2)),
  secondHalf: address.slice(Math.ceil(address.length / 2)),
});

// Card styling
export const baseCardStyles = cn(
  "rounded-xl p-6 relative overflow-hidden transition-all duration-300",
  "bg-gradient-to-br from-gray-900 to-gray-800",
  "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
  "backdrop-blur-xl backdrop-saturate-150",
  "hover:scale-105"
);

// Orientation-specific sizing
export const getCardSizeClass = (orientation: "horizontal" | "vertical") =>
  orientation === "vertical"
    ? "w-[53.98mm] h-[85.60mm]"
    : "w-[85.60mm] h-[53.98mm]";
