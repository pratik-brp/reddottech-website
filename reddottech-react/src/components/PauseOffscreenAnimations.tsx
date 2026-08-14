import { useEffect } from "react";

const ANIMATED_SELECTOR = '[class*="animate-"]';
const PAUSE_MARGIN = "150px";

/**
 * Pauses CSS animations (infinite ones like orbs, marquees, floats) when the
 * element is scrolled well out of the viewport, and resumes them when it
 * comes back. Infinite blur/orb animations running everywhere offscreen are a
 * major source of compositor/raster jank, so this prevents the browser from
 * animating content nobody can see.
 *
 * One-shot entrance animations (GSAP, reveal, animate-in/out) are never
 * touched because only `animation-iteration-count: infinite` is paused.
 */
export function PauseOffscreenAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("IntersectionObserver" in window)) return;

    const cache = new WeakMap<Element, boolean>();
    const pausedNodes = new WeakSet<Element>();

    const isInfinite = (el: Element): boolean => {
      if (cache.has(el)) return cache.get(el)!;
      const cs = getComputedStyle(el);
      const infinite = cs.animationName !== "none" && cs.animationIterationCount === "infinite";
      cache.set(el, infinite);
      return infinite;
    };

    const setPaused = (el: Element, paused: boolean) => {
      if (!isInfinite(el)) return;
      const htmlEl = el as HTMLElement;
      if (paused) {
        htmlEl.style.animationPlayState = "paused";
        pausedNodes.add(el);
      } else if (pausedNodes.has(el)) {
        htmlEl.style.animationPlayState = "";
        pausedNodes.delete(el);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setPaused(entry.target, !entry.isIntersecting);
        }
      },
      { rootMargin: `${PAUSE_MARGIN} 0px ${PAUSE_MARGIN} 0px` },
    );

    let scanPending = false;
    const scan = (root: ParentNode) => {
      const nodes = root.querySelectorAll ? root.querySelectorAll(ANIMATED_SELECTOR) : [];
      nodes.forEach((el) => observer.observe(el));
      scanPending = false;
    };

    const scheduleScan = (root: ParentNode) => {
      if (scanPending) return;
      scanPending = true;
      requestAnimationFrame(() => scan(root));
    };

    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          const el = node as Element;
          if (el.matches && el.matches(ANIMATED_SELECTOR)) observer.observe(el);
          if (el.querySelectorAll && el.querySelectorAll(ANIMATED_SELECTOR).length > 0) {
            scheduleScan(el);
          }
        }
      }
    });

    if (document.body) mo.observe(document.body, { subtree: true, childList: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
