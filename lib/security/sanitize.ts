import sanitizeHtml from 'sanitize-html'

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes script tags, event handlers, and other malicious content
 * while preserving safe formatting tags (b, i, u, p, h1-h6, ul, ol, li, etc.)
 */
export function sanitizeHtmlContent(html: string | null | undefined): string {
  if (!html || typeof html !== 'string') {
    return ''
  }

  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'h1', 'h2', 'h3', 'u', 'img', 'figure', 'figcaption', 'span'
    ]),
    allowedAttributes: {
      '*': ['class', 'style'],
      'a': ['href', 'target', 'rel'],
      'img': ['src', 'alt', 'width', 'height'],
    },
  })
}
