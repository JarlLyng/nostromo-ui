import React, { useState, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@nostromo/ui-core';
import { Button } from '@nostromo/ui-core';

const galleryVariants = cva(
  'grid gap-4',
  {
    variants: {
      columns: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
      },
      spacing: {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
      },
    },
    defaultVariants: {
      columns: 3,
      spacing: 'md',
    },
  }
);

const galleryItemVariants = cva(
  'relative overflow-hidden rounded-lg bg-muted/50 transition-all duration-300 hover:scale-105 hover:shadow-lg',
  {
    variants: {
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
        wide: 'aspect-[16/9]',
      },
      hover: {
        none: '',
        scale: 'hover:scale-105',
        zoom: 'hover:scale-110',
        lift: 'hover:-translate-y-2',
      },
    },
    defaultVariants: {
      aspectRatio: 'square',
      hover: 'scale',
    },
  }
);

const lightboxVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm',
  {
    variants: {
      animation: {
        fade: 'animate-in fade-in duration-300',
        slide: 'animate-in slide-in-from-bottom duration-300',
        zoom: 'animate-in zoom-in duration-300',
      },
    },
    defaultVariants: {
      animation: 'fade',
    },
  }
);

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  thumbnail?: string;
}

export interface GalleryProps extends VariantProps<typeof galleryVariants> {
  images: GalleryImage[];
  className?: string;
  itemClassName?: string;
  showLightbox?: boolean;
  lightboxAnimation?: VariantProps<typeof lightboxVariants>['animation'];
  onImageClick?: (image: GalleryImage, index: number) => void;
  itemHover?: VariantProps<typeof galleryItemVariants>['hover'];
  itemAspectRatio?: VariantProps<typeof galleryItemVariants>['aspectRatio'];
  showThumbnails?: boolean;
  thumbnailSize?: 'sm' | 'md' | 'lg';
}

export const Gallery: React.FC<GalleryProps> = ({
  images,
  className,
  itemClassName,
  columns = 3,
  spacing = 'md',
  showLightbox = true,
  lightboxAnimation = 'fade',
  onImageClick,
  itemHover = 'scale',
  itemAspectRatio = 'square',
  showThumbnails = false,
  thumbnailSize: _thumbnailSize = 'md',
  ...props
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleImageClick = useCallback((image: GalleryImage, index: number) => {
    if (showLightbox) {
      setSelectedImage(image);
      setSelectedIndex(index);
    }
    onImageClick?.(image, index);
  }, [showLightbox, onImageClick]);

  const handleCloseLightbox = useCallback(() => {
    setSelectedImage(null);
    setSelectedIndex(-1);
  }, []);

  const handlePrevious = useCallback(() => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedImage(images[newIndex] || null);
      setSelectedIndex(newIndex);
    }
  }, [selectedIndex, images]);

  const handleNext = useCallback(() => {
    if (selectedIndex < images.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedImage(images[newIndex] || null);
      setSelectedIndex(newIndex);
    }
  }, [selectedIndex, images]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseLightbox();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  }, [handleCloseLightbox, handlePrevious, handleNext]);

  return (
    <>
      <div 
        className={cn(galleryVariants({ columns, spacing }), className)}
        {...props}
      >
        {images.map((image, index) => (
          <div
            key={image.id || index}
            className={cn(
              galleryItemVariants({ 
                aspectRatio: itemAspectRatio, 
                hover: itemHover 
              }),
              itemClassName
            )}
            role="button"
            tabIndex={0}
            onClick={() => handleImageClick(image, index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(image, index);
              }
            }}
            aria-label={`View image ${index + 1}: ${image.alt}`}
          >
            <img
              src={showThumbnails && image.thumbnail ? image.thumbnail : image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {(image.title || image.description) && (
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  {image.title && (
                    <h3 className="font-semibold text-sm sm:text-base">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="text-xs sm:text-sm text-white/80 mt-1">
                      {image.description}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedImage && showLightbox && (
        <div
          className={cn(lightboxVariants({ animation: lightboxAnimation }))}
          onClick={handleCloseLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
              id="lightbox-title"
            />
            
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-b-lg">
                {selectedImage.title && (
                  <h3 className="font-semibold text-lg mb-2">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="text-sm text-white/80">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                {selectedIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={handlePrevious}
                    aria-label="Previous image"
                  >
                    ←
                  </Button>
                )}
                {selectedIndex < images.length - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    →
                  </Button>
                )}
              </>
            )}

            {/* Close button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
              onClick={handleCloseLightbox}
              aria-label="Close lightbox"
            >
              ✕
            </Button>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
