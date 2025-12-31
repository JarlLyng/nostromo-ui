import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Gallery } from '../gallery';

const mockImages = [
  {
    id: '1',
    src: '/image1.jpg',
    alt: 'Image 1',
    title: 'Title 1',
    description: 'Description 1',
  },
  {
    id: '2',
    src: '/image2.jpg',
    alt: 'Image 2',
    thumbnail: '/thumb2.jpg',
  },
  {
    id: '3',
    src: '/image3.jpg',
    alt: 'Image 3',
  },
];

describe('Gallery Component', () => {
  describe('Rendering', () => {
    it('should render all images', () => {
      render(<Gallery images={mockImages} />);
      expect(screen.getByAltText('Image 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image 2')).toBeInTheDocument();
      expect(screen.getByAltText('Image 3')).toBeInTheDocument();
    });

    it('should render image titles when provided', () => {
      const { container } = render(<Gallery images={mockImages} />);
      // Titles are shown on hover, so check if they exist in DOM
      const titleElements = container.querySelectorAll('h3');
      expect(titleElements.length).toBeGreaterThan(0);
    });

    it('should render image descriptions when provided', () => {
      const { container } = render(<Gallery images={mockImages} />);
      // Descriptions are shown on hover
      const descriptionElements = container.querySelectorAll('p');
      expect(descriptionElements.length).toBeGreaterThan(0);
    });
  });

  describe('Columns', () => {
    it('should apply 1 column layout', () => {
      const { container } = render(<Gallery images={mockImages} columns={1} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('should apply 3 column layout by default', () => {
      const { container } = render(<Gallery images={mockImages} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
    });

    it('should apply 4 column layout', () => {
      const { container } = render(<Gallery images={mockImages} columns={4} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4');
    });
  });

  describe('Spacing', () => {
    it('should apply sm spacing', () => {
      const { container } = render(<Gallery images={mockImages} spacing="sm" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-2');
    });

    it('should apply md spacing by default', () => {
      const { container } = render(<Gallery images={mockImages} />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-4');
    });

    it('should apply lg spacing', () => {
      const { container } = render(<Gallery images={mockImages} spacing="lg" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('gap-6');
    });
  });

  describe('Aspect Ratio', () => {
    it('should apply square aspect ratio by default', () => {
      const { container } = render(<Gallery images={mockImages} />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('aspect-square');
    });

    it('should apply video aspect ratio', () => {
      const { container } = render(<Gallery images={mockImages} itemAspectRatio="video" />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('aspect-video');
    });

    it('should apply portrait aspect ratio', () => {
      const { container } = render(<Gallery images={mockImages} itemAspectRatio="portrait" />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('aspect-[3/4]');
    });
  });

  describe('Hover Effects', () => {
    it('should apply scale hover by default', () => {
      const { container } = render(<Gallery images={mockImages} />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('hover:scale-105');
    });

    it('should apply zoom hover', () => {
      const { container } = render(<Gallery images={mockImages} itemHover="zoom" />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('hover:scale-110');
    });

    it('should apply lift hover', () => {
      const { container } = render(<Gallery images={mockImages} itemHover="lift" />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('hover:-translate-y-2');
    });
  });

  describe('Thumbnails', () => {
    it('should use thumbnail when showThumbnails is true and thumbnail exists', () => {
      render(<Gallery images={mockImages} showThumbnails />);
      const thumbnailImage = screen.getByAltText('Image 2');
      expect(thumbnailImage).toHaveAttribute('src', '/thumb2.jpg');
    });

    it('should use main image when thumbnail does not exist', () => {
      render(<Gallery images={mockImages} showThumbnails />);
      const mainImage = screen.getByAltText('Image 1');
      expect(mainImage).toHaveAttribute('src', '/image1.jpg');
    });
  });

  describe('Lightbox', () => {
    it('should open lightbox when image is clicked and showLightbox is true', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    it('should not open lightbox when showLightbox is false', () => {
      render(<Gallery images={mockImages} showLightbox={false} />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      const lightbox = document.querySelector('[role="dialog"]');
      expect(lightbox).not.toBeInTheDocument();
    });

    it('should close lightbox when close button is clicked', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const closeButton = screen.getByLabelText('Close lightbox');
        fireEvent.click(closeButton);
      });
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).not.toBeInTheDocument();
      });
    });

    it('should close lightbox on Escape key', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
      
      const lightbox = document.querySelector('[role="dialog"]');
      if (lightbox) {
        fireEvent.keyDown(lightbox, { key: 'Escape' });
      }
      
      await waitFor(() => {
        const lightboxAfter = document.querySelector('[role="dialog"]');
        expect(lightboxAfter).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Navigation', () => {
    it('should show previous button when not on first image', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const secondImage = screen.getByAltText('Image 2');
      fireEvent.click(secondImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const prevButton = screen.getByLabelText('Previous image');
        expect(prevButton).toBeInTheDocument();
      });
    });

    it('should show next button when not on last image', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const nextButton = screen.getByLabelText('Next image');
        expect(nextButton).toBeInTheDocument();
      });
    });

    it('should navigate to next image on ArrowRight key', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
      
      const lightbox = document.querySelector('[role="dialog"]');
      if (lightbox) {
        fireEvent.keyDown(lightbox, { key: 'ArrowRight' });
      }
      
      await waitFor(() => {
        const lightboxImage = document.querySelector('[role="dialog"] img');
        expect(lightboxImage).toHaveAttribute('alt', 'Image 2');
      }, { timeout: 3000 });
    });

    it('should navigate to previous image on ArrowLeft key', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const secondImage = screen.getByAltText('Image 2');
      fireEvent.click(secondImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
      
      const lightbox = document.querySelector('[role="dialog"]');
      if (lightbox) {
        fireEvent.keyDown(lightbox, { key: 'ArrowLeft' });
      }
      
      await waitFor(() => {
        const lightboxImage = document.querySelector('[role="dialog"] img');
        expect(lightboxImage).toHaveAttribute('alt', 'Image 1');
      }, { timeout: 3000 });
    });
  });

  describe('Image Counter', () => {
    it('should show image counter when multiple images', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
      });
    });

    it('should not show counter for single image', async () => {
      render(<Gallery images={[mockImages[0]]} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      await waitFor(() => {
        const counter = screen.queryByText(/\d+ \/ \d+/);
        expect(counter).not.toBeInTheDocument();
      });
    });
  });

  describe('onImageClick Handler', () => {
    it('should call onImageClick when image is clicked', () => {
      const onImageClick = vi.fn();
      render(<Gallery images={mockImages} onImageClick={onImageClick} />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      expect(onImageClick).toHaveBeenCalledWith(mockImages[0], 0);
    });

    it('should call onImageClick even when showLightbox is false', () => {
      const onImageClick = vi.fn();
      render(<Gallery images={mockImages} showLightbox={false} onImageClick={onImageClick} />);
      const firstImage = screen.getByAltText('Image 1');
      fireEvent.click(firstImage.closest('[role="button"]')!);
      
      expect(onImageClick).toHaveBeenCalledWith(mockImages[0], 0);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should open lightbox on Enter key', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      const imageButton = firstImage.closest('[role="button"]')!;
      
      fireEvent.keyDown(imageButton, { key: 'Enter' });
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });

    it('should open lightbox on Space key', async () => {
      render(<Gallery images={mockImages} showLightbox />);
      const firstImage = screen.getByAltText('Image 1');
      const imageButton = firstImage.closest('[role="button"]')!;
      
      fireEvent.keyDown(imageButton, { key: ' ' });
      
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]');
        expect(lightbox).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty images array', () => {
      const { container } = render(<Gallery images={[]} />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(0);
    });

    it('should use index as key when id is missing', () => {
      const imagesWithoutId = [
        { src: '/img1.jpg', alt: 'Image 1' },
        { src: '/img2.jpg', alt: 'Image 2' },
      ];
      render(<Gallery images={imagesWithoutId} />);
      expect(screen.getByAltText('Image 1')).toBeInTheDocument();
      expect(screen.getByAltText('Image 2')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to gallery', () => {
      const { container } = render(<Gallery images={mockImages} className="custom-gallery" />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('custom-gallery');
    });

    it('should apply custom itemClassName', () => {
      const { container } = render(<Gallery images={mockImages} itemClassName="custom-item" />);
      const firstItem = container.querySelector('.relative.overflow-hidden');
      expect(firstItem).toHaveClass('custom-item');
    });
  });
});

