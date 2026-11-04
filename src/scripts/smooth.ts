import Lenis from 'lenis';
const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -80 } });
(window as unknown as { __lenis: Lenis }).__lenis = lenis;
function frame(t: number) { lenis.raf(t); requestAnimationFrame(frame); }
requestAnimationFrame(frame);
export default lenis;
