# Dr. Kiranbhai R. Dodiya — Professional Website

Static portfolio (HTML + CSS + vanilla JS). No build step, no backend, no tracking.

## Files
- `index.html` – page content, SEO and JSON-LD
- `styles.css` – styling (dark academic/cybersecurity theme)
- `script.js` – navigation, scroll reveal, animated stats, hero canvas
- `assets/` – `favicon.svg`, `profile-placeholder.svg`, `og-image.svg`, `Dr_Kiranbhai_Dodiya_CV.pdf`

## Before publishing (2 quick edits)
1. **Profile photo:** save your photograph as `assets/profile.jpg` (portrait, ~1000×1200 px). Until then a neutral placeholder is shown automatically.
2. **Email (optional):** no email was supplied, so none is shown. To add one, in `index.html` find the comment `To show an email address` in the Contact section and add:
   `<p><a href="mailto:YOUR_EMAIL">YOUR_EMAIL</a></p>`

The CV PDF was generated only from the professional details supplied for this site. Replace `assets/Dr_Kiranbhai_Dodiya_CV.pdf` with your own CV file (keep the same file name) if you prefer.

## Deploy to GitHub Pages (kirandodiya.github.io)
1. Sign in to GitHub and create a **public** repository named exactly `kirandodiya.github.io` (your GitHub username must be `kirandodiya`).
2. Upload the **contents** of this folder (`index.html`, `styles.css`, `script.js`, `assets/`, `README.md`) to the repository root, via *Add file → Upload files*, then commit to `main`.
3. Open *Settings → Pages*. Under *Build and deployment*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. After about a minute the site is live at **https://kirandodiya.github.io/**.

If your username differs, update the canonical/Open Graph URLs in `index.html` accordingly.

Open `index.html` directly in a browser to preview locally.
