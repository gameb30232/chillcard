import { type ClassValue } from "clsx";

export const theme = {
  card: {
    dimensions: {
      vertical: {
        width: '53.98mm',
        height: '85.60mm'
      },
      horizontal: {
        width: '85.60mm',
        height: '53.98mm'
      }
    },
    spacing: {
      padding: '1.5rem',
      gap: '0.75rem'
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
      }
    },
    elements: {
      logo: {
        size: 'w-6 h-6'
      },
      qr: {
        sizes: {
          vertical: 86,
          horizontal: 76
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
    }
  }
} as const;