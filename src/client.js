(function() {
  var SYMBOLS = [
    [1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],
    [100,'C'],[90,'XC'],[50,'L'],[40,'XL'],
    [10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']
  ];

  function toRoman(n) {
    if (!n || n < 1 || n > 3999 || !Number.isFinite(n)) return null;
    var result = '';
    for (var i = 0; i < SYMBOLS.length; i++) {
      while (n >= SYMBOLS[i][0]) { result += SYMBOLS[i][1]; n -= SYMBOLS[i][0]; }
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

  document.addEventListener('DOMContentLoaded', function() {
    var decInput = document.querySelector('[data-input="decimal"]');
    var romInput = document.querySelector('[data-input="roman"]');
    var errEl = document.querySelector('.converter-error');
    var swapBtn = document.querySelector('.swap-btn');
    if (!decInput || !romInput) return;

    decInput.addEventListener('input', function() {
      var n = parseInt(decInput.value, 10);
      if (decInput.value === '') { romInput.value = ''; setErr(''); return; }
      if (!isNaN(n) && n >= 1 && n <= 3999) {
        romInput.value = toRoman(n);
        decInput.classList.remove('error');
        setErr('');
      } else {
        romInput.value = '';
        decInput.classList.add('error');
        setErr(n > 3999 ? 'Standard Roman numerals only go to 3999 (MMMCMXCIX)' : 'Enter a number from 1 to 3999');
      }
    });

    romInput.addEventListener('input', function() {
      var s = romInput.value.toUpperCase();
      if (romInput.value === '') { decInput.value = ''; setErr(''); return; }
      var r = fromRoman(s);
      if (r) {
        decInput.value = r;
        romInput.classList.remove('error');
        setErr('');
      } else {
        decInput.value = '';
        romInput.classList.add('error');
        setErr('Not a valid Roman numeral (1–3999)');
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
      });
    }

    function setErr(msg) { if (errEl) errEl.textContent = msg; }
  });
})();
