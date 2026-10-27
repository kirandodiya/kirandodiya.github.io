# Dr. Kiranbhai R. Dodiya — Professional Website

Static portfolio (HTML + CSS + vanilla JS). No build step, no backend, no tracking.

## Files
- `index.html` – page content, SEO and JSON-LD
- `styles.css` – styling (dark academic/cybersecurity theme)
- `script.js` – navigation, scroll reveal, animated stats, hero canvas
- `profile.jpg` – profile photograph (repository root)
- `assets/` – `favicon.svg`, `profile-placeholder.svg`, `og-image.svg`, `Dr_Kiranbhai_Dodiya_CV.pdf`

## Notes
- Content is visible even if JavaScript fails; scripts only add animation.
- To replace the CV, overwrite `assets/Dr_Kiranbhai_Dodiya_CV.pdf` (keep the filename).
- To change the photo, overwrite `profile.jpg` at the repository root.

## Deploy to GitHub Pages (kirandodiya.github.io)
1. Sign in to GitHub and create a **public** repository named exactly `kirandodiya.github.io` (your GitHub username must be `kirandodiya`).
2. Upload the **contents** of this folder (`index.html`, `styles.css`, `script.js`, `profile.jpg`, `assets/`, `README.md`, `UPLOAD_TO_GITHUB.txt`) to the repository root, via *Add file → Upload files*, then commit to `main`.
3. Open *Settings → Pages*. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. After about a minute the site is live at **https://kirandodiya.github.io/**.

If your username differs, update the canonical/Open Graph URLs in `index.html` accordingly.

Open `index.html` directly in a browser to preview locally.
