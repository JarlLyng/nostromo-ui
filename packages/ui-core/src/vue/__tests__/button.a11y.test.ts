import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { h } from 'vue';
import { NButton } from '../button';

// Import axe-core dynamically
const axe = require('axe-core');

// Helper function to run axe
const runAxe = (container: HTMLElement) => {
  return new Promise((resolve) => {
    axe.run(container, (err: any, results: any) => {
      if (err) throw err;
      resolve(results);
    });
  });
};

describe('NButton Accessibility (Vue)', () => {
  it('has no accessibility violations for primary button', async () => {
    const { container } = render(NButton, {
      props: {
        variant: 'primary',
      },
      slots: {
        default: 'Primary Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for secondary button', async () => {
    const { container } = render(NButton, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Secondary Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for ghost button', async () => {
    const { container } = render(NButton, {
      props: {
        variant: 'ghost',
      },
      slots: {
        default: 'Ghost Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for destructive button', async () => {
    const { container } = render(NButton, {
      props: {
        variant: 'destructive',
      },
      slots: {
        default: 'Delete',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for outline button', async () => {
    const { container } = render(NButton, {
      props: {
        variant: 'outline',
      },
      slots: {
        default: 'Outline Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for link button', async () => {
    const { container } = render(NButton, {
      props: {
        variant: 'link',
      },
      slots: {
        default: 'Link Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for small button', async () => {
    const { container } = render(NButton, {
      props: {
        size: 'sm',
      },
      slots: {
        default: 'Small Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for large button', async () => {
    const { container } = render(NButton, {
      props: {
        size: 'lg',
      },
      slots: {
        default: 'Large Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for icon button', async () => {
    const { container } = render(NButton, {
      props: {
        size: 'icon',
      },
      slots: {
        default: '⚙️',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for loading button', async () => {
    const { container } = render(NButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Loading...',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for disabled button', async () => {
    const { container } = render(NButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with custom class', async () => {
    const { container } = render(NButton, {
      props: {
        class: 'custom-class',
      },
      slots: {
        default: 'Custom Button',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with aria-label', async () => {
    const { container } = render(NButton, {
      props: {
        'aria-label': 'Close dialog',
      },
      slots: {
        default: '×',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with aria-describedby', async () => {
    const { container } = render({
      components: { NButton },
      template: `
        <div>
          <NButton aria-describedby="button-help">Submit</NButton>
          <div id="button-help">This will submit the form</div>
        </div>
      `,
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations for button with title', async () => {
    const { container } = render(NButton, {
      props: {
        title: 'Click to submit the form',
      },
      slots: {
        default: 'Submit',
      },
    });
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
  });
});
