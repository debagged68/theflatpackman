import Image from 'next/image';
import { site } from '../content/site';
import { StageFlow } from './stage-flow';

export function Transformation({ heading = site.tagline }: { heading?: string }) {
  return (
    <section id="transformation" className="container transformation" aria-labelledby="transformation-heading">
      <h2 id="transformation-heading">{heading}</h2>
      <StageFlow labels={site.stages.map(stage => stage.title)}>
        {site.stages.map((stage, index) => (
          <figure key={stage.title} className="stage">
            <div className="stage-image">
              <Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 680px) 88vw, (max-width: 1050px) 30vw, 350px" />
            </div>
            <figcaption>
              <span className="stage-count">Stage {index + 1}</span>
              <h3>{stage.title}</h3>
              <p>{stage.detail}</p>
            </figcaption>
          </figure>
        ))}
      </StageFlow>
      <p className="image-note">Illustrative images show the proposed makeover.</p>
    </section>
  );
}
