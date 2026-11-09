# Image brief: new photography for ExpertiseInPharma

The site currently runs on 12 generic corporate stock photos. They work as backgrounds, but none of them shows **pharma work**: pharmacovigilance, regulatory documents, audits, training or clinical research. This brief lists the images worth generating, where each one goes, and the exact prompt.

Save each image into `assets/` under the filename given. Once they are in place, the HTML references can be switched over in one pass.

---

## Shared style (append to every prompt)

> Photorealistic editorial corporate photography, shot on a full-frame camera with a 35mm lens, natural daylight from large windows, soft shadows, shallow depth of field. Cool colour grade with deep navy and soft teal-cyan tones, clean neutral whites, subtle warm skin tones. Modern, minimal life-sciences office in India or a global city, glass partitions, light wood, plants. Diverse professionals (South Asian, East Asian, Black, White; mixed genders and ages), business or smart-casual attire, natural candid expressions, nobody looking at the camera. No text, no logos, no brand names, no readable screen content (screens show abstract charts or blurred data only), no lab coats outside lab scenes, no stethoscopes, no pills spilling. Uncluttered composition.

**Formats**
- **Hero (H):** 2400 × 1350 (16:9). Keep the **left 45% calm and darker** for headline text and put the subject on the right.
- **Card (C):** 1800 × 1200 (3:2). Subject centred, safe for cropping to 4:3 and 16:10.
- **Background (B):** 2400 × 1350. Low detail and soft focus; it is tinted heavily behind text.

Keep files under about 400 KB (JPG, quality 80, max 2000–2400px wide).

---

## Priority 1: replace mismatched images

| # | File | Format | Replaces / goes to | Prompt (then add the shared style) |
|---|---|---|---|---|
| 1 | `cta-background.jpg` | B | Background of every "Let's talk" CTA card and the homepage contact form (currently an airport-lounge photo) | Wide shot of a bright, calm modern office meeting space with a small team in soft focus around a table in the far right of the frame, large windows, lots of empty negative space on the left, gentle depth of field, serene and professional mood. |
| 2 | `hero-cro.jpg` | H | CRO page hero (currently a conference crowd) | A clinical research operations team of four in a modern office reviewing a trial timeline on a large wall display showing abstract Gantt bars and milestone markers, one lead pointing at the screen, others with laptops and printed study documents, focused collaborative mood, subject on the right of the frame. |
| 3 | `hero-pharma.jpg` | H | Pharma page hero (currently an empty boardroom) | A senior pharmaceutical leadership team of three standing in a glass-walled office overlooking a modern laboratory below, discussing a tablet showing abstract charts, strategic and confident mood, lab with scientists visible through the glass in the background, subjects on the right. |
| 4 | `hero-sme.jpg` | H | SME on Demand hero and homepage slide 2 | An experienced subject-matter expert in her fifties with grey hair, in a blazer, advising a small team at a conference table, open binders and annotated SOP documents in front of them, the team listening attentively, mentor-like authority, subject on the right of frame. |
| 5 | `hero-rod.jpg` | H | Resource on Demand hero and homepage slide 3 | A row of young life-sciences professionals in their twenties working at dual-monitor workstations in a bright open-plan delivery centre, screens showing abstract case-processing forms and data tables, a team lead walking behind them checking in, productive and capable mood. |
| 6 | `hero-ld.jpg` | H | Outsourced L&D hero and homepage slide 4 | An instructor-led corporate training session: a trainer at the front beside a screen showing an abstract process-flow diagram, around twelve trainees with laptops and notebooks seated at a U-shaped table, engaged and attentive, modern training room with daylight. |

## Priority 2: give sections pharma-specific images

