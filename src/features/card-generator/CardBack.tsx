import { cn } from "@/lib/utils";
import { UI_TEXT } from "@/config";
import { MnemonicGrid } from "@/features/card-generator/MnemonicGrid";
import type { CardBackProps } from "@/types/card";
import { createCardBackLayout } from "@/config/layout";

export const CardBack = ({ mnemonicLength, orientation }: CardBackProps) => {
  const { cardLayout } = createCardBackLayout(orientation);
  const { header, grid, footer } = cardLayout;

  return (
    <div className="relative h-full">
      <div className="relative z-10 h-full flex flex-col">
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

        <div style={{ 
          padding: grid.padding,
          gap: grid.gap,
        }}>
          <MnemonicGrid 
            mnemonicLength={mnemonicLength} 
            isVertical={orientation === "vertical"} 
          />
        </div>

        <div 
          className="text-center"
          style={{
            marginTop: footer.marginTop,
            padding: footer.padding,
          }}
        >
          <p 
            className="text-gray-400"
            style={{ 
              fontSize: footer.fontSize,
              opacity: footer.opacity,
              letterSpacing: footer.letterSpacing,
              lineHeight: footer.lineHeight,
            }}
          >
            {footer.text.instructions}
          </p>
        </div>
      </div>
    </div>
  );
};