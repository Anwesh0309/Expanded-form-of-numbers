export function generateRandomNumber(min = 10000, max = 99999) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function toDigits(value) {
  const s = String(Math.abs(Math.floor(value))).padStart(5, '0');
  return {
    tenThousands: Number(s[0]),
    thousands:    Number(s[1]),
    hundreds:     Number(s[2]),
    tens:         Number(s[3]),
    ones:         Number(s[4]),
  };
}

export function toExpandedTerms(value) {
  const d = toDigits(value);
  return [
    d.tenThousands * 10000,
    d.thousands    * 1000,
    d.hundreds     * 100,
    d.tens         * 10,
    d.ones,
  ];
}

export function expandedToString(terms) {
  return terms.map(t => t.toLocaleString()).join(' + ');
}

export function formatNumber(n) {
  return n.toLocaleString('en-US');
}

export function numberToWords(n) {
  if (n === 0) return 'zero';
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const chunks = [];
  const thousands = Math.floor(n / 1000);
  const remainder = n % 1000;
  if (thousands > 0) {
    const h = Math.floor(thousands / 100);
    const t = Math.floor((thousands % 100) / 10);
    const o = thousands % 10;
    let s = '';
    if (h) s += ones[h] + ' hundred';
    if (t >= 2) s += (s ? ' ' : '') + tens[t] + (o ? '-' + ones[o] : '');
    else if (thousands % 100 > 0) s += (s ? ' ' : '') + ones[thousands % 100];
    chunks.push(s + ' thousand');
  }
  if (remainder > 0) {
    const h = Math.floor(remainder / 100);
    const t = Math.floor((remainder % 100) / 10);
    const o = remainder % 10;
    let s = '';
    if (h) s += ones[h] + ' hundred';
    if (t >= 2) s += (s ? ' ' : '') + tens[t] + (o ? '-' + ones[o] : '');
    else if (remainder % 100 > 0) s += (s ? ' ' : '') + ones[remainder % 100];
    chunks.push(s);
  }
  return chunks.join(', ');
}
