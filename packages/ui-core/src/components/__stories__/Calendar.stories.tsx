import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from '../calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible calendar component with date picker functionality. Supports single date selection, date ranges, and multiple date selection. Built with accessibility in mind and full keyboard navigation support.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Selection mode'
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    error: {
      control: 'boolean'
    },
    showOutsideDays: {
      control: 'boolean'
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1]
    }
  }
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: 'single',
    placeholder: 'Select date...'
  }
};

export const WithLabel: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Choose a date'
  }
};

export const WithHelperText: Story = {
  args: {
    mode: 'single',
    label: 'Birth Date',
    helperText: 'Select your date of birth',
    placeholder: 'Choose a date'
  }
};

export const WithError: Story = {
  args: {
    mode: 'single',
    label: 'Required Date',
    error: true,
    helperText: 'This field is required',
    placeholder: 'Select date...'
  }
};

export const SingleDate: Story = {
  args: {
    mode: 'single',
    label: 'Select a Date',
    placeholder: 'Choose a single date'
  }
};

export const DateRange: Story = {
  args: {
    mode: 'range',
    label: 'Select Date Range',
    placeholder: 'Choose start and end date'
  }
};

export const MultipleDates: Story = {
  args: {
    mode: 'multiple',
    label: 'Select Multiple Dates',
    placeholder: 'Choose multiple dates'
  }
};

export const WithMinDate: Story = {
  args: {
    mode: 'single',
    label: 'Future Date',
    placeholder: 'Select a future date',
    minDate: new Date()
  }
};

export const WithMaxDate: Story = {
  args: {
    mode: 'single',
    label: 'Past Date',
    placeholder: 'Select a past date',
    maxDate: new Date()
  }
};

export const WithDateRange: Story = {
  args: {
    mode: 'single',
    label: 'Date in Range',
    placeholder: 'Select a date',
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2024, 11, 31)
  }
};

export const WithDisabledDays: Story = {
  args: {
    mode: 'single',
    label: 'Weekdays Only',
    placeholder: 'Select a weekday',
    disabledDays: [0, 6] // Disable Sunday and Saturday
  }
};

export const Small: Story = {
  args: {
    mode: 'single',
    size: 'sm',
    label: 'Small Calendar',
    placeholder: 'Select date...'
  }
};

export const Large: Story = {
  args: {
    mode: 'single',
    size: 'lg',
    label: 'Large Calendar',
    placeholder: 'Select date...'
  }
};

export const WithoutOutsideDays: Story = {
  args: {
    mode: 'single',
    showOutsideDays: false,
    label: 'Current Month Only',
    placeholder: 'Select date...'
  }
};

export const MondayFirst: Story = {
  args: {
    mode: 'single',
    firstDayOfWeek: 1,
    label: 'Monday First',
    placeholder: 'Select date...'
  }
};

export const SundayFirst: Story = {
  args: {
    mode: 'single',
    firstDayOfWeek: 0,
    label: 'Sunday First',
    placeholder: 'Select date...'
  }
};

export const InteractivePlayground: Story = {
  args: {
    mode: 'single',
    label: 'Interactive Calendar',
    placeholder: 'Select date...'
  },
  render: (args) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();
    const [selectedRange, setSelectedRange] = React.useState<{ from?: Date; to?: Date } | undefined>();
    const [selectedMultiple, setSelectedMultiple] = React.useState<Date[]>([]);
    
    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium mb-4">Single Date</h3>
          <Calendar
            {...args}
            mode="single"
            value={selectedDate}
            onChange={(value) => setSelectedDate(value as Date)}
          />
          {selectedDate && (
            <p className="mt-2 text-sm text-neutral-600">
              Selected: {selectedDate.toLocaleDateString()}
            </p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-4">Date Range</h3>
          <Calendar
            {...args}
            mode="range"
            value={selectedRange}
            onChange={(value) => setSelectedRange(value as { from?: Date; to?: Date })}
          />
          {selectedRange && (
            <p className="mt-2 text-sm text-neutral-600">
              {selectedRange.from && `From: ${selectedRange.from.toLocaleDateString()}`}
              {selectedRange.to && ` To: ${selectedRange.to.toLocaleDateString()}`}
            </p>
          )}
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-4">Multiple Dates</h3>
          <Calendar
            {...args}
            mode="multiple"
            value={selectedMultiple}
            onChange={(value) => setSelectedMultiple(value as Date[])}
          />
          {selectedMultiple.length > 0 && (
            <p className="mt-2 text-sm text-neutral-600">
              Selected: {selectedMultiple.length} date(s)
            </p>
          )}
        </div>
      </div>
    );
  }
};

