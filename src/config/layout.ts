// src/constants/card-layout.ts
export const CARD_LAYOUT = {
  padding: {
    all: '1.5rem',  // 24px (p-6)
  },
  logo: {
    size: '1.5rem', // 24px (w-6 h-6)
  },
  spacing: {
    gap: '0.75rem', // 12px (gap-3)
  },
  text: {
    title: '1.5rem', // 24px (text-2xl)
    symbol: '0.875rem', // 14px (text-sm)
  },
  clickable: {
    chain: {
      width: 'calc(1.5rem + 0.75rem + 8rem)', // logo + gap + approximate text width
      height: 'calc(1.5rem + 0.5rem)', // logo height + some padding
    }
  }
} as const;
