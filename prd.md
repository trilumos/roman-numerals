Programmatic SEO Site-Building Master Plan
Context for any AI assistant reading this
I'm building a portfolio of programmatic SEO websites on Cloudflare Pages (.pages.dev free subdomains, no custom domain initially). My goal is to validate which niches pull real organic traffic, then invest in domains and monetization only for proven winners.
My constraints:

Zero budget for tools, APIs, libraries, or services
Must use only free open-source libraries and free public datasets
Each site must be buildable in 4–12 hours with Claude Code
Static HTML output only (no React/Next.js/SPAs) for SEO and zero maintenance
Deploy to Cloudflare Pages on the free tier
Files I'm willing to learn about: HTML, CSS, vanilla JS, basic Node.js for build scripts

My strategy:

Build sites one at a time from the list below, starting with #1 Roman Numerals
Each site is deployed to its own .pages.dev subdomain
Submit sitemap to Google Search Console and Bing Webmaster Tools on day one
Walk away for 60 days, no touching
At month 2, check Search Console for each site: indexed page count, impressions, clicks, top queries
Winners (sites with growing impressions and real clicks) get: custom domain ($10 from Cloudflare Registrar), 301 redirects, AdSense application, 10–20 supporting blog posts
Losers stay deployed on .pages.dev indefinitely (free hosting) and ignored

End goal: Find 1–3 sites from this list that consistently earn $50–500/month from ads and affiliate links. Sell them in 18–24 months on Flippa for 30–40× monthly revenue.
Required for every site I build:

