import { createCardBackLayout } from "@/config/layout";
import { generateMnemonicSpaces } from "@/features/card-generator/utils/card";
import type { MnemonicGridProps } from "@/types/card";

// Internal component
const MnemonicSpace = ({ number }: { number: number }) => (
  <div className="relative">
    <div className="absolute -left-2.5 text-gray-500 text-[8px]">{number}</div>
    <div className="w-full border-b border-gray-700/30">
      <span className="text-transparent select-none">________________</span>
    </div>
  </div>
);

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
