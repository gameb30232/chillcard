import { type CSSProperties } from "react";
import { cardStyles } from "@/utils/card";
import type { BackgroundProps } from "@/types/card";

export const Background = ({ backgroundImage, color }: BackgroundProps) => (
  <>
    {backgroundImage ? (
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    ) : (
      <div
        className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)]"
        style={{ "--color": color } as CSSProperties}
      />
    )}
    <div className={cardStyles.decorations.overlay} />
    <div className={cardStyles.decorations.topGradient} />
    <div className={cardStyles.decorations.bottomGradient} />
  </>
);
