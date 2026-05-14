# LZ4.js

Lz4.jsは、WebブラウザおよびDenoで使用するために設計されたLz4圧縮アルゴリズムの実装です。外部ライブラリやNode.jsへの依存はありません。

## 使い方
```js
import { LZ4 } from "https://code4fukui.github.io/LZ4/LZ4.js";

// 128バイトのゼロを圧縮。
const compressed = LZ4.compress(new Uint8Array(128));

// 展開。
const decompressed = LZ4.decompress(compressed);
```

> **注意**: 高レベルの `compress` および `decompress` 関数はフレーム付きLz4データを扱い、生のブロックデータやレガシーLz4ブロックはサポートしていません。

## API
APIは `Array` または `Uint8Array` を受け付けます。`Array` は符号なし8ビット値の配列であることが期待されます。ブラウザがサポートしている場合は `Uint8Array` を返し、そうでない場合は `Array` を返します。

  - `compress(buffer: Array, maxSize: Number): Array`

    Lz4を使用してバッファを圧縮します。`maxSize` は出力長の上限を設定します。特別な理由がない限り、この値は指定しないことを推奨します。
    未使用のバッファデータは、バッファが返される前にスライスされます。

  - `decompress(buffer: Array, maxSize: Number): Array`

    Lz4を使用してバッファを展開します。`maxSize` は出力長の上限を設定します。出力長が分かっている場合、これを指定することでメモリ使用量をいくらか削減できます。
    未使用のバッファデータは、バッファが返される前にスライスされます。

## ライセンス
MIT License — [LICENSE](LICENSE)を参照してください。
