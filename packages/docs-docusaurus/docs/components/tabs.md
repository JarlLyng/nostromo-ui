# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time. Built on top of Radix UI's Tabs primitive for accessibility and keyboard navigation.

## Installation

```bash
pnpm add @nostromo/ui-core
```

## Basic Usage

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@nostromo/ui-core'

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content</p>
  </TabsContent>
</Tabs>
```

## API Reference

### Tabs Components

| Component | Description |
|-----------|-------------|
| `Tabs` | Root tabs component |
| `TabsList` | Container for tab triggers |
| `TabsTrigger` | Individual tab trigger |
| `TabsContent` | Content panel for each tab |