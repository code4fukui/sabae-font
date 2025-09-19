/**
 * SVG文字列にメガネマークを追記して返す（既存の<svg>直下に<g class="glasses">を挿入）
 * @param {string} svgString
 * @param {Object} opt  // 1) の関数と同じ意味
 */
export function addGlassesToSvgString(svgString, {
  x = 400,
  y = 500,
  r = 120,
  gap = 300,
  bridge = 15,
  stroke = 20,
  color = 'black'
} = {}) {
  const bx1 = x + r * 0.6;
  const bx2 = x + gap - r * 0.6;
  const by  = y - r * 0.25;
  const by2 = by + bridge;

  const glassesGroup = `
  <g class="glasses" transform="translate(700 270) rotate(25) scale(.5 .5)">
    <circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"/>
    <circle cx="${x + gap}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"/>
    <path d="
      M ${bx1} ${by}
      C ${(bx1+bx2)/2} ${by - bridge*0.6}, ${(bx1+bx2)/2} ${by - bridge*0.6}, ${bx2} ${by}
      L ${bx2} ${by2}
      C ${(bx1+bx2)/2} ${by2 + bridge*0.6}, ${(bx1+bx2)/2} ${by2 + bridge*0.6}, ${bx1} ${by2}
      Z
    " fill="${color}" stroke="${color}" stroke-width="${Math.max(1, stroke/2)}"/>
  </g>`.trim();

  // <svg ...> の直後に差し込む
  return svgString.replace(/<svg\b[^>]*>/i, m => `${m}\n${glassesGroup}\n`);
}

// ---- 使い方（Node例） ----
// import fs from 'node:fs';
// let svg = fs.readFileSync('in.svg', 'utf8');
// svg = addGlassesToSvgString(svg, { x: 300, y: 520, r: 110, gap: 320, bridge: 34, stroke: 18, color: '#000' });
// fs.writeFileSync('out.svg', svg);
