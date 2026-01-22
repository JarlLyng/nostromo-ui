# Migrating Packages to npm Organization

This guide explains how to migrate packages from `@jarllyng` scope to an npm organization scope (e.g., `@nostromo`) if you decide to create an organization later.

## Overview

Moving npm packages from one scope to another requires:
1. Publishing new packages under the new scope
2. Deprecating old packages
3. Updating documentation and code

## Steps

### 1. Create npm Organization

1. Go to https://www.npmjs.com/org/create
2. Create organization with desired name (e.g., `nostromo`)
3. Ensure you have owner/admin permissions

### 2. Update Package Names

Update all `package.json` files:

```json
{
  "name": "@jarllyng/nostromo"  // Change to
  "name": "@nostromo/ui-core"
}
```

### 3. Update Dependencies

Update workspace dependencies:

```json
{
  "dependencies": {
    "@jarllyng/nostromo": "workspace:*"  // Change to
    "@nostromo/ui-core": "workspace:*"
  }
}
```

### 4. Update All Imports

Search and replace across codebase:

```bash
# Find all occurrences
grep -r "@jarllyng" packages/ docs/

# Replace (use your preferred method)
find . -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i 's/@jarllyng/@nostromo/g'
```

### 5. Publish New Packages

Publish packages under new scope:

```bash
pnpm changeset
# Select packages, choose version bump
pnpm changeset version
pnpm changeset publish
```

### 6. Deprecate Old Packages

Deprecate old packages to guide users to new scope:

```bash
npm deprecate @jarllyng/nostromo@* "This package has moved to @nostromo/ui-core. Please update your dependencies."
npm deprecate @jarllyng/nostromo@* "This package has moved to @nostromo/ui-marketing. Please update your dependencies."
npm deprecate @jarllyng/nostromo@* "This package has moved to @nostromo/ui-tw. Please update your dependencies."
```

### 7. Update Documentation

- Update all installation instructions
- Update code examples
- Update README files
- Update API documentation

### 8. Announce Migration

- Update CHANGELOG.md
- Create GitHub release notes
- Announce on social media/community channels

## Important Notes

⚠️ **Breaking Change**: This is a breaking change for users. They will need to:
- Update `package.json` dependencies
- Update all imports in their code
- Reinstall packages

📦 **Package History**: Old packages remain available but deprecated. Users can still install them, but will see deprecation warnings.

🔄 **Versioning**: Consider starting at `1.0.0` for new scope packages, or continue versioning from where you left off.

## Alternative: Dual Publishing

You can publish to both scopes temporarily:

1. Publish to `@jarllyng` (existing)
2. Publish to `@nostromo` (new)
3. Deprecate `@jarllyng` with message pointing to `@nostromo`
4. Eventually stop publishing to `@jarllyng`

This gives users time to migrate gradually.
