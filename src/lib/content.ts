/** Shared copy used across pages. Brand voice: short, confident, architectural. */

export const process = [
  {
    group: 'Design',
    steps: [
      { n: 1, title: 'Site Survey', short: 'We measure the building and study its light, access and condition.', detail: 'We visit the site and measure every face of the building. We note the wall condition, existing signage, drainage, access for scaffolding and how the light falls through the day. Nothing is designed from guesswork.' },
      { n: 2, title: 'Architectural Consultation', short: 'We learn your brand, budget and what the building must do.', detail: 'We sit with you, and your architect if you have one. We talk about your brand, your customers, your budget and your timeline. We agree what the facade must achieve before we draw a line.' },
      { n: 3, title: 'Design Development', short: 'Concepts and 3D views, refined until it is right.', detail: 'We develop facade concepts and show them as 3D views on your actual building. You see colours, finishes and signage in context. We refine until you are sure.' },
    ],
  },
  {
    group: 'Fabricate',
    steps: [
      { n: 4, title: 'Detailed Shop Drawings', short: 'Every panel, joint and fixing drawn to the millimetre.', detail: 'Once the design is approved, we prepare shop drawings. Every panel is sized, numbered and detailed, with joints, returns and fixing points marked. This is how the site work stays clean.' },
      { n: 5, title: 'Structural Framework Planning', short: 'The aluminium sub-frame is planned for load and wind.', detail: 'We plan the aluminium framework that carries the panels. Spacing, anchors and supports are chosen for the wall type, panel size and wind exposure of the site.' },
      { n: 6, title: 'ACP Fabrication', short: 'Panels are routed, folded and prepared to the drawings.', detail: 'Panels are cut, routed and folded into trays to match the drawings. Edges, corners and returns are prepared before anything reaches site.' },
      { n: 7, title: 'Quality Inspection', short: 'Panels and frames are checked before they leave.', detail: 'We check panel sizes, finish, coating and protective film before dispatch. Frame members and fixings are counted and matched to the drawings.' },
    ],
  },
  {
    group: 'Install',
    steps: [
      { n: 8, title: 'Professional Installation', short: 'Our own team fixes the frame, panels and sealant.', detail: 'Our installation team fixes the framework, mounts the panels and seals the joints. Lines are checked level and plumb as the work goes up. The site is kept safe and tidy.' },
      { n: 9, title: 'Final Handover', short: 'A walk-through, a clean facade and care guidance.', detail: 'We remove the protective film, clean the facade and walk you through it. You get simple care guidance for Kerala weather. Then the building is yours to open.' },
    ],
  },
];

export const whyAcp = [
  { title: 'Contemporary appearance', text: 'Crisp lines and flat, even surfaces give any building a modern face.' },
  { title: 'Lightweight construction', text: 'Thin aluminium skins over a core. Less load on walls and structure.' },
  { title: 'Weather-resistant performance', text: 'Detailed for monsoon rain, humidity and coastal air.' },
  { title: 'UV-resistant finishes', text: 'Exterior-grade coatings hold their colour in strong sun.' },
  { title: 'Low maintenance', text: 'A wash with water and mild soap keeps most finishes looking new.' },
  { title: 'Excellent durability', text: 'Aluminium does not rust. Panels stay flat and true.' },
  { title: 'Fast installation', text: 'Panels are prepared off-site, so time on site is short.' },
  { title: 'Wide range of colours and textures', text: 'Solids, metallics, wood and stone finishes in one system.' },
  { title: 'Easy replacement and future changes', text: 'Single panels can be replaced or updated without disturbing the rest.' },
  { title: 'For new builds and renovations', text: 'Specified at design stage, or fixed over an existing wall.' },
];

/** Homepage services list (from the brochure), each linked to its page. */
export const homeServices = [
  { title: 'ACP Building Facades', text: 'Complete ACP facade systems, designed, engineered and installed by one team.', href: '/acp-cladding-kollam', img: 'grey-box-projection' },
  { title: 'Commercial Elevations', text: 'Elevations for complexes, offices, hospitals and campuses, with planned signage zones.', href: '/commercial-building-elevation', img: 'commercial-complex' },
  { title: 'Shop & Showroom Fronts', text: 'Fronts that are seen from the street, read in a glance and invite people in.', href: '/shop-front-elevation', img: 'charcoal-orange-commercial' },
  { title: 'Villa Elevations', text: 'Modern home elevations in wood, stone and solid finishes, built for Kerala weather.', href: '/villa-elevation-design', img: 'villa-night' },
  { title: 'Building Renovation', text: 'A new face for an existing building, fixed in front of the old wall. No demolition.', href: '/acp-renovation', img: 'curved-stone-facade' },
  { title: '3D Facade Design & ACP Features', text: 'See the facade on your building before work starts, including folded 3D features.', href: '/3d-facade-design', img: 'wood-finish-house' },
] as const;

