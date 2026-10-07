# Booking Upsell Report: Build Brief

Lead magnet for the Personalized Booking Upsell Experience (`offers/uplayer-travel-04.md`). Draft for CEO review, 2 October 2026.

## 1. What it is

A free web tool. A hotel enters its website URL and within about a minute gets a report with four parts:

1. **Upsell score:** an A to F grade, plus an estimate of the pre-arrival revenue the hotel is missing.
2. **Sample booking upsell pages:** 3 personal pages in the hotel's own brand, one each for a family, a couple and a business guest.
3. **ROI and payback:** projected yearly pre-arrival revenue, the payback month, and the 3-year cost of an UpLayer build vs an upsell SaaS.
4. **Package ideas:** 15 to 20 packages suited to the hotel's type and location, with names, copy and price ranges.

It does three jobs:
- the main lead magnet on the landing page
- the opener in cold outreach, where we run it for the prospect and send the link
- the data source for the State of Pre-Arrival Upselling report and the Upsell Score leaderboard

It reuses the product's own engine: the package matcher, the page renderer and the ROI math.

## 2. Who uses it

| User | How they reach it | What they want |
|---|---|---|
| Hotel GM, owner, revenue manager | Landing page, blog, social, Product Hunt | "How much am I missing, and what would it look like for my hotel?" |
| Prospect from outreach | A link in a cold email or LinkedIn message, already generated | To see their hotel's page with no form to fill |
| UpLayer sales | Internal batch mode | Score and qualify a lead list, then make personal links for outreach |

## 3. User flow

| Step | Screen | Detail |
|---|---|---|
| 1 | Entry | One field: "Your hotel's website". Button: "Get my report". Bot check in the background (Cloudflare Turnstile) |
| 2 | Working | A live progress list, about 30 to 60 seconds: "Reading your website", "Finding your booking engine", "Finding your packages", "Building your guest pages", "Running your numbers". Each step ticks as it finishes |
| 3 | Instant preview, no email | The score and grade, the missed revenue estimate, and 1 sample guest page (the couple page) fully rendered |
| 4 | Unlock | "Send me the full report": work email, name, role, room count (prefilled if found). This unlocks the other 2 guest pages, the ROI section, the package ideas and a PDF copy by email |
| 5 | Full report | All 4 parts on one page with a shareable link. Room count, occupancy, stay length and current upsell sales can be edited, and the ROI updates live |
| 6 | Next step | CTA: "Book a 15 minute walkthrough of your report". Second CTA: "Send this to my team" |

Outreach mode skips steps 1 to 4. We generate the report in batch, and the prospect gets a direct link at a private URL with everything unlocked.

## 4. What the tool reads, and how

| Data point | Source | Method | Fallback |
|---|---|---|---|
| Hotel name, address, city | Website, schema.org `Hotel` or `LodgingBusiness` markup, page title | Parse structured data, then an LLM reads the page | Ask in the unlock form |
| Star rating | schema.org `starRating`, OTA listing, Google Places | Structured data first, then a search for the OTA listing | Ask in the unlock form |
| Room count | schema.org `numberOfRooms`, "about" pages | Structured data, then an LLM reads the pages | Ask in the unlock form (required for ROI) |
| Brand | Homepage | Logo, main colors, fonts and hero photos taken from the rendered page | UpLayer neutral theme with their logo |
| Booking engine | Links, iframes and scripts on "Book now" | Fingerprints: SynXis, iHotelier, Cloudbeds, Mews Booking Engine, SiteMinder TheBookingButton, Little Hotelier, WebRezPro, Bookassist, Profitroom, RMS, eviivo, Stayntouch, ThinkReservations, ResNexus and more | "Not detected" |
| Likely PMS | Inferred from the booking engine where they come together (Mews, Cloudbeds, Little Hotelier) | Mapping table | "Unknown" |
| Upsell or guest tools in use | Scripts, links, subdomains, help pages | Fingerprints: Oaky, Chekin, Duve, UpsellGuru, Canary, Aeroguest, HiJiffy, Conduit, Akia, Whistle | "None detected" |
| Packages already offered | Spa, dining, breakfast, parking, pet, experiences, packages and offers pages | Crawl up to 25 pages on the hotel's domain, then an LLM extracts each sellable item with its price if shown | Generic list for the hotel type |
| Add-ons in the booking flow | The booking engine's public page | v1: the engine's known extras capability, plus any package or extras links on its landing page. v2: a headless browser opens the engine for a date 60 days out and checks for an extras step. It never enters guest details and never books | "Could not check" |
| Mobile quality | Homepage and booking page | Rendered at phone width, load time and layout checks | Skip the item |

