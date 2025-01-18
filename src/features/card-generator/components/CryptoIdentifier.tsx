import { useState, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CRYPTOCURRENCIES, searchCryptocurrencies } from "@/config";
import { Chain } from "@/config/chains/types";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";

interface CryptoIdentifierProps {
  onChainSelect?: (chain: Chain) => void;
  selectedChain: Chain;
  className?: string;
}

export function CryptoIdentifier({
  className,
  onChainSelect,
  selectedChain,
}: CryptoIdentifierProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Chain[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      try {
        const results = await searchCryptocurrencies(debouncedSearch);
        setSearchResults(results);
      } catch (error) {
        console.error('Search failed:', error);
        setSearchResults(CRYPTOCURRENCIES);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedSearch]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          <div className="flex items-center gap-2">
            <img
              src={selectedChain.logo}
              alt={selectedChain.name}
              className="w-5 h-5"
            />
            <span>{selectedChain.name}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput 
            placeholder="Search cryptocurrency..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandEmpty>
            {loading ? "Searching..." : "No cryptocurrency found."}
          </CommandEmpty>
          <CommandGroup>
            {searchResults.map((chain) => (
              <CommandItem
                key={chain.symbol}
                value={chain.name}
                onSelect={() => {
                  onChainSelect?.(chain);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={chain.logo}
                    alt={chain.name}
                    className="w-5 h-5"
                  />
                  <span>{chain.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {chain.symbol}
                  </span>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedChain.symbol === chain.symbol
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
