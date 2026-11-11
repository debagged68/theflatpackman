const acknowledgement = 'Flat Pack Man: Thank you for your enquiry – I am on it!';

function reply(message: string, status: number) {
  return Response.json({ message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) return reply('Online enquiries are not configured yet.', 503);
  const expectedOrigin = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : new URL(request.url).origin;
  if (![expectedOrigin, new URL(request.url).origin].includes(request.headers.get('origin') || '')) {
    return reply('The enquiry could not be accepted.', 403);
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply('Unsupported request.', 415);
  const reader = request.body?.getReader();
  if (!reader) return reply('Please complete the form.', 400);
  const decoder = new TextDecoder();
  let size = 0;
  let body = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) {
        await reader.cancel();
        return reply('The enquiry is too long.', 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
  } finally {
    reader.releaseLock();
  }
  let data: unknown;
  try { data = JSON.parse(body); } catch { return reply('Please complete the form.', 400); }
  if (!data || typeof data !== 'object') return reply('Please complete the form.', 400);
  const input = data as Record<string, unknown>;
  const field = (name: string) => {
    const value = input[name];
    return typeof value === 'string' ? value.trim() : '';
  };
  if (field('website')) return reply('The enquiry could not be accepted.', 400);

  const channel = field('channel');
  const phone = field('phone').replace(/[\s().-]/g, '');
  const [name, email, message] = ['name', 'email', 'message'].map(field);
  let payload;
  if (channel === 'whatsapp') {
    if (!/^\+[1-9]\d{7,14}$/.test(phone) || field('consent') !== 'on') {
      return reply('Enter a WhatsApp number with its country code and confirm you agree to receive the reply.', 400);
    }
    payload = { channel, phone, consent: true, acknowledgement };
  } else if (channel === 'web') {
    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || !message || message.length > 2000) {
      return reply('Check your name, email address and message.', 400);
    }
    payload = { channel, name, email, message };
  } else {
    return reply('Choose a contact method.', 400);
  }

  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:') throw new Error('HTTPS required');
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(7000),
    });
    if (response.status === 429) return reply('Too many requests. Please try again later.', 429);
    if (!response.ok) throw new Error('Receiver rejected the request');
  } catch {
    return reply('The request could not be sent. Please try again later.', 502);
  }
  return reply(channel === 'whatsapp' ? 'Your WhatsApp reply has been requested.' : 'Thank you. Your enquiry has been received.', 202);
}
