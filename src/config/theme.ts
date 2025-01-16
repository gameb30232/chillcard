import { type ClassValue } from "clsx";

// Core measurements that everything is based on
const measurements = {
  card: {
    width: {
      vertical: '53.98mm',
      horizontal: '85.60mm'
    },
    height: {
      vertical: '85.60mm',
      horizontal: '53.98mm'
    },
    padding: '1.5rem',
    gap: '0.75rem'
  },
  qr: {
    size: {
      vertical: 86,
      horizontal: 76
    }
  }
} as const;

// Unified theme object
export const theme = {
  measurements,
  card: {
    dimensions: {
      vertical: {
        width: measurements.card.width.vertical,
        height: measurements.card.height.vertical
      },
      horizontal: {
        width: measurements.card.width.horizontal,
        height: measurements.card.height.horizontal
      }
    },
    spacing: {
      padding: measurements.card.padding,
      gap: measurements.card.gap
    },
    typography: {
      title: {
        size: 'text-2xl',
        weight: 'font-bold',
        tracking: 'tracking-tight'
      },
      symbol: {
        size: 'text-sm',
        family: 'font-mono',
        tracking: 'tracking-wider'
      },
      address: {
        size: 'text-[8px]',
        family: 'font-mono',
        color: 'text-gray-400'
      },
      mnemonic: {
        size: {
          default: 'text-xs',
          compact: 'text-[9px]'
        },
        family: 'font-mono'
      }
    },
    elements: {
      logo: {
        size: 'w-6 h-6'
      },
      qr: {
        sizes: {
          vertical: measurements.qr.size.vertical,
          horizontal: measurements.qr.size.horizontal
        },
        background: 'bg-white/90',
        shadow: 'shadow-sm'
      }
    },
    decorations: {
      base: [
        'rounded-xl',
        'p-6',
        'relative',
        'overflow-hidden',
        'transition-all',
        'duration-300',
        'bg-gradient-to-br',
        'from-gray-900',
        'to-gray-800',
        'backdrop-blur-xl',
        'backdrop-saturate-150'
      ] as ClassValue[],
      effects: [
        'hover:shadow-xl',
        'hover:brightness-110',
        'hover:translate-y-2'
      ] as ClassValue[],
      overlay: [
        'absolute',
        'inset-0',
        'bg-gradient-to-br',
        'from-black/10',
        'to-transparent'
      ] as ClassValue[],
      gradients: {
        top: [
          'absolute',
          'top-0',
          'right-0',
          'w-32',
          'h-32',
          'bg-gradient-to-br',
          'from-white/5',
          'to-transparent',
          'rounded-full',
          '-translate-y-16',
          'translate-x-16'
        ] as ClassValue[],
        bottom: [
          'absolute',
          'bottom-0',
          'left-0',
          'w-24',
          'h-24',
          'bg-gradient-to-tr',
          'from-white/5',
          'to-transparent',
          'rounded-full',
          'translate-y-12',
          '-translate-x-12'
        ] as ClassValue[]
      }
    },
    print: {
      container: {
        gap: '20mm',
        margin: '20mm'
      }
    }
  }
} as const;