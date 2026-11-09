# ExpertiseInPharma website: handover

Static HTML site for **https://expertiseinpharma.com**, operated by SIP Edtech Private Limited.
No database, no build step: upload the files and it runs.

---

## 1. What's in the folder

| Path | What it is | Upload to server? |
|---|---|---|
| `*.html` (15 pages incl. `404.html`) | The site | Yes |
| `assets/` | Stylesheet, scripts, images, logos, favicon, share image | Yes |
| `favicon.ico`, `robots.txt`, `sitemap.xml`, `.htaccess` | Browser icon, search engine files, server settings (cPanel) | Yes |
| `_redirects` | Same redirects for the Netlify preview (ignored by cPanel) | Optional |
| `form-backend/Code.gs` | The Google Apps Script that receives form submissions | **No** (it is pasted into Google, see §2) |
| `partials/`, `tools/` | Shared nav/footer/modal and the script that copies them into pages | **No** (only needed when editing) |
| `HANDOVER.md`, `HOMEPAGE-SECTIONS.md`, `README.md` | Documentation | No |

Pages: `index`, `about`, `services` (overview), `industries` (overview), `sme-on-demand`, `resource-on-demand`, `outsourced-ld`, `pharmaceutical-companies`, `cro`, `how-we-partner`, `careers`, `contact`, `privacy`, `terms`, `404`.

Site-wide behaviour in `assets/site.js`: a sticky "On this page" bar is built automatically on pages whose `<body>` has `data-subnav` (from each section's "NN — Label" eyebrow), and phones get a floating "Talk to our team" bar.

---

## 2. Forms → Google Sheet + email (one-time setup, ~10 minutes)

The six forms (contact page, homepage contact, the "Talk to our team" pop-up on every page, careers profile with CV upload, careers company position) all send to one Google Apps Script. Each submission:
- adds a row to a Google Sheet (one tab per form, columns are created automatically),
- saves an attached CV or job description to a Drive folder **Website form uploads** and links it in the row,
- emails a notification with Reply-To set to the person who submitted.

**Until steps 1–7 are done, forms show "Message sent" but nothing is delivered.**

1. Sign in to the Google account that should own the submissions (e.g. the contact@sipedtech.com Google Workspace account).
2. Create a new Google Sheet, e.g. *Website enquiries*.
3. In the Sheet: **Extensions → Apps Script**. Delete the sample code and paste the whole of `form-backend/Code.gs`.
4. At the top of the script, set `NOTIFY_EMAIL` to the inbox(es) that should be notified (comma-separate several).
5. **Deploy → New deployment → Select type: Web app.** Execute as: **Me**. Who has access: **Anyone**. Click Deploy and approve the permissions (Sheets, Drive, Gmail).
6. Copy the **Web app URL** (ends in `/exec`). Opening it in a browser should show `{"ok":true,"status":"…running"}`.
7. In `assets/forms.js`, paste it into line 6:
   `var EIP_FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';`
   Upload the updated `forms.js`.
8. Test: submit the contact form on the live site. A row should appear in the Sheet and an email should arrive.

If you later edit `Code.gs`, use **Deploy → Manage deployments → Edit → New version**. That keeps the same URL.

---

## 3. Uploading to cPanel

1. cPanel → **File Manager** → `public_html`.
2. Upload everything marked "Yes" in §1, keeping the folder structure (`assets/` stays a folder).
3. `.htaccess` is a hidden file. In File Manager → Settings, tick **Show hidden files** to see it. It:
   - forces `https://expertiseinpharma.com` (no www),
   - **301-redirects the old WordPress URLs** (`/services/resource-on-demand/`, `/industry-solutions/clinical-research-organization/`, etc.) to the new pages so existing links and Google results keep working,
   - blocks `partials/`, `tools/`, `form-backend/` if uploaded by mistake, and adds caching/compression.
4. Make sure SSL is active (cPanel → SSL/TLS Status → AutoSSL).
5. After launch: submit `https://expertiseinpharma.com/sitemap.xml` in Google Search Console.

---

## 4. Editing the site

- **Text on a page:** edit that page's `.html` file directly and re-upload it.
- **Nav menu, footer, or the "Talk to our team" pop-up:** these are shared. Edit the file in `partials/`, then run
  `python tools/sync-partials.py`
  from the site folder. It copies the change into every page (between the `<!-- @partial … -->` markers). Re-upload the changed pages.
  *Careers keeps its own pop-up (it asks whether the visitor is hiring or job-seeking).*
- **Colours, fonts, buttons, cards:** `assets/site.css` (one design system for every page).
- **Images:** replace a file in `assets/` with one of the same name. Keep photos ≤ 2000px wide and under ~400 KB.

---

## 5. Content decisions made in this build

**GCC removed everywhere** (per instruction). Sentences were trimmed, not rewritten:
- Closing paragraph on all pages: "…preparing for an audit, ~~scaling a GCC,~~ or building bench capacity…"
- Contact: intro used "~~scaling a global delivery center~~" → now the standard sentence above; "GCC Enablement" removed from the dropdown.
- How We Partner: removed the chip "Exploring a GCC setup to reduce vendor dependency"; "whether it's ~~a GCC feasibility study,~~ hiring an expert or deploying resources"; "consistent quality across ~~GCC enablement,~~ SME expertise, talent deployment, and training"; "Capability building at scale" now reads "Our L&D professionals and compliance experts work together to design, launch, and scale delivery capability…" (was "Our GCC specialists… your Global Capability Center"); Option B "ideal for sustained delivery~~, GCC build-out,~~ or long-running transformation".
- About: "Our specialists in ~~capability-center design,~~ L&D, and compliance…"
- Footer About text, nav and service sidebars: no GCC.

**Copy taken word-for-word from the live site** for Resource on Demand, Outsourced L&D Enablement and Clinical Research Organization (CRO). Two typo fixes only:
- "Pharmacoviglance" → "Pharmacovigilance" (Resource on Demand talent pool).
- "…CRO workflows and, Regulatory affairs, They are screened…" → "…CRO workflows and Regulatory affairs. They are screened…"

**Email:** `contact@sipedtech.com` on every page (as on the live site).

---

## 6. Still needed from the client

| Item | Where | Current state |
|---|---|---|
| Privacy Policy text | `privacy.html` | Placeholder page, hidden from Google (`noindex`) |
| Terms of Use text | `terms.html` | Placeholder page, hidden from Google |
| Real client logos | Homepage §08 | 6 labelled placeholder tiles |
| Real testimonials | Homepage §08 | 2 illustrative quotes |
| Open roles and counts | Homepage §09, Careers | Illustrative roles |
| LinkedIn URLs for the 4 leaders | About → Leadership | Links hidden until provided |
| Social media URLs | Footer | Icons removed until provided |
| Confirm registered address spelling | Contact ("SIPEdTech PRIVATE LIMITED, … Ahmadabad City") | Copied from previous site |
| Wording sign-off list | `HOMEPAGE-SECTIONS.md` → "Wording to confirm" | Pending |
