# Nihongo Companion

A lightweight Japanese vocabulary companion with Burmese, English, Japanese, and Thai interfaces. It works entirely in the browser, so it is fast, private, and free to host as a static site.

## Features

- Live Japanese dictionary and kanji lookup with English definitions from Jotoba
- Japanese ↔ Burmese machine translation through MyMemory
- Flashcards for saved vocabulary

- Search by kanji, kana, romaji, or translated meaning
- Filter words by everyday life, travel, food, and study
- Save vocabulary for later review (stored in the browser)
- Switch instantly between မြန်မာ, English, 日本語, and ไทย
- Responsive Japanese-inspired interface for phones and desktops

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

The app runs on GitHub Pages without its own backend, database, Docker image, or API keys. The curated vocabulary and review cards work from bundled data. Saved words remain in each visitor's browser.

Live dictionary lookups send the submitted query to Jotoba. Translation sends submitted text to MyMemory, which has shared anonymous usage limits and a 500-byte request limit. These services require internet access. Machine translations can miss context, and dictionary definitions from Jotoba are in English.
