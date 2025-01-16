import { cn } from "@/lib/utils";
import { UI_TEXT } from "@/config";
import { MnemonicGrid } from "@/features/card-generator/MnemonicGrid";
import type { CardBackProps } from "@/types/card";

export const CardBack = ({ mnemonicLength, orientation }: CardBackProps) => {
  const isVertical = orientation === "vertical";

  return (
    <div className="relative h-full">
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-1 px-1">
          <h3 className="text-white/90 text-[11px] font-medium">
            {UI_TEXT.CARD.RECOVERY_PHRASE.TITLE}
          </h3>
          <span className="text-gray-400 text-[9px]">
            {mnemonicLength} words
          </span>
        </div>

        <MnemonicGrid mnemonicLength={mnemonicLength} isVertical={isVertical} />

        <div className="mt-1 text-center">
          <p className="text-gray-400 text-[7px]">
            {UI_TEXT.CARD.RECOVERY_PHRASE.DEFAULT_MESSAGE}
          </p>
        </div>
      </div>
    </div>
  );
};