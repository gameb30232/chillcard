import { useState, useRef } from "react";
import { CryptoCard } from "./CryptoCard";
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

import { CRYPTOCURRENCIES } from "@/data/chains";
import { CardData } from "@/types";

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

  const cardData: CardData = {
    chain: selectedChain,
    address: address || "Enter your wallet address",
    orientation,
    backgroundImage,
    mnemonicLength,
  };

  return (
    <div className="container mx-auto py-4 px-4 md:py-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="controls space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Crypto Backup Card Generator
              </h1>
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-sm text-muted-foreground hidden md:block">
                  <p className="flex items-center gap-2">
                    <span>💡</span>
                    <span>
                      Enable "Background graphics" in print settings for best
                      results
                    </span>
                  </p>
                </div>
                <Button
                  onClick={() => handlePrint()}
                  variant="outline"
                  className="gap-2 w-full md:w-auto"
                >
                  <Printer className="h-4 w-4" />
                  Print Cards
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="crypto" className="text-sm font-medium">
                Cryptocurrency
              </Label>
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
                  <SelectValue placeholder="Select a cryptocurrency" />
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
              <Label htmlFor="address" className="text-sm font-medium">
                Wallet Address
              </Label>
              <Input
                id="address"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background" className="text-sm font-medium">
                Background Image
              </Label>
              <Input
                id="background"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">Max size: 5MB</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 md:justify-end">
            <div className="flex items-center justify-between md:gap-2">
              <Label htmlFor="mnemonic-length" className="text-sm font-medium">
                24-word Phrase
              </Label>
              <Switch
                id="mnemonic-length"
                checked={mnemonicLength === 24}
                onCheckedChange={(checked) =>
                  setMnemonicLength(checked ? 24 : 12)
                }
              />
            </div>

            <div className="flex items-center justify-between md:gap-2">
              <Label htmlFor="vertical-mode" className="text-sm font-medium">
                Vertical Card
              </Label>
              <Switch
                id="vertical-mode"
                checked={orientation === "vertical"}
                onCheckedChange={(checked) =>
                  setOrientation(checked ? "vertical" : "horizontal")
                }
              />
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row justify-center gap-8 p-4 md:p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner"
        >
          <CryptoCard {...cardData} variant="front" />
          <CryptoCard {...cardData} variant="back" />
        </div>
      </div>
    </div>
  );
};
