## Getting Started

Follow these steps to run the application locally:

### Prerequisites

* **Node.js:**  While Bun is the primary package manager, having Node.js installed is generally a good prerequisite for web development. You can download it from [nodejs.org](https://nodejs.org/).
* **Bun:**  A fast JavaScript runtime and package manager. Ensure you have Bun installed on your system. You can find installation instructions on the [Bun website](https://bun.sh/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:gameb30232/papercard.git
   cd papercard
   ```

2. **Install dependencies:**
   Using Bun:
   ```bash
   bun install
   ```

### Running the Application

1. **Start the development server:**
   Using Bun:
   ```bash
   bun run dev
   ```

2. **Open in your browser:**  The application should automatically open in your default web browser. If not, navigate to the address displayed in your terminal (likely `http://localhost:8080/`).

## Available Scripts

The following scripts are available in the `package.json` file:

* **`dev`:** Starts the development server using Vite. Run with `bun run dev`.
* **[Add other scripts from your `package.json` here, e.g., `build`: Builds the application for production. Run with `bun run build`. ]**

## Usage

1. **Pick a Crypto:** Choose the cryptocurrency you're backing up.
2. **Enter Your Address:**  Type or paste your crypto wallet address.
3. **Optional Background:**  Add a background image if you like.
4. **Recovery Phrase Length:** Choose whether your recovery phrase is 12 or 24 words.
5. **Card Layout:**  Pick a vertical or horizontal card.
6. **Print It:** Click the "Print Cards" button to print your backup.

### Printing Recommendations

* **Enable Background Graphics:** For the best visual results, ensure that "Background graphics" or a similar option is enabled in your browser's print settings. This will ensure that the background color/image is printed.
* **Card Stock (Optional):**  Printing on thicker card stock can improve the durability of your backup cards.
* **Cut Carefully:** After printing, carefully cut out the generated cards along the edges.

## Customization

You can further customize the application by modifying the source code. Here are some potential areas for customization:

* **Adding More Cryptocurrencies:**  You can add more cryptocurrencies to the `CRYPTOCURRENCIES` array in `src/components/CryptoCardGenerator.tsx`. Include the `name`, `code`, `color`, and `logo` URL for each new cryptocurrency.
* **Styling:**  Modify the Tailwind CSS classes in the components to adjust the appearance of the cards and the overall application.
* **Adding More Features:**  Consider adding features like exporting the card as an image, generating multiple cards at once, or adding a field for a custom network name.

## Contributing

[If you want to encourage contributions, add guidelines here.]

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## Acknowledgements

* This project utilizes the excellent libraries mentioned in the "Technologies Used" section.
* Inspiration for the design and functionality comes from the need for secure and accessible cryptocurrency backup solutions.
