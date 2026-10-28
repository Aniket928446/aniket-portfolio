# Aniket Lasulkar — Developer Portfolio

A responsive single-page portfolio built with React, Vite, Tailwind CSS, Lucide React, and Framer Motion.

## Requirements
- Node.js 18+ (Node.js 20+ recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Personal configuration
Edit `src/config.js` to update contact information, social profile URLs, the resume path, graduation year, and project URLs. The GoFood Live Demo and Source Code buttons are hidden until the corresponding URLs are added.

The included `public/resume.pdf` is a copy of the resume supplied for this portfolio. Replace it with your newest PDF if required.

## Contact form
The form validates required fields and prepares an email using the visitor's default email application (`mailto:`). It does not send messages directly from the website. To deliver messages without opening an email application, connect a backend or an email service and update the submit handler in `src/App.jsx`.

## Deploy
Run `npm run build` and deploy the generated `dist/` directory to a static host such as Netlify, Vercel, or GitHub Pages. For GitHub Pages, configure the Vite base path if deploying under a repository subpath.
