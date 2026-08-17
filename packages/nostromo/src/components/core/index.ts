// Core UI Components
export { Button, buttonVariants } from "./button";
export type { ButtonProps } from "./button";

export { Input } from "./input";
export type { InputProps } from "./input";

export { Checkbox, checkboxVariants } from "./checkbox";
export type { CheckboxProps } from "./checkbox";

export {
  RadioGroup,
  RadioItem,
  // RadioGroupItem is the name shadcn uses and the name every example here
  // already used - it just was not exported, so the docs threw a ReferenceError.
  RadioItem as RadioGroupItem,
  radioGroupVariants,
  radioItemVariants,
} from "./radio-group";
export type { RadioGroupProps, RadioItemProps } from "./radio-group";

export { Switch, switchVariants, switchThumbVariants } from "./switch";
export type { SwitchProps } from "./switch";

export { Textarea, textareaVariants } from "./textarea";
export type { TextareaProps } from "./textarea";

export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
  alertTitleVariants,
  alertDescriptionVariants,
  alertCloseVariants,
} from "./alert";
export type { AlertProps } from "./alert";

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
  breadcrumbSeparatorVariants,
} from "./breadcrumb";
export type { BreadcrumbProps, BreadcrumbEntry } from "./breadcrumb";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationVariants,
  paginationItemVariants,
} from "./pagination";
export type { PaginationProps } from "./pagination";

export { Separator, separatorVariants } from "./separator";
export type { SeparatorProps } from "./separator";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";

export { Badge, badgeVariants } from "./badge";
export type { BadgeProps } from "./badge";

export { Avatar, AvatarImage, AvatarFallback, avatarVariants } from "./avatar";
export type { AvatarProps } from "./avatar";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";
export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from "./dialog";

export { ErrorMessage, errorMessageVariants } from "./error-message";
export type { ErrorMessageProps } from "./error-message";

export { HelperText, helperTextVariants } from "./helper-text";
export type { HelperTextProps } from "./helper-text";

export { Label, labelVariants } from "./label";
export type { LabelProps } from "./label";

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
} from "./tabs";
export type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./tabs";

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  selectTriggerVariants,
  selectContentVariants,
  selectItemVariants,
} from "./select";
export type {
  SelectProps,
  SelectGroupProps,
  SelectValueProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectLabelProps,
  SelectItemProps,
  SelectSeparatorProps,
} from "./select";

export { Icon, iconNames } from "./icon";
export type { IconName, IconProps } from "./icon";

export {
  Progress,
  CircularProgress,
  progressVariants,
  progressBarVariants,
  progressLabelVariants,
} from "./progress";
export type { ProgressProps, CircularProgressProps } from "./progress";

export {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  tableVariants,
  tableHeaderVariants,
  tableCellVariants,
} from "./table";
export type {
  TableProps,
  TableColumn,
  TableHeaderProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
} from "./table";

export { DataTable } from "./data-table";
export type { DataTableProps, ColumnFilter, FilterType } from "./data-table";

export { Calendar, calendarVariants, calendarDayVariants } from "./calendar";
export type { CalendarProps, CalendarMode } from "./calendar";

export { Chart, chartContainerVariants } from "./charts";
export type { ChartProps, ChartType, ChartDataPoint } from "./charts";

// The composable form, alongside `Chart`. `Chart` renders one series type from a
// dataKeys array and cannot express a stacked bar, a bar and a line together, a
// second axis or a reference line - see chart-composable.tsx.
export {
  ChartContainer,
  ChartGrid,
  ChartXAxis,
  ChartYAxis,
  ChartTooltip,
  ChartLegend,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartReferenceLine,
  chartPalette,
  buildColorMap,
  resolveSeriesColor,
} from "./chart-composable";
export type {
  ChartContainerProps,
  ChartGridProps,
  ChartXAxisProps,
  ChartYAxisProps,
  ChartTooltipProps,
  ChartLegendProps,
  ChartBarProps,
  ChartLineProps,
  ChartAreaProps,
  ChartReferenceLineProps,
} from "./chart-composable";

// Lazy-loaded Chart component for better code splitting
export { LazyChart } from "./charts-lazy";
export type { LazyChartProps } from "./charts-lazy";

