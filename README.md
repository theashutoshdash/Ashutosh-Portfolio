# Ashutosh Dash — Finance & Business Portfolio

A responsive, single-page portfolio built with plain HTML, CSS and JavaScript. The visual identity uses navy, cream, antique gold, magenta and purple, with a persistent dark/light theme. No framework, build step or hosted app platform is required.

## Run locally

1. Extract the project ZIP.
2. Keep `index.html`, `styles.css`, `script.js` and the `assets/` folder together.
3. For the best PDF-reader experience, run a local server from this folder:

   ```bash
   python -m http.server 8000
   ```

4. Open `http://localhost:8000` in a browser.

You can also open `index.html` directly, but some browsers handle embedded PDF files more reliably over a local server.

## Included sections

- Hero and personal brand identity
- Profile
- Family Office / Shree Sai Gopinath Traders experience
- Upcoming Aaksidhi Corpo Care internship
- TCS Equity Research and Valuation Report with an embedded PDF reader
- IntelliInvest live project
- Darling Retail Power BI dashboard image
- Ongoing M&A event-study research
- Compact credentials and verification links
- Education and contact

## Interactions

- Responsive desktop and mobile navigation
- Persistent dark/light mode, including matching logo variants
- Intro preloader, animated focus label and scrolling discipline ribbon
- Scroll progress, active navigation and reveal transitions
- Desktop pointer glow and portrait parallax
- NISM certificate lightbox
- Back-to-top control
- Reduced-motion support

## Content and privacy notes

- The Master CV is the basis for the education and experience content.
- Shree Sai Gopinath Traders is presented as family-office and operating-business experience, with the SSGT Essentials website linked at `https://ssgtessentials.in/`.
- The SSGT Essentials domain could not be retrieved from the build environment, so the experience uses a restrained typographic SSGT mark rather than an unverified copied logo. Replace it with the official mark in `index.html` when available.
- The Aaksidhi Corpo Care role is an offer-stage appointment: offer dated 5 November 2026, expected joining 15 December 2026. It is not presented as current or completed employment.
- The complete offer letter is not included in the public site because it contains personal information.
- The NISM certificate preview is redacted; marks are not shown.
- The IntelliInvest project is linked publicly. Demo credentials are not included in the public source.
- The TCS equity research report is presented as academic research, not an investment recommendation.
- The four supplied Coursera verification URLs and JPMorgan simulation certificate are included.
- The small monogram and final signature wordmark are the supplied Odia-English logo assets with transparent backgrounds. Dark and light logo variants are included for contrast.

## Project structure

- `index.html` — portfolio content and page structure
- `styles.css` — responsive layout, colour themes and animations
- `script.js` — theme, navigation, scroll effects, focus rotation and certificate viewer
- `assets/` — portraits, logos, dashboard image, CV, PDF report and certificates

## Update content

Edit the text and links in `index.html`. Replace files in `assets/` to update portraits, logos, CV, certificates, dashboard or report. Keep filenames unchanged unless you also update their references in `index.html`.


### SSGT branding
The official SSGT logo is included at `assets/ssgt-logo.png` and links to [ssgtessentials.in](https://ssgtessentials.in/). The supplied logo already had a transparent background; transparent padding was trimmed for cleaner display.
