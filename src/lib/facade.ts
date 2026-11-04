/**
 * Architectural elevation drawings, generated as SVG.
 * They are illustrations (not project photos) and stand in wherever a real
 * photo is not yet available. Replace them with real photography when you have it.
 */
type Kind = 'commercial' | 'showroom' | 'office' | 'villa' | 'hospital' | 'campus';

const C = {
  charcoal: '#221D1A',
  coal2: '#2d2622',
  rust: '#6B3022',
  rustDeep: '#4e2116',
  cream: '#F2F0DA',
  paper: '#ECE7D7',
  sand: '#C9A27A',
  wood: '#9a6a45',
  wood2: '#875a39',
  stone: '#b9ad98',
  metal: '#8d8a84',
  glass: '#2f3a3b',
};

const r = (x: number, y: number, w: number, h: number, fill: string, extra = '') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const line = (x1: number, y1: number, x2: number, y2: number, stroke: string, w = 1, extra = '') =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${w}" ${extra}/>`;

const glassDefs = (id: string) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#43514f"/><stop offset=".55" stop-color="${C.glass}"/><stop offset="1" stop-color="#1d2526"/></linearGradient>`;

/** Grid of cladding panels with thin seams. */
function panels(x: number, y: number, w: number, h: number, cols: number, rows: number, fill: string | ((c: number, r: number) => string), seam: string, seamOpacity = 0.35) {
  const pw = w / cols;
  const ph = h / rows;
  let out = '';
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) out += r(x + i * pw, y + j * ph, pw, ph, typeof fill === 'function' ? fill(i, j) : fill);
  for (let i = 1; i < cols; i++) out += line(x + i * pw, y, x + i * pw, y + h, seam, 1, `opacity="${seamOpacity}"`);
  for (let j = 1; j < rows; j++) out += line(x, y + j * ph, x + w, y + j * ph, seam, 1, `opacity="${seamOpacity}"`);
  return out;
}

/** Hero cut-out: a tall commercial block that bleeds off the right and bottom edges. */
export function heroBuilding() {
  const id = 'hg';
  let s = `<svg viewBox="0 0 640 900" preserveAspectRatio="xMinYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>${glassDefs(id)}</defs>`;
  // Main tower
  s += r(60, 120, 600, 800, C.charcoal);
  // Vertical fins on the left wing
  s += panels(60, 120, 250, 780, 5, 13, (i, j) => ((i + j) % 4 === 0 ? C.coal2 : C.charcoal), C.cream, 0.18);
  // Glazed bays between fins
  for (let j = 0; j < 12; j++) for (let i = 0; i < 5; i++) if ((i * 7 + j * 3) % 5 !== 0) s += r(72 + i * 50, 146 + j * 60, 26, 36, `url(#${id})`, 'opacity=".9"');
  // Box projection on the right wing (sand-framed)
  s += r(330, 220, 330, 700, C.rustDeep);
  s += panels(330, 220, 330, 700, 6, 14, (i, j) => (i === 0 || j % 5 === 0 ? '#5a281b' : C.rustDeep), C.cream, 0.16);
  s += r(368, 300, 260, 150, `url(#${id})`);
  s += r(368, 520, 260, 150, `url(#${id})`);
  s += line(368, 375, 628, 375, C.cream, 1, 'opacity=".25"');
  s += line(368, 595, 628, 595, C.cream, 1, 'opacity=".25"');
  // Roof parapet + LED line
  s += r(52, 108, 616, 14, C.coal2);
  s += line(52, 108, 680, 108, C.sand, 2, 'class="led"');
  s += line(322, 212, 680, 212, C.sand, 2, 'class="led"');
  s += line(322, 212, 322, 900, C.sand, 1.5, 'class="led" opacity=".8"');
  // Signage band
  s += r(330, 470, 330, 30, C.charcoal);
  s += r(352, 481, 120, 8, C.sand, 'opacity=".85"');
  s += '</svg>';
  return s;
}

