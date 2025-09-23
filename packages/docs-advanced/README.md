# Nostromo UI Advanced Documentation

## 🚀 Build System

This documentation site uses a **maintainable template system** to ensure consistency and easy updates.

### **Key Features:**
- ✅ **Single source of truth** for navigation
- ✅ **Template-based generation** for consistency
- ✅ **Automatic path resolution** for assets
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
cd packages/docs-advanced
pnpm build
```

### **Serve Locally:**
```bash
pnpm dev
# Opens at http://localhost:8080
```

## 🔧 Adding New Components

### **1. Update Configuration:**
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

### **2. Create Component Page:**
Create `components/new-component.html` with your content.

### **3. Rebuild:**
```bash
pnpm build
```

## 🎯 Benefits

### **Maintainability:**
- **Navigation updates** in one place
- **Template changes** apply to all pages
- **Path resolution** is automatic
- **No duplicate code**

### **Consistency:**
- **Same header/footer** on all pages
- **Consistent navigation** structure
- **Unified styling** and behavior
- **Automatic asset paths**

### **Scalability:**
- **Easy to add** new components
- **Configuration-driven** approach
- **Template inheritance** system
- **Build automation**

## 🔄 Workflow

1. **Edit configuration** in `config.json`
2. **Create/update** component pages
3. **Run build** to generate all pages
4. **Test locally** with dev server
5. **Deploy** when ready

This system ensures that navigation, styling, and structure remain consistent across all pages while making it easy to add new components and maintain the documentation site.