/** Sectors we serve (from the brochure). */
export const sectors = [
  { title: 'Corporate Buildings', text: 'Restrained materials and precise lines that carry your brand.' },
  { title: 'Commercial Complexes', text: 'One clear identity and an orderly signage system for every tenant.' },
  { title: 'Retail Showrooms', text: 'Street presence, framed displays and built-in signage.' },
  { title: 'Hospitals', text: 'Calm, clean finishes, clear wayfinding and fire-retardant cores.' },
  { title: 'Educational Campuses', text: 'Durable, low-maintenance surfaces and a recognisable identity.' },
  { title: 'Villas', text: 'Warm, modern elevations that still look right in ten years.' },
];

/** Four capabilities under the hero. */
export const capabilities = [
  { title: 'Design', text: 'Survey, consultation and 3D design on your building.' },
  { title: 'Engineering', text: 'Shop drawings and framework planned for load and wind.' },
  { title: 'Fabrication', text: 'Panels routed, folded and checked before dispatch.' },
  { title: 'Installation', text: 'Our own team fixes, seals and hands over.' },
];

export const materials = [
  { title: 'Premium ACP sheets', text: 'Exterior-grade aluminium composite panels with durable coatings.' },
  { title: 'High-quality aluminium framework', text: 'A rust-free sub-frame that carries the panels.' },
  { title: 'SS fasteners', text: 'Stainless steel fixings that stand up to monsoon humidity.' },
  { title: 'Weatherproof sealants', text: 'Joints sealed against driving rain.' },
  { title: 'Precision-fabricated components', text: 'Trays, returns and corners made to the drawings.' },
  { title: 'Powder-coated supports', text: 'Protected brackets and supports for long service.' },
];

export const quality = [
  { title: 'Accurate alignment', text: 'Joints run straight, level and plumb across the whole face.' },
  { title: 'Clean finishing', text: 'Even reveals, tidy corners and sealant lines you do not notice.' },
  { title: 'Secure fixing systems', text: 'Frames and anchors chosen for the wall and the wind.' },
  { title: 'Weather resistance', text: 'Detailed so rain runs off and does not get in.' },
  { title: 'Long service life', text: 'Materials and coatings specified to last, not just to look good on day one.' },
];

export const possibilities = [
  { title: 'Modern Minimalist', text: 'Large flat panels, tight joints, one or two colours.' },
  { title: 'Contemporary Commercial', text: 'Clean grids of panel and glass that read as modern business.' },
  { title: 'Geometric', text: 'Angled cuts and patterns that give a flat wall rhythm.' },
  { title: 'Box Projection', text: 'A framed box that pushes forward and frames a window or sign.' },
  { title: 'Floating Panel', text: 'Panels set off the wall with shadow gaps, so they seem to float.' },
  { title: 'Vertical Fin', text: 'Repeated fins that add depth and shade.' },
  { title: 'Horizontal Band', text: 'Long bands that make a building look wider and calmer.' },
  { title: '3D ACP Features', text: 'Folded and routed shapes that step out of the surface.' },
  { title: 'Wood Finish', text: 'The warmth of timber without the termites or the polishing.' },
  { title: 'Stone Finish', text: 'The weight of stone at a fraction of the load.' },
  { title: 'Metallic', text: 'Brushed, champagne and bronze tones for premium retail.' },
  { title: 'Custom Corporate Branding', text: 'Your brand colours and signage built into the facade itself.' },
];

export const categories = [
  { kind: 'commercial', title: 'Commercial Buildings', href: '/commercial-building-elevation', label: 'ACP FACADE / COMMERCIAL BUILDING' },
  { kind: 'showroom', title: 'Showrooms & Retail', href: '/shop-front-elevation', label: 'ACP FACADE / SHOWROOM FRONT' },
  { kind: 'office', title: 'Corporate Offices', href: '/commercial-building-elevation', label: 'ACP FACADE / CORPORATE OFFICE' },
  { kind: 'villa', title: 'Villas', href: '/villa-elevation-design', label: 'ACP FACADE / VILLA ELEVATION' },
] as const;

export const secondaryCategories = [
  { title: 'Hospitals', href: '/commercial-building-elevation' },
  { title: 'Educational Campuses', href: '/commercial-building-elevation' },
  { title: 'Renovation', href: '/acp-renovation' },
  { title: '3D Facade Design', href: '/3d-facade-design' },
];

export const marquee = ['Commercial', 'Showroom', 'Corporate Office', 'Villa', 'Hospital', 'Campus'];

/** Building types (contact form). */
export const pickerTypes = [
  { id: 'commercial', label: 'Commercial building' },
  { id: 'showroom', label: 'Shop / showroom' },
  { id: 'office', label: 'Corporate office' },
  { id: 'villa', label: 'Villa / home' },
];


/** From the brochure. */
export const whyChoose = [
  'Excellence in every facade',
  'Dedicated ACP specialists',
  'Engineering-driven approach',
  'Modern architectural designs',
  'Precision fabrication',
  'Skilled installation team',
  'Timely project execution',
  'Reliable after-sales support',
  'Professional site management',
  'Premium finish, every time',
];
