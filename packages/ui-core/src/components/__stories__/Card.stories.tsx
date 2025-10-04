import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import { Button } from '../button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component with header, content, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card variant="default" className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. It can contain any React elements.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card variant="default" className="w-80">
      <CardHeader>
        <CardTitle>Card with Footer</CardTitle>
        <CardDescription>This card has a footer section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-80">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>This card has interactive elements</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>This card contains interactive elements.</p>
        <div className="flex gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Secondary</Button>
        </div>
      </CardContent>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-neutral-100">
      <Card variant="default" className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Default Card</CardTitle>
          <CardDescription>Standard card with clean styling</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Clean design with subtle shadows and borders.</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated" className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Elevated Card</CardTitle>
          <CardDescription>More prominent with stronger shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Perfect for important content with more depth.</p>
        </CardContent>
      </Card>

      <Card variant="outlined" className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Outlined Card</CardTitle>
          <CardDescription>Clean border with focus states</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Great for forms and inputs with clear borders.</p>
        </CardContent>
      </Card>

      <Card variant="filled" className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Filled Card</CardTitle>
          <CardDescription>Subtle background for grouping</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Perfect for secondary content with background.</p>
        </CardContent>
      </Card>

      <Card variant="interactive" className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Interactive Card</CardTitle>
          <CardDescription>Hover effects and scale transforms</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Clickable cards with hover feedback.</p>
        </CardContent>
      </Card>

      <Card variant="subtle" className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Subtle Card</CardTitle>
          <CardDescription>Minimal design for less important content</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Very subtle styling for background content.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card variant="default" size="sm">
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Compact spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Less padding for tight layouts.</p>
        </CardContent>
      </Card>

      <Card variant="default" size="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Standard spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Balanced padding for most use cases.</p>
        </CardContent>
      </Card>

      <Card variant="default" size="lg">
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>Generous spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <p>More breathing room for important content.</p>
        </CardContent>
      </Card>

      <Card variant="default" size="xl">
        <CardHeader>
          <CardTitle>Extra Large Card</CardTitle>
          <CardDescription>Maximum spacing</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Lots of space for featured content.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="elevated" className="hover:scale-105 transition-transform">
        <CardHeader>
          <CardTitle className="text-xl">Dashboard Stats</CardTitle>
          <CardDescription>Key metrics for your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Revenue</span>
              <span className="font-semibold">$12,345</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-neutral-600">Users</span>
              <span className="font-semibold">1,234</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">View Details</Button>
        </CardFooter>
      </Card>

      <Card variant="filled">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
              <span className="text-sm">New user registered</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm">Payment processed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="interactive" className="cursor-pointer">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline">Export</Button>
            <Button size="sm" variant="outline">Import</Button>
            <Button size="sm" variant="outline">Settings</Button>
            <Button size="sm" variant="outline">Help</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
