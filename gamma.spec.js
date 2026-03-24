import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodeEliasGamma, encodeEliasGamma } from "./gamma.js";

describe("gamma", () => {
  it("encode", () => {
    assert.deepEqual(encodeEliasGamma(1), [1]);
    assert.deepEqual(encodeEliasGamma(2), [0, 1, 0]);
    assert.deepEqual(encodeEliasGamma(3), [0, 1, 1]);
    assert.deepEqual(encodeEliasGamma(4), [0, 0, 1, 0, 0]);
    assert.deepEqual(encodeEliasGamma(5), [0, 0, 1, 0, 1]);
    assert.deepEqual(encodeEliasGamma(6), [0, 0, 1, 1, 0]);
    assert.deepEqual(encodeEliasGamma(7), [0, 0, 1, 1, 1]);
    assert.deepEqual(encodeEliasGamma(8), [0, 0, 0, 1, 0, 0, 0]);
    assert.deepEqual(encodeEliasGamma(9), [0, 0, 0, 1, 0, 0, 1]);
    assert.deepEqual(encodeEliasGamma(10), [0, 0, 0, 1, 0, 1, 0]);
    assert.deepEqual(encodeEliasGamma(11), [0, 0, 0, 1, 0, 1, 1]);
    assert.deepEqual(encodeEliasGamma(12), [0, 0, 0, 1, 1, 0, 0]);
    assert.deepEqual(encodeEliasGamma(13), [0, 0, 0, 1, 1, 0, 1]);
    assert.deepEqual(encodeEliasGamma(14), [0, 0, 0, 1, 1, 1, 0]);
    assert.deepEqual(encodeEliasGamma(15), [0, 0, 0, 1, 1, 1, 1]);
    assert.deepEqual(encodeEliasGamma(16), [0, 0, 0, 0, 1, 0, 0, 0, 0]);
    assert.deepEqual(encodeEliasGamma(17), [0, 0, 0, 0, 1, 0, 0, 0, 1]);
  });

  it("encode: valid range", () => {
    assert.throws(() => encodeEliasGamma(0), RangeError);
    assert.doesNotThrow(() => encodeEliasGamma(1));
  });

  it("decode", () => {
    assert.deepEqual(decodeEliasGamma([0, 0, 0, 0, 1, 1, 1, 0, 1]), 29);
    for (let n = 1; n < 100_000; n++) {
      assert.equal(decodeEliasGamma(encodeEliasGamma(n)), n);
    }
  });

  it("random", () => {
    for (let i = 0; i < 100; i++) {
      const n1 = Math.round(Math.random() * 0xffffffff);
      assert.equal(decodeEliasGamma(encodeEliasGamma(n1)), n1);
      const n2 = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
      assert.equal(decodeEliasGamma(encodeEliasGamma(n2)), n2);
    }
  });
});
