# 🚀 Deployment Guide - Nostromo UI

This guide describes how the Nostromo UI documentation site is deployed and maintained.

## 📋 Overview

Nostromo UI uses a **Nextra-based documentation site** with all 27 components, Storybook integration and live previews. It runs locally on **http://localhost:3000** and is optimized for development and testing.

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

1. **Push to main branch** with changes in:
   - `packages/ui-core/`
   - `packages/ui-tw/`
   - `packages/ui-marketing/`

2. **GitHub Actions workflow** runs automatically:
   - Installs dependencies
   - Builds documentation site
   - Copies advanced HTML documentation to build output
   - Deploys to GitHub Pages

### **Manual Deployment**

```bash
# 1. Build all packages
pnpm build

# 2. Copy advanced HTML documentation to build output
cp -r packages/docs-advanced/* build/

# 3. Deploy to GitHub Pages
cd build
git add .
git commit -m "Deploy documentation"
git push origin gh-pages
```

## 📁 Build Output

Advanced HTML documentation generates static files in:

```
build/
├── index.html
├── components/
├── assets/
└── ...
```

## 🔗 Links and Navigation

### **Main Navigation**
- **Home**: `/`
- **Components**: `/components/`
- **Getting Started**: `/docs/getting-started/`
- **Theming**: `/docs/theming/`
- **API Reference**: `/api/`

### **Component Pages**
- **Button**: `/docs/components/button`
- **Input**: `/docs/components/input`
- **Avatar**: `/docs/components/avatar`
- **Card**: `/docs/components/card`
- **Dialog**: `/docs/components/dialog`

## 🛠️ Troubleshooting

### **Build Errors**

1. **Dependency issues**:
   ```bash
   # Check documentation site
   cd docs
   npm install
   npm run dev
   ```

2. **Broken links**:
   ```bash
   # Check for broken links
   pnpm build
   # See errors in output
   ```

3. **Dependency problems**:
   ```bash
   # Clean and reinstall
   rm -rf node_modules
   pnpm install
   ```

### **Deployment Errors**

1. **GitHub Actions errors**:
   - Check workflow logs in GitHub Actions tab
   - Verify all dependencies are correct

2. **GitHub Pages errors**:
   - Check repository settings > Pages
   - Verify GitHub Actions has Pages permissions

## 📊 Performance

### **Build Metrics**
- **Build time**: ~30-45 seconds
- **Bundle size**: Optimized for fast loading
- **Page load**: <2 seconds

### **Optimization**
- **Static HTML**: No build process needed
- **Image optimization**: Optimized SVG and PNG images
- **Caching**: GitHub Pages CDN

## 🔄 Maintenance

### **Regular Tasks**

1. **Update dependencies**:
   ```bash
   pnpm update
   ```

2. **Check for broken links**:
   ```bash
   pnpm build
   # Review output for errors
   ```

3. **Test locally**:
   ```bash
   cd docs
   npm run dev
   # Test all pages and links
   ```

### **Content Updates**

1. **Add new component**:
   - Create documentation in `packages/docs-advanced/components/`
   - Update navigation in HTML files
   - Test locally before deploying

2. **Update API documentation**:
   - HTML documentation is updated manually
   - Component examples are updated in HTML files

## 🚨 Rollback

If deployment fails:

1. **Rollback to previous commit**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Manual deployment**:
   ```bash
   # Follow manual deployment steps above
   ```

## 📞 Support

For deployment issues:
- Check GitHub Actions logs
- Verify repository permissions
- Contact maintainers via GitHub Issues

---

**Last Updated**: October 2025