# Nihongo Companion

A Japanese dictionary and translation workspace for Burmese-speaking learners, with Burmese, English, Japanese, and Thai interface options.

## Features

- Look up Japanese words and kanji with Jotoba and read the original English definitions.
- Translate short passages between Japanese and Burmese through MyMemory.
- Save dictionary results as flashcards and review them in the same browser.

## Run locally

Requires Node.js 20.19+ on the Node 20 line, or Node.js 22.12+.

```bash
cd frontend
npm ci
npm run dev
```

Open <http://localhost:5173>.

## Check a change

```bash
cd frontend
npm test
npm run build
```

## Free hosting with GitHub Pages

The included GitHub Actions workflow tests, builds, and publishes the site without Docker, a server, or a paid platform.

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push to `main`, or run **Deploy to GitHub Pages** manually from the Actions tab.

The site uses relative asset paths, so it also works on other free static hosts such as Netlify or Render Static Sites. Use `frontend` as the base directory, `npm run build` as the build command, and `dist` as the publish directory.

## Architecture

The app runs on GitHub Pages without its own backend, database, Docker image, or API keys. Saved flashcards are stored in browser local storage.

Live dictionary lookups send the submitted query to Jotoba. MyMemory receives text submitted through the separate translator. These services require internet access. MyMemory applies anonymous usage limits and a 500-byte request limit.
