# Operto (Operto Guest, Upsells module)

Checked 1 October 2026. Primary page: https://operto.com/upselling/

## 1. What it is

Operto Guest Technologies is a Vancouver, Canada company founded in 2016 that sells a hospitality automation suite: Operto Guest (guest app, guidebook, messaging, verification, upsells), Operto Access (smart locks, mobile keys), Operto Teams (housekeeping and maintenance) and, since 2025 to 2026, Operto ONE (AI visibility, branded search protection against OTAs, AI booking assistant). Upsells is a feature of Operto Guest, not a standalone product. It sells to short-term and vacation rental property managers, boutique and independent hotels, apartment hotels, student housing and multi-family. The upselling page says it is for "boutique hotel, vacation rental, or apartment hotel". Third-party profiles say it serves 90+ countries and 20,000+ property managers and hoteliers (vendor reported, via Crunchbase and press). Funding: about USD 37M across Series A (2022) and Series B USD 25M (2023), per Crunchbase and Dealroom summaries. In 2026 the hotel landing page (operto.com/hotels/) now leads with Operto ONE and direct bookings, not upsells, so upsells is a secondary feature in their hotel story.

| Item | Detail |
|---|---|
| HQ | Vancouver, British Columbia, Canada |
| Founded | 2016 |
| Segments | Vacation rental managers (core), boutique and independent hotels, aparthotels, student housing, multi-family, mixed use |
| Size sweet spot | Multi-unit managers; Operto Teams requires a minimum of 10 properties (STR Hub) |
| Countries | 90+ (vendor reported) |
| Customers | "20000+ hotels and vacation rentals" on upselling page (vendor reported) |
| Notable deal | Acquired STAYmyway, an Accor-linked program covering 5,000+ hotels in 100+ countries (vendor reported, press) |

## 2. Features

### Upsell types

| Type | Source |
|---|---|
| Room upgrades | Upselling page |
| Early check-in, late check-out | Upselling page, guest messaging page |
| Pet-friendly packages | Upselling page |
| Experiences, curated local experiences, local services | Upselling page |
| In-stay add-ons, "custom or prebuilt stay enhancements" | Guest page |
| Third-party upsells ("Unlimited upsells, in-house and third-party") | Vacation rentals page |
| Dining, spa, transport, special-occasion packages | Suggested in Operto blog, not confirmed as templates |

### Channels

| Channel | Supported | Note |
|---|---|---|
| Email | Yes | "via email, app, or text" |
| SMS | Yes | Automated messaging page |
| Push notifications | Yes | Automated messaging page |
| In-app (browser-based Guest Portal / guest app) | Yes | Mobile-first web app, branded |
| WhatsApp | Not found | |
| Website chat | Only in Operto ONE AI booking assistant, for bookings, not upsells | |
| Booking-time upsell | Claimed: "select their preferred upsells during booking" | Mechanism not documented |

### Timing triggers

| Trigger | Detail |
|---|---|
| Journey stages | Pre-arrival, on-arrival, in-stay, checkout (upselling page) |
| Scheduled messages | "Customize and schedule messages" before, during, after stay |
| Event-based | Smart lock events, for example a welcome note on first door unlock; "conditionally triggered automated guest messages" (STR Hub) |
| Digital check-in | Upsells offered "through digital check-in" (early check-in, late check-out) |

### Personalization and AI

| Claim | What it appears to be |
|---|---|
| "Upsells analyzes guest data and suggests personalized upsell offers, such as room upgrades, early check-ins" | No description of a model, signals or ranking. Not explained anywhere public. |
| "Leveraging booking data and guest preferences to relevant offers" | Most likely rule or property-level offer configuration tied to reservation fields. No evidence of per-guest generated offers. |
| "Personalized automation ensures you always offer the right services at the right time" | Timing rules on the journey stages above. |
| Auto translation of text | Present (STR Hub). |
| AI elsewhere | AI Guest Verification add-on (ID check), Operto ONE AI booking assistant and AI search visibility. Skift IDEA Awards 2026 finalist for Best Use of AI was for ONE's anti-OTA work, not upsells. |

Assessment: personalization on the upsell side is marketing language over segment and timing rules. No public evidence of AI generated offer copy, dynamic pricing per guest, or propensity scoring. "Optimize pricing strategies for upsell offers" is claimed with no detail.

### Payment options

| Option | Status |
|---|---|
| Pay upfront before arrival | Implied by in-app purchase ("Guests can easily purchase services and upgrades via mobile devices", blog). Processor not documented. |
| Pay at arrival / reserve now | Not found |
| Deposits | Not found |
| Discount for paying upfront | Not found |
| Payment processor | Not found for Guest upsells. Stripe is documented only for Operto Teams owner billing (help-teams.operto.com). |

### Merchant of record

