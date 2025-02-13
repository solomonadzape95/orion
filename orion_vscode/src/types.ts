export interface AuditIssue {
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    line_number: number;
    code_snippet: string;
    recommendation: string;
}

export interface AuditResult {
    issues: AuditIssue[];
    riskLevel: 'critical' | 'high' | 'medium' | 'low' | 'safe';
    summary: string;
}

export interface Location {
    line: number;
    character: number;
}

export enum Severity {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
    Critical = 'critical',
}

export enum RiskLevel {
    Safe = 'safe',
    Low = 'low',
    Medium = 'medium',
    High = 'high',
    Critical = 'critical',
}

export interface GeminiResponse {
    issues: {
        title: string;
        description: string;
        severity: string;
        line_number: number;
        recommendation: string;
        code_snippet: string;
    }[];
    risk_assessment: string;
    summary: string;
}
