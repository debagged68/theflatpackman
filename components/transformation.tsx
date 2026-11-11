import { site } from '../content/site';
import { StageFlow } from './stage-flow';

export function Transformation({ heading = site.tagline }: { heading?: string }) {
  return (
    <section id="transformation" className="container transformation" aria-labelledby="transformation-heading">
      <h2 id="transformation-heading">{heading}</h2>
      <StageFlow stages={site.stages} />
      <p className="image-note">Illustrative images show the proposed makeover.</p>
    </section>
  );
}
