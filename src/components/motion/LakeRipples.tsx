import { useEffect, useRef, useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import { MotionRoot, calm, useCalmMotion } from './shared';
import { Water, inside } from './water';

/**
 * Brings a drawn lake to life. A WebGL layer sits exactly over the artwork's
 * <img> (the nearest [data-lake] parent) and redraws it through a live water
 * surface: drops fall now and then, the pointer leaves a soft wake and a tap
 * sends out a ring. Only the water moves; the shore, the jetty and the book
 * stay put. It stops off screen and when motion is paused, and never starts
 * for reduced motion or without WebGL, leaving the still artwork. Decorative.
 */
type Pt = readonly [number, number];
interface Props {
  /** The water's outline in the artwork's own coordinates (0–1). */
  mask: Pt[];
  /** How much wider a cell is than tall: above 1 flattens rings into wide ellipses. */
  squash?: number;
  /** CSS pixels per simulation cell, vertically. */
  cell?: number;
  /** Average seconds between drops. */
  rain?: number;
  /** The artwork's object-position (0–1). */
  focus?: [number, number];
  /** How far the water bends the picture. */
  strength?: number;
  interactive?: boolean;
}

const STEP = 1000 / 40;

const VERT = `attribute vec2 p;
varying vec2 v;
void main() {
  v = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `precision mediump float;
varying vec2 v;
uniform sampler2D img;
uniform sampler2D rip;
uniform vec2 scale;
uniform vec2 offset;
uniform vec2 bend;
void main() {
  vec4 r = texture2D(rip, v);
  vec2 d = (r.rg - 0.5) * 2.0;
  vec3 c = texture2D(img, (v + d * bend) * scale + offset).rgb;
  float s = (r.b - 0.5) * 2.0;
  c = c * (1.0 + s * 0.3) + vec3(0.96, 0.98, 1.0) * max(s, 0.0) * max(s, 0.0) * 1.6;
  gl_FragColor = vec4(c, 1.0);
}`;

interface Scene {
  gl: WebGLRenderingContext;
  imgTex: WebGLTexture;
  ripTex: WebGLTexture;
  uScale: WebGLUniformLocation | null;
  uOffset: WebGLUniformLocation | null;
  uBend: WebGLUniformLocation | null;
  iw: number;
  ih: number;
  water?: Water;
  data?: Uint8Array;
  wet?: Int32Array;
  mask?: Float32Array;
  dirty: boolean;
}

function shader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) throw new Error('shader');
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? 'shader');
  return s;
}

function texture(gl: WebGLRenderingContext, unit: number) {
  const t = gl.createTexture();
  if (!t) throw new Error('texture');
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return t;
}

function setup(cv: HTMLCanvasElement, img: HTMLImageElement): Scene | null {
  const gl = cv.getContext('webgl', { antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
  if (!gl) return null;
  try {
    const prog = gl.createProgram();
    if (!prog) return null;
    gl.attachShader(prog, shader(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, shader(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const at = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(at);
    gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
    const imgTex = texture(gl, 0);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    const ripTex = texture(gl, 1);
    gl.uniform1i(gl.getUniformLocation(prog, 'img'), 0);
    gl.uniform1i(gl.getUniformLocation(prog, 'rip'), 1);
    return {
      gl,
      imgTex,
      ripTex,
      uScale: gl.getUniformLocation(prog, 'scale'),
      uOffset: gl.getUniformLocation(prog, 'offset'),
      uBend: gl.getUniformLocation(prog, 'bend'),
      iw: img.naturalWidth,
      ih: img.naturalHeight,
      dirty: true,
    };
  } catch {
    return null;
  }
}

function blur(a: Float32Array, w: number, h: number) {
  const b = new Float32Array(a.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      let n = 0;
      for (let j = -1; j <= 1; j++) {
        for (let i = -1; i <= 1; i++) {
          const px = x + i;
          const py = y + j;
          if (px < 0 || py < 0 || px >= w || py >= h) continue;
          sum += a[py * w + px];
          n++;
        }
      }
      b[y * w + x] = sum / n;
    }
  }
  a.set(b);
}

function Ripples({ mask, squash = 2.4, cell = 2.2, rain = 1.7, focus = [0.5, 0.5], strength = 1, interactive = true }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const drawn = useRef(false);
  const active = useCalmMotion(wrap);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [failed, setFailed] = useState(false);

  // Fit the canvas, the picture mapping and the simulation to the frame.
  const layout = (s: Scene) => {
    const el = wrap.current;
    const cv = canvas.current;
    if (!el || !cv) return false;
    const { width: fw, height: fh } = el.getBoundingClientRect();
    if (!fw || !fh) return false;
    const { gl } = s;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(fw * dpr);
    cv.height = Math.round(fh * dpr);
    gl.viewport(0, 0, cv.width, cv.height);
    // Same crop as object-fit: cover.
    const k = Math.max(fw / s.iw, fh / s.ih);
    const sx = fw / (s.iw * k);
    const sy = fh / (s.ih * k);
    const ox = (1 - sx) * focus[0];
    const oy = (1 - sy) * focus[1];
    gl.uniform2f(s.uScale, sx, sy);
    gl.uniform2f(s.uOffset, ox, oy);
    const amount = 0.0085 * strength;
    gl.uniform2f(s.uBend, amount, (amount * fw) / fh);
    // Simulation grid, and where the water is on it.
    const w = Math.max(24, Math.min(240, Math.round(fw / (cell * squash))));
    const h = Math.max(40, Math.min(360, Math.round(fh / cell)));
    const wetness = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        wetness[y * w + x] = inside(((x + 0.5) / w) * sx + ox, ((y + 0.5) / h) * sy + oy, mask) ? 1 : 0;
      }
    }
    blur(wetness, w, h);
    blur(wetness, w, h);
    const water = new Water(w, h, wetness);
    const wet: number[] = [];
    wetness.forEach((v, i) => v > 0.9 && wet.push(i));
    // Start with a few settled rings, so the first frame already looks like water.
    for (let n = 0; n < 3 && wet.length; n++) {
      const i = wet[Math.floor(Math.random() * wet.length)];
      water.drop((i % w) / (w - 1), Math.floor(i / w) / (h - 1), 3, 7);
    }
    for (let n = 0; n < 30; n++) water.step();
    const data = new Uint8Array(w * h * 4);
    water.encode(data);
    gl.activeTexture(gl.TEXTURE1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
    Object.assign(s, { water, data, wet: Int32Array.from(wet), mask: wetness, dirty: false });
    return true;
  };

  const draw = (s: Scene) => {
    const { gl, water, data } = s;
    if (!water || !data) return;
    water.encode(data);
    gl.activeTexture(gl.TEXTURE1);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, water.w, water.h, gl.RGBA, gl.UNSIGNED_BYTE, data);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  // Re-fit when the frame changes size.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (scene.current) scene.current.dirty = true;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Run while on screen and allowed to move.
  useEffect(() => {
    if (!active || reduce || failed) return;
    const el = wrap.current;
    const cv = canvas.current;
    const img = el?.closest('[data-lake]')?.querySelector('img');
    if (!el || !cv || !img) return;
    let raf = 0;
    let stopped = false;

    const onLost = (e: Event) => {
      e.preventDefault();
      setShown(false);
      setFailed(true);
    };
    cv.addEventListener('webglcontextlost', onLost);

    // A sharper source (responsive images) replaces the texture.
    const onSwap = () => {
      const s = scene.current;
      if (!s || !img.naturalWidth) return;
      s.gl.activeTexture(s.gl.TEXTURE0);
      s.gl.texImage2D(s.gl.TEXTURE_2D, 0, s.gl.RGB, s.gl.RGB, s.gl.UNSIGNED_BYTE, img);
      s.iw = img.naturalWidth;
      s.ih = img.naturalHeight;
      s.dirty = true;
    };

    const start = () => {
      if (stopped) return;
      if (!scene.current) {
        const s = setup(cv, img);
        if (!s) {
          setFailed(true);
          return;
        }
        scene.current = s;
      }
      img.addEventListener('load', onSwap);
      let last = performance.now();
      let acc = 0;
      let nextDrop = last + 500;
      const loop = (now: number) => {
        const s = scene.current;
        if (!s) return;
        if (s.dirty && !layout(s)) {
          raf = requestAnimationFrame(loop);
          return;
        }
        acc += Math.min(now - last, 100);
        last = now;
        const { water, wet } = s;
        if (water && wet?.length && now > nextDrop) {
          const i = wet[Math.floor(Math.random() * wet.length)];
          const big = Math.random() < 0.2;
          water.drop((i % water.w) / (water.w - 1), Math.floor(i / water.w) / (water.h - 1), big ? 4 : 2, big ? 9 : 3 + Math.random() * 3);
          nextDrop = now + rain * 1000 * (0.5 + Math.random());
        }
        let n = 0;
        while (water && acc >= STEP && n < 3) {
          water.step();
          acc -= STEP;
          n++;
        }
        if (n) {
          draw(s);
          if (!drawn.current) {
            drawn.current = true;
            setShown(true);
          }
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, { once: true });

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      img.removeEventListener('load', start);
      img.removeEventListener('load', onSwap);
      cv.removeEventListener('webglcontextlost', onLost);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce, failed]);

  // Pointer: a soft wake while moving over the water, a ring on tap.
  useEffect(() => {
    const el = wrap.current;
    if (!el || !interactive || !active || reduce || failed) return;
    let lastMove = 0;
    const touch = (e: PointerEvent, radius: number, strength: number) => {
      const s = scene.current;
      if (!s?.water || !s.mask) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const { w, h } = s.water;
      const cx = Math.min(w - 1, Math.max(0, Math.round(x * (w - 1))));
      const cy = Math.min(h - 1, Math.max(0, Math.round(y * (h - 1))));
      if (s.mask[cy * w + cx] < 0.5) return;
      s.water.drop(x, y, radius, strength);
    };
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (e.pointerType === 'touch' || now - lastMove < 40) return;
      lastMove = now;
      touch(e, 2, 2.6);
    };
    const down = (e: PointerEvent) => touch(e, 4, 12);
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerdown', down, { passive: true });
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerdown', down);
    };
  }, [interactive, active, reduce, failed]);

  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden="true">
      <m.canvas
        ref={canvas}
        className="block size-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: shown && !failed && !reduce ? 1 : 0 }}
        transition={{ duration: 1.2, ease: calm }}
      />
    </div>
  );
}

export default function LakeRipples(props: Props) {
  return (
    <MotionRoot>
      <Ripples {...props} />
    </MotionRoot>
  );
}
