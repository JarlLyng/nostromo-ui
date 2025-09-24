# Nostromo UI Documentation Maintenance Guide

## 🎯 Quick Reference

### **Essential Commands:**
```bash
# Build documentation
cd packages/docs-advanced
node build-system/build.js

# Start dev server
pnpm dev

# Add new component
# 1. Edit build-system/config.json
# 2. Create component page
# 3. Run build

# Test Live Components System
# 1. Build documentation
# 2. Start dev server
# 3. Check components for live-component divs
# 4. Verify JavaScript rendering
```

## 📋 Maintenance Checklist

### **Before Making Changes:**
- [ ] **Backup current state** if major changes
- [ ] **Test build system** works correctly
- [ ] **Verify all pages** load properly
- [ ] **Check navigation** is consistent

### **After Making Changes:**
- [ ] **Run build** to regenerate all pages
- [ ] **Test locally** with dev server
- [ ] **Verify navigation** works correctly
- [ ] **Check all links** are working
- [ ] **Test Live Components** rendering
- [ ] **Verify interactive examples** work
- [ ] **Test on mobile** devices
- [ ] **Commit changes** when ready

## 🔧 Common Tasks

### **Adding New Component:**

#### **Step 1: Update Configuration**
Edit `build-system/config.json`:
```json
{
  "components": {
    "core": [
      { "name": "NewComponent", "file": "new-component.html", "category": "form" }
    ]
  }
}
```

#### **Step 2: Create Component Page**
Create `components/new-component.html`:
```html
<div class="component-page">
  <h1>New Component</h1>
  <p>Component documentation...</p>
  
  <!-- Examples -->
  <div class="example">
    <h3>Basic Usage</h3>
    <div class="code-example">
      <!-- Your component example -->
    </div>
  </div>
  
  <!-- Live Components -->
  <div class="live-component" data-component="NewComponent" data-props='{"variant":"primary","size":"md"}'>
    <!-- Live component will be rendered here -->
  </div>
</div>
```

#### **Step 3: Rebuild**
```bash
node build-system/build.js
```

### **Updating Navigation:**

#### **Step 1: Edit Configuration**
Update `build-system/config.json` navigation structure:
```json
{
  "navigation": {
    "gettingStarted": [
      { "name": "Installation", "file": "getting-started/installation.html" },
      { "name": "Setup", "file": "getting-started/setup.html" },
      { "name": "New Page", "file": "getting-started/new-page.html" }
    ]
  }
}
```

#### **Step 2: Rebuild**
```bash
node build-system/build.js
```

### **Template Changes:**

#### **Step 1: Edit Template**
Update `templates/base.html`:
```html
<!-- Add new navigation item -->
<li><a href="{{cssPath}}/new-page.html" class="sidebar-link">New Page</a></li>
```

#### **Step 2: Rebuild**
```bash
node build-system/build.js
```

## 🚨 Troubleshooting

### **Build Fails:**
```bash
# Check config.json syntax
cat build-system/config.json | jq .

# Verify component files exist
ls -la components/

# Check template file
cat templates/base.html
```

### **Navigation Not Working:**
```bash
# Check navigation data
cat assets/js/navigation-data.js

# Verify JavaScript loading
# Check browser console for errors
```

### **Paths Not Working:**
```bash
# Check relative paths
ls -la assets/css/
ls -la assets/js/

# Verify file structure
tree -L 3
```

### **Content Not Updating:**
```bash
# Force rebuild
rm -rf components/*.html
node build-system/build.js

# Check template processing
# Verify content extraction
```

## 📊 Monitoring

### **Build Success Indicators:**
- ✅ **All components** generated successfully
- ✅ **Navigation data** created
- ✅ **Live Components** generated for all components
- ✅ **No build errors** in console
- ✅ **All pages** load correctly

### **Quality Checks:**
- ✅ **Consistent navigation** across all pages
- ✅ **Working links** and paths
- ✅ **Proper styling** and layout
- ✅ **Live Components** rendering correctly
- ✅ **Interactive examples** working
- ✅ **Mobile responsiveness**

### **Performance Monitoring:**
- ✅ **Fast loading** times
- ✅ **Optimized assets** (CSS, JS, images)
- ✅ **Efficient navigation** system
- ✅ **Good user experience**

## 🔄 Regular Maintenance

### **Weekly Tasks:**
- [ ] **Test build system** functionality
- [ ] **Verify all pages** load correctly
- [ ] **Check navigation** consistency
- [ ] **Test Live Components** rendering
- [ ] **Verify interactive examples** work
- [ ] **Test on different** browsers/devices

### **Monthly Tasks:**
- [ ] **Review component** documentation
- [ ] **Update navigation** if needed
- [ ] **Optimize performance** if issues
- [ ] **Backup documentation** system

### **Before Releases:**
- [ ] **Full build test** of all components
- [ ] **Navigation verification** across all pages
- [ ] **Live Components** functionality test
- [ ] **Interactive examples** verification
- [ ] **Mobile testing** on various devices
- [ ] **Performance testing** and optimization

## 🎯 Best Practices

### **Configuration Management:**
- **Keep config.json** well-organized
- **Use descriptive** component names
- **Maintain consistent** categories
- **Document changes** in commit messages

### **Component Pages:**
- **Use semantic HTML** structure
- **Include interactive** examples
- **Add Live Components** for all variants
- **Add proper headings** and sections
- **Test on mobile** devices

### **Template Maintenance:**
- **Keep templates** minimal and focused
- **Use consistent** variable naming
- **Include proper** accessibility attributes
- **Test template** changes thoroughly

### **Build Process:**
- **Always test** after changes
- **Verify all pages** generate correctly
- **Check navigation** consistency
- **Test Live Components** rendering
- **Test locally** before committing

## 🚀 Advanced Usage

### **Custom Build Scripts:**
```bash
# Build specific components only
node build-system/build.js --components=core

# Build with verbose output
node build-system/build.js --verbose

# Clean build (remove all generated files)
node build-system/build.js --clean
```

### **Automated Testing:**
```bash
# Test build system
npm test

# Test navigation
npm run test:navigation

# Test all pages
npm run test:pages
```

### **Deployment:**
```bash
# Build for production
NODE_ENV=production node build-system/build.js

# Deploy to server
npm run deploy

# Verify deployment
npm run verify:deployment
```

## 🚀 Live Components System Maintenance

### **Live Components Features:**
- **Interactive rendering** of all 26 components
- **Real-time updates** with prop changes
- **Performance optimization** with caching
- **Copy-to-clipboard** functionality
- **176+ live components** across all pages

### **Live Components Maintenance:**
- **Verify live components** render correctly
- **Test interactive examples** functionality
- **Check performance** optimization
- **Update component props** as needed
- **Test copy-to-clipboard** functionality

### **Live Components Troubleshooting:**
```bash
# Check live components in HTML
grep -r "live-component" components/

# Test JavaScript rendering
# Open browser console and check for errors
# Verify LiveComponentRenderer is working

# Check component props
# Verify data-component and data-props attributes
```

---

This maintenance guide ensures that the Nostromo UI documentation system remains reliable, consistent, and easy to maintain as the project grows, including the Live Components System.
