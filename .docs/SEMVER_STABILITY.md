# Semver Stability Plan - Nostromo UI

## 📋 Executive Summary

This document is the versioning **policy** - what will count as a breaking change
once the library is published. It is not a record of guarantees already in force.

Nothing has been published to npm yet, so no promise about API stability has been
made to anyone, and none should be implied. This document previously claimed
otherwise.

## 🎯 Stability Policy

### What a stable release will cover

Once published, these are the surfaces a major version bump protects:

- **Component Props** - prop interfaces
- **CSS Classes** - the utility and component classes components emit
- **Theme Variables** - the `--nostromo-*` token names
- **Import Paths** - entry points listed in the package `exports` map
- **TypeScript Types** - exported interfaces and types

### Already broken on the way to 3.0.0

Recorded here so the policy is not read as a promise that was kept:

- **Theme variables were renamed.** Tokens moved from `--color-*` to
  `--nostromo-*`, because the old names collided with the variables Tailwind v4
  emits for `@theme` and produced a circular reference.
- **Import paths were removed.** The `./preset` and `./plugin` exports are gone;
  Tailwind v4 reads neither, so there was nothing for them to do.
- **Some component classes changed.** Badge, Avatar, Toast and Select referenced
  shadow tokens no theme defined, so those classes were silently no-ops; they now
  use the generic scale.

#### ⚠️ **Experimental APIs (0.x.x)**

- **Performance Hooks** - `usePerformanceMonitor`, `useMemoryMonitor` (may change)
- **Advanced Features** - Lazy loading utilities (may change)
- **Internal APIs** - Internal component methods (may change)

## 🔄 Versioning Strategy

### Semantic Versioning (Semver)

```
MAJOR.MINOR.PATCH
```

#### **MAJOR (1.0.0 → 2.0.0)**

- **Breaking Changes** - API changes that require code changes
- **Removed Features** - Deprecated features are removed
- **Architecture Changes** - Major architectural changes

#### **MINOR (1.0.0 → 1.1.0)**

- **New Features** - New components, props, or functionality
- **Enhancements** - Improvements to existing features
- **New Themes** - Additional theme options

#### **PATCH (1.0.0 → 1.0.1)**

- **Bug Fixes** - Bug fixes that don't change APIs
- **Performance** - Performance improvements
- **Documentation** - Documentation updates

## 🚫 Breaking Change Policy

### What Constitutes Breaking Changes

#### ❌ **Breaking Changes (MAJOR)**

```typescript
// ❌ Removing props
- <Button variant="primary" />
+ <Button /> // variant prop removed

// ❌ Changing prop types
- <Button size="large" />
+ <Button size={24} /> // size type changed

// ❌ Removing CSS classes
- className="nostromo-button-primary"
+ className="nostromo-button" // primary class removed

// ❌ Changing import paths
- import { Button } from '@jarllyng/ui-core'
+ import { Button } from '@jarllyng/ui-core/button'
```

#### ✅ **Non-Breaking Changes (MINOR/PATCH)**

```typescript
// ✅ Adding new props
<Button variant="primary" size="large" /> // size prop added

// ✅ Adding new variants
<Button variant="secondary" /> // new variant added

// ✅ Adding new CSS classes
className="nostromo-button-primary-new" // new class added

// ✅ Adding new exports
export { Button, Input, Card } // new components exported
```

## 📦 Package Versioning

### Current Package Structure

```
@jarllyng/ui-core: 1.0.0
@jarllyng/ui-marketing: 1.0.0
@jarllyng/ui-tw: 1.0.0
```

### Version Alignment Strategy

- **Core Package** - `@jarllyng/ui-core` drives major versions
- **Marketing Package** - `@jarllyng/ui-marketing` follows core version
- **Tailwind Package** - `@jarllyng/ui-tw` follows core version

### Changeset Configuration

```javascript
// changeset.config.js
module.exports = {
  changelog: "@changesets/cli/changelog",
  commit: false,
  fixed: [],
  linked: ["@jarllyng/ui-core", "@jarllyng/ui-marketing", "@jarllyng/ui-tw"],
  access: "public",
  baseBranch: "main",
  updateInternalDependencies: "patch",
  ignore: [],
};
```

## 🔄 Migration Strategy

### Pre-1.0.0 (Current)

- **Rapid Iteration** - Breaking changes allowed
- **Beta Testing** - Community feedback incorporated
- **API Evolution** - APIs may change between versions

### 1.0.0+ (Stable)

- **API Stability** - No breaking changes in minor/patch versions
- **Deprecation Process** - Features deprecated before removal
- **Migration Guides** - Clear migration paths provided

