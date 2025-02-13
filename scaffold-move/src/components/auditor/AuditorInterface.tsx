'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AuditResult {
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
  securityScore: number;
}

export function AuditorInterface() {
  const { account } = useWallet();
  const [contractCode, setContractCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const { toast } = useToast();

  const startAudit = async () => {
    if (!account?.address) {
      toast({
        title: 'Authentication Required',
        description: 'Please connect your wallet to start an audit.',
        variant: 'destructive',
      });
      return;
    }

    if (!contractCode.trim()) {
      toast({
        title: 'Empty Contract',
        description: 'Please provide the contract code to audit.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // TODO: Implement actual contract analysis logic
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: AuditResult = {
        findings: [
          {
            severity: 'high',
            description: 'Unauthorized access in transfer function',
            location: 'line 42',
            recommendation: 'Implement proper access controls',
          },
        ],
        gasOptimizations: [
          {
            description: 'Inefficient loop implementation',
            location: 'line 78',
            potentialSavings: '~15% gas reduction possible',
          },
        ],
        securityScore: 85,
      };

      setAuditResult(mockResult);
      
      // Store audit result in Supabase
      const { error } = await supabase.from('audits').insert({
        user_id: account.address,
        contract_address: 'mock_address', // Replace with actual contract address
        contract_name: 'MyContract', // Replace with actual contract name
        chain_id: 1, // Replace with actual chain ID
        security_score: mockResult.securityScore,
        findings: mockResult.findings,
        gas_optimizations: mockResult.gasOptimizations,
        status: 'completed',
      });

      if (error) throw error;

    } catch (error) {
      console.error('Audit error:', error);
      toast({
        title: 'Audit Failed',
        description: 'An error occurred while analyzing the contract.',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Smart Contract Auditor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Paste your Move contract code here..."
              value={contractCode}
              onChange={(e) => setContractCode(e.target.value)}
              className="h-64 font-mono"
            />
            <Button
              onClick={startAudit}
              disabled={isAnalyzing || !contractCode.trim()}
              className="w-full"
            >
              {isAnalyzing ? 'Analyzing...' : 'Start Audit'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card>
          <CardContent className="p-4">
            <Progress value={45} className="w-full" />
            <p className="text-center mt-2">Analyzing contract...</p>
          </CardContent>
        </Card>
      )}

      {auditResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Audit Results
              <Badge variant={auditResult.securityScore >= 80 ? 'success' : 'destructive'}>
                Score: {auditResult.securityScore}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Security Findings</h3>
                {auditResult.findings.map((finding, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-2">
                    <div className="flex items-center gap-2">
                      {finding.severity === 'critical' && <AlertCircle className="text-red-500" />}
                      <span className={`font-semibold ${
                        finding.severity === 'critical' ? 'text-red-500' :
                        finding.severity === 'high' ? 'text-orange-500' :
                        finding.severity === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`}>
                        {finding.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-2">{finding.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Location: {finding.location}</p>
                    <p className="text-sm mt-2">💡 {finding.recommendation}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Gas Optimizations</h3>
                {auditResult.gasOptimizations.map((opt, index) => (
                  <div key={index} className="border rounded-lg p-4 mb-2">
                    <p>{opt.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Location: {opt.location}</p>
                    <p className="text-sm text-green-600 mt-1">Potential Savings: {opt.potentialSavings}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
