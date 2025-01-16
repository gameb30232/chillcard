import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";
import {
  cardStyles,
  getQRCodeSize,
} from "@/features/card-generator/utils/card";
import type { QRCodeProps } from "@/types/card";
import { CARD_CONFIG } from "@/config/constants";

export const QRCode = ({ address, isVertical }: QRCodeProps) => (
  <div className={cardStyles.qrContainer}>
    <div
      className={cn(
        "flex items-center justify-center",
        isVertical ? "w-[86px] h-[86px]" : "w-[76px] h-[76px]",
      )}
    >
      <QRCodeSVG
        value={address}
        size={getQRCodeSize(isVertical)}
        level={CARD_CONFIG.QR.LEVEL}
      />
    </div>
  </div>
);
