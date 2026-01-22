import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  getDaysInMonth as dateFnsGetDaysInMonth,
  startOfMonth,
  getDay,
  isSameDay as dateFnsIsSameDay,
  isWithinInterval,
  isBefore,
  isAfter,
  format as dateFnsFormat,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { cn } from '../../lib/utils';
import { Button } from './button';

// Calendar variants
const calendarVariants = cva(
  'inline-block rounded-lg border bg-background shadow-lg',
  {
    variants: {
      variant: {
        default: 'border-border bg-card',
        outline: 'border-2 border-border',
        ghost: 'border-transparent bg-transparent shadow-none'
      },
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

const calendarDayVariants = cva(
  'flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted text-foreground',
        selected: 'bg-primary text-primary-foreground hover:bg-primary/90 font-semibold',
        range: 'bg-primary/10 text-primary hover:bg-primary/20 font-medium',
        today: 'border-2 border-primary text-foreground font-semibold',
        outside: 'text-muted-foreground',
        disabled: 'text-muted-foreground/50 cursor-not-allowed'
      },
      size: {
        sm: 'h-7 w-7 text-xs',
        md: 'h-9 w-9 text-sm',
        lg: 'h-11 w-11 text-base'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
);

export type CalendarMode = 'single' | 'range' | 'multiple';

export interface CalendarProps extends VariantProps<typeof calendarVariants> {
  mode?: CalendarMode;
  value?: Date | Date[] | { from?: Date; to?: Date };
  defaultValue?: Date | Date[] | { from?: Date; to?: Date };
  onChange?: (value: Date | Date[] | { from?: Date; to?: Date } | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  disabledDays?: number[]; // 0 = Sunday, 1 = Monday, etc.
  locale?: string;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  calendarClassName?: string;
  showOutsideDays?: boolean;
  firstDayOfWeek?: 0 | 1; // 0 = Sunday, 1 = Monday
}

// Helper functions using date-fns for robust date manipulation
const getDaysInMonth = (date: Date): number => {
  return dateFnsGetDaysInMonth(date);
};

const getFirstDayOfMonth = (date: Date, firstDayOfWeek: 0 | 1): number => {
  // Use date-fns getDay for consistent day-of-week calculation
  const firstDay = getDay(startOfMonth(date));
  // Convert Sunday (0) to Monday-first (6) if needed
  // Sunday = 0, Monday = 1, ..., Saturday = 6
  // For Monday-first: Sunday becomes 6, Monday becomes 0, etc.
  return firstDayOfWeek === 1 ? (firstDay === 0 ? 6 : firstDay - 1) : firstDay;
};

const isSameDay = (date1: Date | undefined, date2: Date | undefined): boolean => {
  if (!date1 || !date2) return false;
  return dateFnsIsSameDay(date1, date2);
};

const isDateInRange = (date: Date, from?: Date, to?: Date): boolean => {
  if (!from && !to) return false;
  if (from && to) {
    // Use date-fns isWithinInterval for proper date range checking
    return isWithinInterval(startOfDay(date), {
      start: startOfDay(from),
      end: endOfDay(to),
    });
  }
  if (from) return !isBefore(startOfDay(date), startOfDay(from));
  if (to) return !isAfter(startOfDay(date), endOfDay(to));
  return false;
};

const isDateDisabled = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  disabledDates?: Date[],
  disabledDays?: number[]
): boolean => {
  if (minDate && isBefore(startOfDay(date), startOfDay(minDate))) return true;
  if (maxDate && isAfter(startOfDay(date), endOfDay(maxDate))) return true;
  if (disabledDates?.some(d => isSameDay(d, date))) return true;
  if (disabledDays?.includes(getDay(date))) return true;
  return false;
};

const formatDate = (date: Date | undefined, _locale: string = 'en-US'): string => {
  if (!date) return '';
  // Use date-fns format for consistent formatting
  // Note: date-fns uses locale objects, but we'll use a simple format for now
  // For full locale support, import locale from 'date-fns/locale'
  // Locale parameter is kept for API compatibility but not yet used
  return dateFnsFormat(date, 'MMM d, yyyy');
};

const formatDateRange = (from?: Date, to?: Date, locale: string = 'en-US'): string => {
  if (!from && !to) return '';
  if (from && to) {
    return `${formatDate(from, locale)} - ${formatDate(to, locale)}`;
  }
  if (from) return formatDate(from, locale);
  if (to) return formatDate(to, locale);
  return '';
};

const formatMultipleDates = (dates: Date[], _locale: string = 'en-US'): string => {
  if (dates.length === 0) return '';
  if (dates.length === 1) return formatDate(dates[0], _locale);
  return `${dates.length} dates selected`;
};

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = 'single',
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates,
      disabledDays,
      locale = 'en-US',
      placeholder,
      label,
      error,
      helperText,
      className,
      inputClassName,
      calendarClassName,
      variant,
      size,
      showOutsideDays = true,
      firstDayOfWeek = 1,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const dayButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    
    // Controlled vs uncontrolled
    const [internalValue, setInternalValue] = useState<
      Date | Date[] | { from?: Date; to?: Date } | undefined
    >(defaultValue);
    
    const isControlled = value !== undefined;
    const calendarValue = isControlled ? value : internalValue;
    
    // Set focused date when calendar opens
    useEffect(() => {
      if (open && !focusedDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        setFocusedDate(today);
      }
    }, [open, focusedDate]);
    
    // Handle value changes
    const handleValueChange = (newValue: Date | Date[] | { from?: Date; to?: Date } | undefined) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };
    
    // Handle date selection
    const handleDateClick = (date: Date) => {
      if (isDateDisabled(date, minDate, maxDate, disabledDates, disabledDays)) {
        return;
      }
      
      if (mode === 'single') {
        handleValueChange(date);
        setOpen(false);
      } else if (mode === 'range') {
        const rangeValue = calendarValue as { from?: Date; to?: Date } | undefined;
        if (!rangeValue?.from || (rangeValue.from && rangeValue.to)) {
          // Start new range
          handleValueChange({ from: date });
        } else {
          // Complete range
          const from = rangeValue.from;
          const to = date;
          if (to < from) {
            handleValueChange({ from: to, to: from });
          } else {
            handleValueChange({ from, to });
          }
          setOpen(false);
        }
      } else if (mode === 'multiple') {
        const multipleValue = (calendarValue as Date[]) || [];
        const dateIndex = multipleValue.findIndex(d => isSameDay(d, date));
        if (dateIndex >= 0) {
          // Remove date
          handleValueChange(multipleValue.filter((_, i) => i !== dateIndex));
        } else {
          // Add date
          handleValueChange([...multipleValue, date]);
        }
      }
    };
    
    // Get display value
    const displayValue = useMemo(() => {
      if (!calendarValue) return '';
      
      if (mode === 'single') {
        return formatDate(calendarValue as Date, locale);
      } else if (mode === 'range') {
        const range = calendarValue as { from?: Date; to?: Date };
        return formatDateRange(range.from, range.to, locale);
      } else {
        return formatMultipleDates(calendarValue as Date[], locale);
      }
    }, [calendarValue, mode, locale]);
    
    // Generate calendar days
    const calendarDays = useMemo(() => {
      const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean }> = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const firstDay = getFirstDayOfMonth(currentMonth, firstDayOfWeek);
      const daysInMonth = getDaysInMonth(currentMonth);
      
      // Previous month days
      if (showOutsideDays && firstDay > 0) {
        const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        const daysInPrevMonth = getDaysInMonth(prevMonth);
        for (let i = daysInPrevMonth - firstDay + 1; i <= daysInPrevMonth; i++) {
          const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i);
          days.push({
            date,
            isCurrentMonth: false,
            isToday: isSameDay(date, today)
          });
        }
      }
      
      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
        days.push({
          date,
          isCurrentMonth: true,
          isToday: isSameDay(date, today)
        });
      }
      
      // Next month days
      if (showOutsideDays) {
        const remainingDays = 42 - days.length; // 6 weeks * 7 days
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        for (let i = 1; i <= remainingDays; i++) {
          const date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
          days.push({
            date,
            isCurrentMonth: false,
            isToday: isSameDay(date, today)
          });
        }
      }
      
      return days;
    }, [currentMonth, showOutsideDays, firstDayOfWeek]);
    
    // Navigate months
    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };
    
    const goToNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    
    const goToToday = () => {
      const today = new Date();
      setCurrentMonth(today);
      setFocusedDate(today);
    };
    
    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDateClick(date);
        return;
      }
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        setFocusedDate(nextDate);
        // Update month if needed
        if (nextDate.getMonth() !== currentMonth.getMonth()) {
          setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
        }
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 1);
        setFocusedDate(prevDate);
        // Update month if needed
        if (prevDate.getMonth() !== currentMonth.getMonth()) {
          setCurrentMonth(new Date(prevDate.getFullYear(), prevDate.getMonth(), 1));
        }
        return;
      }
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 7);
        setFocusedDate(nextDate);
        // Update month if needed
        if (nextDate.getMonth() !== currentMonth.getMonth()) {
          setCurrentMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
        }
        return;
      }
      
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - 7);
        setFocusedDate(prevDate);
        // Update month if needed
        if (prevDate.getMonth() !== currentMonth.getMonth()) {
          setCurrentMonth(new Date(prevDate.getFullYear(), prevDate.getMonth(), 1));
        }
        return;
      }
      
      if (e.key === 'Home') {
        e.preventDefault();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        setFocusedDate(firstDay);
        return;
      }
      
      if (e.key === 'End') {
        e.preventDefault();
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        setFocusedDate(lastDay);
        return;
      }
      
      if (e.key === 'PageUp') {
        e.preventDefault();
        const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
        setFocusedDate(prevMonth);
        setCurrentMonth(new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1));
        return;
      }
      
      if (e.key === 'PageDown') {
        e.preventDefault();
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
        setFocusedDate(nextMonth);
        setCurrentMonth(new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1));
        return;
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
    };
    
    // Focus management
    useEffect(() => {
      if (focusedDate && open) {
        const dateKey = `${focusedDate.getFullYear()}-${focusedDate.getMonth()}-${focusedDate.getDate()}`;
        const button = dayButtonRefs.current.get(dateKey);
        if (button) {
          button.focus();
        }
      }
    }, [focusedDate, open]);
    
    // Day names
    const dayNames = useMemo(() => {
      const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (firstDayOfWeek === 1) {
        return [...names.slice(1), names[0]];
      }
      return names;
    }, [firstDayOfWeek]);
    
    // Month/year display
    const monthYearDisplay = currentMonth.toLocaleDateString(locale, {
      month: 'long',
      year: 'numeric'
    });
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <div className="space-y-2">
            {label && (
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {label}
              </label>
            )}
            <Popover.Trigger asChild>
              <button
                type="button"
                className={cn(
                  "flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background",
                  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 text-left",
                  error
                    ? "border-error-500 shadow-sm hover:border-error-600 focus-visible:ring-error-500/20 focus-visible:border-error-500"
                    : "border-border shadow-sm hover:border-border-medium focus-visible:ring-ring/20 focus-visible:border-primary",
                  "h-10",
                  inputClassName
                )}
                onClick={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                aria-label={label || "Open calendar"}
                aria-invalid={error}
              >
                {displayValue || <span className="text-muted-foreground">{placeholder || 'Select date...'}</span>}
              </button>
            </Popover.Trigger>
            {helperText && (
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  error && "text-error-600"
                )}
              >
                {helperText}
              </p>
            )}
          </div>
          
          <Popover.Portal>
            <Popover.Content
              className={cn(
                'z-50 w-auto rounded-lg border bg-popover p-4 shadow-lg',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
              )}
              sideOffset={5}
              align="start"
            >
              <div 
                ref={calendarRef}
                className={cn(calendarVariants({ variant, size }), calendarClassName)}
                role="application"
                aria-label="Calendar"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToPreviousMonth}
                      aria-label="Previous month"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </Button>
                    
                    <h3 className="text-sm font-semibold text-popover-foreground" data-testid="calendar-month-year">{monthYearDisplay}</h3>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextMonth}
                      aria-label="Next month"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={goToToday}
                    className="text-xs"
                  >
                    Today
                  </Button>
                </div>
                
                {/* Day names */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-medium text-muted-foreground"
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const isSelected =
                      mode === 'single'
                        ? isSameDay(day.date, calendarValue as Date | undefined)
                        : mode === 'range'
                        ? isDateInRange(
                            day.date,
                            (calendarValue as { from?: Date; to?: Date })?.from,
                            (calendarValue as { from?: Date; to?: Date })?.to
                          )
                        : (calendarValue as Date[])?.some(d => isSameDay(d, day.date));
                    
                    const isDisabled = isDateDisabled(
                      day.date,
                      minDate,
                      maxDate,
                      disabledDates,
                      disabledDays
                    );
                    
                    const isInRange = mode === 'range' && 
                      (calendarValue as { from?: Date; to?: Date })?.from &&
                      !(calendarValue as { from?: Date; to?: Date })?.to &&
                      day.date >= (calendarValue as { from?: Date; to?: Date }).from!;
                    
                    const dateKey = `${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`;
                    const isFocused = focusedDate && isSameDay(day.date, focusedDate);
                    
                    return (
                      <button
                        key={`${day.date.getTime()}-${index}`}
                        ref={(el) => {
                          if (el) {
                            dayButtonRefs.current.set(dateKey, el);
                          } else {
                            dayButtonRefs.current.delete(dateKey);
                          }
                        }}
                        type="button"
                        onClick={() => {
                          if (showOutsideDays && !day.isCurrentMonth) {
                            // Navigate to the month of the clicked date
                            setCurrentMonth(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
                            // Then select the date
                            setTimeout(() => handleDateClick(day.date), 0);
                          } else {
                            handleDateClick(day.date);
                          }
                        }}
                        onKeyDown={(e) => handleKeyDown(e, day.date)}
                        disabled={isDisabled || (showOutsideDays ? false : !day.isCurrentMonth)}
                        className={cn(
                          calendarDayVariants({
                            variant: isSelected
                              ? 'selected'
                              : isInRange
                              ? 'range'
                              : day.isToday
                              ? 'today'
                              : !day.isCurrentMonth
                              ? 'outside'
                              : isDisabled
                              ? 'disabled'
                              : 'default',
                            size
                          }),
                          !day.isCurrentMonth && 'opacity-50',
                          isFocused && 'ring-2 ring-brand-500 ring-offset-2 z-10'
                        )}
                        aria-label={day.date.toLocaleDateString(locale, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        aria-selected={isSelected}
                        aria-disabled={isDisabled}
                        tabIndex={isFocused ? 0 : -1}
                      >
                        {day.date.getDate()}
                      </button>
                    );
                  })}
                </div>
                
                {/* Footer for range mode */}
                {mode === 'range' && (calendarValue as { from?: Date; to?: Date })?.from && 
                 !(calendarValue as { from?: Date; to?: Date })?.to && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground text-center">
                      Select end date
                    </p>
                  </div>
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export { calendarVariants, calendarDayVariants };

