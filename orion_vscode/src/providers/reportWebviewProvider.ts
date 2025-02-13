import * as vscode from 'vscode';
import { AuditResult } from '../types';
import { AuditHistoryItem, HistoryService } from '../services/historyService';

export class ReportWebviewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'orion-auditor.reportView';
    private _view?: vscode.WebviewView;
    private historyService: HistoryService;

    constructor(
        private readonly _extensionUri: vscode.Uri,
        historyService: HistoryService
    ) {
        this.historyService = historyService;
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        webviewView.webview.html = this.getWebviewContent();

        webviewView.webview.onDidReceiveMessage(async message => {
            switch (message.command) {
                case 'showHistory':
                    this.showHistory();
                    break;
                case 'showAudit':
                    const audit = this.historyService.getAudit(message.auditId);
                    if (audit) {
                        this.updateReport(audit.result, audit.fileName);
                    }
                    break;
                case 'gotoLine':
                    if (vscode.window.activeTextEditor) {
                        const line = message.line - 1;
                        const range = vscode.window.activeTextEditor.document.lineAt(line).range;
                        vscode.window.activeTextEditor.selection = new vscode.Selection(range.start, range.end);
                        vscode.window.activeTextEditor.revealRange(range, vscode.TextEditorRevealType.InCenter);
                    }
                    break;
            }
        });
    }

    private getWebviewContent() {
        return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: var(--vscode-font-family); padding: 10px; }
                    .severity-critical { color: #ff0000; }
                    .severity-high { color: #ff6b6b; }
                    .severity-medium { color: #ffd93d; }
                    .severity-low { color: #6bff6b; }
                    .card {
                        background: var(--vscode-editor-background);
                        border: 1px solid var(--vscode-panel-border);
                        border-radius: 4px;
                        padding: 10px;
                        margin: 10px 0;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    }
                    .code {
                        background: var(--vscode-textBlockQuote-background);
                        padding: 10px;
                        border-radius: 4px;
                        font-family: monospace;
                        white-space: pre-wrap;
                        margin: 10px 0;
                    }
                    button {
                        background: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 5px 10px;
                        border-radius: 2px;
                        cursor: pointer;
                    }
                    button:hover {
                        background: var(--vscode-button-hoverBackground);
                    }
                    #nav { margin-bottom: 20px; }
                    .welcome { text-align: center; padding: 20px; }
                    #loading { display: none; text-align: center; }
                </style>
            </head>
            <body>
                <div id="nav">
                    <button onclick="showLatestReport()">Latest Audit</button>
                    <button onclick="showHistory()">History</button>
                </div>
                <div id="loading">Analyzing contract...</div>
                <div id="content">
                    <div class="welcome">
                        <h2>Welcome to Orion Auditor</h2>
                        <p>Press Ctrl+Alt+A to scan current file</p>
                    </div>
                </div>
                <script>
                    const vscode = acquireVsCodeApi();
                    let currentReport = null;

                    window.addEventListener('message', event => {
                        const message = event.data;
                        switch (message.type) {
                            case 'updateReport':
                                showReport(message.result, message.fileName);
                                document.getElementById('loading').style.display = 'none';
                                break;
                            case 'showHistory':
                                showHistoryView(message.history);
                                break;
                            case 'startLoading':
                                document.getElementById('loading').style.display = 'block';
                                break;
                        }
                    });

                    function showReport(result, fileName) {
                        currentReport = result;
                        const content = document.getElementById('content');
                        let html = '<div class="card">';
                        
                        if (fileName) {
                            html += \`<h2>Audit Report for \${fileName}</h2>\`;
                        }
                        
                        html += \`
                            <p><strong>Risk Level: </strong><span class="severity-\${result.riskLevel.toLowerCase()}">\${result.riskLevel}</span></p>
                            <p><strong>Summary: </strong>\${result.summary}</p>
                        </div>\`;

                        html += \`<h3>Issues Found (\${result.issues.length})</h3>\`;

                        result.issues.forEach(issue => {
                            html += \`
                                <div class="card">
                                    <div class="header">
                                        <h4>\${issue.title}</h4>
                                        <span class="severity-\${issue.severity.toLowerCase()}">\${issue.severity}</span>
                                    </div>
                                    <p>\${issue.description}</p>
                                    <p>
                                        <strong>Line \${issue.line_number}</strong>
                                        <button onclick="gotoLine(\${issue.line_number})">Go to Line</button>
                                    </p>
                                    <div class="code">\${issue.code_snippet}</div>
                                    <p><strong>Recommendation: </strong>\${issue.recommendation}</p>
                                </div>
                            \`;
                        });

                        content.innerHTML = html;
                    }

                    function showHistoryView(history) {
                        const content = document.getElementById('content');
                        let html = '<h2>Audit History</h2>';
                        
                        if (!history || history.length === 0) {
                            html += '<p>No audit history available</p>';
                        } else {
                            history.forEach(item => {
                                html += \`
                                    <div class="card" onclick="loadAudit('\${item.id}')" style="cursor: pointer">
                                        <strong>\${item.fileName}</strong>
                                        <p>\${new Date(item.timestamp).toLocaleString()}</p>
                                        <p>Risk Level: <span class="severity-\${item.result.riskLevel.toLowerCase()}">\${item.result.riskLevel}</span></p>
                                        <p>Issues Found: \${item.result.issues.length}</p>
                                    </div>
                                \`;
                            });
                        }
                        
                        content.innerHTML = html;
                    }

                    function showLatestReport() {
                        if (currentReport) {
                            showReport(currentReport);
                        }
                    }

                    function showHistory() {
                        vscode.postMessage({ command: 'showHistory' });
                    }

                    function loadAudit(id) {
                        vscode.postMessage({ command: 'showAudit', auditId: id });
                    }

                    function gotoLine(line) {
                        vscode.postMessage({ command: 'gotoLine', line });
                    }
                </script>
            </body>
        </html>`;
    }

    public updateReport(result: AuditResult, fileName: string = '') {
        if (this._view) {
            this._view.webview.postMessage({ 
                type: 'updateReport', 
                result,
                fileName
            });
        }
    }

    public showHistory() {
        if (this._view) {
            const history = this.historyService.getHistory();
            this._view.webview.postMessage({ 
                type: 'showHistory', 
                history 
            });
        }
    }
}