Static HTML generation via a Node.js build script (one template + one data file → thousands of pages)
sitemap.xml listing every URL, auto-generated at build time
robots.txt allowing all crawlers
JSON-LD schema markup on every page (FAQ, HowTo, DefinedTerm, or appropriate type)
Per-page <title> and <meta name="description"> optimized for the long-tail keyword
Internal linking between related pages (each page links to 5–10 contextually-related pages)
Mobile-responsive minimal CSS (no frameworks, just CSS)
Loads in under 1 second on 3G
No external API calls at runtime (all data bundled at build time)
No analytics scripts initially (don't slow down or trigger trust signals while indexing)
Cloudflare Pages automatic deployment via GitHub repo

What I want from any AI helping me:

Don't hand-wave on build steps — give exact file structure, exact code, exact commands
Flag any constraint I'm about to violate (paid API, slow library, JS-heavy build)
Suggest the data source upfront — where to grab the free open dataset
Give me the build, deploy, and GSC submission workflow as a sequence I can execute
Don't add features unless I ask. Minimum viable site, ship fast.


The 50 sites — ranked by buildability + organic traffic potential
Each entry includes: what the site does, the data source, approximate page count, estimated build time, and one sentence on why it's on this list.
Tier 1: Build these first (highest organic potential, simplest build)
1. Roman Numerals Converter

Pages: 3,999 (one per number 1–3999) plus reverse lookup
Data source: pure JS conversion logic, no dataset needed
Build: 4 hours
Why: tattoo planners, history students, date converters search constantly. Zero data dependencies.

2. Date Difference Calculator

Pages: thousands of "days between X and Y" combinations + countdown pages
Data: pure JS date math
Build: 6 hours
Why: project planners, anniversary searches, retirement planning. Evergreen.

3. IATA Airport Codes Database

Pages: 9,000+ airports
Data: free OpenFlights dataset on GitHub (CC-BY)
Build: 4 hours
Why: travelers and travel agents search specific codes. Travel CPC is high for later ads.

4. Named Colors Database

Pages: 1,500+ named colors
Data: free meodai/color-names or colornames.org datasets on GitHub
Build: 6 hours
Why: designers search exact color names. Long-tail with weak competition per color.

5. Unit Converter with Per-Conversion Pages

Pages: 5,000+ (every common unit × every other compatible unit)
Data: pure JS formulas
Build: 8 hours
Why: proven model — unitconverters.net makes ~$36k/month on exactly this pattern.

Tier 2: Strong picks, slightly bigger builds
6. Random Name Generator (by origin and category)

Pages: 600+ (50 origins × 6 types × 2 genders)
Data: free name datasets on GitHub (e.g., dominictarr/random-name, country-specific lists)
Build: 8 hours
Why: fantasy writers, D&D players, parents-to-be, business namers. Generators rank fast.

7. Country & City Facts Pages

Pages: 200 countries + ~5,000 major cities
Data: REST Countries API (free, fetch once at build), OpenStreetMap data
Build: 6 hours
Why: trivia and travel searches. Wikipedia is the giant but its pages are bloated; clean pages can win long-tail.

8. Time Zone Conversion Pages

Pages: 400+ time zones with pair conversions
Data: free IANA tz database
Build: 6 hours
Why: remote work boom = constant searching. "What time is X in Y" queries are massive.

9. HTTP Status Codes Reference

Pages: ~80 status codes
Data: free RFC docs
Build: 4 hours
Why: every developer searches "http 418" type queries. Niche but consistent.

10. ISO Country & Currency Codes Reference

Pages: ~400 (countries × currencies)
Data: free ISO public data
Build: 3 hours
Why: developers integrating forms search these. Quick to build.

11. Number to Words Converter

Pages: 1,000+ common numbers and amounts
Data: pure JS logic
Build: 5 hours
Why: check-writing, contract drafting, ESL learners.

12. Unicode / Emoji Character Lookup

Pages: 10,000+ Unicode codepoints
Data: free unicode.org tables
Build: 6 hours
Why: developers search "unicode for ✓" type queries; massive long-tail.

13. Cooking Substitutions Database

Pages: 1,500+ ingredient × context combinations
Data: compile from open cooking sources, may need manual curation for top 500
Build: 10 hours
Why: cooking searches are enormous; "buttermilk substitute" type queries get constant traffic.

14. CSS Properties Reference

Pages: 500+ CSS properties + values
Data: MDN data is open-source on GitHub
Build: 8 hours
Why: developers search "css [property]" constantly. MDN dominates but bloated; clean per-property pages can rank.

15. HTML Tags Reference

Pages: ~120 HTML tags + attributes
Data: open W3C/MDN data
Build: 6 hours
Why: same as CSS — consistent developer search demand.

Tier 3: Solid picks across diverse niches
16. Regex Pattern Library

Pages: 200+ common patterns ("email regex", "phone number regex by country")
Data: curated from free sources
Build: 8 hours
Why: every dev needs specific regex; very long-tail.

17. Programming Language Operator Reference

Pages: 200+ (operators across Python, JS, Java, C++, Rust, Go)
Data: language docs (open)
Build: 8 hours
Why: cross-language operator searches are underserved.

18. JSON Schema Pattern Library

Pages: 100+ common JSON schemas (email, address, person, product, etc.)
Data: schema.org and curated
Build: 6 hours
Why: API developers, data engineers search "json schema for X".

19. SQL Query Reference Pages

Pages: 500+ common queries by database (MySQL, PostgreSQL, SQLite, MSSQL × operations)
Data: curated from open docs
Build: 10 hours
Why: every developer Googles SQL syntax constantly.

20. Markdown Cheat Sheet with Per-Element Pages

Pages: 100+ specific patterns ("markdown for tables", "markdown for code block in Rust")
Data: open markdown specs
Build: 4 hours
Why: writers and developers search specific markdown syntax.

21. Lorem Ipsum / Filler Text Generator (themed)

Pages: 50+ themes (cat ipsum, hipster ipsum, corporate ipsum, etc.)
Data: curated word lists per theme
Build: 5 hours
Why: designers, developers need filler. Themed variants have weak competition.

22. Public Holidays Pages (per country, per year)

Pages: 200 countries × 5 years = 1,000 pages
Data: free date-holidays npm package or open holiday APIs
Build: 6 hours
Why: travelers, employers, planners search specific country holidays.

23. Driving Distance / Time Estimator (city pairs)

Pages: thousands of city-pair pages, no real-time routing
Data: precomputed distances from OpenStreetMap data
Build: 10 hours
Why: travel planning searches. Avoid real-time API costs by pre-computing.

24. Cryptocurrency Symbol Reference

Pages: 1,000+ coins
Data: free CoinGecko CSV export (one-time, not live)
Build: 4 hours
Why: crypto curiosity searches; pages don't need live prices.

25. Stock Ticker Symbol Lookup

Pages: 5,000+ public companies
Data: open SEC/exchange CSVs
Build: 5 hours
Why: "what does [ticker] stand for" queries are common; finance CPC for later ads.

Tier 4: Specific reference databases
26. Music Note Frequencies / Guitar Chord Reference

Pages: 300+ chords across instruments
Data: open chord databases (e.g., guitar tab data)
Build: 8 hours
Why: music students search specific chords constantly.

27. Periodic Table Element Pages

Pages: 118 elements + isotopes + compounds = 500+
Data: open chemistry datasets
Build: 6 hours
Why: students search elements. Saturated but per-isotope and per-compound pages are weaker.

28. Anatomy / Body Parts Reference

Pages: 500+ muscles, bones, organs with simple descriptions
Data: open anatomical datasets
Build: 8 hours
Why: medical students, anatomy curiosity. Wikipedia is bloated; clean pages win.

29. Latin Phrases & Translations

Pages: 1,000+ Latin phrases with origin, usage
Data: open Wiktionary data
Build: 6 hours
Why: writers, students, tattoo planners search these.

30. Bird Species Identification Pages

Pages: 10,000+ bird species
Data: eBird/Cornell open datasets
Build: 8 hours
Why: birders search specific species. eBird is the giant but app-focused; website wedge possible.

31. Plant / Flower Identification Pages

Pages: 5,000+ common plants
Data: open botanical datasets (e.g., USDA plants database)
Build: 8 hours
Why: gardeners search specific plant care constantly.

32. Dog Breed Information Pages

Pages: 400+ breeds with traits, care, history
Data: open breed datasets
Build: 6 hours
Why: pet owners search breeds before adopting. High affiliate fit (food, gear, training).

33. Cat Breed Information Pages

Pages: ~70 breeds + mixed-breed traits
Data: open breed datasets
Build: 5 hours
Why: same as dogs, smaller scope, easier to dominate.

34. Fish Species (Aquarium) Pages

Pages: 2,000+ aquarium-keepable species
Data: open aquarium datasets, FishBase
Build: 8 hours
Why: aquarium hobbyists are obsessive, well-known for spending.

Tier 5: Calculator and conversion sites
35. Loan / EMI Calculator with Country Variants

Pages: 200+ (country × loan type)
Data: pure JS calculation
Build: 6 hours
Why: highest ad CPC in finance niche.

36. Tax / Salary Calculator per Country

Pages: 100+ countries with current tax brackets
Data: open tax bracket datasets (verify per country)
Build: 10 hours
Why: people considering relocation, freelancers globally.

37. Tip Calculator with Country Etiquette

Pages: 195 countries
Data: curated tipping norms
Build: 5 hours
Why: travelers search this constantly.

38. Sleep Cycle / Bedtime Calculator

Pages: 1 main calculator + 50 supporting pages
Data: pure JS time math
Build: 5 hours
Why: massive search volume for sleep queries.

39. Pregnancy Due Date Calculator

Pages: 1 main calc + 40 week-by-week pages + 50 supporting articles
Data: pure JS
Build: 8 hours
Why: pregnancy queries have huge volume and affiliate value. YMYL caveat — Google holds health sites to higher standards.

40. Pet Age (Human Years) Calculator by Breed

Pages: 500+ (dog breeds + cat breeds + other pets)
Data: open lifespan data per breed
Build: 6 hours
Why: pet owners curious; pet affiliate niche is strong.

Tier 6: Game and entertainment
41. Movie Runtime / "How Long Is" Pages

Pages: 50,000+ movies
Data: free OMDb dump or IMDb non-commercial datasets
Build: 6 hours
Why: "how long is [movie]" queries are constant.

42. Book Reading Time Estimator (per book)

Pages: 10,000+ popular books
Data: Open Library API (free) for word counts/page counts
Build: 8 hours
Why: students, audiobook listeners search this.

43. Anime Watch Order / Episode Runtime

Pages: 5,000+ anime
Data: open MyAnimeList/AniList datasets
Build: 8 hours
Why: anime audiences are large and search-heavy.

44. Video Game Length ("How Long to Beat")

Pages: 20,000+ games
Data: open game datasets, careful with HowLongToBeat scraping
Build: 8 hours
Why: gamers search before buying.

45. Sports Historical Results ("Who Won X in Year Y")

Pages: thousands per sport × year combinations
Data: open sports data on Wikipedia/Wikidata
Build: 8 hours
Why: sports nostalgia searches are huge.

Tier 7: Specific utility tools (programmatic-friendly)
46. Social Media Image Dimensions per Platform

Pages: 200+ (25 platforms × image types)
Data: curated from platform docs
Build: 6 hours
Why: designers search these constantly. High Canva/design affiliate fit.

47. Font Pairing & Google Font Pages

Pages: 1,500+ Google Fonts
Data: free Google Fonts API metadata
Build: 8 hours
Why: designers search specific fonts and pairings.

48. SVG Icon Library Pages

Pages: 5,000+ icons from open icon sets (Feather, Heroicons, Tabler)
Data: free open icon repos on GitHub
Build: 8 hours
Why: developers and designers search "icon for X".

49. Color Contrast Checker + WCAG Per-Color Pairs

Pages: top 1,000 color pair combinations
Data: pure JS calculation
Build: 6 hours
Why: accessibility-focused devs search specific pairs.

50. Keyboard Shortcuts Reference (per app)

Pages: 200+ apps (VSCode, Figma, Photoshop, Excel, etc.) × OS
Data: curated from app docs
Build: 10 hours
Why: every user searches "shortcut for X in Y app" constantly.


Suggested build order (the path I recommend)
Wave 1 (Weekend 1): Build #1 Roman Numerals

Simplest, no data dependencies, clean validation of the whole workflow
Use this to learn the build → deploy → GSC submission flow end-to-end

Wave 2 (Weekend 2): Build #2 Date Difference + #3 IATA Codes

Two more sites, slightly more complex, different niches

Wave 3 (Weekend 3): Build #4 Named Colors + #5 Unit Converter

Higher page counts, more polish needed

Wave 4 onward: One site per weekend until you have 10–15 deployed
After Wave 4, stop building new sites and wait. The first sites should be approaching 60 days deployed. Check GSC, identify winners.

Standard tech stack for every site

Build tool: Plain Node.js script (no framework). One build.js file that reads data, fills templates, writes HTML.
Templating: Plain JS template literals or a tiny library like mustache (zero-dep).
Hosting: Cloudflare Pages (free, connect GitHub repo)
Deployment: Push to GitHub main branch → Cloudflare auto-builds and deploys
Sitemap: Generated by the build script as sitemap.xml
Schema markup: JSON-LD generated in template per page
CSS: ~100 lines of vanilla CSS, mobile-first, no framework
JS: Minimal — only what's needed for interactivity (e.g., converter inputs). Most pages should have zero JS.
Analytics: Add Plausible (paid) or Cloudflare Web Analytics (free) only AFTER first traffic appears


Per-site checklist before deploying

 Build script generates all pages without errors
 Each page has unique <title> matching its primary keyword
 Each page has unique <meta name="description"> (150–160 chars)
 Each page has 5–10 internal links to related pages
 sitemap.xml lists every URL with <lastmod> date
 robots.txt allows all crawlers
 JSON-LD schema is valid (test at search.google.com/test/rich-results)
 Mobile-responsive (test in Chrome DevTools mobile view)
 Page loads under 1 second
 Deployed to [site-name].pages.dev
 Sitemap submitted to Google Search Console
 Sitemap submitted to Bing Webmaster Tools
 Marked as "deployed" with date in your tracking spreadsheet


Tracking spreadsheet columns
For each site, track in a simple spreadsheet (Google Sheets is free):
ColumnValueSite namee.g., "Roman Numerals"URLe.g., roman-numerals.pages.devPage counte.g., 3,999Deploy dateYYYY-MM-DDDay 30 indexed pages(check GSC)Day 30 impressionsDay 30 clicksDay 60 indexed pagesDay 60 impressionsDay 60 clicksTop 5 queries at day 60Decision at day 60"double down" / "wait" / "ignore"

What "double down" looks like for winners
If a site at day 60 shows: 30%+ indexing rate, growing impressions, real clicks (>50/month), good queries:

Buy .com domain at Cloudflare Registrar (~$10/year)
Attach domain to Cloudflare Pages (one-click)
Set up 301 redirects from .pages.dev URLs to new domain
Apply for Google AdSense
Apply for Amazon Associates and Skimlinks
Add ad placements to template (sidebar + in-content + footer)
Add 10–20 supporting blog posts targeting related long-tail keywords
Get 3–5 backlinks from niche communities (don't spam)


Questions to ask any AI helping me build a specific site

What's the data source and is it really free with a usable license?
Show me the exact package.json and file structure
Show me the full build.js code that generates all pages
Show me the template HTML with all the SEO elements
Generate the sitemap.xml generator code
Show me the JSON-LD schema for this site's page type
Give me the GitHub repo setup commands
Give me the Cloudflare Pages deployment steps
Give me the Google Search Console submission steps
Give me the Bing Webmaster Tools submission steps


That's the master plan. Copy this whole thing into any new Claude chat and ask "help me build site #1 (Roman Numerals)" or whichever number you want to tackle next. The context above should be enough for any AI to pick up where we left off.
When you're ready to actually start building #1, come back and I'll walk you through it step by step with code.You said: okay let's start with roman numerals one.okay let's start with roman numerals one. But you said 4000 pages. What about number greater than 4000, also how will the website look. I am still confused about this, how will it have 4000 pages, can't we have one page converter, that when user inputs decimal, it converts to roman and displays it ?4:43 PMClaude responded: Great question — this is the central concept and I want to make sure it clicks before we write a single line of code.Great question — this is the central concept and I want to make sure it clicks before we write a single line of code. Let me explain it properly.
You're 100% right that one page works for users
If your only goal was "let users convert numbers," then yes — one page with an input box, JavaScript that converts, output displayed. Done. That's the app approach.
Two pages would even cover everything: one for decimal→roman, one for roman→decimal.
So why are we talking about 4,000 pages? Because the app approach gets zero Google traffic.
How Google traffic actually works
When someone wants to know what 1994 is in Roman numerals, they don't think "let me find a converter and type 1994." They type their actual question into Google:

"1994 in roman numerals"
"MCMXCIV meaning"
"what is 2024 in roman numerals"
"roman numeral for 50"

Google needs a page that already exists with that exact answer on it to rank in search results. A single converter page can't rank for 4,000 different number queries, because Google sees "one page about Roman numerals" — not 4,000 specific answers.
Here's the key insight: Google ranks pages, not apps.
A single-page converter is an app. A site with 4,000 pages, each pre-answering a specific question, is a search-optimized site. The user reading "1994 in Roman numerals" page doesn't know or care that it's auto-generated — they see their answer instantly.
The trick: every page LOOKS the same to a human, but is unique to Google
Each of the 4,000 pages will have:

Its own URL: /1994 or /1994-in-roman-numerals
Its own <title>: "1994 in Roman Numerals - MCMXCIV"
Its own <h1>: "1994 in Roman Numerals"
Its own content: "The number 1994 written in Roman numerals is MCMXCIV"
Its own related-numbers section: links to 1993, 1995, 1990, 2000
Its own meta description: "1994 is MCMXCIV in Roman numerals. Learn how it's formed..."

The converter tool itself sits at the top of every page, fully functional. So users get both:

Pre-answered query if they searched for a specific number
Interactive converter if they want to try other numbers

Why this works — a concrete example
Imagine Google's search results for "1994 in roman numerals":

Result 1: Wikipedia's general Roman numerals page (massive, generic)
Result 2: rapidtables.com Roman numeral converter (single page, app-style)
Result 3: a calculator site's converter page

Now your site enters the picture: romannumerals.pages.dev/1994
Your page is titled exactly "1994 in Roman Numerals." Its URL is exactly about 1994. Its content directly answers the question in the first sentence. Google sees a page that perfectly matches the query and ranks you above generic competitors — even though their domains are stronger.
This is the unfair advantage of programmatic SEO: specificity beats authority on long-tail queries.
You won't beat anyone for the keyword "roman numerals" (too generic, too competitive). But "1994 in roman numerals" — you can absolutely win. And there are 3,999 of those.
Numbers above 3,999 — your question is great
Standard Roman numerals officially only go up to 3,999 (MMMCMXCIX). Beyond that, the classical system needs "overline" notation: a bar over a letter multiplies it by 1,000. So 5,000 is V̄, 10,000 is X̄, etc. This is called "vinculum" notation.
Three options for the site:
Option A: Cover only 1–3,999 (the standard range)

Simpler, classically correct, covers 99% of search demand
Most queries are for years (1900–2100) and small numbers (1–100)
I recommend this for v1

Option B: Extend to 3,999,999 using vinculum notation

Generates 3.9 million pages — way too many, Google won't index them all
Most pages would be near-duplicates with zero search traffic
Bad idea

Option C: Cover 1–3,999 standard + a separate "extended" section

Pages for popular round numbers above 3999: 5000, 10000, 100000, 1000000
Plus one explainer page about how vinculum notation works
Best of both worlds, adds ~20 pages

I'd go with Option A for launch, add Option C touches if you want completeness. Don't generate millions of pages — Google will refuse to index most and the site looks like spam.
What pages actually exist on this site (the URL map)
Here's the full structure:
/                              → Homepage with converter + popular numbers
/1                             → Page for the number 1
/2                             → Page for the number 2
...
/3999                          → Page for the number 3999

/roman/I                       → Reverse: page for "I" 
/roman/II                      → Reverse: page for "II"
/roman/MCMXCIV                 → Reverse: page for "MCMXCIV"
... (3,999 reverse pages)

/chart/1-100                   → Reference: numbers 1–100 in a table
/chart/100-1000                → Reference: numbers 100–1000
/chart/years                   → Reference: common years
/chart/months                  → Reference: month numbers in Roman
/chart/multiplication          → Reference: multiplication in Roman
/how-it-works                  → Explainer page
/extended                      → Vinculum notation explainer
/about                         → About page

sitemap.xml                    → Lists all ~8,100 URLs for Google
robots.txt                     → Allows all crawlers
Total: roughly 8,100 pages, all generated from one build script.
What each page actually looks like (the layout)
I'll describe the visual layout. Every page follows the same template, just filled with different data.
┌─────────────────────────────────────────────────────────┐
│ [Logo: Roman Numerals]      [Converter ▼] [Chart ▼]     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│              1994 in Roman Numerals                      │
│                                                          │
│              ┌─────────────────────┐                     │
│              │      MCMXCIV        │  ← Big, clear      │
│              └─────────────────────┘                     │
│                                                          │
│  The number 1994 is written as MCMXCIV in Roman         │
│  numerals.                                               │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────┐          │
│  │  Try the converter                        │          │
│  │  [   1994   ] → [ MCMXCIV ]               │          │
│  │  [Decimal] [Roman]   [Convert]            │          │
│  └──────────────────────────────────────────┘          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  How 1994 is formed                                      │
│                                                          │
│  M     = 1000                                            │
│  CM    = 900   (1000 - 100)                              │
│  XC    = 90    (100 - 10)                                │
│  IV    = 4     (5 - 1)                                   │
│  ───────                                                 │
│  TOTAL = 1994                                            │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Nearby numbers                                          │
│                                                          │
│  1989 = MCMLXXXIX    1995 = MCMXCV                       │
│  1990 = MCMXC        1996 = MCMXCVI                      │
│  1991 = MCMXCI       1997 = MCMXCVII                     │
│  1992 = MCMXCII      1998 = MCMXCVIII                    │
│  1993 = MCMXCIII     1999 = MCMXCIX                      │
│                       2000 = MM                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  About this number                                       │
│                                                          │
│  1994 was a notable year — for example, it falls in     │
│  the 20th century. As MCMXCIV, this number uses        │
│  subtractive notation (CM, XC, IV) which is             │
│  characteristic of Roman numerals from 1000–1999.       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Quick reference                                         │
│                                                          │
│  I=1   V=5   X=10   L=50   C=100   D=500   M=1000      │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  © 2026 Roman Numerals | How It Works | About | Chart   │
└─────────────────────────────────────────────────────────┘
This same template renders 3,999 times. Only the data changes — the number, the Roman numeral, the breakdown, the nearby numbers. To a human visitor it looks like a normal informational page. To Google it looks like 3,999 unique, useful, specific pages.
So is the converter "real"?
Yes. The converter at the top of every page is fully functional JavaScript. A user can type any number and convert it instantly, without page reloads. The converter is the "app" part.
The 3,999 individual pages are the SEO part — they exist so Google has something specific to rank for each query.
Both coexist. The converter is for users who arrive and want to try other numbers. The individual pages are for users who arrive via Google searching a specific number.
Why this matters for your strategy specifically
Remember the plan: deploy and walk away for 60 days.

A single converter page on .pages.dev will get zero organic traffic in 60 days. There's nothing for Google to rank.
A 4,000-page site on .pages.dev will (probably) get hundreds to thousands of indexed pages by day 60, each one potentially ranking for its specific query.

Even if only 200 of those 4,000 pages get any clicks each month, and each one gets 20 clicks/month, that's 4,000 monthly visits to your site. That's the math that gets you to $50/month.
Recap of what we're building

8,100 pages total (numbers 1–3,999 in both directions, plus chart/explainer pages)
1 template that we write once
1 build script that generates all 8,100 HTML files from the template + a data file
Deployed as static HTML to Cloudflare Pages
Submitted to Google Search Console day one
Then we leave it alone for 60 days

The user experience: anyone landing on any page gets a clean, fast page with their specific answer at the top, an interactive converter to try more numbers, and links to related numbers.
Ready to actually build?
Now that the concept is clear, I can walk you through the actual build. The next step would be:

Set up a new folder with the project structure
Write the build script that generates all pages
Write the page template
Write the converter JavaScript
Generate sitemap.xml and robots.txt
Deploy to Cloudflare Pages
Submit to Google Search Console

I can give you all the code for steps 1–5 right now in the next message — copy-paste into Claude Code and run. Then walk you through 6 and 7 (which involve clicking around in dashboards, not code).
Does the concept make sense now? Want me to go ahead with the full build for Roman numerals?You said: okay I will get it built with claude code.okay I will get it built with claude code. So give me one file, prd that explains and describes the website for claude code to build it accordingly. Also make sure, that I wouldn't need opus model for this, sonnet 4.6 should be able to do it easily without any mistake. Also design it properly, don't make it look like trash or AI slop4:48 PMClaude responded: PRD: Roman Numerals Reference SitePRD: Roman Numerals Reference Site
Save this file as PRD.md in your project root. Give it to Claude Code as the first instruction.

Project name
roman-numerals — a static programmatic SEO site deployed to Cloudflare Pages.
What this is
A reference website with ~8,100 pages, each pre-answering one specific Roman numeral question. Built once, deployed once, then left alone. Pages are generated at build time from one template plus a data generator — no runtime backend, no APIs, no database.
What this is NOT

Not a single-page converter app
Not a React/Next.js/SPA project
Not a CMS-backed site
Not a site that calls APIs at runtime

Why so many pages
Each number gets its own dedicated URL so Google can rank that page for that specific search query ("1994 in roman numerals", "MCMXCIV meaning"). One page can't rank for 4,000 different queries; 4,000 specific pages can.

Tech stack — use exactly this

Runtime: Node.js (any LTS version)
Build tool: Plain Node.js script. No bundlers, no Webpack, no Vite, no Next.js.
Templating: JavaScript template literals (no Handlebars, no EJS, no Mustache)
Styling: Plain CSS in one file. No Tailwind, no CSS-in-JS, no frameworks.
Client-side JS: Vanilla JS, one small file for the converter. No React, no Vue.
Output: Static .html files written to a dist/ folder
Deployment target: Cloudflare Pages (just point Cloudflare at the dist/ folder)
Dependencies: ZERO npm dependencies. Pure Node.js standard library only.

If you find yourself wanting to add a dependency, stop and reconsider. The whole project should run with just Node installed.

File structure to create
roman-numerals/
├── PRD.md                    # This file
├── package.json              # Minimal, just the build script command
├── build.js                  # The generator (main file)
├── src/
│   ├── template.js           # The page template function
│   ├── converter.js          # The Roman numeral math (used at build time)
│   ├── data.js               # Generates number-specific facts
│   ├── styles.css            # All CSS, one file
│   └── client.js             # Browser converter JS (~50 lines)
├── public/
│   ├── favicon.svg           # Simple SVG favicon
│   └── robots.txt            # Static, allows all crawlers
├── dist/                     # Generated output (gitignored)
└── .gitignore                # Ignores dist/ and node_modules/

URL structure
Every URL is clean, lowercase, hyphenated. No trailing slashes. No .html extension visible.
/                              Homepage
/[number]                      Number page, e.g. /1994
/roman/[numeral]               Reverse page, e.g. /roman/MCMXCIV  (case-insensitive in routing)
/chart/1-100                   Reference chart
/chart/100-1000                Reference chart
/chart/1000-3999               Reference chart
/chart/years                   Common years 1900-2100
/chart/months                  Months 1-12
/chart/multiplication          1×1 to 10×10 table
/how-it-works                  Explainer
/extended                      Vinculum notation explainer (numbers above 3999)
/about                         About page
/sitemap.xml                   For Google
/robots.txt                    For crawlers
Implementation detail: Cloudflare Pages serves /1994 from a file named dist/1994.html automatically. Generate files as dist/1994.html, not dist/1994/index.html. Cleaner.
For the reverse pages, use the format dist/roman/MCMXCIV.html (mixed case in URL is fine; Cloudflare handles it).

Pages to generate

Number pages (1–3,999): 3,999 pages, one per number
Reverse Roman pages: 3,999 pages, one per Roman numeral (MCMXCIV, etc.)
Chart pages: 5 pages (the chart URLs listed above)
Static pages: 4 pages (homepage, how-it-works, extended, about)

Total: ~8,007 HTML files.
Plus sitemap.xml listing all of them.

Roman numeral conversion logic
Standard system, no overline/vinculum for the main range. Build the converter function in src/converter.js.
Symbols:
M  = 1000
CM = 900
D  = 500
CD = 400
C  = 100
XC = 90
L  = 50
XL = 40
X  = 10
IX = 9
V  = 5
IV = 4
I  = 1
toRoman(n): Greedy subtraction. For each symbol in order, append while n >= value, subtract value.
fromRoman(s): Walk left to right. If current value < next value, subtract; else add.
Validation: Range 1–3999 only. Anything else: return null and let the caller handle.
The converter is used both at build time (to generate page content) and at runtime (in the client JS for the interactive widget).

Page template contents
Every number page must contain, in this order:

<title> — exactly: [N] in Roman Numerals - [ROMAN] (e.g., "1994 in Roman Numerals - MCMXCIV")
<meta name="description"> — exactly: [N] in Roman numerals is [ROMAN]. Learn how to write [N] as a Roman numeral, with breakdown and chart.
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://roman-numerals.pages.dev/[N]"> (use the actual deploy URL once known; for now use a placeholder constant in build.js)
JSON-LD schema (see below)
<h1> — [N] in Roman Numerals
Answer block — large, prominent display of the Roman numeral
One-line answer sentence — The number [N] is written as [ROMAN] in Roman numerals.
Interactive converter widget (shared across all pages)
"How [N] is formed" breakdown — showing each symbol contribution
Nearby numbers — N-5 to N+5, as a small grid with links
About this number — short paragraph with one or two facts (composition notes, e.g., "Uses subtractive notation: CM, XC, IV")
Quick reference row — the 7 base symbols (I, V, X, L, C, D, M)
Footer with links to chart, how-it-works, about

For reverse pages (/roman/MCMXCIV): same template, but the heading is "MCMXCIV in Numbers" and the answer is the decimal. Otherwise identical structure.

JSON-LD schema (put in <head> of every number page)
json{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "[N] in Roman Numerals",
  "alternateName": "[ROMAN]",
  "description": "[N] written as a Roman numeral is [ROMAN].",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Roman Numerals 1-3999"
  }
}
Also add FAQPage schema with 2–3 common questions per page (e.g., "How do you write [N] in Roman numerals?", "What does [ROMAN] mean?", "How is [N] formed in Roman numerals?").
Validate that JSON-LD is valid JSON. Escape any special characters.

Internal linking strategy
Each number page must link to:

Its 10 nearest neighbors (5 before, 5 after)
The chart page covering its range
The homepage
A few "popular" anchor pages — generate links to: 1, 10, 50, 100, 500, 1000, current year, year minus 100

Each reverse page links to its numeric equivalent and 5 nearest Roman numeral neighbors.
This internal link density is what makes Google crawl the whole site.

Sitemap
Generate dist/sitemap.xml with every URL. Use <lastmod> set to today's date for all entries. Use <priority> 1.0 for homepage, 0.8 for chart pages, 0.6 for individual number pages, 0.5 for static pages.
Important: sitemap.xml has a 50,000-URL limit per file. We have ~8,000 URLs, so one file is fine. No splitting needed.

Design — visual requirements (NOT "AI slop")
This is the most important section. Read carefully.
Aesthetic direction
Classical-modern. Think the typography sensibility of a museum placard or a well-designed reference book. Serif body text, generous whitespace, restrained color, no gimmicks. The Roman numeral aesthetic should feel intentional — this is a reference site about a 2000-year-old system, not a SaaS landing page.
Color palette — exactly these, no others
--bg:        #FAFAF7   (warm off-white, parchment-adjacent)
--surface:   #FFFFFF   (pure white for cards/inputs)
--ink:       #1A1A1A   (near-black, never pure black)
--ink-soft:  #4A4A48   (secondary text)
--ink-faint: #8A8A86   (tertiary text, captions)
--accent:    #8B2E2E   (deep oxblood/Pompeian red, used SPARINGLY)
--rule:      #E5E2DA   (hairline borders, dividers)
--hover:     #F2EFE7   (hover state for links and cards)
Do NOT add gradients. Do NOT add shadows except one very subtle one on the converter card (0 1px 3px rgba(0,0,0,0.04)). Do NOT use bright colors.
Typography — exact stack
css--font-serif: 'Cormorant Garamond', 'Iowan Old Style', 'Palatino Linotype',
              'Book Antiqua', Palatino, Georgia, serif;
--font-sans:  'Inter', system-ui, -apple-system, 'Segoe UI', Roboto,
              'Helvetica Neue', Arial, sans-serif;
--font-mono:  'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
No web fonts loaded. Use only system fonts (the stacks above will gracefully fall back to good system serifs/sans). Web fonts hurt loading speed and we don't need them — Georgia and Iowan Old Style are excellent.

Body text: serif, 18px, line-height 1.7
Headings: serif, weight 500 (not bold/700)
The big Roman numeral display: serif, 96px, weight 500, letter-spacing 0.03em
UI labels and nav: sans-serif, 14px
Code/numerals in breakdowns: mono, 16px

Layout

Max content width: 720px, centered. Reference sites should be readable, not full-screen.
Vertical rhythm: 8px base unit. Everything is a multiple (8, 16, 24, 32, 48, 64, 96).
Header: thin, ~64px tall. Logo/wordmark left, minimal nav right.
Footer: plain, links separated by middots, small text.
No sidebar. Single column always.
Mobile: single column collapses naturally. Test at 375px width.

The "answer block" (the prominent Roman numeral display)
This is the centerpiece. Specs:

Centered horizontally
Top margin: 48px from H1
Bottom margin: 32px before next section
The Roman numeral itself: 96px on desktop, 64px on mobile, serif, weight 500
Color: --ink
Letter-spacing: 0.03em
Surround it with two thin horizontal rules above and below at 50% width, centered, color --rule
A small caption below in --ink-faint, 13px, sans-serif: "Roman numeral for 1994"

This should feel like a museum label, not a calculator output.
The converter widget

Card with --surface background, 1px border in --rule, 8px border radius
Subtle shadow: 0 1px 3px rgba(0,0,0,0.04)
Padding: 24px
Two text inputs (decimal | roman) with labels above
A small swap button (↕) between them
Inputs use mono font for the values
On input change, convert instantly (no submit button)
Invalid input shows a small message in --accent below the input

Breakdown section (e.g., "How 1994 is formed")
Render as a small table or aligned list:
M     1000
CM     900
XC      90
IV       4
─────────
       1994
Use mono font for alignment. Border-bottom on the last symbol row, in --rule.
Nearby numbers grid
5 columns × 2 rows. Each cell:

Number on top (sans, 14px)
Roman numeral below (serif, 18px)
The whole cell is a link to that number's page
Hover: background --hover, no underline change

Footer
Roman Numerals · Chart · How It Works · Extended · About
Plain text, separated by " · ", sans-serif 14px, color --ink-faint. Links use color --ink-soft on hover.
What to absolutely avoid

Emoji icons in the design
Gradient backgrounds
Glassmorphism, neumorphism, any "trendy" effect
Bright primary colors (blue, green, purple)
Sans-serif body text (must be serif)
Display fonts like Lobster, Pacifico, anything decorative
Animations beyond a 150ms ease on hover states
Cards with thick shadows
More than one accent color
"Get Started" CTAs, gradient buttons, modern SaaS clichés

What it should feel like
If you've seen the typography of Edward Tufte's books or the design of a well-curated library website, that's the register. Refined, quiet, confident. The Roman numeral subject deserves a classical treatment.

Client-side JavaScript (the converter widget)
In src/client.js, ~50 lines. Vanilla JS, no frameworks.
js// Pseudocode — Claude Code, implement properly
const ROMAN_MAP = [/* M=1000 down to I=1 */];

function toRoman(n) { /* greedy */ }
function fromRoman(s) { /* parse */ }

document.addEventListener('DOMContentLoaded', () => {
  const decInput = document.querySelector('[data-input="decimal"]');
  const romInput = document.querySelector('[data-input="roman"]');

  decInput.addEventListener('input', () => {
    const n = parseInt(decInput.value, 10);
    if (n >= 1 && n <= 3999) romInput.value = toRoman(n);
    else romInput.value = '';
  });

  romInput.addEventListener('input', () => {
    const r = fromRoman(romInput.value.toUpperCase());
    if (r) decInput.value = r;
    else decInput.value = '';
  });
});
This script is inlined into every page (it's tiny). No external script files needed.

Build script behavior (build.js)
When node build.js is run, it must:

Delete dist/ if it exists, recreate it empty
Copy everything from public/ into dist/ (favicon, robots.txt)
Read src/styles.css, minify only by stripping comments and excess whitespace (no full minifier), inline into the template's <style> tag
Read src/client.js, inline into the template's <script> tag at end of <body>
For each number 1–3999:

Compute the Roman numeral
Compute the breakdown
Compute nearby numbers
Compute about-this-number facts
Render the template
Write to dist/[N].html


For each of the 3999 Roman numerals:

Render the reverse template
Write to dist/roman/[ROMAN].html


Render and write the 5 chart pages
Render and write the 4 static pages
Generate and write dist/sitemap.xml
Print a summary: Generated 8,007 pages in X seconds

The build must complete in under 30 seconds on a normal laptop. If it's slower, something's wrong.

package.json
json{
  "name": "roman-numerals",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "node build.js"
  }
}
No dependencies. No devDependencies.

.gitignore
node_modules/
dist/
.DS_Store
*.log

robots.txt (in public/)
User-agent: *
Allow: /
Sitemap: https://roman-numerals.pages.dev/sitemap.xml

Cloudflare Pages deployment settings
When I deploy:

Build command: npm run build
Build output directory: dist
Root directory: /
Environment variables: none needed


Acceptance criteria — verify before declaring done

 node build.js runs without errors
 dist/ contains exactly 8,007 HTML files (3999 + 3999 + 5 + 4) plus sitemap.xml and robots.txt and favicon.svg
 Opening dist/1994.html in a browser shows a styled page with MCMXCIV
 The converter widget works (typing 1994 fills the Roman field; typing MCMXCIV fills the decimal field)
 Mobile view (375px width) is single column and readable
 No console errors in the browser
 No external HTTP requests when loading a page (verify in Network tab)
 sitemap.xml is valid XML with 8,000+ URLs
 JSON-LD on /1994 validates at Google's Rich Results Test
 Page weight under 30KB total (HTML + inlined CSS + inlined JS)
 First Contentful Paint under 200ms on local server


Hand-off instructions for Claude Code
Read this entire PRD first. Then build in this order:

Create the file structure with empty files
Implement src/converter.js and test the two conversion functions in isolation
Implement src/data.js (the "facts about this number" generator)
Write src/styles.css following the design system exactly
Write src/template.js — one function that takes {type, data} and returns HTML
Write src/client.js — the browser-side converter
Write build.js — wire everything together, generate all files
Run node build.js, verify the output meets the acceptance criteria
Open a few sample pages in the browser to sanity check the design

If you're tempted to add a dependency, a framework, or a clever abstraction — don't. The simplest possible implementation is the goal. This site exists for 5 years; complexity hurts long-term.
If something in this PRD seems unclear, follow the principle: boring, classical, static, fast. When in doubt, less is more.

After build is complete (manual steps for me, not Claude Code)

git init and push to a new GitHub repo
Cloudflare Pages → connect repo → set build command npm run build and output dist
Wait for deploy → confirm pages load at [name].pages.dev
Submit https://[name].pages.dev/sitemap.xml to Google Search Console
Submit same sitemap to Bing Webmaster Tools
Walk away for 60 days