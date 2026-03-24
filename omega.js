export function encodeEliasOmega(n) {
  if (n < 1) throw RangeError("encodeEliasOmega: supports only positive integers.");
  const code = [0];
  while (n !== 1) {
    if ((n | 0) === n) {
      const l = 32 - Math.clz32(n);
      for (let i = 0; i < l; i++) code.push(n & (1 << i) ? 1 : 0);
      n = l - 1;
    } else {
      const b = n.toString(2);
      for (let i = b.length; --i >= 0; ) code.push(b[i] === '1' ? 1 : 0);
      n = b.length - 1;
    }
  }
  return code.reverse();
}

export function decodeEliasOmega(bitSequence) {
  const bitIterator = Iterator.from(bitSequence);
  const next = () => {
    const it = bitIterator.next();
    if (it.done) throw RangeError("decodeEliasOmega: invalid code.");
    return it.value;
  };
  let _1 = 1;
  let n = 1;
  while (next()) {
    if (_1 === 1 && n > 30) {
      n = BigInt(n);
      _1 = 1n;
    }
    let l = _1 << n;
    while (n--) next() && (l |= (_1 << n));
    n = l;
  }
  return Number(n);
}
