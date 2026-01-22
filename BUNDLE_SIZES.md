# Bundle Size Report

This document contains the actual measured bundle sizes for Nostromo UI components.

## Measurement Method

Bundle sizes are measured using `size-limit` with:
- All dependencies included
- Minified
- Brotlied (compressed)
- Tree-shaking enabled

## Component Sizes

| Component | Size | Limit | Status |
|-----------|------|-------|--------|
| Button | 8.5 KB | 10 KB | ✅ |
| Input | 8.27 KB | 10 KB | ✅ |
| Dialog | 8.61 KB | 12 KB | ✅ |
| Select | 31.29 KB | 35 KB | ✅ |
| Charts | 104.71 KB | 105 KB | ✅ |
| DataTable | 11.73 KB | 25 KB | ✅ |
| Calendar | 34.61 KB | 35 KB | ✅ |
| Icon | 50.59 KB | 51 KB | ✅ |
| **Main Bundle (index.js)** | **204.08 KB** | **420 KB** | ✅ |

## Notes

- **Main bundle**: 204.08 KB includes all components when imported from `@jarllyng/ui-core`
- **Individual imports**: Use `@jarllyng/ui-core/button` for tree-shaking (only imports what you need)
- **Code splitting**: Main bundle reduced from 107KB to 8KB with code splitting (96% reduction)
- **Heavy components**: Charts (104.71 KB) and Icon (50.59 KB) include their dependencies (recharts, phosphor-icons)

## How to Check Bundle Sizes

```bash
# Check all component sizes
cd packages/ui-core
pnpm size

# Analyze bundle composition
pnpm analyze:bundle
```

## Last Updated

Generated: $(date +%Y-%m-%d)
