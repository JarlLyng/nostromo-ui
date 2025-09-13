import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card';
import { Button } from '../button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component for displaying content with header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'elevated', 'ghost'],
      description: 'Visual variant of the card',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the card',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with only content
export const ContentOnly: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p>This card only has content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

// Different variants
export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>This card has an outlined border</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for outlined card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has an elevated shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for elevated card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>This card has no border or shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content for ghost card.</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Different sizes
export const Small: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader size="sm">
        <CardTitle size="sm">Small Card</CardTitle>
        <CardDescription size="sm">This is a small card</CardDescription>
      </CardHeader>
      <CardContent size="sm">
        <p>Content for small card.</p>
      </CardContent>
      <CardFooter size="sm">
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Large: Story = {
  render: () => (
    <Card size="lg">
      <CardHeader size="lg">
        <CardTitle size="lg">Large Card</CardTitle>
        <CardDescription size="lg">This is a large card with more padding</CardDescription>
      </CardHeader>
      <CardContent size="lg">
        <p>Content for large card with more space.</p>
      </CardContent>
      <CardFooter size="lg">
        <Button size="lg">Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Product card example
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Wireless Headphones</CardTitle>
        <CardDescription>Premium quality wireless headphones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-48 bg-neutral-100 rounded-md flex items-center justify-center">
            <span className="text-neutral-500">Product Image</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$199.99</span>
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-sm text-neutral-500 ml-1">(4.8)</span>
            </div>
          </div>
          <p className="text-sm text-neutral-600">
            High-quality wireless headphones with noise cancellation and 30-hour battery life.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Button className="w-full">Add to Cart</Button>
        <Button variant="outline" className="w-full">Add to Wishlist</Button>
      </CardFooter>
    </Card>
  ),
};

// User profile card
export const UserProfile: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-neutral-500">Avatar</span>
        </div>
        <CardTitle>John Doe</CardTitle>
        <CardDescription>Software Developer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium">Email:</span>
            <p className="text-sm text-neutral-600">john.doe@example.com</p>
          </div>
          <div>
            <span className="text-sm font-medium">Location:</span>
            <p className="text-sm text-neutral-600">San Francisco, CA</p>
          </div>
          <div>
            <span className="text-sm font-medium">Bio:</span>
            <p className="text-sm text-neutral-600">
              Passionate developer with 5+ years of experience in React and Node.js.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contact</Button>
      </CardFooter>
    </Card>
  ),
};

// Statistics card
export const Statistics: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,350</div>
          <p className="text-xs text-green-600">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231</div>
          <p className="text-xs text-green-600">+15.3% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-red-600">-5.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Form card
export const FormCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
        <CardDescription>Send us a message and we'll get back to you</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="Your message"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Send Message</Button>
      </CardFooter>
    </Card>
  ),
};

// Blog post card
export const BlogPost: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="h-48 bg-neutral-100 rounded-md mb-4 flex items-center justify-center">
          <span className="text-neutral-500">Blog Image</span>
        </div>
        <CardTitle>Getting Started with React</CardTitle>
        <CardDescription>Learn the basics of React development</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 mb-4">
          React is a JavaScript library for building user interfaces. In this guide, we'll cover the fundamentals
          and help you get started with your first React application.
        </p>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>By John Doe</span>
          <span>Dec 15, 2024</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Read More</Button>
      </CardFooter>
    </Card>
  ),
};

// Settings card
export const SettingsCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-neutral-500">Receive email updates</p>
            </div>
            <input type="checkbox" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">SMS Notifications</p>
              <p className="text-xs text-neutral-500">Receive SMS updates</p>
            </div>
            <input type="checkbox" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-neutral-500">Add extra security</p>
            </div>
            <input type="checkbox" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with asChild props
export const CustomElements: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h1>Custom Title Element</h1>
        </CardTitle>
        <CardDescription asChild>
          <span>Custom description element</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card uses custom HTML elements for the title and description.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

// Multiple cards grid
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Feature 1</CardTitle>
          <CardDescription>Description for feature 1</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for feature 1</p>
        </CardContent>
        <CardFooter>
          <Button>Learn More</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature 2</CardTitle>
          <CardDescription>Description for feature 2</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for feature 2</p>
        </CardContent>
        <CardFooter>
          <Button>Learn More</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Feature 3</CardTitle>
          <CardDescription>Description for feature 3</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content for feature 3</p>
        </CardContent>
        <CardFooter>
          <Button>Learn More</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
