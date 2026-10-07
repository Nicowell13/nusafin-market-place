import assert from 'node:assert/strict';
import { readFileSync, statSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
// Execute real components with installed React/Next, not JSX string snapshots.
for (const ext of ['.tsx', '.ts']) require.extensions[ext] = (module, filename) => {
  const output = ts.transpileModule(readFileSync(filename, 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true, resolveJsonModule: true },
    fileName: filename,
  });
  module._compile(output.outputText, filename);
};
const root = path.resolve('src/app');
const Home = require(path.join(root, 'page.tsx')).default;
const { LanguageProvider } = require(path.join(root, 'language.tsx'));
const { PrototypePage } = require(path.join(root, 'prototype-page.tsx'));
const copy = JSON.parse(readFileSync(path.join(root, 'copy.json'), 'utf8'));
const render = (component, lang) => renderToStaticMarkup(React.createElement(LanguageProvider, { initialLanguage: lang }, component));
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
function sameShape(a, b, location = 'copy') {
  assert.equal(typeof a, typeof b, location);
  if (typeof a === 'string') { assert.ok(a.trim() && b.trim(), location); return; }
  assert.deepEqual(Object.keys(a), Object.keys(b), location);
  for (const key of Object.keys(a)) sameShape(a[key], b[key], `${location}.${key}`);
}
sameShape(copy.id, copy.en);
for (const lang of ['id', 'en']) {
  const t = copy[lang];
  const html = render(React.createElement(Home), lang);
  for (const id of ['top','cara','tentang','koleksi','kebijakan','tujuan','testimoni','faq','artikel','galeri']) assert.ok(html.includes(`id="${id}"`), `Missing ${id}`);
  // These visible strings must be rendered, not only present in an unused dictionary.
  for (const key of ['badge','hero','heroEm','lead','collectionNote','exception','reviewNotice','galleryNotice','footer','noContact','namePlaceholder','emailPlaceholder','messagePlaceholder','unsent','csNotice']) assert.ok(html.includes(escape(t[key])), `${lang}: ${key} not rendered`);
  for (const key of ['steps','trust','stats','doa','regions','faq','articles','reviews']) for (const row of t[key]) for (const text of row) assert.ok(html.includes(escape(text)), `${lang}: ${key} missing ${text}`);
  for (const text of t.nav) assert.ok(html.includes(escape(text)), `${lang}: navigation missing`);
  assert.ok(html.includes('aria-live="polite"') && html.includes('aria-pressed="true"'));
  assert.ok(html.includes('doaAccent'), 'DOA automatic threshold accent regressed');
  assert.ok(html.includes('loading="lazy"') && html.includes('srcSet='), 'Optimized lazy images missing');
  assert.ok(html.includes('autoPlay=""') && html.includes('muted=""') && html.includes('loop=""') && html.includes('preload="none"'));
  assert.ok(!html.includes('Hans Mueller') && !html.includes('hello@nusafin.example'));
  for (const kind of ['login','register','farmer','buyer','terms','privacy','dashboard','admin','catalog','checkout']) {
    const page = render(React.createElement(PrototypePage, { kind }), lang);
    assert.ok(page.includes(escape(t.home)) && page.includes(escape(t.language)), `${lang}: ${kind} shared controls`);
    if (['login','farmer','buyer'].includes(kind)) assert.ok(page.includes(escape(t.unsent)) && page.includes('required=""'), `${kind}: form notice/validation`);
    if (kind === 'catalog') assert.ok(page.includes(escape(t.collectionNote)) && page.includes('loading="lazy"'));
    if (['terms','privacy'].includes(kind)) for (const row of t[`${kind}Sections`]) for (const text of row) assert.ok(page.includes(escape(text)), `${kind}: untranslated legal copy`);
  }
}
const files = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]);
for (const file of files(root).filter(f => /\.(tsx|css|json)$/.test(f))) {
  const source = readFileSync(file,'utf8');
  assert.ok(!/data-theme|dataset\.theme|localStorage|prefers-color-scheme|themeBtn|toggleTheme/.test(source), `${file}: theme logic remains`);
  assert.ok(!/[\p{Emoji_Presentation}\uFE0F]/u.test(source), `${file}: emoji icon remains`);
  assert.ok(!source.includes('github.com/') && !source.includes('raw.githubusercontent'), `${file}: external asset hotlink`);
}
const css = readFileSync(path.join(root,'globals.css'),'utf8');
assert.ok(css.includes('color-scheme: dark;') && css.includes('--surface:   #0b1120;'));
assert.ok(css.includes('prefers-reduced-motion') && css.includes('.heroBgVideo { visibility: hidden; }'));
assert.ok(!css.includes('[data-reveal]'), 'SSR content hidden behind JS reveal');
assert.ok(css.includes('.fishCard { min-height: 280px; }'));
assert.ok(css.includes('.processTimeline li:nth-child(even)') && css.includes('.reviewGrid'));
assert.ok(statSync('public/hero-bg.mp4').size > 0);
for (const image of ['betta','discus','guppy','tetra','corydoras','hero-fish']) assert.ok(statSync(`public/images/${image}.png`).size > 0);
if (process.argv.includes('--built')) {
  const built = readFileSync('.next/server/app/index.html', 'utf8');
  for (const key of ['hero', 'lead', 'reviewNotice', 'exception', 'footer']) assert.ok(built.includes(escape(copy.id[key])), `Production HTML missing ${key}`);
  assert.ok(built.includes('processTimeline') && built.includes('loading="lazy"'), 'Production markup contracts missing');
  console.log('Production prerendered homepage HTML verified.');
}
console.log('Passed: actual ID/EN SSR for homepage + 10 prototype routes; dictionary parity; rules, demo disclosures, accessible review controls, night-only source, motion and local image/video contracts. Not browser or Lighthouse testing.');
