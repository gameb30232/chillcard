import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import { CSSProperties } from "react";
import { CARD_CONFIG, CLASSES } from "@/constants";
import { formatAddress } from "@/utils/card";
import { Background } from "@/components/card/Background";
import { QRCode } from "@/components/card/QRCode";
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

          <QRCode address={address} isVertical={isVertical} />
        </div>
      </div>
    </>
  );
};
