import { useState } from "react";
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

// Cryptocurrency data as a constant
const CRYPTOCURRENCIES = [
  { name: "Bitcoin", code: "BTC", color: "#F7931A", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg" },
  { name: "Ethereum", code: "ETH", color: "#627EEA", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  { name: "Avalanche", code: "AVAX", color: "#E84142", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg" },
  { name: "Binance Coin", code: "BNB", color: "#F3BA2F", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg" },
  { name: "Cardano", code: "ADA", color: "#0033AD", logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg" },
  { name: "Solana", code: "SOL", color: "#14F195", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg" },
  { name: "Polkadot", code: "DOT", color: "#E6007A", logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg" },
  { name: "Ripple", code: "XRP", color: "#23292F", logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg" },
  { name: "Dogecoin", code: "DOGE", color: "#C2A633", logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg" },
  { name: "Polygon", code: "MATIC", color: "#8247E5", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg" },
  { name: "Chainlink", code: "LINK", color: "#2A5ADA", logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg" },
] as const;

// Pure function to generate print HTML
const generatePrintHTML = (
  selectedCrypto: typeof CRYPTOCURRENCIES[number],
  address: string,
  isVertical: boolean,
  mnemonicLength: 12 | 24,
  backgroundImage?: string
) => `
  <html>
    <head>
      <title>Print Crypto Card</title>
      <style>
        @page { size: auto; margin: 0mm; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        body {
          margin: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: white;
        }
        .print-container {
          display: flex;
          gap: 20px;
        }
        .card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        .card-front, .card-back {
          width: ${isVertical ? '53.98mm' : '85.60mm'};
          height: ${isVertical ? '85.60mm' : '53.98mm'};
          position: relative;
          border-radius: 12px;
          overflow: hidden;
        }
        .card-front {
          ${backgroundImage ? `
          background-image: url('${backgroundImage}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          ` : ''}
        }
        .card-front::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .logo { width: 24px; height: 24px; margin-right: 8px; }
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-size: 20px;
          font-weight: bold;
          color: white;
        }
        .code {
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          margin-bottom: 16px;
          font-family: monospace;
        }
        .address {
          font-family: monospace;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
          word-break: break-all;
        }
        .qr-code {
          width: ${isVertical ? '86px' : '76px'};
          height: ${isVertical ? '86px' : '76px'};
          margin: 0 auto;
          background: white;
          padding: 8px;
          border-radius: 8px;
        }
        .recovery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          font-size: 12px;
          margin-top: 16px;
        }
        .word-line {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ddd;
          padding: 4px 0;
        }
        .word-number {
          color: #666;
          font-size: 10px;
          margin-right: 8px;
        }
        .note {
          font-size: 8px;
          color: #666;
          text-align: center;
          margin-top: 8px;
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        <div class="card card-front">
          <div class="card-content">
            <div class="title">
              <img src="${selectedCrypto.logo}" class="logo" alt="${selectedCrypto.name} logo" />
              ${selectedCrypto.name}
            </div>
            <div class="code">${selectedCrypto.code}</div>
            <div class="address">${address || "Enter your wallet address"}</div>
            <div class="qr-code">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(address)}" width="100%" height="100%" />
            </div>
          </div>
        </div>
        <div class="card card-back">
          <div style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">Recovery Phrase</div>
          <div style="font-size: 10px; color: #666; text-align: right; margin-bottom: 8px;">${mnemonicLength} words</div>
          <div class="recovery">
            ${Array.from({ length: mnemonicLength }, (_, i) => `
              <div class="word-line">
                <span class="word-number">${i + 1}</span>
                <span>________________</span>
              </div>
            `).join('')}
          </div>
          <div class="note">Write your recovery phrase here and keep it safe</div>
        </div>
      </div>
      <script>
        window.onload = () => window.print();
      </script>
    </body>
  </html>
`;

export const CryptoCardGenerator = () => {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTOCURRENCIES[0]);
  const [address, setAddress] = useState("");
  const [isVertical, setIsVertical] = useState(false);
  const [mnemonicLength, setMnemonicLength] = useState<12 | 24>(24);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const { toast } = useToast();

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

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(generatePrintHTML(
      selectedCrypto,
      address,
      isVertical,
      mnemonicLength,
      backgroundImage
    ));
    printWindow.document.close();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-4">
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
              <Label htmlFor="crypto" className="text-sm font-medium">Cryptocurrency</Label>
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
              <Label htmlFor="address" className="text-sm font-medium">Wallet Address</Label>
              <Input
                id="address"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background" className="text-sm font-medium">Background Image</Label>
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
              <Label htmlFor="mnemonic-length" className="text-sm font-medium">24-word Phrase</Label>
              <Switch
                id="mnemonic-length"
                checked={mnemonicLength === 24}
                onCheckedChange={(checked) => setMnemonicLength(checked ? 24 : 12)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="vertical-mode" className="text-sm font-medium">Vertical Card</Label>
              <Switch
                id="vertical-mode"
                checked={isVertical}
                onCheckedChange={setIsVertical}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-8 p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-inner">
          <CryptoCard
            name={selectedCrypto.name}
            code={selectedCrypto.code}
            address={address || "Enter your wallet address above"}
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
            address={address || "Enter your wallet address above"}
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