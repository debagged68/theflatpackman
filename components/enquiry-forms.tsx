'use client';

import { useState, type FormEvent } from 'react';

type Channel = 'web' | 'whatsapp';

function EnquiryForm({ channel, enabled }: { channel: Channel; enabled: boolean }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const whatsapp = channel === 'whatsapp';

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !enabled) return;
    const form = event.currentTarget;
    setPending(true);
    setStatus('');
    try {
      const fields = Object.fromEntries(new FormData(form));
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, channel }),
      });
      const result = await response.json();
      setStatus(result.message);
      if (response.ok) form.reset();
    } catch {
      setStatus('The request could not be sent. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={send}>
      <fieldset disabled={!enabled || pending}>
        <legend className="sr-only">{whatsapp ? 'Request a WhatsApp reply' : 'Send a web enquiry'}</legend>
        <label hidden>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        {whatsapp ? (
          <>
            <label>Your WhatsApp number, including country code
              <input type="tel" name="phone" placeholder="+44…" autoComplete="tel" maxLength={24} required />
            </label>
            <label className="checkbox">
              <input type="checkbox" name="consent" required /> I agree to receive a WhatsApp acknowledgement from The Flat Pack Man.
            </label>
          </>
        ) : (
          <>
            <label>Your name<input name="name" autoComplete="name" maxLength={100} required /></label>
            <label>Email address<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
            <label>What would you like help with?<textarea name="message" rows={3} maxLength={2000} required /></label>
          </>
        )}
        <button className="button" type="submit">{pending ? 'Sending…' : whatsapp ? 'Request WhatsApp reply' : 'Send enquiry'}</button>
      </fieldset>
      <p className="form-status" role="status">{status}</p>
    </form>
  );
}

export function EnquiryForms({ enabled }: { enabled: boolean }) {
  return (
    <div className="enquiry-forms">
      {!enabled && <p className="form-notice">Online enquiries and WhatsApp replies will be available once contact setup is complete.</p>}
      <details>
        <summary>WhatsApp</summary>
        <EnquiryForm channel="whatsapp" enabled={enabled} />
      </details>
      <details open>
        <summary>Web enquiry</summary>
        <EnquiryForm channel="web" enabled={enabled} />
      </details>
    </div>
  );
}
