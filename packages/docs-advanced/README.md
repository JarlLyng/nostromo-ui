# Nostromo UI Advanced Documentation

## 🚀 Build System

This documentation site uses a **template-based system** for consistency and easy maintenance.

### **Key Features:**
- ✅ **Template-based generation** for consistency
- ✅ **Component configuration** in JSON
- ✅ **Easy maintenance** and updates

## 📁 Structure

```
packages/docs-advanced/
├── templates/
│   └── base.html              # Main template with navigation
├── build-system/
│   ├── config.json            # Component configuration
│   └── build.js               # Build script
├── components/                # Generated component pages
├── assets/                    # Static assets
└── index.html                 # Homepage
```

## 🛠️ Development

### **Build Documentation:**
```bash
npm run build:docs
```

### **Add New Component:**
1. Add component to `build-system/config.json`
2. Run build script
3. Component page is automatically generated

## 📚 Benefits

- **Consistency**: All pages follow the same structure
- **Maintainability**: Easy to update navigation and styling
- **Scalability**: Simple to add new components
- **Performance**: Optimized for fast loading

---

*This advanced documentation system ensures consistency and easy maintenance across all component pages.*