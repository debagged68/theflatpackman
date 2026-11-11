import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Transformation } from '../../components/transformation';
import { pages } from '../../content/site';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return pages.filter(page => page.slug !== 'getting-in-touch').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find(item => item.slug === slug);
  if (!page) notFound();
  const url = '/' + page.slug;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: { title: page.title, description: page.description, url, siteName: 'The Flat Pack Man', locale: 'en_GB', type: 'website' },
    ...(page.slug === 'client-testimonials' ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ContentPage({ params }: Props) {
  const { slug } = await params;
  const page = pages.find(item => item.slug === slug);
  if (!page) notFound();
  return (
    <>
      <div className="page-heading">
        <div className="container">
          <Link href="/">Home</Link>
          <h1>{page.title}</h1>
        </div>
      </div>
      {slug === 'flatpack-transformations' && <Transformation />}
      {slug === 'how-i-work' && (
        <div className="container prose">
          <h2>Tell me about the furniture</h2>
          <p>Include the make and model, whether it’s already assembled and what you’d like done. If you have a finish in mind, describe it in your enquiry.</p>
          <Link className="button" href="/getting-in-touch">Get in touch</Link>
        </div>
      )}
      {slug === 'client-testimonials' && (
        <div className="container prose"><p>Client testimonials will be added here.</p></div>
      )}
    </>
  );
}
