import { svg2glyph, notdefGlyph } from "./svg2glyph.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";
import * as opentype from "https://code4fukui.github.io/opentype-es/opentype.js";
import { isLowerCase } from "./isLowerCase.js";

const unitsPerEm = 1000;
const ascender = 800;
const descender = -200;
const fontname = "sabaefont-alpha3";

const dir = "./src_split_svg/";
const fns = await dir2array(dir);
fns.sort();

const glyphs = [];
glyphs.push(notdefGlyph(unitsPerEm));

for (const fn of fns) {
  if (!fn.endsWith(".svg")) continue;
  const svg = await Deno.readTextFile(dir + fn);
  const ch = fn[0];
  console.log(ch);

  const glyph = svg2glyph(svg, ch, unitsPerEm, ascender, descender);
  glyphs.push(glyph);

  // 大文字がない場合、小文字と同一のものを追加
  if (isLowerCase(ch) && !fns.find(i => i[0] == ch.toUpperCase())) {
    const glyph = svg2glyph(svg, ch.toUpperCase(), unitsPerEm, ascender, descender);
    glyphs.push(glyph);
  }
}

const font = new opentype.Font({
  familyName: fontname,
  styleName: 'Regular',
  unitsPerEm,
  ascender,
  descender,
  glyphs
});

await Deno.writeFile(fontname + '.ttf', new Uint8Array(font.toArrayBuffer()));
