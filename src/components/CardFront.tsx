import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";
import { CARD_CONFIG, CLASSES } from "@/constants";
import { formatAddress } from "@/utils/card";

interface CardFrontProps {
  chain: {
    name: string;
    symbol: string;
    logo?: string;
    color: string;
  };
  address: string;
  orientation: "horizontal" | "vertical";
  backgroundImage?: string;
}

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
      {backgroundImage ? (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)]"
          style={{ "--color": chain.color } as CSSProperties}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-12 -translate-x-12" />

      <div
        className={cn(
          "relative flex h-full z-10",
          isVertical ? "flex-col items-center" : "items-start justify-between",
        )}
      >
        <div className="flex flex-col relative z-20">
          <div className="flex items-center gap-3 mb-2">
            {chain.logo && (
              <img
                src={chain.logo}
                alt={`${chain.name} logo`}
                className="w-6 h-6"
              />
            )}
            <h2 className="text-white font-bold text-2xl tracking-tight">
              {chain.name}
            </h2>
          </div>
          <p className="text-gray-400 text-sm font-mono tracking-wider pl-9">
            {chain.symbol}
          </p>
        </div>

        <div
          className={cn(
            "relative z-10 flex flex-col items-center",
            isVertical ? "mt-auto" : "",
          )}
        >
          <div className="flex flex-col items-center mb-2">
            <div
              className={cn(
                "text-center",
                isVertical ? "w-[110px]" : "w-[100px]",
              )}
            >
              <p className={cn(CLASSES.ADDRESS_TEXT, "text-[8px]")}>
                {firstHalf}
                <br />
                {secondHalf}
              </p>
            </div>
          </div>

          <div
            className="bg-white/90 backdrop-blur-sm rounded-lg p-2
                     shadow-[0_0_15px_rgba(0,0,0,0.1)]
                     transition-transform duration-300
                     group-hover:scale-[1.02]"
          >
            <div
              className={cn(
                "flex items-center justify-center",
                isVertical ? "w-[86px] h-[86px]" : "w-[76px] h-[76px]",
              )}
            >
              <QRCodeSVG
                value={address}
                size={
                  isVertical
                    ? CARD_CONFIG.QR.VERTICAL_SIZE
                    : CARD_CONFIG.QR.HORIZONTAL_SIZE
                }
                level={CARD_CONFIG.QR.LEVEL}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
