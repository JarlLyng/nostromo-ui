// Core UI Components
export { Button, buttonVariants } from './button';
export type { ButtonProps } from './button';

export { Input } from './input';
export type { InputProps } from './input';

export { Checkbox, checkboxVariants } from './checkbox';
export type { CheckboxProps } from './checkbox';

export { RadioGroup, RadioItem, radioGroupVariants, radioItemVariants } from './radio-group';
export type { RadioGroupProps, RadioItemProps } from './radio-group';

export { Switch, switchVariants, switchThumbVariants } from './switch';
export type { SwitchProps } from './switch';

export { Textarea, textareaVariants } from './textarea';
export type { TextareaProps } from './textarea';

export { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  alertVariants, 
  alertTitleVariants, 
  alertDescriptionVariants,
  alertCloseVariants 
} from './alert';
export type { AlertProps } from './alert';

export { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem,
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator, 
  BreadcrumbEllipsis,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants
} from './breadcrumb';
export type { BreadcrumbProps, BreadcrumbEntry } from './breadcrumb';

export { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
  paginationItemVariants
} from './pagination';
export type { PaginationProps } from './pagination';

export { Separator, separatorVariants } from './separator';
export type { SeparatorProps } from './separator';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';

export { Badge, badgeVariants } from './badge';
export type { BadgeProps } from './badge';

export { Avatar, AvatarImage, AvatarFallback, avatarVariants } from './avatar';
export type { AvatarProps } from './avatar';

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
export type { DialogProps, DialogContentProps, DialogHeaderProps, DialogTitleProps, DialogDescriptionProps } from './dialog';

export { ErrorMessage, errorMessageVariants } from './error-message';
export type { ErrorMessageProps } from './error-message';

export { HelperText, helperTextVariants } from './helper-text';
export type { HelperTextProps } from './helper-text';

export { Label, labelVariants } from './label';
export type { LabelProps } from './label';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants } from './tabs';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './tabs';

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, selectTriggerVariants, selectContentVariants, selectItemVariants } from './select';
export type { SelectProps, SelectGroupProps, SelectValueProps, SelectTriggerProps, SelectContentProps, SelectLabelProps, SelectItemProps, SelectSeparatorProps } from './select';

export { Icon, iconNames } from './icon';
export type { IconName, IconProps } from './icon';

export { Progress, CircularProgress, progressVariants, progressBarVariants, progressLabelVariants } from './progress';
export type { ProgressProps, CircularProgressProps } from './progress';

export { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, tableVariants, tableHeaderVariants, tableCellVariants } from './table';
export type { TableProps, TableColumn, TableHeaderProps, TableBodyProps, TableRowProps, TableCellProps } from './table';

export { DataTable } from './data-table';
export type { DataTableProps, ColumnFilter, FilterType } from './data-table';

export { Calendar, calendarVariants, calendarDayVariants } from './calendar';
export type { CalendarProps, CalendarMode } from './calendar';

export { Chart, chartContainerVariants } from './charts';
export type { ChartProps, ChartType, ChartDataPoint } from './charts';

// Lazy-loaded Chart component for better code splitting
export { LazyChart } from './charts-lazy';
export type { LazyChartProps } from './charts-lazy';

export { Toast, ToastProvider, useToastNotification, toastVariants, toastIconVariants } from './toast';
export type { ToastProps, ToastContextType } from './toast';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipVariants, arrowVariants } from './tooltip';
export type { TooltipProps, TooltipContentProps, TooltipTriggerProps, TooltipProviderProps } from './tooltip';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants, accordionItemVariants, accordionTriggerVariants, accordionContentVariants, accordionChevronVariants } from './accordion';
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './accordion';

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonList, skeletonVariants } from './skeleton';
export type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps, SkeletonButtonProps, SkeletonCardProps } from './skeleton';

// Error Handling
export { ErrorBoundary, useErrorHandler } from './error-boundary';

// Performance & Lazy Loading
export { 
  LazyComponent, 
  withLazyLoading, 
  useLazyLoading, 
  LazyInView 
} from '../../lib/lazy';

export { 
  usePerformanceMonitor, 
  withPerformanceMonitoring, 
  useBundleSize, 
  useMemoryMonitor, 
  performanceUtils 
} from '../../lib/performance';

// Utilities
export { cn } from '../../lib/utils';
