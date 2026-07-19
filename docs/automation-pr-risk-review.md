# PR Risk Review

## Summary

PR #18 adds a static draft homepage for a bookstore brand named "书屿".
The change is front-end only: one HTML page, one stylesheet, and one small script for reveal animation.

## Changed Files

- `bookstore/index.html` - Adds the bookstore landing page structure, hero content, navigation anchors, featured book list, external font loading, and Unsplash hero image.
- `bookstore/styles.css` - Adds responsive layout, typography, color tokens, hero image treatment, CTA/button styling, list styling, and reduced-motion handling for CSS animations.
- `bookstore/main.js` - Adds a guarded `IntersectionObserver` reveal effect for the featured section, with fallback behavior and reduced-motion opt-out.

## Potential Risks

- Correctness: product rows currently use `href="#"`, so clicking a book does not navigate and may unexpectedly jump the page when real catalog/detail behavior is expected.
- Security/privacy: Google Fonts and Unsplash are loaded from third-party origins; this adds availability, tracking/privacy, and future CSP considerations.
- Performance: the full-bleed remote hero image is requested at high resolution and may be expensive on slow/mobile connections unless image sizing or local assets are later optimized.
- Accessibility: the page has reduced-motion handling, but interactive links, focus states, color contrast over the hero image, and mobile keyboard navigation still need browser validation.
- Maintainability: book data is hard-coded in HTML, which is fine for a draft but will become difficult to update once inventory, pricing, localization, or detail pages are introduced.

## Suggested Tests

- Add a lightweight browser smoke test that opens `bookstore/index.html`, verifies the hero, CTA links, featured section, and footer render without console errors.
- Add responsive visual checks for desktop, tablet, and mobile widths, especially hero height, book-row wrapping, and CTA layout.
- Add accessibility checks for keyboard tab order, visible focus, heading structure, reduced-motion behavior, and contrast over the hero image.
- Add link-behavior tests once catalog or detail destinations replace the current `href="#"` placeholders.
- Add a performance budget or Lighthouse-style check before shipping the remote image/font dependencies to production.

## Recommended Next Action

Keep this as a draft until placeholder book links are replaced, external asset choices are reviewed, and basic browser/accessibility smoke tests pass.
