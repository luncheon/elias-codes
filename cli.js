#!/usr/bin/env node
import { encodeEliasGamma } from "./gamma.js";
import { encodeEliasDelta } from "./delta.js";
import { encodeEliasOmega } from "./omega.js";

const ranges = [];
const codings = [];
for (const arg of process.argv.slice(2)) {
  if (arg === "gamma" || arg === "delta" || arg === "omega") {
    codings.push(arg);
  } else {
    const split = arg.split("-", 2);
    const min = parseInt(split[0]);
    const max = split[1] ? parseInt(split[1]) : min;
    ranges.push([min, max]);
  }
}

if (ranges.length === 0) {
  console.log(`try $ npx @luncheon/elias-codes 3 4 5 10-20 0x80`);
} else {
  codings.length || codings.push("gamma", "delta", "omega");
  const encoders = codings.map((c) => (c === "gamma" ? encodeEliasGamma : c === "delta" ? encodeEliasDelta : encodeEliasOmega));
  const values = ranges.flatMap(([min, max]) =>
    Array.from({ length: max - min + 1 }, (_, i) => {
      const n = i + min;
      return [String(n), ...encoders.map((e) => e(n).join(""))];
    }),
  );
  values.unshift(["n", ...codings]);
  const maxLengths = Array.from({ length: encoders.length + 1 }, (_, i) => Math.max(...values.map((v) => v[i].length)));
  for (const value of values) {
    console.log(maxLengths.map((len, i) => value[i].padStart(len)).join(" "));
  }
}