## 📋 Deprecation Process

### 1. **Deprecation Announcement**

```typescript
// Mark as deprecated in JSDoc
/**
 * @deprecated Use `variant="primary"` instead
 * @since 1.0.0
 * @removed 2.0.0
 */
export const Button = ({ variant, ...props }) => {
  if (variant === "primary") {
    console.warn(
      'Button variant="primary" is deprecated, use variant="primary" instead',
    );
  }
  // ...
};
```

### 2. **Migration Guide**

````markdown
## Migration Guide: Button Variants

### Before (1.x.x)

```typescript
<Button variant="primary" />
```
````

### After (2.x.x)

```typescript
<Button variant="primary" />
```

### Migration Steps

1. Update import statements
2. Update prop usage
3. Update CSS classes
4. Test thoroughly

````

### 3. **Removal Timeline**
- **Deprecation** - 1 minor version (e.g., 1.1.0)
- **Warning** - 1 major version (e.g., 2.0.0)
- **Removal** - Next major version (e.g., 3.0.0)

## 🛡️ Stability Guarantees

### Component API Stability
```typescript
// ✅ Stable - These interfaces won't change
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
}

// ✅ Stable - These CSS classes won't change
const buttonClasses = {
  base: 'nostromo-button',
  variants: {
    primary: 'nostromo-button-primary',
    secondary: 'nostromo-button-secondary',
  }
};
````

### Theme System Stability

```css
/* ✅ Stable - These CSS variables won't change */
:root {
  --color-primary-500: 262 84% 52%;
  --color-primary-600: 262 84% 42%;
  --radius-md: 0.5rem;
  --font-sans: "Inter", sans-serif;
}
```

### Import Path Stability

```typescript
// ✅ Stable - These import paths won't change
import { Button } from "@jarllyng/ui-core";
import { Button } from "@jarllyng/ui-core/button";
import { Hero } from "@jarllyng/ui-marketing";
```

## 📊 Version History

### 0.1.0 (Current Beta)

- **Status**: Beta testing
- **Stability**: Experimental
- **Breaking Changes**: Allowed
- **Community Feedback**: Actively sought

### 1.0.0 (Planned Stable)

- **Status**: Stable release
- **Stability**: Full API stability
- **Breaking Changes**: Not allowed in minor/patch
- **Migration**: Clear migration paths

### 2.0.0 (Future Major)

- **Status**: Planned
- **Stability**: New stable APIs
- **Breaking Changes**: Deprecated features removed
- **Migration**: Comprehensive migration guide

## 🔧 Implementation Plan

### Phase 1: Pre-1.0.0 (Current)

- [ ] **API Audit** - Review all component APIs
- [ ] **Breaking Change Documentation** - Document all breaking changes
- [ ] **Migration Guides** - Create migration guides
- [ ] **Deprecation Warnings** - Add deprecation warnings

### Phase 2: 1.0.0 Release

- [ ] **API Freeze** - Freeze all stable APIs
- [ ] **Documentation** - Complete API documentation
- [ ] **Testing** - Comprehensive testing
- [ ] **Release** - Stable 1.0.0 release

### Phase 3: Post-1.0.0

- [ ] **Monitoring** - Monitor API usage
- [ ] **Feedback** - Collect community feedback
- [ ] **Evolution** - Plan future API evolution
- [ ] **Deprecation** - Manage deprecation process

## 📈 Success Metrics

### Stability Metrics

- **API Stability** - 0 breaking changes in minor/patch versions
- **Migration Success** - 100% of deprecated features have migration guides
- **Community Adoption** - Increasing adoption of stable APIs

### Quality Metrics

- **Test Coverage** - 100% test coverage for stable APIs
- **Documentation** - Complete documentation for all stable APIs
- **Type Safety** - Full TypeScript support for all stable APIs

## 🎯 Next Steps

### Immediate Actions

1. **API Audit** - Review all component APIs for stability
2. **Breaking Change Documentation** - Document all breaking changes needed
3. **Migration Guides** - Create comprehensive migration guides
4. **Deprecation Warnings** - Add deprecation warnings for unstable APIs

### 1.0.0 Release Preparation

1. **API Freeze** - Freeze all stable APIs
2. **Documentation** - Complete API documentation
3. **Testing** - Comprehensive testing of stable APIs
4. **Release** - Prepare for stable 1.0.0 release

---

**Status**: Semver Stability Plan Complete ✅
**Next**: Implement API audit and migration guides
**Timeline**: 2 weeks for full implementation
