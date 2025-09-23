# 🚀 Deployment Guide - Nostromo UI

Denne guide beskriver hvordan Nostromo UI dokumentationssite deployes og vedligeholdes.

## 📋 Oversigt

Nostromo UI bruger en **avanceret HTML-baseret dokumentationssite** med alle 17 komponenter, interaktive features og live previews. Den deployes automatisk til **GitHub Pages** via GitHub Actions og er optimeret for performance uden komplekse build-processer.

## 🌐 Deployment Targets

### **Production (GitHub Pages)**
- **URL**: https://jarl.l.github.io/nostromo-ui/
- **Custom Domain**: https://nostromo-ui.dev (konfigureret via CNAME)
- **Branch**: `main`
- **Trigger**: Automatisk ved push til main branch

### **Development (Lokal)**
- **URL**: http://localhost:3003
- **Command**: `cd packages/docs-advanced && python3 -m http.server 3003`

## 🔧 Deployment Process

### **Automatisk Deployment**

1. **Push til main branch** med ændringer i:
   - `packages/docs-advanced/`
   - `packages/ui-core/`
   - `packages/ui-tw/`
   - `packages/ui-marketing/`

2. **GitHub Actions workflow** kører automatisk:
   - Installerer dependencies
   - Bygger alle pakker
   - Kopierer avanceret HTML dokumentation til build output
   - Deployer til GitHub Pages

### **Manuel Deployment**

```bash
# 1. Build alle pakker
pnpm build

# 2. Kopier avanceret HTML dokumentation til build output
cp -r packages/docs-advanced/* build/

# 3. Deploy til GitHub Pages
cd build
git add .
git commit -m "Deploy documentation"
git push origin gh-pages
```

## 📁 Build Output

Avanceret HTML dokumentation genererer statiske filer i:
```
packages/docs-advanced/
├── index.html
├── package.json
└── README.md
```

## 🔗 Links og Navigation

### **Hovednavigation**
- **Home**: `/`
- **Components**: `/docs/components/`
- **Getting Started**: `/docs/getting-started/`
- **Theming**: `/docs/theming/`
- **API Reference**: `/api/`
- **Storybook**: `/storybook`

### **Komponenter**
- **Button**: `/docs/components/button`
- **Badge**: `/docs/components/badge`
- **Card**: `/docs/components/card`
- **Avatar**: `/docs/components/avatar`

## 🛠️ Troubleshooting

### **Build Fejl**

1. **TypeDoc fejl**:
   ```bash
   # Check dokumentationssite
   cd packages/docs-advanced
   python3 -m http.server 3000
   ```

2. **Broken links**:
   ```bash
   # Check for broken links
   pnpm build
   # Se fejl i output
   ```

3. **Dependency problemer**:
   ```bash
   # Rens og reinstall
   pnpm clean:all
   pnpm install
   ```

### **Deployment Fejl**

1. **GitHub Actions fejl**:
   - Check workflow logs i GitHub Actions tab
   - Verificer at alle dependencies er korrekte

2. **GitHub Pages fejl**:
   - Check repository settings > Pages
   - Verificer at GitHub Actions har Pages permissions

## 📊 Performance

### **Build Metrics**
- **Build tid**: ~30-45 sekunder
- **Bundle størrelse**: ~2-3 MB
- **Page load**: <2 sekunder

### **Optimering**
- **Static HTML**: Ingen build process nødvendig
- **Image optimization**: Optimerede SVG og PNG billeder
- **Caching**: GitHub Pages CDN

## 🔄 Maintenance

### **Regelmæssige Opgaver**

1. **Opdater dependencies**:
   ```bash
   pnpm update
   ```

2. **Check for broken links**:
   ```bash
   pnpm build
   ```

3. **Test lokalt**:
   ```bash
   pnpm docs:dev
   ```

### **Content Updates**

1. **Tilføj ny komponent**:
   - Opret dokumentation i `packages/docs-advanced/components/`
   - Opdater navigation i HTML filer
   - Test lokalt

2. **Opdater API dokumentation**:
   - HTML dokumentation opdateres manuelt
   - Komponent eksempler opdateres i HTML filer

## 🚨 Rollback

Hvis deployment fejler:

1. **Rollback til forrige commit**:
   ```bash
   git revert HEAD
   git push origin main
   ```

2. **Manuel deployment**:
   ```bash
   cd packages/docs-advanced
   python3 -m http.server 3000
   ```

## 📞 Support

For problemer med deployment:
- Check GitHub Actions logs
- Verificer repository permissions
- Test lokalt først

---

**Sidst opdateret**: December 2024
