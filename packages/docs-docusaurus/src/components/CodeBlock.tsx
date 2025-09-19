import React, { useState } from 'react';
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from './NostromoComponents';

interface CodeBlockProps {
  children: string;
  title?: string;
  language?: string;
}

export default function CodeBlock({ children, title, language = "tsx" }: CodeBlockProps) {
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="code-block-container margin-bottom--lg">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {title || 'Code Example'}
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? 'Hide Code' : 'Show Code'}
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={copyToClipboard}
              >
                Copy
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {showCode && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{language}</Badge>
              </div>
              <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
                <code className={`language-${language}`}>{children}</code>
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
