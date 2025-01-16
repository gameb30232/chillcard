import { cn } from "@/lib/utils";
import { THEME } from "@/config";
import { CRYPTOCURRENCIES } from "@/config";
import { formatAddress } from "@/features/card-generator/utils/card";
import { Background } from "@/features/card-generator/Background";
import { QRCode } from "@/features/card-generator/QRCode";
import type { CardFrontProps } from "@/types/card";
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
}: CardFrontProps & { onChainSelect?: (chain: typeof CRYPTOCURRENCIES[0]) => void }) => {
  const isVertical = orientation === "vertical";
  const { firstHalf, secondHalf } = formatAddress(address);

  return (
    <>
      <Background backgroundImage={backgroundImage} color={chain.color} />

      <div
        className={cn(
          "relative flex h-full z-10",
          isVertical ? "flex-col items-center" : "items-start justify-between"
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex flex-col relative z-20 interactive-element cursor-pointer">
              <div className={cn("flex items-center gap-3 mb-2")}>
                {chain.logo && (
                  <img
                    src={chain.logo}
                    alt={`${chain.name} logo`}
                    className={cn(THEME.elements.logo.size)}
                  />
                )}
                <h2 className={cn(
                  THEME.typography.title.size,
                  THEME.typography.title.weight,
                  THEME.typography.title.tracking,
                  "text-white"
                )}>
                  {chain.name}
                </h2>
              </div>
              <p className={cn(
                THEME.typography.symbol.size,
                THEME.typography.symbol.family,
                THEME.typography.symbol.tracking,
                "text-gray-400 pl-9"
              )}>
                {chain.symbol}
              </p>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0" align="start">
            <div className="grid gap-1 p-1">
              {CRYPTOCURRENCIES.map((crypto) => (
                <button
                  key={crypto.symbol}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent",
                    "text-left",
                    crypto.symbol === chain.symbol && "bg-accent"
                  )}
                  onClick={() => onChainSelect?.(crypto)}
                >
                  <img
                    src={crypto.logo}
                    alt={`${crypto.name} logo`}
                    className="w-5 h-5"
                  />
                  <div>
                    <div className="font-medium">{crypto.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {crypto.symbol}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className={cn(
          "relative z-10 flex flex-col items-center",
          isVertical ? "mt-auto" : ""
        )}>
          <div className="flex flex-col items-center mb-2">
            <div className={cn(
              "text-center",
              isVertical ? "w-[110px]" : "w-[100px]"
            )}>
              <p className={cn(
                THEME.typography.address.size,
                THEME.typography.address.family,
                THEME.typography.address.color
              )}>
                {firstHalf}
                <br />
                {secondHalf}
              </p>
            </div>
          </div>

          <QRCode address={address} isVertical={isVertical} logo={chain.logo} />
        </div>
      </div>
    </>
  );
};