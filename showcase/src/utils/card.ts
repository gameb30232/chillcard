export const dimensions = {
  long: 384,
  short: 224,
} as const;

export const baseConstants = {
  padding: 24,
  cornerRadius: 12,
  logoSize: 48,
  qrSize: 92,
  spacing: {
    base: 16,
    double: 32,
  },
  fontSize: {
    sm: 14,
    xl: 24,
  },
  lineHeight: {
    normal: 1,
  }
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

export const createCardLayout = (orientation: CardOrientation) => {
  const cardDimensions = getCardDimensions(orientation);
  const addressLines = orientation === 'landscape' ? 2 : 5;

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
        x: 0,
        y: 0,
        width: baseConstants.logoSize,
        height: baseConstants.logoSize,
      },

      ticker: {
        x: baseConstants.logoSize + baseConstants.spacing.base,
        y: 0,
        maxWidth: cardDimensions.safeWidth - baseConstants.logoSize - baseConstants.spacing.base,
        fontSize: baseConstants.fontSize.xl,
        fontWeight: 700,
        lineHeight: baseConstants.lineHeight.normal,
      },

      coinName: {
        x: baseConstants.logoSize + baseConstants.spacing.base,
        y: baseConstants.fontSize.xl * baseConstants.lineHeight.normal + baseConstants.spacing.base / 2,
        maxWidth: cardDimensions.safeWidth - baseConstants.logoSize - baseConstants.spacing.base,
        fontSize: baseConstants.fontSize.sm,
        opacity: 0.7,
        lineHeight: baseConstants.lineHeight.normal,
      },

      walletAddress: {
        x: 0,
        y: cardDimensions.safeHeight - (baseConstants.fontSize.sm * addressLines),
        maxWidth: cardDimensions.safeWidth - baseConstants.qrSize - baseConstants.spacing.base,
        fontSize: baseConstants.fontSize.sm,
        lineHeight: baseConstants.lineHeight.normal,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      },

      qrCode: {
        x: (cardDimensions.safeWidth - baseConstants.qrSize),
        y: cardDimensions.safeHeight - baseConstants.qrSize,
        width: baseConstants.qrSize,
        height: baseConstants.qrSize,
        padding: baseConstants.padding / 4,
      },

      spacing: {
        iconToText: baseConstants.spacing.base,
        topToBottom: baseConstants.spacing.double,
        contentGap: baseConstants.spacing.base,
        betweenWalletAndQR: baseConstants.spacing.base,
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

export type CryptoCardData = {
  coinName: string;
  ticker: string;
  walletAddress: string;
};
