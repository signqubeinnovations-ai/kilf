/**
 * The KILF ripple mark: a red sun just above still water, and four rings
 * spreading on the surface below it, each ring broken into a left and a
 * right stroke. Eight strokes in all, for Ashtamudi's eight arms.
 *
 * Every stroke is a filled shape, not a line: it swells in the middle and
 * tapers to a point at both ends, like light on moving water. The rings are
 * deliberately uneven (different weights, lengths and a slight tilt), so the
 * mark reads as water rather than as a diagram.
 *
 * Plain JavaScript so both the site (Logo.astro) and the build scripts
 * (favicon, share image) draw exactly the same mark.
 */

/** The mark's drawing box: the strokes and the sun, with a hair of margin. */
export const MARK = { width: 106, height: 35 };

/** The sun sits just above the water; the rings spread on the surface below it. */
export const SUN = { cx: 53, cy: 8.6, r: 7.4 };
const C = { x: 53, y: 18.4 };

/**
 * Four rings, inner to outer, seen across the water (flattened): radius (rx),
 * flattening (ry/rx), stroke weight at its widest, a slight tilt, and the arc
 * each stroke covers in degrees (0 = right, 90 = straight below the sun). The
 * strokes curve under the sun and leave a gap beneath it, where its
 * reflection would fall. Left and right differ a little, as ripples do.
 */
const RINGS = [
  { rx: 15, flat: 0.36, w: 3.4, tilt: -1.5, left: [118, 206], right: [-24, 62] },
  { rx: 26, flat: 0.33, w: 3.0, tilt: 1, left: [107, 199], right: [-18, 73] },
  { rx: 37.5, flat: 0.3, w: 2.6, tilt: -1, left: [101, 191], right: [-12, 80] },
  { rx: 50, flat: 0.28, w: 2.2, tilt: 1.2, left: [97, 184], right: [-5, 84] },
];

const r2 = (n) => Math.round(n * 100) / 100;

/** One tapered arc around the centre, from angle a0 to a1 (degrees). */
function taperedArc({ rx, flat, w: w0, tilt }, a0, a1, weight = 1, steps = 28) {
  const w = w0 * weight;
  const ry = rx * flat;
  const t0 = (tilt * Math.PI) / 180;
  const outer = [];
  const inner = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const a = ((a0 + (a1 - a0) * f) * Math.PI) / 180;
    // Swell in the middle, a fine point at each end.
    const half = (w / 2) * Math.pow(Math.sin(Math.PI * f), 0.85);
    // Point on the ellipse and its outward normal.
    const ex = Math.cos(a) * rx;
    const ey = Math.sin(a) * ry;
    let nx = Math.cos(a) * ry;
    let ny = Math.sin(a) * rx;
    const nl = Math.hypot(nx, ny) || 1;
    nx /= nl;
    ny /= nl;
    const rot = (x, y) => [C.x + x * Math.cos(t0) - y * Math.sin(t0), C.y + x * Math.sin(t0) + y * Math.cos(t0)];
    outer.push(rot(ex + nx * half, ey + ny * half));
    inner.push(rot(ex - nx * half, ey - ny * half));
  }
  const pts = [...outer, ...inner.reverse()];
  return 'M' + pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join('L') + 'Z';
}

/**
 * The eight stroke outlines (SVG path data), inner ring first, left then right.
 * `weight` thickens every stroke for very small sizes (the favicon), where
 * hairline tapers would disappear; the shapes and their number never change.
 */
export function ripplePaths(weight = 1) {
  const paths = [];
  for (const ring of RINGS) {
    paths.push(taperedArc(ring, ...ring.left, weight));
    paths.push(taperedArc(ring, ...ring.right, weight));
  }
  return paths;
}

/**
 * The mark as a standalone SVG string.
 * @param {{ ink?: string, sun?: string, pad?: number, square?: boolean, bg?: string, radius?: number, weight?: number }} o
 */
export function markSvg({ ink = '#1A1A1A', sun = '#A80E0E', pad = 0, square = false, bg, radius = 0, weight = 1 } = {}) {
  const w = MARK.width + pad * 2;
  const h = square ? w : MARK.height + pad * 2;
  const dy = (h - MARK.height) / 2;
  const body =
    `<g transform="translate(${pad} ${r2(dy)})">` +
    `<path fill="${ink}" d="${ripplePaths(weight).join('')}"/>` +
    `<circle cx="${SUN.cx}" cy="${SUN.cy}" r="${SUN.r}" fill="${sun}"/>` +
    `</g>`;
  const back = bg ? `<rect width="${w}" height="${h}" rx="${radius}" fill="${bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${r2(h)}">${back}${body}</svg>`;
}
