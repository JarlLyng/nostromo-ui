# 🧪 Test Forbedringerne Lokalt

Denne guide viser dig hvordan du tester alle de nye forbedringer lokalt, før du opretter en pull request.

## Hurtig Test (Kør Alt)

Kør hele test-suitten med ét kommando:

```bash
./test-locally.sh
```

Dette kører alle de samme checks som CI vil køre.

## Manuelle Tests (Skridt for Skridt)

### 1. 📦 Installer Dependencies

```bash
pnpm install --frozen-lockfile
```

### 2. 🔍 Test Linter

```bash
pnpm lint
```

Dette checker om koden følger ESLint reglerne.

### 3. 🔷 Test TypeScript Types

```bash
pnpm type-check
```

Dette verificerer at alle TypeScript types er korrekte.

### 4. 🧪 Kør Tests

```bash
# Kør alle tests én gang
pnpm test:run

# Eller kør tests med coverage
pnpm test:coverage

# Eller kør tests i watch mode (udvikling)
pnpm test:watch
```

### 5. 🏗️ Build Packages

```bash
pnpm build
```

Dette bygger alle packages og sikrer at alt kompilerer korrekt.

### 6. 📊 Test Bundle Size Monitoring

```bash
cd packages/ui-core
pnpm size
```

Dette checker om bundle sizes er indenfor de definerede limits i `.size-limit.json`.

For mere detaljer om hvorfor en fil er stor:

```bash
pnpm size:why
```

### 7. ♿ Test Accessibility

```bash
cd packages/ui-core
pnpm test:a11y
```

Dette kører alle accessibility tests med axe-core.

### 8. 📚 Test Storybook (Optional)

```bash
cd packages/ui-core
pnpm storybook
```

Åbn derefter http://localhost:6006 i din browser og verificer:

- ✅ Storybook starter uden fejl
- ✅ Komponenter vises korrekt
- ✅ Addon-tabs (a11y, docs) virker
- ✅ Dark theme virker

## Package-Specifikke Tests

### Test kun ui-core package:

```bash
# Fra root directory
pnpm --filter @nostromo/ui-core lint
pnpm --filter @nostromo/ui-core test:run
pnpm --filter @nostromo/ui-core build
pnpm --filter @nostromo/ui-core size
```

## Hvad Skal Virke?

Efter alle tests skal du se:

✅ **Linter**: Ingen fejl eller warnings  
✅ **Type check**: Ingen type fejl  
✅ **Tests**: Alle tests passerer (100% coverage)  
✅ **Build**: Alle packages bygges succesfuldt  
✅ **Bundle size**: Alle limits er respekteret  
✅ **Accessibility**: Ingen a11y violations  

## Fejlfinding

### Bundle Size Fejler

Hvis `pnpm size` fejler, kan du:

1. Se detaljeret info: `pnpm size:why`
2. Justere limits i `packages/ui-core/.size-limit.json`
3. Optimere komponenter for at reducere størrelse

### Storybook Starter Ikke

Hvis Storybook ikke starter:

1. Tjek om alle dependencies er installeret: `pnpm install`
2. Tjek console for fejl
3. Prøv at bygge Storybook: `pnpm build-storybook`

### Tests Fejler

Hvis tests fejler:

1. Kør med verbose output: `pnpm test:run --reporter=verbose`
2. Tjek om alle test dependencies er installeret
3. Kør tests individuelt for at isolere problemet

## Simuler CI Lokalt

For at simulere præcis hvad CI vil køre:

```bash
# Samme rækkefølge som CI
pnpm install --frozen-lockfile
pnpm lint
pnpm type-check
pnpm test:run
pnpm build
cd packages/ui-core && pnpm size
cd packages/ui-core && pnpm test:a11y
```

Hvis alle disse kommandoer passerer, vil CI også passere! ✅