/** Category tiles. */
export function elevation(kind: Kind) {
  const id = `g-${kind}`;
  const W = 800;
  const H = 600;
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs>${glassDefs(id)}</defs>`;
  const ground = 560;
  s += r(0, 0, W, H, C.paper);
  // Faint drafting grid
  for (let x = 0; x <= W; x += 40) s += line(x, 0, x, H, C.charcoal, 1, 'opacity=".05"');
  for (let y = 0; y <= H; y += 40) s += line(0, y, W, y, C.charcoal, 1, 'opacity=".05"');
  s += line(0, ground, W, ground, C.charcoal, 2);

  if (kind === 'commercial') {
    s += r(120, 110, 560, 450, C.charcoal);
    s += panels(120, 110, 560, 330, 8, 6, (i, j) => (i % 3 === 0 ? C.wood : C.charcoal), C.cream, 0.22);
    for (let j = 0; j < 6; j++) for (let i = 0; i < 8; i++) if (i % 3 !== 0) s += r(130 + i * 70, 122 + j * 55, 50, 30, `url(#${id})`);
    s += r(120, 440, 560, 34, C.rust);
    s += r(150, 452, 150, 10, C.cream, 'opacity=".85"');
    s += r(140, 474, 520, 86, `url(#${id})`);
    for (let i = 1; i < 6; i++) s += line(140 + i * 86.6, 474, 140 + i * 86.6, 560, C.cream, 1, 'opacity=".35"');
  }
  if (kind === 'showroom') {
    s += r(80, 200, 640, 360, C.charcoal);
    s += r(80, 160, 640, 90, C.rust);
    s += panels(80, 160, 640, 90, 10, 1, C.rust, C.cream, 0.25);
    s += r(110, 190, 220, 28, C.cream, 'opacity=".9"');
    for (let i = 0; i < 14; i++) s += r(96 + i * 45, 270, 10, 290, C.sand);
    s += r(110, 300, 580, 260, `url(#${id})`, 'opacity=".75"');
    s += r(350, 400, 100, 160, C.coal2);
  }
  if (kind === 'office') {
    s += r(200, 40, 400, 520, C.charcoal);
    for (let j = 0; j < 9; j++) {
      s += r(200, 50 + j * 56, 400, 18, j % 3 === 0 ? C.metal : C.stone);
      s += r(214, 70 + j * 56, 372, 32, `url(#${id})`);
    }
    s += r(180, 30, 440, 12, C.coal2);
    s += r(170, 500, 120, 60, C.rust);
  }
  if (kind === 'villa') {
    s += r(140, 260, 520, 300, C.cream, `stroke="${C.charcoal}" stroke-width="2"`);
    s += r(120, 240, 340, 22, C.charcoal);
    s += r(400, 150, 300, 22, C.charcoal);
    s += r(420, 172, 260, 140, C.charcoal);
    s += panels(420, 172, 260, 140, 10, 1, (i) => (i % 2 ? C.wood : C.wood2), C.charcoal, 0.3);
    s += r(450, 200, 200, 84, `url(#${id})`, 'opacity=".85"');
    s += r(180, 330, 160, 150, `url(#${id})`);
    s += line(260, 330, 260, 480, C.cream, 2, 'opacity=".5"');
    s += r(430, 380, 110, 180, C.wood2);
    s += r(560, 380, 80, 100, `url(#${id})`);
  }
  if (kind === 'hospital') {
    s += r(100, 120, 600, 440, C.cream, `stroke="${C.charcoal}" stroke-width="2"`);
    s += panels(100, 120, 600, 300, 12, 6, (i, j) => ((i + j) % 2 ? C.paper : C.cream), C.charcoal, 0.25);
    for (let j = 0; j < 6; j++) for (let i = 0; i < 6; i++) s += r(120 + i * 100, 132 + j * 50, 60, 26, `url(#${id})`);
    s += r(300, 440, 200, 120, `url(#${id})`);
    s += r(100, 420, 600, 20, C.rust);
  }
  if (kind === 'campus') {
    s += r(60, 220, 680, 340, C.charcoal);
    s += panels(60, 220, 680, 340, 17, 1, (i) => (i % 2 ? C.charcoal : C.coal2), C.cream, 0.2);
    for (let j = 0; j < 3; j++) s += r(80, 250 + j * 100, 640, 46, `url(#${id})`);
    s += r(320, 140, 160, 420, C.rust);
    s += panels(320, 140, 160, 420, 3, 8, C.rust, C.cream, 0.25);
  }
  s += '</svg>';
  return s;
}

