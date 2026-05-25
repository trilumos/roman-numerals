import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { toRoman, fromRoman, getBreakdown } from './src/converter.js';
import { getNearby, getChartRange, getAboutText, getPopularLinks } from './src/data.js';
import {
  buildPage, numberPage, reversePage, homePage,
  chartPage, howItWorksPage, extendedPage, aboutPage, birthdatePage
} from './src/template.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const SITE_URL = 'https://romannumeral.pages.dev';
const TODAY = new Date().toISOString().split('T')[0];

// ─── SETUP ───────────────────────────────────────────────────────────────────
const start = Date.now();

if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST, { recursive: true });
fs.mkdirSync(path.join(DIST, 'roman'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'chart'), { recursive: true });

// Load CSS and client JS (inline into every page)
const css = fs.readFileSync(path.join(__dirname, 'src/styles.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')   // strip block comments
  .replace(/\n\s*\n/g, '\n')           // collapse blank lines
  .trim();

const clientJs = fs.readFileSync(path.join(__dirname, 'src/client.js'), 'utf8').trim();

// Copy public files
const PUBLIC = path.join(__dirname, 'public');
for (const f of fs.readdirSync(PUBLIC)) {
  fs.copyFileSync(path.join(PUBLIC, f), path.join(DIST, f));
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function render(pageData) {
  return buildPage({ ...pageData, css, clientJs });
}

const allUrls = [];

function addUrl(loc, priority) {
  allUrls.push({ loc: `${SITE_URL}${loc}`, priority });
}

// ─── NUMBER PAGES (1–3999) ───────────────────────────────────────────────────
console.log('Generating number pages 1–3999...');
for (let n = 1; n <= 3999; n++) {
  const roman = toRoman(n);
  const breakdown = getBreakdown(n);
  const nearby = getNearby(n);
  const aboutText = getAboutText(n, roman);
  const chartRange = getChartRange(n);
  const data = numberPage({ n, roman, breakdown, nearby, aboutText, chartRange });
  let html = render(data);
  if (n >= 1900 && n <= 2099) {
    const callout = `<p class="bd-callout" style="font-family:var(--font-sans);font-size:13px;color:var(--ink-faint);margin-top:8px;">Born in ${n}? &rarr; <a href="/birthdate" style="color:var(--ink-soft);">Generate your birthdate in Roman numerals</a></p>`;
    html = html.replace('</main>', callout + '</main>');
  }
  write(path.join(DIST, `${n}.html`), html);
  addUrl(`/${n}`, '0.6');
}

// ─── REVERSE PAGES ───────────────────────────────────────────────────────────
console.log('Generating reverse Roman pages...');
for (let n = 1; n <= 3999; n++) {
  const roman = toRoman(n);
  const data = reversePage({ n, roman });
  write(path.join(DIST, 'roman', `${roman}.html`), render(data));
  addUrl(`/roman/${roman}`, '0.5');
}

// ─── CHART PAGES ─────────────────────────────────────────────────────────────
console.log('Generating chart pages...');

// 1-100
{
  const rows = [];
  for (let i = 1; i <= 100; i++) rows.push({ n: i, roman: toRoman(i) });
  const data = chartPage({ slug: '1-100', title: '1 to 100', rows, activeSlug: '1-100' });
  write(path.join(DIST, 'chart', '1-100.html'), render(data));
  addUrl('/chart/1-100', '0.8');
}

// 100-1000
{
  const rows = [];
  for (let i = 100; i <= 1000; i += (i < 200 ? 1 : i < 500 ? 5 : 10)) rows.push({ n: i, roman: toRoman(i) });
  const data = chartPage({ slug: '100-1000', title: '100 to 1,000', rows, activeSlug: '100-1000' });
  write(path.join(DIST, 'chart', '100-1000.html'), render(data));
  addUrl('/chart/100-1000', '0.8');
}

// 1000-3999
{
  const rows = [];
  for (let i = 1000; i <= 3999; i += (i < 1100 ? 1 : i < 2000 ? 10 : 50)) rows.push({ n: i, roman: toRoman(i) });
  const data = chartPage({ slug: '1000-3999', title: '1,000 to 3,999', rows, activeSlug: '1000-3999' });
  write(path.join(DIST, 'chart', '1000-3999.html'), render(data));
  addUrl('/chart/1000-3999', '0.8');
}

// Years (1900-2100)
{
  const rows = [];
  for (let i = 1900; i <= 2100; i++) rows.push({ n: i, roman: toRoman(i) });
  const data = chartPage({ slug: 'years', title: 'Common Years 1900–2100', rows, activeSlug: 'years' });
  write(path.join(DIST, 'chart', 'years.html'), render(data));
  addUrl('/chart/years', '0.8');
}

// Months
{
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const rows = monthNames.map((name, i) => ({ n: i + 1, roman: toRoman(i + 1), label: name }));
  // For months we hack the chartPage to add month names — do it inline
  const title = 'Months in Roman Numerals';
  const description = 'Roman numerals for each month of the year, 1 (January) through 12 (December).';
  const canonical = `${SITE_URL}/chart/months`;
  const schema = JSON.stringify({ "@context":"https://schema.org","@type":"Table","name":title });
  const chartLinks = [
    { slug: '1-100', label: '1–100' },
    { slug: '100-1000', label: '100–1,000' },
    { slug: '1000-3999', label: '1,000–3,999' },
    { slug: 'years', label: 'Years' },
    { slug: 'months', label: 'Months' },
    { slug: 'multiplication', label: 'Multiplication' },
  ];
  const quickRefHtml = `<div class="quick-ref"><div class="quick-ref-title">Base Symbols</div><div class="quick-ref-symbols">${[['I','1'],['V','5'],['X','10'],['L','50'],['C','100'],['D','500'],['M','1000']].map(([s,v])=>`<span class="quick-ref-pair"><span class="qr-symbol">${s}</span><span class="qr-value">=${v}</span></span>`).join('')}</div></div>`;
  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> Charts</p>
    <h1 class="page-heading">Months in Roman Numerals</h1>
    <p class="page-subtitle">The twelve months numbered I through XII.</p>
    <div class="chart-nav" style="margin-bottom:32px;">
      ${chartLinks.map(c=>`<a href="/chart/${c.slug}"${c.slug==='months'?' class="active"':''} >${c.label}</a>`).join('\n      ')}
    </div>
    <table class="chart-table">
      <thead><tr><th>Number</th><th>Month</th><th>Roman Numeral</th></tr></thead>
      <tbody>
        ${rows.map(r=>`<tr><td><a href="/${r.n}">${r.n}</a></td><td>${r.label}</td><td><a href="/roman/${r.roman}">${r.roman}</a></td></tr>`).join('\n        ')}
      </tbody>
    </table>
    ${quickRefHtml}
  `;
  write(path.join(DIST, 'chart', 'months.html'), render({ title, description, canonical, schema, body }));
  addUrl('/chart/months', '0.8');
}

// Multiplication 1×1 to 10×10
{
  const rows = [];
  for (let a = 1; a <= 10; a++) {
    for (let b = a; b <= 10; b++) {
      const product = a * b;
      rows.push({ label: `${a} × ${b}`, n: product, roman: toRoman(product) });
    }
  }
  const title2 = 'Multiplication Table — Roman Numerals';
  const description2 = 'Multiplication table 1 to 10 in Roman numerals.';
  const canonical2 = `${SITE_URL}/chart/multiplication`;
  const schema2 = JSON.stringify({ "@context":"https://schema.org","@type":"Table","name":title2 });
  const chartLinks2 = [
    { slug: '1-100', label: '1–100' },
    { slug: '100-1000', label: '100–1,000' },
    { slug: '1000-3999', label: '1,000–3,999' },
    { slug: 'years', label: 'Years' },
    { slug: 'months', label: 'Months' },
    { slug: 'multiplication', label: 'Multiplication' },
  ];
  const quickRef2 = `<div class="quick-ref"><div class="quick-ref-title">Base Symbols</div><div class="quick-ref-symbols">${[['I','1'],['V','5'],['X','10'],['L','50'],['C','100'],['D','500'],['M','1000']].map(([s,v])=>`<span class="quick-ref-pair"><span class="qr-symbol">${s}</span><span class="qr-value">=${v}</span></span>`).join('')}</div></div>`;
  const body2 = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> Charts</p>
    <h1 class="page-heading">Multiplication in Roman Numerals</h1>
    <p class="page-subtitle">Products 1×1 through 10×10 in Roman numeral form.</p>
    <div class="chart-nav" style="margin-bottom:32px;">
      ${chartLinks2.map(c=>`<a href="/chart/${c.slug}"${c.slug==='multiplication'?' class="active"':''} >${c.label}</a>`).join('\n      ')}
    </div>
    <table class="chart-table">
      <thead><tr><th>Expression</th><th>Result</th><th>Roman Numeral</th></tr></thead>
      <tbody>
        ${rows.map(r=>`<tr><td style="font-family:var(--font-mono)">${r.label}</td><td><a href="/${r.n}">${r.n}</a></td><td><a href="/roman/${r.roman}">${r.roman}</a></td></tr>`).join('\n        ')}
      </tbody>
    </table>
    ${quickRef2}
  `;
  write(path.join(DIST, 'chart', 'multiplication.html'), render({ title: title2, description: description2, canonical: canonical2, schema: schema2, body: body2 }));
  addUrl('/chart/multiplication', '0.8');
}

// ─── STATIC PAGES ─────────────────────────────────────────────────────────────
console.log('Generating static pages...');

// Homepage
{
  const data = homePage({ popularLinks: getPopularLinks() });
  write(path.join(DIST, 'index.html'), render(data));
  addUrl('/', '1.0');
}

// How it works
{
  const data = howItWorksPage();
  write(path.join(DIST, 'how-it-works.html'), render(data));
  addUrl('/how-it-works', '0.7');
}

// Extended
{
  const data = extendedPage();
  write(path.join(DIST, 'extended.html'), render(data));
  addUrl('/extended', '0.5');
}

// About
{
  const data = aboutPage();
  write(path.join(DIST, 'about.html'), render(data));
  addUrl('/about', '0.5');
}

// Birthdate generator
{
  const data = birthdatePage();
  write(path.join(DIST, 'birthdate.html'), render(data));
  addUrl('/birthdate', '0.8');
}

// ─── SITEMAP ─────────────────────────────────────────────────────────────────
console.log('Generating sitemap.xml...');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
write(path.join(DIST, 'sitemap.xml'), sitemap);

// ─── LLMS.TXT ────────────────────────────────────────────────────────────────
console.log('Generating llms.txt and og-image...');
const llmsTxt = `# Roman Numerals Reference

> A complete static reference for Roman numerals 1 to 3999. Every number has its own dedicated page.

## Contents

- /[number] — decimal to Roman (e.g. /1994 = MCMXCIV)
- /roman/[ROMAN] — reverse lookup (e.g. /roman/MCMXCIV = 1994)
- /chart/1-100, /chart/100-1000, /chart/1000-3999, /chart/years, /chart/months, /chart/multiplication
- /how-it-works — system explainer
- /extended — vinculum notation for numbers above 3999

## Rules

Symbols: I=1 V=5 X=10 L=50 C=100 D=500 M=1000
Subtractive pairs: IV=4 IX=9 XL=40 XC=90 CD=400 CM=900
Range: 1 to 3999

## Sitemap
${SITE_URL}/sitemap.xml
`;
write(path.join(DIST, 'llms.txt'), llmsTxt);

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#FAFAF7"/><rect x="0" y="0" width="8" height="630" fill="#8B2E2E"/><text x="80" y="280" font-family="Georgia, serif" font-size="110" font-weight="500" fill="#1A1A1A" letter-spacing="8">MMXXVI</text><text x="80" y="360" font-family="Georgia, serif" font-size="44" fill="#8A8A86">Roman Numerals Reference</text><text x="80" y="420" font-family="Georgia, serif" font-size="26" fill="#8B2E2E">romannumeral.pages.dev</text></svg>`;
write(path.join(DIST, 'og-image.svg'), ogSvg);

// ─── CLOUDFLARE HEADERS ───────────────────────────────────────────────────────
const headers = `/*
  Cache-Control: public, max-age=86400
/sitemap.xml
  Cache-Control: public, max-age=3600
/llms.txt
  Cache-Control: public, max-age=3600
`;
write(path.join(DIST, '_headers'), headers);

// ─── DONE ─────────────────────────────────────────────────────────────────────
const elapsed = ((Date.now() - start) / 1000).toFixed(1);
const fileCount = allUrls.length;
console.log(`\n✓ Done. Generated ${fileCount} pages in ${elapsed}s.`);
console.log(`  Dist folder: ${DIST}`);
console.log(`  Next: push to GitHub, connect to Cloudflare Pages, submit sitemap.`);