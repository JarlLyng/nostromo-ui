# Status for dokumentationssitet

## Hvad jeg fandt
- Build af Next/Nextra-dokker virker lokalt (`pnpm --filter nostromo-ui-docs build`), saa problemet er i runtime/hosting.
- `docs/next.config.mjs:14-15` laaser `assetPrefix` og `basePath` til `/nostromo-ui` i production, mens `docs/CNAME:1` viser custom domain `nostromo-ui.dev`. Paa dette domæne bliver alle JS/CSS-kald sendt til `/nostromo-ui/_next/...`, som ikke findes, og hele appen hydrerer ikke. LiveCode ender derfor i fallback-tilstand uden komponent-rendering (præcis det du oplever).
- Interne CTA-links i forsiden bruger haardkodede `/...`-stier (f.eks. `docs/pages/index.mdx:80,102,120`). De bliver ikke automatiskt basePath-prefikset, saa under GitHub Pages (`/nostromo-ui`-base) giver de 404.

## Anbefalinger (prioriteret)
1) **Gør basePath/assetPrefix miljøstyret**  
   - I `docs/next.config.mjs` og `docs/theme.config.tsx` bør basePath baseres på en variabel, fx:  
     ```js
     const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
     export default withNextra({
       basePath,
       assetPrefix: basePath,
       // ...
     })
     ```  
   - Sæt `NEXT_PUBLIC_BASE_PATH=""` for custom domain deployment (nostromo-ui.dev) og `NEXT_PUBLIC_BASE_PATH="/nostromo-ui"` for GitHub Pages. Det sikrer at `_next/*` assets loader korrekt og at LiveCode kan hydrerer.

2) **Gør interne links basePath-aware**  
   - Erstat rene `<a href="/...">` i MDX med Next `<Link href="/...">` eller en lille helper (`withBasePath`) der bruger samme basePath-variabel. Start med forsiden (`docs/pages/index.mdx:80,102,120`) og scan efter `href="/` i `docs/pages/**`.

3) **Verificer efter ændringer**  
   - Kør `pnpm --filter nostromo-ui-docs build && pnpm --filter nostromo-ui-docs export`.
   - Servér `docs/out` på samme basePath som sættes i miljøet og kontrollér i netværkspanel, at `_next/*` svarer 200. Tjek at LiveCode-visninger nu render komponenter (ingen blanke bokse).

4) **Valgfrit oprydning**  
   - Tilføj evt. en README-note om, hvilket miljøflag der skal bruges til hhv. GitHub Pages og custom domain, så basePath ikke glider tilbage til forkert værdi.