/** The 48-panel "cladding" scene: a plain building, then panels, then an LED outline. */
export function claddingScene() {
  const cols = 8;
  const rows = 6;
  const x0 = 160;
  const y0 = 120;
  const pw = 60;
  const ph = 60;
  const w = cols * pw;
  const h = rows * ph;
  const finishes = [C.charcoal, C.wood, C.charcoal, C.rust, C.charcoal, C.wood2, C.coal2, C.sand];
  let s = `<svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="cs-t"><title id="cs-t">A plain concrete building receives 48 ACP panels, then an LED line traces its outline.</title><defs>${glassDefs('csg')}</defs>`;
  // Plain building (before)
  s += `<g class="cs-base">`;
  s += r(x0 - 20, y0 - 20, w + 40, h + 200, '#9b948a');
  s += r(x0 - 30, y0 - 32, w + 60, 14, '#857e75');
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) s += r(x0 + 20 + i * 120, y0 + 20 + j * 120, 80, 70, '#3b3936');
  s += r(x0, y0 + h + 20, w, 140, '#3b3936');
  s += r(x0 + 200, y0 + h + 40, 80, 120, '#5c5650');
  s += '</g>';
  // Panels (after) — animated one by one
  s += '<g class="cs-panels">';
  let n = 0;
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      const isGlass = (j === 1 || j === 3) && i % 2 === 1;
      const fill = isGlass ? 'url(#csg)' : finishes[(i * 3 + j * 5) % finishes.length];
      s += `<rect class="cs-p" data-n="${++n}" x="${x0 + i * pw + 1}" y="${y0 + j * ph + 1}" width="${pw - 2}" height="${ph - 2}" fill="${fill}"/>`;
    }
  s += '</g>';
  // Storefront fascia (after)
  s += `<g class="cs-front">${r(x0 - 20, y0 + h, w + 40, 20, C.charcoal)}${r(x0 + 20, y0 + h + 6, 120, 8, C.sand)}${r(x0, y0 + h + 20, w, 140, 'url(#csg)')}</g>`;
  // LED outline
  const p = `M${x0 - 20} ${y0 + h + 160} V${y0 - 20} H${x0 + w + 20} V${y0 + h + 160}`;
  s += `<path class="cs-led" d="${p}" fill="none" stroke="${C.sand}" stroke-width="3" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0"/>`;
  s += line(0, y0 + h + 160, 800, y0 + h + 160, C.cream, 1, 'opacity=".3"');
  s += '</svg>';
  return s;
}

/** Finish swatches. */
export const swatches = [
  { name: 'Teak wood', css: `repeating-linear-gradient(92deg, #8a5a39 0 3px, #9a6a45 3px 9px, #7c5032 9px 11px, #a2724b 11px 18px)` },
  { name: 'Walnut wood', css: `repeating-linear-gradient(88deg, #5a3a26 0 4px, #6a4630 4px 10px, #4e3221 10px 13px)` },
  { name: 'Grey stone', css: `radial-gradient(circle at 30% 40%, #c8c0b2 0 2px, transparent 3px) 0 0/14px 14px, radial-gradient(circle at 70% 70%, #9d958a 0 1.5px, transparent 2.5px) 0 0/11px 11px, #b4ab9d` },
  { name: 'Sandstone', css: `radial-gradient(circle at 40% 60%, #d9c4a2 0 2px, transparent 3px) 0 0/12px 12px, #c9ae86` },
  { name: 'Brushed metallic', css: `repeating-linear-gradient(0deg, #a9a6a0 0 1px, #b8b5ae 1px 3px), linear-gradient(90deg, #9f9c96, #c6c3bc, #9f9c96)` },
  { name: 'Champagne gold', css: `linear-gradient(120deg, #a88a5c, #d8c08f 45%, #a88a5c)` },
  { name: 'Solid charcoal', css: `#2b2522` },
  { name: 'Solid rust', css: `#6B3022` },
  { name: 'Solid white', css: `#f1efe8` },
];
