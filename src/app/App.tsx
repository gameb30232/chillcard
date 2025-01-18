import { useState, useRef, type MouseEvent } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

const App = () => {
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
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
          <main className="container mx-auto py-8 px-4">
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">{BRANDING.APP_NAME}</h1>
                <p className="text-slate-600">{BRANDING.TAGLINE}</p>
              </div>

              <div className="space-y-4">
                <div ref={cardsRef} className="space-y-4 print:space-y-0">
                  <CardContainer orientation={orientation}>
                    <CardFront {...cardData} />
                  </CardContainer>
                  <CardContainer orientation={orientation}>
                    <CardBack mnemonicLength={mnemonicLength} orientation={orientation} />
                  </CardContainer>
                </div>

                <div className="flex justify-end">
                  <Button onClick={onPrintClick}>
                    <Printer className="w-4 h-4 mr-2" />
                    {UI_TEXT.BUTTONS.PRINT}
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
