import React from 'react';
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "../pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: "number",
      description: "The current active page.",
    },
    totalPages: {
      control: "number",
      description: "The total number of pages.",
    },
    onPageChange: {
      action: "pageChanged",
      description: "Event handler for when a page is clicked.",
    },
    showFirstLast: {
      control: "boolean",
      description: "Whether to show first/last page buttons.",
    },
    showPrevNext: {
      control: "boolean",
      description: "Whether to show previous/next page buttons.",
    },
    maxVisiblePages: {
      control: "number",
      description: "Maximum number of visible page buttons.",
    },
    disabled: {
      control: "boolean",
      description: "Whether the pagination is disabled.",
    },
    variant: {
      control: "select",
      options: ["default", "compact"],
      description: "The visual variant of the pagination.",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the pagination buttons.",
    },
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    showFirstLast: true,
    showPrevNext: true,
    maxVisiblePages: 5,
    disabled: false,
    variant: "default",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

// Interactive wrapper for stories
const PaginationWrapper = (args: React.ComponentProps<typeof Pagination>) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

export const Default: Story = {
  render: PaginationWrapper,
};

export const WithManyPages: Story = {
  render: PaginationWrapper,
  args: {
    currentPage: 5,
    totalPages: 20,
    maxVisiblePages: 7,
  },
};

export const Compact: Story = {
  render: PaginationWrapper,
  args: {
    variant: "compact",
    size: "sm",
  },
};

export const Large: Story = {
  render: PaginationWrapper,
  args: {
    size: "lg",
  },
};

export const WithoutFirstLast: Story = {
  render: PaginationWrapper,
  args: {
    showFirstLast: false,
  },
};

export const WithoutPrevNext: Story = {
  render: PaginationWrapper,
  args: {
    showPrevNext: false,
  },
};

export const Minimal: Story = {
  render: PaginationWrapper,
  args: {
    showFirstLast: false,
    showPrevNext: false,
    maxVisiblePages: 3,
  },
};

export const Disabled: Story = {
  render: PaginationWrapper,
  args: {
    disabled: true,
  },
};

export const SinglePage: Story = {
  render: PaginationWrapper,
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const FewPages: Story = {
  render: PaginationWrapper,
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const AtEnd: Story = {
  render: PaginationWrapper,
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};

export const InMiddle: Story = {
  render: PaginationWrapper,
  args: {
    currentPage: 5,
    totalPages: 10,
    maxVisiblePages: 3,
  },
};

export const WithEllipsis: Story = {
  render: PaginationWrapper,
  args: {
    currentPage: 8,
    totalPages: 20,
    maxVisiblePages: 5,
  },
};
