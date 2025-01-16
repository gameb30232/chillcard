import { cn } from "@/lib/utils";
import { THEME } from "@/config";
import { formatAddress } from "@/features/card-generator/utils/card";
import { Background } from "@/features/card-generator/Background";
import { QRCode } from "@/features/card-generator/QRCode";
import type { CardFrontProps } from "@/types/card";

export const CardFront = ({
  chain,
  address,
  orientation,
  backgroundImage,
}: CardFrontProps) => {
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
        <div className="flex flex-col relative z-20">
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