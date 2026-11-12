import { billyMakeover, site } from '../content/site';
import { StageFlow } from './stage-flow';

const makeovers = [
  { id: 'pax-makeover', title: site.tagline, image: '/images/wardrobe-transformation.webp', stages: site.stages },
  billyMakeover,
];

export function Transformation() {
  return (
    <section id="transformation" className="container transformation" aria-label="Flat-pack transformations">
      <div className="transformation-grid">
        {makeovers.map(({ id, title, image, stages }) => (
          <article key={id} className="transformation-card" aria-labelledby={id}>
            <h2 id={id}>{title}</h2>
            <StageFlow stages={stages} image={image} title={title} />
          </article>
        ))}
      </div>
      <p className="image-note">Illustrative images show the proposed makeovers.</p>
    </section>
  );
}
