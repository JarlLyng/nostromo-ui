# 🔍 Sådan deler du fejl med mig

Der er flere måder at dele GitHub Actions fejl med mig, så jeg kan hjælpe med at fixe dem.

## 🎯 Metode 1: Test lokalt (Anbefalet)

Kør CI kommandoerne lokalt så jeg kan se outputtet:

```bash
# Test hele CI workflowen lokalt
./test-ci-locally.sh

# Eller test individuelle steps
cd packages/ui-core
pnpm lint 2>&1 | tee lint-output.txt
pnpm type-check 2>&1 | tee typecheck-output.txt
pnpm test:run 2>&1 | tee test-output.txt
```

Kopier derefter outputtet fra terminalen og send det til mig.

## 📦 Metode 2: Download GitHub Actions Artifacts

Når CI workflowen kører, gemmer den automatisk alle fejl-output i artifacts:

1. Gå til GitHub Actions tab i dit repository
2. Klik på den failed workflow run
3. Scroll ned til "Artifacts" sektionen
4. Download `ci-error-logs` eller `a11y-error-logs`
5. Åbn filerne og send indholdet til mig

## 🐛 Metode 3: Kopier fra GitHub Actions Logs

1. Gå til GitHub Actions tab
2. Klik på den failed workflow run
3. Klik på den failed job (fx `lint-and-test`)
4. Klik på den failed step
5. Kopier hele log outputtet
6. Send det til mig

## 📸 Metode 4: Screenshot (som du gjorde)

Tag et screenshot af fejlen og send det til mig. Det virker også!

## 🚀 Metode 5: Debug Workflow

Kør den dedikerede debug workflow:

1. Gå til GitHub Actions tab
2. Vælg "CI Debug" workflow i venstre sidebar
3. Klik "Run workflow"
4. Vælg "main" branch
5. Klik "Run workflow"
6. Vent til workflowen er færdig
7. Download artifacts fra "debug-outputs"

## 💡 Hvad jeg har sat op

✅ **CI workflow** - Gemmer automatisk alle fejl-output i artifacts  
✅ **Debug workflow** - Dedikeret workflow til debugging  
✅ **Local test script** - `test-ci-locally.sh` til at teste lokalt

## 🎯 Hurtig Guide

**Hurtigste måde:**
```bash
./test-ci-locally.sh
```

Kopier outputtet fra terminalen og send det til mig. Så kan jeg se præcis hvad der fejler! 🚀

