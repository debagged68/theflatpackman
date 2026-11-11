import { appendFileSync } from 'node:fs';

// Only the selected deployment settings are copied into Amplify's build output.
const settings = ['SITE_URL', 'SITE_INDEXABLE', 'CONTACT_EMAIL', 'ENQUIRY_WEBHOOK_URL'];
const lines = settings.flatMap((key) => {
  const value = process.env[key];
  if (!value) return [];
  if (!/^[^\s"'#`$\\]+$/.test(value)) throw new Error('Invalid Amplify setting: ' + key);
  return [key + '=' + value];
});
if (lines.length) appendFileSync('.env.production', '\n' + lines.join('\n') + '\n');