export {
  Toast,
  ToastProvider,
  useToast,
  useToastNotification,
  toastVariants,
  toastIconVariants,
} from "./toast";
export type { ToastProps, ToastContextType } from "./toast";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  tooltipVariants,
  arrowVariants,
} from "./tooltip";
export type {
  TooltipProps,
  TooltipContentProps,
  TooltipTriggerProps,
  TooltipProviderProps,
} from "./tooltip";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
  accordionItemVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  accordionChevronVariants,
} from "./accordion";
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./accordion";

export {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  skeletonVariants,
} from "./skeleton";
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonAvatarProps,
  SkeletonButtonProps,
  SkeletonCardProps,
} from "./skeleton";

// Error Handling
export { ErrorBoundary, useErrorHandler } from "./error-boundary";

// Performance & Lazy Loading
export {
  LazyComponent,
  withLazyLoading,
  useLazyLoading,
  LazyInView,
} from "../../lib/lazy";

export {
  usePerformanceMonitor,
  withPerformanceMonitoring,
  useMemoryMonitor,
  performanceUtils,
} from "../../lib/performance";

// Utilities
export { cn } from "../../lib/utils";

// Popover: @radix-ui/react-popover was already a dependency for Calendar, but was
// never exposed - a consumer wanting one had to add the package a second time.
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverClose,
  PopoverArrow,
  popoverContentVariants,
} from "./popover";
export type { PopoverContentProps } from "./popover";

// Collapsible: the single-region case Accordion does not cover.
export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";

// DropdownMenu: the menu that hangs off a button. Select edits a form value and
// has a selected state; this runs commands.
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "./dropdown-menu";
export type { DropdownMenuItemProps } from "./dropdown-menu";

// Sheet: a dialog anchored to an edge. On Radix's dialog rather than this
// package's own, see the note in sheet.tsx.
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
} from "./sheet";
export type { SheetContentProps, SheetTitleProps } from "./sheet";

// AlertDialog: a modal that interrupts to confirm something consequential. Not a
// Dialog variant - Radix enforces role="alertdialog" and refuses dismissal by
// outside click or Escape, which is the point of it.
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./alert-dialog";
export type { AlertDialogActionProps } from "./alert-dialog";

// Toggle and ToggleGroup: a button that stays pressed. Switch is the form
// control; this is a toolbar control and announces aria-pressed.
export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants } from "./toggle";
export type {
  ToggleProps,
  ToggleGroupProps,
  ToggleGroupItemProps,
} from "./toggle";

// AspectRatio: native CSS aspect-ratio, no dependency. See the note in the file.
export { AspectRatio } from "./aspect-ratio";
export type { AspectRatioProps } from "./aspect-ratio";

// ContextMenu: the right-click menu. A separate primitive from DropdownMenu, but
// the same menu to look at - shared styling lives in menu-styles.ts.
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "./context-menu";
export type { ContextMenuItemProps } from "./context-menu";

// HoverCard: a preview on hover. Supplementary by nature - see the note in the
// file about why its content must exist elsewhere too.
export { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";

// ScrollArea: consistent scrollbars, native scrolling kept intact.
export { ScrollArea, ScrollBar } from "./scroll-area";
export type { ScrollAreaProps } from "./scroll-area";

// Slider: one thumb per value, so a range slider is the same component with two
// numbers rather than a second one.
export { Slider, sliderTrackVariants, sliderThumbVariants } from "./slider";
export type { SliderProps } from "./slider";

// Menubar: the application menu bar. Its own primitive rather than a row of
// dropdowns, because it behaves as one control. Third reader of menu-styles.
export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./menubar";
export type { MenubarItemProps } from "./menubar";

// NavigationMenu: site navigation with panels. A nav full of links, not a menu -
// see the note in the file about why that distinction matters.
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  NavigationMenuIndicator,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

// Carousel: slides that snap. `orientation` is the only axis control, and
// anything past next/previous goes through `setApi` - see the file.
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
} from "./carousel";
export type {
  CarouselApi,
  CarouselOptions,
  CarouselPlugin,
  CarouselProps,
  CarouselButtonProps,
} from "./carousel";

// InputOTP: one real input behind boxes that only look like separate fields.
// That is what keeps paste, autofill and mobile keyboards working.
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp";
export type { InputOTPProps, InputOTPSlotProps } from "./input-otp";

// Resizable: draggable panels. Note that the group sizes itself with inline
// styles, so a height class on it is a no-op - the file explains what to do.
export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./resizable";
export type { ResizableHandleProps } from "./resizable";
