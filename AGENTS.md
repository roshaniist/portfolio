# Agent Instructions for `roshan-portfolio`

## Purpose
This repository is a Vite + React + TypeScript portfolio website for Roshan Kumar. The app is a single-page portfolio built with component-driven sections, Shadcn/ui primitives, Framer Motion, and Tailwind CSS.

## Key facts
- Entry point: `src/main.tsx` → `src/App.tsx` → `src/pages/Index.tsx`
- Main portfolio sections are in `src/components/`:
  - `HeroSection.tsx`
  - `AboutSection.tsx`
  - `ExperienceSection.tsx`
  - `SkillsSection.tsx`
  - `ProjectsSection.tsx`
  - `ContactSection.tsx`
  - `FooterSection.tsx`
- The profile image / "dp" is imported from `src/assets/roshan-profile.jpg` inside `src/components/AboutSection.tsx`.
- Routes are client-side with `react-router-dom` and the app currently uses `/` plus a catch-all `*` route.
- Path alias `@` resolves to `src/` via `vite.config.ts`.

## Build and run commands
Use the scripts declared in `package.json`.

- Install: `npm install`
- Development: `npm run dev`
- Build production: `npm run build`
- Preview build: `npm run preview`
- Run tests: `npm run test`

## Recommendations for changes
- For content changes on the home page, update `src/pages/Index.tsx` and the section components in `src/components/`.
- For styling or layout changes, inspect the Tailwind classes in component files and global styles in `src/index.css` and `src/App.css`.
- For the profile picture, update `src/assets/roshan-profile.jpg` and preserve the `alt` text in `AboutSection.tsx`.
- Keep any new routes declared above the catch-all `*` route in `src/App.tsx`.

## Testing and conventions
- This codebase uses Vite + Vitest; prefer `npm run test` for unit/test validation.
- Use the existing `src/components/ui/` primitives for UI consistency where possible.
- Do not add backend or server code in this repository; it is a static frontend portfolio.

## Notes for the AI
- Keep changes minimal and maintain the portfolio aesthetic.
- Preserve the existing React + Tailwind + Shadcn/ui patterns.
- If asked to update the portfolio picture or DP, focus on `src/assets/roshan-profile.jpg` and `src/components/AboutSection.tsx`.
