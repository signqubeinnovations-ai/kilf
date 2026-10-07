// Recolours a lake illustration into the KILF 2027 festival palette, keeping
// the drawing itself: the lake turns bright backwater teal, the jetty and
// the darkest shapes cobalt and navy, the sky warm off-white, and the sun
// red-coral, with marigold glints on the water and a soft glow around it.
//
//   node scripts/recolor-art.mjs <input> <output.jpg>
//
// The two lake pictures in src/assets/art/ were made with this script from
// the original artwork. Run it again on higher-resolution originals of the
// same scenes. Each pixel is mapped by its lightness onto the palette ramp
// below; warm pixels (the sun) are mapped onto the sun ramp.
import sharp from 'sharp';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/recolor-art.mjs <input> <output.jpg>');
  process.exit(1);
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

// Lightness (0 = black, 1 = white) → colour.
const RAMP = [
  [0.0, hex('#0b1a4a')],
  [0.14, hex('#162c9a')],
  [0.28, hex('#1e3fd8')],
  [0.46, hex('#0e8f80')],
  [0.6, hex('#14b8a6')],
  [0.74, hex('#4fcdbe')],
  [0.84, hex('#9be5db')],
  [0.92, hex('#dcf5ef')],
  [0.965, hex('#fff3e0')],
  [1.0, hex('#fffaf3')],
];
// The sun and its reflection, by lightness: red-coral at the core, glinting
// to orange and marigold where it is lighter.
const RED = [
  [0.0, hex('#8a1a10')],
  [0.55, hex('#e23a2c')],
  [0.7, hex('#f2483a')],
  [0.82, hex('#ff7a4a')],
  [0.9, hex('#ffb703')],
  [1.0, hex('#fff1d6')],
];
const GLOW = hex('#ffb703');

const lin = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
// Perceptual lightness (CIE L*, 0–1) from sRGB.
const lightness = (r, g, b) => {
  const y = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return (y > 0.008856 ? 116 * Math.cbrt(y) - 16 : 903.3 * y) / 100;
};
const sample = (ramp, t) => {
  for (let i = 1; i < ramp.length; i++) {
    const [t1, c1] = ramp[i];
    const [t0, c0] = ramp[i - 1];
    if (t <= t1) {
      const f = (t - t0) / (t1 - t0 || 1);
      return c0.map((v, k) => v + (c1[k] - v) * f);
    }
  }
  return ramp[ramp.length - 1][1];
};

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const out = Buffer.alloc(data.length);
const L = new Float32Array(W * H);
const warm = new Float32Array(W * H);
// Where the sun is: the strongly warm pixels in the top third of the picture.
let sx = 0, sy = 0, sn = 0;
for (let i = 0, p = 0; i < data.length; i += 3, p++) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  L[p] = Math.min(1, Math.max(0, lightness(r, g, b)));
  // Warmth: how much redder than blue the pixel is. The cream sky is barely
  // warm; the sun and its glints are clearly so.
  warm[p] = Math.min(1, Math.max(0, ((r - b) / 255 - 0.09) / 0.22));
  const y = Math.floor(p / W);
  if (warm[p] > 0.9 && y < H / 3) { sx += p % W; sy += y; sn++; }
}
const sun = sn > 50 ? { x: sx / sn, y: sy / sn, r: Math.sqrt(sn / Math.PI) } : null;
for (let i = 0, p = 0; i < data.length; i += 3, p++) {
  const base = sample(RAMP, L[p]);
  const red = sample(RED, L[p]);
  let c = base.map((v, k) => v + (red[k] - v) * warm[p]);
  // A soft marigold glow around the sun, over the sky only.
  if (sun && L[p] > 0.9 && warm[p] < 0.5) {
    const d = Math.hypot((p % W) - sun.x, Math.floor(p / W) - sun.y) / (sun.r * 2.4);
    const a = 0.38 * Math.exp(-d * d);
    c = c.map((v, k) => v + (GLOW[k] - v) * a);
  }
  for (let k = 0; k < 3; k++) out[i + k] = Math.round(c[k]);
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);
console.log(`[recolor-art] ${input} → ${output}`);