Not found. No public statement on whether Operto or the property is merchant of record for upsell charges.

### Auto vs manual approval

Not found. Early check-in is listed as "Manage early check-ins" under Digital Front Desk (STR Hub), which suggests a request flow, but approval logic is not documented publicly.

### Admin panel

| Capability | Source |
|---|---|
| Single dashboard ("Operto Connect", dashboard.operto.com) for guest, access, devices | Footer login link, STR Hub |
| Branded portal with logo and colors, unit-level and building-level content | STR Hub |
| Custom or prebuilt stay enhancements | Guest page |
| Message templates and scheduling | Guest messaging page |
| Upsell offer pricing controls | Claimed, not shown |

### Analytics

"Monitor upsell performance with real-time data" and "Track and optimize upsell performance with actionable analytics", plus Guest Customer Satisfaction (G-CSAT) measurement. No screenshots or metric list published. Specific reports: not found.

### Integrations

Counts claimed: "over 150 third-party solutions" (guest page), "over 60 partners and OTAs" (guest FAQ), "100+ locks" (vacation rentals page). All vendor reported, and the two counts conflict.

PMS listed on https://operto.com/integrations/ (counted, 30 distinct names):

| Hotel-leaning PMS | Vacation rental PMS |
|---|---|
| Mews, Cloudbeds, Oracle (OPERA), Apaleo, RMS, Stayntouch, WebRezPro, Maestro, ASI, Resly | Hostaway, Hostfully, Guesty, Avantio, Lodgify, Escapia, Hosthub, Track, 365villas, Direct, Felix, Hospitable, Smoobu, Jetstream, OwnerRez, Zeevou, Streamline, Beds24, Booking Automation, Smily |

Channel managers as a data source: not found as a separate category. Data arrives through PMS sync.

## 3. Pricing and model

| Item | Detail | Source |
|---|---|---|
| Public pricing | Not published. https://operto.com/pricing/ is a "Book a demo" router with two paths: "Grow direct bookings" (ONE) or "Improve guest stays & streamline property operations" | operto.com/pricing/ |
| Model | Per unit per month subscription (third-party reported) | STR Hub |
| Core plan | Starting at USD 12.30 per unit per month (third-party reported, date of listing not shown) | strhub.com/digital-guest-guide-comparisons/ |
| Pro plan | Starting at USD 18.70 per unit per month (third-party reported) | same |
| Max plan | Starting at USD 26.90 per unit per month (third-party reported) | same |
| Add-ons | Smart device USD 3.00 per device per month beyond 1 included; Alexa USD 6.00 per device per month; AI Guest Verification USD 8.00 per unit per month (third-party reported) | same |
| Other third-party figures | Search summaries cite Core USD 14.99, Professional USD 29.99, Professional Plus USD 39.99 per month, and annual estimates of USD 500 to 1,500 for 1 unit up to USD 20,000 to 40,000+ for 100 units (estimate, pricingnow.com, page could not be loaded to verify) | pricingnow.com |
| Commission on upsells | Not found. Operto ONE FAQ states "we don't take a percentage" for ONE; no equivalent statement for upsells | operto.com/one/ |
| Setup fee | Not found | |
| Free trial | Not found | |

## 4. Claims and metrics

All vendor reported unless marked.

| Claim | Where |
|---|---|
| "Trusted by 20000+ by hotels and vancation rentals" (typos in original) | Upselling page |
| 150+ third-party integrations; 60+ partners and OTAs; 100+ locks | Guest page, VR page |
| Upselling "can increase hotel revenue by up to 10-30%", ancillary services a "$28 billion opportunity" (cited to Hotel Tech Report, not Operto data) | operto.com/blog/hotel-upsell/ |
| Mountain Creek Resort: 22% increase in ADR, USD 110,000 annual savings, 27% fewer housekeeping hours, 100% keyless | Case study |
| Inn on the Drive: 25% more direct bookings, 10 hours a week reclaimed | Case studies page |
| Sophie's Gasthaus: bookings up 8% | Case studies page |
| Alaska Frontier Inn: 95% less predatory OTA visibility, direct bookings 25% to 38% in five months | Case studies page |
| Clean Getaways: revenue up 48% | Case studies page |
| Little City: 90% fewer miscommunications, productivity up 28% | Case studies page |
| Breakfast Hotel: admin work down 50% | Case studies page |
| Prague Residences / Adrez Living: USD 10,000 saved per month | Case studies, pricing page quote |
| The Annex Hotel: USD 122,000 saved per year; "1.5 staff supporting 24 rooms" | Case studies, pricing page quote |
| Corduroy Suites: 92% guest satisfaction, repeat bookings up 35% | Case studies page |
| Roomza: hotels launched 12+ months faster | Case studies page |
| Holiday Property Service: 150 to 430 properties, 1,900+ monthly cleanings | Case studies page |
| Home page: 25% more direct bookings, 1,000+ tasks managed, 188% portfolio growth | operto.com |
| ONE: 56% of US leisure travelers used AI for travel; 8% of direct bookings lost to third-party sites; 95% reduction in predatory OTAs at top of Google | operto.com/one/ |
| ONE setup in "about 10 minutes" | ONE FAQ |

