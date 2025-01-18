import { cn } from "@/lib/utils";
import { createCardBackLayout } from "@/utils/cardback";
import { useState } from "react";
import { RotateCw } from "lucide-react";

type CardBackProps = {
  mnemonicLength: 12 | 24;
};

export const CardBack = ({ mnemonicLength }: CardBackProps) => {
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "landscape",
  );
  const { cardDimensions, cardLayout } = createCardBackLayout(orientation);
  const gridConfig = cardLayout.grid.layout[orientation][mnemonicLength];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {cardLayout.corners.positions.map((corner) => (
        <button
          key={corner.name}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-full z-10"
          style={{
            width: `${cardLayout.corners.size}px`,
            height: `${cardLayout.corners.size}px`,
            left: `${corner.x}px`,
            top: `${corner.y}px`,
          }}
          onClick={() =>
            setOrientation((prev) =>
              prev === "landscape" ? "portrait" : "landscape",
            )
          }
        >
          <RotateCw className="w-4 h-4 text-white/70 hover:text-white hover:animate-spin" />
        </button>
      ))}

      <div
        className="relative bg-black rounded-xl text-white overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
        style={{
          width: cardDimensions.width,
          height: cardDimensions.height,
          borderRadius: cardLayout.card.cornerRadius,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-black" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />

        <div
          className="relative"
          style={{
            width: cardDimensions.safeWidth,
            height: cardDimensions.safeHeight,
          }}
        >
          <div className="flex items-center justify-between mb-1 px-1">
            <h3
              className="text-white/90 font-medium"
              style={{ fontSize: cardLayout.header.title.fontSize }}
            >
              {cardLayout.text.title}
            </h3>
            <span
              className="text-gray-400"
              style={{ fontSize: cardLayout.header.subtitle.fontSize }}
            >
              {mnemonicLength} {cardLayout.text.wordCountSuffix}
            </span>
          </div>

          <div
            className="grid flex-1"
            style={{
              fontSize: gridConfig.fontSize,
              gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
              gap: `${cardLayout.grid.gap.y}px ${cardLayout.grid.gap.x}px`,
            }}
          >
            {Array.from({ length: mnemonicLength }, (_, i) => (
              <div key={i} className="relative">
                <div
                  className="absolute text-gray-500"
                  style={{
                    left: -cardLayout.grid.numberLabel.indent,
                    fontSize: cardLayout.grid.numberLabel.fontSize,
                  }}
                >
                  {i + 1}
                </div>
                <div className="w-full border-b border-gray-700/30">
                  <span className="text-transparent select-none">
                    ________________
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-center"
            style={{
              marginTop: cardLayout.footer.marginTop,
              fontSize: cardLayout.footer.fontSize,
              color: cardLayout.footer.color,
            }}
          >
            <p>{cardLayout.text.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBack;
