# Birthdate Roman Numeral Generator — Design Spec

Date: 2026-05-25

## Overview

Add a `/birthdate` page where users enter their birthdate and get a beautiful Roman numeral date they can download as SVG or copy as text — for tattoos, wallpapers, and keepsakes. Also update all "1 to 3,999" converter limit text site-wide to "1 to 3,999,999" to match the converter's actual capability.

## New Page: `/birthdate`

### File to create
`dist/birthdate.html` — generated at build time in `build.js` like all other static pages. No new source files needed; the page's interactive logic lives entirely in inline JS within the template.

### URL & metadata
- **URL:** `/birthdate`
- **Title:** `Birthdate in Roman Numerals — Tattoo & Wallpaper Generator`
- **Description:** `Convert your birthdate to Roman numerals. Generate a beautiful XIV · III · MCMXCIV design to download as SVG for tattoos, wallpapers, and keepsakes.`
- **Canonical:** `https://romannumeral.pages.dev/birthdate`
- **JSON-LD:** `WebApplication` schema with `name`, `description`, `url`, `applicationCategory: "UtilitiesApplication"`

### Page structure (top to bottom)

1. **Breadcrumb:** Home › Birthdate
2. **H1:** Your Birthdate in Roman Numerals
3. **Subheading (p):** Enter your date below to generate a Roman numeral design for tattoos, wallpapers, or keepsakes.
4. **Input row** — three dropdowns in a flex row:
   - Day: 1–31, `<select>` with options 1–31
   - Month: January–December, `<select>` with named options (value = 1–12)
   - Year: `<input type="number">` min=1 max=3999, placeholder "e.g. 1994"
5. **Controls row** — two toggle groups, inline:
   - Orientation: `Horizontal` | `Vertical` (default: Horizontal)
   - Theme: `Dark` | `Light` (default: Dark)
6. **SVG preview area** — a bordered box that renders the live SVG inline in the DOM. Updates instantly on any input/toggle change. Shows placeholder text "Enter your date above" when no date is complete.
7. **Action row:**
   - "Download SVG" button — triggers SVG blob download, filename `roman-date-XIV-III-MCMXCIV.svg`
   - "Copy text" button — copies the plain text string (e.g. `XIV · III · MCMXCIV`) to clipboard; button label briefly changes to "Copied!" then reverts
8. **How it works** section — short paragraph explaining day/month/year are each converted independently to Roman numerals and joined with `·`
9. **Quick reference row** (shared component, already exists in template.js)

### SVG design

The SVG is generated entirely in client-side JS. No canvas, no external libraries.

**Dimensions:**
- Horizontal: 800 × 300 px viewBox
- Vertical: 400 × 500 px viewBox

**Dark theme colors:**
- Background: `#1A1A1A`
- Primary text (numerals): `#FAFAF7`
- Accent (dots): `#8B2E2E`
- Caption: `#8A8A86`

**Light theme colors:**
- Background: `#FAFAF7`
- Border rect stroke: `#E5E2DA` (1px, inset)
- Primary text (numerals): `#1A1A1A`
- Accent (dots): `#8B2E2E`
- Caption: `#8A8A86`

**SVG content structure — Horizontal:**
```
"BORN" label (small caps, top center)
XIV · III · MCMXCIV  (large serif, center)
14 · MARCH · 1994    (small caption, bottom center)
```

**SVG content structure — Vertical:**
```
"BORN" label (small caps, top center)
XIV
·
III
·
MCMXCIV
14 · MARCH · 1994    (small caption, bottom)
```

**Font in SVG:** Use `font-family="Georgia, 'Times New Roman', serif"` — system serif that renders consistently in SVG across all platforms without embedding.

**Text sizing — Horizontal:**
- BORN label: 12px, letter-spacing 4
- Numeral line: 48px, font-weight 500, letter-spacing 6
- Caption: 13px, letter-spacing 2

**Text sizing — Vertical:**
- BORN label: 12px, letter-spacing 4
- Each numeral: 52px, font-weight 500, letter-spacing 6
- Dots: 20px
- Caption: 13px, letter-spacing 2

### Client-side JS for this page

All logic lives in an inline `<script>` at the bottom of the page body (not in `client.js`, which is shared). The birthdate JS:

1. Reads day/month/year selects and orientation/theme toggles
2. Validates: all three must be set and year must be 1–3999
3. Calls the existing `toRoman()` function (which is already inlined in `client.js`) — **reuse** it, don't duplicate it
4. Builds the SVG string
5. Sets the preview `innerHTML` to the SVG
6. On download: serializes the SVG element, creates a Blob, triggers `<a download>` click
7. On copy: uses `navigator.clipboard.writeText()`

