# LZ4.js

LZ4.js はWebブラウザやDenoで使えるLz4圧縮の実装です。外部ライブラリや Node.JS への依存はありません。

## 使い方
```js
import { LZ4 } from "https://code4fukui.github.io/LZ4/LZ4.js";

// 128バイトのゼロを圧縮
const compressed = LZ4.compress(new Uint8Array(128));

// 解凍
const decompressed = LZ4.decompress(compressed);
```

> **注意**: `compress`と`decompress`の高水準関数は、フレーミングされたLz4データを処理しますが、ロー・ブロック・データやレガシーのLz4ブロックはサポートしていません。

## API
APIはArray型やUint8Array型を受け付けます。Arrayは8ビット符号なしの値の配列として扱われます。APIはブラウザがUint8Arrayをサポートしている場合はUint8Array型、そうでない場合はArray型を返します。

  - `compress(buffer: Array, maxSize: Number): Array`

    Lz4を使ってバッファを圧縮します。maxSizeは出力長の上限を設定します。特に理由がない限り指定しないことをおすすめします。
    使用していないバッファデータはスライスされて返されます。

  - `decompress(buffer: Array, maxSize: Number): Array`

    Lz4を使ってバッファを解凍します。maxSizeは出力長の上限を設定します。出力長がわかっている場合はメモリ使用量を抑えられます。
    使用していないバッファデータはスライスされて返されます。

## ライセンス
LZ4.jsのライセンスはISCです。