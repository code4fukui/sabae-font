# sabae-font alpha 3

このプロジェクトは、SVGベクターデータから作成されたカスタムフォント「SABAE Font」を提供します。これは、第18回鯖江市地域活性化プランコンテストでグランプリを受賞したプランを実現したものです。

- **フォントのダウンロード:** [sabaefont-alpha3.ttf](https://code4fukui.github.io/sabae-font/sabaefont-alpha3.ttf)
- **オリジナルプランの詳細:** [SABAEフォント](https://code4fukui.github.io/sabaepc/#plan202506) (日本語)


![SABAE Font アルファベットプレビュー](./src/sabaefont_alphabet.jpg)


![SABAE Font ひらがなプレビュー](./src/sabaefont_kana.jpg)


## ソースからのビルド方法

このプロジェクトでは、[Deno](https://deno.land/) を使用して、`src_split_svg/` ディレクトリにある個別のSVGグリフからフォントファイルをビルドします。

**必須条件:**
- Denoランタイム

**ビルドコマンド:**
ソースSVGから `sabaefont-alpha3.ttf` を生成するには、ターミナルで次のコマンドを実行してください:
```sh
deno run -A makeSabaeFont.js
```

## プロジェクトのワークフロー

フォントは、SVGファイルを処理する一連のJavaScriptモジュールを通じて生成されます:

1.  **SVGグリフ**: 各文字は `src_split_svg/` ディレクトリ内の個別のSVGファイルで定義されています。
2.  **パスの解析**: `parsePathSVG.js` は各SVGからパスデータと `viewBox` を抽出します。
3.  **パスの変換**: `svgPathToOpenTypePath.js` はSVGパス文字列を `opentype.js` と互換性のある形式に変換します。
4.  **グリフの生成**: `svg2glyph.js` はパスデータをスケーリングおよび配置してOpenTypeグリフを作成します。
5.  **フォントの組み立て**: メインスクリプト `makeSabaeFont.js` がすべてのSVGに対してこのプロセスを統合し、`opentype.js` を使用して最終的な `.ttf` フォントファイルを組み立てます。

メガネの主要産地として有名な鯖江市にちなんで、任意のSVG文字にプログラムでメガネを追加できるユニークなユーティリティ `addGlassesToSvgString.js` も用意されています。

## フィードバックとリクエスト

SABAE Fontに関するリクエストやフィードバックがある場合は、以下のリンクからissueを作成してください:
- [SABAEフォントに関するご要望 (Requests for SABAE Font)](https://github.com/code4fukui/sabae-font/issues/1)

## ツールとクレジット

- SVGグリフの作成には [SVGcode—Convert raster images to SVG vector graphics](https://svgco.de/) を使用しました。

## ライセンス

このプロジェクトは MIT License のもとで公開されています。
