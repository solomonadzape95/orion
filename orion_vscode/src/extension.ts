import * as vscode from 'vscode';
import { GeminiService } from './services/geminiService';
import { HistoryService } from './services/historyService';
import { DiagnosticProvider } from './providers/diagnosticProvider';
import { ReportWebviewProvider } from './providers/reportWebviewProvider';

let scanInProgress = false;
let diagnosticProvider: DiagnosticProvider;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    outputChannel = vscode.window.createOutputChannel('Orion Auditor');
    outputChannel.appendLine('Activating Orion Auditor extension...');

    // Initialize services
    const historyService = new HistoryService(context);
    const geminiService = new GeminiService();
    diagnosticProvider = new DiagnosticProvider(context);
    const reportProvider = new ReportWebviewProvider(context.extensionUri, historyService);

    // Register the report webview
    const view = vscode.window.registerWebviewViewProvider(
        ReportWebviewProvider.viewType,
        reportProvider
    );

    // Command to scan current file
    const scanCommand = vscode.commands.registerCommand('orion-auditor.scan', async () => {
        if (scanInProgress) {
            vscode.window.showInformationMessage('A scan is already in progress');
            return;
        }
        await scanCurrentFile(geminiService, diagnosticProvider, reportProvider, historyService);
    });

    // File save handler
    const onSaveHandler = vscode.workspace.onDidSaveTextDocument(async (document) => {
        if (scanInProgress) {
            return;
        }

        const config = vscode.workspace.getConfiguration('orionAuditor');
        const scanOnSave = config.get<boolean>('scanOnSave', false);
        
        if (scanOnSave && isValidContract(document)) {
            await scanCurrentFile(geminiService, diagnosticProvider, reportProvider, historyService);
        }
    });

    context.subscriptions.push(
        view,
        scanCommand,
        onSaveHandler,
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('orionAuditor.scanOnSave')) {
                const config = vscode.workspace.getConfiguration('orionAuditor');
                const scanOnSave = config.get<boolean>('scanOnSave', false);
                vscode.window.showInformationMessage(
                    `Orion Auditor: Auto-scan on save is now ${scanOnSave ? 'enabled' : 'disabled'}`
                );
            }
        })
    );
}

async function scanCurrentFile(
    geminiService: GeminiService,
    diagnosticProvider: DiagnosticProvider,
    reportProvider: ReportWebviewProvider,
    historyService: HistoryService
): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }

    const document = editor.document;
    if (!isValidContract(document)) {
        vscode.window.showWarningMessage('Current file is not a supported smart contract');
        return;
    }

    try {
        scanInProgress = true;
        const progressMessage = await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Analyzing contract...",
            cancellable: false
        }, async (progress) => {
            try {
                // Get contract content
                const contractContent = document.getText();
                
                progress.report({ increment: 30, message: "Scanning for vulnerabilities..." });
                
                // Analyze contract
                const result = await geminiService.analyzeCode(contractContent, 'solidity');
                
                progress.report({ increment: 30, message: "Updating diagnostics..." });
                
                // Update diagnostics
                await diagnosticProvider.updateDiagnostics(document, result.issues);
                
                progress.report({ increment: 40, message: "Generating report..." });
                
                // Update report view
                reportProvider.updateReport(result, document.fileName);
                
                // Save to history
                await historyService.addAudit(document.fileName, result);

                // Show the report view
                await vscode.commands.executeCommand('orion-auditor.reportView.focus');

                return 'Contract analysis complete';
            } catch (error) {
                throw error;
            }
        });

        vscode.window.showInformationMessage(progressMessage);
    } catch (error: any) {
        outputChannel.appendLine(`Error scanning document: ${error}`);
        vscode.window.showErrorMessage('Failed to scan document. Check Orion Auditor output for details.');
        diagnosticProvider.clearDiagnostics(document);
    } finally {
        scanInProgress = false;
    }
}

function isValidContract(document: vscode.TextDocument): boolean {
    const supportedExtensions = [
        '.sol',    // Solidity
        '.rs',     // Rust
        '.move',   // Move
        '.cairo',  // Cairo
        '.vy',     // Vyper
        '.fe',     // Fe
        '.yul',    // Yul
        '.mligo',  // LIGO (CameLIGO)
        '.jsligo', // LIGO (JsLIGO)
        '.religo', // LIGO (ReasonLIGO)
        '.ligo',   // LIGO (PascaLIGO)
        '.scilla', // Scilla
        '.tz',     // Michelson
        '.aes',    // Sophia (Aeternity)
        '.ink',    // ink! (Substrate)
        '.cpp',    // C++ (EOS)
        '.ride',   // Ride (Waves)
        '.scala'   // Scala (Waves)
    ];
    return supportedExtensions.some(ext => document.fileName.toLowerCase().endsWith(ext));
}

export function deactivate() {
    // Clean up resources if needed
}
