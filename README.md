# The Creative Café — Nicolette Tandradinata Portfolio

A personal portfolio website with a cozy café scrapbook aesthetic. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Site Structure

| Route | Description |
|-------|-------------|
| `/` | Hero — café menu & scrapbook landing |
| `/who-am-i` | About scrapbook page |
| `/menu` | Skills as café menu items |
| `/portfolio` | Project case studies |
| `/portfolio/[slug]` | Individual project detail |
| `/brainstorms` | Interactive sticky-note brainstorm table |
| `/blog` | Recipe-card style articles |
| `/hobbies` | Hobbies & mock startup ideas |
| `/gift-giving` | Gift giving love language |
| `/coffee-chat` | Contact form & links |

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **next-themes** (After Hours Café dark mode)

## Project Media

Project assets live in `public/Project files/`. Media paths are mapped in `lib/projectFiles.ts`.

## Legacy Redirects

Old project URLs redirect automatically:
- `/projects/project-1` → `/portfolio/hope-street-clinic`
- `/projects/project-2` → `/portfolio/personal-content`
- `/projects/project-3` → `/portfolio/kung-fu-tea`
- `/projects/project-4` → `/portfolio/community-engagement`
