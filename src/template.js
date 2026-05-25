// template.js — returns HTML strings for each page type

const SITE_URL = 'https://romannumeral.pages.dev';
const SITE_NAME = 'Roman Numerals';

export function buildPage({ title, description, canonical, schema, body, css, clientJs }) {
  const ogImage = `${SITE_URL}/og-image.svg`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${escHtml(description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${escHtml(title)}">
<meta property="og:description" content="${escHtml(description)}">
<meta property="og:image" content="${ogImage}">
<meta property="og:site_name" content="Roman Numerals">
<!-- Twitter Card -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escHtml(title)}">
<meta name="twitter:description" content="${escHtml(description)}">
<meta name="twitter:image" content="${ogImage}">
<style>${css}</style>
<script type="application/ld+json">${schema}</script>
</head>
<body>
${headerHtml()}
<main>${body}</main>
${footerHtml()}
<script>${clientJs}</script>
</body>
</html>`;
}

function headerHtml() {
  return `<header>
  <div class="header-inner">
    <a href="/" class="logo">Roman<span>&nbsp;Numerals</span></a>
    <nav>
      <a href="/chart/1-100">Chart</a>
      <a href="/birthdate">Birthdate</a>
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About</a>
    </nav>
  </div>
</header>`;
}

function footerHtml() {
  return `<footer>
  <div class="footer-inner">
    <a href="/">Home</a>
    <span class="footer-dot">&middot;</span>
    <a href="/chart/1-100">Chart 1–100</a>
    <span class="footer-dot">&middot;</span>
    <a href="/chart/years">Years</a>
    <span class="footer-dot">&middot;</span>
    <a href="/birthdate">Birthdate</a>
    <span class="footer-dot">&middot;</span>
    <a href="/how-it-works">How It Works</a>
    <span class="footer-dot">&middot;</span>
    <a href="/extended">Extended</a>
    <span class="footer-dot">&middot;</span>
    <a href="/about">About</a>
  </div>
</footer>`;
}

function converterWidget(defaultDecimal, defaultRoman) {
  return `<div class="converter-card">
  <div class="converter-title">Convert any number &mdash; 1 to 3,999,999</div>
  <div class="converter-fields">
    <div class="converter-field">
      <label>Decimal</label>
      <input type="text" data-input="decimal" value="${defaultDecimal}" placeholder="e.g. 1994" inputmode="numeric" maxlength="7">
    </div>
    <button class="swap-btn" title="Swap fields" aria-label="Swap">&#8597;</button>
    <div class="converter-field">
      <label>Roman Numeral</label>
      <input type="text" data-input="roman" value="${defaultRoman}" placeholder="e.g. MCMXCIV" style="text-transform:uppercase">
    </div>
  </div>
  <div class="converter-error"></div>
  <div class="extended-note" style="display:none"></div>
</div>`;
}

function quickRef() {
  return `<div class="quick-ref">
  <div class="quick-ref-title">Base Symbols</div>
  <div class="quick-ref-symbols">
    ${[['I','1'],['V','5'],['X','10'],['L','50'],['C','100'],['D','500'],['M','1000']]
      .map(([s,v]) => `<span class="quick-ref-pair"><span class="qr-symbol">${s}</span><span class="qr-value">=${v}</span></span>`).join('')}
  </div>
</div>`;
}

export function numberPage({ n, roman, breakdown, nearby, aboutText, chartRange }) {
  const title = `${n} in Roman Numerals - ${roman}`;
  const description = `${n} in Roman numerals is ${roman}. Learn how to write ${n} as a Roman numeral, with step-by-step breakdown and reference chart.`;
  const canonical = `${SITE_URL}/${n}`;

  const schema = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": `${n} in Roman Numerals`,
      "alternateName": roman,
      "description": `${n} written as a Roman numeral is ${roman}.`,
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": "Roman Numerals 1-3999"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `How do you write ${n} in Roman numerals?`,
          "acceptedAnswer": { "@type": "Answer", "text": `${n} is written as ${roman} in Roman numerals.` }
        },
        {
          "@type": "Question",
          "name": `What does ${roman} mean?`,
          "acceptedAnswer": { "@type": "Answer", "text": `${roman} represents the number ${n} in the Roman numeral system.` }
        },
        {
          "@type": "Question",
          "name": `How is ${n} formed in Roman numerals?`,
          "acceptedAnswer": { "@type": "Answer", "text": `${n} (${roman}) is formed by: ${breakdown.map(b => `${b.symbol} = ${b.value}`).join(', ')}.` }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL + "/" },
        { "@type": "ListItem", "position": 2, "name": `${n} in Roman Numerals`, "item": `${SITE_URL}/${n}` }
      ]
    }
  ]);

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> ${n} in Roman Numerals</p>
    <h1 class="page-heading">${n} in Roman Numerals</h1>

    <div class="answer-block">
      <hr class="answer-rule">
      <span class="answer-numeral">${roman}</span>
      <hr class="answer-rule">
      <p class="answer-caption">Roman numeral for ${n}</p>
    </div>

    <p class="answer-sentence">The number ${n} is written as <strong>${roman}</strong> in Roman numerals.</p>

    ${converterWidget(n, roman)}

    <div class="breakdown">
      <h2 class="section-heading">How ${roman} is formed</h2>
      <table class="breakdown-table">
        <tbody>
          ${breakdown.map(b => `<tr><td>${b.symbol}</td><td>${b.count > 1 ? `×${b.count}` : ''}</td><td>${b.value}</td></tr>`).join('\n          ')}
          <tr class="total-row"><td>${roman}</td><td></td><td>${n}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="nearby">
      <h2 class="section-heading">Nearby numbers</h2>
      <div class="nearby-grid">
        ${nearby.map(nb => `<a href="/${nb.n}" class="nearby-cell"><span class="nearby-num">${nb.n}</span><span class="nearby-roman">${nb.roman}</span></a>`).join('\n        ')}
      </div>
    </div>

    <div class="about">
      <h2 class="section-heading">About this number</h2>
      <p>${aboutText}</p>
    </div>

    ${quickRef()}

    <hr class="divider">
    <p style="font-family:var(--font-sans);font-size:13px;color:var(--ink-faint);">
      See also: <a href="/roman/${roman}" style="color:var(--ink-faint);">What is ${roman}?</a>
      &nbsp;&middot;&nbsp; <a href="/chart/${chartRange.slug}" style="color:var(--ink-faint);">Chart ${chartRange.label}</a>
    </p>
  `;

  return { title, description, canonical, schema, body };
}

export function reversePage({ n, roman }) {
  const title = `${roman} Roman Numeral - Value and Meaning`;
  const description = `${roman} is the Roman numeral for ${n}. Learn what ${roman} means, its decimal value, and how it is composed.`;
  const canonical = `${SITE_URL}/roman/${roman}`;

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": `${roman} Roman Numeral`,
    "alternateName": String(n),
    "description": `The Roman numeral ${roman} equals ${n} in decimal.`,
    "inDefinedTermSet": { "@type": "DefinedTermSet", "name": "Roman Numerals 1-3999" }
  });

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> Roman Numeral ${roman}</p>
    <span class="reverse-badge">Roman Numeral</span>
    <h1 class="page-heading">${roman} in Numbers</h1>

    <div class="answer-block">
      <hr class="answer-rule">
      <span class="answer-numeral">${n}</span>
      <hr class="answer-rule">
      <p class="answer-caption">Decimal value of ${roman}</p>
    </div>

    <p class="answer-sentence">The Roman numeral <strong>${roman}</strong> equals <strong>${n}</strong> in decimal.</p>

    ${converterWidget(n, roman)}

    <p style="margin-bottom:32px;">
      <a href="/${n}" style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);">
        &rarr; Full page for the number ${n}
      </a>
    </p>

    ${quickRef()}
  `;

  return { title, description, canonical, schema, body };
}

export function homePage({ popularLinks }) {
  const title = 'Roman Numerals — Convert, Learn & Reference';
  const description = 'Convert numbers to Roman numerals and back. Look up any number from 1 to 3999 with full breakdown, charts, and reference tables.';
  const canonical = SITE_URL + '/';

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Roman Numerals",
    "url": SITE_URL,
    "description": description
  });

  const body = `
    <div class="home-hero">
      <h1>Roman Numerals<br><em>Reference &amp; Converter</em></h1>
      <p>Convert any number from 1 to 3,999,999 instantly. Each number from 1–3,999 has a dedicated page with full breakdown.</p>
      ${converterWidget('', '')}
    </div>

    <div class="home-section">
      <div class="home-section-title">Popular numbers</div>
      <div class="popular-grid">
        ${popularLinks.map(p => `<a href="/${p.n}" class="popular-cell"><span class="pop-num">${p.n}</span><span class="pop-roman">${p.roman}</span></a>`).join('\n        ')}
      </div>
    </div>

    <div class="home-section">
      <div class="home-section-title">Reference Charts</div>
      <div class="chart-nav">
        <a href="/chart/1-100">1–100</a>
        <a href="/chart/100-1000">100–1,000</a>
        <a href="/chart/1000-3999">1,000–3,999</a>
        <a href="/chart/years">Common Years</a>
        <a href="/chart/months">Months</a>
        <a href="/chart/multiplication">Multiplication</a>
      </div>
    </div>

    <div class="home-section">
      <div class="home-section-title">Learn</div>
      <p style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);margin-bottom:8px;">
        New to Roman numerals? The <a href="/how-it-works" style="color:var(--ink);">How It Works</a> page explains the system from scratch — symbols, rules, and subtractive notation.
      </p>
      <p style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);">
        Numbers above 3,999? See the <a href="/extended" style="color:var(--ink);">Extended Notation</a> page for vinculum (overline) notation.
      </p>
      <p style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);margin-top:8px;">
        Planning a tattoo or making a wallpaper? Try the <a href="/birthdate" style="color:var(--ink);">Birthdate Generator &rarr;</a>
      </p>
    </div>
  `;

  return { title, description, canonical, schema, body };
}

export function chartPage({ slug, title: pageTitle, rows, activeSlug }) {
  const canonicalSlug = slug === 'years' || slug === 'months' || slug === 'multiplication' ? slug : slug;
  const title = `Roman Numerals ${pageTitle} — Reference Chart`;
  const description = `Complete Roman numeral reference chart for ${pageTitle}. Printable table with decimal and Roman numeral pairs.`;
  const canonical = `${SITE_URL}/chart/${canonicalSlug}`;

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Table",
    "name": `Roman Numerals ${pageTitle}`,
    "description": description
  });

  const chartLinks = [
    { slug: '1-100', label: '1–100' },
    { slug: '100-1000', label: '100–1,000' },
    { slug: '1000-3999', label: '1,000–3,999' },
    { slug: 'years', label: 'Years' },
    { slug: 'months', label: 'Months' },
    { slug: 'multiplication', label: 'Multiplication' },
  ];

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> Charts</p>
    <h1 class="page-heading">Roman Numerals: ${escHtml(pageTitle)}</h1>
    <p class="page-subtitle">Click any number to see its full page.</p>

    <div class="chart-nav" style="margin-bottom:32px;">
      ${chartLinks.map(c => `<a href="/chart/${c.slug}"${c.slug === activeSlug ? ' class="active"' : ''}>${c.label}</a>`).join('\n      ')}
    </div>

    <table class="chart-table">
      <thead><tr><th>Number</th><th>Roman Numeral</th></tr></thead>
      <tbody>
        ${rows.map(r => `<tr><td><a href="/${r.n}">${r.n}</a></td><td><a href="/roman/${r.roman}">${r.roman}</a></td></tr>`).join('\n        ')}
      </tbody>
    </table>

    ${quickRef()}
  `;

  return { title, description, canonical, schema, body };
}