**Important:** `client.js` is already inlined on every page and contains `toRoman()` as a local IIFE variable. The birthdate script must call `toRoman()` from within the same scope, or the template must expose `toRoman` on `window`. The cleanest fix: in `client.js`, add `window.toRomanFn = toRoman;` at the end of the IIFE so it's accessible to the birthdate inline script.

## Navigation changes

### Navbar (`template.js` → `headerHtml()`)
Add "Birthdate" link:
```
Home | Chart | Birthdate | How It Works | About
```
Position: between Chart and How It Works.

### Footer (`template.js` → `footerHtml()`)
Add to the middot-separated list:
```
Home · Chart 1–100 · Years · Birthdate · How It Works · Extended · About
```
Position: after Years, before How It Works.

## Internal links

### Homepage (`template.js` → `homePage()`)
Add a callout in the "Learn" section:
> Planning a tattoo or making a wallpaper? Try the [Birthdate Generator →](/birthdate)

### Year number pages (build.js)
For `n` in range 1900–2099 (likely birth years), add a line below the "See also" section in `numberPage()`:
> Born in [year]? → [Your birthdate in Roman numerals](/birthdate)

This is done in `build.js` directly: when `n >= 1900 && n <= 2099`, append an extra `<p>` to the rendered body HTML before writing, rather than adding a new parameter to `numberPage()`. This keeps `template.js` clean.

## Text updates — "3,999" → "3,999,999"

The interactive converter already supports up to 3,999,999 (vinculum notation, implemented in `client.js`). Several places in the static text still say "1 to 3,999" or "3,999" as the upper limit. These must all be updated.

**Files to update:**

1. `src/template.js`
   - `converterWidget()`: label text "Convert any number — 1 to 3,999,999" — **already correct**, no change needed
   - `homePage()`: "Convert any number from 1 to 3,999 instantly" → "Convert any number from 1 to 3,999,999 instantly"
   - `aboutPage()`: "Every number from 1 to 3,999 has its own dedicated page" — this is accurate (only static pages go to 3,999), keep as-is; clarify that the *converter* goes to 3,999,999 in a separate sentence if relevant
   - `extendedPage()`: references to "1 to 3,999" range — update to note the site converter handles up to 3,999,999
   - `howItWorksPage()`: "The standard Roman numeral system covers 1 to 3,999 (MMMCMXCIX)" — this is classically accurate; keep but add a note: "The converter on this site also supports extended notation up to 3,999,999."

2. `src/data.js`
   - No "3,999" text — no change needed

3. `build.js`
   - Comment in the llms.txt section: "Every number has a dedicated page" — keep "1 to 3999" here since that's the page count, not the converter range
   - `SITE_URL` references and loop bounds stay at 3999

4. `prd.md` — leave unchanged (historical reference document)

**Precise rule:** Only update text that describes the *converter's* capability. Text describing the *page count* (3,999 static pages) stays accurate at 3,999.

## Build integration

In `build.js`, add the birthdate page generation after the existing static pages block:

```js
// Birthdate generator
{
  const data = birthdatePage();
  write(path.join(DIST, 'birthdate.html'), render(data));
  addUrl('/birthdate', '0.8'); // included in sitemap.xml automatically via addUrl()
}
```

`addUrl('/birthdate', '0.8')` feeds into the same `allUrls` array that `build.js` uses to generate `sitemap.xml`, so the page will appear in the sitemap automatically at priority 0.8.

Add `birthdatePage` export to `src/template.js`.

## Acceptance criteria

- [ ] `/birthdate` page renders at `dist/birthdate.html` after `node build.js`
- [ ] Selecting day 14, month March (3), year 1994 shows `XIV · III · MCMXCIV` horizontally
- [ ] Switching to vertical shows each part stacked with `·` separators
- [ ] Dark/light theme toggle switches preview colors
- [ ] "Download SVG" downloads a valid `.svg` file named with the Roman numerals
- [ ] Downloaded SVG opens correctly in a browser and looks identical to the preview
- [ ] "Copy text" copies `XIV · III · MCMXCIV` and button briefly shows "Copied!"
- [ ] Navbar shows "Birthdate" link on every page
- [ ] Footer shows "Birthdate" link on every page
- [ ] Homepage Learn section has birthdate callout link
- [ ] Year pages 1900–2099 show "Born in [year]?" nudge with birthdate link
- [ ] No "1 to 3,999" converter-limit text remains in public-facing copy (except where it refers to static page count)
- [ ] `node build.js` completes without errors
- [ ] No browser console errors on the birthdate page
- [ ] No external network requests on page load
