import { Email, TempMailbox, ApiEndpoint } from '@/types'

export const mockMailbox: TempMailbox = {
  address: 'alex.vanguard_92@tempmail.ai',
  expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  createdAt: new Date(),
}

export const mockEmails: Email[] = [
  {
    id: '1',
    from: {
      name: 'Stripe Payments',
      address: 'noreply@stripe.com',
      initials: 'SP',
      avatarColor: '#635BFF',
    },
    subject: 'Confirm your developer account',
    preview: 'Welcome to Stripe! Please click the button below to verify your email address and activate your developer account...',
    body: `<p>Welcome to Stripe!</p>
<p>Please click the button below to verify your email address and activate your developer account. This link will expire in 24 hours.</p>
<div style="margin: 24px 0;">
  <a href="#" style="background: #635BFF; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">Verify Email Address</a>
</div>
<p>If you did not create a Stripe account, you can safely ignore this email.</p>
<p>— The Stripe Team</p>`,
    receivedAt: '2023-10-27T10:42:00Z',
    timeAgo: '2 mins ago',
    isRead: false,
    isPriority: true,
    isImportant: false,
    attachments: [],
    tags: ['verification', 'stripe'],
  },
  {
    id: '2',
    from: {
      name: 'Figma Team',
      address: 'noreply@figma.com',
      initials: 'FT',
      avatarColor: '#F24E1E',
    },
    subject: "You've been invited to 'Project Ether'",
    preview: "Hey Alex, Sarah invited you to collaborate on the new wireframes. Join the project to start contributing...",
    body: `<p>Hey Alex,</p>
<p>Sarah has invited you to collaborate on <strong>Project Ether</strong> in Figma. Join the team to start working on the new wireframes and design system.</p>
<p>Click below to accept the invitation:</p>
<p><a href="#">Accept Invitation →</a></p>
<p>— The Figma Team</p>`,
    receivedAt: '2023-10-27T10:27:00Z',
    timeAgo: '15 mins ago',
    isRead: true,
    isPriority: false,
    isImportant: false,
    attachments: [],
    tags: ['collaboration'],
  },
  {
    id: '3',
    from: {
      name: 'GitHub',
      address: 'noreply@github.com',
      initials: 'GH',
      avatarColor: '#24292E',
    },
    subject: '[Security] New device sign-in',
    preview: 'A new login was detected for your account from a browser in San Francisco, CA. If this was you...',
    body: `<p>Hi there,</p>
<p>A new device just signed in to your GitHub account. Here are the details:</p>
<ul>
  <li><strong>Location:</strong> San Francisco, CA</li>
  <li><strong>Device:</strong> Chrome on macOS</li>
  <li><strong>Time:</strong> Oct 27, 2023 at 10:00 AM</li>
</ul>
<p>If this wasn't you, please secure your account immediately.</p>`,
    receivedAt: '2023-10-27T10:00:00Z',
    timeAgo: '42 mins ago',
    isRead: true,
    isPriority: false,
    isImportant: true,
    attachments: [],
    tags: ['security'],
  },
  {
    id: '4',
    from: {
      name: 'Sentry.io',
      address: 'alerts@sentry.io',
      initials: 'SI',
      avatarColor: '#362D59',
    },
    subject: 'New issue in production: 500 Error',
    preview: 'A new unhandled exception was captured: ReferenceError: undefined is not a function at api/routes/users.ts...',
    body: `<p>A new issue has been detected in your production environment:</p>
<pre><code>ReferenceError: undefined is not a function
  at api/routes/users.ts:142
  at processRequest (middleware/auth.ts:67)</code></pre>
<p>This error has occurred <strong>47 times</strong> in the last hour.</p>
<p><a href="#">View Issue in Sentry →</a></p>`,
    receivedAt: '2023-10-27T09:42:00Z',
    timeAgo: '1 hour ago',
    isRead: true,
    isPriority: false,
    isImportant: false,
    attachments: [],
    tags: ['alert', 'production'],
  },
  {
    id: '5',
    from: {
      name: 'Jordan Dupont',
      address: 'jordan.dupont@creative-studio.io',
      initials: 'JD',
      avatarColor: '#0EA5E9',
    },
    subject: 'Quarterly Brand Strategy Update & Digital Assets',
    preview: "I hope your week is off to a productive start. Following our discussion last Thursday, I've compiled the final version of the Brand Strategy Roadmap...",
    body: `<p>Hello Team,</p>
<p>I hope your week is off to a productive start. Following our discussion last Thursday, I've compiled the final version of the <strong>Brand Strategy Roadmap</strong> for Q4. We've shifted the focus slightly towards organic growth and refined the visual identity guidelines to align with the new "Ether" aesthetic.</p>
<p>Key updates include:</p>
<ul>
  <li>Updated typography hierarchy featuring the Inter Display family.</li>
  <li>Revised color palette with high-contrast professional tones.</li>
  <li>New asset delivery timeline for the November campaign.</li>
</ul>
<blockquote style="border-left: 3px solid #2563EB; padding: 12px 16px; background: #EFF6FF; margin: 16px 0;">
  <p style="color: #2563EB; font-size: 12px; font-weight: 600; margin-bottom: 8px;">NOTE FOR DEVELOPMENT</p>
  <p style="font-style: italic; color: #374151;">"The 'transient but secure' philosophy must be reflected in the micro-interactions. Please review the attached motion guide."</p>
</blockquote>
<p>Please let me know if you have any questions regarding the implementation schedule. I'm available for a quick sync tomorrow afternoon.</p>
<p><strong>Jordan Dupont</strong><br/>Lead Design Strategist<br/><a href="#" style="color: #2563EB;">Creative Studio IO</a></p>`,
    receivedAt: '2023-10-24T10:42:00Z',
    timeAgo: '3 days ago',
    isRead: false,
    isPriority: false,
    isImportant: true,
    attachments: [
      { id: 'a1', name: 'Q4_Strategy_v2.pdf', size: '2.4 MB', type: 'pdf' },
      { id: 'a2', name: 'Visual_Guidelines.zip', size: '15.8 MB', type: 'zip' },
    ],
    tags: ['design', 'strategy'],
  },
]

