// Recolours a lake illustration into the KILF 2027 palette, keeping the
// drawing itself: blues become a muted grey-blue (the water), the darkest
// blues become ink (the jetty, the leaves), the cream sky becomes canvas,
// and the warm sun and its reflection become the brand's deep red.
//
//   node scripts/recolor-art.mjs <input> <output.jpg>
//
// The two lake pictures in src/assets/art/ were made with this script from
// the earlier blue-and-coral artwork. Run it again on higher-resolution
// originals of the same scenes. Each pixel is mapped by its lightness onto
// the palette ramp below; warm pixels (the sun) are mapped onto the red ramp.
import sharp from 'sharp';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Usage: node scripts/recolor-art.mjs <input> <output.jpg>');
  process.exit(1);
}

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

// Lightness (0 = black, 1 = white) → colour.
const RAMP = [
  [0.0, hex('#141516')],
  [0.1, hex('#1f2224')],
  [0.24, hex('#3c4850')],
  [0.45, hex('#6f818c')],
  [0.62, hex('#94a3ab')],
  [0.76, hex('#b3bdc1')],
  [0.88, hex('#cfd1cc')],
  [0.95, hex('#e6dfd4')],
  [1.0, hex('#f3efe8')],
];
// The sun and its reflection, by lightness.
const RED = [
  [0.0, hex('#4a0505')],
  [0.5, hex('#8f0c0c')],
  [0.7, hex('#a80e0e')],
  [0.84, hex('#c4463c')],
  [1.0, hex('#e6c4bb')],
];

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
const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 3) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const L = Math.min(1, Math.max(0, lightness(r, g, b)));
  // Warmth: how much redder than blue the pixel is. The cream sky is barely
  // warm; the sun and its glints are clearly so.
  const warm = Math.min(1, Math.max(0, ((r - b) / 255 - 0.09) / 0.22));
  const base = sample(RAMP, L);
  const red = sample(RED, L);
  for (let k = 0; k < 3; k++) out[i + k] = Math.round(base[k] + (red[k] - base[k]) * warm);
}
await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(output);
console.log(`[recolor-art] ${input} → ${output}`);
