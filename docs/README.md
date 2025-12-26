# Nostromo UI Documentation

This is the documentation site for Nostromo UI, built with Next.js and Nextra.

## Environment Variables

The documentation site supports deployment to both GitHub Pages (with basePath) and custom domains (without basePath).

### `NEXT_PUBLIC_BASE_PATH`

Controls the base path for assets and routing.

- **For GitHub Pages**: Set `NEXT_PUBLIC_BASE_PATH="/nostromo-ui"` (or your repository name)
- **For custom domain**: Set `NEXT_PUBLIC_BASE_PATH=""` (empty string)

If not set, the default behavior is:
- Production: `/nostromo-ui` (GitHub Pages)
- Development: `` (empty, root path)

### Examples

**GitHub Pages deployment:**
```bash
NEXT_PUBLIC_BASE_PATH="/nostromo-ui" pnpm build
```

**Custom domain deployment:**
```bash
NEXT_PUBLIC_BASE_PATH="" pnpm build
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Export static files
pnpm export
```

## Deployment

The site is configured for static export (`output: 'export'`), making it compatible with:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Make sure to set `NEXT_PUBLIC_BASE_PATH` appropriately for your hosting setup.

