import { GoogleGenerativeAI } from '@google/generative-ai';
import { AuditResult, GeminiResponse, RiskLevel, Severity } from '../types';
import * as vscode from 'vscode';
import * as path from 'path';

export class GeminiService {
    private genAI: GoogleGenerativeAI;
    private model: any;
    private outputChannel: vscode.OutputChannel;

    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('Orion Gemini Service');
        try {
            this.outputChannel.appendLine('Initializing GeminiService...');
            const apiKey = "AIzaSyD5Bw5XkrywURBL06NYIzGw_oTtAm3-IKw";
            this.outputChannel.appendLine('API Key available: ' + !!apiKey);
            
            if (!apiKey) {
                throw new Error('GEMINI_API_KEY not found');
            }

            this.genAI = new GoogleGenerativeAI(apiKey);
            this.model = this.genAI.getGenerativeModel({ 
                model: 'gemini-1.5-flash'
            });
            this.outputChannel.appendLine('GeminiService initialized successfully');
        } catch (error: any) {
            this.outputChannel.appendLine(`Error initializing GeminiService: ${error}`);
            vscode.window.showErrorMessage('Failed to initialize Gemini Service. Check your API key configuration.');
            throw new Error(`Failed to initialize GeminiService: ${error.message}`);
        }
    }

    private async generatePrompt(code: string, language: string): Promise<string> {
        this.outputChannel.appendLine(`Generating prompt for ${language} code...`);
        return `You are an expert smart contract security auditor. Analyze the following ${language} smart contract code for security vulnerabilities, best practices, and potential improvements.

Focus on these key areas:
1. Access Control
2. Input Validation
3. Arithmetic Operations
4. State Management
5. Gas Optimization
6. Event Logging
7. Error Handling
8. External Calls
9. Reentrancy
10. Business Logic

For each issue found, you MUST provide:
1. A clear, specific title describing the vulnerability
2. A detailed description explaining why it's a problem
3. The severity level (EXACTLY one of: "low", "medium", "high", "critical")
4. The EXACT line number where the issue occurs
5. A specific, actionable recommendation on how to fix it
6. The relevant code snippet showing the vulnerable code

Format your response in EXACTLY this JSON structure:
{
    "issues": [
        {
            "title": "Clear, specific title",
            "description": "Detailed explanation of the problem and its implications",
            "severity": "low|medium|high|critical",
            "line_number": exact_line_number,
            "recommendation": "Specific, actionable fix",
            "code_snippet": "Relevant code"
        }
    ],
    "risk_assessment": "safe|low|medium|high|critical",
    "summary": "Comprehensive overview of all findings"
}

Severity Guidelines:
- critical: Immediate exploitation risk, direct fund loss
- high: Significant vulnerability, potential fund loss
- medium: Notable issues affecting security/functionality
- low: Best practice violations, minor improvements

Here's the code to analyze:

${code}

Remember:
- Be thorough and specific in your analysis
- Provide EXACT line numbers
- Use ONLY the specified severity levels
- Format as valid JSON
- Include ALL required fields
- Make sure code snippets are properly escaped
- Focus on practical, actionable recommendations`;
    }

    public async analyzeCode(code: string, language: string): Promise<AuditResult> {
        try {
            this.outputChannel.appendLine('Starting code analysis...');
            const prompt = await this.generatePrompt(code, language);
            this.outputChannel.appendLine('Sending request to Gemini API...');
            
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            
            let geminiResponse: GeminiResponse;
            try {
                // Try to parse as JSON first
                if (typeof text === 'string') {
                    // Remove any markdown code block markers if present
                    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim();
                    geminiResponse = JSON.parse(cleanText);
                } else {
                    geminiResponse = text;
                }
            } catch (parseError) {
                this.outputChannel.appendLine(`Failed to parse Gemini response: ${parseError}`);
                throw new Error('Failed to parse Gemini response as JSON');
            }
            
            // Validate response structure
            if (!this.isValidResponse(geminiResponse)) {
                throw new Error('Invalid response structure from Gemini');
            }
            
            const transformedResponse = this.normalizeResponse(geminiResponse);
            return transformedResponse;
        } catch (error: any) {
            this.outputChannel.appendLine(`Error analyzing code: ${error}`);
            vscode.window.showErrorMessage('Failed to analyze code. Check Orion Gemini Service output for details.');
            throw new Error(`Failed to analyze code: ${error.message}`);
        }
    }

    private isValidResponse(response: any): response is GeminiResponse {
        return (
            response &&
            Array.isArray(response.issues) &&
            response.issues.every((issue: any) => 
                issue.title &&
                issue.description &&
                issue.severity &&
                (issue.line_number !== undefined) &&
                issue.recommendation &&
                issue.code_snippet
            ) &&
            typeof response.risk_assessment === 'string' &&
            typeof response.summary === 'string'
        );
    }

    private normalizeResponse(response: any): AuditResult {
        try {
            // Parse the response if it's a string
            const data = typeof response === 'string' ? JSON.parse(response) : response;

            // Normalize issues array
            const issues = (data.issues || []).map((issue: any) => ({
                title: issue.title || 'Untitled Issue',
                description: issue.description || '',
                severity: this.normalizeSeverity(issue.severity),
                line_number: parseInt(issue.line_number) || 1,
                code_snippet: issue.code_snippet || '',
                recommendation: issue.recommendation || ''
            }));

            return {
                issues,
                riskLevel: this.normalizeRiskLevel(data.risk_assessment || data.riskLevel),
                summary: data.summary || 'No summary provided'
            };
        } catch (error) {
            this.outputChannel.appendLine(`Error normalizing response: ${error}`);
            throw new Error('Failed to parse audit response');
        }
    }

    private normalizeSeverity(severity: string): 'critical' | 'high' | 'medium' | 'low' {
        const normalized = severity?.toLowerCase() || '';
        if (['critical', 'high', 'medium', 'low'].includes(normalized)) {
            return normalized as 'critical' | 'high' | 'medium' | 'low';
        }
        return 'medium'; // default
    }

    private normalizeRiskLevel(level: string): 'critical' | 'high' | 'medium' | 'low' | 'safe' {
        const normalized = level?.toLowerCase() || '';
        if (['critical', 'high', 'medium', 'low', 'safe'].includes(normalized)) {
            return normalized as 'critical' | 'high' | 'medium' | 'low' | 'safe';
        }
        return 'medium'; // default
    }
}
