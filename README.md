<div align="center">

# Portfolio Web App

Beautiful, fast, and responsive personal portfolio built with Next.js (App Router), TypeScript, and Tailwind CSS. It showcases projects, an about page, and a contact page with smooth animations and a dark/light theme.

</div>

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Data-driven Projects](#data-driven-projects)
- [Theming](#theming)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Acknowledgements](#acknowledgements)

## Features
- **App Router**: Organized routes for `home`, `about`, `contact`, and dynamic `work/[slug]` pages
- **Theme Toggle**: Persisted dark/light theme via `next-themes`
- **Animations**: Smooth page and element transitions using `framer-motion` and `gsap`
- **Smooth Scrolling**: Powered by `lenis`
- **Data-driven Projects**: Centralized project metadata in `data/work.ts`
- **Responsive UI**: Built with Tailwind CSS v4 utilities and modern layout primitives
- **Reusable Components**: `Navbar`, `Hero`, `WorkList`, `ProjectDetail`, `NeonBackground`, `Modal`, `Footer`, and more
- **Embeds**: Easy Figma and other content embeds via `FigmaEmbed`/`EmbedCard`

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript, React 19
- **Styling**: Tailwind CSS v4
- **Theming**: next-themes
- **Animations**: framer-motion, GSAP
- **Utilities**: clsx, class-variance-authority, tailwind-merge, lenis

## Project Structure
```
portfolio_webapp/
├─ app/
│  ├─ page.tsx                # Home (hero, featured work)
│  ├─ about/page.tsx          # About me
│  ├─ contact/page.tsx        # Contact info / form
│  ├─ work/page.tsx           # All projects listing
│  └─ work/[slug]/page.tsx    # Project detail page (dynamic)
├─ components/
│  ├─ Navbar.tsx, Footer.tsx, Hero.tsx
│  ├─ WorkList.tsx, ProjectDetail.tsx
│  ├─ FigmaEmbed.tsx, EmbedCard.tsx
│  ├─ NeonBackground.tsx, Modal.tsx, Sections.tsx
│  └─ ThemeToggle.tsx, ScrollProgress.tsx, theme-provider.tsx
├─ data/
│  └─ work.ts                 # Project metadata (title, slug, tags, summary, etc.)
├─ lib/
│  └─ utils.ts                # Utilities/helpers
├─ public/                    # Static assets
└─ app/globals.css            # Global styles
```

## Getting Started
Prerequisites:
- Node.js 18+ (recommended LTS)
- npm 9+ (or yarn/pnpm/bun)

Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

Build for production and start:
```bash
npm run build && npm start
```

## Available Scripts
- `npm run dev`: Start development server (with Turbopack)
- `npm run build`: Production build
- `npm start`: Start production server
- `npm run lint`: Run Next.js lint

## Data-driven Projects
All portfolio projects live in `data/work.ts`. Add new entries and they will automatically appear on the `Work` page and generate a detail route at `work/[slug]`.

Example shape (simplified):
```ts
export type WorkItem = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  coverImage?: string; // path in /public
  links?: { live?: string; repo?: string };
};

export const workItems: WorkItem[] = [
  {
    slug: "my-project",
    title: "My Project",
    summary: "Short description of what this project does and why it’s cool.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    links: { live: "https://example.com", repo: "https://github.com/..." }
  }
];
```

## Theming
`next-themes` is used to persist user preference. Use the `ThemeToggle` component to switch themes; it’s wired through the root `theme-provider` wrapper.

## Deployment
The app is production-ready and can be deployed on any Node-compatible host. Vercel is recommended for the best Next.js DX.

Basic Vercel flow:
1. Create a Vercel project and import this repository
2. Framework preset: Next.js
3. Build command: `next build` (default)
4. Output directory: `.next` (default, do not change)

## Roadmap
- Project filtering and search
- Light CMS hooks for `work` content
- Contact form with email provider integration

## Acknowledgements
- Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- GSAP: https://gsap.com/

—

Repository: https://github.com/vaneezamaqsood/portfolio_webapp

## Contact form email setup
Create a `.env.local` file with your SMTP credentials:

```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
CONTACT_FROM_EMAIL="Portfolio <no-reply@your-domain.com>"
CONTACT_TO_EMAIL=you@example.com
```

Then restart the dev server. The contact form posts to `/api/contact` and will email messages to `CONTACT_TO_EMAIL`.

