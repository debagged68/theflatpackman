export const site = {
  name: 'The Flat Pack Man',
  domain: 'theflatpackman.co.uk',
  whatsappNumber: '447768055952',
  description: 'Flat-pack furniture assembly and French-inspired wardrobe transformations.',
  tagline: 'From PAX to Parisian Provenance',
  transformation: 'Parisian Provenance',
  intro: 'See an IKEA PAX wardrobe go from clean-lined flat pack to a French-inspired armoire with carved details, a soft sage finish and aged brass.',
  stages: [
    { title: 'The IKEA PAX', detail: 'A plain white two-door wardrobe with a square profile.' },
    { title: 'Sanded back', detail: 'The doors have been scuff-sanded to give the primer a surface to grip.' },
    { title: 'A coat of primer', detail: 'Pale grey primer covers the smooth white panels.' },
    { title: 'Panel moulding', detail: 'Raw oak mouldings give the doors a raised-panel look.' },
    { title: 'The carved crown', detail: 'A curved crown and carved shell crest change the silhouette.' },
    { title: 'French feet', detail: 'A shaped apron and curved feet give the wardrobe a new base.' },
    { title: 'Blue-green undercoat', detail: 'A pale blue-green undercoat covers the trim and doors.' },
    { title: 'Soft sage paint', detail: 'A coat of soft sage brings the doors and moulding together.' },
    { title: 'Aged patina', detail: 'Deeper colour and rubbed edges bring out the carved details.' },
    { title: 'Parisian Provenance', detail: 'Aged brass handles finish the sage-green French-inspired armoire.' },
  ],
};

export const billyMakeover = {
  id: 'billy-makeover',
  title: 'From BILLY Box to Bijou Bookcase',
  image: '/images/billy-transformation.webp',
  stages: [
    { title: 'The BILLY box', detail: 'The makeover starts with an unopened IKEA BILLY flat-pack carton.' },
    { title: 'Unpacked', detail: 'The white panels and fittings come out of the carton, ready for assembly.' },
    { title: 'The assembled BILLY', detail: 'The panels come together as a slim white bookcase with open shelves.' },
    { title: 'Oak beading', detail: 'Fine oak beading gives the front edges more definition.' },
    { title: 'Arch and plinth', detail: 'An arched top opening and scalloped timber plinth reshape the front.' },
    { title: 'Botanical backing', detail: 'Muted floral wallpaper lines the back of the shelves.' },
    { title: 'Blue undercoat', detail: 'A dusty blue undercoat covers the shelving and timber trim.' },
    { title: 'Petrol blue finish', detail: 'Deep petrol blue frames the pale botanical backing.' },
    { title: 'The first books', detail: 'A few books are placed on the shelves, leaving the pattern visible.' },
    { title: 'The Bijou Bookcase', detail: 'Classic books and a small porcelain vase complete the petrol-blue bookcase.' },
  ],
};

export const pages = [
  { slug: 'flatpack-transformations', title: 'Flatpack transformations', description: 'Watch two ten-stage makeovers turn an IKEA PAX and a boxed BILLY into bespoke furniture.' },
  { slug: 'how-i-work', title: 'How I work', description: 'What to include when you get in touch about a piece of furniture.' },
  { slug: 'client-testimonials', title: 'Client testimonials', description: 'Feedback from clients of The Flat Pack Man.' },
  { slug: 'getting-in-touch', title: 'Getting in touch', description: 'Enquire about flat-pack assembly or a furniture transformation.' },
];

export const siteUrl = new URL(process.env.SITE_URL || 'https://' + site.domain);
export const indexable = process.env.SITE_INDEXABLE === 'true' && Boolean(process.env.SITE_URL);
