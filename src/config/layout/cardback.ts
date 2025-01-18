import { dimensions } from './dimensions';
import { baseConstants } from './constants';
import type { CardOrientation, Corner } from './types';

const getCardDimensions = (orientation: CardOrientation) => {
  const [width, height] = orientation === 'horizontal'
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

      header: {
        marginBottom: baseConstants.spacing.base,
        padding: baseConstants.padding,
        title: {
          fontSize: baseConstants.typography.subtitle,
          opacity: 0.9,
          letterSpacing: '0.02em',
          lineHeight: 1.2,
        },
        subtitle: {
          fontSize: baseConstants.typography.subtitle * 0.8,
          opacity: 0.6,
          letterSpacing: '0.02em',
          lineHeight: 1.2,
        },
        text: {
          title: "Recovery Phrase",
          wordCountSuffix: "words",
        }
      },

      grid: {
        padding: baseConstants.padding,
        gap: baseConstants.spacing.base,
        columns: orientation === 'horizontal' ? 12 : 8,
        rows: orientation === 'horizontal' ? 2 : 3,
        fontSize: baseConstants.typography.address,
        lineHeight: 1.2,
        opacity: 0.8,
      },

      footer: {
        marginTop: baseConstants.spacing.base,
        padding: baseConstants.padding,
        fontSize: baseConstants.typography.subtitle * 0.6,
        opacity: 0.6,
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        text: {
          instructions: "Keep this recovery phrase in a safe place. It's the only way to recover your wallet if you lose access.",
        }
      },

      text: {
        title: "Recovery Phrase",
        wordCountSuffix: "words",
        instructions: "Write your recovery phrase here and keep it safe"
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
