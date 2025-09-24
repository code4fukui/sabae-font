# sabae-font alpha 3

第18回鯖江市地域活性化プランコンテストの最優秀賞プラン「SABAEフォント」の実現プロジェクト ([プラン詳細](https://code4fukui.github.io/sabaepc/#plan202506))

![sabaefont_alphabet](./src/sabaefont_alphabet.jpg?)
![sabaefont_kana](./src/sabaefont_kana.jpg?)

to make sabaefont-alpha3.ttf (only alphabet and number)
```sh
deno -A makeSabaeFont.js
```

→ [SABAEフォントに関するご要望](https://github.com/code4fukui/sabae-font/issues/1)

## tool of image 2 svg

- [SVGcode—Convert raster images to SVG vector graphics](https://svgco.de/)

## memo

font structure
```json
[
{ type: "M", x: 401, y: -786 },
{ type: "L", x: 457, y: -784 },
{ type: "Q", x1: 455, y1: -778, x: 452, y: -766 },
{ type: "Q", x1: 449, y1: -754, x: 447, y: -745 },
{ type: "L", x: 447, y: -745 },
]
```

SVG
```svg
<path d="M401-786L457-784Q455-778 452-766Q449-754 447-745L447-745Q440-706 432-642Q424-578 419-503Q414-428 414-355L414-355Q414-299 422-240.500Q430-182 443.50">
```

```
M 401 -786
L 457 -784
Q 455 -778 452 -766
Q 449 -754 447 -745
L 447 -745

Q440-706 432-642Q424-578 419-503Q414-428 414-355L414-355Q414-299 422-240.500Q430-182 443.50
```
逆変換も簡単そう!