export function howItWorksPage() {
  const title = 'How Roman Numerals Work — Complete Guide';
  const description = 'A complete guide to the Roman numeral system: symbols, rules, additive and subtractive notation, and how to read and write any number from 1 to 3999.';
  const canonical = `${SITE_URL}/how-it-works`;
  const schema = JSON.stringify({ "@context":"https://schema.org","@type":"Article","name":title,"description":description });

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> How It Works</p>
    <h1 class="page-heading">How Roman Numerals Work</h1>
    <div class="prose">
      <p>Roman numerals are a numeral system originating in ancient Rome. They remained the standard way of writing numbers throughout Europe well into the Late Middle Ages, and are still widely used today for clock faces, book chapters, film credits, and year inscriptions.</p>

      <h2>The Seven Symbols</h2>
      <p>The entire system is built from seven base symbols:</p>
      <table class="symbol-table">
        <thead><tr><th>Symbol</th><th>Value</th><th>Name</th></tr></thead>
        <tbody>
          <tr><td>I</td><td>1</td><td>Unus</td></tr>
          <tr><td>V</td><td>5</td><td>Quinque</td></tr>
          <tr><td>X</td><td>10</td><td>Decem</td></tr>
          <tr><td>L</td><td>50</td><td>Quinquaginta</td></tr>
          <tr><td>C</td><td>100</td><td>Centum</td></tr>
          <tr><td>D</td><td>500</td><td>Quingenti</td></tr>
          <tr><td>M</td><td>1000</td><td>Mille</td></tr>
        </tbody>
      </table>

      <h2>Additive Notation</h2>
      <p>When a symbol is followed by one of equal or lesser value, you add them. For example: VIII = 5 + 1 + 1 + 1 = 8. LXXX = 50 + 10 + 10 + 10 = 80.</p>

      <h2>Subtractive Notation</h2>
      <p>When a smaller symbol appears before a larger one, it is subtracted. Only six subtractive combinations are standard:</p>
      <ul>
        <li>IV = 4 (5 − 1)</li>
        <li>IX = 9 (10 − 1)</li>
        <li>XL = 40 (50 − 10)</li>
        <li>XC = 90 (100 − 10)</li>
        <li>CD = 400 (500 − 100)</li>
        <li>CM = 900 (1000 − 100)</li>
      </ul>

      <h2>Rules</h2>
      <ul>
        <li>I, X, C, and M can be repeated up to three times in succession.</li>
        <li>V, L, and D are never repeated.</li>
        <li>Only one small-value numeral may be subtracted from any given larger numeral.</li>
        <li>The largest possible numerals are written first (left to right).</li>
      </ul>

      <h2>Reading a Roman Numeral</h2>
      <p>To read MCMXCIV: work left to right. M = 1000. C before M = subtract 100, so CM = 900. X before C = subtract 10, so XC = 90. I before V = subtract 1, so IV = 4. Total: 1000 + 900 + 90 + 4 = 1994.</p>

      <h2>The Range 1–3999</h2>
      <p>The standard Roman numeral system covers 1 to 3,999 (MMMCMXCIX). Numbers above this use vinculum (overline) notation — see the <a href="/extended">Extended Notation</a> page. The converter on this site supports extended notation up to 3,999,999.</p>
    </div>
    ${quickRef()}
  `;

  return { title, description, canonical, schema, body };
}

export function extendedPage() {
  const title = 'Roman Numerals Above 3999 — Vinculum Notation';
  const description = 'How to write Roman numerals above 3,999 using vinculum (overline) notation, apostrophus, and other classical extensions.';
  const canonical = `${SITE_URL}/extended`;
  const schema = JSON.stringify({ "@context":"https://schema.org","@type":"Article","name":title,"description":description });

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> Extended Notation</p>
    <h1 class="page-heading">Roman Numerals Above 3,999</h1>
    <div class="prose">
      <p>The standard Roman numeral system, using only I, V, X, L, C, D, and M, can represent numbers from 1 to 3,999. For larger numbers, classical authors used several extensions. The converter on this site supports vinculum notation up to 3,999,999.</p>

      <h2>Vinculum (Overline) Notation</h2>
      <p>The most common extension places a horizontal bar (vinculum) over a numeral to multiply its value by 1,000. So V̄ = 5,000, X̄ = 10,000, L̄ = 50,000, C̄ = 100,000, D̄ = 500,000, M̄ = 1,000,000.</p>
      <p>Using this system: 4,000 = MV̄. 5,000 = V̄. 1,000,000 = M̄.</p>

      <h2>Apostrophus</h2>
      <p>An older notation used the apostrophus — a curved stroke — to represent 500 (IↃ) and 1,000 (CIↃ). Repeated strokes multiplied the value: CCIↃↃ = 10,000, CCCIↃↃↃ = 100,000.</p>

      <h2>Individual Pages: 1–3,999</h2>
      <p>This site has dedicated pages for every number from 1 to 3,999. Search demand for numbers above 3,999 is minimal — nearly all queries are for years, ordinals, and numbers 1–100. The interactive converter (available on every page) handles extended vinculum notation up to 3,999,999.</p>

      <h2>Practical Large Numbers</h2>
      <p>In modern usage, the year 2024 is MMXXIV. The Super Bowl uses Roman numerals: Super Bowl LVIII is 58. The Olympic Games use them: Paris 2024 is the XXXIII Olympiad. These all fall well within the standard 1–3,999 range.</p>
    </div>
    ${quickRef()}
  `;

  return { title, description, canonical, schema, body };
}

