// xxh32.js - implementation of xxhash32 in plain JavaScript
import util from './util.js';

// xxhash32 primes
var prime1 = 0x9e3779b1;
var prime2 = 0x85ebca77;
var prime3 = 0xc2b2ae3d;
var prime4 = 0x27d4eb2f;
var prime5 = 0x165667b1;

// Utility functions/primitives
// --

function rotl32 (x, r) {
  x = x | 0;
  r = r | 0;

  return x >>> (32 - r | 0) | x << r | 0;
}

function rotmul32 (h, r, m) {
  h = h | 0;
  r = r | 0;
  m = m | 0;

  return util.imul(h >>> (32 - r | 0) | h << r, m) | 0;
}

function shiftxor32 (h, s) {
  h = h | 0;
  s = s | 0;

  return h >>> s ^ h | 0;
}

// Implementation
// --

function xxhapply (h, src, m0, s, m1) {
  return rotmul32(util.imul(src, m0) + h, s, m1);
}

function xxh1 (h, src, index) {
  return rotmul32((h + util.imul(src[index], prime5)), 11, prime1);
}

function xxh4 (h, src, index) {
  return xxhapply(h, util.readU32(src, index), prime3, 17, prime4);
}

function xxh16 (h, src, index) {
  return [
    xxhapply(h[0], util.readU32(src, index + 0), prime2, 13, prime1),
    xxhapply(h[1], util.readU32(src, index + 4), prime2, 13, prime1),
    xxhapply(h[2], util.readU32(src, index + 8), prime2, 13, prime1),
    xxhapply(h[3], util.readU32(src, index + 12), prime2, 13, prime1)
  ];
}

function xxh32 (seed, src, index, len) {
  var h, l;
  l = len;
  if (len >= 16) {
    h = [
      seed + prime1 + prime2,
      seed + prime2,
      seed,
      seed - prime1
    ];

    while (len >= 16) {
      h = xxh16(h, src, index);

      index += 16;
      len -= 16;
    }

    h = rotl32(h[0], 1) + rotl32(h[1], 7) + rotl32(h[2], 12) + rotl32(h[3], 18) + l;
  } else {
    h = (seed + prime5 + len) >>> 0;
  }

  while (len >= 4) {
    h = xxh4(h, src, index);

    index += 4;
    len -= 4;
  }

  while (len > 0) {
    h = xxh1(h, src, index);

    index++;
    len--;
  }

  h = shiftxor32(util.imul(shiftxor32(util.imul(shiftxor32(h, 15), prime2), 13), prime3), 16);

  return h >>> 0;
}

export const hash = xxh32;