Crawl rules: public pages only, robots.txt respected, a maximum of 25 pages, a polite rate, an identifying user agent, and no logins or form submissions.

## 5. Part 1: the upsell score

Out of 100 points, graded A (85 and above), B (70 to 84), C (55 to 69), D (40 to 54) and F (under 40).

| Area | Points | Full points when |
|---|---|---|
| Packages exist | 20 | 6 or more sellable packages found on the site |
| Packages are sellable online | 25 | Packages show in the booking flow, or on a page with prices and a buy button |
| Pre-arrival reach | 20 | An upsell or pre-arrival tool is detected, and it reaches guests beyond online check-in |
| Package presentation | 15 | Each package has a photo, a price and a clear description |
| Personalization | 10 | Signs of guest-specific offers (rare; most hotels score 0 to 3) |
| Mobile booking experience | 10 | The booking page works well at phone width |

Each area shows a one-line finding and a one-line fix. Example: "Your spa and breakfast are on your site, but your booking flow never offers them. Guests booking on Expedia never see them either."

**Missed revenue estimate** (shown as a range and labeled as an estimate):

- Bookings a year = rooms x occupancy x 365 / average stay. Defaults: occupancy 65%, stay 2.2 nights, both editable.
- Potential pre-arrival revenue = bookings x take rate x spend per buying booking. Take rate 8% to 15% (industry range, vendor reported). Spend about USD 95 (Revinate, vendor reported).
- Current capture is estimated from the score: an F hotel captures about 10% of potential, an A hotel about 70% (internal assumption, labeled as such).
- Missed = potential minus current capture.

## 6. Part 2: sample booking upsell pages

| Item | Detail |
|---|---|
| Guests | 3 fictional bookings 30 days out: a family of 4 staying 3 nights from Expedia; a couple on a 2-night weekend from Booking.com; a business guest on a 1-night weekday booking direct |
| Packages used | The hotel's real packages from part 1. Where fewer than 4 were found, the best package ideas from part 4 fill the gap, marked "suggested" |
| Matching | The product's matcher picks 3 to 5 packages per guest, orders them and writes a short line for each guest. Example: the family sees breakfast for 4, early check-in and parking; the couple sees late checkout, a spa for two and dinner |
| Payment choice | Each package shows "Pay now, save 10%" and "Reserve, pay at arrival". Buttons are inactive in the sample |
| Look | The hotel's logo, colors, fonts and photos. Phone frame on desktop, full page on a phone |
| Labels | A banner on every sample: "Sample made by UpLayer from your public website. Not live." |
| Hosting | Private, unlisted URL per report, noindex, removed on request |

## 7. Part 3: ROI and payback

Inputs, all prefilled and editable: rooms, occupancy, average stay, current pre-arrival upsell sales a year, and a build price (default USD 15,000).

| Output | Formula |
|---|---|
| Projected yearly pre-arrival revenue | Bookings x take rate (middle of the range by default) x spend per buying booking |
| Added revenue a year | Projected minus current |
| Payback month | Build price / (added revenue / 12) |
| 3-year cost, UpLayer | Build price + 36 x USD 1,000 care (care can be turned off) |
| 3-year cost, upsell SaaS | Both models shown: 10% commission on projected revenue x 3, and USD 4 per room per month x 36 |
| 3-year revenue kept | Projected revenue x 3, minus each option's cost |

Low, middle and high scenarios are shown side by side. Every benchmark carries its source and the label "industry data, vendor reported". No UpLayer results are claimed.

## 8. Part 4: package ideas

