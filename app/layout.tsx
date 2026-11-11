import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { indexable, pages, site, siteUrl } from '../content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: site.name, template: '%s | ' + site.name },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: 'en_GB', type: 'website' },
  robots: { index: indexable, follow: indexable },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="wordmark">{site.name}</Link>
            <nav aria-label="Main navigation">
              {pages.map(({ slug, title }) => <Link key={slug} href={'/' + slug}>{title}</Link>)}
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="site-footer"><div className="container">{site.name}</div></footer>
      </body>
    </html>
  );
}
