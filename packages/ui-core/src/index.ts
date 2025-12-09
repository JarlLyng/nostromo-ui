// Core UI Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { Checkbox, checkboxVariants } from './components/checkbox';
export type { CheckboxProps } from './components/checkbox';

export { RadioGroup, RadioItem, radioGroupVariants, radioItemVariants } from './components/radio-group';
export type { RadioGroupProps, RadioItemProps } from './components/radio-group';

export { Switch, switchVariants, switchThumbVariants } from './components/switch';
export type { SwitchProps } from './components/switch';

export { Textarea, textareaVariants } from './components/textarea';
export type { TextareaProps } from './components/textarea';

export { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  alertVariants, 
  alertTitleVariants, 
  alertDescriptionVariants,
  alertCloseVariants 
} from './components/alert';
export type { AlertProps } from './components/alert';

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
} from './components/breadcrumb';
export type { BreadcrumbProps, BreadcrumbEntry } from './components/breadcrumb';

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
} from './components/pagination';
export type { PaginationProps } from './components/pagination';

export { Separator, separatorVariants } from './components/separator';
export type { SeparatorProps } from './components/separator';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/card';

export { Badge, badgeVariants } from './components/badge';
export type { BadgeProps } from './components/badge';

export { Avatar, AvatarImage, AvatarFallback, avatarVariants } from './components/avatar';
export type { AvatarProps } from './components/avatar';

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/dialog';
export type { DialogProps, DialogContentProps, DialogHeaderProps, DialogTitleProps, DialogDescriptionProps } from './components/dialog';

export { ErrorMessage, errorMessageVariants } from './components/error-message';
export type { ErrorMessageProps } from './components/error-message';

export { HelperText, helperTextVariants } from './components/helper-text';
export type { HelperTextProps } from './components/helper-text';

export { Label, labelVariants } from './components/label';
export type { LabelProps } from './components/label';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants } from './components/tabs';
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from './components/tabs';

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, selectTriggerVariants, selectContentVariants, selectItemVariants } from './components/select';
export type { SelectProps, SelectGroupProps, SelectValueProps, SelectTriggerProps, SelectContentProps, SelectLabelProps, SelectItemProps, SelectSeparatorProps } from './components/select';

export { Icon, iconNames } from './components/icon';
export type { IconName, IconProps } from './components/icon';

export { Progress, CircularProgress, progressVariants, progressBarVariants, progressLabelVariants } from './components/progress';
export type { ProgressProps, CircularProgressProps } from './components/progress';

export { Table, TableHeader, TableBody, TableRow, TableCell, TableHead, tableVariants, tableHeaderVariants, tableCellVariants } from './components/table';
export type { TableProps, TableColumn, TableHeaderProps, TableBodyProps, TableRowProps, TableCellProps } from './components/table';

export { DataTable } from './components/data-table';
export type { DataTableProps, ColumnFilter, FilterType } from './components/data-table';

export { Toast, ToastProvider, useToastNotification, toastVariants, toastIconVariants } from './components/toast';
export type { ToastProps, ToastContextType } from './components/toast';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipVariants, arrowVariants } from './components/tooltip';
export type { TooltipProps, TooltipContentProps, TooltipTriggerProps, TooltipProviderProps } from './components/tooltip';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, accordionVariants, accordionItemVariants, accordionTriggerVariants, accordionContentVariants, accordionChevronVariants } from './components/accordion';
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps } from './components/accordion';

export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable, SkeletonList, skeletonVariants } from './components/skeleton';
export type { SkeletonProps, SkeletonTextProps, SkeletonAvatarProps, SkeletonButtonProps, SkeletonCardProps } from './components/skeleton';

// Error Handling
export { ErrorBoundary, useErrorHandler } from './components/error-boundary';

// Performance & Lazy Loading
export { 
  LazyComponent, 
  withLazyLoading, 
  useLazyLoading, 
  LazyInView 
} from './lib/lazy';

export { 
  usePerformanceMonitor, 
  withPerformanceMonitoring, 
  useBundleSize, 
  useMemoryMonitor, 
  performanceUtils 
} from './lib/performance';

// Utilities
export { cn } from './lib/utils';
