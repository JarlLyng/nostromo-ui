import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Theme CSS Files', () => {
  const themesDir = join(__dirname, '..');
  const themes = ['nostromo', 'mother', 'lv-426', 'sulaco'];

  themes.forEach(theme => {
    it(`should have ${theme} theme file`, () => {
      const themePath = join(themesDir, `${theme}.css`);
      const css = readFileSync(themePath, 'utf-8');
      expect(css).toBeTruthy();
      expect(css.length).toBeGreaterThan(0);
    });

    it(`should have ${theme} theme data-theme selector`, () => {
      const themePath = join(themesDir, `${theme}.css`);
      const css = readFileSync(themePath, 'utf-8');
      expect(css).toContain(`[data-theme="${theme}"]`);
    });

    it(`should have ${theme} theme semantic color tokens`, () => {
      const themePath = join(themesDir, `${theme}.css`);
      const css = readFileSync(themePath, 'utf-8');
      expect(css).toContain('--color-background');
      expect(css).toContain('--color-foreground');
      expect(css).toContain('--color-primary');
      expect(css).toContain('--color-muted');
    });

    it(`should have ${theme} theme HSL color format`, () => {
      const themePath = join(themesDir, `${theme}.css`);
      const css = readFileSync(themePath, 'utf-8');
      // Check for HSL pattern: number number% number%
      const hslPattern = /\d+\s+\d+%\s+\d+%/;
      expect(css).toMatch(hslPattern);
    });
  });
});

