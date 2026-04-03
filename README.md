# Mathematics Club — IIT(ISM) Dhanbad
### Official Website

A fully responsive, production-grade website for the Mathematics Club of IIT(ISM) Dhanbad. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## 🗂️ Project Structure

```
mathclub/
├── public/
│   └── logo.png                  # Club logo
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles, fonts, animations
│   │   ├── layout.tsx            # Root layout (Navbar + Footer)
│   │   ├── page.tsx              # Homepage
│   │   ├── about/page.tsx        # About page
│   │   ├── events/page.tsx       # Events page (filterable)
│   │   ├── team/page.tsx         # Team page
│   │   ├── resources/page.tsx    # Resources page
│   │   └── contact/page.tsx      # Contact page with form
│   └── components/
│       ├── Navbar.tsx            # Sticky top navigation
│       └── Footer.tsx            # Site footer
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vercel.json
└── README.md
```

---

## 🚀 Pages Overview

| Route | Description |
|---|---|
| `/` | Homepage — hero, stats, about teaser, events preview, quote rotator, CTA |
| `/about` | Club mission, branches of math, achievements |
| `/events` | Filterable upcoming & past events by category |
| `/team` | Faculty advisors, core committee, general members |
| `/resources` | Recommended books, olympiad papers, online links |
| `/contact` | Contact form, office info, FAQ |

---

## 🛠️ Local Development

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### Steps

```bash
# 1. Navigate into the project folder
cd mathclub

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:3000
```

---

## ☁️ Deploying to Vercel (Free Hosting)

### Option A — Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Inside the project folder, run:
vercel

# 3. Follow the prompts:
#    - Link to your Vercel account (or create one free at vercel.com)
#    - Set project name (e.g. mathclub-iitism)
#    - Framework: Next.js (auto-detected)
#    - Build command: next build (auto-detected)
#    - Output: .next (auto-detected)

# 4. For production deployment:
vercel --prod
```

Your site will be live at: `https://your-project-name.vercel.app`

---

### Option B — GitHub + Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Math Club website"
   git remote add origin https://github.com/YOUR_USERNAME/mathclub-iitism.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel auto-detects Next.js — click **Deploy**

3. **Done!** Every `git push` automatically redeploys the site.

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#0a1628` (deep navy) |
| Primary text | `#e8e8e0` (chalk white) |
| Accent | `#d4a843` (gold) |
| Accent light | `#f0d080` (gold shimmer) |
| Display font | Cormorant Garamond (serif) |
| Heading font | Playfair Display (serif) |
| Body font | DM Sans (sans-serif) |
| Mono font | JetBrains Mono |

---

## ✏️ Customising Content

All content is in plain TypeScript arrays inside each page file — no database needed.

### Updating Events
Edit `/src/app/events/page.tsx` → find the `ALL_EVENTS` array and add/edit objects:
```ts
{
  date: "Jun 5, 2025",
  title: "My New Event",
  desc: "Event description here.",
  tag: "Workshop",         // Competition | Workshop | Lecture | Cultural
  status: "upcoming",     // upcoming | past
  venue: "Seminar Hall",
  time: "4:00 PM",
}
```

### Updating Team
Edit `/src/app/team/page.tsx` → update `FACULTY`, `CORE`, and `MEMBERS` arrays.

### Updating Resources
Edit `/src/app/resources/page.tsx` → update `BOOKS`, `LINKS`, and `OLYMPIAD` arrays.

### Updating Club Info / About
Edit `/src/app/about/page.tsx` → update the `ACHIEVEMENTS` array and text content.

### Replacing the Logo
Replace `public/logo.png` with your new logo image (keep the same filename, or update all `src="/logo.png"` references).

---

## 📦 Build for Production

```bash
npm run build    # Builds the optimised production bundle
npm run start    # Starts the production server locally
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS | Utility-first CSS framework |
| Framer Motion | (installed, available for animations) |
| Google Fonts | Cormorant Garamond, Playfair Display, DM Sans, JetBrains Mono |

---

## 📬 Contact Form

The contact form (`/contact`) currently shows a success message on submit. To wire it to a real email backend, you can use:

- **Resend** (free tier, easy): [resend.com](https://resend.com)
- **Formspree** (zero backend): Replace the form `onSubmit` with a Formspree endpoint
- **EmailJS**: Client-side email sending

Example with Formspree:
```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## 📄 License

© Mathematics Club, IIT(ISM) Dhanbad. All rights reserved.
