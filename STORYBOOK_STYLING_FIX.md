# Storybook Styling Fix - Explanation

## Problem
Tailwind CSS v4 with Vite plugin in Storybook was not generating all utility classes correctly, especially:
- Brand colors (e.g., `bg-brand-500`)
- Error/success colors
- Focus states
- Spacing utilities
- Checked states

## Solution: Explicit CSS Rules

We added explicit CSS rules in `packages/ui-core/.storybook/preview.css` as a **workaround** to ensure all styling works in Storybook.

### What We Did

1. **Added explicit color classes** for brand, error, success, and neutral colors
2. **Added focus states** with ring colors and borders
3. **Added spacing utilities** (space-y, space-x, padding, margin, gap)
4. **Added checked states** for checkboxes
5. **Added shadow utilities**

### Why This Was Needed

Tailwind CSS v4 with the Vite plugin uses a different compilation strategy than v3. The JIT (Just-In-Time) compiler may not always generate all classes, especially:
- Custom color classes from presets
- Complex selectors like `data-[state=checked]`
- Focus-visible states with opacity modifiers
- Spacing utilities in certain contexts

### Current Status

✅ **Working**: All component styling now displays correctly in Storybook
⚠️ **Workaround**: This is a temporary solution until Tailwind CSS v4 stabilizes its Storybook integration

### Future Improvements

1. **Monitor Tailwind CSS v4 updates** - As the Vite plugin matures, we may be able to remove some workarounds
2. **Consider PostCSS configuration** - We might be able to configure PostCSS to generate all classes
3. **Safelist approach** - Add more classes to `tailwind.config.js` safelist instead of explicit CSS

### Files Modified

- `packages/ui-core/.storybook/preview.css` - Added ~200 lines of explicit CSS rules
- `packages/ui-core/.storybook/main.ts` - Configured Vite plugin for Tailwind v4
- `packages/ui-core/tailwind.config.js` - Added safelist for critical classes

### Testing

To verify everything works:
1. Run `pnpm storybook` in `packages/ui-core`
2. Check `Debug/ConfigTest` story - should show lime-green outline and purple backgrounds
3. Check all component stories - buttons, inputs, checkboxes should have correct styling
4. Test focus states - tab through inputs and checkboxes

