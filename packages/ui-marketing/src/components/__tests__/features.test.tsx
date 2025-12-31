import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Features } from '../features';

const mockFeatures = [
  { id: '1', title: 'Feature 1', description: 'Description 1' },
  { id: '2', title: 'Feature 2', description: 'Description 2' },
  { id: '3', title: 'Feature 3', description: 'Description 3' },
];

describe('Features Component', () => {
  describe('Rendering', () => {
    it('should render all features', () => {
      render(<Features features={mockFeatures} />);
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Feature 3')).toBeInTheDocument();
    });

    it('should render feature descriptions', () => {
      render(<Features features={mockFeatures} />);
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
      expect(screen.getByText('Description 3')).toBeInTheDocument();
    });

    it('should render title when provided', () => {
      render(<Features features={mockFeatures} title="Features Title" />);
      expect(screen.getByText('Features Title')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(<Features features={mockFeatures} subtitle="Features subtitle" />);
      expect(screen.getByText('Features subtitle')).toBeInTheDocument();
    });

    it('should not render title/subtitle section when not provided', () => {
      const { container } = render(<Features features={mockFeatures} />);
      const titleSection = container.querySelector('.mb-12');
      expect(titleSection).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply default variant', () => {
      const { container } = render(<Features features={mockFeatures} variant="default" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-background');
    });

    it('should apply muted variant', () => {
      const { container } = render(<Features features={mockFeatures} variant="muted" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-muted/30');
    });

    it('should apply accent variant', () => {
      const { container } = render(<Features features={mockFeatures} variant="accent" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-accent/10');
    });
  });

  describe('Columns', () => {
    it('should apply 1 column layout', () => {
      const { container } = render(<Features features={mockFeatures} columns={1} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('should apply 2 column layout', () => {
      const { container } = render(<Features features={mockFeatures} columns={2} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });

    it('should apply 3 column layout by default', () => {
      const { container } = render(<Features features={mockFeatures} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });

    it('should apply 4 column layout', () => {
      const { container } = render(<Features features={mockFeatures} columns={4} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4');
    });
  });

  describe('Card Variants', () => {
    it('should apply default card variant', () => {
      const { container } = render(<Features features={mockFeatures} cardVariant="default" />);
      const firstCard = container.querySelector('.relative.p-6');
      expect(firstCard).toHaveClass('border-border');
    });

    it('should apply accent card variant', () => {
      const { container } = render(<Features features={mockFeatures} cardVariant="accent" />);
      const firstCard = container.querySelector('.relative.p-6');
      expect(firstCard).toHaveClass('border-accent/20', 'bg-accent/5');
    });

    it('should apply muted card variant', () => {
      const { container } = render(<Features features={mockFeatures} cardVariant="muted" />);
      const firstCard = container.querySelector('.relative.p-6');
      expect(firstCard).toHaveClass('border-muted', 'bg-muted/20');
    });
  });

  describe('Icons', () => {
    it('should render icon when provided', () => {
      const Icon = () => <span>Icon</span>;
      const featuresWithIcon = [
        { ...mockFeatures[0], icon: <Icon /> },
      ];
      render(<Features features={featuresWithIcon} />);
      expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('should not render icon container when icon not provided', () => {
      const { container } = render(<Features features={mockFeatures} />);
      const iconContainer = container.querySelector('.w-12.h-12');
      expect(iconContainer).not.toBeInTheDocument();
    });

    it('should apply icon variant', () => {
      const Icon = () => <span>Icon</span>;
      const featuresWithIcon = [
        { ...mockFeatures[0], icon: <Icon />, iconVariant: 'success' },
      ];
      const { container } = render(<Features features={featuresWithIcon} />);
      const iconContainer = container.querySelector('.w-12.h-12');
      expect(iconContainer).toHaveClass('bg-success-100', 'text-success-600');
    });
  });

  describe('Centered', () => {
    it('should center title/subtitle by default', () => {
      const { container } = render(
        <Features features={mockFeatures} title="Title" subtitle="Subtitle" />
      );
      const titleSection = container.querySelector('.mb-12');
      expect(titleSection).toHaveClass('text-center');
    });

    it('should not center when centered is false', () => {
      const { container } = render(
        <Features features={mockFeatures} title="Title" subtitle="Subtitle" centered={false} />
      );
      const titleSection = container.querySelector('.mb-12');
      expect(titleSection).not.toHaveClass('text-center');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty features array', () => {
      const { container } = render(<Features features={[]} />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(0);
    });

    it('should use index as key when id is missing', () => {
      const featuresWithoutId = [
        { title: 'Feature 1', description: 'Desc 1' },
        { title: 'Feature 2', description: 'Desc 2' },
      ];
      render(<Features features={featuresWithoutId} />);
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
    });
  });
});

