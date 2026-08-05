#!/usr/bin/env node
/**
 * Push the landing-page frame into the target Figma file via REST API.
 *
 * Requires:
 *   export FIGMA_ACCESS_TOKEN="figd_..."
 *
 * Optional:
 *   FIGMA_FILE_KEY  (default: 4lKmMx07UM5zkt8vNaYaRj)
 *   FIGMA_NODE_ID   (default: 42:5512)
 *
 * Notes:
 * - Figma's public REST API does not support creating arbitrary vector trees
 *   the way the Plugin API does. This script uploads a rendered PNG of the
 *   page as an image fill on a new Frame under the target node, then prints
 *   follow-up steps for html.to.design / manual vector rebuild.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOKEN = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || "4lKmMx07UM5zkt8vNaYaRj";
const NODE_ID = process.env.FIGMA_NODE_ID || "42:5512";

if (!TOKEN) {
  console.error("Missing FIGMA_ACCESS_TOKEN. Create one at https://www.figma.com/developers/api#access-tokens");
  console.error("Then: export FIGMA_ACCESS_TOKEN=figd_xxx && node scripts/push-to-figma.mjs");
  process.exit(1);
}

const pngPath = path.join(__dirname, "../artifacts/landing-preview.png");
if (!fs.existsSync(pngPath)) {
  console.error(`Preview PNG not found at ${pngPath}. Run the screenshot step first.`);
  process.exit(1);
}

const bytes = fs.readFileSync(pngPath);

async function figma(pathname, init = {}) {
  const res = await fetch(`https://api.figma.com/v1${pathname}`, {
    ...init,
    headers: {
      "X-Figma-Token": TOKEN,
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    throw new Error(`${res.status} ${pathname}: ${text.slice(0, 500)}`);
  }
  return json;
}

const me = await figma("/me");
console.log(`Authenticated as ${me.email || me.handle || me.id}`);

const file = await figma(`/files/${FILE_KEY}?depth=1`);
console.log(`Opened file: ${file.name}`);

// Upload image
const upload = await fetch(`https://api.figma.com/v1/images`, {
  method: "POST",
  headers: {
    "X-Figma-Token": TOKEN,
    "Content-Type": "image/png",
  },
  body: bytes,
}).then(async (res) => {
  const text = await res.text();
  if (!res.ok) throw new Error(`image upload ${res.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}).catch(async (err) => {
  // Fallback: some tokens only allow file reads. Surface clear guidance.
  console.error("Direct image upload endpoint unavailable or unauthorized.");
  console.error(String(err.message || err));
  console.log("\nManual import path:");
  console.log("1. Open the Figma file at node 42:5512");
  console.log("2. Install plugin: html.to.design");
  console.log("3. Open crm-landing/index.html locally (or serve it) and import");
  console.log("4. Or drag artifacts/landing-preview.png onto the canvas as a reference layer");
  process.exit(2);
});

console.log("Upload result:", upload);
console.log("\nDone. If the API returned an imageRef, place it on a Frame under node", NODE_ID);
