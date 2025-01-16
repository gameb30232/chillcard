import { useState, useRef, type MouseEvent } from "react";
import { CardFront } from "@/features/card-generator/CardFront";
import { CardBack } from "@/features/card-generator/CardBack";
import { CardContainer } from "@/features/card-generator/CardContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useReactToPrint } from "react-to-print";

import { CRYPTOCURRENCIES } from "@/config";
import { BRANDING } from "@/config";
import { UI_TEXT } from "@/config";
import { cn } from "@/lib/utils";

export const Generator = () => {
  const [selectedChain, setSelectedChain] = useState(CRYPTOCURRENCIES[0]);
  const [address, setAddress] = useState("");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
    address: address || UI_TEXT.FORM.WALLET_ADDRESS.DEFAULT_TEXT,
    orientation,
    backgroundImage,
    mnemonicLength,
  };

  return (
    <div className="space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          {BRANDING.APP_NAME}
        </h1>
        <p className="text-slate-600">{BRANDING.TAGLINE}</p>
      </header>

      <div className="grid md:grid-cols-[1fr,auto] gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="crypto">{UI_TEXT.FORM.CRYPTO_CURRENCY.LABEL}</Label>
              <Select
                value={selectedChain.symbol}
                onValueChange={(value) => {
                  const chain = CRYPTOCURRENCIES.find(
                    (c) => c.symbol === value,
                  );
                  if (chain) setSelectedChain(chain);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={UI_TEXT.FORM.CRYPTO_CURRENCY.PLACEHOLDER}
                  />
                </SelectTrigger>
                <SelectContent>
                  {CRYPTOCURRENCIES.map((chain) => (
                    <SelectItem key={chain.symbol} value={chain.symbol}>
                      {chain.name} ({chain.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{UI_TEXT.FORM.WALLET_ADDRESS.LABEL}</Label>
              <Input
                id="address"
                placeholder={UI_TEXT.FORM.WALLET_ADDRESS.PLACEHOLDER}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">
                {UI_TEXT.FORM.BACKGROUND_IMAGE.LABEL}
              </Label>
              <Input
                id="background"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-slate-500">
                {UI_TEXT.FORM.BACKGROUND_IMAGE.MAX_SIZE_TEXT}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Switch
                  id="mnemonic-length"
                  checked={mnemonicLength === 24}
                  onCheckedChange={(checked) =>
                    setMnemonicLength(checked ? 24 : 12)
                  }
                />
                <Label htmlFor="mnemonic-length">
                  {UI_TEXT.FORM.TOGGLES.TWENTY_FOUR_WORD}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="vertical-mode"
                  checked={orientation === "vertical"}
                  onCheckedChange={(checked) =>
                    setOrientation(checked ? "vertical" : "horizontal")
                  }
                />
                <Label htmlFor="vertical-mode">
                  {UI_TEXT.FORM.TOGGLES.VERTICAL_CARD}
                </Label>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-sm text-slate-600">
              <span className="inline-block mr-2">💡</span>
              {BRANDING.PRINT_INSTRUCTIONS}
            </p>
            <Button onClick={onPrintClick} className="gap-2">
              <Printer className="h-4 w-4" />
              {UI_TEXT.BUTTONS.PRINT}
            </Button>
          </div>
        </div>

        <div
          ref={cardsRef}
          data-orientation={orientation}
          className={cn(
            "flex gap-8 no-print-bg cards-container",
            orientation === "vertical"
              ? "flex-row justify-center"
              : "flex-col items-center",
          )}
        >
          <CardContainer orientation={orientation}>
            <CardFront {...cardData} />
          </CardContainer>
          <CardContainer orientation={orientation}>
            <CardBack
              mnemonicLength={mnemonicLength}
              orientation={orientation}
            />
          </CardContainer>
        </div>
      </div>
    </div>
  );
};