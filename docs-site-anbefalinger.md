# Status for dokumentationssitet

## Problem
LiveCode komponenter renderer ikke korrekt på live-sitet (nostromo-ui.dev). Komponenter vises som blanke bokse eller fejl, selvom de virker lokalt.

## Hvad jeg fandt
- Build af Next/Nextra-dokker virker lokalt (`pnpm --filter nostromo-ui-docs build`), så problemet er i runtime/hosting.
- `docs/next.config.mjs:14-15` laaser `assetPrefix` og `basePath` til `/nostromo-ui` i production, mens `docs/CNAME:1` viser custom domain `nostromo-ui.dev`. På dette domæne bliver alle JS/CSS-kald sendt til `/nostromo-ui/_next/...`, som ikke findes, og hele appen hydrerer ikke. LiveCode ender derfor i fallback-tilstand uden komponent-rendering (præcis det du oplever).
- Interne CTA-links i forsiden bruger haardkodede `/...`-stier (f.eks. `docs/pages/index.mdx:80,102,120`). De bliver ikke automatiskt basePath-prefikset, så under GitHub Pages (`/nostromo-ui`-base) giver de 404.

## Hvad vi har prøvet

### 1. Gjort basePath/assetPrefix miljøstyret ✅
**Implementeret:**
- Opdateret `docs/next.config.mjs` til at bruge `NEXT_PUBLIC_BASE_PATH` environment variable
- Opdateret `docs/theme.config.tsx` til at bruge samme variabel
- Opdateret `docs/pages/_document.tsx` til at bruge samme variabel
- Oprettet `docs/utils/withBasePath.ts` helper funktion
- Tilføjet `docs/README.md` med instruktioner om miljøvariabler

**Kode ændringer:**
```js
// docs/next.config.mjs
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/nostromo-ui' : '')
export default withNextra({
  assetPrefix: basePath,
  basePath: basePath,
  // ...
})
```

### 2. Gjort interne links basePath-aware ✅
**Implementeret:**
- Erstattet alle hardcoded `<a href="/...">` links med Next.js `<Link href="/...">` komponenter
- Opdateret `docs/pages/index.mdx` (10+ links)
- Opdateret `docs/pages/components/index.mdx` (35+ links)
- Next.js Link komponenten håndterer automatisk basePath

**Kode ændringer:**
```tsx
// Før:
<a href="/components/button">View docs</a>

// Efter:
import Link from 'next/link'
<Link href="/components/button">View docs</Link>
```

### 3. Deployment workflow
**Status:** Deployment workflow (`.github/workflows/deploy.yml`) bygger dokumentationen, men sætter **ikke** `NEXT_PUBLIC_BASE_PATH` environment variable. 

**Problemet:**
- Build step (linje 100-105) kører bare `pnpm run build` uden at sætte miljøvariabel
- Dette betyder at build'en stadig bruger default værdien (`/nostromo-ui` i production)
- Custom domain (nostromo-ui.dev) får stadig forkert basePath
- Assets loader stadig fra `/nostromo-ui/_next/...` i stedet for `/_next/...`

**Workflow kode:**
```yaml
- name: Build documentation
  run: |
    cd docs
    pnpm run build  # Ingen NEXT_PUBLIC_BASE_PATH sat!
```

## Resultat: Det virker ikke ❌

**Observationer:**
- Ingen fejl i browser console
- Ingen fejl i build process
- LiveCode komponenter renderer stadig ikke korrekt
- Assets loader korrekt (ingen 404'er), men komponenter renderer ikke

**Mulige årsager:**
1. **Miljøvariabel ikke sat i deployment**: GitHub Actions workflow sætter ikke `NEXT_PUBLIC_BASE_PATH`, så build'en bruger stadig default `/nostromo-ui` værdi
2. **Static export begrænsninger**: Next.js static export (`output: 'export'`) kan have begrænsninger med client-side hydration
3. **react-live hydration problemer**: `react-live` biblioteket kan have problemer med hydration i static export miljø
4. **CSS/Tailwind ikke tilgængelig**: Selvom assets loader, kan CSS/Tailwind classes ikke være tilgængelige i LiveCode preview context
5. **Scope problemer**: Komponenter fra `@nostromo/ui-core` kan ikke være tilgængelige i `react-live` scope på runtime

## Næste skridt (ikke implementeret)

1. **Sæt miljøvariabel i deployment workflow**
   - Opdater `.github/workflows/deploy.yml` til at sætte `NEXT_PUBLIC_BASE_PATH=""` for custom domain
   - Eller opret separate workflows for GitHub Pages vs custom domain

2. **Debug LiveCode hydration**
   - Tilføj console.log i `LiveCode.client.tsx` for at se om komponenter faktisk renderer
   - Tjek om `react-live` modtager korrekt scope
   - Verificer at CSS/Tailwind er tilgængelig i preview context

3. **Test alternativ tilgang**
   - Overvej at bruge Storybook embed i stedet for LiveCode (selvom det tidligere gav problemer)
   - Eller prøv en anden live code editor (fx CodeSandbox embed, StackBlitz, etc.)

4. **Verificer build output**
   - Tjek om `docs/out/_next/` indeholder korrekte assets
   - Verificer at `docs/out/index.html` har korrekte asset paths
   - Test lokal servering af `docs/out` med forskellige basePath værdier

