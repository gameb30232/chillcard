import { cn } from "@/lib/utils";
import { CRYPTOCURRENCIES } from "@/config";
import { formatAddress } from "@/features/card-generator/utils/card";
import { Background } from "@/features/card-generator/Background";
import { QRCode } from "@/features/card-generator/QRCode";
import type { CardFrontProps } from "@/types/card";
import { Input } from "@/components/ui/input";
import { UI_TEXT } from "@/config";
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
  const { logo, ticker, coinName, walletAddress, qrCode } = cardLayout;
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
        <Popover>
          <PopoverTrigger asChild>
            <div className="interactive-element group">
              <div 
                className="flex items-center"
                style={{
                  position: 'absolute',
                  left: logo.x,
                  top: logo.y,
                  gap: logo.gap,
                }}
              >
                <div 
                  className="bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  style={{
                    width: logo.width,
                    height: logo.height,
                    borderRadius: logo.borderRadius,
                  }}
                >
                  <img
                    src={chain.logo}
                    alt={chain.symbol}
                    style={{
                      width: logo.imageSize,
                      height: logo.imageSize
                    }}
                  />
                </div>
                <div style={{ gap: logo.textGap }}>
                  <p
                    style={{
                      fontSize: ticker.fontSize,
                      fontWeight: ticker.fontWeight,
                      lineHeight: ticker.lineHeight,
                      maxWidth: ticker.maxWidth,
                      opacity: ticker.opacity,
                    }}
                    className="font-bold tracking-tight text-white"
                  >
                    {chain.symbol}
                  </p>
                  <p
                    style={{
                      fontSize: coinName.fontSize,
                      lineHeight: coinName.lineHeight,
                      opacity: coinName.opacity,
                      maxWidth: coinName.maxWidth,
                    }}
                    className="text-white"
                  >
                    {chain.name}
                  </p>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-2">
              {CRYPTOCURRENCIES.map((c) => (
                <button
                  key={c.symbol}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1 rounded hover:bg-slate-100 transition-colors",
                    c.symbol === chain.symbol && "bg-slate-100"
                  )}
                  onClick={() => onChainSelect?.(c)}
                >
                  <img src={c.logo} alt={c.name} className="w-4 h-4" />
                  <span className="font-medium">{c.name}</span>
                  <span className="text-slate-500 ml-auto">{c.symbol}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

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