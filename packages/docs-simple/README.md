# Simple Documentation

Denne mappe indeholder den simple HTML-baserede dokumentationsside for Nostromo UI.

## Features

- **Simpel HTML** - Ingen komplekse build-processer
- **Responsive design** - Fungerer på alle enheder
- **Performance optimeret** - Hurtig loading
- **Ingen JavaScript dependencies** - Ren HTML/CSS
- **Let at vedligeholde** - Simpel struktur

## Lokal udvikling

```bash
# Start lokal server
cd packages/docs-simple
python3 -m http.server 8080

# Eller brug pnpm script
pnpm docs:dev
```

## Deployment

Dokumentationen deployes automatisk til GitHub Pages via GitHub Actions når der pushes til main branch.

## Struktur

```
docs-simple/
├── index.html          # Hoveddokumentationsside
├── package.json        # Package konfiguration
└── README.md          # Denne fil
```

## Indhold

Dokumentationssiden indeholder:

- Hero sektion med Nostromo UI branding
- Features oversigt
- Komplet komponent grid (11 komponenter)
- Quick start guide med installation
- Responsive design med moderne styling
