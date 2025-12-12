# Contrast Audit Report

Generated: 2025-12-12T20:16:35.715Z

## Summary

- Files scanned: 7
- Files with hardcoded colors: 4
- Files with potential color combinations: 4

## Files with Hardcoded Colors

### /Users/jarl.l/Documents/Github/nostromo-ui/packages/ui-core/src/components/dialog.tsx
- Hardcoded colors: bg-black
- Count: 1

### /Users/jarl.l/Documents/Github/nostromo-ui/packages/ui-core/src/components/skeleton.tsx
- Hardcoded colors: dark:
- Count: 1

### /Users/jarl.l/Documents/Github/nostromo-ui/packages/ui-core/src/components/tooltip.tsx
- Hardcoded colors: dark:
- Count: 1

### /Users/jarl.l/Documents/Github/nostromo-ui/packages/ui-marketing/src/components/gallery.tsx
- Hardcoded colors: text-white, bg-black
- Count: 2

## Recommendations

1. Replace hardcoded colors with semantic tokens:
   - `text-neutral-900` → `text-foreground`
   - `bg-white` → `bg-background` or `bg-card`
   - `text-neutral-600` → `text-muted-foreground`
   - `bg-neutral-50` → `bg-muted`
   - `border-neutral-200` → `border-border`

2. Remove all `dark:` prefixes - use CSS variables instead

3. Validate all color combinations meet WCAG AA (4.5:1 for normal text, 3:1 for large text)

