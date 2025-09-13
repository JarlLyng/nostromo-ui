import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import { toHaveNoViolations } from 'jest-axe';
import axe from 'axe-core';
import { NInput } from '../input';

expect.extend(toHaveNoViolations);

const runAxe = async (container: HTMLElement) => {
  const results = await axe.run(container);
  return results;
};

describe('NInput Accessibility', () => {
  it('should not have accessibility violations with basic input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Email Address',
        placeholder: 'Enter your email',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with error state', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Email Address',
        error: 'Please enter a valid email address',
        value: 'invalid-email',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with success state', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Email Address',
        success: 'Email address is valid',
        value: 'user@example.com',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with helper text', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Password',
        type: 'password',
        helperText: 'Must be at least 8 characters long',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with required field', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Required Field',
        required: true,
        placeholder: 'This field is required',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with disabled input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Disabled Input',
        disabled: true,
        value: 'Cannot edit this',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with different input types', async () => {
    const types = ['email', 'password', 'number', 'tel', 'url'] as const;

    for (const type of types) {
      const { container } = render(NInput, {
        props: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Input`,
          type,
        },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with different sizes', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      const { container } = render(NInput, {
        props: {
          label: `${size.toUpperCase()} Size Input`,
          size,
        },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with different variants', async () => {
    const variants = ['default', 'error', 'success'] as const;

    for (const variant of variants) {
      const { container } = render(NInput, {
        props: {
          label: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`,
          variant,
        },
      });

      const results = await runAxe(container);
      expect(results).toHaveNoViolations();
    }
  });

  it('should not have accessibility violations with form example', async () => {
    const { container } = render({
      template: `
        <div>
          <NInput label="Full Name" placeholder="Enter your full name" required />
          <NInput label="Email Address" type="email" placeholder="Enter your email" required />
          <NInput label="Password" type="password" placeholder="Enter your password" required />
          <NInput label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
      `,
      components: { NInput },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with validation states', async () => {
    const { container } = render({
      template: `
        <div>
          <NInput label="Valid Input" success="Input is valid" value="valid@example.com" />
          <NInput label="Invalid Input" error="This field is required" />
          <NInput label="Helper Text" helperText="This is helpful information" />
        </div>
      `,
      components: { NInput },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with readonly input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Readonly Input',
        readonly: true,
        value: 'This is readonly',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with number input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Age',
        type: 'number',
        min: 0,
        max: 120,
        step: 1,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with password input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        helperText: 'Must be at least 8 characters',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with email input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Email Address',
        type: 'email',
        placeholder: 'user@example.com',
        required: true,
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with tel input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Phone Number',
        type: 'tel',
        placeholder: '+1 (555) 123-4567',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with url input', async () => {
    const { container } = render(NInput, {
      props: {
        label: 'Website',
        type: 'url',
        placeholder: 'https://example.com',
      },
    });

    const results = await runAxe(container);
    expect(results).toHaveNoViolations();
  });
});
