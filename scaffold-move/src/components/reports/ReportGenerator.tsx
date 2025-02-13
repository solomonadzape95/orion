'use client';

import { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from '@/lib/supabase/types';
import { Share2 } from 'lucide-react';

type Audit = Database['public']['Tables']['audits']['Row'];

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  finding: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
});

interface AuditReport {
  contractName: string;
  contractAddress: string;
  securityScore: number;
  findings: Array<{
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    location: string;
    recommendation: string;
  }>;
  gasOptimizations: Array<{
    description: string;
    location: string;
    potentialSavings: string;
  }>;
  timestamp: string;
}

const AuditReportDocument = ({ report }: { report: AuditReport }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Smart Contract Audit Report</Text>
        <Text style={styles.text}>Contract Name: {report.contractName}</Text>
        <Text style={styles.text}>Contract Address: {report.contractAddress}</Text>
        <Text style={styles.text}>Security Score: {report.securityScore}/100</Text>
        <Text style={styles.text}>Generated: {report.timestamp}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Security Findings</Text>
        {report.findings.map((finding, index) => (
          <View key={index} style={styles.finding}>
            <Text style={styles.text}>Severity: {finding.severity.toUpperCase()}</Text>
            <Text style={styles.text}>Description: {finding.description}</Text>
            <Text style={styles.text}>Location: {finding.location}</Text>
            <Text style={styles.text}>Recommendation: {finding.recommendation}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Gas Optimizations</Text>
        {report.gasOptimizations.map((opt, index) => (
          <View key={index} style={styles.finding}>
            <Text style={styles.text}>Description: {opt.description}</Text>
            <Text style={styles.text}>Location: {opt.location}</Text>
            <Text style={styles.text}>Potential Savings: {opt.potentialSavings}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

interface ReportGeneratorProps {
  audit: Audit;
}

export function ReportGenerator({ audit }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const report: AuditReport = {
    contractName: audit.contract_name,
    contractAddress: audit.contract_address,
    securityScore: audit.security_score,
    findings: audit.findings as any[], // Type assertion needed due to Json type
    gasOptimizations: audit.gas_optimizations as any[], // Type assertion needed due to Json type
    timestamp: new Date().toLocaleString(),
  };

  const generateShareableLink = async () => {
    setIsGenerating(true);
    try {
      // In a real implementation, you would:
      // 1. Generate a unique URL
      // 2. Store the report data in your database
      // 3. Create an access control mechanism
      const mockShareableUrl = `https://your-domain.com/reports/${audit.id}`;
      setShareUrl(mockShareableUrl);
    } catch (error) {
      console.error('Error generating shareable link:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <PDFDownloadLink
              document={<AuditReportDocument report={report} />}
              fileName={`audit-report-${audit.contract_name}.pdf`}
            >
              <Button disabled={isGenerating}>
                {isGenerating ? 'Preparing PDF...' : 'Download PDF Report'}
              </Button>
            </PDFDownloadLink>

            <Button
              variant="outline"
              onClick={generateShareableLink}
              disabled={isGenerating}
            >
              <Share2 className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating Link...' : 'Share Report'}
            </Button>
          </div>

          {shareUrl && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm font-medium">Shareable Link:</p>
              <p className="text-sm text-blue-600 break-all">{shareUrl}</p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Report Preview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Contract Name</p>
                <p className="font-medium">{report.contractName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Security Score</p>
                <p className="font-medium">{report.securityScore}/100</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Findings</p>
                <p className="font-medium">{report.findings.length} issues found</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gas Optimizations</p>
                <p className="font-medium">
                  {report.gasOptimizations.length} optimizations suggested
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
