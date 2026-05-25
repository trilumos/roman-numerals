# Birthdate Roman Numeral Generator — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/birthdate` page where users enter a date, see a live SVG preview, and download it for tattoos or wallpapers; also update nav/footer everywhere and fix converter limit text.

**Architecture:** Pure static generation — `birthdatePage()` is added to `src/template.js` and called from `build.js`. All interactivity is an inline `<script>` in the page body. `client.js` exposes `toRoman` on `window` so the birthdate script can reuse it without duplication.

**Tech Stack:** Node.js (no dependencies), vanilla JS, plain CSS, SVG string generation

---

## File Map

| File | Change |
|------|--------|
| `src/client.js` | Add `window.toRomanFn = toRoman;` at end of IIFE |
| `src/template.js` | Update `headerHtml()`, `footerHtml()`, `homePage()`, `howItWorksPage()`, `extendedPage()`; add `birthdatePage()` export |
| `src/styles.css` | Append birthdate-specific CSS classes |
| `build.js` | Import `birthdatePage`; add birth-year callout to year pages; add birthdate page generation block |

No new files. No new dependencies.

---

## Task 1: Expose `toRoman` on `window` in `client.js`

**Files:**
- Modify: `src/client.js:174`

`client.js` wraps everything in an IIFE so `toRoman` is not accessible to other scripts. The birthdate page script needs it. Add one line at the very end of the IIFE, just before the closing `})();`.

- [ ] **Step 1: Edit `src/client.js`**

Find the last two lines (currently):
```js
    function setErr(msg) { if (errEl) errEl.textContent = msg; }
  });
})();
```

Replace with:
```js
    function setErr(msg) { if (errEl) errEl.textContent = msg; }
  });
  window.toRomanFn = toRoman;
})();
```

- [ ] **Step 2: Verify manually**

