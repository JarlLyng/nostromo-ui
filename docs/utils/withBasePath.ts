/**
 * Helper function to prepend basePath to a path
 * basePath can be set via NEXT_PUBLIC_BASE_PATH environment variable
 * For custom domain (nostromo-ui.dev): NEXT_PUBLIC_BASE_PATH=""
 * For GitHub Pages: NEXT_PUBLIC_BASE_PATH="/nostromo-ui"
 */
export function withBasePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/nostromo-ui' : '')
  
  // Don't add basePath if path is already absolute or external
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path
  }
  
  // Remove leading slash from path if basePath already has trailing slash handling
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  
  return `${basePath}${cleanPath}`
}

