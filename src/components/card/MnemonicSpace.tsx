import type { MnemonicSpaceProps } from "@/types/card";

export const MnemonicSpace = ({ number }: MnemonicSpaceProps) => (
  <div className="relative">
    <div className="absolute -left-2.5 text-gray-500 text-[8px]">{number}</div>
    <div className="w-full border-b border-gray-700/30">
      <span className="text-transparent select-none">________________</span>
    </div>
  </div>
);
