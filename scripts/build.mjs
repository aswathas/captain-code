/**
 * build — Captain Code site build.
 *
 * The site is static: plain HTML, CSS and JS, no bundler, no dependencies.
 * The build copies src/ to dist/, which is what GitHub Pages serves from the
 * gh-pages branch.
 *
 *   node scripts/build.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

function copyTree(from, to) {
  fs.mkdirSync(to, { recursive: true });
  let bytes = 0;
  let files = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      const sub = copyTree(source, target);
      bytes += sub.bytes;
      files += sub.files;
    } else {
      fs.copyFileSync(source, target);
      bytes += fs.statSync(target).size;
      files += 1;
    }
  }
  return { bytes, files };
}

if (!fs.existsSync(src)) {
  console.error('No src/ directory — nothing to build.');
  process.exit(1);
}

fs.rmSync(dist, { recursive: true, force: true });
const { bytes, files } = copyTree(src, dist);

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('Build finished but dist/index.html is missing.');
  process.exit(1);
}

console.log(`Built dist/ — ${files} files, ${(bytes / 1024).toFixed(0)} KB`);
console.log('Publish with: git subtree push --prefix dist origin gh-pages');
