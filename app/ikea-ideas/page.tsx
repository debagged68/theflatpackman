import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const ideas = [
  { id: 'billy', product: 'BILLY bookcase', concept: 'The Bijou Bookcase', detail: 'Add arched oak trim and a botanical backing, then paint the frame deep petrol blue. Leave the shelves open for books you reach for every day.' },
  { id: 'pax', product: 'PAX wardrobe', concept: 'The Provence Armoire', detail: 'Crown the wardrobe with carved trim, frame the doors with applied mouldings and pair a soft sage finish with aged brass pulls.' },
  { id: 'kallax', product: 'KALLAX shelving unit', concept: 'The Cane Console', detail: 'Give the four-cube unit a navy finish, fit cane-front inserts to the lower cubbies and add an oak plinth. Keep the upper cubbies open for display.' },
  { id: 'malm', product: 'MALM chest of drawers', concept: 'The Tailored Chest', detail: 'Outline each drawer with slim rectangular trim, choose a warm greige finish and add brass bar pulls.' },
  { id: 'hemnes', product: 'HEMNES chest of drawers', concept: 'The Oak-Topped Dresser', detail: 'Pair a muted green body with a warm oak top. Add fine beading to the drawer fronts and swap the dark knobs for aged brass.' },
  { id: 'besta', product: 'BESTÅ storage unit', concept: 'The Fluted Sideboard', detail: 'Fit fluted smoked-walnut fronts and satin brass knobs, then give the cabinet a dark plinth for a low, grounded profile.' },
  { id: 'ivar', product: 'IVAR pine cabinet', concept: 'The Olive Pantry', detail: 'Frame the pine doors with slim moulding, paint the cabinet deep olive and fit simple brass latches.' },
  { id: 'brimnes', product: 'BRIMNES mirrored wardrobe', concept: 'The Blue Dressing Wardrobe', detail: 'Keep the centre mirror and give the outer doors slim mouldings, a dusty blue finish and dark brass pulls.' },
  { id: 'tarva', product: 'TARVA chest of drawers', concept: 'The Terracotta Chest', detail: 'Give the drawer fronts a reeded texture, paint the chest muted terracotta and finish with bronze pulls.' },
  { id: 'lack', product: 'LACK side table', concept: 'The Oxblood Occasional Table', detail: 'Add fine beading below the top, finish it in a rich oxblood colour and use brass corner details as a small accent.' },
];

const description = 'Ten before-and-after ideas for transforming IKEA furniture with mouldings, hardware and colour.';

export const metadata: Metadata = {
  title: 'IKEA Ideas',
  description,
  alternates: { canonical: '/ikea-ideas' },
  openGraph: { title: 'IKEA Ideas', description, url: '/ikea-ideas' },
};

export default function IkeaIdeas() {
  return (
    <>
      <header className="page-heading">
        <div className="container">
          <Link href="/">Home</Link>
          <h1>IKEA Ideas</h1>
          <p>Ten IKEA favourites, reimagined with mouldings, better hardware and richer colour.</p>
        </div>
      </header>
      <div className="container ideas-content">
        <p className="ideas-intro">
          These are ten pieces I’d pick for a makeover. The before-and-after images are illustrations of the IKEA starting points and what they could become.
        </p>
        <div className="ideas-grid">
          {ideas.map(({ id, product, concept, detail }) => (
            <article className="idea-card" key={id} aria-labelledby={id}>
              <h2 id={id}>{product}</h2>
              <figure>
                <div className="idea-comparison-labels" aria-hidden="true">
                  <span>Before</span><span>After</span>
                </div>
                <Image
                  src={`/images/ikea-ideas/${id}.webp`}
                  alt={`Before: IKEA ${product}. After: ${concept}. ${detail}`}
                  width={700}
                  height={438}
                  sizes="(max-width: 720px) calc(100vw - 3rem), (max-width: 1168px) 46vw, 544px"
                />
              </figure>
              <div className="idea-detail">
                <h3>{concept}</h3>
                <p>{detail}</p>
              </div>
            </article>
          ))}
        </div>
        <Link className="button" href="/getting-in-touch">Talk to me about your makeover <span aria-hidden="true">→</span></Link>
      </div>
    </>
  );
}
