export const dimensions = {
  long: 384,
  short: 224,
} as const;

export const baseConstants = {
  padding: 24,
  cornerRadius: 12,
} as const;

type CardOrientation = 'landscape' | 'portrait';

type Corner = {
  name: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  x: number;
  y: number;
}

const getCardDimensions = (orientation: CardOrientation) => {
  const [width, height] = orientation === 'landscape'
    ? [dimensions.long, dimensions.short]
    : [dimensions.short, dimensions.long];

  return {
    width,
    height,
    safeWidth: width - (baseConstants.padding * 2),
    safeHeight: height - (baseConstants.padding * 2),
  } as const;
};

export const createCardBackLayout = (orientation: CardOrientation) => {
  const cardDimensions = getCardDimensions(orientation);

  return {
    cardDimensions,

    cardLayout: {
      card: {
        padding: baseConstants.padding,
        cornerRadius: baseConstants.cornerRadius,
      },

      corners: {
        size: baseConstants.padding,
        positions: [
          { name: 'topLeft', x: 0, y: 0 },
          { name: 'topRight', x: cardDimensions.width - baseConstants.padding, y: 0 },
          { name: 'bottomLeft', x: 0, y: cardDimensions.height - baseConstants.padding },
          { name: 'bottomRight', x: cardDimensions.width - baseConstants.padding, y: cardDimensions.height - baseConstants.padding },
        ] as const satisfies Corner[],
      },

      text: {
        title: "Recovery Phrase",
        wordCountSuffix: "words",
        instructions: "Write your recovery phrase here and keep it safe"
      },

      header: {
        title: {
          fontSize: 11,
          opacity: 0.9,
        },
        subtitle: {
          fontSize: 9,
          color: 'gray-400',
        },
      },

      grid: {
        gap: {
          x: 12,
          y: 5,
        },
        numberLabel: {
          indent: 10,
          fontSize: 8,
          color: 'gray-500',
        },
        line: {
          color: 'gray-700/30',
        },
        layout: {
          landscape: {
            12: {
              columns: 3,
              fontSize: 16,
            },
            24: {
              columns: 4,
              fontSize: 10,
            }
          },
          portrait: {
            12: {
              columns: 2,
              fontSize: 16,
            },
            24: {
              columns: 2,
              fontSize: 9,
            }
          }
        }
      },

      footer: {
        fontSize: 7,
        color: 'gray-400',
        marginTop: 4,
      },
    },

    glassEffect: {
      background: 'rgba(255, 255, 255, 0.1)',
      blur: '4px',
    },

    gradients: {
      primary: {
        colors: ['#4A1D96', '#1E3A8A', '#000000'],
        stops: [0, 50, 100],
      },
    },
  } as const;
};

export type CardBackConfig = {
  orientation: 'landscape' | 'portrait';
  mnemonicLength: 12 | 24;
};
