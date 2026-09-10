import DOMPurify from "dompurify";

/**
 * Sanitizes HTML and SVG strings using DOMPurify to prevent XSS attacks
 * while preserving rich educational diagrams, SVG shapes, and animations.
 * Safe for both SSR and client-side rendering.
 */
export function sanitizeHtml(html: string | undefined | null): string {
  if (!html) return "";
  if (typeof window === "undefined") {
    // In SSR context before browser hydration, strip dangerous script tags
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true, svg: true, svgFilters: true },
    ADD_TAGS: [
      "svg",
      "g",
      "circle",
      "rect",
      "line",
      "path",
      "ellipse",
      "text",
      "tspan",
      "defs",
      "marker",
      "animate",
      "animateMotion",
    ],
    ADD_ATTR: [
      "viewBox",
      "xmlns",
      "x",
      "y",
      "x1",
      "y1",
      "x2",
      "y2",
      "cx",
      "cy",
      "r",
      "rx",
      "ry",
      "width",
      "height",
      "fill",
      "fill-opacity",
      "stroke",
      "stroke-opacity",
      "stroke-width",
      "stroke-dasharray",
      "stroke-dashoffset",
      "text-anchor",
      "font-size",
      "font-weight",
      "font-style",
      "d",
      "marker-end",
      "markerWidth",
      "markerHeight",
      "refX",
      "refY",
      "orient",
      "attributeName",
      "from",
      "to",
      "values",
      "dur",
      "repeatCount",
      "path",
      "class",
      "style",
      "id",
    ],
  });
}

/**
 * Strips HTML tags and decodes common HTML entities into clean plain text.
 * Perfect for summaries, previews, cards, and meta tags.
 */
export function stripHtml(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
