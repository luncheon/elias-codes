import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodeEliasOmega, encodeEliasOmega } from "./omega.js";

describe("omega", () => {
  it("encode", () => {
    assert.deepEqual(encodeEliasOmega(1), [0]);
    assert.deepEqual(encodeEliasOmega(2), [1, 0, 0]);
    assert.deepEqual(encodeEliasOmega(3), [1, 1, 0]);
    assert.deepEqual(encodeEliasOmega(4), [1, 0, 1, 0, 0, 0]);
    assert.deepEqual(encodeEliasOmega(5), [1, 0, 1, 0, 1, 0]);
    assert.deepEqual(encodeEliasOmega(6), [1, 0, 1, 1, 0, 0]);
    assert.deepEqual(encodeEliasOmega(7), [1, 0, 1, 1, 1, 0]);
    assert.deepEqual(encodeEliasOmega(8), [1, 1, 1, 0, 0, 0, 0]);
    assert.deepEqual(encodeEliasOmega(9), [1, 1, 1, 0, 0, 1, 0]);
    assert.deepEqual(encodeEliasOmega(10), [1, 1, 1, 0, 1, 0, 0]);
    assert.deepEqual(encodeEliasOmega(11), [1, 1, 1, 0, 1, 1, 0]);
    assert.deepEqual(encodeEliasOmega(12), [1, 1, 1, 1, 0, 0, 0]);
    assert.deepEqual(encodeEliasOmega(13), [1, 1, 1, 1, 0, 1, 0]);
    assert.deepEqual(encodeEliasOmega(14), [1, 1, 1, 1, 1, 0, 0]);
    assert.deepEqual(encodeEliasOmega(15), [1, 1, 1, 1, 1, 1, 0]);
    assert.deepEqual(encodeEliasOmega(16), [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]);
    assert.deepEqual(encodeEliasOmega(17), [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]);
  });

  it("encode: valid range", () => {
    assert.throws(() => encodeEliasOmega(0), RangeError);
    assert.doesNotThrow(() => encodeEliasOmega(1));
  });

  it("decode", () => {
    assert.deepEqual(decodeEliasOmega([1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]), 17);
    for (let n = 1; n < 1_000_000; n++) {
      assert.equal(decodeEliasOmega(encodeEliasOmega(n)), n);
    }
  });

  it("random", () => {
    for (let i = 0; i < 100; i++) {
      const n1 = Math.round(Math.random() * 0xffffffff);
      assert.equal(decodeEliasOmega(encodeEliasOmega(n1)), n1);
      const n2 = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
      assert.equal(decodeEliasOmega(encodeEliasOmega(n2)), n2);
    }
  });
});
