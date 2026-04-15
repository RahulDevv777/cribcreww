# Cribcreww 🏙️✨

**Live your city. In the moment.**

Cribcreww is the premium, Apple-inspired hyperlocal discovery engine designed to bridge the gap between static social platforms and reality. Think ultra-sleek UI, buttery smooth GSAP animations, native 3D Spline embeds, and real-time community engagement.

## Architecture & Stack

### Core Frontend 
This is an entirely bespoke, zero-dependency markup stack built for extreme performance, 100 on Lighthouse, and ultimate visual luxury.

- **`index.html`**: The highly semantic, fully-accessible structural spine. Engineered as a high-converting funnel incorporating floating 3D interfaces and "bento grid" structures.
- **`style.css`**: The design system. Features titanium-themed gradients (`linear-gradient(135deg, #e2e2e8...)`), ultra-subtle glassmorphism (`backdrop-filter`), flex-box/CSS grids for bento layouts, and exact typographic precision (`Inter` font stack).
- **`script.js`**: The brains of the interaction layer. Powered by `GSAP` to manage scroll timelines and handle 3D coordinate mapping for mouse-movement tilt calculations using custom quaternion math. Uses `@studio-freight/lenis` for the smoothest Apple-like momentum scrolling.

### External Libraries
- **GSAP & ScrollTrigger** - Animation sequencing
- **Lenis** - Momentum scrolling
- **Lucide Icons** - Clean vector iconography
- **Spline 3D Viewer** - Embedded premium 3D assets

---

## Technical Features

* **3D Glass Tilt Dynamics:** Implements mouse coordinate calculation applied to CSS transforms to rotate UI elements dynamically, giving a tangible "floating" effect.
* **Ambient Glow Systems:** Background orbs that pulse seamlessly to provide a "live" feel to the interface without breaking rendering performance.
* **Responsive Bento Layout:** Built on CSS Grid, seamlessly collapsing to single-column on mobile.
* **SEO Optimized:** Strategic hierarchy of tags (`H1` > `H2` > `H3`) and clear contrast ratios over 4.5:1.

## Getting Started

1. Simply serve the `index.html` file using standard HTTP servers:
   ```bash
   npx serve .
   ```
2. Navigate to `http://localhost:3000` to preview.

## Testing Standards

Quality engineering is paramount. Tests must assure the correct rendering of critical DOM nodes and prevent regressions on CTA endpoints.

Run minimal integrity testing using Node.js in the root directory:
```bash
node test.js
```
