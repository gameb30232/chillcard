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
  onChainSelect?: (chain: Chain) => void;
  onAddressChange?: (address: string) => void;
  onBackgroundImageChange?: (file: File) => void;
}) => {
  const { cardLayout } = createCardLayout(orientation);
  const { qrCode } = cardLayout;
  const displayAddress = address || UI_TEXT.FORM.WALLET_ADDRESS.DEFAULT_TEXT;

  return (
    <div className="relative">
      <Background
        color={chain.color}
        image={backgroundImage}
        onImageUpload={onBackgroundImageChange}
      />
      <CryptoIdentifier
        selectedChain={chain}
        onChainSelect={onChainSelect}
      />
      <WalletAddress
        address={displayAddress}
        onChange={onAddressChange}
      />
      <QRCode
        address={displayAddress}
        chain={chain}
        style={{
          position: 'absolute',
          left: qrCode.x,
          top: qrCode.y,
          width: qrCode.size,
          height: qrCode.size,
        }}
      />
    </div>
  );
};