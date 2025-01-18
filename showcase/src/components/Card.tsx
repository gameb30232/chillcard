import { useState } from "react";
import { RotateCw } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import QRCode from "react-qr-code";
import { Chain } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CRYPTOCURRENCIES } from "@/lib/data";
import { createCardLayout } from "@/utils/card";

interface CardProps {
  chain: Chain;
  onSelectChain: (chain: Chain) => void;
}

type CardOrientation = "landscape" | "portrait";

const Card = ({ chain, onSelectChain }: CardProps) => {
  const [orientation, setOrientation] = useState<CardOrientation>("landscape");
  const { cardDimensions, cardLayout } = createCardLayout(orientation);

  const { toast } = useToast();
  const cardData = {
    coinName: chain.name,
    ticker: chain.symbol,
    walletAddress: "1A1zP1eP5QQGefi2DMPTfTL5SLmv7DivfNa",
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner Rotation Buttons */}
      {cardLayout.corners.positions.map((corner) => (
        <button
          key={corner.name}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full z-10"
          style={{
            width: `${cardLayout.corners.size}px`,
            height: `${cardLayout.corners.size}px`,
            left: `${corner.x}px`,
            top: `${corner.y}px`,
          }}
          onClick={() =>
            setOrientation((prev) =>
              prev === "landscape" ? "portrait" : "landscape",
            )
          }
        >
          <RotateCw className="w-4 h-4 text-white/70 hover:text-white hover:animate-spin" />
        </button>
      ))}

      <div
        className="relative bg-black rounded-xl text-white overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          borderRadius: cardLayout.card.cornerRadius,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-black" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        <div
          className="relative"
          style={{
            width: cardDimensions.safeWidth,
            height: cardDimensions.safeHeight,
          }}
        >
          <Popover>
            <PopoverTrigger asChild>
              <div
                className="cursor-pointer hover:opacity-80 transition-opacity absolute flex items-center space-x-4"
                style={{
                  left: cardLayout.logo.x,
                  top: cardLayout.logo.y,
                }}
              >
                <div
                  className="bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                  style={{
                    width: cardLayout.logo.width,
                    height: cardLayout.logo.height,
                  }}
                >
                  <img
                    src={chain.logo}
                    alt={chain.symbol}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <p
                    className="font-bold tracking-tight"
                    style={{
                      fontSize: cardLayout.ticker.fontSize,
                      maxWidth: cardLayout.ticker.maxWidth,
                      lineHeight: cardLayout.ticker.lineHeight,
                    }}
                  >
                    {cardData.ticker}
                  </p>
                  <p
                    className="text-white/70"
                    style={{
                      fontSize: cardLayout.coinName.fontSize,
                      maxWidth: cardLayout.coinName.maxWidth,
                      lineHeight: cardLayout.coinName.lineHeight,
                    }}
                  >
                    {cardData.coinName}
                  </p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="max-h-80 overflow-y-auto">
                {CRYPTOCURRENCIES.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 transition-colors"
                    onClick={() => onSelectChain(crypto)}
                  >
                    <img
                      src={crypto.logo}
                      alt={crypto.symbol}
                      className="w-6 h-6"
                    />
                    <div className="text-left">
                      <p className="font-medium">{crypto.symbol}</p>
                      <p className="text-sm text-gray-500">{crypto.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <div
            className="absolute"
            style={{
              left: cardLayout.walletAddress.x,
              top: cardLayout.walletAddress.y,
              maxWidth: cardLayout.walletAddress.maxWidth,
              fontFamily: cardLayout.walletAddress.fontFamily,
            }}
          >
            <p
              className="break-all"
              style={{
                fontSize: cardLayout.walletAddress.fontSize,
                lineHeight: cardLayout.walletAddress.lineHeight,
              }}
            >
              {cardData.walletAddress}
            </p>
          </div>

          <div
            className="absolute group/qr"
            style={{
              left: cardLayout.qrCode.x,
              top: cardLayout.qrCode.y,
            }}
          >
            <div
              className="bg-white rounded-lg hover:scale-105 transition-transform"
              style={{
                width: cardLayout.qrCode.width,
                height: cardLayout.qrCode.height,
                padding: cardLayout.qrCode.padding,
              }}
            >
              <QRCode
                value={cardData.walletAddress}
                size={cardLayout.qrCode.width - cardLayout.qrCode.padding * 2}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover/qr:opacity-100 transition-opacity">
              <ExternalLink className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
