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

// Cryptocurrency data as a constant
const CRYPTOCURRENCIES = [
  {
    name: "Bitcoin",
    code: "BTC",
    color: "#F7931A",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
  },
  {
    name: "Ethereum",
    code: "ETH",
    color: "#627EEA",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
  },
  {
    name: "Avalanche",
    code: "AVAX",
    color: "#E84142",
    logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg",
  },
  {
    name: "Binance Coin",
    code: "BNB",
    color: "#F3BA2F",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg",
  },
  {
    name: "Cardano",
    code: "ADA",
    color: "#0033AD",
    logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg",
  },
  {
    name: "Solana",
    code: "SOL",
    color: "#14F195",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
  },
  {
    name: "Polkadot",
    code: "DOT",
    color: "#E6007A",
    logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg",
  },
  {
    name: "Ripple",
    code: "XRP",
    color: "#23292F",
    logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg",
  },
  {
    name: "Dogecoin",
    code: "DOGE",
    color: "#C2A633",
    logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg",
  },
  {
    name: "Polygon",
    code: "MATIC",
    color: "#8247E5",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
  },
  {
    name: "Chainlink",
    code: "LINK",
    color: "#2A5ADA",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg",
  },
] as const;

export const CryptoCardGenerator = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<
    (typeof CRYPTOCURRENCIES)[number]
  >(CRYPTOCURRENCIES[0]);
  const [address, setAddress] = useState("");
  const [isVertical, setIsVertical] = useState(false);
  const [mnemonicLength, setMnemonicLength] = useState<12 | 24>(24);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const { toast } = useToast();
  const cardsRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => cardsRef.current,
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="controls space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Crypto Backup Card Generator
            </h1>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print Cards
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="crypto" className="text-sm font-medium">
                Cryptocurrency
              </Label>
              <Select
                value={selectedCrypto.code}
                onValueChange={(value) => {
                  const crypto = CRYPTOCURRENCIES.find((c) => c.code === value);
                  if (crypto) setSelectedCrypto(crypto);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a cryptocurrency" />
                </SelectTrigger>
                <SelectContent>
                  {CRYPTOCURRENCIES.map((crypto) => (
                    <SelectItem key={crypto.code} value={crypto.code}>
                      {crypto.name} ({crypto.code})
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

          <div className="flex items-center space-x-6 justify-end">
            <div className="flex items-center space-x-2">
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

            <div className="flex items-center space-x-2">
              <Label htmlFor="vertical-mode" className="text-sm font-medium">
                Vertical Card
              </Label>
              <Switch
                id="vertical-mode"
                checked={isVertical}
                onCheckedChange={setIsVertical}
              />
            </div>
          </div>
        </div>

        <div
          ref={cardsRef}
          className="flex justify-center gap-8 p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner"
        >
          <CryptoCard
            name={selectedCrypto.name}
            code={selectedCrypto.code}
            address={address || "Enter your wallet address"}
            color={selectedCrypto.color}
            isVertical={isVertical}
            showBack={false}
            mnemonicLength={mnemonicLength}
            logoUrl={selectedCrypto.logo}
            backgroundImage={backgroundImage}
          />

          <CryptoCard
            name={selectedCrypto.name}
            code={selectedCrypto.code}
            address={address || "Enter your wallet address"}
            color={selectedCrypto.color}
            isVertical={isVertical}
            showBack={true}
            mnemonicLength={mnemonicLength}
            logoUrl={selectedCrypto.logo}
            backgroundImage={backgroundImage}
          />
        </div>
      </div>
    </div>
  );
};
