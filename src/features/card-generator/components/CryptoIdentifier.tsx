import { cn } from "@/lib/utils";
import { CRYPTOCURRENCIES } from "@/config";
import type { Chain } from "@/config/chains/types";
import { createCardLayout } from "@/config/layout";
import type { CardOrientation } from "@/types/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CryptoIdentifierProps {
  chain: Chain;
  orientation: CardOrientation;
  onChainSelect?: (chain: typeof CRYPTOCURRENCIES[0]) => void;
}

export const CryptoIdentifier = ({ 
  chain, 
  orientation,
  onChainSelect 
}: CryptoIdentifierProps) => {
  const { cardLayout } = createCardLayout(orientation);
  const { logo, ticker, coinName } = cardLayout;

  return (
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
  );
};
