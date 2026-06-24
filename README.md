# LS Diet

lsdiet.com — built with Vite, TypeScript, React, shadcn-ui, and Tailwind CSS.

## Deployment

**Deployed via Cloudflare Pages.** Push to `main` and Cloudflare auto-builds and deploys. Build time is typically 2–5 minutes.

Build command: `npm run build`  
Output directory: `dist`

## Local development

```bash
git clone https://github.com/WhatAboutWeight/lsdiet.git
cd lsdiet
npm install --legacy-peer-deps
npm run dev
```

## Publishing a blog article

1. Add the TSX file to `src/content/articles/`
2. Register it in `src/content/articles/index.ts` (import + add to ARTICLES array)
3. Add the slug to the correct cluster in `src/lib/searchArticleClusters.ts`
4. Add the hero image to `src/assets/blog/`
5. `git push origin main` — Cloudflare deploys automatically

## Tech stack

- Vite + React + TypeScript
- shadcn-ui + Tailwind CSS
- Supabase (auth, edge functions, database)
- Cloudflare Pages (hosting)
