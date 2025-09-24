import { svgPathToOpenTypePath } from "./svgPathToOpenTypePath.js";
import { parsePathSVG } from "./parsePathSVG.js";
import * as opentype from "https://code4fukui.github.io/opentype-es/opentype.js";

export const svg2glyph = (svg, ch, unitsPerEm, ascender, descender) => {
  const path = parsePathSVG(svg);
  const scale = 8;
  //const scale = unitsPerEm / path.width;
  const otPath = svgPathToOpenTypePath(path.path, {
    flipY: true,
    scaleX: scale,
    scaleY: scale,
    offsetX: descender,
    offsetY: ascender,
  });

  const glyph = new opentype.Glyph({
    name: ch,
    unicode: ch.charCodeAt(0),
    advanceWidth: unitsPerEm, // 等幅
    path: otPath
  });
  return glyph;
};

export const notdefGlyph = (unitsPerEm) => {
  const W = unitsPerEm;
  const p = new opentype.Path();
  // シンプルな □ を描く（.notdef）
  p.moveTo(100, -100);
  p.lineTo(900, -100);
  p.lineTo(900, 900);
  p.lineTo(100, 900);
  p.closePath();
  return new opentype.Glyph({
    name: '.notdef',
    unicode: 0,
    advanceWidth: W,
    path: p,
  });
};

if (import.meta.main) {
  const unitsPerEm = 1000;
  const ascender = 800;
  const descender = -200;

  const svg = await Deno.readTextFile("./src/sabaefont_alphabet_a.svg");
  const glyph_a = svg2glyph(svg, "a", unitsPerEm, ascender, descender);
  
  const glyphs = [
    notdefGlyph(unitsPerEm),
    //spaceGlyph(),
    //hira_a_Glyph(),
    //glyph_A,
    glyph_a,
    //jp_period_Glyph(),
    // ★本番はここに ぁぁ～ん・濁音半濁音・小字・句読点・長音符 などを追加
  ];

  const fontname = "sabaefont-alpha2";

  const font = new opentype.Font({
    familyName: fontname,
    styleName: 'Regular',
    unitsPerEm,
    ascender,
    descender,
    glyphs
  });

  await Deno.writeFile(fontname + '.ttf', new Uint8Array(font.toArrayBuffer()));
}
