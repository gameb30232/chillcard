import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { THEME } from "@/config/ui/theme";
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
    <div className={cn(...THEME.decorations.overlay)} />
    <div className={cn(...THEME.decorations.gradients.top)} />
    <div className={cn(...THEME.decorations.gradients.bottom)} />
  </>
);
