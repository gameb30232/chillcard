import { useState, useRef, type MouseEvent } from "react";
import { CardFront } from "@/features/card-generator/CardFront";
import { CardBack } from "@/features/card-generator/CardBack";
import { CardContainer } from "@/features/card-generator/CardContainer";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useReactToPrint } from "react-to-print";

import { CRYPTOCURRENCIES } from "@/config";
import { BRANDING } from "@/config";
import { UI_TEXT } from "@/config";
import { cn } from "@/lib/utils";

export const Generator = () => {
  const [selectedChain, setSelectedChain] = useState(CRYPTOCURRENCIES[0]);
  const [address, setAddress] = useState("");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [mnemonicLength, setMnemonicLength] = useState<12 | 24>(24);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const { toast } = useToast();
  const cardsRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cardsRef,
  });

  const onPrintClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handlePrint();
  };

  const handleImageUpload = (file: File) => {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setBackgroundImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const cardData = {
    chain: selectedChain,
    address,
    orientation,
    backgroundImage,
    mnemonicLength,
  };

  return (
    <div className="space-y-8 relative">
      <div className="snowfall-container fixed inset-0 pointer-events-none" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="snowflake absolute animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {BRANDING.THEME.ACCENT_EMOJI}
          </div>
        ))}
      </div>

      <header className="text-center space-y-2">
        <h1 className="brand-title">
          {BRANDING.APP_NAME}
        </h1>
        <p className="brand-tagline">{BRANDING.TAGLINE}</p>
      </header>

      <div className="flex justify-center items-center">
        <div
          ref={cardsRef}
          data-orientation={orientation}
          className={cn(
            "flex gap-8 no-print-bg cards-container",
            orientation === "vertical"
              ? "flex-row justify-center"
              : "flex-col items-center"
          )}
        >
          <CardContainer orientation={orientation}>
            <CardFront 
              {...cardData} 
              onChainSelect={setSelectedChain} 
              onAddressChange={setAddress}
              onBackgroundImageChange={handleImageUpload}
            />
          </CardContainer>
          <CardContainer orientation={orientation}>
            <CardBack
              mnemonicLength={mnemonicLength}
              orientation={orientation}
            />
          </CardContainer>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={onPrintClick} className="print-button gap-2">
          <Printer className="h-4 w-4" />
          {UI_TEXT.BUTTONS.PRINT}
        </Button>
      </div>
    </div>
  );
};