# The Flat Pack Man

React 19 and Next.js 15 App Router website for AWS Amplify Hosting. The home and enquiry pages render on the server at request time. Stable editorial pages can be pre-rendered. The site uses responsive WebP photography, system fonts and small client components for the stage controls and forms.

## Edit content with Codex

Give Codex the page, desired copy and images. Shared content, page titles and image captions are in `content/site.ts`. Page sections are in `app/page.tsx` and `app/[slug]/page.tsx`. Update the relevant navigation and sitemap entries when adding pages. Commit the change to the branch connected to Amplify to publish it. The imagery is illustrative. Replace it with actual project photography as it becomes available, and add testimonials once their wording and publication permission are confirmed.

## Run locally

Use Node 22. Run `npm ci`, then `npm run dev`. Run `npm run build` and `npm run start` to check the production version. Copy `.env.example` to `.env.local` to configure local settings.

## Deploy on AWS Amplify

1. In Amplify Hosting, create an app from GitHub and connect `debagged68/theflatpackman` and branch `main`. The app root is the repository root.
2. Confirm Next.js SSR / Hosting Compute and use the included `amplify.yml`. It runs `next build` and publishes `.next`.
3. Deploy and verify the generated Amplify URL. Add the custom domain when DNS is ready.
4. For public launch, set `SITE_URL` to the verified canonical origin and `SITE_INDEXABLE=true` in the Amplify branch environment, then redeploy. Preview builds default to noindex. The empty testimonials page stays out of the sitemap and noindexed until real testimonials are published.

## Enable contact

Set `CONTACT_EMAIL` to the actual mailbox, including the part before @. The domain supplied on its own is displayed as text.

Set `ENQUIRY_WEBHOOK_URL` to an HTTPS backend receiver before enabling the forms. The same-origin route validates the fields and POSTs one of these JSON payloads to the receiver:

- Web enquiry — `{channel: "web", name, email, message}`. Deliver to the business inbox.
- WhatsApp — `{channel: "whatsapp", phone, consent: true, acknowledgement}`. Record the opt-in and use the business's WhatsApp sender and approved template with the body “Flat Pack Man: Thank you for your enquiry – I am on it!”

The receiver must implement throttling and deduplication before accepting live traffic, especially per WhatsApp recipient. Return HTTP 2xx only after accepting the enquiry or queueing delivery. Keep provider credentials in the receiver's secret store. The browser confirms request acceptance, and the provider must be checked for actual delivery. Until the receiver is configured, both forms are visibly disabled.
