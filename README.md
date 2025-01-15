## Getting Started

Follow these steps to run the application locally:

### Prerequisites

* **Nix:**  ChillCard uses Nix for reproducible development environments. Install it from [nixos.org](https://nixos.org/download.html).
* **Bun:**  A fast JavaScript runtime and package manager. Install from [bun.sh](https://bun.sh/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:gameb30232/chillcard.git
   cd chillcard
   ```

2. **Enter the development environment:**
   ```bash
   nix develop
   ```

3. **Install dependencies:**
   ```bash
   bun install
   ```

### Running the Application

1. **Start the development server:**
   ```bash
   bun run dev
   ```

2. **Open in your browser:**  Navigate to `http://localhost:8080/`

## Available Scripts

The following scripts are available in the `package.json` file:

* **`dev`:** Starts the development server using Vite
* **`build`:** Builds the application for production
* **`build:dev`:** Builds the application in development mode
* **`lint`:** Runs ESLint for code quality
* **`preview`:** Previews the production build locally

## Usage

1. **Pick a Crypto:** Choose your cryptocurrency from the available options
2. **Enter Your Address:** Input your wallet address
3. **Optional Background:** Add a custom background image (max 5MB)
4. **Recovery Phrase Length:** Toggle between 12 or 24 words
5. **Card Layout:** Choose vertical or horizontal orientation
6. **Print:** Click the print button to generate your backup cards

### Printing Recommendations

* **Enable Background Graphics:** For best results, enable "Background graphics" in your print settings
* **Card Stock (Optional):** Consider using thicker paper for durability
* **Cut Carefully:** Cut along the edges after printing

## Customization

You can customize the application by modifying:

* **Cryptocurrencies:** Add or modify cryptocurrencies in `src/data/chains.ts`
* **Card Styling:** Adjust styles in:
  * `src/components/card/*.tsx` for component-specific styles
  * `src/utils/card.ts` for shared card styles
  * `src/constants/layout.ts` for layout measurements
* **Theme:** Modify the Tailwind configuration in `tailwind.config.ts`

## Project Structure

```
src/
├── components/
│   ├── card/         # Card-related components
│   └── ui/           # Shared UI components
├── constants/        # Application constants
├── data/            # Data definitions
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## License

This project is licensed under the [MIT License](LICENSE).
