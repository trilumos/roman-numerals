const SYMBOLS = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'],  [90, 'XC'],  [50, 'L'],  [40, 'XL'],
  [10, 'X'],   [9, 'IX'],   [5, 'V'],   [4, 'IV'],
  [1, 'I']
];

export function toRoman(n) {
  if (!Number.isInteger(n) || n < 1 || n > 3999) return null;
  let result = '';
  for (const [value, symbol] of SYMBOLS) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

export function fromRoman(s) {
  if (!s || typeof s !== 'string') return null;
  const str = s.toUpperCase().trim();
  const VALUES = { M:1000, D:500, C:100, L:50, X:10, V:5, I:1 };
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const curr = VALUES[str[i]];
    const next = VALUES[str[i + 1]];
    if (!curr) return null;
    if (next && curr < next) result -= curr;
    else result += curr;
  }
  if (result < 1 || result > 3999) return null;
  // Validate: re-encode and compare
  if (toRoman(result) !== str) return null;
  return result;
}

export function getBreakdown(n) {
  const steps = [];
  let remaining = n;
  for (const [value, symbol] of SYMBOLS) {
    while (remaining >= value) {
      steps.push({ symbol, value });
      remaining -= value;
    }
  }
  // Merge consecutive same symbols
  const merged = [];
  for (const step of steps) {
    const last = merged[merged.length - 1];
    if (last && last.symbol === step.symbol) {
      last.count++;
      last.value += step.value;
    } else {
      merged.push({ symbol: step.symbol, count: 1, value: step.value });
    }
  }
  return merged;
}
