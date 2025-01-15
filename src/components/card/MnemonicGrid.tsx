import { cn } from "@/lib/utils";
import { CARD_CONFIG } from "@/constants";
import { generateMnemonicSpaces } from "@/utils/card";
import type { MnemonicGridProps } from "@/types/card";
import { MnemonicSpace } from "./MnemonicSpace";

export const MnemonicGrid = ({
  mnemonicLength,
  isVertical,
}: MnemonicGridProps) => (
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
    {generateMnemonicSpaces(mnemonicLength).map((num) => (
      <MnemonicSpace key={num} number={num} />
    ))}
  </div>
);
