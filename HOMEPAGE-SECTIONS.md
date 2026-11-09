# Homepage sections: client's current site vs our new homepage

Reference for what came from the client's existing site, what we changed, and what we added.
"Client's current site" means only the sections shared as screenshots. Their hero and anything not shown were never compared.

---

## 1. Client's current site: exact sections, in order

| # | Section heading | What it contains |
|---|---|---|
| 1 | **The readiness gaps holding you back** | Intro paragraph + 6 gaps: Talent shortages, Slow onboarding, Compliance risk, Execution uncertainty, No flex capacity, Expansion hurdles. Image on the left. |
| 2 | **How we enable your workforce** | Subtitle "Staffing fills roles. Training fills calendars." + line "We enable workforces. Solutions built by industry professionals who know what audits, scale, and pressure really demand." 4 cards: **GCC Enablement**, SME-on-Demand, Resource-on-Demand, Outsourced L&D Enablement. |
| 3 | **What makes us different** | 6 boxes, each with a title and description: Pharma-First Domain Expertise, Production-ready by design, Mentor-led approach, End-to-end workforce continuum, Deployment-ready talent pool, Flexible commercial models. Lavender background. |
| 4 | **Trusted across the Pharma ecosystem** | 4 cards: 5,000+ Professionals trained globally · 50+ CRO and Pharma companies · 14+ Industry collaborations · Strategic partnerships. |
| 5 | **Ready to build production-ready teams?** | "Whether you're building a GCC, managing a talent gap, preparing for an audit, or strengthening bench capacity for an upcoming bid — we're here to help." + "Talk to our team" button. Purple band. |
| 6 | **Footer** | About (2 paragraphs, mentions GCC Consulting) · Explore links · Contact Us (contact@sipedtech.com) · Other Links (Privacy, Terms) · social icons. |

---

## 2. Our new homepage: exact sections, in order

Legend: **Client** = client's wording kept · **Ours** = new content we wrote · **Earlier build** = carried over from our previous homepage version

| # | Section (as shown on page) | Source | Notes |
|---|---|---|---|
| — | **Hero carousel** (4 slides: Building production-ready teams for Pharma & CROs · SME on Demand · Resource on Demand · Outsourced L&D) | Earlier build | Slide 1 subtitle adapted from the client's footer About text. Buttons: Talk to our team / Explore our services, plus a "Looking for a role? Visit Careers" link. |
| — | **Functional-area ticker** (scrolling: Pharmacovigilance, Clinical Operations, Regulatory Affairs …) | **Ours (new)** | Function names taken from the client's "5,000+" description. |
| 01 | **The readiness gaps holding you back** | Client | Exact client copy. **Ours:** "Solved by → [service]" line under each gap. |
| 02 | **How we enable your workforce** | Client | Exact client descriptions for SME, Resource, L&D. **GCC Enablement card removed.** **Ours:** "Ideal for" tags on each service, and an image that stays pinned while you scroll. |
| 03 | **Not a staffing agency. Not a training vendor.** (comparison table) | **Ours (new)** | Built on the client line "Staffing fills roles. Training fills calendars." Compares staffing agency vs training vendor vs ExpertiseInPharma on 6 points + "75% faster". |
| 04 | **Different business models. Shared workforce challenges.** (Pharma / CRO cards) | Earlier build | Not on the client's screenshots. Cards show taglines, priorities, "How we help" and 75% stat badges. |
| 05 | **Engage the way your business runs** | Mixed | Timeline (Assess → Design → Deploy → Scale) from the earlier build. Intro is the client line "Retainer, project-based, cohort-based, or outcome-aligned…". **Ours:** the 4 commercial model cards with "Best for" notes. |
| 06 | **What makes us different** | Client | Exact 6 titles + descriptions. **Ours:** the one-line intro beside the heading. |
| 07 | **Trusted across the Pharma ecosystem** (dark stats band) | Client | Exact 5,000+ / 50+ / 14+ copy. Numbers appear **only here**. **Ours:** the intro line and the region row (US, EU, UK, Emerging markets). |
| 08 | **Aligned with how the industry actually delivers** (Strategic partnerships) | Client + placeholders | Client's Strategic partnerships paragraph. **Ours:** the heading. **Placeholders:** 6 client-name tiles and 2 business testimonials (not real; replace when available). |
| 09 | **Your next role in Pharma is closer than you think** (for professionals) | **Ours (new)** | Job-seeker section: 6 function tags with role counts, 5 sample openings, links to Careers. Roles and counts are illustrative. |
| — | **Ready to build production-ready teams?** + contact form | Client | Client copy with the GCC phrase removed. **Ours:** the message form beside it. |
| — | **Footer** | Client | Client's About text with "Global Capability Center (GCC) Consulting" removed. Email: **contact@sipedtech.com** (matches the client's live site; used on every page). |

### Removed from the homepage
- All GCC references (GCC Enablement card; GCC in "Expansion hurdles", CTA and footer).
- Repeated stats (previously shown 3 times).
- Candidate content: moved to Careers (see below).

### Wording to confirm with the client
- Hero slide 1 subtitle
- "Solved by" mapping (01)
- "Ideal for" tags (02)
- Comparison table rows (03)
- Commercial model descriptions + "Best for" (05)
- Section intros next to 06, 07 and the 08 heading
- Placeholder client names and testimonials (08)
- Sample roles and counts (09)

---

## 3. Careers page: sections added (moved from the old homepage)

Inserted between **Featured open roles** and **Choose your path**:

| # | Section | Content |
|---|---|---|
| 03 | **A search that actually respects your time** (What you get) | 6 points: Real roles, not a database · A fast, transparent process · Every functional area covered · Flexible arrangements · Support beyond the interview · Global reach |
| 04 | **From profile to production role, in four steps** | Submit → Match → Interview → Start |
| 05 | **Different career stages. One profile fits both.** | Experienced Professionals · Early-Career & Graduates |
| 06 | **Professionals we've placed** | 2 candidate testimonials (placeholders) |

"Choose your path" was renumbered to 07.

---

## 4. Images (all in `assets/`)

| Homepage slot | Photo |
|---|---|
| Hero 1 / 2 / 3 / 4 | boardroom.jpg / executives-meeting.jpg / team-collaborating.jpg / presenting-roadmap.jpg |
| Readiness gaps | woman-laptop.jpg |
| SME / Resource / L&D | executive-laptop.jpg / colleagues-discussion.jpg / presenting-outlook.jpg |
| Pharma / CRO cards | professionals-walking.jpg / networking.jpg |
| Stats band (faint) | hands-laptop.jpg |
| Closing CTA | professional-laptop.jpg |

Each slot is marked with `data-slot="…"` in `index.html`, so a photo can be swapped in one place.
