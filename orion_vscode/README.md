# Orion Auditor

Orion Auditor is a powerful VS Code extension that provides AI-powered smart contract vulnerability scanning. It helps developers identify and fix potential security issues in their smart contract code in real-time.

## Features

- **Real-time Vulnerability Scanning**: Automatically scans your smart contract code as you write
- **AI-Powered Analysis**: Leverages advanced AI to detect potential security vulnerabilities
- **Severity Levels**: Clear visual indicators for different severity levels (Critical, High, Medium, Low)
- **Detailed Diagnostics**: Provides comprehensive explanations and suggestions for each identified issue
- **In-line Highlighting**: Visual indicators in the editor gutter and overview ruler

## Installation

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "Orion Auditor"
4. Click Install

## Usage

The extension automatically activates when you open a smart contract file. Vulnerabilities are highlighted in your code with different colors based on their severity level:

- Critical: Severe vulnerabilities that need immediate attention
- High: Important security issues that should be addressed
- Medium: Potential vulnerabilities that should be reviewed
- Low: Minor issues or best practice suggestions

## Extension Settings

This extension contributes the following settings:

* `orionauditor.enable`: Enable/disable the extension
* `orionauditor.scanOnSave`: Enable/disable automatic scanning when saving files
* `orionauditor.showInlineMessages`: Enable/disable inline diagnostic messages

## Requirements

- VS Code version 1.60.0 or higher
- Internet connection for AI-powered analysis

## Known Issues

Please report any issues on our [GitHub repository](https://github.com/solomonadzape95/orion/issues).

## Release Notes

### 0.0.1 - Initial Release

- Initial release of Orion Auditor
- Basic smart contract vulnerability scanning
- Support for multiple severity levels
- Real-time diagnostics

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the [MIT License](LICENSE).

**Happy Secure Coding!**
