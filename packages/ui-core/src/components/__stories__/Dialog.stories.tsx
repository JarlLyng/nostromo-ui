import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../dialog';
import { Button } from '../button';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. It explains what the dialog is for.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>Dialog content goes here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog with Actions</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to perform this action? This cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>This action will permanently delete the item.</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Item</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new item.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input 
                  className="w-full mt-1 px-3 py-2 border rounded-md" 
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full mt-1 px-3 py-2 border rounded-md" 
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  },
};
