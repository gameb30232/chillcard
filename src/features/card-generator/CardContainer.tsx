import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { dimensions, baseConstants, createCardLayout } from "@/config/layout";

interface CardContainerProps {
  children: ReactNode;
  orientation: "horizontal" | "vertical";
}

export const CardContainer = ({
  children,
  orientation,
}: CardContainerProps) => {
  const { cardDimensions, cardLayout, glassEffect } = createCardLayout(orientation);

  return (
    <div
      className={cn(
        "crypto-card relative",
        "hover:shadow-2xl hover:-translate-y-1",
        "active:translate-y-0 active:shadow-xl"
      )}
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        borderRadius: cardLayout.card.cornerRadius,
        padding: cardLayout.card.padding,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {children}
    </div>
  );
};