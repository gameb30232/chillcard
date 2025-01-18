import { useState } from "react";
import Card from "@/components/Card";
import CardBack from "@/components/CardBack";
import { CRYPTOCURRENCIES } from "@/lib/data";
import { Chain } from "@/lib/types";

const Index = () => {
  const [selectedChain, setSelectedChain] = useState<Chain>(
    CRYPTOCURRENCIES[0],
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <Card chain={selectedChain} onSelectChain={setSelectedChain} />
      <CardBack mnemonicLength={24} />
    </div>
  );
};

export default Index;
