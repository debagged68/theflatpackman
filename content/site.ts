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

export const pages = [
  { slug: 'flatpack-transformations', title: 'Flatpack transformations', description: 'See the ten stages of the PAX to Parisian Provenance makeover.' },
  { slug: 'how-i-work', title: 'How I work', description: 'What to include when you get in touch about a piece of furniture.' },
  { slug: 'client-testimonials', title: 'Client testimonials', description: 'Feedback from clients of The Flat Pack Man.' },
  { slug: 'getting-in-touch', title: 'Getting in touch', description: 'Enquire about flat-pack assembly or a furniture transformation.' },
];

export const siteUrl = new URL(process.env.SITE_URL || 'https://' + site.domain);
export const indexable = process.env.SITE_INDEXABLE === 'true' && Boolean(process.env.SITE_URL);