| # | File | Format | Goes to | Prompt (then add the shared style) |
|---|---|---|---|---|
| 7 | `pv-specialist.jpg` | C | Resource on Demand → "Who benefits"; homepage services panel 02 | Close-medium shot of a pharmacovigilance specialist, a South Asian woman in her late twenties, reviewing an adverse-event case on a monitor showing an abstract structured form, a notepad with handwritten notes beside the keyboard, concentrated expression. |
| 8 | `audit-review.jpg` | C | Pharma → "Compliance and Regulatory Readiness"; CRO → "Compliance and Quality Readiness" | A quality assurance auditor and a site manager reviewing a stack of controlled documents and a checklist on a tablet at a meeting table, colour-tabbed binders, sticky flags on pages, serious and meticulous mood. |
| 9 | `regulatory-dossier.jpg` | C | Pharma → "Process Optimization and Transformation"; SME → "Who benefits" | A regulatory affairs professional, a man in his forties, assembling a submission dossier: neatly organised document sections spread on a desk, a laptop with an abstract document tree on screen, reading glasses, calm precision. |
| 10 | `global-expansion.jpg` | C | Pharma → "Strategic Expansion and Market Entry" | A small strategy team on a video call with international colleagues shown on a large screen as soft-focus tiles, an abstract world map with highlighted regions on a second screen, collaborative and global mood. |
| 11 | `bid-support.jpg` | C | CRO → "Bid Support and Strategic Growth" | A business development lead and a scientific expert rehearsing a client proposal presentation in a meeting room, printed proposal decks on the table, one gesturing at a screen of abstract slides, late-afternoon light, focused energy. |
| 12 | `new-hires-onboarding.jpg` | C | CRO → "Talent Acquisition and Retention"; Pharma → "Talent Acquisition and Capability Building"; Careers | A group of five recent life-sciences graduates on their first day, receiving laptops and welcome folders from a friendly mentor in a bright office, smiling, eager, diverse group in smart-casual attire. |
| 13 | `urgent-coverage.jpg` | C | CRO → "Urgent Coverage Needs" | An experienced professional joining a busy project team mid-meeting, shaking hands with the project lead while others look up from laptops and documents, a sense of relief and momentum, whiteboard with abstract sticky-note timeline behind them. |
| 14 | `mentor-coaching.jpg` | C | Outsourced L&D → "Who benefits"; About → story section | A mentor sitting beside a junior professional at a workstation, pointing at the monitor and explaining, the junior taking notes, supportive one-to-one coaching, warm yet professional. |
| 15 | `lab-to-office.jpg` | C | Industry Solutions → Pharma card; homepage industry card | A modern pharmaceutical laboratory with a scientist in a lab coat and safety glasses handling sample vials, seen through a glass wall from an adjoining office where two colleagues in business attire talk, linking science and operations. |
| 16 | `contact-office.jpg` | C | Contact page photo under the address | A welcoming small corporate reception and meeting area in a modern Indian office: a light wood reception desk, plants, a glass meeting room in the background, warm daylight, no people or one receptionist in soft focus. |

## Optional

| # | File | Format | Goes to | Prompt (then add the shared style) |
|---|---|---|---|---|
| 17 | `stats-background.jpg` | B | "Trusted across the Pharma ecosystem" stats band | Overhead flat-lay of a desk with printed charts and graphs, a laptop with abstract dashboards, a pen and a coffee cup, organised and minimal, soft focus at the edges. |
| 18 | `legal-desk.jpg` | B | Privacy Policy / Terms hero | A tidy desk with a printed contract, a fountain pen and a closed laptop in soft morning light, minimal and calm. |

---

## Where the current photos stay

These fit their sections and can stay after the new images arrive:
- `executive-laptop.jpg`: SME services card, Pharma intro, Contact.
- `colleagues-discussion.jpg`: Resource on Demand cards.
- `presenting-outlook.jpg` and `presenting-roadmap.jpg`: training and partnership sections.
- `team-collaborating.jpg`: delivery and capacity sections.
- `professionals-walking.jpg`: Careers and industry heroes.
- `boardroom.jpg`: Services hero.
- `hands-laptop.jpg`: stats band.

To retire once the new set is in: `professional-laptop.jpg` (airport lounge, off-message) and `networking.jpg` (conference crowd).

## Leadership photos

`nitin.webp`, `purav.JPG`, `neema.webp` and `sanjukta.JPG` are real people. Use them **only** on the About page's leadership cards. They were also used as avatars on the placeholder homepage testimonials; that has been removed, so the placeholder quotes are no longer attributed to real faces. Do not generate AI images of real team members.
