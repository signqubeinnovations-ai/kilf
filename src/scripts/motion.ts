import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const lenis = (window as unknown as { __lenis?: { on: (e: string, f: () => void) => void } }).__lenis;
lenis?.on('scroll', ScrollTrigger.update);
const ease = 'expo.out';

/* Signature: the cladding scene. 48 panels clip in one by one, then an LED line traces the outline. */
document.querySelectorAll<HTMLElement>('[data-cladding]').forEach((scene) => {
  const panels = scene.querySelectorAll<SVGRectElement>('.cs-p');
  const front = scene.querySelector('.cs-front');
  const led = scene.querySelector('.cs-led');
  const count = scene.querySelector<HTMLElement>('[data-cs-count]');
  const cap = scene.querySelector<HTMLElement>('[data-cs-cap]');
  const total = panels.length;
  gsap.set(panels, { scaleY: 0, opacity: 0, transformOrigin: '50% 0%' });
  gsap.set(front, { opacity: 0 });
  gsap.set(led, { strokeDashoffset: 1 });
  gsap.set(cap, { opacity: 0, y: 20 });
  const tl = gsap.timeline({
    defaults: { ease },
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: () => '+=' + Math.round(innerHeight * 2.2),
      scrub: 0.5,
      pin: scene.querySelector('[data-pin]') || scene,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
  tl.to(panels, {
    scaleY: 1, opacity: 1, duration: 0.6, stagger: 0.07,
    onUpdate() {
      const n = [...panels].filter((p) => Number(gsap.getProperty(p, 'opacity')) > 0.5).length;
      if (count) count.textContent = String(Math.max(1, n)).padStart(2, '0');
    },
  })
    .to(front, { opacity: 1, duration: 0.5 }, '-=0.4')
    .to(led, { strokeDashoffset: 0, duration: 1.2, ease: 'none' })
    .to(cap, { opacity: 1, y: 0, duration: 0.6 }, '-=0.6');
  if (count) count.textContent = '01';
  void total;
});

/* Project gallery: horizontal pinned scroll on desktop. Mobile keeps native swipe. */
const mm = gsap.matchMedia();
mm.add('(min-width: 64rem)', () => {
  document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-htrack]');
    if (!track) return;
    const dist = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
    if (dist() < 40) return;
    gsap.to(track, {
      x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: wrap, start: 'top 12%', end: () => '+=' + dist(), scrub: 0.6, pin: true, invalidateOnRefresh: true },
    });
  });
});

addEventListener('load', () => ScrollTrigger.refresh());
