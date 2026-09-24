/**
 * A small height-field water simulation (the classic two-buffer ripple) with
 * soft lighting, drawn to a low-resolution canvas that CSS scales up. The
 * low resolution is deliberate: the browser's smoothing makes the surface
 * read as soft, calm water, and it keeps each frame to about a millisecond.
 */

type RGB = [number, number, number];

export interface Palette {
  /** Water colour at the top and bottom of the surface. */
  top: RGB;
  bottom: RGB;
  /** Colour of the light that catches the crests. */
  light: RGB;
  /** Sun or moon glitter: its tint and where it sits (0–1 of the surface). */
  glow: RGB;
  glowX: number;
  glowY: number;
  glowR: number;
}

const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

export const palettes = {
  // Ashtamudi at first light: cobalt shallows, navy depths, a peach sun
  day: { top: hex('#5673F4'), bottom: hex('#0E1A6E'), light: hex('#FFFFFF'), glow: hex('#FFC2AE'), glowX: 0.74, glowY: 0.2, glowR: 0.36 },
  // New Year's Eve: deep water under a lime moon
  night: { top: hex('#1B2B9E'), bottom: hex('#050B33'), light: hex('#DCE3FF'), glow: hex('#E7EF93'), glowX: 0.7, glowY: 0.16, glowR: 0.3 },
  // Evening: bright cobalt fading to navy, coral light low on the water
  dusk: { top: hex('#2F52EE'), bottom: hex('#0A1454'), light: hex('#FFFFFF'), glow: hex('#F79A83'), glowX: 0.84, glowY: 0.82, glowR: 0.42 },
} satisfies Record<string, Palette>;

export type PaletteName = keyof typeof palettes;

export class Water {
  readonly w: number;
  readonly h: number;
  private cur: Float32Array;
  private prev: Float32Array;
  private edge: Float32Array;
  private rowColor: Float32Array;
  private glowMap: Float32Array;
  damping = 0.989;

  constructor(w: number, h: number, private pal: Palette) {
    this.w = w;
    this.h = h;
    this.cur = new Float32Array(w * h);
    this.prev = new Float32Array(w * h);
    // Waves fade out near the edges instead of bouncing back like a pool.
    this.edge = new Float32Array(w * h);
    const band = Math.max(4, Math.round(Math.min(w, h) * 0.08));
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const d = Math.min(x, y, w - 1 - x, h - 1 - y);
        this.edge[y * w + x] = d >= band ? 1 : 0.82 + 0.18 * (d / band);
      }
    }
    // Precompute the gradient per row and the glow falloff per cell.
    this.rowColor = new Float32Array(h * 3);
    for (let y = 0; y < h; y++) {
      const t = y / (h - 1);
      const e = t * t * (3 - 2 * t);
      for (let c = 0; c < 3; c++) this.rowColor[y * 3 + c] = pal.top[c] + (pal.bottom[c] - pal.top[c]) * e;
    }
    this.glowMap = new Float32Array(w * h);
    const aspect = h / w;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = x / w - pal.glowX;
        const dy = (y / h - pal.glowY) * aspect * 1.6;
        this.glowMap[y * w + x] = Math.exp(-(dx * dx + dy * dy) / (pal.glowR * pal.glowR));
      }
    }
  }

  /** Disturb the surface. x and y are 0–1; radius is in cells. */
  drop(x: number, y: number, radius: number, strength: number) {
    const cx = Math.round(x * (this.w - 1));
    const cy = Math.round(y * (this.h - 1));
    const r = Math.max(1, radius);
    for (let j = -r; j <= r; j++) {
      for (let i = -r; i <= r; i++) {
        const px = cx + i;
        const py = cy + j;
        if (px < 1 || py < 1 || px >= this.w - 1 || py >= this.h - 1) continue;
        const d = Math.sqrt(i * i + j * j) / r;
        if (d <= 1) this.cur[py * this.w + px] += strength * (0.5 + 0.5 * Math.cos(Math.PI * d));
      }
    }
  }

  step() {
    const { w, h, cur, prev, edge, damping } = this;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const v = (cur[i - 1] + cur[i + 1] + cur[i - w] + cur[i + w]) * 0.5 - prev[i];
        prev[i] = v * damping * edge[i];
      }
    }
    this.cur = prev;
    this.prev = cur;
  }

  render(img: ImageData) {
    const { w, h, cur, rowColor, glowMap, pal } = this;
    const data = img.data;
    const [lr, lg, lb] = pal.light;
    const [gr, gg, gb] = pal.glow;
    for (let y = 0; y < h; y++) {
      const br = rowColor[y * 3];
      const bg = rowColor[y * 3 + 1];
      const bb = rowColor[y * 3 + 2];
      for (let x = 0; x < w; x++) {
        const i = y * w + x;
        const l = x > 0 ? cur[i - 1] : cur[i];
        const r = x < w - 1 ? cur[i + 1] : cur[i];
        const u = y > 0 ? cur[i - w] : cur[i];
        const d = y < h - 1 ? cur[i + w] : cur[i];
        // Light falls from the top right: slopes facing it brighten.
        const s = ((u - d) * 1.0 + (r - l) * 0.55) * 0.07;
        const shade = 1 + (s > 0.5 ? 0.5 : s < -0.32 ? -0.32 : s);
        const spec = s > 0 ? s * s * 1.6 : 0;
        const g = glowMap[i];
        const glint = g * (0.28 + (s > 0 ? s * 2.4 : 0));
        const o = i * 4;
        data[o] = br * shade + lr * spec + gr * glint;
        data[o + 1] = bg * shade + lg * spec + gg * glint;
        data[o + 2] = bb * shade + lb * spec + gb * glint;
        data[o + 3] = 255;
      }
    }
  }
}
