import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import * as Marketing from './index';

describe('@nostromo/ui-marketing', () => {
  it('should export all components', () => {
    expect(Marketing.Hero).toBeDefined();
    expect(Marketing.Testimonials).toBeDefined();
    expect(Marketing.Features).toBeDefined();
    expect(Marketing.Pricing).toBeDefined();
    expect(Marketing.Gallery).toBeDefined();
    expect(Marketing.LogoWall).toBeDefined();
  });

  it('should render Hero component', () => {
    const { container } = render(
      <Marketing.Hero title="Test Hero" />
    );
    expect(container).toBeTruthy();
  });

  it('should render Features component', () => {
    const { container } = render(
      <Marketing.Features features={[{ title: 'Test', description: 'Test desc' }]} />
    );
    expect(container).toBeTruthy();
  });

  it('should render Testimonials component', () => {
    const { container } = render(
      <Marketing.Testimonials testimonials={[{ content: 'Test', author: 'Test', role: 'Test' }]} />
    );
    expect(container).toBeTruthy();
  });

  it('should render Pricing component', () => {
    const { container } = render(
      <Marketing.Pricing plans={[{ name: 'Test', price: '$10', description: 'Test', features: [], cta: <button>Test</button> }]} />
    );
    expect(container).toBeTruthy();
  });

  it('should render Gallery component', () => {
    const { container } = render(
      <Marketing.Gallery images={[{ src: 'test.jpg', alt: 'Test' }]} />
    );
    expect(container).toBeTruthy();
  });

  it('should render LogoWall component', () => {
    const { container } = render(
      <Marketing.LogoWall logos={[{ src: 'test.jpg', alt: 'Test' }]} />
    );
    expect(container).toBeTruthy();
  });
});
