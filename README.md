## Prerequisites

- Node.js 20.x (Recommended)

## Installation

**Using Yarn (Recommended)**

```sh
yarn install
yarn dev
```

**Using Npm**

```sh
npm i
npm run dev
```

## Build

```sh
yarn build
# or
npm run build
```

## Supabase Deployment

### 1. Link to your Supabase project

```sh
# Login to Supabase
npx supabase login

# Link to your project (get project-ref from Supabase dashboard URL)
npx supabase link --project-ref <your-project-ref>
```

### 2. Run database migrations

Run the SQL from `supabase/schema.sql` in Supabase Dashboard → SQL Editor, or push migrations:

```sh
npx supabase db push
```

### 3. Update TypeScript Types

After making schema changes, regenerate the TypeScript types:

```sh
npx supabase gen types typescript --project-id <your-project-ref> > src/types/database.types.ts
```

### 4. Deploy Edge Functions

```sh
# Deploy the email notification function
npx supabase functions deploy send-application-email
```

### 4. Set Edge Function Secrets (Gmail)

```sh
# Set Gmail credentials for email notifications
npx supabase secrets set GMAIL_USER=your-email@gmail.com
npx supabase secrets set GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
```

> **Note:** To get a Gmail App Password:
> 1. Enable 2-Step Verification on your Google Account
> 2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
> 3. Create a new app password for "Mail"

### 5. Create Database Webhook

In Supabase Dashboard → **Database → Webhooks**:

1. Click "Create a new webhook"
2. Configure:
   - **Name:** `send-application-email`
   - **Table:** `program_applications`
   - **Events:** `INSERT`
   - **Type:** Supabase Edge Functions
   - **Edge Function:** `send-application-email`

### Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Mock server

By default we provide demo data from : `https://api-dev-minimal-[version].vercel.app`

To set up your local server:

- **Guide:** [https://docs.minimals.cc/mock-server](https://docs.minimals.cc/mock-server).

- **Resource:** [Download](https://www.dropbox.com/sh/6ojn099upi105tf/AACpmlqrNUacwbBfVdtt2t6va?dl=0).

## Full version

- Create React App ([migrate to CRA](https://docs.minimals.cc/migrate-to-cra/)).
- Next.js
- Vite.js

## Starter version

- To remove unnecessary components. This is a simplified version ([https://starter.minimals.cc/](https://starter.minimals.cc/))
- Good to start a new project. You can copy components from the full version.
- Make sure to install the dependencies exactly as compared to the full version.

---

**NOTE:**
_When copying folders remember to also copy hidden files like .env. This is important because .env files often contain environment variables that are crucial for the application to run correctly._
