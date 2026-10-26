# Captain Code — the Captain Command Centre

The site for [Claude Command Center](https://github.com/aswathas/claude-command-center):
a local control room over a Claude Code install — skills, plugins, MCP servers,
settings, memory and token telemetry.

**Live site:** https://aswathas.github.io/captain-code/

## What is in here

```
src/            the site itself — static HTML, CSS and JS, no framework
  index.html
  assets/css/main.css
  assets/js/main.js
  assets/img/    shield emblem + real dashboard screenshots
scripts/build.mjs   copies src/ to dist/
dist/               build output, served by GitHub Pages
```

## Build

```bash
node scripts/build.mjs
```

## Deploy

Pages serves the `gh-pages` branch from the repo root.

```bash
npm run build
git add dist
git commit -m "build: refresh dist"
git subtree push --prefix dist origin gh-pages
```

Or let the workflow do it — push to `main` and the
`Deploy to GitHub Pages` action publishes `dist/` automatically.

## Design

Brutalist black and white, Captain America field-manual energy:

- Anton for display, Barlow Condensed for body, IBM Plex Mono for data.
- Hard offset shadows, no border radius, thick 3px rules.
- Halftone dot fields on both the paper and the ink sections.
- An inverted scrolling ticker, numbered chapter stamps, and an engraved
  shield emblem.
- `prefers-reduced-motion` is respected; the layout is verified at 390px.

## Every number is measured

The figures on the site come from a real install of the command centre, not
from marketing copy:

| Figure | Value |
|---|---|
| skill folders | 181 (148 enabled, 33 parked) |
| installed plugins | 29 |
| global MCP servers | 5 |
| memory files | 31 |
| transcripts | 1,292 files, 869 MB |
| cold scan | 9.2 s |
| cached rescan | 0.13 s |

Re-measure with `npm run doctor` in the command centre repo.

## License

MIT. The dashboard itself is MIT and lives in
[aswathas/claude-command-center](https://github.com/aswathas/claude-command-center).
