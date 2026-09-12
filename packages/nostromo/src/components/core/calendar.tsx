import React, { useState, useMemo, useRef, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import {
  getDaysInMonth as dateFnsGetDaysInMonth,
  startOfMonth,
  getDay,
  isSameDay as dateFnsIsSameDay,
  isWithinInterval,
  isBefore,
  isAfter,
  startOfDay,
  endOfDay,
} from "date-fns";
import { cn } from "../../lib/utils";
import { Button } from "./button";

// Calendar variants
const calendarVariants = cva(
  "inline-block rounded-lg border bg-background shadow-lg",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        outline: "border-2 border-border",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const calendarDayVariants = cva(
  "flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:bg-muted text-foreground",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold",
        range: "bg-primary/10 text-primary hover:bg-primary/20 font-medium",
        today: "border-2 border-primary text-foreground font-semibold",
        outside: "text-muted-foreground",
        disabled: "text-muted-foreground/50 cursor-not-allowed",
      },
      size: {
        sm: "h-7 w-7 text-xs",
        md: "h-9 w-9 text-sm",
        lg: "h-11 w-11 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type CalendarMode = "single" | "range" | "multiple";

export interface CalendarProps extends VariantProps<typeof calendarVariants> {
  mode?: CalendarMode;
  value?: Date | Date[] | { from?: Date; to?: Date };
  defaultValue?: Date | Date[] | { from?: Date; to?: Date };
  onChange?: (
    value: Date | Date[] | { from?: Date; to?: Date } | undefined,
  ) => void;
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
  /** Overrides for the calendar's own words. See {@link CalendarLabels}. */
  labels?: CalendarLabels;
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

const isSameDay = (
  date1: Date | undefined,
  date2: Date | undefined,
): boolean => {
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
  disabledDays?: number[],
): boolean => {
  if (minDate && isBefore(startOfDay(date), startOfDay(minDate))) return true;
  if (maxDate && isAfter(startOfDay(date), endOfDay(maxDate))) return true;
  if (disabledDates?.some((d) => isSameDay(d, date))) return true;
  if (disabledDays?.includes(getDay(date))) return true;
  return false;
};

/**
 * Formats through Intl, which every browser and Node already carries a full set
 * of locales for.
 *
 * This used to be `dateFnsFormat(date, "MMM d, yyyy")` with the locale accepted
 * and ignored, so `locale="da-DK"` produced "Sep 14, 2026" next to a Danish month
 * heading. date-fns needs a locale *object* imported per language, which would
 * mean either bundling all of them or asking the caller to pass one; Intl needs
 * neither.
 */
const formatDate = (
  date: Date | undefined,
  locale: string = "en-US",
): string => {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatDateRange = (
  from?: Date,
  to?: Date,
  locale: string = "en-US",
): string => {
  if (!from && !to) return "";
  if (from && to) {
    return `${formatDate(from, locale)} - ${formatDate(to, locale)}`;
  }
  if (from) return formatDate(from, locale);
  if (to) return formatDate(to, locale);
  return "";
};

const formatMultipleDates = (
  dates: Date[],
  locale: string = "en-US",
  multipleSelected: (count: number) => string = (count) =>
    `${count} dates selected`,
): string => {
  if (dates.length === 0) return "";
  if (dates.length === 1) return formatDate(dates[0], locale);
  return multipleSelected(dates.length);
};

/**
 * Weekday headings in the calendar's own language.
 *
 * They were the hardcoded strings Sun..Sat. 2024-01-07 is a Sunday, so seven days
 * from it is one full week in a known order, and Intl names them.
 */
const getDayNames = (locale: string, firstDayOfWeek: 0 | 1): string[] => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  const sundayFirst = Array.from({ length: 7 }, (_, index) =>
    formatter.format(new Date(2024, 0, 7 + index)),
  );
  return firstDayOfWeek === 1
    ? [...sundayFirst.slice(1), sundayFirst[0]!]
    : sundayFirst;
};

/**
 * Every string the calendar says on its own behalf.
 *
 * `locale` moves the dates; it cannot translate "Today". Without somewhere to put
 * these, a Danish calendar had Danish months and English buttons.
 */
export interface CalendarLabels {
  /** Accessible name of the trigger. Defaults to "Open calendar". */
  openCalendar?: string;
  /** Shown on the trigger when nothing is selected. The `placeholder` prop wins. */
  placeholder?: string;
  previousMonth?: string;
  nextMonth?: string;
  today?: string;
  /** Shown in range mode between picking the start and the end. */
  selectEndDate?: string;
  /** Trigger text for more than one date in multiple mode. */
  multipleSelected?: (count: number) => string;
}

const DEFAULT_LABELS: Required<CalendarLabels> = {
  openCalendar: "Open calendar",
  placeholder: "Select date...",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  today: "Today",
  selectEndDate: "Select end date",
  multipleSelected: (count) => `${count} dates selected`,
};

/** The date a selection is anchored on, whatever shape the selection has. */
const anchorDate = (
  value: Date | Date[] | { from?: Date; to?: Date } | undefined,
): Date | undefined => {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (Array.isArray(value)) return value[0];
  return value.from ?? value.to;
};

/**
 * Walks from `start` in `step`-day increments until it finds a date that is not
 * disabled.
 *
 * Roving focus used to move one day and stop there whether or not that day could
 * be focused. A disabled day is a disabled button, and a disabled button cannot
 * take focus - but it was still the only cell with `tabIndex=0`, so a calendar
 * with Tuesdays disabled had zero reachable dates and ArrowRight could not get
 * past Monday.
 *
 * `limit` is what stops this searching forever when every date is disabled, which
 * `disabledDays={[0,1,2,3,4,5,6]}` or an empty min/max window can produce. On
 * giving up it returns undefined and the caller leaves focus where it was.
 */
const findEnabledDate = (
  start: Date,
  step: number,
  isDisabled: (date: Date) => boolean,
  limit = 366,
): Date | undefined => {
  const candidate = new Date(start);
  for (let i = 0; i < limit; i++) {
    if (!isDisabled(candidate)) return new Date(candidate);
    candidate.setDate(candidate.getDate() + step);
  }
  return undefined;
};

/** Same day number in another month, clamped to that month's length. */
const shiftMonth = (date: Date, months: number): Date => {
  const target = new Date(date.getFullYear(), date.getMonth() + months, 1);
  const lastDay = dateFnsGetDaysInMonth(target);
  target.setDate(Math.min(date.getDate(), lastDay));
  return target;
};

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      mode = "single",
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disabledDates,
      disabledDays,
      locale = "en-US",
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
      labels: labelOverrides,
      ...props
    },
    ref,
  ) => {
    const labels = useMemo(
      () => ({ ...DEFAULT_LABELS, ...labelOverrides }),
      [labelOverrides],
    );

    const [open, setOpen] = useState(false);
    // Opening a calendar that already has a value used to land on the current
    // month: `value={new Date(2020, 0, 15)}` opened September 2026 and left the
    // reader to page back eighty months.
    const [currentMonth, setCurrentMonth] = useState(
      () => anchorDate(value ?? defaultValue) ?? new Date(),
    );
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const dayButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

    // Controlled vs uncontrolled
    const [internalValue, setInternalValue] = useState<
      Date | Date[] | { from?: Date; to?: Date } | undefined
    >(defaultValue);

    const isControlled = value !== undefined;
    const calendarValue = isControlled ? value : internalValue;

    const isDisabledDate = React.useCallback(
      (date: Date) =>
        isDateDisabled(date, minDate, maxDate, disabledDates, disabledDays),
      [minDate, maxDate, disabledDates, disabledDays],
    );

    /**
     * Where focus starts when the calendar opens.
     *
     * It used to be today, unconditionally. That is the wrong date twice over: it
     * ignores a selection the reader already made, and today may be disabled - in
     * which case the only cell with `tabIndex=0` was a disabled button, so the
     * grid had no tab stop at all.
     *
     * The order is: the selected date, then today, then the first enabled day of
     * the month on screen. If nothing in reach is enabled, focus stays unset and
     * the grid simply has no tab stop, which is the truth.
     */
    React.useLayoutEffect(() => {
      if (!open || focusedDate) return;

      const today = startOfDay(new Date());
      const selected = anchorDate(calendarValue);
      const preferred = [selected, today].find(
        (date): date is Date => !!date && !isDisabledDate(date),
      );
      if (preferred) {
        setFocusedDate(startOfDay(preferred));
        return;
      }

      const monthStart = startOfMonth(currentMonth);
      const firstEnabled = findEnabledDate(
        monthStart,
        1,
        isDisabledDate,
        dateFnsGetDaysInMonth(currentMonth),
      );
      if (firstEnabled) setFocusedDate(firstEnabled);
    }, [open, focusedDate, calendarValue, currentMonth, isDisabledDate]);

    // Handle value changes
    const handleValueChange = (
      newValue: Date | Date[] | { from?: Date; to?: Date } | undefined,
    ) => {
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

      if (mode === "single") {
        handleValueChange(date);
        setOpen(false);
      } else if (mode === "range") {
        const rangeValue = calendarValue as
          { from?: Date; to?: Date } | undefined;
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
      } else if (mode === "multiple") {
        const multipleValue = (calendarValue as Date[]) || [];
        const dateIndex = multipleValue.findIndex((d) => isSameDay(d, date));
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
      if (!calendarValue) return "";

      if (mode === "single") {
        return formatDate(calendarValue as Date, locale);
      } else if (mode === "range") {
        const range = calendarValue as { from?: Date; to?: Date };
        return formatDateRange(range.from, range.to, locale);
      } else {
        return formatMultipleDates(
          calendarValue as Date[],
          locale,
          labels.multipleSelected,
        );
      }
    }, [calendarValue, mode, locale, labels.multipleSelected]);

    // Generate calendar days
    const calendarDays = useMemo(() => {
      const days: Array<{
        date: Date;
        isCurrentMonth: boolean;
        isToday: boolean;
        /** A spacer that holds a column open without showing a date. */
        placeholder?: boolean;
      }> = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const firstDay = getFirstDayOfMonth(currentMonth, firstDayOfWeek);
      const daysInMonth = getDaysInMonth(currentMonth);

      // Previous month days.
      //
      // The leading cells exist whether or not the dates in them are shown: they
      // are what puts the first of the month under the right weekday. Only adding
      // them when `showOutsideDays` was on meant a September starting on a
      // Tuesday rendered its 1st in the Monday column, with every date of the
      // month one heading out for the rest of the grid.
      //
      // With outside days hidden they become empty, non-interactive placeholders
      // instead - see the `placeholder` flag below.
      if (firstDay > 0) {
        const prevMonth = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() - 1,
        );
        const daysInPrevMonth = getDaysInMonth(prevMonth);
        for (
          let i = daysInPrevMonth - firstDay + 1;
          i <= daysInPrevMonth;
          i++
        ) {
          const date = new Date(
            prevMonth.getFullYear(),
            prevMonth.getMonth(),
            i,
          );
          days.push({
            date,
            isCurrentMonth: false,
            isToday: isSameDay(date, today),
            placeholder: !showOutsideDays,
          });
        }
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          i,
        );
        days.push({
          date,
          isCurrentMonth: true,
          isToday: isSameDay(date, today),
        });
      }

      // Next month days
      if (showOutsideDays) {
        const remainingDays = 42 - days.length; // 6 weeks * 7 days
        const nextMonth = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
        );
        for (let i = 1; i <= remainingDays; i++) {
          const date = new Date(
            nextMonth.getFullYear(),
            nextMonth.getMonth(),
            i,
          );
          days.push({
            date,
            isCurrentMonth: false,
            isToday: isSameDay(date, today),
          });
        }
      }

      return days;
    }, [currentMonth, showOutsideDays, firstDayOfWeek]);

    // Navigate months
    /**
     * Moves the grid, and brings focus with it.
     *
     * The header buttons only moved the month. Focus stayed on a date that was no
     * longer rendered, so the grid lost its tab stop and an arrow key jumped back
     * to the month you had just left.
     */
    const goToMonth = (months: number) => {
      const target = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + months,
        1,
      );
      setCurrentMonth(target);

      if (!focusedDate) return;
      const sameDayNextMonth = shiftMonth(focusedDate, months);
      const landing =
        findEnabledDate(
          sameDayNextMonth,
          1,
          isDisabledDate,
          dateFnsGetDaysInMonth(target),
        ) ??
        findEnabledDate(
          sameDayNextMonth,
          -1,
          isDisabledDate,
          dateFnsGetDaysInMonth(target),
        );
      if (landing) setFocusedDate(landing);
    };

    const goToPreviousMonth = () => goToMonth(-1);
    const goToNextMonth = () => goToMonth(1);

    const goToToday = () => {
      const today = startOfDay(new Date());
      setCurrentMonth(today);
      // Today can be disabled, in which case focus goes to the nearest day of
      // that month that is not.
      const landing =
        findEnabledDate(today, 1, isDisabledDate, 31) ??
        findEnabledDate(today, -1, isDisabledDate, 31);
      if (landing) setFocusedDate(landing);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent, date: Date) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDateClick(date);
        return;
      }

      /**
       * Every movement lands on a date that can actually take focus.
       *
       * Each key used to step once and stop, disabled or not. The resulting cell
       * got the grid's only `tabIndex=0` while being a disabled button, so
       * ArrowRight into a disabled Tuesday left the grid with no tab stop and no
       * way forward - pressing it again did the same thing from the same place.
       */
      const moveFocus = (
        candidate: Date,
        step: number,
        limit?: number,
      ): void => {
        const target = findEnabledDate(candidate, step, isDisabledDate, limit);
        // Nothing enabled in that direction: stay where we are rather than
        // moving focus onto something that cannot hold it.
        if (!target) return;

        setFocusedDate(target);
        if (
          target.getMonth() !== currentMonth.getMonth() ||
          target.getFullYear() !== currentMonth.getFullYear()
        ) {
          setCurrentMonth(new Date(target.getFullYear(), target.getMonth(), 1));
        }
      };

      const step = (days: number) => {
        const candidate = new Date(date);
        candidate.setDate(candidate.getDate() + days);
        moveFocus(candidate, days > 0 ? 1 : -1);
      };

      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        step(7);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        step(-7);
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        // Forwards from the 1st: the first day of the month that is enabled.
        moveFocus(
          new Date(date.getFullYear(), date.getMonth(), 1),
          1,
          dateFnsGetDaysInMonth(date),
        );
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        moveFocus(
          new Date(date.getFullYear(), date.getMonth() + 1, 0),
          -1,
          dateFnsGetDaysInMonth(date),
        );
        return;
      }

      if (e.key === "PageUp") {
        e.preventDefault();
        // `new Date(y, m - 1, 31)` from 31 March is 3 March, so a month-step from
        // the end of a long month used to skip the short month entirely.
        moveFocus(shiftMonth(date, -1), -1);
        return;
      }

      if (e.key === "PageDown") {
        e.preventDefault();
        moveFocus(shiftMonth(date, 1), 1);
        return;
      }

      if (e.key === "Escape") {
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
    const dayNames = useMemo(
      () => getDayNames(locale, firstDayOfWeek),
      [locale, firstDayOfWeek],
    );

    // Month/year display
    const monthYearDisplay = currentMonth.toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
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
                    : "border-border shadow-sm hover:border-primary focus-visible:ring-ring/20 focus-visible:border-primary",
                  "h-10",
                  inputClassName,
                )}
                // No onFocus handler here. Radix returns focus to the trigger
                // when the popover closes, so opening on focus meant selecting a
                // date closed it and immediately reopened it - the flicker. It
                // also popped the calendar open when tabbing past the field.
                onClick={() => setOpen(true)}
                aria-label={label || labels.openCalendar}
                aria-invalid={error}
              >
                {displayValue || (
                  <span className="text-muted-foreground">
                    {placeholder ?? labels.placeholder}
                  </span>
                )}
              </button>
            </Popover.Trigger>
            {helperText && (
              <p
                className={cn(
                  "text-sm text-muted-foreground",
                  error && "text-error-600",
                )}
              >
                {helperText}
              </p>
            )}
          </div>

          <Popover.Portal>
            <Popover.Content
              className={cn(
                "z-50 w-auto rounded-lg border bg-popover p-4 shadow-lg",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
                "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              )}
              sideOffset={5}
              align="start"
            >
              <div
                ref={calendarRef}
                className={cn(
                  calendarVariants({ variant, size }),
                  calendarClassName,
                )}
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
                      aria-label={labels.previousMonth}
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

                    <h3
                      className="text-sm font-semibold text-popover-foreground"
                      data-testid="calendar-month-year"
                    >
                      {monthYearDisplay}
                    </h3>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={goToNextMonth}
                      aria-label={labels.nextMonth}
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
                    {labels.today}
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
                      mode === "single"
                        ? isSameDay(day.date, calendarValue as Date | undefined)
                        : mode === "range"
                          ? isDateInRange(
                              day.date,
                              (calendarValue as { from?: Date; to?: Date })
                                ?.from,
                              (calendarValue as { from?: Date; to?: Date })?.to,
                            )
                          : (calendarValue as Date[])?.some((d) =>
                              isSameDay(d, day.date),
                            );

                    const isDisabled = isDateDisabled(
                      day.date,
                      minDate,
                      maxDate,
                      disabledDates,
                      disabledDays,
                    );

                    const isInRange =
                      mode === "range" &&
                      (calendarValue as { from?: Date; to?: Date })?.from &&
                      !(calendarValue as { from?: Date; to?: Date })?.to &&
                      day.date >=
                        (calendarValue as { from?: Date; to?: Date }).from!;

                    const dateKey = `${day.date.getFullYear()}-${day.date.getMonth()}-${day.date.getDate()}`;
                    const isFocused =
                      focusedDate && isSameDay(day.date, focusedDate);

                    // A leading spacer: it holds the column open so the first
                    // of the month lands under the right weekday, and it is not
                    // a control, so it is out of the tab order and out of the
                    // accessibility tree.
                    if (day.placeholder) {
                      return (
                        <div
                          key={`placeholder-${index}`}
                          aria-hidden="true"
                          data-calendar-placeholder=""
                          className={cn(
                            calendarDayVariants({ variant: "default", size }),
                            "invisible",
                          )}
                        />
                      );
                    }

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
                            setCurrentMonth(
                              new Date(
                                day.date.getFullYear(),
                                day.date.getMonth(),
                                1,
                              ),
                            );
                            // Synchronously: React batches both updates into one
                            // render. Deferring the selection by a tick showed the
                            // new month first and selected a frame later, which
                            // read as a flash.
                            handleDateClick(day.date);
                          } else {
                            handleDateClick(day.date);
                          }
                        }}
                        onKeyDown={(e) => handleKeyDown(e, day.date)}
                        disabled={
                          isDisabled ||
                          (showOutsideDays ? false : !day.isCurrentMonth)
                        }
                        className={cn(
                          calendarDayVariants({
                            variant: isSelected
                              ? "selected"
                              : isInRange
                                ? "range"
                                : day.isToday
                                  ? "today"
                                  : !day.isCurrentMonth
                                    ? "outside"
                                    : isDisabled
                                      ? "disabled"
                                      : "default",
                            size,
                          }),
                          !day.isCurrentMonth && "opacity-50",
                          isFocused &&
                            "ring-2 ring-brand-500 ring-offset-2 z-10",
                        )}
                        aria-label={day.date.toLocaleDateString(locale, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
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
                {mode === "range" &&
                  (calendarValue as { from?: Date; to?: Date })?.from &&
                  !(calendarValue as { from?: Date; to?: Date })?.to && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        {labels.selectEndDate}
                      </p>
                    </div>
                  )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";

export { calendarVariants, calendarDayVariants };
