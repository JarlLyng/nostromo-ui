# Review af Nostromo UI dokumentationssite

Her er et fokus på forbedringsmuligheder, baseret på det publicerede site på `https://jarllyng.github.io/nostromo-ui/`.

## Kritiske problemer
- **API Reference linker til 404**: Menu- og next/prev-linket peger på `/api/`, men siden eksisterer ikke. Brugere ender i en fejlside, og hele “API Reference” kapitlet mangler.
- **Storybook peger på localhost**: Call-to-action henviser til `http://localhost:6007`, som ikke virker fra den hostede dokumentation. Uden en hosted Storybook (fx statisk build på GitHub Pages) mister læseren den vigtigste interaktive demo.

## Hurtige gevinster
- **Tilføj en direkte installationsblok på forsiden** (pnpm/yarn/npm + pakke-navne). Forsiden nævner kun “Getting Started” og en liste af komponenter uden links/CTA’er.
- **Gør komponent-listen på forsiden klikbar**. Nu er det en død punktopstilling; link til de enkelte komponent-sider eller grupper dem efter kategori.
- **Props-tabeller er ufuldstændige**: Fx på `components/button` mangler standard-props som `type`, `onClick`, `asChild`, `loading`/`isLoading` etc. Brugerne kan ikke se fuld API-flade og defaults.
- **Ensartet “Import/Usage”-blok på alle komponenter**: Start hver side med import-path og en minimal brugseksempel (inkl. hvilken pakke: `@nostromo/ui-core` vs. `@nostromo/ui-tw`).

## Struktur og indhold
- **Getting Started**: Angiv peer dependencies (React/TypeScript/Tailwind versioner), typisk projekt-setup (Next/Vite) og hvor `base.css` skal importeres (global layout). Beskriv også hvordan dark-mode toggle forventes implementeret (HTML `data-theme` vs. runtime hook).
- **Theming**: Der er lange kodeblokke, men ingen live preview. Overvej en reel theme playground (embed af Storybook demo eller interaktiv Nextra MDX-komponent) og korte tabeller for design tokens (navne, scale, eksempelværdier) i stedet for mange tekstafsnit.
- **Komponent-sider**:
  - Viser statiske kodeblokke men ingen visuel rendering; tilføj små rendered previews af varianter/states (hover, focus, disabled, loading).
  - Tilføj “Do/Don’t”-eksempler og accessibility-noter per komponent (ikke kun generisk tekst). Fx for Button: “brug `type=\"button\"` i formularer”, “brug `aria-live` for load state” osv.
  - Props-tabel bør være maskinlæstbar og fuld (type, default, beskrivelse, er påkrævet?). Overvej at generere den fra source for konsistens.
- **Navigation og sideløbende TOC**: Når API-siden mangler, virker næste/forrige-navigation på komponent-sider forkert (linker tilbage til 404). Ryd op i navigationen eller genskab siden.
- **FAQ**: Mangler hurtige svar om licens, browser-support, SSR/CSR, tree-shaking, theming pitfalls (fx hvad hvis man glemmer `data-theme`?), og hvordan man rapporterer fejl.

## Oplevelse & fremtoning
- **Branding/hero**: Forsiden er meget teksttung. Overvej en kort hero med USP’er (fx “React + Tailwind + 4 temaer”, “WCAG AA farver out-of-the-box”) og én primær CTA (Installér) + sekundær CTA (Se komponenter).
- **Visuel afstøvning**: Brug et par real-world UI-eksempler (kort, tabel, form) der skifter tema, så man visuelt forstår bibliotekets styrker.
- **Sprog og konsistens**: Blanding af engelsk UI-tekst og emojis i overskrifter (“🎨 Theming”) gør TOC lidt “noisy”. Overvej en mere konsekvent tone og kortere rubrikker.

## Leveranceforslag
1) Få API Reference live eller fjern menupunktet midlertidigt.  
2) Host Storybook statisk og link til den fra forsiden + komponent-siderne.  
3) Giv alle komponent-sider en standardstruktur: Import, Quick Preview, Props-tabel, A11y, Do/Don’t, Relaterede komponenter.  
4) Tilføj en installationssektion og peer deps på forsiden + Getting Started.  
5) Lav interaktiv theme playground (eller indlejret Storybook panel) på Theming.
