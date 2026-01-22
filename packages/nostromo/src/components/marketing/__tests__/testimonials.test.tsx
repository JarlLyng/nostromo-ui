import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Testimonials } from '../testimonials';

const mockTestimonials = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Developer',
    company: 'Tech Corp',
    content: 'Great product!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Designer',
    content: 'Amazing experience!',
    rating: 4,
  },
];

describe('Testimonials Component', () => {
  describe('Rendering', () => {
    it('should render all testimonials', () => {
      render(<Testimonials testimonials={mockTestimonials} />);
      expect(screen.getByText(/Great product!/)).toBeInTheDocument();
      expect(screen.getByText(/Amazing experience!/)).toBeInTheDocument();
    });

    it('should render testimonial names', () => {
      render(<Testimonials testimonials={mockTestimonials} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('should render testimonial roles', () => {
      render(<Testimonials testimonials={mockTestimonials} />);
      expect(screen.getByText(/Developer/)).toBeInTheDocument();
      expect(screen.getByText(/Designer/)).toBeInTheDocument();
    });

    it('should render company when provided', () => {
      render(<Testimonials testimonials={mockTestimonials} />);
      expect(screen.getByText(/at Tech Corp/)).toBeInTheDocument();
    });

    it('should render title when provided', () => {
      render(<Testimonials testimonials={mockTestimonials} title="Testimonials" />);
      expect(screen.getByText('Testimonials')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(<Testimonials testimonials={mockTestimonials} subtitle="What people say" />);
      expect(screen.getByText('What people say')).toBeInTheDocument();
    });
  });

  describe('Ratings', () => {
    it('should render ratings by default', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} />);
      const ratingContainers = container.querySelectorAll('.flex.mb-4');
      expect(ratingContainers.length).toBeGreaterThan(0);
    });

    it('should not render ratings when showRatings is false', () => {
      const { container } = render(
        <Testimonials testimonials={mockTestimonials} showRatings={false} />
      );
      const ratingContainers = container.querySelectorAll('.flex.mb-4');
      expect(ratingContainers.length).toBe(0);
    });

    it('should render correct number of stars for rating', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} />);
      const stars = container.querySelectorAll('span.text-lg');
      // 5 stars per testimonial with rating (2 testimonials = 10 stars)
      expect(stars.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe('Avatars', () => {
    it('should render avatar when provided', () => {
      const testimonialsWithAvatar = [
        { ...mockTestimonials[0], avatar: '/avatar.jpg' },
      ];
      const { container } = render(<Testimonials testimonials={testimonialsWithAvatar} />);
      const avatar = container.querySelector('img[src="/avatar.jpg"]');
      expect(avatar).toBeInTheDocument();
    });

    it('should not render avatar when not provided', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} />);
      const avatars = container.querySelectorAll('img[class*="rounded-full"]');
      expect(avatars.length).toBe(0);
    });
  });

  describe('Variants', () => {
    it('should apply default variant', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} variant="default" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-background');
    });

    it('should apply muted variant', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} variant="muted" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-muted/30');
    });

    it('should apply accent variant', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} variant="accent" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-accent/10');
    });
  });

  describe('Columns', () => {
    it('should apply 1 column layout', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} columns={1} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('should apply 3 column layout by default', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
    });
  });

  describe('Card Variants', () => {
    it('should apply default card variant', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} cardVariant="default" />);
      const firstCard = container.querySelector('.relative.p-6');
      expect(firstCard).toHaveClass('border-border');
    });

    it('should apply accent card variant', () => {
      const { container } = render(<Testimonials testimonials={mockTestimonials} cardVariant="accent" />);
      const firstCard = container.querySelector('.relative.p-6');
      expect(firstCard).toHaveClass('border-accent/20', 'bg-accent/5');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty testimonials array', () => {
      const { container } = render(<Testimonials testimonials={[]} />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(0);
    });

    it('should use index as key when id is missing', () => {
      const testimonialsWithoutId = [
        { name: 'John', role: 'Dev', content: 'Test content' },
      ];
      render(<Testimonials testimonials={testimonialsWithoutId} />);
      expect(screen.getByText(/Test content/)).toBeInTheDocument();
    });

    it('should handle testimonials without rating', () => {
      const testimonialsWithoutRating = [
        { id: '1', name: 'John', role: 'Dev', content: 'Test content' },
      ];
      render(<Testimonials testimonials={testimonialsWithoutRating} />);
      // Should not crash
      expect(screen.getByText(/Test content/)).toBeInTheDocument();
    });
  });
});

