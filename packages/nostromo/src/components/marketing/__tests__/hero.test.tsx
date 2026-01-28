import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../hero';
import { Button } from '../../core/button';

describe('Hero Component', () => {
  describe('Rendering', () => {
    it('should render title', () => {
      render(<Hero title="Test Hero Title" />);
      expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(<Hero title="Test" subtitle="Test subtitle" />);
      expect(screen.getByText('Test subtitle')).toBeInTheDocument();
    });

    it('should not render subtitle when not provided', () => {
      render(<Hero title="Test" />);
      expect(screen.queryByText('Test subtitle')).not.toBeInTheDocument();
    });

    it('should render CTA when provided', () => {
      render(
        <Hero 
          title="Test" 
          cta={<Button>Get Started</Button>} 
        />
      );
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('should not render CTA when not provided', () => {
      render(<Hero title="Test" />);
      expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply default variant', () => {
      const { container } = render(<Hero title="Test" variant="default" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('text-foreground');
    });

    it('should apply muted variant', () => {
      const { container } = render(<Hero title="Test" variant="muted" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('text-muted-foreground');
    });

    it('should apply accent variant', () => {
      const { container } = render(<Hero title="Test" variant="accent" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('text-accent-foreground', 'bg-accent/10');
    });
  });

  describe('Sizes', () => {
    it('should apply sm size', () => {
      const { container } = render(<Hero title="Test" size="sm" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-16', 'md:py-20');
    });

    it('should apply md size by default', () => {
      const { container } = render(<Hero title="Test" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-20', 'md:py-28');
    });

    it('should apply lg size', () => {
      const { container } = render(<Hero title="Test" size="lg" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-24', 'md:py-32');
    });

    it('should apply xl size', () => {
      const { container } = render(<Hero title="Test" size="xl" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('py-32', 'md:py-40');
    });
  });

  describe('Content Alignment', () => {
    it('should apply center alignment by default', () => {
      const { container } = render(<Hero title="Test" />);
      const content = container.querySelector('.container');
      expect(content).toHaveClass('text-center');
    });

    it('should apply left alignment', () => {
      const { container } = render(<Hero title="Test" contentAlign="left" />);
      const content = container.querySelector('.container');
      expect(content).toHaveClass('text-left');
    });

    it('should apply right alignment', () => {
      const { container } = render(<Hero title="Test" contentAlign="right" />);
      const content = container.querySelector('.container');
      expect(content).toHaveClass('text-right');
    });
  });

  describe('Title Sizes', () => {
    it('should apply sm title size', () => {
      const { container } = render(<Hero title="Test" titleSize="sm" />);
      const heading = container.querySelector('h1');
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'lg:text-5xl');
    });

    it('should apply md title size by default', () => {
      const { container } = render(<Hero title="Test" />);
      const heading = container.querySelector('h1');
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');
    });

    it('should apply lg title size', () => {
      const { container } = render(<Hero title="Test" titleSize="lg" />);
      const heading = container.querySelector('h1');
      expect(heading).toHaveClass('text-5xl', 'md:text-6xl', 'lg:text-7xl');
    });
  });

  describe('Background Image', () => {
    it('should apply background image style when provided', () => {
      const { container } = render(
        <Hero title="Test" backgroundImage="/test.jpg" />
      );
      const section = container.querySelector('section');
      expect(section).toHaveStyle({ backgroundImage: 'url(/test.jpg)' });
    });

    it('should not apply background image style when not provided', () => {
      const { container } = render(<Hero title="Test" />);
      const section = container.querySelector('section');
      expect(section).not.toHaveStyle({ backgroundImage: 'url(/test.jpg)' });
    });
  });

  describe('Overlay', () => {
    it('should render overlay when enabled', () => {
      const { container } = render(<Hero title="Test" overlay />);
      const overlay = container.querySelector('.absolute.inset-0');
      expect(overlay).toBeInTheDocument();
    });

    it('should not render overlay by default', () => {
      const { container } = render(<Hero title="Test" />);
      const overlay = container.querySelector('.absolute.inset-0.bg-background\\/80');
      expect(overlay).not.toBeInTheDocument();
    });

    it('should apply relative z-10 to content when overlay is enabled', () => {
      const { container } = render(<Hero title="Test" overlay />);
      const content = container.querySelector('.container');
      expect(content).toHaveClass('relative', 'z-10');
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<Hero title="Test" className="custom-class" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-class');
    });
  });
});

