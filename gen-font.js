import * as opentype from "https://code4fukui.github.io/opentype-es/opentype.js";

const fontPath = "./NotoSansJP-Light.ttf";
const outPath = "./noto-a.svg";

// Buffer -> ArrayBuffer（正確にスライス）
//const buf = fs.readFileSync(fontPath);
//const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
const ab = (await Deno.readFile(fontPath)).buffer;

// フォント読み込み
const font = opentype.parse(ab);

// 「あ」のグリフを取得（U+3042）
const char = 'あ';
const glyph = font.charToGlyph(char);
if (!glyph) {
  console.error('Glyph not found for "あ" (U+3042)');
  process.exit(1);
}

// メトリクス
const unitsPerEm = font.unitsPerEm;       // 例: 1000 or 2048
const ascender   = font.ascender;         // 基本 > 0
const descender  = font.descender;        // 基本 < 0
const advance    = glyph.advanceWidth || unitsPerEm;
const viewBoxW   = advance;
const viewBoxH   = ascender - descender;  // 総高さ

// パス生成（フォント座標で）
const path = glyph.getPath(0, 0, unitsPerEm);
// SVGのd文字列（小数3桁）
const d = path.toPathData ? path.toPathData(3) : path.toSVG(3);

// SVG文字列
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 ${viewBoxW} ${viewBoxH}">
  <g transform="translate(0 ${ascender})">
    <path d="${d}"/>
  </g>
</svg>`;

await Deno.writeTextFile(outPath, svg);
console.log(`Exported "${char}" to: ${outPath}`);