Counted: zero of the 19 case studies are about upsell revenue. No published upsell conversion rate, attach rate or upsell revenue per booking.

Third-party ratings (as reported in search result snippets, review pages blocked direct fetch):

| Site | Rating |
|---|---|
| Hotel Tech Report, Operto Guest | 5.0 from 5 reviews; Ease of Use 4.4, Support 5.0, ROI 4.8, Implementation 5.0; #26 of 94 in Hotel Guest Apps |
| Hotel Tech Report, Operto ONE | 5.0 from 4 reviews |
| Trustpilot (www.operto.com) | 4.5 TrustScore, 125 reviews (another regional page shows 118) |
| G2 | Operto listing not found |
| Capterra | Listings exist for Operto Connect, Operto Guest and Operto Teams; score not retrieved (403) |

## 5. Landing page teardown (https://operto.com/upselling/)

**Hero headline (word for word):** "Hotel upselling software to enhance guest experience & drive revenue."

**Subhead (word for word):** "Maximize your revenue beyond guest bookings with Operto Upsells. Upsells offers customizable stay experience, automation, and amenities that your guests will appreciate."

**Section order:**

| # | Section |
|---|---|
| 1 | Hero, headline, subhead |
| 2 | "Why you need Upsells throughout the guest journey?" |
| 3 | "Upsell throughout the guest stay" (pre-arrival, on-arrival, in-stay, checkout) |
| 4 | "Automation saves time" (the "analyzes guest data" claim) |
| 5 | "Seamless guest interaction" (email, app, text) |
| 6 | "Real-time insights" |
| 7 | "Designed for your property" (boutique hotel, vacation rental, apartment hotel) |
| 8 | "All Features" grid: Upsell Platform Features, Dynamic Revenue Growth, Seamless Integration, Personalized Offers, Unified Guest Experience, Data-Driven Insights |
| 9 | Social proof strip: "Trusted by 20000+ by hotels and vancation rentals", logos, "EXPLORE INTEGRATIONS" |
| 10 | FAQ (3 items, one duplicated verbatim) |
| 11 | Closing CTA: "Ready to build a digital guest experience?" |

**CTAs:** "SCHEDULE A CALL" (to /demo-operto/), "Schedule a call" in sticky banner "Boost Your Revenue With Operto", "EXPLORE INTEGRATIONS". No pricing CTA, no self-serve signup.

**Proof elements:** Customer logo strip and the 20,000+ count. No upsell-specific numbers, no testimonial on this page, no case study link on this page.

**Calculator, demo, lead magnet, trial:** No upsell calculator. Site has an "Operations ROI Calculator" (Teams savings, inputs nightly rate and staff wage) and an "OTA Commission Leakage Calculator" for ONE. Demo booking only. No free trial found. "Guides & Checklists" and webinars exist in the resources menu.

**Guarantee:** None found.

**Tone:** Generic, feature-list SaaS copy, light on specifics, with visible quality issues (typo "vancation", duplicated FAQ, "Trusted by 20000+ by"). Reads as an SEO page for "hotel upselling software" rather than a conversion page.

## 6. Hook, guarantee and lead magnet

| Element | Operto |
|---|---|
| Hook | "Maximize your revenue beyond guest bookings", upsells as part of one connected guest journey (access, guidebook, messaging, upsells in one app) |
| Bigger company hook in 2026 | Operto ONE: "Show up. Stand out. Get booked direct." and anti-predatory-OTA |
| Guarantee | Not found |
| Lead magnet | Operations ROI Calculator, OTA Commission Leakage Calculator, guides and checklists, webinars. None is upsell specific. |

## 7. Weaknesses and gaps

From reviews (third-party snippets, Capterra and Trustpilot):

| Weakness | Source |
|---|---|
| Guest Portal not customizable enough to show business-specific information | Capterra review snippet |
| Online registration described as inferior to other software | Capterra review snippet |
| Online check-in with ID scan not possible without extra integrations; translations need improvement | Capterra review snippet |
| Integration lag, for example codes not updating when a reservation is extended | Capterra review snippet |
| "Operto totally misrepresented their product"; "does not work in poor cell service" | Trustpilot review snippet |
| Operto reportedly does not reply to negative Trustpilot reviews | Trustpilot summary |

From missing features and positioning:

