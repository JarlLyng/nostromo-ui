import { describe, it, expect } from 'vitest';
import * as UITw from './index';
import nostromoPreset from './tailwind.preset';

describe('@nostromo/ui-tw', () => {
  it('should export theme utilities', () => {
    expect(UITw).toBeDefined();
  });

  it('should have valid preset structure', () => {
    expect(nostromoPreset).toBeDefined();
    expect(typeof nostromoPreset).toBe('object');
    expect(nostromoPreset).toHaveProperty('theme');
    expect(nostromoPreset).toHaveProperty('plugins');
  });
});
