# One-time setup for the site manager

The website already works in preview mode with the existing events and team. Complete these steps once to let administrators add, edit, and delete content permanently.

## 1. Create the free database

1. Create a project at [Supabase](https://supabase.com/).
2. In the Supabase dashboard, open **SQL Editor**, choose **New query**, paste the contents of `supabase/setup.sql`, and click **Run**.
3. Open **Project Settings → API**. Copy the Project URL and the `service_role` secret. Never put the service-role secret in browser code or share it publicly.

If you already ran an earlier version of `setup.sql`, run the current file again. It safely adds the resources, contact, FAQ, and Question of the Day tables without duplicating the starter content.

## 2. Add environment variables

For local development, copy `.env.example` to `.env.local` and fill in:

```text
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=...
```

Keep the existing `VERCEL_OIDC_TOKEN` line if Vercel created it.

For the live site, add the same three values in **Vercel → Project → Settings → Environment Variables**, then redeploy.

## 3. Manage the website

Visit `/admin` (or use **Manage site** in the footer), enter `ADMIN_PASSWORD`, and use the forms. Event status is never entered manually:

- **Upcoming:** current time is before the start time
- **Happening now:** current time is between start and end
- **Done:** current time is after the end time

Times entered in the dashboard use the administrator's local timezone and are displayed on the public site in India Standard Time. Member photos can be uploaded directly (maximum 5 MB).

The **QOTD** tab lets an administrator schedule one question for each calendar date. It appears on the homepage only on that date in India Standard Time. QOTD is intentionally display-only: the site has no answer or solution submission feature.
