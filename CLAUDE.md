# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing website for CoreInsight Financial Advisory Ltd, a UK financial advisory business. Plain HTML/CSS/JS — no build step, no package manager, no framework. Deployed to Netlify (`netlify.toml`) at `coreinsightadvisory.co.uk`.

## Development

There is no build/lint/test tooling. To work on the site:

- Open the HTML files directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) so relative asset paths resolve correctly.
- There's a VS Code launch config ("Open index.html") that opens `index.html` in Edge for quick preview.
- Changes take effect on save/reload — no compilation step.

## Structure

- `index.html`, `about.html`, `services.html`, `contact.html` — the four pages of the site. Each is a full, independent HTML document (no templating/includes), so shared markup like the header/nav and footer is duplicated across all four files. When changing the nav, footer, or any shared section, edit all four pages identically.
- `assets/style.css` — single global stylesheet for the entire site. Uses CSS custom properties defined in `:root` for brand colors, spacing, typography, shadows, and transitions (`--color-primary`, `--spacing-*`, `--font-size-*`, etc.) — reuse these variables rather than hardcoding values.
- `assets/main.js` — single vanilla JS file (IIFE, no dependencies) handling the mobile nav toggle, escape-key/outside-click dismissal, and smooth-scroll for same-page anchor links.
- `assets/images/` — logo, headshot, and Open Graph share image.

## Conventions

- Every page repeats the same `<head>` block: description/keywords meta tags, Open Graph and Twitter Card tags (with absolute `https://coreinsightadvisory.co.uk/...` URLs), the stylesheet link, and favicon. Keep these in sync across pages and update the OG/Twitter tags together when copy changes.
- The contact form (`contact.html`) currently posts to `action="#"` — there is no backend/form handler wired up yet.
- `netlify.toml` sets CORS and cache headers for `/assets/images/*` (needed so the OG image is fetchable by social media crawlers/link-preview bots).
- Accessibility is a deliberate concern: skip link to `#main-content`, `aria-expanded`/`aria-controls` on the mobile menu toggle, focus management on smooth-scroll targets. Preserve these patterns when editing markup.
