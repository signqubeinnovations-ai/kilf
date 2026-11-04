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
  { title: 'Lightweight construction', text: 'Thin aluminium skins over a core. Less load on old walls and structures.' },
  { title: 'Weather- and UV-resistant finishes', text: 'Exterior-grade coatings are made for sun, rain and humid air.' },
  { title: 'Low maintenance', text: 'A wash with water and mild soap keeps most finishes looking new.' },
  { title: 'Fast installation', text: 'Panels are prepared off-site, so time on site is short.' },
  { title: 'Wide range of colours and textures', text: 'Solid colours, metallics, wood and stone finishes, all in one system.' },
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

/** Project picker options. */
export const pickerTypes = [
  { id: 'commercial', label: 'Commercial building' },
  { id: 'showroom', label: 'Shop / showroom' },
  { id: 'office', label: 'Corporate office' },
  { id: 'villa', label: 'Villa / home' },
];
export const pickerStyles = [
  { id: 'minimal', label: 'Minimal', board: ['#2b2522', '#f1efe8', '#8d8a84'], note: 'Large flat panels. Tight joints. One strong colour, used with restraint.' },
  { id: 'wood', label: 'Wood finish', board: ['#9a6a45', '#2b2522', '#ECE7D7'], note: 'Warm wood-finish ACP against charcoal. Calm, premium, easy to live with.' },
  { id: 'stone', label: 'Stone finish', board: ['#b4ab9d', '#6B3022', '#2b2522'], note: 'Stone-finish panels for weight and permanence, with dark glazing.' },
  { id: 'metallic', label: 'Metallic', board: ['#c6c3bc', '#d8c08f', '#221D1A'], note: 'Brushed and champagne tones. Built for jewellery, auto and premium retail.' },
  { id: 'bold', label: 'Bold colour', board: ['#6B3022', '#C9A27A', '#f1efe8'], note: 'Your brand colour, at building scale. Seen from the end of the street.' },
];
