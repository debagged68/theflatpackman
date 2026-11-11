import type { Metadata } from 'next';
import Link from 'next/link';
import { connection } from 'next/server';
import { Contact } from '../../components/contact';
import { pages } from '../../content/site';

const title = 'Getting in touch';
const path = '/getting-in-touch';
const description = pages.find(page => page.slug === 'getting-in-touch')?.description;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path, siteName: 'The Flat Pack Man', locale: 'en_GB', type: 'website' },
};

export default async function GettingInTouch() {
  await connection();
  return (
    <>
      <div className="page-heading">
        <div className="container">
          <Link href="/">Home</Link>
          <h1>{title}</h1>
        </div>
      </div>
      <Contact />
    </>
  );
}
