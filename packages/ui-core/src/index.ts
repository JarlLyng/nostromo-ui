// Core UI Components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

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
