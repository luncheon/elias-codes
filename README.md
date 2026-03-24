# @luncheon/elias-codes

Implementation of Elias [gamma (γ)](https://en.wikipedia.org/wiki/Elias_gamma_coding), [delta (δ)](https://en.wikipedia.org/wiki/Elias_delta_coding) and [omega (ω)](https://en.wikipedia.org/wiki/Elias_omega_coding) coding.

```ts
import assert from "node:assert/strict";
import { encodeEliasGamma, decodeEliasGamma } from "@luncheon/elias-codes/gamma.js";
import { encodeEliasDelta, decodeEliasDelta } from "@luncheon/elias-codes/delta.js";
import { encodeEliasOmega, decodeEliasOmega } from "@luncheon/elias-codes/omega.js";

assert.deepEqual(encodeEliasGamma(1), [1]);
assert.deepEqual(encodeEliasGamma(2), [0, 1, 0]);
assert.deepEqual(encodeEliasGamma(3), [0, 1, 1]);
assert.deepEqual(encodeEliasGamma(4), [0, 0, 1, 0, 0]);
assert.deepEqual(encodeEliasGamma(5), [0, 0, 1, 0, 1]);
assert.deepEqual(encodeEliasGamma(6), [0, 0, 1, 1, 0]);
assert.deepEqual(encodeEliasGamma(7), [0, 0, 1, 1, 1]);
assert.deepEqual(encodeEliasGamma(8), [0, 0, 0, 1, 0, 0, 0]);

assert.equal(decodeEliasGamma(encodeEliasGamma([0, 0, 0, 1, 0, 0, 0])), 8);

assert.deepEqual(encodeEliasDelta(1), [1]);
assert.deepEqual(encodeEliasDelta(2), [0, 1, 0, 0]);
assert.deepEqual(encodeEliasDelta(3), [0, 1, 0, 1]);
assert.deepEqual(encodeEliasDelta(4), [0, 1, 1, 0, 0]);
assert.deepEqual(encodeEliasDelta(5), [0, 1, 1, 0, 1]);
assert.deepEqual(encodeEliasDelta(6), [0, 1, 1, 1, 0]);
assert.deepEqual(encodeEliasDelta(7), [0, 1, 1, 1, 1]);
assert.deepEqual(encodeEliasDelta(8), [0, 0, 1, 0, 0, 0, 0, 0]);

assert.equal(decodeEliasDelta(encodeEliasDelta([0, 0, 1, 0, 0, 0, 0, 0])), 8);

assert.deepEqual(encodeEliasOmega(1), [0]);
assert.deepEqual(encodeEliasOmega(2), [1, 0, 0]);
assert.deepEqual(encodeEliasOmega(3), [1, 1, 0]);
assert.deepEqual(encodeEliasOmega(4), [1, 0, 1, 0, 0, 0]);
assert.deepEqual(encodeEliasOmega(5), [1, 0, 1, 0, 1, 0]);
assert.deepEqual(encodeEliasOmega(6), [1, 0, 1, 1, 0, 0]);
assert.deepEqual(encodeEliasOmega(7), [1, 0, 1, 1, 1, 0]);
assert.deepEqual(encodeEliasOmega(8), [1, 1, 1, 0, 0, 0, 0]);

assert.equal(decodeEliasOmega(encodeEliasOmega([1, 1, 1, 0, 0, 0, 0])), 8);
```

## CLI

```bash
$ npx @luncheon/elias-codes 3 4 5 10-20 0x80
  n           gamma          delta          omega
  3             011           0101            110
  4           00100          01100         101000
  5           00101          01101         101010
 10         0001010       00100010        1110100
 11         0001011       00100011        1110110
 12         0001100       00100100        1111000
 13         0001101       00100101        1111010
 14         0001110       00100110        1111100
 15         0001111       00100111        1111110
 16       000010000      001010000    10100100000
 17       000010001      001010001    10100100010
 18       000010010      001010010    10100100100
 19       000010011      001010011    10100100110
 20       000010100      001010100    10100101000
128 000000010000000 00010000000000 10111100000000
```

## Reference

- [P. Elias, "Universal Codeword Sets and Representations of the Integers", 1975.](https://ieeexplore.ieee.org/document/1055349)

### Note

- `encodeEliasGamma(n)` is an implementation of the `γ'(j)` rather than `γ(j)` from the paper mentioned above.
- In the above paper, `δ(j)` uses `γ(j)`, while `encodeEliasDelta(n)` uses `encodeEliasGamma(n)`, which is the implementation of `γ'(j)`.

## License

[WTFPL](http://www.wtfpl.net)

## See also

- [@luncheon/**golomb-code**](https://www.npmjs.com/package/@luncheon/golomb-code): A [Golomb coding](https://en.wikipedia.org/wiki/Golomb_coding) implementation.
- [@luncheon/**exponential-golomb-code**](https://www.npmjs.com/package/@luncheon/exponential-golomb-code): An [exponential-Golomb coding](https://en.wikipedia.org/wiki/Exponential-Golomb_coding) implementation.
- [@luncheon/**fibonacci-code**](https://www.npmjs.com/package/@luncheon/fibonacci-code): A [Fibonacci coding](https://en.wikipedia.org/wiki/Fibonacci_coding) implementation.
- [@luncheon/**parity-step-code**](https://www.npmjs.com/package/@luncheon/parity-step-code): A Universal Coding of Integers (UCI) inspired by [Collatz conjecture](https://en.wikipedia.org/wiki/Collatz_conjecture).
- [@luncheon/**varint**](https://www.npmjs.com/package/@luncheon/varint): A `BigInt`-native [varint](https://en.wikipedia.org/wiki/Variable-length_quantity) codec supporting arbitrary chunk sizes and zigzag encoding.
