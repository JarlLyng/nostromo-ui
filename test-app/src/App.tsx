import { 
  Button, 
  Input, 
  Card, CardHeader, CardTitle, CardContent, CardDescription,
  Badge,
  Alert, AlertTitle, AlertDescription,
  Avatar, AvatarImage, AvatarFallback,
  Checkbox,
  Label,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Switch,
  Textarea,
  Progress,
  Separator,
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@jarllyng/ui-core';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
        Nostromo UI Test App
      </h1>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Button Component</CardTitle>
          <CardDescription>All button variants and sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <Button variant="default" onClick={() => setCount(count + 1)}>
              Clicked {count} times
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Input, Textarea, Select, Checkbox, Switch</CardDescription>
        </CardHeader>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <Label htmlFor="input-test">Input Field</Label>
            <Input
              id="input-test"
              type="text"
              placeholder="Type something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-muted-foreground)' }}>
              You typed: {inputValue || '(nothing)'}
            </p>
          </div>

          <div>
            <Label htmlFor="textarea-test">Textarea</Label>
            <Textarea
              id="textarea-test"
              placeholder="Enter some text..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              style={{ marginTop: '0.5rem' }}
            />
          </div>

          <div>
            <Label htmlFor="select-test">Select</Label>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger id="select-test" style={{ marginTop: '0.5rem' }}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox
                id="checkbox-test"
                checked={checkboxChecked}
                onCheckedChange={setCheckboxChecked}
              />
              <Label htmlFor="checkbox-test">Checkbox</Label>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Switch
                id="switch-test"
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
              <Label htmlFor="switch-test">Switch</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Badge Component</CardTitle>
          <CardDescription>All badge variants</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Alert Component</CardTitle>
          <CardDescription>Different alert types</CardDescription>
        </CardHeader>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>This is a default alert message.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Error Alert</AlertTitle>
            <AlertDescription>This is an error alert message.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Avatar Component</CardTitle>
          <CardDescription>User avatars</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Progress Component</CardTitle>
          <CardDescription>Progress indicators</CardDescription>
        </CardHeader>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Label>Progress 25%</Label>
            <Progress value={25} style={{ marginTop: '0.5rem' }} />
          </div>
          <div>
            <Label>Progress 50%</Label>
            <Progress value={50} style={{ marginTop: '0.5rem' }} />
          </div>
          <div>
            <Label>Progress 75%</Label>
            <Progress value={75} style={{ marginTop: '0.5rem' }} />
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '2rem' }}>
        <CardHeader>
          <CardTitle>Tabs Component</CardTitle>
          <CardDescription>Tab navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" style={{ padding: '1rem 0' }}>
              Content for Tab 1
            </TabsContent>
            <TabsContent value="tab2" style={{ padding: '1rem 0' }}>
              Content for Tab 2
            </TabsContent>
            <TabsContent value="tab3" style={{ padding: '1rem 0' }}>
              Content for Tab 3
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Separator Component</CardTitle>
          <CardDescription>Visual separators</CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>Content above</div>
            <Separator />
            <div>Content below</div>
            <Separator orientation="vertical" style={{ height: '2rem' }} />
            <div>More content</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
