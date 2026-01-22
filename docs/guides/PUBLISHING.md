# Publishing Guide

This guide explains how to publish Nostromo UI packages to npm.

## Prerequisites

1. **npm Organization**: Ensure you have access to the `@nostromo` organization on npm
2. **2FA**: Enable two-factor authentication on your npm account
3. **NPM_TOKEN**: Create an npm access token with publish permissions
4. **GitHub Secret**: Add `NPM_TOKEN` as a secret in GitHub repository settings

## Publishing Workflow

### Automated Publishing (Recommended)

Publishing is automated via GitHub Actions when changesets are merged to `main`:

1. **Create a changeset**: Use `pnpm changeset` to document changes
2. **Commit and push**: Changesets are committed to `.changeset/` directory
3. **Merge to main**: When changesets are merged, the workflow will:
   - Version packages based on changesets
   - Update workspace dependencies (e.g., `ui-marketing` → `ui-core`)
   - Publish to npm
   - Create git tags

### Manual Publishing

If you need to publish manually:

```bash
# 1. Ensure all packages are built
pnpm build

# 2. Update workspace dependencies
cd packages/ui-marketing
UI_CORE_VERSION=$(node -p "require('../ui-core/package.json').version")
pnpm pkg set "dependencies.@nostromo/ui-core=^$UI_CORE_VERSION"
cd ../..

# 3. Version packages (if using changesets)
pnpm changeset version

# 4. Publish to npm
pnpm changeset publish
```

## Package Configuration

All packages include:

- `publishConfig.access: "public"` - Ensures packages are published publicly
- `prepublishOnly` script - Runs tests and builds before publishing
- Proper `exports` field for ESM/CJS compatibility
- `files` field specifying what to include in package

## Verification

After publishing, verify packages are available:

```bash
npm view @nostromo/ui-core
npm view @nostromo/ui-marketing
npm view @nostromo/ui-tw
```

## Troubleshooting

### "Package not found" after publishing

- Wait a few minutes for npm registry propagation
- Check npm organization permissions
- Verify `publishConfig.access: "public"` is set

### Workspace dependency issues

- `ui-marketing` uses `workspace:*` in development
- Before publishing, update to version (e.g., `^1.0.0`)
- The publish workflow handles this automatically

### Authentication errors

- Ensure `NPM_TOKEN` secret is set in GitHub
- Verify token has publish permissions
- Check 2FA is enabled on npm account
