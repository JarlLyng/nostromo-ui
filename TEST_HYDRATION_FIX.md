# Test Guide: Hydration Fix Verification

## Implementeret Løsning

### 1. LiveCode.tsx (Wrapper)
- Bruger `next/dynamic` med `ssr: false`
- Returnerer `LiveCodeFallback` under SSR (`typeof window === 'undefined'`)
- Returnerer `LiveCodeClient` på client-side

### 2. LiveCode.client.tsx (Client Component)
- Har mount-guard: `if (!mounted) return null` (linje 329-331)
- CSS injection kører kun efter mount (linje 60: `if (!mounted || ...)`)
- `mounted` state sættes til `true` i `useEffect` (linje 54-56)

## Test Process

### Step 1: Build
```bash
cd /Users/jarl.l/Documents/Github/nostromo-ui
pnpm -C docs build
```

**Forventet resultat**: ✅ Build successful, ingen fejl

### Step 2: Start Server
```bash
cd docs
npx serve@latest out -p 3000
```

**Note**: Da Next.js er konfigureret med `output: 'export'`, skal vi bruge `serve` i stedet for `next start`.

**Forventet resultat**: Server starter på http://localhost:3000

### Step 3: Test i Browser

1. **Åbn browser**: http://localhost:3000/components
2. **Åbn Developer Tools** (F12)
3. **Gå til Console tab**
4. **Check for fejl**:
   - ❌ **Før fix**: Mange `Error: Minified React error #418` fejl
   - ✅ **Efter fix**: Ingen hydration fejl

### Step 4: Verificer Funktionalitet

1. **Check LiveCode komponenter**:
   - Skal vise fallback først (under load)
   - Skal vise live preview efter mount
   - Skal være interaktive (buttons virker)

2. **Check Console**:
   - Ingen `error #418` eller `error #423`
   - Ingen hydration warnings

3. **Check Network Tab**:
   - Alle assets loader korrekt
   - Ingen failed requests

## Forventet Resultat

### ✅ Success Criteria
- Ingen React hydration fejl i console
- LiveCode komponenter renderer korrekt
- Interaktivitet virker (theme toggle, copy button)
- Ingen visuelle glitches under load

### ❌ Failure Indicators
- `Error: Minified React error #418` i console
- `Error: Minified React error #423` i console
- LiveCode komponenter viser ikke indhold
- Console warnings om hydration mismatch

## Debugging

Hvis fejlen fortsætter:

1. **Check mount-guard**:
   ```tsx
   // I LiveCode.client.tsx linje 329
   if (!mounted) {
     return null  // Skal være her
   }
   ```

2. **Check CSS injection**:
   ```tsx
   // I LiveCode.client.tsx linje 60
   if (!mounted || styleInjectedRef.current || typeof document === 'undefined') return
   ```

3. **Check dynamic import**:
   ```tsx
   // I LiveCode.tsx linje 5-7
   const LiveCodeClient = dynamic(() => import('./LiveCode.client'), {
     ssr: false,  // Skal være false
   })
   ```

4. **Check SSR fallback**:
   ```tsx
   // I LiveCode.tsx linje 66
   if (typeof window === 'undefined') {
     return <LiveCodeFallback {...props} />  // Skal returnere fallback
   }
   ```

## Test Resultat

**Status**: ⏳ Pending manual browser test

**Build Status**: ✅ Success
**Mount-guard**: ✅ Implementeret
**CSS Injection**: ✅ Efter mount
**SSR Disabled**: ✅ Via dynamic import

**Næste skridt**: Kør browser test for at verificere at hydration fejl er væk.

