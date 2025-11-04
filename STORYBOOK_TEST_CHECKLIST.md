# Storybook Test Checklist

## ✅ Quick Verification Checklist

### 1. Config Test Story (`Debug/ConfigTest → ConfigLoaded`)
- [ ] **Lime-green outline** visible on "Config Test" section (indicates Tailwind config is loaded)
- [ ] **Purple background** on "Brand Color Test" section (indicates preset and brand colors work)
- [ ] **Purple background** on "CSS Variable Test" section (indicates CSS variables work)

### 2. Button Component (`Components/Button`)
- [ ] **Default button** has purple background (`bg-brand-500`)
- [ ] **Secondary button** has gray background (`bg-neutral-100`)
- [ ] **Outline button** has transparent background with border
- [ ] **Ghost button** has transparent background
- [ ] **Destructive button** has red background (`bg-error-500`)
- [ ] **Hover states** work (hover over buttons to see color changes)
- [ ] **Shadows** are visible (especially on default and destructive buttons)
- [ ] **Focus states** work (tab through buttons to see focus rings)

### 3. Input Component (`Components/Input`)
- [ ] **Default input** has correct border and background
- [ ] **Error state** shows red border (`border-error-500`)
- [ ] **Success state** shows green border (`border-success-500`)
- [ ] **Focus states** show purple ring (`focus-visible:ring-brand-500/20`)
- [ ] **Hover states** work (border color changes on hover)
- [ ] **Helper text** appears below inputs with correct colors
- [ ] **Spacing** is correct between label, input, and helper text

### 4. Checkbox Component (`Components/Checkbox`)
- [ ] **Unchecked state** shows gray border
- [ ] **Checked state** shows purple background (`bg-brand-500`) when checked
- [ ] **Error variant** shows red border and red background when checked
- [ ] **Success variant** shows green border and green background when checked
- [ ] **Focus states** show purple ring (`focus-visible:ring-brand-500`)
- [ ] **Spacing** is correct between checkbox and label (`space-x-3`)
- [ ] **Helper text** appears below with correct colors

### 5. Spacing & Layout
- [ ] **Vertical spacing** (`space-y-2`, `space-y-4`) works correctly
- [ ] **Horizontal spacing** (`space-x-3`) works correctly
- [ ] **Padding** (`p-2`, `p-3`, `p-4`) works correctly
- [ ] **Gap** (`gap-2`, `gap-3`) works correctly in flex/grid layouts
- [ ] **Margins** work correctly where used

### 6. Other Components (if available)
- [ ] **Card** components have correct styling
- [ ] **Badge** components have correct colors
- [ ] **Alert** components have correct colors
- [ ] **Dialog** components have correct styling
- [ ] **Select** components have correct styling

## 🔍 Detailed Testing

### Test Focus States
1. Tab through all interactive elements
2. Verify focus rings appear (purple for brand, red for error, green for success)
3. Check that focus rings have correct opacity (20% for inputs, solid for checkboxes)

### Test Hover States
1. Hover over all buttons
2. Verify background colors change correctly
3. Check that shadows change on hover (e.g., `shadow-md` → `shadow-lg`)

### Test Color Variants
1. **Brand colors**: Check all purple shades (50-950) if used
2. **Error colors**: Check all red shades (50-950) if used
3. **Success colors**: Check all green shades (50-950) if used
4. **Neutral colors**: Check all gray shades (50-950) if used

### Test Opacity Modifiers
- [ ] `border-brand-400/20` works (20% opacity)
- [ ] `focus-visible:ring-brand-500/20` works (20% opacity)
- [ ] `bg-neutral-50/50` works (50% opacity)
- [ ] `bg-neutral-50/80` works (80% opacity)

## ⚠️ Common Issues to Watch For

1. **Missing colors**: If a color doesn't appear, check if it's in the safelist pattern
2. **Focus rings not showing**: Check if `focus-visible:` variant is in the pattern
3. **Spacing not working**: Check if spacing utilities are in the safelist
4. **Opacity not working**: Check if opacity modifiers are in the pattern
5. **Checked states not working**: Check if `data-[state=checked]` pattern is correct

## 📝 If Something Doesn't Work

1. **Check browser console** for any errors
2. **Inspect element** to see if classes are applied
3. **Check computed styles** to see if CSS is being generated
4. **Verify safelist patterns** in `tailwind.config.js` match the needed classes
5. **Check CSS fallback** in `preview.css` - it should still work as backup

## ✅ Success Criteria

All components should:
- ✅ Display correct colors (purple for brand, red for error, green for success)
- ✅ Show correct focus states (purple/red/green rings)
- ✅ Have correct spacing (no overlapping or too tight)
- ✅ Work correctly in all states (default, hover, focus, checked, disabled)
- ✅ Match the design system defined in the preset

