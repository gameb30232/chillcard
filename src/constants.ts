export const BRANDING = {
  APP_NAME: "Crypto Backup Card Generator",
  PRINT_INSTRUCTIONS: 'Enable "Background graphics" in print settings for best results',
} as const;

export const UI = {
  FORM: {
    CRYPTO_CURRENCY: {
      LABEL: "Cryptocurrency",
      PLACEHOLDER: "Select a cryptocurrency"
    },
    WALLET_ADDRESS: {
      LABEL: "Wallet Address",
      PLACEHOLDER: "Enter wallet address",
      DEFAULT_TEXT: "Enter your wallet address"
    },
    BACKGROUND_IMAGE: {
      LABEL: "Background Image",
      PLACEHOLDER: "Select image",
      MAX_SIZE_TEXT: "Max size: 5MB"
    },
    TOGGLES: {
      TWENTY_FOUR_WORD: "24-word Phrase",
      VERTICAL_CARD: "Vertical Card"
    }
  },
  CARD: {
    RECOVERY_PHRASE: {
      TITLE: "Recovery Phrase",
      DEFAULT_MESSAGE: "Write your recovery phrase here and keep it safe"
    }
  },
  BUTTONS: {
    PRINT: "Print Cards"
  }
} as const;

// Image and file constants
export const IMAGE = {
  MAX_SIZE_MB: 5,
  MAX_SIZE_BYTES: 5 * 1024 * 1024
} as const;

// Card dimensions (in mm)
export const CARD_DIMENSIONS = {
  VERTICAL: { WIDTH: 53.98, HEIGHT: 85.60 },
  HORIZONTAL: { WIDTH: 85.60, HEIGHT: 53.98 }
} as const;

// Card elements configuration
export const CARD_CONFIG = {
  QR: {
    VERTICAL_SIZE: 86,
    HORIZONTAL_SIZE: 76,
    LEVEL: "L"
  },
  MNEMONIC: {
    SHORT: 12,
    LONG: 24
  }
} as const;

// Common CSS classes
export const CLASSES = {
  CARD_BASE: "rounded-xl p-6 relative overflow-hidden transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-xl backdrop-saturate-150",
  ADDRESS_TEXT: "text-gray-400 font-mono leading-tight break-all",
  TITLE_GRADIENT: "bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
} as const;
