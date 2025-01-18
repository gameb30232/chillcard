import { createCardBackLayout } from "@/config/layout";
import { generateMnemonicSpaces } from "@/features/card-generator/utils/card";
import type { MnemonicGridProps } from "@/types/card";
import { MnemonicSpace } from "@/features/card-generator/MnemonicSpace";

export const MnemonicGrid = ({
  mnemonicLength,
  isVertical,
}: MnemonicGridProps) => {
  const { cardLayout } = createCardBackLayout(isVertical ? "vertical" : "horizontal");
  const { grid } = cardLayout;

  const style = {
    display: "grid",
    gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
    gap: grid.gap,
    fontSize: grid.fontSize,
    opacity: grid.opacity,
    lineHeight: grid.lineHeight,
  };

  return (
    <div style={style}>
      {generateMnemonicSpaces(mnemonicLength).map((num) => (
        <MnemonicSpace key={num} number={num} />
      ))}
    </div>
  );
};