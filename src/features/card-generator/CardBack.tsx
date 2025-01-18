import { cn } from "@/lib/utils";
import { UI_TEXT } from "@/config";
import { MnemonicGrid } from "@/features/card-generator/MnemonicGrid";
import type { CardBackProps } from "@/types/card";
import { createCardBackLayout } from "@/config/layout";

export const CardBack = ({ mnemonicLength, orientation }: CardBackProps) => {
  const { cardLayout } = createCardBackLayout(orientation);
  const { header, text } = cardLayout;

  return (
    <div className="relative h-full">
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-1 px-1">
          <h3 
            className="text-white/90 font-medium"
            style={{ 
              fontSize: header.title.fontSize,
              opacity: header.title.opacity
            }}
          >
            {text.title}
          </h3>
          <span 
            className="text-gray-400"
            style={{ fontSize: header.subtitle.fontSize }}
          >
            {mnemonicLength} {text.wordCountSuffix}
          </span>
        </div>

        <MnemonicGrid mnemonicLength={mnemonicLength} isVertical={orientation === "vertical"} />

        <div className="mt-1 text-center">
          <p 
            className="text-gray-400"
            style={{ fontSize: cardLayout.footer.fontSize }}
          >
            {text.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};