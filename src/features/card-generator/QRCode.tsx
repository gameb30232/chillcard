import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { cn } from "@/lib/utils";
import { theme } from "@/config/theme";
import type { QRCodeProps } from "@/types/card";

interface ExtendedQRCodeProps extends QRCodeProps {
  logo?: string;
}

export const QRCode = ({ address, isVertical, logo }: ExtendedQRCodeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const size = isVertical 
      ? theme.card.elements.qr.sizes.vertical 
      : theme.card.elements.qr.sizes.horizontal;

    const qrCode = new QRCodeStyling({
      type: "svg",
      width: size,
      height: size,
      data: address,
      margin: 0,
      image: logo,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.2,
        margin: 1,
        crossOrigin: "anonymous",
      },
      qrOptions: {
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      dotsOptions: {
        type: "extra-rounded",
        color: "#000000",
        roundSize: true,
      },
      backgroundOptions: {
        round: 0,
        color: "#ffffff",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#000000",
      },
      cornersDotOptions: {
        color: "#000000",
      },
    });

    if (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    qrCode.append(ref.current);
  }, [address, isVertical, logo]);

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden",
        theme.card.elements.qr.background,
        theme.card.elements.qr.shadow,
        isVertical ? "w-[86px] h-[86px]" : "w-[76px] h-[76px]"
      )}
    >
      <div ref={ref} className="w-full h-full" />
    </div>
  );
};