Open any existing `dist/*.html` in a browser (run `node build.js` first if dist doesn't exist), open the console, and type `window.toRomanFn(1994)`. Expected output: `"MCMXCIV"`.

- [ ] **Step 3: Commit**

```bash
git add src/client.js
git commit -m "feat: expose toRoman on window for birthdate page reuse"
```

---

## Task 2: Update navbar and footer

**Files:**
- Modify: `src/template.js:43-72`

Every page uses `headerHtml()` and `footerHtml()`. Adding "Birthdate" here puts it on all 8,000+ pages at once.

- [ ] **Step 1: Edit `headerHtml()` in `src/template.js`**

Find:
```js
    <nav>
      <a href="/chart/1-100">Chart</a>
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About</a>
    </nav>
```

Replace with:
```js
    <nav>
      <a href="/chart/1-100">Chart</a>
      <a href="/birthdate">Birthdate</a>
      <a href="/how-it-works">How It Works</a>
      <a href="/about">About</a>
    </nav>
```

- [ ] **Step 2: Edit `footerHtml()` in `src/template.js`**

Find:
```js
    <a href="/chart/years">Years</a>
    <span class="footer-dot">&middot;</span>
    <a href="/how-it-works">How It Works</a>
```

Replace with:
```js
    <a href="/chart/years">Years</a>
    <span class="footer-dot">&middot;</span>
    <a href="/birthdate">Birthdate</a>
    <span class="footer-dot">&middot;</span>
    <a href="/how-it-works">How It Works</a>
```

- [ ] **Step 3: Commit**

```bash
git add src/template.js
git commit -m "feat: add Birthdate link to navbar and footer"
```

---

## Task 3: Fix converter limit text site-wide

**Files:**
- Modify: `src/template.js:258`, `src/template.js:392`, `src/template.js:410`, `src/template.js:419-420`

The converter already handles up to 3,999,999 (vinculum, in `client.js`). Only the *page count* (3,999 static pages) stays at 3,999. Everything describing what the *converter* can do gets updated.

- [ ] **Step 1: Fix `homePage()` — line 258**

Find:
```js
      <p>Convert any number from 1 to 3,999 instantly. Each number has a dedicated page with full breakdown.</p>
```

Replace with:
```js
      <p>Convert any number from 1 to 3,999,999 instantly. Each number from 1–3,999 has a dedicated page with full breakdown.</p>
```

- [ ] **Step 2: Fix `howItWorksPage()` — "The Range 1–3999" section**

Find:
```js
      <h2>The Range 1–3999</h2>
      <p>The standard Roman numeral system covers 1 to 3,999 (MMMCMXCIX). Numbers above this require either a different notation or are simply written with extra Ms (though this becomes unwieldy). See the <a href="/extended">Extended Notation</a> page for how the Romans handled larger numbers.</p>
```

Replace with:
```js
      <h2>The Range 1–3999</h2>
      <p>The standard Roman numeral system covers 1 to 3,999 (MMMCMXCIX). Numbers above this use vinculum (overline) notation — see the <a href="/extended">Extended Notation</a> page. The converter on this site supports extended notation up to 3,999,999.</p>
```

- [ ] **Step 3: Fix `extendedPage()` — two mentions**

Find:
```js
      <p>The standard Roman numeral system, using only I, V, X, L, C, D, and M, can represent numbers from 1 to 3,999. For larger numbers, classical authors used several extensions.</p>
```

Replace with:
```js
      <p>The standard Roman numeral system, using only I, V, X, L, C, D, and M, can represent numbers from 1 to 3,999. For larger numbers, classical authors used several extensions. The converter on this site supports vinculum notation up to 3,999,999.</p>
```

Find:
```js
      <h2>Why This Site Covers Only 1–3,999</h2>
      <p>Search demand for Roman numerals above 3,999 is minimal. Nearly all queries are for years (1–2099), small ordinals (chapter numbers, sports events, clock faces), and numbers 1–100. Vinculum notation is rarely used in modern contexts. This site focuses on the standard range where it is most useful.</p>
```

Replace with:
```js
      <h2>Individual Pages: 1–3,999</h2>
      <p>This site has dedicated pages for every number from 1 to 3,999. Search demand for numbers above 3,999 is minimal — nearly all queries are for years, ordinals, and numbers 1–100. The interactive converter (available on every page) handles extended vinculum notation up to 3,999,999.</p>
```

- [ ] **Step 4: Commit**

```bash
git add src/template.js
git commit -m "fix: update converter limit text from 3,999 to 3,999,999"
```

---

## Task 4: Add birthdate CSS to `styles.css`

**Files:**
- Modify: `src/styles.css` (append after line 686)

- [ ] **Step 1: Append to `src/styles.css`**

Add the following at the very end of the file:

```css
/* BIRTHDATE GENERATOR */
.bd-inputs {
  display: flex;
  gap: 16px;
}

.bd-inputs .converter-field select,
.bd-inputs .converter-field input[type="number"] {
  width: 100%;
  font-family: var(--font-mono);
  font-size: 16px;
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 10px 12px;
  outline: none;
  transition: border-color 150ms ease;
  appearance: auto;
}

.bd-inputs .converter-field select:focus,
.bd-inputs .converter-field input[type="number"]:focus {
  border-color: var(--ink-faint);
}

.bd-controls {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.bd-toggle-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bd-toggle-label {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-faint);
}

.bd-toggle {
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 5px 14px;
  cursor: pointer;
  transition: background 150ms, color 150ms, border-color 150ms;
}

.bd-toggle:hover {
  background: var(--hover);
  color: var(--ink);
}

.bd-toggle.active {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

.bd-preview {
  border: 1px solid var(--rule);
  border-radius: 6px;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  overflow: hidden;
  background: var(--surface);
}

.bd-preview svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.bd-placeholder {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--ink-faint);
  text-align: center;
  padding: 48px 24px;
}

.bd-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 48px;
}

.bd-btn-primary {
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--bg);
  background: var(--accent);
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: opacity 150ms;
}

.bd-btn-primary:hover { opacity: 0.85; }

.bd-btn-secondary {
  font-family: var(--font-sans);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background 150ms, color 150ms;
}

.bd-btn-secondary:hover {
  background: var(--hover);
  color: var(--ink);
}

.bd-callout {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--ink-soft);
}

.bd-callout a { color: var(--ink); }

@media (max-width: 600px) {
  .bd-inputs { flex-direction: column; }
  .bd-controls { flex-direction: column; gap: 12px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles.css
git commit -m "feat: add CSS for birthdate generator page"
```

---

## Task 5: Add `birthdatePage()` to `template.js`

**Files:**
- Modify: `src/template.js` (add before the `escHtml` export at the end)

This is the largest task. The function returns the full page HTML including an inline script for all interactivity. The script uses `var` throughout (no template literals, no arrow functions) so it can be safely embedded inside the outer template literal without escaping conflicts.

- [ ] **Step 1: Add `birthdatePage` export to `src/template.js`**

Insert the following **before** the `export function escHtml` line (currently line 463):

```js
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

```

- [ ] **Step 2: Commit**

```bash
git add src/template.js
git commit -m "feat: add birthdatePage() template function with SVG generator"
```

---

## Task 6: Wire up in `build.js`

**Files:**
- Modify: `build.js:7-9` (import line)
- Modify: `build.js:56-65` (number pages loop — add birth-year callout)
- Modify: `build.js:217-222` (after About page block)

Three separate edits to `build.js`.

- [ ] **Step 1: Add `birthdatePage` to the import**

Find:
```js
import {
  buildPage, numberPage, reversePage, homePage,
  chartPage, howItWorksPage, extendedPage, aboutPage
} from './src/template.js';
```

Replace with:
```js
import {
  buildPage, numberPage, reversePage, homePage,
  chartPage, howItWorksPage, extendedPage, aboutPage, birthdatePage
} from './src/template.js';
```

- [ ] **Step 2: Add birth-year internal link inside the number pages loop**

Find the number pages loop block:
```js
for (let n = 1; n <= 3999; n++) {
  const roman = toRoman(n);
  const breakdown = getBreakdown(n);
  const nearby = getNearby(n);
  const aboutText = getAboutText(n, roman);
  const chartRange = getChartRange(n);
  const data = numberPage({ n, roman, breakdown, nearby, aboutText, chartRange });
  write(path.join(DIST, `${n}.html`), render(data));
  addUrl(`/${n}`, '0.6');
}
```

Replace with:
```js
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
```

- [ ] **Step 3: Add birthdate page generation after the About block**

Find:
```js
// About
{
  const data = aboutPage();
  write(path.join(DIST, 'about.html'), render(data));
  addUrl('/about', '0.5');
}

// ─── SITEMAP
```

Replace with:
```js
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

// ─── SITEMAP
```

- [ ] **Step 4: Add homepage callout in `src/template.js` `homePage()`**

Find in `homePage()`:
```js
      <p style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);">
        Numbers above 3,999? See the <a href="/extended" style="color:var(--ink);">Extended Notation</a> page for vinculum (overline) notation.
      </p>
```

Replace with:
```js
      <p style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);">
        Numbers above 3,999? See the <a href="/extended" style="color:var(--ink);">Extended Notation</a> page for vinculum (overline) notation.
      </p>
      <p style="font-family:var(--font-sans);font-size:14px;color:var(--ink-soft);margin-top:8px;">
        Planning a tattoo or making a wallpaper? Try the <a href="/birthdate" style="color:var(--ink);">Birthdate Generator &rarr;</a>
      </p>
```

- [ ] **Step 5: Commit**

```bash
git add build.js src/template.js
git commit -m "feat: wire birthdatePage into build, add internal links"
```

---

## Task 7: Build, verify, and push to GitHub

**Files:** None modified — this task runs and validates.

- [ ] **Step 1: Run the build**

```bash
node build.js
```

Expected output ends with:
```
✓ Done. Generated 8008 pages in X.Xs.
```

(8008 = previous count + 1 for birthdate)

- [ ] **Step 2: Open birthdate page in browser**

Open `dist/birthdate.html` in a browser (via a local server or directly). Verify:
- Page loads with no console errors
- Day, Month, Year inputs are present
- Horizontal/Vertical and Dark/Light toggles are present
- No SVG shown yet (placeholder visible)

- [ ] **Step 3: Test the golden path**

Select Day=14, Month=March, Year=1994. Verify:
- Preview shows `XIV · III · MCMXCIV` horizontally on a dark background
- "Download SVG" and "Copy text" buttons appear
- Click "Download SVG" → a file named `roman-date-XIV-III-MCMXCIV.svg` downloads
- Open the downloaded SVG in a browser → looks identical to the preview
- Click "Copy text" → button briefly says "Copied!" → clipboard contains `XIV · III · MCMXCIV`

- [ ] **Step 4: Test orientation and theme toggles**

With the same date:
- Click "Vertical" → preview switches to stacked layout (XIV, dot, III, dot, MCMXCIV)
- Click "Light" → preview switches to white background with dark text
- Click "Horizontal" → back to one-line layout
- Download SVG in each combination and confirm the file matches what was shown

- [ ] **Step 5: Check nav and footer on another page**

Open `dist/1994.html`. Verify:
- Navbar contains "Birthdate" link between Chart and How It Works
- Footer contains "Birthdate" link after Years
- Page has "Born in 1994?" callout near the bottom

Open `dist/100.html`. Verify the "Born in?" callout is NOT present (100 is outside 1900–2099).

- [ ] **Step 6: Check sitemap**

Open `dist/sitemap.xml`. Search for `/birthdate`. It should be present with priority `0.8`.

- [ ] **Step 7: Add remote and push to GitHub**

```bash
git remote add origin https://github.com/trilumos/roman-numerals.git
git push -u origin main
```

If the remote already exists:
```bash
git remote set-url origin https://github.com/trilumos/roman-numerals.git
git push -u origin main
```

---

## Self-Review

**Spec coverage:**
- ✓ `/birthdate` page with SVG preview → Task 5
- ✓ Day/month/year inputs → Task 5
- ✓ Horizontal/vertical toggle → Task 5 (inline script)
- ✓ Dark/light theme toggle → Task 5 (inline script)
- ✓ Download SVG → Task 5 (inline script)
- ✓ Copy text → Task 5 (inline script)
- ✓ Navbar "Birthdate" link → Task 2
- ✓ Footer "Birthdate" link → Task 2
- ✓ Homepage birthdate callout → Task 6, Step 4
- ✓ Year pages 1900–2099 callout → Task 6, Step 2
- ✓ Converter limit text updated → Task 3
- ✓ Sitemap entry → Task 6 Step 3 (via `addUrl`)
- ✓ `toRoman` exposed on window → Task 1

**Type consistency:** `_romans.day / .month / .year` used consistently in download and copy handlers. `orientation` and `theme` JS variables match `data-bd-orient` and `data-bd-theme` HTML attribute values (`'horizontal'`, `'vertical'`, `'dark'`, `'light'`).

**No placeholders:** All code steps contain complete, runnable code.
