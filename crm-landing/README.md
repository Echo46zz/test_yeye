# Centralized CRM & AI Platform — Landing Page Recreation

High-fidelity recreation of [Dribbble shot #27541284](https://dribbble.com/shots/27541284--Centralized-CRM-AI-Platform-SaaS-Landing-Page-Design) by **Airzon Agency**.

## Findings

- **No public live URL** was found for this shot (Airzon portfolio / Framer / Behance search returned no matching deploy). Recreation is based on Dribbble media + published color palette.
- Target Figma file requires login; this environment has **no Figma MCP / access token**, so nodes cannot be written directly into [方案探索](https://www.figma.com/design/4lKmMx07UM5zkt8vNaYaRj/%E6%96%B9%E6%A1%88%E6%8E%A2%E7%B4%A2?node-id=42-5512).

## Preview locally

```bash
cd crm-landing
python3 -m http.server 5173
# open http://localhost:5173
```

## Import into Figma (node `42:5512`)

1. Open the Figma file and select frame `42:5512`.
2. Preferred: install **html.to.design**, capture `http://localhost:5173`, import as editable layers.
3. Or drag `artifacts/landing-preview.png` + `refs/original.png` onto the canvas as reference, then rebuild with Auto Layout using `design-tokens.json`.
4. If you have a personal access token:

```bash
export FIGMA_ACCESS_TOKEN=figd_xxx
node scripts/push-to-figma.mjs
```

## Design notes matched from the shot

- Diagonal hatch + film-grain overlays on off-white canvas
- Serif display headline + Plus Jakarta Sans UI
- HubSpot orange `#FF642B` CTAs / charts / AI icons
- Circuit-pattern fills inside AI cards
- Thin bezier flow lines with white node dots linking badge → cards
- Soft diffuse card shadows, ~22px radii
- Trust strip with edge fade on logo row
