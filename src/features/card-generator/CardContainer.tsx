import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  cardStyles,
  getCardDimensions,
} from "@/features/card-generator/utils/card";

interface CardContainerProps {
  children: ReactNode;
  orientation: "horizontal" | "vertical";
}

export const CardContainer = ({
  children,
  orientation,
}: CardContainerProps) => {
  const dimensions = getCardDimensions(orientation);

  return (
    <div
      className={cn(
        "crypto-card",
        cardStyles.base,
        "shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(0,0,0,0.3)]",
        //"hover:scale-105",
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
