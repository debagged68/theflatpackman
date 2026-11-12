import { billyMakeover, site } from '../content/site';
import { StageFlow } from './stage-flow';

const makeovers = [
  {
    id: 'pax-makeover',
    title: site.tagline,
    description: 'See an IKEA PAX wardrobe go from clean-lined flat pack to a French-inspired armoire with carved details, a soft sage finish and aged brass.',
    image: '/images/wardrobe-transformation.webp',
    stages: site.stages,
  },
  {
    ...billyMakeover,
    description: 'See an IKEA BILLY flat pack become a bookcase you’ll be proud to show off, with room for your everyday reads, an arched top and a deep petrol-blue finish.',
  },
];

export function Transformation() {
  return (
    <section id="transformation" className="container transformation" aria-label="Flat-pack transformations">
      <div className="transformation-grid">
        {makeovers.map(({ id, title, description, image, stages }) => (
          <article key={id} className="transformation-card" aria-labelledby={id}>
            <header>
              <h2 id={id}>{title}</h2>
              {description && <p className="image-note">{description}</p>}
            </header>
            <StageFlow stages={stages} image={image} title={title} />
          </article>
        ))}
      </div>
      <p className="image-note">Illustrative images show the proposed makeovers.</p>
    </section>
  );
}
