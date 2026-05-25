import { toRoman, getBreakdown } from './converter.js';

const CURRENT_YEAR = 2025;

export function getNearby(n) {
  const results = [];
  for (let i = n - 5; i <= n + 5; i++) {
    if (i >= 1 && i <= 3999 && i !== n) {
      results.push({ n: i, roman: toRoman(i) });
    }
  }
  return results;
}

export function getChartRange(n) {
  if (n <= 100) return { label: '1–100', slug: '1-100' };
  if (n <= 1000) return { label: '100–1000', slug: '100-1000' };
  return { label: '1000–3999', slug: '1000-3999' };
}

export function getAboutText(n, roman) {
  const breakdown = getBreakdown(n);
  const symbols = breakdown.map(b => b.symbol).join(', ');
  const hasSubtractive = roman.includes('CM') || roman.includes('CD') ||
    roman.includes('XC') || roman.includes('XL') ||
    roman.includes('IX') || roman.includes('IV');

  const century = Math.ceil(n / 100);
  const centuryLabel = getCenturyLabel(century);

  const parts = [];

  // Subtractive notation note
  if (hasSubtractive) {
    const sub = [];
    if (roman.includes('CM')) sub.push('CM (900)');
    if (roman.includes('CD')) sub.push('CD (400)');
    if (roman.includes('XC')) sub.push('XC (90)');
    if (roman.includes('XL')) sub.push('XL (40)');
    if (roman.includes('IX')) sub.push('IX (9)');
    if (roman.includes('IV')) sub.push('IV (4)');
    parts.push(`Uses subtractive notation: ${sub.join(', ')}.`);
  }

  // Symbol count
  const symbolCount = roman.length;
  if (symbolCount === 1) parts.push('Represented by a single symbol.');
  else parts.push(`Written with ${symbolCount} characters.`);

  // Year context
  if (n >= 1000 && n <= CURRENT_YEAR + 100) {
    parts.push(`As a year, this falls in the ${centuryLabel} century CE.`);
  }

  // Composition
  const uniqueSymbols = [...new Set(roman.split(''))];
  if (uniqueSymbols.length === 1) {
    parts.push(`Composed entirely of the letter ${uniqueSymbols[0]}.`);
  }

  return parts.join(' ');
}

function getCenturyLabel(c) {
  if (c === 1) return '1st';
  if (c === 2) return '2nd';
  if (c === 3) return '3rd';
  return `${c}th`;
}

export function getPopularLinks() {
  return [1, 4, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000, 1776, 1900, 2000, CURRENT_YEAR].map(n => ({
    n,
    roman: toRoman(n)
  }));
}
