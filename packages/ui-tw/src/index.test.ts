import { describe, it, expect } from 'vitest';
import * as UITw from './index';

describe('@nostromo/ui-tw', () => {
  it('should export tailwind preset', () => {
    expect(UITw.nostromoPreset).toBeDefined();
    expect(typeof UITw.nostromoPreset).toBe('object');
  });

  it('should export theme utilities', () => {
    expect(UITw).toBeDefined();
  });

  it('should have valid preset structure', () => {
    const preset = UITw.nostromoPreset;
    expect(preset).toHaveProperty('theme');
    expect(preset).toHaveProperty('plugins');
  });
});
