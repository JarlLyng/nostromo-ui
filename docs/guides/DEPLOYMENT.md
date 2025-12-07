# 🚀 Deployment Guide - Nostromo UI

This guide describes how the Nostromo UI documentation site is deployed and maintained.

## 📋 Overview

Nostromo UI uses a **Nextra-based documentation site** deployed to GitHub Pages. The site includes all components, Storybook integration, live code examples, and search functionality.

## 🌐 Deployment Targets

### **Production (GitHub Pages)**
- **URL**: https://jarllyng.github.io/nostromo-ui/
- **Custom Domain**: Coming soon - Currently using GitHub Pages
- **Branch**: `main`
- **Trigger**: Automatic on push to main branch

### **Development (Local)**
- **URL**: http://localhost:3000
- **Command**: `cd docs && npm run dev`

## 🔧 Deployment Process

### **Automatic Deployment**

1. **Push to main branch** - GitHub Actions automatically:
   - Installs dependencies
   - Builds documentation site
   - Deploys to GitHub Pages

### **Manual Deployment**

```bash
# Build and deploy
cd docs
pnpm build
# Follow GitHub Pages deployment steps
```

## 🛠️ Troubleshooting

For deployment issues, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

**Common Issues:**
- **Build errors**: Check dependencies and build logs
- **GitHub Actions errors**: Check workflow logs
- **GitHub Pages errors**: Verify repository settings and permissions

## 📊 Performance

- **Build time**: ~30-45 seconds
- **Bundle size**: Optimized for fast loading
- **Page load**: <2 seconds

## 🔄 Maintenance

- Update dependencies regularly
- Test locally before deploying
- Check for broken links after builds

---

**Last Updated**: October 2025