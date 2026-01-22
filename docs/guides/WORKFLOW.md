# Development Workflow Guide

This document describes the recommended workflow for developing Nostromo UI after the 1.0.0 release.

## 📋 Overview

After releasing 1.0.0, we follow a **hybrid workflow** that balances development speed with stability:

- **Feature branches** for new features and significant changes
- **Direct to main** for small fixes, documentation, and non-breaking changes
- **Changesets** for version management
- **Semantic versioning** for releases
- **GitHub Issues** for tracking work and project management

---

## 📝 Issue Management

### Creating Issues

When creating new issues, follow these guidelines:

1. **Assign to maintainer**: All issues should be assigned to `@JarlLyng` (or the project maintainer)
2. **Add to project**: Add issues to the **IAMJARL** project
3. **Set initial status**: New issues start with status **Backlog**
4. **Add labels**: Use appropriate labels (bug, enhancement, documentation, etc.)
5. **Set priority**: Add priority labels (priority:high, priority:medium, priority:low)

### Issue Status Workflow

Issues move through the following statuses in the IAMJARL project:

- **Backlog** (default) - New issues start here. Ready to be worked on but not yet started.
- **In Progress** - Issue is actively being worked on.
- **On Hold** - Temporarily paused, needs discussion, or waiting for dependencies.
- **Done** - Issue is completed and ready for review/merge.

### Status Guidelines

**When to move to "In Progress":**
- You start actively working on the issue
- Code changes are being made
- Implementation has begun

**When to move to "On Hold":**
- Blocked by external dependencies
- Needs discussion or decision
- Waiting for feedback or approval
- Temporarily deprioritized

**When to move to "Done":**
- All tasks in the issue are completed
- Code is merged to main branch
- Documentation is updated (if applicable)
- Tests are passing

### Example Issue Setup

When creating a new issue:

```markdown
## Overview
Brief description of the issue or feature

## Current Status
- What exists now
- What's missing

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Priority
High/Medium/Low - Brief explanation
```

Then:
1. Assign to `@JarlLyng`
2. Add to **IAMJARL** project
3. Set status to **Backlog**
4. Add relevant labels

---

## 🌿 Branching Strategy

### Main Branch
- **Purpose**: Always stable and deployable
- **Protection**: CI/CD runs on every push
- **Direct pushes allowed**: Yes, for small changes (see guidelines below)

### Feature Branches
- **Naming**: `feature/component-name` or `feature/description`
- **Purpose**: New features, major refactors, breaking changes
- **Workflow**: Create branch → Develop → Test → PR → Merge

### Release Branches (Optional)
- **Naming**: `release/1.1.0`
- **Purpose**: Prepare for major releases
- **When to use**: Major version bumps or complex releases

---

## 🔄 Recommended Workflow

### For Small Changes (Direct to Main) ✅

**What counts as "small":**
- Bug fixes (non-breaking)
- Documentation updates
- Typo fixes
- Test improvements
- Small styling tweaks
- Dependency updates (patch/minor)

**Workflow:**
```bash
# Make changes directly on main
git checkout main
git pull origin main

# Make your changes
# ... edit files ...

# Test locally
pnpm test
pnpm lint
pnpm type-check
pnpm build

# Commit and push
git add .
git commit -m "fix: description of fix"
git push origin main
```

**No changeset needed** for documentation-only or test-only changes.

### For New Features (Feature Branch) 🌟

**What counts as "new feature":**
- New components
- New props or API changes
- Major refactoring
- Breaking changes
- Performance improvements
- New themes

**Workflow:**
```bash
# Create feature branch
git checkout -b feature/data-table

# Make changes
# ... develop feature ...

# Test thoroughly
pnpm test
pnpm test:coverage
pnpm lint
pnpm type-check
pnpm build

# Create changeset
pnpm changeset
# Select packages affected
# Choose version bump (patch/minor/major)
# Write description

# Commit changes
git add .
git commit -m "feat: add DataTable component"

# Push and create PR
git push origin feature/data-table
# Create PR on GitHub
```

### For Bug Fixes (Feature Branch or Direct) 🐛

**Minor bugs (direct to main):**
- Small typos
- CSS tweaks
- Minor accessibility fixes
- Test fixes

**Major bugs (feature branch):**
- Security issues
- Critical functionality bugs
- Breaking bugs
- Bugs requiring significant changes

---

## 📦 Changesets Workflow

### When to Create Changesets

**Always create changeset for:**
- ✅ New features
- ✅ Bug fixes that affect users
- ✅ Breaking changes
- ✅ API changes
- ✅ New components

**No changeset needed for:**
- ❌ Documentation-only changes
- ❌ Test-only changes
- ❌ Build/config changes (unless they affect users)
- ❌ Internal refactoring (unless it changes behavior)

