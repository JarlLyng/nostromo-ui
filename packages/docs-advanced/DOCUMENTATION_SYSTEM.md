# Nostromo UI Documentation System

## 🎯 Overview

This documentation system uses a **template-based build approach** to ensure maintainability, consistency, and scalability. The system eliminates code duplication and provides a single source of truth for navigation and structure.

## 🏗️ Architecture

### **Template System:**
```
templates/
└── base.html              # Main template with navigation
```

### **Build System:**
```
build-system/
├── config.json            # Component configuration
└── build.js               # Build script
```

### **Generated Output:**
```
components/                # Generated component pages
├── button.html           # Core components
├── input.html
└── marketing/
    ├── gallery.html      # Marketing components
    └── logo-wall.html
```

## 🔧 How It Works

### **1. Configuration-Driven:**
All components are defined in `build-system/config.json`:
```json
{
  "components": {
    "core": [
      { "name": "Button", "file": "button.html", "category": "interaction" }
    ],
    "marketing": [
      { "name": "Gallery", "file": "marketing/gallery.html", "category": "media" }
    ]
  }
}
```

### **2. Template Processing:**
The build script processes the base template and replaces variables:
- `{{title}}` → Component name
- `{{cssPath}}` → Relative path to assets
- `{{content}}` → Component-specific content

### **3. Automatic Path Resolution:**
- **Core components**: `../../assets/` (2 levels up)
- **Marketing components**: `../../../assets/` (3 levels up)
- **Getting started**: `../assets/` (1 level up)
- **Index**: `./assets/` (same level)

## 🚀 Usage

### **Build Documentation:**
```bash
cd packages/docs-advanced
node build-system/build.js
```

### **Development Server:**
```bash
pnpm dev
# Opens at http://localhost:8080
```

## 📝 Adding New Components

### **Step 1: Update Configuration**
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

### **Step 2: Create Component Page**
Create `components/new-component.html` with your content:
```html
<div class="component-page">
  <h1>New Component</h1>
  <p>Component documentation...</p>
</div>
```

### **Step 3: Rebuild**
```bash
node build-system/build.js
```

## 🎯 Benefits

### **Maintainability:**
- ✅ **Single source of truth** for navigation
- ✅ **No duplicate code** across pages
- ✅ **Template inheritance** system
- ✅ **Configuration-driven** approach

### **Consistency:**
- ✅ **Same header/footer** on all pages
- ✅ **Consistent navigation** structure
- ✅ **Unified styling** and behavior
- ✅ **Automatic asset paths**

### **Scalability:**
- ✅ **Easy to add** new components
- ✅ **Automatic navigation** generation
- ✅ **Build automation** system
- ✅ **Template-based** approach

## 🔄 Workflow

### **Daily Development:**
1. **Edit component pages** in `components/`
2. **Run build** to regenerate all pages
3. **Test locally** with dev server
4. **Commit changes** when ready

### **Adding New Components:**
1. **Update config.json** with new component
2. **Create component page** with content
3. **Run build** to generate all pages
4. **Test and verify** functionality

### **Navigation Updates:**
1. **Edit config.json** navigation structure
2. **Run build** to update all pages
3. **All pages updated** automatically

## 📊 Generated Files

### **Component Pages:**
- `components/*.html` - Core component pages
- `components/marketing/*.html` - Marketing component pages
- `getting-started/*.html` - Getting started pages
- `index.html` - Homepage

### **Navigation Data:**
- `assets/js/navigation-data.js` - Auto-generated navigation data

## 🛠️ Technical Details

### **Template Variables:**
- `{{title}}` - Page title
- `{{cssPath}}` - Relative path to assets
- `{{content}}` - Component-specific content

### **Path Resolution:**
- **Core components**: `../../assets/`
- **Marketing components**: `../../../assets/`
- **Getting started**: `../assets/`
- **Index**: `./assets/`

### **Build Process:**
1. **Read configuration** from `config.json`
2. **Load base template** from `templates/base.html`
3. **Process each component** with template
4. **Replace variables** with actual values
5. **Write generated files** to output directory
6. **Generate navigation data** for JavaScript

## 🎯 Best Practices

### **Component Pages:**
- Keep content between `<div class="component-page">` tags
- Use semantic HTML structure
- Include proper headings and sections
- Add interactive examples when possible

### **Configuration:**
- Keep component names consistent
- Use descriptive categories
- Maintain alphabetical order
- Update navigation structure carefully

### **Templates:**
- Keep template variables minimal
- Use semantic HTML structure
- Include proper accessibility attributes
- Maintain consistent styling

## 🚨 Troubleshooting

### **Build Errors:**
- Check `config.json` syntax
- Verify component file paths
- Ensure template variables are correct
- Check file permissions

### **Navigation Issues:**
- Verify `navigation-data.js` is generated
- Check JavaScript console for errors
- Ensure all links are working
- Test on different browsers

### **Path Issues:**
- Check relative path calculations
- Verify asset file locations
- Test CSS and JavaScript loading
- Check favicon and images

## 📈 Future Enhancements

### **Planned Features:**
- **Search functionality** integration
- **Dark mode** toggle
- **Mobile optimization** improvements
- **Performance optimizations**
- **Accessibility enhancements**

### **Possible Extensions:**
- **Multi-language support**
- **Component playground** integration
- **API documentation** generation
- **Automated testing** integration

---

This documentation system ensures that the Nostromo UI documentation remains maintainable, consistent, and scalable as the project grows.
