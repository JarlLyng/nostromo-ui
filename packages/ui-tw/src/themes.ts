// Theme definitions and utilities
export const themes = {
  nostromo: 'nostromo',
  mother: 'mother',
  'lv-426': 'lv-426',
  sulaco: 'sulaco',
} as const;

export type ThemeName = keyof typeof themes;

// Re-export theme utilities
export * from './themes/utils';
