import { type ClassValue } from "clsx";

// Core measurements that everything is based on
export const MEASUREMENTS = {
  CARD: {
    DIMENSIONS: {
      VERTICAL: {
        WIDTH: '53.98mm',
        HEIGHT: '85.60mm'
      },
      HORIZONTAL: {
        WIDTH: '85.60mm',
        HEIGHT: '53.98mm'
      }
    },
    PADDING: '1.5rem',
    GAP: '0.75rem'
  },
  QR: {
    SIZE: {
      VERTICAL: 86,
      HORIZONTAL: 76
    }
  },
  PRINT: {
    CONTAINER: {
      GAP: '20mm',
      MARGIN: '20mm'
    }
  }
} as const;