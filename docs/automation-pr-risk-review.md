# PR Risk Review

## Summary

This PR adds a standalone `crm-landing/` static landing-page recreation for a CRM/AI SaaS hero concept. The implementation is mostly HTML/CSS with local image assets, screenshots/reference artifacts, design tokens, and a manual Figma upload helper script.

## Changed Files

- `crm-landing/index.html` - Defines the landing page structure, hero copy, navigation, dashboard cards, CTA links, SVG decorations, external fonts, and external avatar images.
- `crm-landing/styles.css` - Provides the complete visual treatment: layout, cards, typography, animations, backgrounds, logo strip, and responsive breakpoints.
- `crm-landing/package.json` - Adds a minimal package manifest with a local static-server command and a Figma push command.
- `crm-landing/scripts/push-to-figma.mjs` - Adds a Node script that reads a local preview PNG and calls the Figma REST API using `FIGMA_ACCESS_TOKEN`/`FIGMA_TOKEN`.
- `crm-landing/design-tokens.json` - Captures source links, target Figma metadata, palette, typography, effects, and page copy.
- `crm-landing/README.md` - Documents local preview steps, Figma import options, and design matching notes.
- `crm-landing/assets/*`, `crm-landing/artifacts/*`, `crm-landing/refs/*` - Adds local texture/badge assets plus generated screenshots and reference imagery used for visual comparison/import.

## Potential Risks

- Correctness: many CTA and navigation links use `href="#"`, so the page looks complete but has no real navigation or conversion behavior.
- Correctness: visual fidelity relies on external Google Fonts and `i.pravatar.cc` avatar URLs; the page may render differently or with missing avatars offline or under restricted network policies.
- Security/privacy: `scripts/push-to-figma.mjs` sends a local PNG to Figma with a personal access token. It is manual, but users should avoid committing/exporting real tokens and confirm the target file/node before running it.
- Performance: the PR adds several large PNG screenshots/reference artifacts, increasing repository size and checkout/download cost for files that may not be required at runtime.
- Maintainability: the page is a large single HTML file plus an 800+ line CSS file without component boundaries, linting, formatting, or regression checks.
- Accessibility: decorative and interactive elements are mostly static; keyboard focus states, reduced-motion behavior, and meaningful destinations for buttons/links are not yet verified.

## Suggested Tests

- Add a lightweight static validation step for HTML and CSS syntax.
- Add a link/resource check to catch broken local assets and placeholder `href="#"` links before release.
- Add visual regression screenshots for desktop and mobile widths to protect the recreated layout.
- Add accessibility checks with axe or Lighthouse, including keyboard navigation, contrast, focus visibility, and reduced-motion handling.
- Add a dry-run or mocked test for `push-to-figma.mjs` so token handling, missing artifact behavior, and failed Figma responses are covered without calling the live API.

## Recommended Next Action

Before merging, decide whether screenshots/reference PNGs belong in the repository, replace placeholder links with intended destinations or document them as mock-only, and add basic static/accessibility/visual checks for the new landing page.
