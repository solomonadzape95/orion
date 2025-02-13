import * as vscode from 'vscode';
import { AuditResult } from '../types';

export interface AuditHistoryItem {
    id: string;
    timestamp: number;
    fileName: string;
    result: AuditResult;
}

export class HistoryService {
    private static readonly STORAGE_KEY = 'orionAuditor.history';
    private context: vscode.ExtensionContext;
    private history: AuditHistoryItem[];

    constructor(context: vscode.ExtensionContext) {
        this.context = context;
        this.history = this.loadHistory();
    }

    private loadHistory(): AuditHistoryItem[] {
        const history = this.context.globalState.get<AuditHistoryItem[]>(HistoryService.STORAGE_KEY, []);
        return history;
    }

    private async saveHistory(): Promise<void> {
        const maxItems = vscode.workspace.getConfiguration('orionAuditor').get<number>('maxHistoryItems', 50);
        if (this.history.length > maxItems) {
            this.history = this.history.slice(-maxItems);
        }
        await this.context.globalState.update(HistoryService.STORAGE_KEY, this.history);
    }

    async addAudit(fileName: string, result: AuditResult): Promise<string> {
        const id = Date.now().toString();
        const historyItem: AuditHistoryItem = {
            id,
            timestamp: Date.now(),
            fileName,
            result
        };
        this.history.push(historyItem);
        await this.saveHistory();
        return id;
    }

    getHistory(): AuditHistoryItem[] {
        return [...this.history].reverse(); // Most recent first
    }

    getAudit(id: string): AuditHistoryItem | undefined {
        return this.history.find(item => item.id === id);
    }

    async clearHistory(): Promise<void> {
        this.history = [];
        await this.saveHistory();
    }
}
