# React Hydration Mismatch Error #418 - LiveCode Komponent

## Problembeskrivelse

Der opstår gentagne React hydration mismatch fejl (error #418) i produktionsbuild af dokumentationssitet. Fejlen opstår specifikt i `LiveCode` komponenten, som bruger `react-live` til at vise interaktive kodeeksempler.

### Fejlmeddelelse

```
Uncaught Error: Minified React error #418; visit https://reactjs.org/docs/error-decoder.html?invariant=418 for the full message or use the non-minified dev environment for full errors and additional helpful warnings.
```

Fejlen opstår i:
- `framework-02bc0cb5669a0314.js:1` (minified React bundle)
- Stack trace peger på React's hydration logik (`lg`, `i`, `oO`, `oF`, `oS`, `x`, `T`)

### Kontekst

- **Framework**: Next.js (via Nextra)
- **Komponent**: `docs/components/LiveCode.tsx`
- **Bibliotek**: `react-live` (LiveProvider, LivePreview, LiveEditor)
- **Miljø**: Production build (static export)
- **Fejl opstår**: Ved hydration af server-rendered HTML til client-side React

## Nuværende Implementering

### LiveCode Komponent

Komponenten er markeret med `'use client'` og bruger:
- `react-live`'s `LiveProvider`, `LivePreview`, `LiveEditor`
- Client-side CSS injection via `useEffect`
- `ClientOnly` wrapper komponent for at forhindre server-side rendering

### ClientOnly Wrapper

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
```

### LiveCode Struktur

```tsx
return (
  <ClientOnly fallback={/* placeholder */}>
    <LiveProvider code={transformedCode} scope={scope} noInline={needsNoInline}>
      {/* UI med LivePreview, LiveEditor, etc. */}
    </LiveProvider>
  </ClientOnly>
)
```

## Forsøgte Løsninger

### 1. CSS Injection i useEffect
- **Forsøg**: Flyttet CSS injection til `useEffect` for at undgå server-side rendering
- **Resultat**: Fejlen fortsatte

### 2. isMounted State
- **Forsøg**: Tilføjet `isMounted` state og conditional rendering
- **Resultat**: Fejlen fortsatte

### 3. Placeholder Match
- **Forsøg**: Server renderer placeholder der matcher client struktur
- **Resultat**: Fejlen fortsatte

### 4. ClientOnly Wrapper
- **Forsøg**: Wrappet hele `LiveProvider` i `ClientOnly` komponent
- **Resultat**: Fejlen fortsatte

## Mulige Årsager

1. **react-live's indre implementering**: `LiveProvider` eller `LivePreview` kan have indre hydration problemer
2. **Next.js Static Export**: Static export kan have problemer med client-only komponenter
3. **Scope Object**: Det store `scope` objekt med alle Nostromo komponenter kan skabe problemer
4. **Code Transformation**: Dynamisk code transformation kan skabe mismatch
5. **Multiple Instances**: Flere `LiveCode` komponenter på samme side kan forstærke problemet

## Tekniske Detaljer

### Scope Object
```tsx
const scope = {
  React,
  ...Nostromo,  // Alle @nostromo/ui-core komponenter
  ...NostromoMarketing,  // Alle @nostromo/ui-marketing komponenter
  // Explicitly added components
  Hero: NostromoMarketing.Hero,
  Features: NostromoMarketing.Features,
  // ... flere
  useState: React.useState,
  useEffect: React.useEffect,
  // ... hooks
}
```

### Code Transformation
Komponenten transformerer kode før rendering:
- Fjerner import statements
- Håndterer `export default`
- Tilføjer `render()` calls for `noInline` mode

### CSS Injection
Dynamisk CSS injection via `useEffect`:
- Injicerer Tailwind utility classes som CSS
- Mapper CSS variables til Tailwind classes
- Sker kun på client-side

## Filer Involveret

- `docs/components/LiveCode.tsx` - Hovedkomponent
- `docs/components/ClientOnly.tsx` - Client-only wrapper
- `docs/pages/components/*.mdx` - Sider der bruger LiveCode
- `docs/pages/components/index.mdx` - Eksempel på brug

## Brug af LiveCode

Komponenten bruges i MDX filer sådan:

```mdx
import LiveCode from '../../components/LiveCode'

<LiveCode code={`import { Button } from '@nostromo/ui-core'

export default function Example() {
  return <Button>Click me</Button>
}`} />
```

## Næste Skridt / Forslag

1. **Undersøg react-live's hydration support**: Tjek om `react-live` har kendte hydration problemer
2. **Alternative biblioteker**: Overvej alternativer til `react-live` (fx `react-code-blocks`, `@uiw/react-codemirror`)
3. **Dynamic Import**: Prøv Next.js `dynamic` import med `ssr: false`
4. **Error Boundary**: Tilføj error boundary omkring LiveCode for at fange fejl
5. **Disable SSR for LiveCode**: Konfigurer Nextra til at disable SSR for LiveCode komponenter
6. **Simplificer Scope**: Reducer scope objektet til kun nødvendige komponenter
7. **Debug Mode**: Kør i development mode for at se den fulde fejlmeddelelse

## Yderligere Information

- **React Version**: 18.x (via Next.js)
- **Next.js Version**: 14.x (via Nextra)
- **react-live Version**: Seneste (tjek package.json)
- **Build Type**: Static export (Next.js static HTML export)
- **Fejl opstår**: Kun i production build, ikke i development

## Fejlens Effekt

- Fejlen forhindrer ikke funktionalitet, men:
  - Skaber mange console errors
  - Kan påvirke performance
  - Kan forvirre udviklere
  - Ser uprofessionelt ud

## Relaterede Issues

- React error #418: Hydration failed because the initial UI does not match what was rendered on the server
- React error #423: (også set i logs) - Relateret hydration fejl

