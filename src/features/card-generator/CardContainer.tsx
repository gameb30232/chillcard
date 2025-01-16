import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { theme } from "@/config/theme";

interface CardContainerProps {
  children: ReactNode;
  orientation: "horizontal" | "vertical";
}

export const CardContainer = ({
  children,
  orientation,
}: CardContainerProps) => {
  const dimensions = orientation === "vertical" 
    ? theme.card.dimensions.vertical 
    : theme.card.dimensions.horizontal;

  return (
    <div
      className={cn(
        "crypto-card",
        ...theme.card.decorations.base,
        ...theme.card.decorations.effects
      )}
      style={
        {
          "--card-width": dimensions.width,
          "--card-height": dimensions.height,
          width: "var(--card-width)",
          height: "var(--card-height)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};