# Sorry — a scroll-driven apology page

Two files: `index.html` and `script.js`. No build step, no framework, no dependencies besides a Google Fonts stylesheet for the handwriting font (falls back to system cursive if offline).

## Run it
Just double-click `index.html`, or serve it locally:

    python3 -m http.server 8000

then open http://localhost:8000

## What changed / why scroll felt broken before
The previous version wrote `left`/`top` and a CSS `drop-shadow` filter on every creature on every animation frame. With ~300 elements, `drop-shadow` in particular is very expensive to recomposite every frame (measured ~4x slower than without it), which made the whole page stutter and made scrolling feel unresponsive or "broken."

Fixes:
- Base position (`left`/`top`) is now set once per creature; per-frame updates only touch `transform`/`opacity`, which the browser can animate on the compositor without layout or repaint.
- The CSS `drop-shadow` filter on creatures was removed entirely and replaced with a cheap grounding shadow baked directly into each creature's own SVG (just another shape, not a filter) — same visual grounding, none of the cost.
- The hint text's pulsing CSS `animation` was fighting the fade-out class (animations override plain `opacity` changes on the same property), so it never actually hid — fixed by cancelling the animation in the `.hide` state.

## The reveal
- ~300 unique procedurally-generated SVG creatures (cats, pandas, bunnies, birds, flowers, a few original creature designs) fill the screen edge-to-edge, each with randomized colors, eye/mouth expressions, size, and idle animation.
- One scroll-progress value (0→1) drives everything: creatures curve outward away from center as you scroll, the center glows, and "Sorryyy......" is revealed left-to-right in a cursive handwriting font (Dancing Script) with a glowing pen-tip riding the leading edge, then gently settles and floats.
- Scrolling back up reverses the whole sequence smoothly.
- Respects `prefers-reduced-motion` and uses a smaller creature grid on mobile.
