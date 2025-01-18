import { baseConstants } from './constants';
import type { CardOrientation, Corner } from '@/types/card';

const getCardDimensions = (orientation: CardOrientation) => {
  const [width, height] = orientation === 'horizontal'
    ? [baseConstants.dimensions.long, baseConstants.dimensions.short]
    : [baseConstants.dimensions.short, baseConstants.dimensions.long];

  return {
    width,
    height,
    safeWidth: width - (baseConstants.padding * 2),
    safeHeight: height - (baseConstants.padding * 2),
  } as const;
};

export const createCardLayout = (orientation: CardOrientation) => {
  const cardDimensions = getCardDimensions(orientation);
  const addressLines = orientation === 'horizontal' ? 2 : 5;

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

      logo: {
        x: baseConstants.padding,
        y: baseConstants.padding,
        width: baseConstants.logoSize,
        height: baseConstants.logoSize,
        imageSize: baseConstants.logoSize * 0.8,
        gap: baseConstants.spacing.base,
        textGap: baseConstants.spacing.small,
        borderRadius: baseConstants.cornerRadius / 2,
      },

      ticker: {
        x: baseConstants.logoSize + baseConstants.spacing.base,
        y: baseConstants.padding,
        fontSize: baseConstants.typography.title,
        fontWeight: 700,
        lineHeight: 1.2,
        maxWidth: cardDimensions.safeWidth - baseConstants.logoSize - baseConstants.spacing.base,
        opacity: 1,
      },

      coinName: {
        x: baseConstants.logoSize + baseConstants.spacing.base,
        y: baseConstants.padding + baseConstants.typography.title * 1.2 + baseConstants.spacing.small,
        fontSize: baseConstants.typography.subtitle,
        lineHeight: 1.2,
        opacity: 0.7,
        maxWidth: cardDimensions.safeWidth - baseConstants.logoSize - baseConstants.spacing.base,
      },

      walletAddress: {
        x: baseConstants.padding,
        y: cardDimensions.height - baseConstants.padding - (baseConstants.typography.address * addressLines * 1.2),
        maxWidth: cardDimensions.safeWidth,
        fontSize: baseConstants.typography.address,
        lineHeight: 1.2,
        fontFamily: 'monospace',
        opacity: 0.9,
        letterSpacing: '0.05em',
      },

      qrCode: {
        x: cardDimensions.width - baseConstants.qrSize - baseConstants.padding,
        y: cardDimensions.height - baseConstants.qrSize - baseConstants.padding,
        width: baseConstants.qrSize,
        height: baseConstants.qrSize,
        padding: baseConstants.spacing.small,
        borderRadius: baseConstants.cornerRadius / 2,
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
