import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { MEASUREMENTS, THEME } from "@/config";

interface CardContainerProps {
  children: ReactNode;
  orientation: "horizontal" | "vertical";
}

export const CardContainer = ({
  children,
  orientation,
}: CardContainerProps) => {
  const dimensions = orientation === "vertical" 
    ? MEASUREMENTS.CARD.DIMENSIONS.VERTICAL 
    : MEASUREMENTS.CARD.DIMENSIONS.HORIZONTAL;

  return (
    <div
      className={cn(
        "crypto-card",
        ...THEME.decorations.base,
        ...THEME.decorations.effects
      )}
      style={
        {
          "--card-width": dimensions.WIDTH,
          "--card-height": dimensions.HEIGHT,
          width: "var(--card-width)",
          height: "var(--card-height)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};