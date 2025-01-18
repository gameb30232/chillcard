import { cn } from "@/lib/utils";
import { CRYPTOCURRENCIES, UI_TEXT } from "@/config";
import { formatAddress } from "@/features/card-generator/utils/card";
import { Background } from "@/features/card-generator/Background";
import { QRCode } from "@/features/card-generator/QRCode";
import { CryptoIdentifier } from "@/features/card-generator/components/CryptoIdentifier";
import { WalletAddress } from "@/features/card-generator/components/WalletAddress";
import type { CardFrontProps } from "@/types/card";
import { createCardLayout } from "@/config/layout";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const CardFront = ({
  chain,
  address,
  orientation,
  backgroundImage,
  onChainSelect,
  onAddressChange,
  onBackgroundImageChange,
}: CardFrontProps & { 
  onChainSelect?: (chain: typeof CRYPTOCURRENCIES[0]) => void;
  onAddressChange?: (address: string) => void;
  onBackgroundImageChange?: (file: File) => void;
}) => {
  const { cardLayout } = createCardLayout(orientation);
  const { qrCode } = cardLayout;
  const displayAddress = address || UI_TEXT.FORM.WALLET_ADDRESS.DEFAULT_TEXT;
  const { firstHalf, secondHalf } = formatAddress(displayAddress);

  return (
    <>
      <Background 
        backgroundImage={backgroundImage} 
        color={chain.color}
        onImageUpload={onBackgroundImageChange}
      />

      <div className="relative z-20 h-full">
        <CryptoIdentifier
          chain={chain}
          orientation={orientation}
          onChainSelect={onChainSelect}
        />

        <WalletAddress
          address={address}
          orientation={orientation}
        />

        <div 
          className="absolute bg-white overflow-hidden"
          style={{
            left: qrCode.x,
            top: qrCode.y,
            width: qrCode.width,
            height: qrCode.height,
            padding: qrCode.padding,
            borderRadius: qrCode.borderRadius,
          }}
        >
          <QRCode address={address} isVertical={orientation === "vertical"} />
        </div>
      </div>
    </>
  );
};