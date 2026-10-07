import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
const page = readFileSync('src/app/page.tsx', 'utf8');
const css = readFileSync('src/app/globals.css', 'utf8');
for (const id of ['top', 'cara', 'tentang', 'koleksi', 'kebijakan', 'tujuan', 'testimoni', 'faq', 'artikel']) {
  assert.ok(page.includes(`id="${id}"`), `Missing section ${id}`);
}
assert.ok(page.includes('Data demo, bukan testimoni nyata.'));
assert.ok(page.includes('mod==="accent"'), 'DOA accent comparison regressed');
assert.ok(css.includes('prefers-reduced-motion'));
assert.ok(css.includes('.fishCard { min-height: 280px; }'));
assert.ok(statSync('public/hero-bg.mp4').size > 0);
console.log('Homepage source/asset checks passed. Not a browser visual test.');
