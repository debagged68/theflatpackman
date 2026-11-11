'use client';

import { useState, type FormEvent } from 'react';

export function EnquiryForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);

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
        body: JSON.stringify({ ...fields, channel: 'web' }),
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
    <div className="enquiry-forms">
      {!enabled && <p className="form-notice">The web enquiry form will be available once contact setup is complete.</p>}
      <details open>
        <summary>Web enquiry</summary>
        <form onSubmit={send}>
          <fieldset disabled={!enabled || pending}>
            <legend className="sr-only">Send a web enquiry</legend>
            <label hidden>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label>Your name<input name="name" autoComplete="name" maxLength={100} required /></label>
            <label>Email address<input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
            <label>What would you like help with?<textarea name="message" rows={3} maxLength={2000} required /></label>
            <button className="button" type="submit">{pending ? 'Sending…' : 'Send enquiry'}</button>
          </fieldset>
          <p className="form-status" role="status">{status}</p>
        </form>
      </details>
    </div>
  );
}
