/**
 * The festival's lake illustrations. `mask` traces the water in each picture
 * (0–1 of its width and height): the hero's ripple is clipped to it, so it
 * never crosses the jetty or the book.
 */
import lakeHero from '@/assets/art/lake-hero.jpg';
import lakeJetty from '@/assets/art/lake-jetty.jpg';

export const arts = {
  hero: {
    img: lakeHero,
    widths: [640, 960, 1280, 1920, 2560, 3200],
    alt: 'An open book on a wooden jetty by a calm lake at sunrise, palms on the far shore and a coral sun low in the sky.',
    mask: [
      [0.0, 0.245], [1.0, 0.245], [1.0, 0.412], [0.948, 0.448], [0.9, 0.486], [0.852, 0.523], [0.811, 0.545], [0.779, 0.534], [0.739, 0.523], [0.699, 0.531], [0.642, 0.562], [0.586, 0.614], [0.546, 0.653], [0.521, 0.684], [0.465, 0.716], [0.433, 0.731], [0.332, 0.791], [0.332, 0.875], [0.0, 0.773],
    ],
  },
  jetty: {
    img: lakeJetty,
    widths: [640, 960, 1280, 1920, 2560, 3200],
    alt: 'A wide, still lake at dusk with palm islands on the horizon, a wooden jetty with an open book, and leaves in the foreground.',
    mask: [
      [0, 0.182], [1, 0.182], [1, 0.686], [0.967, 0.698], [0.927, 0.686], [0.878, 0.698], [0.819, 0.724], [0.819, 0.612],
      [0.783, 0.612], [0.783, 0.739], [0.584, 0.788], [0.584, 0.674], [0.54, 0.674], [0.54, 1], [0.278, 1], [0.278, 0.959],
      [0.242, 0.898], [0.21, 0.878], [0.173, 0.816], [0.149, 0.724], [0.121, 0.674], [0.101, 0.612], [0.048, 0.592], [0, 0.535],
    ],
  },
} as const;
