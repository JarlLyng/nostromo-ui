# Manual Steps for 1.0.0 Release

## ✅ Completed Automatically

- ✅ Git tag `v1.0.0` created and pushed to GitHub
- ✅ Release notes prepared in `RELEASE_NOTES_1.0.0.md`
- ✅ Announcement text prepared in `ANNOUNCEMENT_TEXT.md`

## 📋 What You Need to Do

### 1. Create GitHub Release (5 minutes)

1. Go to: https://github.com/JarlLyng/nostromo-ui/releases
2. Click "Draft a new release"
3. Select tag: `v1.0.0`
4. Title: `v1.0.0 - Stable Release`
5. Copy content from `RELEASE_NOTES_1.0.0.md` into the description
6. Check "Set as the latest release"
7. Click "Publish release"

### 2. Publish to npm (10 minutes)

**⚠️ Important:** Only do this if you want to publish to npm. Skip if you're keeping it private.

#### Prerequisites
- npm account created
- Logged in via `npm login`
- Have publish permissions for `@nostromo` scope

#### Steps
```bash
# Make sure you're logged in
npm whoami

# If not logged in:
npm login

# Publish packages (from root directory)
cd packages/ui-core
npm publish --access public

cd ../ui-marketing
npm publish --access public

cd ../ui-tw
npm publish --access public
```

**Note:** If you don't have an npm account or don't want to publish, you can skip this step. The packages will still work via GitHub packages or direct installation from GitHub.

### 3. Update GitHub Repository (2 minutes)

1. Go to: https://github.com/JarlLyng/nostromo-ui
2. Click the gear icon (⚙️) next to "About"
3. Update description to:
   ```
   🎉 Nostromo UI 1.0.0 - Production-ready React component library with 27 core components, 6 marketing components, and 4 complete themes. Built with TypeScript, Tailwind CSS, and full WCAG 2.1 AA accessibility support.
   ```
4. Add topics: `react`, `typescript`, `tailwindcss`, `ui-components`, `component-library`, `accessibility`, `design-system`
5. Save changes

### 4. Announce the Release (Optional)

Use the text from `ANNOUNCEMENT_TEXT.md` to announce on:
- Twitter/X
- LinkedIn
- Reddit (r/reactjs, r/webdev)
- Dev.to or other tech blogs
- Your personal website/blog

### 5. Update Documentation Links (If Needed)

If you have any external documentation or links pointing to beta version, update them to reference 1.0.0.

## 🎉 That's It!

Once you've completed these steps, your 1.0.0 release is fully live and ready for the community!

## Need Help?

If you run into any issues:
- Check GitHub Actions for build status
- Verify all tests pass: `./stability-test.sh`
- Check that documentation builds: `cd docs && npm run build`

---

**Estimated Total Time:** 15-20 minutes

