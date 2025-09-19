import * as opentype from "https://code4fukui.github.io/opentype-es/opentype.js";

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

// 5) フォント生成
const glyphs = [
  notdefGlyph(),
  spaceGlyph(),
  hira_a_Glyph(),
  jp_period_Glyph(),
  // ★本番はここに ぁぁ～ん・濁音半濁音・小字・句読点・長音符 などを追加
];

const font = new opentype.Font({
  familyName: 'HiraganaDemo',
  styleName: 'Regular',
  unitsPerEm,
  ascender,
  descender,
  glyphs
});

// 6) 保存（Node）
await Deno.writeFile('HiraganaDemo.ttf', new Uint8Array(font.toArrayBuffer()));
console.log('HiraganaDemo.ttf を出力しました');