| Gap | Detail |
|---|---|
| Upsells are a side feature | 0 of 19 case studies report upsell revenue; hotel page now leads with ONE |
| AI personalization is unexplained | One sentence claim, no mechanism, no examples |
| No discount-for-prepay or pay-at-arrival model | Not found |
| No public payment, merchant of record or approval docs | Not found |
| No WhatsApp | Not found |
| No public pricing | Demo-gated; plans only via third parties |
| Bundle dependency | Value is strongest when a property also buys Access and Guest; weak as a pure upsell tool |
| VR DNA | Feature set (locks, noise, cleaning) skews to rentals; hotel upsell depth (room-type upgrade inventory, F&B, spa scheduling) not shown |

## 8. What UpLayer should copy, and where UpLayer can beat them

**Copy:**

| Idea | Why |
|---|---|
| Journey-stage framing (pre-arrival, arrival, in-stay, checkout) | Simple mental model buyers already accept |
| Event triggers from operational signals (door unlock, check-in completed) | Strong timing signal; UpLayer can use PMS status changes the same way |
| Broad PMS list split hotel vs rental | 30 PMS names is the bar to show on an integrations page |
| Calculators as lead magnets | Operto uses two; UpLayer should build one for upsells specifically |
| Per-unit pricing anchor (about USD 12 to 27 per unit per month, third-party reported) | Tells UpLayer what the market pays for a bundled guest app |

**Beat them:**

| Where | How |
|---|---|
| Real per-guest AI | Generate each offer from booking data (party size, length of stay, lead time, source channel, purpose, price paid) and show the logic; Operto only claims it |
| Payment model | Ship the prepay-at-discount vs reserve-and-pay-at-arrival choice; Operto documents neither |
| Transparency | Publish payment flow, merchant of record, approval rules and pricing |
| Upsell proof | Operto has no upsell-specific case study; UpLayer should lead with upsell revenue per booking and attach rate once it has real data (do not invent) |
| Focus | Operto sells a broad suite and now leads hotels with ONE; UpLayer can own "upsell revenue" as the single outcome |
| Landing page quality | Specific hero tied to an outcome, upsell calculator, guarantee; Operto has none of these and visible typos |
| Channels | Add WhatsApp and a dedicated per-guest offer landing page, not only a guest app tab |
| Sold standalone | Works without locks, guidebook or housekeeping modules |

## 9. Sources

All checked 1 October 2026.

| URL | Used for |
|---|---|
| https://operto.com/upselling/ | Hero, sections, features, FAQ, CTAs |
| https://operto.com/ | Product suite, home page metrics |
| https://operto.com/guest/ | Guest app features, integration counts |
| https://operto.com/guest-messaging/ | Channels, triggers, templates |
| https://operto.com/hotels/ | Hotel positioning (now Operto ONE) |
| https://operto.com/one/ | ONE features, metrics, no-percentage FAQ |
| https://operto.com/vacation-rentals/ | Unlimited in-house and third-party upsells, 100+ locks |
| https://operto.com/pricing/ | Demo router, testimonials |
| https://operto.com/integrations/ | PMS list |
| https://operto.com/case-studies/ | Case study metrics |
| https://operto.com/case-study/mountain-creek-resort-hotel/ | ADR and savings figures |
| https://operto.com/company/ | Leadership |
| https://operto.com/blog/ | Skift IDEA Awards 2026 finalist |
| https://operto.com/blog/hotel-upsell/ | 10-30% and USD 28B claims, in-app purchase |
| https://operto.com/property-operations-roi-calculator/ | Calculator lead magnet |
| https://operto.com/guest/integrations/Guesty/ | Integration page format |
| https://help-teams.operto.com/article/423-billing-owners-through-stripe | Stripe used for Teams owner billing |
| https://strhub.com/digital-guest-guide-comparisons/ | Plan prices, add-ons, feature list (third-party) |
| https://pricingnow.com/question/operto-guest-pricing/ | Estimated costs (third-party, failed to load, from search snippet) |
| https://www.hosthub.com/partners/operto-guest/ | Partner listing |
| https://hoteltechreport.com/guest-experience/hotel-guest-apps/operto-guest | Ratings (403, from search snippet) |
| https://www.trustpilot.com/review/www.operto.com | Ratings and negative review (403, from search snippet) |
| https://www.capterra.com/p/248282/Operto-Connect/ | Listing (403) |
| https://www.capterra.com/p/170587/OpertoTeams/reviews/ | Review cons (from search snippet) |
| https://www.capterra.co.za/software/1044122/operto-guest | Operto Guest listing (from search snippet) |
| https://www.crunchbase.com/organization/operto-guest-technologies | Founded, funding (from search snippet) |
| https://techcouver.com/2022/02/22/operto-guest-technologies/ | Series A |
| https://shorttermrentalz.com/news/operto-staymyway-acquisition/ | STAYmyway acquisition |
