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
    <Card className="w-80">
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
    <Card className="w-80">
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
    <Card className="w-80">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
          <CardDescription>A basic card with title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a simple card with just content.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Card with Actions</CardTitle>
          <CardDescription>This card includes action buttons</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with interactive elements.</p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">Save</Button>
          <Button size="sm" variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
