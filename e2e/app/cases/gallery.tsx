import { Gallery } from "@jarllyng/nostromo";

/**
 * Tab containment and scroll locking, neither of which jsdom implements.
 *
 * jsdom has no Tab key - focus never moves on its own - and no scrolling, so the
 * two halves of "modal" that the unit tests cannot reach are exactly the two a
 * browser answers directly.
 *
 * The tall spacer below gives the page something to scroll.
 */
const images = Array.from({ length: 3 }, (_, index) => ({
  id: String(index),
  src:
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#555"/><text x="200" y="160" font-size="48" fill="#fff" text-anchor="middle">${index + 1}</text></svg>`,
    ),
  alt: `Image ${index + 1}`,
  title: `Title ${index + 1}`,
}));

export function GalleryCase() {
  return (
    <div style={{ padding: 24 }}>
      <button type="button" data-testid="before">
        Before the gallery
      </button>
      <Gallery images={images} columns={3} />
      <button type="button" data-testid="after">
        After the gallery
      </button>
      <div style={{ height: "300vh" }} data-testid="spacer" />
    </div>
  );
}
