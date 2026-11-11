export const site = {
  name: 'The Flat Pack Man',
  domain: 'theflatpackman.co.uk',
  description: 'Flat-pack furniture assembly and French-inspired wardrobe transformations.',
  tagline: 'From PAX to Parisian Provenance',
  transformation: 'Parisian Provenance',
  intro: 'See an IKEA PAX wardrobe go from clean-lined flat pack to a French-inspired armoire with carved details, a soft sage finish and aged brass.',
  stages: [
    { title: 'The starting point', detail: 'A plain white IKEA PAX wardrobe.', image: '/images/pax.webp', alt: 'Plain white two-door wardrobe with simple handles' },
    { title: 'The makeover', detail: 'Decorative moulding and a carved crest change the silhouette.', image: '/images/makeover.webp', alt: 'Primed wardrobe with unfinished carved wooden moulding and crest' },
    { title: 'Parisian Provenance', detail: 'Soft sage, aged brass and a gently worn finish.', image: '/images/parisian.webp', alt: 'Finished sage-green armoire with carved crest and aged brass handles' },
  ],
};

export const pages = [
  { slug: 'flatpack-transformations', title: 'Flatpack transformations', description: 'See the three stages of the PAX to Parisian Provenance makeover.' },
  { slug: 'how-i-work', title: 'How I work', description: 'What to include when you get in touch about a piece of furniture.' },
  { slug: 'client-testimonials', title: 'Client testimonials', description: 'Feedback from clients of The Flat Pack Man.' },
  { slug: 'getting-in-touch', title: 'Getting in touch', description: 'Enquire about flat-pack assembly or a furniture transformation.' },
];

export const siteUrl = new URL(process.env.SITE_URL || 'https://' + site.domain);
export const indexable = process.env.SITE_INDEXABLE === 'true' && Boolean(process.env.SITE_URL);
