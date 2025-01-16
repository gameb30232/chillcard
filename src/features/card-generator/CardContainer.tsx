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
        "crypto-card relative",
        "hover:shadow-2xl hover:-translate-y-1",
        "active:translate-y-0 active:shadow-xl",
        ...THEME.decorations.base,
        ...THEME.decorations.effects
      )}
      style={
        {
          "--card-width": dimensions.WIDTH,
          "--card-height": dimensions.HEIGHT,
          width: "var(--card-width)",
          height: "var(--card-height)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};