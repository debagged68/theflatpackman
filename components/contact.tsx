import { EnquiryForms } from './enquiry-forms';
import { site } from '../content/site';

export function Contact() {
  const email = process.env.CONTACT_EMAIL?.trim();
  return (
    <section className="contact" aria-labelledby="contact-heading">
      <div className="container contact-grid">
        <div>
          <h2 id="contact-heading">Let’s talk furniture</h2>
          <p>Tell me what you’re assembling or how you’d like to transform it.</p>
          <p>{email ? <a href={'mailto:' + email}>{email}</a> : site.domain}</p>
        </div>
        <EnquiryForms enabled={Boolean(process.env.ENQUIRY_WEBHOOK_URL)} />
      </div>
    </section>
  );
}
