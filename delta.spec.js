import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { decodeEliasDelta, encodeEliasDelta } from "./delta.js";

describe("delta", () => {
  it("encode", () => {
    assert.deepEqual(encodeEliasDelta(1), [1]);
    assert.deepEqual(encodeEliasDelta(2), [0, 1, 0, 0]);
    assert.deepEqual(encodeEliasDelta(3), [0, 1, 0, 1]);
    assert.deepEqual(encodeEliasDelta(4), [0, 1, 1, 0, 0]);
    assert.deepEqual(encodeEliasDelta(5), [0, 1, 1, 0, 1]);
    assert.deepEqual(encodeEliasDelta(6), [0, 1, 1, 1, 0]);
    assert.deepEqual(encodeEliasDelta(7), [0, 1, 1, 1, 1]);
    assert.deepEqual(encodeEliasDelta(8), [0, 0, 1, 0, 0, 0, 0, 0]);
    assert.deepEqual(encodeEliasDelta(9), [0, 0, 1, 0, 0, 0, 0, 1]);
    assert.deepEqual(encodeEliasDelta(10), [0, 0, 1, 0, 0, 0, 1, 0]);
    assert.deepEqual(encodeEliasDelta(11), [0, 0, 1, 0, 0, 0, 1, 1]);
    assert.deepEqual(encodeEliasDelta(12), [0, 0, 1, 0, 0, 1, 0, 0]);
    assert.deepEqual(encodeEliasDelta(13), [0, 0, 1, 0, 0, 1, 0, 1]);
    assert.deepEqual(encodeEliasDelta(14), [0, 0, 1, 0, 0, 1, 1, 0]);
    assert.deepEqual(encodeEliasDelta(15), [0, 0, 1, 0, 0, 1, 1, 1]);
    assert.deepEqual(encodeEliasDelta(16), [0, 0, 1, 0, 1, 0, 0, 0, 0]);
    assert.deepEqual(encodeEliasDelta(17), [0, 0, 1, 0, 1, 0, 0, 0, 1]);
  });

  it("encode: valid range", () => {
    assert.throws(() => encodeEliasDelta(0), RangeError);
    assert.doesNotThrow(() => encodeEliasDelta(1));
  });

  it("decode", () => {
    assert.deepEqual(decodeEliasDelta([0, 0, 1, 0, 1, 0, 0, 0, 1]), 17);
    for (let n = 1; n < 1_000_000; n++) {
      assert.equal(decodeEliasDelta(encodeEliasDelta(n)), n);
    }
  });

  it("random", () => {
    for (let i = 0; i < 100; i++) {
      const n1 = Math.round(Math.random() * 0xffffffff);
      assert.equal(decodeEliasDelta(encodeEliasDelta(n1)), n1);
      const n2 = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
      assert.equal(decodeEliasDelta(encodeEliasDelta(n2)), n2);
    }
  });
});
