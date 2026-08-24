/**
 * PauseOffscreenAnimations - Lightweight stub.
 * Heavy MutationObserver and getComputedStyle reflow loops removed to prevent
 * main-thread freezes on mobile devices. CSS will-change and transform-gpu handle
 * smooth rendering natively.
 */
export function PauseOffscreenAnimations() {
  return null;
}

