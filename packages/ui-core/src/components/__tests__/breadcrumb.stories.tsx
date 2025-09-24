import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis } from "../breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
      description: "Array of breadcrumb items",
    },
    variant: {
      control: "select",
      options: ["default", "compact"],
      description: "The visual variant of the breadcrumb",
    },
    separator: {
      control: "select",
      options: ["default", "slash", "arrow", "dot"],
      description: "The separator between breadcrumb items",
    },
    showHome: {
      control: "boolean",
      description: "Whether to show the home icon",
    },
    homeHref: {
      control: "text",
      description: "The href for the home link",
    },
    onItemClick: {
      action: "itemClick",
      description: "Event handler for when a breadcrumb item is clicked",
    },
  },
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Category", href: "/products/category" },
      { label: "Current Page" },
    ],
    variant: "default",
    separator: "default",
    showHome: false,
    homeHref: "/",
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {},
};

export const WithHome: Story = {
  args: {
    showHome: true,
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
  },
};

export const SlashSeparator: Story = {
  args: {
    separator: "slash",
  },
};

export const ArrowSeparator: Story = {
  args: {
    separator: "arrow",
  },
};

export const DotSeparator: Story = {
  args: {
    separator: "dot",
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Computers", href: "/products/electronics/computers" },
      { label: "Laptops", href: "/products/electronics/computers/laptops" },
      { label: "Gaming Laptops", href: "/products/electronics/computers/laptops/gaming" },
      { label: "Current Product" },
    ],
  },
};

export const WithCurrentItem: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Current", current: true },
    ],
  },
};

export const NoLinks: Story = {
  args: {
    items: [
      { label: "Home" },
      { label: "Products" },
      { label: "Current Page" },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      { label: "Home" },
    ],
  },
};

export const CustomHomeHref: Story = {
  args: {
    showHome: true,
    homeHref: "/dashboard",
  },
};

// Individual component stories
export const BreadcrumbListStory: Story = {
  render: () => (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Current Page</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  ),
};

export const WithEllipsis: Story = {
  render: () => (
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator>/</BreadcrumbSeparator>
      <BreadcrumbItem>
        <BreadcrumbPage>Current Page</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  ),
};

export const Interactive: Story = {
  args: {
    onItemClick: (item, index) => {
      console.log(`Clicked item: ${item.label} at index: ${index}`);
    },
  },
};

export const Responsive: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Electronics", href: "/products/electronics" },
      { label: "Computers", href: "/products/electronics/computers" },
      { label: "Laptops", href: "/products/electronics/computers/laptops" },
      { label: "Gaming Laptops", href: "/products/electronics/computers/laptops/gaming" },
      { label: "Current Product" },
    ],
    variant: "compact",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
