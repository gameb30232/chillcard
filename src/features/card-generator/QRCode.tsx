import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { cn } from "@/lib/utils";
import {
  cardStyles,
  getQRCodeSize,
} from "@/features/card-generator/utils/card";
import type { QRCodeProps } from "@/types/card";

export const QRCode = ({ address, isVertical }: QRCodeProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const containerSize = isVertical ? 86 : 76;

    const qrCode = new QRCodeStyling({
      type: "svg",
      width: containerSize,
      height: containerSize,
      data: address,
      margin: 0,
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
  }, [address, isVertical]);

  return (
    <div
      className={cn(
        "rounded-lg bg-white/90 shadow-sm overflow-hidden",
        isVertical ? "w-[86px] h-[86px]" : "w-[76px] h-[76px]",
      )}
    >
      <div ref={ref} className="w-full h-full" />
    </div>
  );
};
