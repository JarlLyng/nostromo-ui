# Publishing Guide

This guide explains how to publish Nostromo UI packages to npm.

## Prerequisites

1. **npm Organization**: Ensure you have access to the `@jarllyng` organization on npm
2. **2FA**: Enable two-factor authentication on your npm account
3. **NPM_TOKEN**: Create an npm access token with publish permissions (or use Trusted Publishing - recommended)
4. **GitHub Secret**: Add `NPM_TOKEN` as a secret in GitHub repository settings

### Option 1: Trusted Publishing (Recommended for CI/CD)

Trusted Publishing is the most secure method for automated publishing from GitHub Actions. **Note**: This feature may only be available for Pro/Teams accounts or may be under a different path.

Try these paths:
- https://www.npmjs.com/org/nostromo/automation
- https://www.npmjs.com/settings/nostromo/automation
- Or navigate to https://www.npmjs.com/org/nostromo and look for "Automation" or "Trusted Publishers" in the menu

If you can access it:

1. Click "Add Trusted Publisher"
2. Select "GitHub Actions"
3. Enter:
   - **Repository**: `JarlLyng/nostromo-ui`
   - **Workflow file**: `publish.yml` (just the filename, not the full path)
   - **Environment**: (leave empty or use `production`)
4. Click "Add"

**Benefits:**
- No token management needed
- More secure (no long-lived tokens)
- No 2FA warnings
- Automatically scoped to your repository

**If Trusted Publishing is not available**, use Option 2 below.

### Option 2: Granular Access Token (Alternative)

If you prefer using a token instead:

1. Go to https://www.npmjs.com/settings/nostromo/tokens
2. Click "New Token" → "Granular Access Token"
3. Configure:
   - **Token name**: `nostromo-github-actions`
   - **Description**: `Publish @jarllyng packages from GitHub Actions`
   - **2FA**: ⚠️ **Uncheck this** (npm warns against 2FA for automation)
   - **Packages and scopes**:
     - Permissions: "Read and write"
     - Select: "Only select packages and scopes"
     - **Scope**: Select `@jarllyng` (NOT `@jarllyng`)
   - **Organizations**:
     - Permissions: "Read and write" (needed to publish to org)
   - **Expiration**: 90 days (or longer)
4. Generate token and copy it
5. Add as `NPM_TOKEN` secret in GitHub

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
pnpm pkg set "dependencies.@jarllyng/ui-core=^$UI_CORE_VERSION"
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
npm view @jarllyng/ui-core
npm view @jarllyng/ui-marketing
npm view @jarllyng/ui-tw
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
