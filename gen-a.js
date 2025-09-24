import * as opentype from "https://code4fukui.github.io/opentype-es/opentype.js";
import { svgPathToOpenTypePath } from "./svg2path.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

// 1) ベースメトリクス
const unitsPerEm = 1000;
const ascender = 800;
const descender = -200;

// 2) よく使うヘルパ
const W = 1000; // 等幅
function notdefGlyph() {
  const p = new opentype.Path();
  // シンプルな □ を描く（.notdef）
  p.moveTo(100, -100);
  p.lineTo(900, -100);
  p.lineTo(900, 900);
  p.lineTo(100, 900);
  p.closePath();
  return new opentype.Glyph({ name: '.notdef', unicode: 0, advanceWidth: W, path: p });
}

function spaceGlyph() {
  return new opentype.Glyph({ name: 'space', unicode: 0x20, advanceWidth: W, path: new opentype.Path() });
}

// 3) “あ”(U+3042) の超シンプル見本（本番は綺麗なパスを作ってね）
function hira_a_Glyph() {
  const p = new opentype.Path();
  // ここでは説明用に丸っぽい抽象形状をベジェで適当に書く
  p.moveTo(500, 700);
  p.curveTo(800, 700, 850, 400, 650, 350);
  p.curveTo(500, 320, 420, 380, 420, 470);
  p.curveTo(420, 620, 550, 620, 610, 560);
  // 画竜点睛の一画（棒）
  p.moveTo(380, 200);
  p.lineTo(380, 600);
  return new opentype.Glyph({
    name: 'hira_a', unicode: 0x3042, advanceWidth: W, path: p
  });
}

// 4) “。”(U+3002) の例
function jp_period_Glyph() {
  const p = new opentype.Path();
  const cx = 500, cy = 150, r = 120;
  // 円を4曲線で
  p.moveTo(cx + r, cy);
  p.curveTo(cx + r, cy + r*0.5523, cx + r*0.5523, cy + r, cx, cy + r);
  p.curveTo(cx - r*0.5523, cy + r, cx - r, cy + r*0.5523, cx - r, cy);
  p.curveTo(cx - r, cy - r*0.5523, cx - r*0.5523, cy - r, cx, cy - r);
  p.curveTo(cx + r*0.5523, cy - r, cx + r, cy - r*0.5523, cx + r, cy);
  p.closePath();
  return new opentype.Glyph({ name: 'ideographic_full_stop', unicode: 0x3002, advanceWidth: W, path: p });
}

const d = `M77.7 50.2c-1.3 1.8-5.2 8.4-8.7 14.5-3.4 6.2-6.8 11.3-7.6 11.3-2.6 0-7.3 5.1-8 8.7-.8 4.4 1.7 9.6 5.8 12.1 3.5 2.1 3.6 1.8-1.2 11.9-4.6 9.8-4.9 11.6-1.9 11.1 1.6-.2 3.4-3.1 7.5-12.3 3.3-7.2 6.5-12.7 7.9-13.8 1.4-1 2.5-2.5 2.5-3.3 0-3.4 17.1-.5 21.5 3.6 1.7 1.5 3.6 2.9 4.3 3.1s3.2 4.7 5.5 9.9c3.3 7.5 4.7 9.6 6.5 9.8 2.9.4 2.9.3-2-11.2-3.1-7.4-3.8-10.1-2.9-10.4 5.8-1.9 7-10.5 2.2-15.3-5.6-5.6-16.1-2.8-16.1 4.2 0 2.2-.5 2.3-10.5.8L75 83.8l-2.1-3.4c-1.1-1.9-2.5-3.4-3-3.4-1.8 0-.8-2.4 4.9-12.6 6.1-11.2 6.5-11.5 8.3-8.2 1.3 2.6 9.8 15.8 11 17.2s3.9-1.3 3.2-3.2c-.4-.9-2.6-4.9-5.1-8.7-2.4-3.9-5-7.9-5.8-9.1-3.7-6.1-5.5-6.5-8.7-2.2M67 81c2.9 1.5 3.8 7.9 1.4 9.7-1.8 1.3-8 .9-9.8-.7-1.6-1.5.3-7.6 2.7-8.8 2.9-1.4 3.5-1.4 5.7-.2m38 2c3.4 3.4 2.7 7.5-1.5 8.7l-3.5 1.1-1.3-2.6c-3.1-6.4 1.7-11.8 6.3-7.2`;

const scale = 8;
const otPath = svgPathToOpenTypePath(d, {
  flipY: true,
  scaleX: scale,
  scaleY: scale,
  offsetX: -200,
  offsetY: 800,
});

// 例：この Path を Glyph にしてフォントへ入れる場合
const glyph_A = new opentype.Glyph({
  name: 'A',
  unicode: 'A'.charCodeAt(0), // 例
  advanceWidth: 1000, // 等幅
  path: otPath
});

const glyph_a = new opentype.Glyph({
  name: 'a',
  unicode: 'a'.charCodeAt(0), // 例
  advanceWidth: 1000, // 等幅
  path: otPath
});

// 5) フォント生成
const glyphs = [
  notdefGlyph(),
  spaceGlyph(),
  //hira_a_Glyph(),
  glyph_A,
  glyph_a,
  jp_period_Glyph(),
  // ★本番はここに ぁぁ～ん・濁音半濁音・小字・句読点・長音符 などを追加
];

const fontname = "sabaefont-alpha";

const font = new opentype.Font({
  familyName: fontname,
  styleName: 'Regular',
  unitsPerEm,
  ascender,
  descender,
  glyphs
});

// 6) 保存
await Deno.writeFile(fontname + '.ttf', new Uint8Array(font.toArrayBuffer()));
