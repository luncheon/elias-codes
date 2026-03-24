export function encodeEliasGamma(n) {
  if (n < 1) throw RangeError("encodeEliasGamma: supports only positive integers.");
  let _1 = 1;
  const bits = [];
  if ((n & 0) !== n) {
    n = BigInt(n);
    _1 = 1n;
  }
  for (; n; n >>= _1) bits.push(n & _1 ? 1 : 0);
  for (let zeros = bits.length; --zeros; ) bits.push(0);
  return bits.reverse();
}

export function decodeEliasGamma(bitSequence) {
  const bitIterator = Iterator.from(bitSequence);
  const next = () => {
    const it = bitIterator.next();
    if (it.done) throw RangeError("decodeEliasGamma: invalid code.");
    return it.value;
  };
  let _1 = 1;
  let mod = 0;
  let zeros = 0;
  while (!next()) zeros++;
  if (zeros > 30) {
    _1 = 1n;
    mod = 0n;
    zeros = BigInt(zeros);
  }
  for (let i = zeros; i--; ) next() && (mod |= _1 << i);
  return Number((_1 << zeros) + mod);
}