export const mockApiEndpoints: ApiEndpoint[] = [
  {
    method: 'POST',
    path: '/v1/emails/generate',
    title: 'Generate Temporary Email',
    description: 'Create a unique, disposable email address programmatically. This endpoint returns a transient identity that expires after your specified TTL (Time To Live). Ideal for automated testing and privacy-first user onboarding.',
    parameters: [
      {
        name: 'domain_id',
        type: 'string (UUID)',
        required: true,
        description: 'The unique identifier for the verified domain under which the email will be created.',
      },
      {
        name: 'ttl_seconds',
        type: 'integer',
        required: false,
        description: 'Duration in seconds until the address is automatically purged. Defaults to 3600 (1 hour).',
      },
      {
        name: 'prefix_hint',
        type: 'string',
        required: false,
        description: 'A custom string to include at the start of the email address for better categorization.',
      },
    ],
    responseSchema: [
      { name: 'id', type: 'string', description: 'Unique identifier for this specific mailbox instance.' },
      { name: 'address', type: 'string', description: 'The fully qualified email address (e.g., test-092@ethm.io).' },
      { name: 'expires_at', type: 'string (ISO 8601)', description: 'UTC timestamp when the address will be purged.' },
      { name: 'status', type: 'string', description: 'Current status of the mailbox. One of: active, expired, deleted.' },
    ],
    codeExamples: [
      {
        language: 'curl',
        label: 'cURL',
        code: `curl -X POST https://api.tempmail.ai/v1/emails/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain_id": "dom_7f29-k921",
    "ttl_seconds": 3600,
    "prefix_hint": "user-onboarding"
  }'`,
      },
      {
        language: 'nodejs',
        label: 'Node.js',
        code: `import TempMailAI from '@tempmail-ai/sdk';

const client = new TempMailAI({
  apiKey: process.env.TEMPMAIL_API_KEY,
});

const mailbox = await client.emails.generate({
  domain_id: 'dom_7f29-k921',
  ttl_seconds: 3600,
  prefix_hint: 'user-onboarding',
});

console.log(mailbox.address);
// → "user-onboarding_92@tempmail.ai"`,
      },
      {
        language: 'python',
        label: 'Python',
        code: `import tempmail_ai

client = tempmail_ai.Client(
    api_key=os.environ.get("TEMPMAIL_API_KEY"),
)

mailbox = client.emails.generate(
    domain_id="dom_7f29-k921",
    ttl_seconds=3600,
    prefix_hint="user-onboarding",
)

print(mailbox.address)
# → "user-onboarding_92@tempmail.ai"`,
      },
    ],
  },
  {
    method: 'GET',
    path: '/v1/domains',
    title: 'List Domains',
    description: 'Returns all verified domains associated with your account that can be used to generate temporary email addresses.',
    parameters: [
      { name: 'limit', type: 'integer', required: false, description: 'Max number of domains to return. Default: 20.' },
      { name: 'offset', type: 'integer', required: false, description: 'Pagination offset. Default: 0.' },
    ],
    responseSchema: [
      { name: 'domains', type: 'array', description: 'Array of domain objects.' },
      { name: 'total', type: 'integer', description: 'Total number of domains in your account.' },
    ],
    codeExamples: [
      {
        language: 'curl',
        label: 'cURL',
        code: `curl -X GET https://api.tempmail.ai/v1/domains \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      },
      {
        language: 'nodejs',
        label: 'Node.js',
        code: `const domains = await client.domains.list({
  limit: 20,
  offset: 0,
});

console.log(domains.total);`,
      },
      {
        language: 'python',
        label: 'Python',
        code: `domains = client.domains.list(
    limit=20,
    offset=0,
)

print(domains.total)`,
      },
    ],
  },
]
