import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default value of the tabs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Account</h3>
          <p className="text-muted-foreground">
            Make changes to your account here. Click save when you&apos;re done.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Password</h3>
          <p className="text-muted-foreground">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-muted-foreground">
            Manage your preferences and settings here.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Outline: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList variant="outline">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground">
            Get a high-level view of your dashboard metrics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-muted-foreground">
            Dive deep into your data with detailed analytics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-muted-foreground">
            Generate and download comprehensive reports.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-[400px]">
      <TabsList variant="pills">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="contact">Contact</TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Home</h3>
          <p className="text-muted-foreground">
            Welcome to our homepage. This is where it all begins.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="about">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-muted-foreground">
            Learn more about our company and mission.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="contact">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-muted-foreground">
            Get in touch with us through various channels.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="sm">
            <TabsTrigger value="tab1" size="sm">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" size="sm">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" size="sm">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">
              <p className="text-muted-foreground">Small tab content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Default</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">
              <p className="text-muted-foreground">Default tab content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList size="lg">
            <TabsTrigger value="tab1" size="lg">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" size="lg">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3" size="lg">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4">
              <p className="text-muted-foreground">Large tab content</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="dashboard" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          </svg>
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="users" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          Users
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Dashboard</h3>
          <p className="text-muted-foreground">
            View your dashboard with key metrics and insights.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="users">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <p className="text-muted-foreground">
            Manage your users and their permissions.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-muted-foreground">
            Configure your application settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="another">Another</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Active Tab</h3>
          <p className="text-muted-foreground">
            This tab is active and functional.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Disabled Tab</h3>
          <p className="text-muted-foreground">
            This tab is disabled and cannot be accessed.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="another">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Another Tab</h3>
          <p className="text-muted-foreground">
            This is another active tab.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
