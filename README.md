# Smart Contract Audit Assistant

A comprehensive suite of tools for automated smart contract auditing, supporting Solidity, Rust, and Move smart contracts.

## Components

- **VS Code Extension**: Real-time smart contract vulnerability scanning
- **Remix IDE Plugin**: (Coming soon)
- **Web Interface**: (Coming soon)

## VS Code Extension Features

- Real-time vulnerability scanning on file save
- Support for Solidity, Rust, and Move smart contracts
- Interactive diagnostic messages in editor
- Powered by Google's Gemini AI
- Customizable scanning rules and severity levels

## Prerequisites

- Node.js (v16 or higher)
- VS Code (v1.60.0 or higher)
- Visual Studio Code Extension Manager (vsce)

## Installation (Development)

1. Clone the repository
2. Navigate to the vscode-extension directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the extension:
   ```bash
   npm run build
   ```
5. Package the extension:
   ```bash
   npm run package
   ```

## Usage

1. Open a smart contract file in VS Code
2. The extension will automatically scan your code on save
3. View diagnostics and suggestions directly in the editor
4. Click on diagnostics to view detailed explanations and recommendations

## Configuration

1. Open VS Code Settings
2. Search for "Smart Contract Audit"
3. Configure the following settings:
   - Gemini API Key
   - Scan Trigger Options
   - Severity Levels
   - File Types to Scan

## Development

To run the extension in development mode:

1. Open the project in VS Code
2. Press F5 to start debugging
3. A new VS Code window will open with the extension loaded

## License

MIT
