// Cloudflare Pages Function - not part of the Astro build, deploys
// alongside the static site. Runs per-request, so PUSHOVER_* secrets
// (set in the Cloudflare Pages dashboard, not .env) never reach the browser.
//
// The browser only ever sends { enquiryId }. We re-read the row from
// Supabase ourselves before pushing, so a forged POST to this endpoint
// can't inject arbitrary text into the notification - it can only ever
// reflect an enquiry that really exists.

import { createClient } from '@supabase/supabase-js';

interface Env {
  PUSHOVER_USER: string;
  PUSHOVER_TOKEN: string;
  PUBLIC_SUPABASE_URL: string;
  PUBLIC_SUPABASE_ANON_KEY: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  let enquiryId: unknown;
  try {
    ({ enquiryId } = await request.json());
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }
  if (typeof enquiryId !== 'number' || !Number.isInteger(enquiryId) || enquiryId <= 0) {
    return new Response('enquiryId must be a positive integer', { status: 400 });
  }

  if (!env.PUSHOVER_USER || !env.PUSHOVER_TOKEN || !env.PUBLIC_SUPABASE_URL || !env.PUBLIC_SUPABASE_ANON_KEY) {
    return new Response('Server not configured', { status: 500 });
  }

  const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY);

  const { data: enquiry, error } = await supabase
    .from('enquiries')
    .select('id, name, company, email, phone, message, source, created_at')
    .eq('id', enquiryId)
    .single();

  if (error || !enquiry) {
    return new Response('Enquiry not found', { status: 404 });
  }

  // Best-effort product summary - a failure here must not block the push.
  let productLine = '';
  try {
    const { data: items } = await supabase
      .from('enquiry_items')
      .select('product_id')
      .eq('enquiry_id', enquiryId);

    if (items && items.length > 0) {
      const ids = items.map((i: { product_id: number }) => i.product_id);
      const { data: products } = await supabase
        .from('products')
        .select('id, code')
        .in('id', ids);

      const codes = (products ?? []).map((p: { code: string }) => p.code);
      const shown = codes.slice(0, 3).join(', ');
      const more = codes.length > 3 ? ` +${codes.length - 3} more` : '';
      productLine = `${items.length} product${items.length === 1 ? '' : 's'}${shown ? ` (${shown}${more})` : ''}`;
    }
  } catch {
    // ignore - notification still goes out without product detail
  }

  const title = `New enquiry - ${enquiry.name}${enquiry.company ? ` · ${enquiry.company}` : ''}`;
  const contact = [enquiry.phone, enquiry.email].filter(Boolean).join(' · ');
  const messageBody = (enquiry.message ?? '').slice(0, 200);
  const message = [contact, productLine, messageBody, `via ${enquiry.source ?? 'website'}`]
    .filter(Boolean)
    .join('\n');

  const pushoverRes = await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      token: env.PUSHOVER_TOKEN,
      user: env.PUSHOVER_USER,
      title,
      message: message || 'New enquiry received',
    }),
  });

  if (!pushoverRes.ok) {
    return new Response('Pushover call failed', { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
