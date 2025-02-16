"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitCompare } from "lucide-react";

export default function ComparePage() {
  const [sourceCode1, setSourceCode1] = useState("");
  const [sourceCode2, setSourceCode2] = useState("");
  const [comparisonResult, setComparisonResult] = useState<null | {
    similarities: number;
    differences: string[];
    suggestions: string[];
  }>(null);

  const handleCompare = () => {
    // This is a placeholder comparison logic
    // In a real implementation, you would call your backend API
    const similarities = Math.floor(Math.random() * 100);
    const differences = [
      "Different function names in contract 2",
      "Contract 1 has additional security checks",
      "Contract 2 uses a more efficient storage pattern",
    ];
    const suggestions = [
      "Consider adding reentrancy guards to both contracts",
      "Implement access control mechanisms",
      "Add event emissions for important state changes",
    ];

    setComparisonResult({
      similarities,
      differences,
      suggestions,
    });
  };

  return (
    <ScrollArea className="h-full">
      <div className="container p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Contract 1</CardTitle>
            </CardHeader>
            <CardContent>
              <Editor
                height="400px"
                defaultLanguage="solidity"
                theme="vs-dark"
                value={sourceCode1}
                onChange={(value) => setSourceCode1(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  wrappingIndent: "indent",
                }}
              />
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Contract 2</CardTitle>
            </CardHeader>
            <CardContent>
              <Editor
                height="400px"
                defaultLanguage="solidity"
                theme="vs-dark"
                value={sourceCode2}
                onChange={(value) => setSourceCode2(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  wrappingIndent: "indent",
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleCompare}
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            <GitCompare className="mr-2 h-5 w-5" />
            Compare Contracts
          </Button>
        </div>

        {comparisonResult && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Similarity Score</h3>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-cyan-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${comparisonResult.similarities}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {comparisonResult.similarities}% similar
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Differences</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {comparisonResult.differences.map((diff, index) => (
                      <li key={index} className="text-muted-foreground">
                        {diff}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {comparisonResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-muted-foreground">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ScrollArea>
  );
}