### Creating a Changeset

```bash
pnpm changeset
```

Follow the prompts:
1. **Select packages**: Choose which packages are affected
2. **Version bump**: 
   - `patch` (1.0.0 → 1.0.1) - Bug fixes
   - `minor` (1.0.0 → 1.1.0) - New features
   - `major` (1.0.0 → 2.0.0) - Breaking changes
3. **Write description**: Clear description of changes

### Changeset File Format

Changesets are stored in `.changeset/` directory:

```markdown
---
"@jarllyng/nostromo": minor
---

Add DataTable component with sorting and filtering

- Add DataTable component
- Add sorting functionality
- Add filtering functionality
- Add pagination integration
```

---

## 🚀 Release Process

### Automatic Releases (Recommended)

When you're ready to release:

1. **Merge all PRs** with changesets to main
2. **Create version PR**:
   ```bash
   pnpm version-packages
   ```
   This will:
   - Update package.json versions
   - Update CHANGELOG.md
   - Create a commit

3. **Review and merge** the version PR
4. **Create GitHub Release**:
   - Go to GitHub Releases
   - Click "Draft a new release"
   - Select the new tag
   - Copy changelog content
   - Publish

### Manual Releases

If you prefer manual control:

```bash
# 1. Update versions manually in package.json files
# 2. Update CHANGELOG.md
# 3. Commit
git commit -m "chore: release 1.1.0"

# 4. Create tag
git tag -a v1.1.0 -m "Release 1.1.0"
git push origin v1.1.0

# 5. Create GitHub Release (via UI)
```

---

## 📊 Decision Tree

```
Is this a new feature or major change?
├─ YES → Use feature branch + changeset
└─ NO
   ├─ Is it a bug fix?
   │  ├─ Minor bug → Direct to main (optional changeset)
   │  └─ Major bug → Feature branch + changeset
   └─ Is it documentation/test only?
      └─ YES → Direct to main (no changeset)
```

---

## ✅ Best Practices

### Before Pushing to Main

1. **Run tests**: `pnpm test`
2. **Check linting**: `pnpm lint`
3. **Type check**: `pnpm type-check`
4. **Build**: `pnpm build`
5. **Test locally**: Verify changes work

### Before Creating PR

1. **All tests pass**: `pnpm test:run`
2. **Coverage maintained**: `pnpm test:coverage`
3. **Accessibility tests**: `pnpm test:a11y` (if component changes)
4. **Documentation updated**: Update relevant docs
5. **Changeset created**: If needed
6. **Storybook updated**: If component changes

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

---

## 🎯 Current Roadmap (Phase 2: 1.1.0)

Based on ROADMAP.md, current focus areas:

### Distribution & Marketing
- npm Publishing
- Release Announcement

### Advanced Components
- DataTable Component
- Calendar Component
- Charts Component

### Performance Optimization
- Bundle Analysis
- Runtime Optimization

**Recommendation**: Use feature branches for these, as they're significant features.

---

## 🔒 Main Branch Protection

While we allow direct pushes to main, we recommend:

1. **Always test locally** before pushing
2. **Keep main stable** - if unsure, use a branch
3. **Use PRs for review** - even for small changes if you want feedback
4. **CI/CD will catch issues** - but don't rely on it

---

## 📝 Example Workflows

### Example 1: Small Bug Fix

```bash
# Direct to main
git checkout main
git pull

# Fix bug
# ... edit file ...

# Test
pnpm test
pnpm lint

# Commit
git commit -m "fix: resolve button hover state issue"
git push origin main
```

### Example 2: New Component

```bash
# Feature branch
git checkout -b feature/data-table
git pull origin main

# Develop component
# ... create DataTable component ...

# Test
pnpm test
pnpm test:coverage
pnpm lint
pnpm type-check
pnpm build

# Create changeset
pnpm changeset
# Select: @jarllyng/nostromo
# Version: minor
# Description: Add DataTable component

# Commit
git add .
git commit -m "feat: add DataTable component"
git push origin feature/data-table

# Create PR on GitHub
```

### Example 3: Documentation Update

```bash
# Direct to main
git checkout main
git pull

# Update docs
# ... edit README.md ...

# Commit (no changeset needed)
git commit -m "docs: update installation instructions"
git push origin main
```

---

## 🆘 When in Doubt

**If you're unsure whether to use a branch or push directly:**

1. **Ask yourself**: "Could this break something?"
   - YES → Use feature branch
   - NO → Direct to main is fine

2. **Ask yourself**: "Is this a significant change?"
   - YES → Use feature branch
   - NO → Direct to main is fine

3. **When in doubt**: Use a feature branch. It's always safe!

---

**Last Updated**: January 2025  
**Next Review**: As needed

