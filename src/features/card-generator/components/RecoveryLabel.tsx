import { createCardBackLayout } from "@/config/layout";
import type { CardOrientation } from "@/types/card";

interface RecoveryLabelProps {
  mnemonicLength: 12 | 24;
  orientation: CardOrientation;
}

export const RecoveryLabel = ({
  mnemonicLength,
  orientation,
}: RecoveryLabelProps) => {
  const { cardLayout } = createCardBackLayout(orientation);
  const { header } = cardLayout;

  return (
    <div 
      className="flex items-center justify-between"
      style={{
        marginBottom: header.marginBottom,
        padding: header.padding,
      }}
    >
      <h3 
        className="text-white font-medium"
        style={{ 
          fontSize: header.title.fontSize,
          opacity: header.title.opacity,
          letterSpacing: header.title.letterSpacing,
        }}
      >
        {header.text.title}
      </h3>
      <span 
        className="text-gray-400"
        style={{ 
          fontSize: header.subtitle.fontSize,
          opacity: header.subtitle.opacity,
        }}
      >
        {mnemonicLength} {header.text.wordCountSuffix}
      </span>
    </div>
  );
};