export function aboutPage() {
  const title = 'About — Roman Numerals Reference';
  const description = 'About this Roman numerals reference site. A complete static reference with individual pages for every number from 1 to 3999.';
  const canonical = `${SITE_URL}/about`;
  const schema = JSON.stringify({ "@context":"https://schema.org","@type":"WebPage","name":title,"description":description });

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> About</p>
    <h1 class="page-heading">About This Site</h1>
    <div class="prose">
      <p>This is a static reference site dedicated to Roman numerals. Every number from 1 to 3,999 has its own dedicated page showing the Roman numeral equivalent, a step-by-step breakdown, and related numbers.</p>

      <h2>What You'll Find Here</h2>
      <ul>
        <li>Individual pages for all 3,999 numbers in the standard Roman numeral range</li>
        <li>Reverse lookup pages for every Roman numeral (e.g., <a href="/roman/MCMXCIV">MCMXCIV</a>)</li>
        <li>Reference charts for ranges, common years, and months</li>
        <li>An interactive converter on every page</li>
        <li>A guide to <a href="/how-it-works">how the system works</a></li>
      </ul>

      <h2>Accuracy</h2>
      <p>All conversions follow the standard subtractive notation rules used in modern practice. Conversions are validated at build time using a round-trip check (number → Roman → number).</p>

      <h2>Privacy</h2>
      <p>This site uses no cookies, no trackers, and no analytics scripts. No data about your visit is collected or stored. Pages load with no external requests.</p>
    </div>
  `;

  return { title, description, canonical, schema, body };
}

export function birthdatePage() {
  const title = 'Birthdate in Roman Numerals — Tattoo & Wallpaper Generator';
  const description = 'Convert your birthdate to Roman numerals. Generate a beautiful XIV · III · MCMXCIV design to download as SVG for tattoos, wallpapers, and keepsakes.';
  const canonical = `${SITE_URL}/birthdate`;

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Birthdate Roman Numeral Generator',
    'description': description,
    'url': canonical,
    'applicationCategory': 'UtilitiesApplication'
  });

  const dayOptions = Array.from({ length: 31 }, (_, i) =>
    `<option value="${i + 1}">${i + 1}</option>`
  ).join('');

  const monthOptions = ['January','February','March','April','May','June',
    'July','August','September','October','November','December']
    .map((m, i) => `<option value="${i + 1}">${m}</option>`).join('');

  const inlineScript = `(function() {
  var MONTHS = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  var orientation = 'horizontal';
  var theme = 'dark';
  var _svg = null;
  var _romans = null;

  function buildSvg(day, month, year) {
    var dayR = window.toRomanFn(day);
    var monthR = window.toRomanFn(month);
    var yearR = window.toRomanFn(year);
    var bg = theme === 'dark' ? '#1A1A1A' : '#FAFAF7';
    var fg = theme === 'dark' ? '#FAFAF7' : '#1A1A1A';
    var accent = '#8B2E2E';
    var muted = '#8A8A86';
    var caption = day + ' \\u00b7 ' + MONTHS[month - 1].toUpperCase() + ' \\u00b7 ' + year;
    var f = "Georgia, 'Times New Roman', serif";
    if (orientation === 'horizontal') {
      var bdr = theme === 'light' ? '<rect x="1" y="1" width="798" height="298" fill="none" stroke="#E5E2DA" stroke-width="1"/>' : '';
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">'
        + '<rect width="800" height="300" fill="' + bg + '"/>' + bdr
        + '<text x="400" y="72" text-anchor="middle" font-family="' + f + '" font-size="12" letter-spacing="4" fill="' + muted + '">BORN</text>'
        + '<text x="400" y="165" text-anchor="middle" font-family="' + f + '" font-size="48" font-weight="500" letter-spacing="6">'
        + '<tspan fill="' + fg + '">' + dayR + '</tspan>'
        + '<tspan fill="' + accent + '"> \\u00b7 </tspan>'
        + '<tspan fill="' + fg + '">' + monthR + '</tspan>'
        + '<tspan fill="' + accent + '"> \\u00b7 </tspan>'
        + '<tspan fill="' + fg + '">' + yearR + '</tspan>'
        + '</text>'
        + '<text x="400" y="225" text-anchor="middle" font-family="' + f + '" font-size="13" letter-spacing="2" fill="' + muted + '">' + caption + '</text>'
        + '</svg>';
    }
    var bdrV = theme === 'light' ? '<rect x="1" y="1" width="398" height="498" fill="none" stroke="#E5E2DA" stroke-width="1"/>' : '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">'
      + '<rect width="400" height="500" fill="' + bg + '"/>' + bdrV
      + '<text x="200" y="65" text-anchor="middle" font-family="' + f + '" font-size="12" letter-spacing="4" fill="' + muted + '">BORN</text>'
      + '<text x="200" y="155" text-anchor="middle" font-family="' + f + '" font-size="52" font-weight="500" letter-spacing="6" fill="' + fg + '">' + dayR + '</text>'
      + '<text x="200" y="205" text-anchor="middle" font-family="' + f + '" font-size="20" fill="' + accent + '">\\u00b7</text>'
      + '<text x="200" y="275" text-anchor="middle" font-family="' + f + '" font-size="52" font-weight="500" letter-spacing="6" fill="' + fg + '">' + monthR + '</text>'
      + '<text x="200" y="325" text-anchor="middle" font-family="' + f + '" font-size="20" fill="' + accent + '">\\u00b7</text>'
      + '<text x="200" y="405" text-anchor="middle" font-family="' + f + '" font-size="52" font-weight="500" letter-spacing="6" fill="' + fg + '">' + yearR + '</text>'
      + '<text x="200" y="460" text-anchor="middle" font-family="' + f + '" font-size="13" letter-spacing="2" fill="' + muted + '">' + caption + '</text>'
      + '</svg>';
  }

  function update() {
    var day   = parseInt(document.getElementById('bd-day').value, 10);
    var month = parseInt(document.getElementById('bd-month').value, 10);
    var year  = parseInt(document.getElementById('bd-year').value, 10);
    var preview = document.getElementById('bd-preview');
    var actions = document.getElementById('bd-actions');
    if (!day || !month || !year || year < 1 || year > 3999) {
      preview.innerHTML = '<p class="bd-placeholder">Enter your date above to see your Roman numeral design.</p>';
      actions.style.display = 'none';
      _svg = null; _romans = null;
      return;
    }
    _svg = buildSvg(day, month, year);
    _romans = { day: window.toRomanFn(day), month: window.toRomanFn(month), year: window.toRomanFn(year) };
    preview.innerHTML = _svg;
    actions.style.display = 'flex';
  }

  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('bd-day').addEventListener('change', update);
    document.getElementById('bd-month').addEventListener('change', update);
    document.getElementById('bd-year').addEventListener('input', update);

    document.querySelectorAll('[data-bd-orient]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('[data-bd-orient]').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        orientation = btn.dataset.bdOrient;
        update();
      });
    });

    document.querySelectorAll('[data-bd-theme]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('[data-bd-theme]').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        theme = btn.dataset.bdTheme;
        update();
      });
    });

    document.getElementById('bd-download').addEventListener('click', function() {
      if (!_svg || !_romans) return;
      var blob = new Blob([_svg], { type: 'image/svg+xml' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'roman-date-' + _romans.day + '-' + _romans.month + '-' + _romans.year + '.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    var copyBtn = document.getElementById('bd-copy');
    copyBtn.addEventListener('click', function() {
      if (!_romans) return;
      var text = _romans.day + ' \\u00b7 ' + _romans.month + ' \\u00b7 ' + _romans.year;
      navigator.clipboard.writeText(text).then(function() {
        copyBtn.textContent = 'Copied!';
        setTimeout(function() { copyBtn.textContent = '\\u2398 Copy text'; }, 1500);
      });
    });
  });
})();`;

  const body = `
    <p class="breadcrumb"><a href="/">Home</a><span class="breadcrumb-sep">&rsaquo;</span> Birthdate</p>
    <h1 class="page-heading">Your Birthdate in Roman Numerals</h1>
    <p class="answer-sentence" style="margin-bottom:32px;">Enter your date below to generate a Roman numeral design for tattoos, wallpapers, or keepsakes.</p>

    <div class="converter-card" style="margin-bottom:24px;">
      <div class="converter-title">Enter your birthdate</div>
      <div class="bd-inputs">
        <div class="converter-field">
          <label>Day</label>
          <select id="bd-day">
            <option value="">&#8212; Day &#8212;</option>
            ${dayOptions}
          </select>
        </div>
        <div class="converter-field">
          <label>Month</label>
          <select id="bd-month">
            <option value="">&#8212; Month &#8212;</option>
            ${monthOptions}
          </select>
        </div>
        <div class="converter-field">
          <label>Year</label>
          <input type="number" id="bd-year" min="1" max="3999" placeholder="e.g. 1994">
        </div>
      </div>
    </div>

    <div class="bd-controls">
      <div class="bd-toggle-group">
        <span class="bd-toggle-label">Orientation</span>
        <button class="bd-toggle active" data-bd-orient="horizontal">&#8596; Horizontal</button>
        <button class="bd-toggle" data-bd-orient="vertical">&#8597; Vertical</button>
      </div>
      <div class="bd-toggle-group">
        <span class="bd-toggle-label">Theme</span>
        <button class="bd-toggle active" data-bd-theme="dark">Dark</button>
        <button class="bd-toggle" data-bd-theme="light">Light</button>
      </div>
    </div>

    <div id="bd-preview" class="bd-preview">
      <p class="bd-placeholder">Enter your date above to see your Roman numeral design.</p>
    </div>

    <div id="bd-actions" class="bd-actions" style="display:none;">
      <button id="bd-download" class="bd-btn-primary">&#8595; Download SVG</button>
      <button id="bd-copy" class="bd-btn-secondary">&#8600; Copy text</button>
    </div>

    <div class="about">
      <h2 class="section-heading">How it works</h2>
      <p>Your day, month, and year are each converted independently to Roman numerals using the standard system, then joined with the middle dot separator (&middot;). Day 14 becomes XIV. March (month 3) becomes III. The year 1994 becomes MCMXCIV. Combined: XIV &middot; III &middot; MCMXCIV.</p>
    </div>

    ${quickRef()}

    <script>${inlineScript}</script>
  `;

  return { title, description, canonical, schema, body };
}

export function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
