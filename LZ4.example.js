import LZ4 from "./LZ4.js";

const test = new Uint8Array([1, 2, 3, 4]);
const bin = LZ4.compress(test);
console.log(bin);
const test2 = LZ4.decompress(bin);
console.log(test2);