| Item | Detail |
|---|---|
| Input | Hotel type (boutique, resort, city, airport, extended stay), location, star rating, amenities found, nearby attractions found on the site |
| Output | 15 to 20 packages, each with a name, a 1-line description, which guest it suits, best timing (at booking, 12 days out, 2 days out) and a suggested price range |
| Rules | Never contradicts the site (no spa package if the hotel has no spa, unless it is a partner experience marked as such). Price ranges are labeled "suggested, set your own" |
| Grouping | Room and stay (early check-in, late checkout, upgrade), Food and drink, Wellness, Family, Romance, Business, Local experiences, Arrival (parking, transfer) |

## 9. Report page and PDF layout

1. Header: hotel name and photo, grade badge, missed revenue range.
2. "What we found": the 6 score areas with their finding and fix.
3. "Your guests, three ways": the 3 sample pages side by side (stacked on a phone).
4. "Your numbers": the ROI section with live inputs.
5. "Packages you could sell": grouped ideas.
6. "How UpLayer would build this": 4 steps, the guarantee, the 21-day timeline.
7. CTA: book a 15-minute walkthrough.
8. Footer: methods and sources, "estimates, not results", removal request link.

The PDF is the same content, branded, 5 to 7 pages, emailed on unlock.

## 10. Batch mode (internal)

| Item | Detail |
|---|---|
| Input | A CSV of hotel websites from the lead list |
| Output | Per hotel: grade, room count, star rating, booking engine, upsell tool detected, packages found, missed revenue, and the private report URL |
| Use | Qualification (drop hotels under 3 stars, with no booking engine, or with fewer than 4 packages), the `{{report_link}}` merge field for outreach, and leaderboard and benchmark report data |
| Volume | 500 hotels a day at launch |

## 11. Tech

| Layer | Choice |
|---|---|
| App | Next.js on Vercel. Report pages server-rendered for speed and sharing |
| Crawler | Playwright workers on a queue, separate from the web app |
| LLM | Claude via the Anthropic API for extraction, matching and copy. A fast model for extraction, a stronger model for page copy and package ideas |
| Data | Postgres: hotels, reports, packages, leads, events |
| PDF | Rendered from the report page with headless Chrome |
| Email | Transactional sender for the PDF and the lead alert to sales |
| CRM | Each unlocked lead posts to the CRM with the grade and report link |
| Abuse | Turnstile, a per-IP rate limit, a cache of 30 days per domain |
| Analytics | Funnel events: URL entered, preview seen, unlocked, PDF opened, ROI edited, call booked |

Target time: preview in 60 seconds or less, full report in 90 seconds or less.

## 12. Legal and trust

| Topic | Rule |
|---|---|
| Crawling | Public pages, robots.txt respected, no logins, no form submissions, no bookings |
| Hotel photos and logos | Used only in the private sample, labeled as a sample, noindex, removed on request |
| Leads | Clear notice at unlock of what we store and that UpLayer may contact them. Privacy policy link |
| Claims | Every number labeled as an estimate or industry data with a source. No UpLayer results until real pilots exist |
| Leaderboard and public report | Only aggregate data or hotels that opted in, unless the CEO approves naming hotels by public score |

## 13. Success metrics

| Metric | Target, first 60 days |
|---|---|
| Reports started | 300 |
| Preview to unlock rate | 30% or more |
| Unlocked reports from qualified hotels (3 stars and up, 4 or more packages) | 60% or more |
| Walkthrough calls booked from reports | 5% of unlocks |
| Outreach reply rate with a report link vs without | Higher with the link, measured on a split |

## 14. Build plan

| Phase | Scope | Time estimate |
|---|---|---|
| v1 | URL entry, crawl, booking engine and upsell tool fingerprints, package extraction, score, 1 preview page, unlock, 3 pages, ROI, package ideas, PDF, batch mode | 3 to 4 weeks |
| v1.1 | Live ROI edits, shareable link, CRM sync, cache | 1 week |
| v2 | Headless booking flow check, leaderboard, benchmark report export | 2 to 3 weeks |

## 15. To confirm

- [ ] Tool name: "Booking Upsell Report" kept, or renamed to carry "Personalized Booking Upsell Experience"
- [ ] Email gate at the preview, as proposed, or the full report open with no gate
- [ ] Default build price shown in the ROI (USD 15,000)
- [ ] Whether the public leaderboard names hotels
- [ ] The domain for the tool (for example report.uplayer.agency)
