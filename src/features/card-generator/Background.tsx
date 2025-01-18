import { type CSSProperties, useRef } from "react";
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

  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: color,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div style={style}>
        {onImageUpload && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="absolute bottom-2 right-2 p-1 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                <ImageIcon className="w-4 h-4 text-white/70" />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-left px-2 py-1 rounded hover:bg-slate-100 transition-colors"
              >
                Upload Image
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </>
  );
};
