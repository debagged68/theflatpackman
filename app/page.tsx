import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';
import { Contact } from '../components/contact';
import { Transformation } from '../components/transformation';
import { site, siteUrl } from '../content/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { title: site.name, description: site.description, url: '/', images: ['/images/assembler.webp'], siteName: site.name, locale: 'en_GB', type: 'website' },
};

export default async function Home() {
  await connection();
  const structuredData = { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: siteUrl.href, description: site.description, inLanguage: 'en-GB' };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Furniture assembly &amp; transformations</p>
          <h1>{site.name}</h1>
          <p className="hero-tagline">{site.tagline}</p>
          <p>{site.intro}</p>
          <a className="button" href="#transformation">See the transformation <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-image">
          <Image src="/images/assembler.webp" alt="Furniture assembler fitting a wardrobe panel in a workshop" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
        </div>
      </section>
      <Transformation />
      <section className="container explore" aria-label="Explore the website">
        <Link href="/flatpack-transformations">Flatpack transformations <span aria-hidden="true">→</span></Link>
        <Link href="/how-i-work">How I work <span aria-hidden="true">→</span></Link>
        <Link href="/client-testimonials">Client testimonials <span aria-hidden="true">→</span></Link>
      </section>
      <Contact />
    </>
  );
}
