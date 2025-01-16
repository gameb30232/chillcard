import { type CSSProperties, useRef } from "react";
import { cn } from "@/lib/utils";
import { THEME } from "@/config/ui/theme";
import type { BackgroundProps } from "@/types/card";
import { ImageIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Background = ({ 
  backgroundImage, 
  color,
  onImageUpload 
}: BackgroundProps & {
  onImageUpload?: (file: File) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
      event.target.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <Popover>
        <PopoverTrigger asChild>
          <div className="absolute inset-0 z-0 group/bg">
            {backgroundImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
                style={{ 
                  backgroundImage: `url(${backgroundImage})`,
                  opacity: 0.2,
                }}
              />
            ) : (
              <div
                className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,_var(--color),_transparent_70%)] transition-all duration-300"
                style={{ "--color": color } as CSSProperties}
              />
            )}
            <div className={cn(...THEME.decorations.overlay)} />
            <div className={cn(...THEME.decorations.gradients.top)} />
            <div className={cn(...THEME.decorations.gradients.bottom)} />

            {/* Upload indicator */}
            <div className="absolute inset-0 opacity-0 group-hover/bg:opacity-100 transition-opacity duration-200 bg-black/50 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 p-3 rounded-full">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Card Background</h4>
              <p className="text-sm text-muted-foreground">
                Choose an image to customize your card background
              </p>
            </div>
            <div className="grid gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg px-4 py-2 transition-colors"
              >
                <ImageIcon className="w-4 h-4" />
                Choose Image
              </button>
              <p className="text-xs text-muted-foreground text-center">
                Maximum file size: 5MB
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
