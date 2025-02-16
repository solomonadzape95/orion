import * as vscode from "vscode";
import { AuditIssue } from "../types";

export class DiagnosticProvider {
  private diagnosticCollection: vscode.DiagnosticCollection;
  private decorationTypes: { [key: string]: vscode.TextEditorDecorationType };

  constructor(context: vscode.ExtensionContext) {
    this.diagnosticCollection =
      vscode.languages.createDiagnosticCollection("orion-auditor");

    // Create decoration types for different severity levels
    this.decorationTypes = {
      critical: vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        gutterIconPath: context.asAbsolutePath("resources/critical.png"),
        gutterIconSize: "80%",
        overviewRulerColor: new vscode.ThemeColor("editorError.foreground"),
        overviewRulerLane: vscode.OverviewRulerLane.Right,
      }),
      high: vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        gutterIconPath: context.asAbsolutePath("resources/high.png"),
        gutterIconSize: "80%",
        overviewRulerColor: new vscode.ThemeColor("editorWarning.foreground"),
        overviewRulerLane: vscode.OverviewRulerLane.Right,
      }),
      medium: vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        gutterIconPath: context.asAbsolutePath("resources/medium.png"),
        gutterIconSize: "80%",
        overviewRulerColor: new vscode.ThemeColor("editorInfo.foreground"),
        overviewRulerLane: vscode.OverviewRulerLane.Right,
      }),
      low: vscode.window.createTextEditorDecorationType({
        isWholeLine: true,
        gutterIconPath: context.asAbsolutePath("resources/low.png"),
        gutterIconSize: "80%",
        overviewRulerColor: new vscode.ThemeColor("editorHint.foreground"), 
        overviewRulerLane: vscode.OverviewRulerLane.Right,
      }),
    };
  }

  public async updateDiagnostics(
    document: vscode.TextDocument,
    issues: AuditIssue[]
  ) {
    try {
      const diagnostics: vscode.Diagnostic[] = [];
      const decorations: { [key: string]: vscode.Range[] } = {
        critical: [],
        high: [],
        medium: [],
        low: [],
      };

      issues.forEach((issue) => {
        // Ensure we have a valid line number
        const lineNumber = issue.line_number - 1;
        if (lineNumber < 0 || lineNumber >= document.lineCount) {
          console.warn(`Invalid line number ${issue.line_number} for issue: ${issue.title}`);
          return;
        }

        const range = new vscode.Range(
          new vscode.Position(lineNumber, 0),
          new vscode.Position(lineNumber, document.lineAt(lineNumber).text.length)
        );

        const diagnostic = new vscode.Diagnostic(
          range,
          `${issue.title}: ${issue.description}`,
          this.getSeverity(issue.severity)
        );
        diagnostic.source = "Orion Auditor";
        diagnostic.code = {
          value: issue.severity,
          target: vscode.Uri.parse(
            `command:orion-auditor.showReport?${encodeURIComponent(
              JSON.stringify([issue])
            )}`
          ),
        };
        diagnostics.push(diagnostic);

        // Add range to decorations
        const severityKey = issue.severity.toLowerCase();
        if (decorations[severityKey]) {
          decorations[severityKey].push(range);
        }
      });

      // Update diagnostics
      this.diagnosticCollection.set(document.uri, diagnostics);

      // Update decorations
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document === document) {
        Object.keys(this.decorationTypes).forEach((severity) => {
          editor.setDecorations(
            this.decorationTypes[severity],
            decorations[severity]
          );
        });
      }
    } catch (error) {
      console.error("Error updating diagnostics:", error);
      this.clearDiagnostics(document);
    }
  }

  private getSeverity(severity: string): vscode.DiagnosticSeverity {
    switch (severity.toLowerCase()) {
      case "critical":
        return vscode.DiagnosticSeverity.Error;
      case "high":
        return vscode.DiagnosticSeverity.Error;
      case "medium":
        return vscode.DiagnosticSeverity.Warning;
      case "low":
        return vscode.DiagnosticSeverity.Information;
      default:
        return vscode.DiagnosticSeverity.Hint;
    }
  }

  public clearDiagnostics(document: vscode.TextDocument) {
    this.diagnosticCollection.delete(document.uri);
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document === document) {
      Object.values(this.decorationTypes).forEach((decorationType) => {
        editor.setDecorations(decorationType, []);
      });
    }
  }

  public dispose() {
    this.diagnosticCollection.clear();
    this.diagnosticCollection.dispose();
    Object.values(this.decorationTypes).forEach((decorationType) => {
      decorationType.dispose();
    });
  }
}
