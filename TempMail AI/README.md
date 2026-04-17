# TempMail AI

**Instant disposable email for privacy-minded people and developers.**

---

## Project overview

**TempMail AI** is a web application that gives you a **temporary email address** in seconds—no signup, no password, no linking your real inbox.

### Why it exists

Many websites ask for an email to register, download a file, or try a demo. Giving your real address can mean spam, data leaks, or your inbox tied to services you do not fully trust. TempMail AI exists so you can **protect your identity** while still getting the confirmation links and messages you need.

### Who it is for

| Audience | How they use it |
|----------|------------------|
| **Everyday users** | Sign up for trials, newsletters, or one-off sites without exposing a personal email. |
| **Privacy-focused users** | Reduce tracking and keep their main inbox clean. |
| **Developers & QA** | Test signup flows, webhooks, and email delivery without fake Gmail accounts. |
| **API users** | Automate mailbox creation and message retrieval in apps and scripts. |

---

## Features

- **Temporary email generation** — Get a new disposable address on demand.
- **Inbox system** — View messages for your current temporary address in one place.
- **Auto-refresh** — New mail can appear without constant manual reloading (where implemented).
- **Copy address** — One-click copy so you can paste it anywhere.
- **Email expiration** — Addresses and messages are designed to **expire** after a set time so data does not linger forever.
- **Developer API** — Create mailboxes, list messages, and integrate with your own tools (see [API documentation](#api-documentation-simple)).

---

## How it works (simple explanation)

You do **not** need to understand code to use TempMail AI. Here is the journey in plain language:

1. **You open the site**  
   You land on a clean page that explains what the service does.

2. **An email address is created for you**  
   The app generates a **random-looking address** (for example, something like `user-abc123@…`). That address is yours for a limited time.

3. **You use that address elsewhere**  
   You paste it into a signup form, a download page, or any site that asks for email.

4. **Messages arrive at our servers**  
   When that site sends you a confirmation, newsletter, or notification, it is delivered to **our** system for that temporary address—not to your real inbox.

5. **You read mail in the inbox**  
   You stay on TempMail AI (or refresh) and open your **inbox** to see new messages, click links, or read codes—same idea as normal email, but temporary.

6. **Everything goes away after a while**  
   After the expiration period, that address and its messages are **removed** as part of the privacy model (see [Security notes](#security-notes)).

---

## Tech stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js (App Router), React, TypeScript, Tailwind CSS |
| **Backend** | Python — FastAPI or Django (REST API, WebSockets optional for live updates) |
| **Database** | e.g. PostgreSQL / SQLite for dev; designed for ephemeral or short-lived data |
| **Tools** | Node.js & npm (frontend), Python & pip/uv (backend), ESLint, TypeScript |

*Exact backend and database choices may vary by deployment; the architecture follows a typical **SaaS-style** split: web UI + API + storage.*

---

## Installation guide

### Prerequisites

- **Node.js** 18+ (for the Next.js app)  
- **Python** 3.10+ (for the API, when the backend folder is present)  
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/your-org/tempmail-ai.git
cd tempmail-ai
```

### 2. Frontend (Next.js)

```bash
npm install
```

Copy the environment template and adjust if needed:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Useful commands**

```bash
npm run lint        # Lint
npm run type-check  # TypeScript check
npm run build       # Production build
npm run start       # Run production server (after build)
```

### 3. Backend (Python — when available)

From the backend directory (e.g. `backend/`):

```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS / Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

Run the API (example for FastAPI / Uvicorn):

```bash
uvicorn main:app --reload --port 8000
```

Point the frontend at the API using `NEXT_PUBLIC_API_URL` in `.env.local` (see [Environment variables](#environment-variables)).

---

## Project structure

```
tempmail-ai/
├── src/
│   ├── app/                 # Next.js App Router: pages, layouts, global styles
│   ├── components/          # UI: layout, email views, shared widgets
│   ├── lib/                 # Helpers, mock data, utilities
│   └── types/               # TypeScript types shared across the app
├── backend/                 # Python API (FastAPI or Django) — add when implemented
│   ├── main.py              # (example) app entry
│   └── requirements.txt
├── public/                  # Static assets (images, favicon)
├── .env.example             # Documented env vars (safe to commit)
├── .env.local               # Local secrets (do not commit)
├── package.json
├── tailwind.config.js
└── README.md
```

- **`src/app/`** — Routes and layouts (home, inbox, docs, etc.).  
- **`src/components/`** — Reusable UI: navbar, inbox list, email viewer, cards.  
- **`src/lib/`** — Shared logic: formatting, clipboard helpers, API client stubs.  
- **`backend/`** — Placeholder for your Python service: authentication, mailboxes, message storage, expiration jobs.

---

## API documentation (simple)

*Below is a conceptual API shape. Exact paths and fields should match your OpenAPI/Swagger docs once the backend is live.*

### Create a temporary email / mailbox

**`POST /api/v1/mailboxes`**

Creates a new disposable address.

```json
// Example response
{
  "id": "mb_01HXYZ",
  "address": "cool-cat-92@tempmail.example",
  "expires_at": "2026-04-18T12:00:00Z"
}
```

### Fetch inbox (list messages)

**`GET /api/v1/mailboxes/{mailbox_id}/messages`**

Returns messages for that mailbox.

```json
{
  "messages": [
    {
      "id": "msg_001",
      "from": "noreply@service.com",
      "subject": "Verify your email",
      "received_at": "2026-04-17T10:00:00Z"
    }
  ]
}
```

### Get a single message (full body)

**`GET /api/v1/mailboxes/{mailbox_id}/messages/{message_id}`**

Returns HTML/text body and metadata for one message.

### Delete a message or mailbox

**`DELETE /api/v1/mailboxes/{mailbox_id}/messages/{message_id}`** — remove one message.  
**`DELETE /api/v1/mailboxes/{mailbox_id}`** — delete the whole temporary inbox early.

*Use API keys or rate limits in production; never expose secrets in the browser.*

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Recommended | Public URL of the web app (e.g. `http://localhost:3000` in dev). |
| `NEXT_PUBLIC_API_URL` | When API exists | Base URL of the Python backend (e.g. `http://localhost:8000`). |
| `NEXT_TELEMETRY_DISABLED` | Optional | Set to `1` to disable Next.js anonymous telemetry during local dev. |

Backend (examples — names may differ):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Connection string for PostgreSQL/SQLite. |
| `API_SECRET_KEY` | Secret for signing tokens or internal admin routes. |
| `CORS_ORIGINS` | Allowed frontend origins for browser requests. |

Copy `.env.example` to `.env.local` for the frontend and use a separate `.env` for the backend (never commit real secrets).

---

## Screenshots

> Add your own images under `docs/images/` or `public/` and update the paths below.

| Placeholder | Description |
|-------------|-------------|
| ![Homepage](docs/images/homepage.png) | **Homepage** — Hero, value proposition, and primary call-to-action. |
| ![Inbox](docs/images/inbox.png) | **Inbox** — List of messages for the current temporary address. |
| ![Email view](docs/images/email-view.png) | **Email view** — Reading a single message (subject, body, attachments). |

---

## Future improvements

- **Stronger spam filtering** — Heuristics and optional blocklists for abusive senders.  
- **Custom domains** — Bring your own domain for branded disposable addresses (paid tier).  
- **Mobile app** — iOS/Android clients with push notifications for new mail.  
- **AI-assisted sorting** — Label or summarize messages (opt-in, privacy-preserving).  
- **Team workspaces** — Shared API keys and usage dashboards for companies.

---

## Security notes

- **Temporary by design** — Mailboxes and messages are intended to **expire** and be deleted; this reduces long-term data risk.  
- **Privacy** — The goal is to separate your real identity from untrusted signups; still avoid sending highly sensitive personal data through any third-party email path.  
- **Operational hygiene** — Use HTTPS in production, rotate API keys, and limit what you log (no unnecessary full message storage in logs).

*This README describes intended behavior; your deployment checklist should include threat modeling and compliance for your region (e.g. GDPR-related practices if you serve EU users).*

---

## License

This project is suggested to be released under the **MIT License** — permissive, simple, and widely used for open-source SaaS-style projects.

```
MIT License

Copyright (c) TempMail AI contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

*(Replace the copyright line with your legal name or organization when you publish.)*

---

**Questions?** Open an issue or contact the maintainers. Happy building.
