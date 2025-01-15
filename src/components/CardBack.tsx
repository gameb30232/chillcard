import { cn } from "@/lib/utils";
import { UI, CARD_CONFIG } from "@/constants";
import { generateMnemonicSpaces } from "@/utils/card";

interface CardBackProps {
  mnemonicLength: 12 | 24;
  orientation: "horizontal" | "vertical";
}

export const CardBack: React.FC<CardBackProps> = ({
  mnemonicLength,
  orientation,
}) => {
  const mnemonicSpaces = generateMnemonicSpaces(mnemonicLength ?? 24);
  const isVertical = orientation === "vertical";

  return (
    <div className="relative h-full">
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-1 px-1">
          <h3 className="text-white/90 text-[11px] font-medium">
            {UI.CARD.RECOVERY_PHRASE.TITLE}
          </h3>
          <span className="text-gray-400 text-[9px]">
            {mnemonicLength} words
          </span>
        </div>

        <div
          className={cn(
            "grid gap-y-[5px] gap-x-3 flex-1",
            isVertical
              ? mnemonicLength === CARD_CONFIG.MNEMONIC.LONG
                ? "grid-cols-2 text-[9px] mt-0"
                : "grid-cols-2 text-xs mt-1"
              : mnemonicLength === CARD_CONFIG.MNEMONIC.LONG
                ? "grid-cols-4 text-[10px] mt-1"
                : "grid-cols-3 text-xs mt-2",
            "font-mono",
          )}
        >
          {mnemonicSpaces.map((num) => (
            <div key={num} className="relative">
              <div className="absolute -left-2.5 text-gray-500 text-[8px]">
                {num}
              </div>
              <div className="w-full border-b border-gray-700/30">
                <span className="text-transparent select-none">
                  ________________
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-1 text-center">
          <p className="text-gray-400 text-[7px]">
            {UI.CARD.RECOVERY_PHRASE.DEFAULT_MESSAGE}
          </p>
        </div>
      </div>
    </div>
  );
};
