import React, { useState } from 'react';
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent } from './NostromoComponents';

interface PlaygroundProps {
  children: string;
  title?: string;
}

export default function Playground({ children, title = "Live Example" }: PlaygroundProps) {
  const [code, setCode] = useState(children);
  const [showCode, setShowCode] = useState(false);

  // Simple code execution for demo purposes
  // In a real implementation, you'd want to use a proper code execution environment
  const executeCode = () => {
    try {
      // This is a simplified version - in reality you'd need a proper code execution environment
      return eval(code);
    } catch (error) {
      return <div className="text-red-500">Error: {error.message}</div>;
    }
  };

  return (
    <div className="playground-container margin-bottom--lg">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Live Preview */}
            <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
              <div className="text-sm text-neutral-600 mb-2">Preview:</div>
              <div className="playground-preview">
                {/* This would be replaced with actual code execution */}
                <div className="text-neutral-500 italic">
                  Live preview would appear here
                </div>
              </div>
            </div>

            {/* Code Editor */}
            {showCode && (
              <div className="space-y-2">
                <div className="text-sm text-neutral-600">Code:</div>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-32 p-3 font-mono text-sm border border-neutral-200 rounded-lg bg-neutral-900 text-neutral-100"
                  placeholder="Enter your code here..."
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setCode(children)}>
                    Reset
                  </Button>
                  <Button variant="secondary" size="sm">
                    Copy Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
