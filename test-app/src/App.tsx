import { Button } from '@jarllyng/ui-core';
import { Input } from '@jarllyng/ui-core';
import { Card, CardHeader, CardTitle, CardContent } from '@jarllyng/ui-core';
import { Badge } from '@jarllyng/ui-core';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Nostromo UI Test App
      </h1>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="default" onClick={() => setCount(count + 1)}>
              Clicked {count} times
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Input Component</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <p>You typed: {inputValue || '(nothing)'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badge Component</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
