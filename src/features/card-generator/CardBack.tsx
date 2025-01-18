import { Background } from "@/features/card-generator/Background";
import { MnemonicGrid } from "@/features/card-generator/MnemonicGrid";
import { RecoveryLabel } from "@/features/card-generator/components/RecoveryLabel";
import { CardFooter } from "@/features/card-generator/components/CardFooter";
import type { CardBackProps } from "@/types/card";
import { createCardBackLayout } from "@/config/layout";

export const CardBack = ({
  mnemonicLength,
  orientation,
  onBackgroundImageChange,
}: CardBackProps & {
  onBackgroundImageChange?: (file: File) => void;
}) => {
  const { cardLayout } = createCardBackLayout(orientation);

  return (
    <>
      <Background
        color="#000000"
        onImageUpload={onBackgroundImageChange}
      />

      <div className="relative z-20 h-full flex flex-col">
        <RecoveryLabel
          mnemonicLength={mnemonicLength}
          orientation={orientation}
        />

        <MnemonicGrid
          mnemonicLength={mnemonicLength}
          isVertical={orientation === "vertical"}
        />

        <CardFooter orientation={orientation} />
      </div>
    </>
  );
};