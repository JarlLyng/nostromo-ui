// Theme utilities and helpers

export type ThemeName = 'nostromo' | 'mother' | 'lv-426' | 'sulaco';

export const themes: Record<ThemeName, string> = {
  nostromo: 'nostromo',
  mother: 'mother',
  'lv-426': 'lv-426',
  sulaco: 'sulaco',
} as const;

/**
 * Apply a theme to the document
 */
export function applyTheme(theme: ThemeName): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

/**
 * Get the current theme from the document
 */
export function getCurrentTheme(): ThemeName | null {
  if (typeof document === 'undefined') return null;
  
  const theme = document.documentElement.getAttribute('data-theme');
  return theme as ThemeName | null;
}

/**
 * Toggle between light and dark mode
 */
export function toggleDarkMode(): void {
  if (typeof document === 'undefined') return;
  
  const currentScheme = document.documentElement.getAttribute('data-color-scheme');
  const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-color-scheme', newScheme);
}

/**
 * Set dark mode
 */
export function setDarkMode(isDark: boolean): void {
  if (typeof document === 'undefined') return;
  
  document.documentElement.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
}

/**
 * Get current color scheme
 */
export function getColorScheme(): 'light' | 'dark' | null {
  if (typeof document === 'undefined') return null;
  
  const scheme = document.documentElement.getAttribute('data-color-scheme');
  return scheme as 'light' | 'dark' | null;
}

/**
 * Check if system prefers dark mode
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Listen for system color scheme changes
 */
export function onSystemColorSchemeChange(callback: (isDark: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches);
  };
  
  mediaQuery.addEventListener('change', handler);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
}

/**
 * Initialize theme system
 */
export function initializeTheme(defaultTheme: ThemeName = 'nostromo'): void {
  if (typeof document === 'undefined') return;
  
  // Set default theme if none is set
  if (!getCurrentTheme()) {
    applyTheme(defaultTheme);
  }
  
  // Set initial color scheme based on system preference
  if (!getColorScheme()) {
    setDarkMode(prefersDarkMode());
  }
}
