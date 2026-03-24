import { encodeEliasGamma } from "./gamma.js";

const encodeBinary = (x, length = 32 - Math.clz32(x)) => {
  const a = [];
  while (length--) a.push(x & (1 << length) ? 1 : 0);
  return a;
};
const encodeBigBinary = (x) =>
  x
    .toString(2)
    .split("")
    .map((c) => parseInt(c));

export function encodeEliasDelta(n) {
  if (n < 1) throw RangeError("encodeEliasGamma: supports only positive integers.");
  const b = (n | 0) === n ? encodeBinary(n) : encodeBigBinary(n);
  const a = encodeEliasGamma(b.length);
  for (let i = 1; i < b.length; i++) a.push(b[i]);
  return a;
}

export function decodeEliasDelta(bitSequence) {
  const bitIterator = Iterator.from(bitSequence);
  const next = () => {
    const it = bitIterator.next();
    if (it.done) throw RangeError("decodeEliasDelta: invalid code.");
    return it.value;
  };
  let _1 = 1;
  let l = 0;
  while (!next()) l++;
  if (l > 31) {
    l = BigInt(l);
    _1 = 1n;
  }
  let n = _1 << l;
  while (l--) next() && (n |= _1 << l);
  if (_1 === 1 && n > 31) {
    n = BigInt(n);
    _1 = 1n;
  }
  let v = _1 << --n;
  while (n--) next() && (v |= _1 << n);
  return Number(v);
}
