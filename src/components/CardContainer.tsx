import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { CLASSES, CARD_DIMENSIONS } from "@/constants";

interface CardContainerProps {
  children: ReactNode;
  orientation: "horizontal" | "vertical";
}

export const CardContainer = ({
  children,
  orientation,
}: CardContainerProps) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "crypto-card",
        CLASSES.CARD_BASE,
        "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
        "hover:scale-105",
      )}
      style={
        {
          "--card-width": isVertical
            ? `${CARD_DIMENSIONS.VERTICAL.WIDTH}mm`
            : `${CARD_DIMENSIONS.HORIZONTAL.WIDTH}mm`,
          "--card-height": isVertical
            ? `${CARD_DIMENSIONS.VERTICAL.HEIGHT}mm`
            : `${CARD_DIMENSIONS.HORIZONTAL.HEIGHT}mm`,
          width: "var(--card-width)",
          height: "var(--card-height)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};
