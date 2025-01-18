import { createCardLayout } from "@/config/layout";
import { formatAddress } from "@/features/card-generator/utils/card";
import { UI_TEXT } from "@/config";
import type { CardOrientation } from "@/types/card";

interface WalletAddressProps {
  address: string;
  orientation: CardOrientation;
}

export const WalletAddress = ({
  address,
  orientation,
}: WalletAddressProps) => {
  const { cardLayout } = createCardLayout(orientation);
  const { walletAddress } = cardLayout;
  const displayAddress = address || UI_TEXT.FORM.WALLET_ADDRESS.DEFAULT_TEXT;
  const { firstHalf, secondHalf } = formatAddress(displayAddress);

  return (
    <div 
      className="absolute font-mono text-white"
      style={{
        left: walletAddress.x,
        top: walletAddress.y,
        maxWidth: walletAddress.maxWidth,
        fontSize: walletAddress.fontSize,
        lineHeight: walletAddress.lineHeight,
        fontFamily: walletAddress.fontFamily,
        opacity: walletAddress.opacity,
        letterSpacing: walletAddress.letterSpacing,
      }}
    >
      {firstHalf}
      <br />
      {secondHalf}
    </div>
  );
};
