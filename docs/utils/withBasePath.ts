/**
 * Helper function to prepend basePath to a path
 * basePath can be set via NEXT_PUBLIC_BASE_PATH environment variable.
 * GitHub Pages, which is where the site is served: NEXT_PUBLIC_BASE_PATH="/nostromo-ui"
 * A custom domain at its root would set it to "".
 *
 * An earlier version named nostromo-ui.dev as that custom domain. It is not
 * registered, and neither the site nor anything else lives there.
 */
export function withBasePath(path: string): string {
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH !== undefined
      ? process.env.NEXT_PUBLIC_BASE_PATH
      : process.env.NODE_ENV === 'production'
        ? '/nostromo-ui'
        : ''
  
  // Don't add basePath if path is already absolute or external
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path
  }
  
  // Remove leading slash from path if basePath already has trailing slash handling
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  return `${basePath}${cleanPath}`
}
