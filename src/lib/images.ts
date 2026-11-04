/**
 * Reference images from the FACADO brochure. They are illustrative (not FACADO
 * project photos), so they are always shown with an "Illustrative" tag and never
 * on case-study pages. Replace them with your own photos when you have them.
 */
import stoneWoodVilla from '@/assets/brochure/stone-wood-villa.jpg';
import glassOffice from '@/assets/brochure/glass-office.jpg';
import greyBox from '@/assets/brochure/grey-box-projection.jpg';
import acpSheets from '@/assets/brochure/acp-sheets.png';
import charcoalOrange from '@/assets/brochure/charcoal-orange-commercial.png';
import woodHouse from '@/assets/brochure/wood-finish-house.png';
import curvedStone from '@/assets/brochure/curved-stone-facade.jpg';
import commercialComplex from '@/assets/brochure/commercial-complex.jpg';
import villaNight from '@/assets/brochure/villa-night.jpg';

export const ref = {
  'stone-wood-villa': { src: stoneWoodVilla, alt: 'Modern building with stone-finish cladding, wood-finish fins and glass balconies' },
  'glass-office': { src: glassOffice, alt: 'Corporate office block with a dark panel facade and vertical fins over full-height glazing' },
  'grey-box-projection': { src: greyBox, alt: 'Charcoal ACP facade with a box projection framing a glass balcony' },
  'acp-sheets': { src: acpSheets, alt: 'ACP sheet samples in wood, marble, silver and grey finishes' },
  'charcoal-orange-commercial': { src: charcoalOrange, alt: 'Commercial building clad in charcoal and grey ACP with an orange entrance frame' },
  'wood-finish-house': { src: woodHouse, alt: 'Two-storey house clad in wood-finish panels with a glass balcony' },
  'curved-stone-facade': { src: curvedStone, alt: 'Curved multi-storey facade with stone-finish horizontal bands' },
  'commercial-complex': { src: commercialComplex, alt: 'Commercial complex with stone, silver ACP and wood-finish panels around glazing' },
  'villa-night': { src: villaNight, alt: 'Villa elevation at dusk with stone-finish cladding and lit wood-finish fins' },
} as const;
export type RefName = keyof typeof ref;

/** Category tiles on the homepage. */
export const categoryImage: Record<string, RefName> = {
  commercial: 'commercial-complex',
  showroom: 'charcoal-orange-commercial',
  office: 'glass-office',
  villa: 'villa-night',
};

/** Hero image per service page (by file name). */
export const serviceImage: Record<string, RefName> = {
  'acp-cladding-kollam': 'grey-box-projection',
  'commercial-building-elevation': 'commercial-complex',
  'shop-front-elevation': 'charcoal-orange-commercial',
  'villa-elevation-design': 'villa-night',
  'acp-renovation': 'curved-stone-facade',
  '3d-facade-design': 'wood-finish-house',
};
