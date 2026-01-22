// Theme exports
export * from './utils';

// Theme CSS imports (for bundlers that support CSS imports)
import './nostromo.css';
import './mother.css';
import './lv-426.css';
import './sulaco.css';

// Theme names and descriptions
export const themeInfo = {
  nostromo: {
    name: 'Nostromo',
    description: 'Classic space industrial theme inspired by the USCSS Nostromo',
    colors: {
      primary: 'Purple/Blue',
      secondary: 'Dark Gray',
      accent: 'Green'
    }
  },
  mother: {
    name: 'Mother',
    description: 'Cold, clinical AI aesthetic inspired by the ship\'s computer',
    colors: {
      primary: 'Cold Blue/Cyan',
      secondary: 'Clinical White',
      accent: 'Green'
    }
  },
  'lv-426': {
    name: 'LV-426',
    description: 'Warm, rusty atmosphere inspired by the planet LV-426',
    colors: {
      primary: 'Warm Orange/Rust',
      secondary: 'Earth Tones',
      accent: 'Green'
    }
  },
  sulaco: {
    name: 'Sulaco',
    description: 'Modern, military-inspired aesthetic from the USS Sulaco',
    colors: {
      primary: 'Military Blue/Gray',
      secondary: 'Steel Tones',
      accent: 'Green'
    }
  }
} as const;

export type ThemeInfo = typeof themeInfo;
