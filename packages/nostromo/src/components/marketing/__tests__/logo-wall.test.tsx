import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LogoWall } from '../logo-wall';

const mockLogos = [
  {
    id: '1',
    name: 'Company 1',
    logo: '/logo1.png',
    url: 'https://company1.com',
    alt: 'Company 1 logo',
  },
  {
    id: '2',
    name: 'Company 2',
    logo: '/logo2.png',
    alt: 'Company 2 logo',
  },
  {
    id: '3',
    name: 'Company 3',
    logo: '/logo3.png',
    url: 'https://company3.com',
  },
];

describe('LogoWall Component', () => {
  describe('Rendering', () => {
    it('should render all logos', () => {
      render(<LogoWall logos={mockLogos} />);
      expect(screen.getByAltText('Company 1 logo')).toBeInTheDocument();
      expect(screen.getByAltText('Company 2 logo')).toBeInTheDocument();
      expect(screen.getByAltText('Company 3 logo')).toBeInTheDocument();
    });

    it('should render default title', () => {
      render(<LogoWall logos={mockLogos} />);
      expect(screen.getByText('Trusted by')).toBeInTheDocument();
    });

    it('should render custom title', () => {
      render(<LogoWall logos={mockLogos} title="Our Partners" />);
      expect(screen.getByText('Our Partners')).toBeInTheDocument();
    });

    it('should render subtitle when provided', () => {
      render(<LogoWall logos={mockLogos} subtitle="Leading companies trust us" />);
      expect(screen.getByText('Leading companies trust us')).toBeInTheDocument();
    });

    it('should not render title when showTitle is false', () => {
      render(<LogoWall logos={mockLogos} showTitle={false} />);
      expect(screen.queryByText('Trusted by')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should apply default item variant', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemVariant="default" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('bg-muted/30');
    });

    it('should apply ghost item variant', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemVariant="ghost" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('hover:bg-muted/30');
    });

    it('should apply outline item variant', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemVariant="outline" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('border', 'border-border');
    });

    it('should apply filled item variant', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemVariant="filled" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('bg-muted');
    });
  });

  describe('Columns', () => {
    it('should apply 2 column layout', () => {
      const { container } = render(<LogoWall logos={mockLogos} columns={2} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2');
    });

    it('should apply 4 column layout by default', () => {
      const { container } = render(<LogoWall logos={mockLogos} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'lg:grid-cols-4');
    });

    it('should apply 6 column layout', () => {
      const { container } = render(<LogoWall logos={mockLogos} columns={6} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-2', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-6');
    });
  });

  describe('Spacing', () => {
    it('should apply sm spacing', () => {
      const { container } = render(<LogoWall logos={mockLogos} spacing="sm" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-4');
    });

    it('should apply md spacing by default', () => {
      const { container } = render(<LogoWall logos={mockLogos} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-6');
    });

    it('should apply lg spacing', () => {
      const { container } = render(<LogoWall logos={mockLogos} spacing="lg" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-8');
    });
  });

  describe('Alignment', () => {
    it('should apply center alignment by default', () => {
      const { container } = render(<LogoWall logos={mockLogos} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('justify-items-center');
    });

    it('should apply start alignment', () => {
      const { container } = render(<LogoWall logos={mockLogos} alignment="start" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('justify-items-start');
    });

    it('should apply end alignment', () => {
      const { container } = render(<LogoWall logos={mockLogos} alignment="end" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('justify-items-end');
    });
  });

  describe('Item Sizes', () => {
    it('should apply sm item size', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemSize="sm" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('h-16');
    });

    it('should apply md item size by default', () => {
      const { container } = render(<LogoWall logos={mockLogos} />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('h-20');
    });

    it('should apply lg item size', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemSize="lg" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('h-24');
    });
  });

  describe('Hover Effects', () => {
    it('should apply scale hover by default', () => {
      const { container } = render(<LogoWall logos={mockLogos} />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('hover:scale-105');
    });

    it('should apply lift hover', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemHover="lift" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('hover:-translate-y-1');
    });

    it('should apply glow hover', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemHover="glow" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('hover:shadow-lg');
    });
  });

  describe('Image Filters', () => {
    it('should apply grayscale filter by default', () => {
      const { container } = render(<LogoWall logos={mockLogos} />);
      const firstImage = container.querySelector('img');
      expect(firstImage).toHaveClass('grayscale');
    });

    it('should apply opacity filter', () => {
      const { container } = render(<LogoWall logos={mockLogos} imageFilter="opacity" />);
      const firstImage = container.querySelector('img');
      expect(firstImage).toHaveClass('opacity-60');
    });

    it('should apply blur filter', () => {
      const { container } = render(<LogoWall logos={mockLogos} imageFilter="blur" />);
      const firstImage = container.querySelector('img');
      expect(firstImage).toHaveClass('blur-sm');
    });

    it('should apply no filter', () => {
      const { container } = render(<LogoWall logos={mockLogos} imageFilter="none" />);
      const firstImage = container.querySelector('img');
      expect(firstImage).not.toHaveClass('grayscale', 'opacity-60', 'blur-sm');
    });
  });

  describe('Click Handlers', () => {
    it('should open URL in new tab when logo has URL', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<LogoWall logos={mockLogos} />);
      const firstLogo = screen.getByLabelText('Visit Company 1 website');
      fireEvent.click(firstLogo);
      
      expect(windowOpenSpy).toHaveBeenCalledWith('https://company1.com', '_blank', 'noopener,noreferrer');
      windowOpenSpy.mockRestore();
    });

    it('should call onLogoClick when provided', () => {
      const onLogoClick = vi.fn();
      render(<LogoWall logos={mockLogos} onLogoClick={onLogoClick} />);
      const firstLogo = screen.getByLabelText('Visit Company 1 website');
      fireEvent.click(firstLogo);
      
      expect(onLogoClick).toHaveBeenCalledWith(mockLogos[0]);
    });

    it('should handle logos without URL', () => {
      const onLogoClick = vi.fn();
      render(<LogoWall logos={mockLogos} onLogoClick={onLogoClick} />);
      const secondLogo = screen.getByLabelText('Logo of Company 2');
      fireEvent.click(secondLogo);
      
      expect(onLogoClick).toHaveBeenCalledWith(mockLogos[1]);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open URL on Enter key when logo has URL', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<LogoWall logos={mockLogos} />);
      const firstLogo = screen.getByLabelText('Visit Company 1 website');
      
      fireEvent.keyDown(firstLogo, { key: 'Enter' });
      
      expect(windowOpenSpy).toHaveBeenCalled();
      windowOpenSpy.mockRestore();
    });

    it('should open URL on Space key when logo has URL', () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      render(<LogoWall logos={mockLogos} />);
      const firstLogo = screen.getByLabelText('Visit Company 1 website');
      
      fireEvent.keyDown(firstLogo, { key: ' ' });
      
      expect(windowOpenSpy).toHaveBeenCalled();
      windowOpenSpy.mockRestore();
    });
  });

  describe('Max Logos', () => {
    it('should limit displayed logos when maxLogos is set', () => {
      render(<LogoWall logos={mockLogos} maxLogos={2} />);
      expect(screen.getByAltText('Company 1 logo')).toBeInTheDocument();
      expect(screen.getByAltText('Company 2 logo')).toBeInTheDocument();
      expect(screen.queryByAltText('Company 3 logo')).not.toBeInTheDocument();
    });

    it('should show "more partners" message when maxLogos is set', () => {
      render(<LogoWall logos={mockLogos} maxLogos={2} />);
      expect(screen.getByText(/\+1 more partner/)).toBeInTheDocument();
    });

    it('should show correct plural form for multiple remaining logos', () => {
      const manyLogos = Array.from({ length: 10 }, (_, i) => ({
        id: String(i),
        name: `Company ${i}`,
        logo: `/logo${i}.png`,
      }));
      render(<LogoWall logos={manyLogos} maxLogos={5} />);
      expect(screen.getByText(/\+5 more partners/)).toBeInTheDocument();
    });
  });

  describe('Show Count', () => {
    it('should show logo count when showCount is true', () => {
      render(<LogoWall logos={mockLogos} showCount />);
      expect(screen.getByText(/3 partners/)).toBeInTheDocument();
    });

    it('should show singular form for single logo', () => {
      render(<LogoWall logos={[mockLogos[0]]} showCount />);
      expect(screen.getByText(/1 partner/)).toBeInTheDocument();
    });

    it('should not show count by default', () => {
      render(<LogoWall logos={mockLogos} />);
      expect(screen.queryByText(/\d+ partner/)).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty logos array', () => {
      const { container } = render(<LogoWall logos={[]} />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(0);
    });

    it('should use index as key when id is missing', () => {
      const logosWithoutId = [
        { name: 'Company 1', logo: '/logo1.png' },
        { name: 'Company 2', logo: '/logo2.png' },
      ];
      render(<LogoWall logos={logosWithoutId} />);
      expect(screen.getByAltText('Company 1 logo')).toBeInTheDocument();
      expect(screen.getByAltText('Company 2 logo')).toBeInTheDocument();
    });

    it('should generate alt text when alt is missing', () => {
      const logosWithoutAlt = [
        { id: '1', name: 'Company 1', logo: '/logo1.png' },
      ];
      render(<LogoWall logos={logosWithoutAlt} />);
      expect(screen.getByAltText('Company 1 logo')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<LogoWall logos={mockLogos} className="custom-wall" />);
      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-wall');
    });

    it('should apply custom itemClassName', () => {
      const { container } = render(<LogoWall logos={mockLogos} itemClassName="custom-item" />);
      const firstItem = container.querySelector('.flex.items-center');
      expect(firstItem).toHaveClass('custom-item');
    });
  });
});

