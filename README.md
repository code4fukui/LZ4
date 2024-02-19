# Lz4.js

Lz4.js is an implementation of Lz4 designed to be used in web browsers and Deno. It contains no dependencies on external libraries or Node.JS.

## Usage
```js
import { LZ4 } from "https://code4fukui.github.io/LZ4/LZ4.js";

// Compress 128 bytes of zero.
const compressed = LZ4.compress(new Uint8Array(128));

// Decompress.
const decompressed = LZ4.decompress(compressed);
```

> **Note**: The high-level `compress` and `decompress` functions deal with framed Lz4 data and do not support raw block data nor legacy Lz4 blocks.

## API
The API accepts either `Array`s or `Uint8Array`s. Arrays are expected to be arrays of unsigned 8-bit values. The API will return `Uint8Array`s if the browser supports them, or `Array`s otherwise.

  - `compress(buffer: Array, maxSize: Number): Array`

    Compresses a buffer using Lz4. maxSize sets bounds on the output length; it is recommended to not specify this unless you know what you're doing.
    Any unused buffer data will be sliced before the buffer is returned.

  - `decompress(buffer: Array, maxSize: Number): Array`

    Decompresses a buffer using Lz4. maxSize sets bounds on the output length; if you know the output length, this will reduce memory usage somewhat.
    Any unused buffer data will be sliced before the buffer is returned.
