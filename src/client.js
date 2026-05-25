(function() {
  // ── Standard symbols (1–3999) ──────────────────────────────────────────────
  var SYMBOLS = [
    [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
    [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
    [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
  ];

  // ── Extended vinculum symbols (4000–3,999,999) ─────────────────────────────
  // We represent vinculum (overline) with Unicode combining overline U+0305
  // So M̄ = M + ̄  etc. Readable in all modern browsers.
  var VINCULUM = [
    [1000000, 'M\u0305'],
    [900000,  'C\u0305M\u0305'],
    [500000,  'D\u0305'],
    [400000,  'C\u0305D\u0305'],
    [100000,  'C\u0305'],
    [90000,   'X\u0305C\u0305'],
    [50000,   'L\u0305'],
    [40000,   'X\u0305L\u0305'],
    [10000,   'X\u0305'],
    [9000,    'M\u0305X\u0305'],  // not standard but readable
    [5000,    'V\u0305'],
    [4000,    'M\u0305V\u0305'],
    [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
    [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
    [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
  ];

  var MAX_EXTENDED = 3999999;

  function toRoman(n) {
    if (!n || n < 1 || n > 3999 || !Number.isFinite(n)) return null;
    var result = '';
    for (var i = 0; i < SYMBOLS.length; i++) {
      while (n >= SYMBOLS[i][0]) { result += SYMBOLS[i][1]; n -= SYMBOLS[i][0]; }
    }
    return result;
  }

  function toRomanExtended(n) {
    if (!n || n < 1 || n > MAX_EXTENDED || !Number.isFinite(n)) return null;
    if (n <= 3999) return toRoman(n);
    var result = '';
    var rem = n;
    for (var i = 0; i < VINCULUM.length; i++) {
      while (rem >= VINCULUM[i][0]) { result += VINCULUM[i][1]; rem -= VINCULUM[i][0]; }
    }
    return result;
  }

  function fromRoman(s) {
    if (!s) return null;
    s = s.toUpperCase().trim();
    var map = {M:1000,D:500,C:100,L:50,X:10,V:5,I:1};
    var total = 0;
    for (var i = 0; i < s.length; i++) {
      var curr = map[s[i]], next = map[s[i+1]];
      if (!curr) return null;
      total += (next && curr < next) ? -curr : curr;
    }
    if (total < 1 || total > 3999) return null;
    if (toRoman(total) !== s) return null;
    return total;
  }

  // ── Extended note panel ────────────────────────────────────────────────────
  function showExtendedNote(n, roman) {
    var panel = document.querySelector('.extended-note');
    if (!panel) return;
    var romanDisplay = roman.replace(/\u0305/g, '\u0305'); // keep as-is, already has combining chars
    panel.innerHTML =
      '<div class="ext-result">' + roman + '</div>' +
      '<p class="ext-explain">' +
        '<strong>Extended (vinculum) notation.</strong> ' +
        'Standard Roman numerals only go to 3,999 (MMMCMXCIX). ' +
        'For larger numbers, a horizontal bar called a <em>vinculum</em> is placed over a symbol to multiply its value by 1,000. ' +
        'So V&#x0305; = 5,000 &middot; X&#x0305; = 10,000 &middot; M&#x0305; = 1,000,000. ' +
        'This notation was used in classical Rome but is rare in modern usage. ' +
        '<a href="/extended">Learn more &rarr;</a>' +
      '</p>';
    panel.style.display = 'block';
  }

  function hideExtendedNote() {
    var panel = document.querySelector('.extended-note');
    if (panel) panel.style.display = 'none';
  }

  // ── DOM wiring ─────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    var decInput = document.querySelector('[data-input="decimal"]');
    var romInput = document.querySelector('[data-input="roman"]');
    var errEl    = document.querySelector('.converter-error');
    var swapBtn  = document.querySelector('.swap-btn');
    if (!decInput || !romInput) return;

    decInput.addEventListener('input', function() {
      var raw = decInput.value.trim();
      if (raw === '') {
        romInput.value = '';
        decInput.classList.remove('error');
        setErr('');
        hideExtendedNote();
        return;
      }

      var n = parseInt(raw, 10);
      if (isNaN(n) || n < 1) {
        romInput.value = '';
        decInput.classList.add('error');
        setErr('Enter a positive whole number.');
        hideExtendedNote();
        return;
      }

      if (n > MAX_EXTENDED) {
        romInput.value = '';
        decInput.classList.add('error');
        setErr('Maximum supported: 3,999,999');
        hideExtendedNote();
        return;
      }

      decInput.classList.remove('error');
      setErr('');

      if (n <= 3999) {
        romInput.value = toRoman(n);
        hideExtendedNote();
      } else {
        var ext = toRomanExtended(n);
        romInput.value = ext;
        showExtendedNote(n, ext);
      }
    });

    romInput.addEventListener('input', function() {
      var s = romInput.value.toUpperCase().trim();
      if (!s) {
        decInput.value = '';
        romInput.classList.remove('error');
        setErr('');
        hideExtendedNote();
        return;
      }
      var r = fromRoman(s);
      if (r) {
        decInput.value = r;
        romInput.classList.remove('error');
        setErr('');
        hideExtendedNote();
      } else {
        decInput.value = '';
        romInput.classList.add('error');
        setErr('Not a valid standard Roman numeral (1–3999). Extended input not supported.');
      }
    });

    if (swapBtn) {
      swapBtn.addEventListener('click', function() {
        var tmp = decInput.value;
        decInput.value = romInput.value;
        romInput.value = tmp;
        decInput.classList.remove('error');
        romInput.classList.remove('error');
        setErr('');
        hideExtendedNote();
      });
    }

    function setErr(msg) { if (errEl) errEl.textContent = msg; }
  });
})();
