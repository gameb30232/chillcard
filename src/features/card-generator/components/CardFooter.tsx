import { createCardBackLayout } from "@/config/layout";
import type { CardOrientation } from "@/types/card";

interface CardFooterProps {
  orientation: CardOrientation;
}

export const CardFooter = ({
  orientation,
}: CardFooterProps) => {
  const { cardLayout } = createCardBackLayout(orientation);
  const { footer } = cardLayout;

  return (
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
  );
};
