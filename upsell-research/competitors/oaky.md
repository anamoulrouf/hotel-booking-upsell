# Oaky (Oaky by Plusgrade)

Competitor research for the UpLayer AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

Oaky B.V. is an Amsterdam company founded in 2013 (Hotel Tech Report profile) with a second office in Singapore (help center). It sells a dedicated hotel upsell suite in three products: Pre-Stay Upsell (automated pre-arrival emails plus a branded guest web app), Front Desk Upsell (an agent tool with commission tracking), and In-Stay Upsell (QR codes and in-stay messaging). The homepage positions it as "purpose-built for hotel chains", and the Hotel Tech Report survey splits show its strongest segments are mid-sized and large hotels, luxury hotels, and Europe and Asia Pacific (counted: 317 Europe reviews, 81 APAC, 29 North America, only 8 "Small" reviews). Its own referral brief describes the ideal customer as a 3, 4 or 5 star hotel with 3+ room categories, several facilities, and more than 50 rooms. Named customers include Radisson Hotel Group, Hard Rock International, Minor Hotels, Sofitel, Iberostar, ONYX Hospitality, and Amaris Hospitality (vendor reported). It claims 3000+ hotels worldwide (vendor reported). On 6 October 2025, Plusgrade (Montreal, airline and travel ancillary revenue company) acquired Oaky for an undisclosed sum. The seller was PeakSpan Capital's portfolio company Oaky B.V. Co-founder and CEO Erik Tengen became "President, Hospitality Upsell at Plusgrade". Plusgrade says it will merge both products into "a single upselling suite" over time. The product is now branded "Oaky by Plusgrade", and as of 1 October 2026 every navigation link on oaky.com (pricing, features, integrations, results, calculator) redirects to the Plusgrade acquisition announcement (counted, checked via the page source).

## 2. Features

| Area | What Oaky does | Source |
|---|---|---|
| Upsell types | Room upgrades (fixed or dynamic price, bidding optional), early check-in, late check-out, breakfast, parking, F&B, spa, packages, "100+" pre-filled and translated deal templates in a Deal Library. Vouchers listed in Hotel Tech Report's feature grid (not confirmed in Oaky docs). | Homepage, Cloudbeds marketplace, help center, Mews marketplace |
| Channels | Pre-arrival email is the core channel. Guest web app (branded, no download). QR codes and in-stay messaging. Front desk agent tool. "Offer Links" (August 2026) let a CRM such as Revinate, Akia or Ascent360 send personalised links with {r} reservation number and {g} last name merge tags. WhatsApp and chat through the HiJiffy integration. SMS: not confirmed in Oaky's own docs. Online check-in: not offered. | Help center (Offer Links, Integrations Overview), Apaleo store |
| Timing triggers | Two pre-arrival emails by default: Prearrival 1 at 12 days before arrival and Prearrival 2 at 3 days before, both editable, send time set in Amsterdam time zone. Deals have an "Available until" cut-off of 0 to 3 days before arrival. Front desk tool shows bookings up to 45 days ahead. In-stay via QR, any time. | Help center (email customization, weekly availability, FDU articles) |
| Personalization and AI | Rule-based segmentation: booking channel, stay duration, party size, rate codes (exclude), day of week, guest profile, group segments, "Recommended deals". Dynamic room upgrade pricing pulls the hotel's pricing strategy from the RMS or PMS and calculates supplements per room type, with a configurable Dynamic Pricing Floor (June 2025). Stayntouch describes the algorithm as based on "overall historical demand, current pace, and room-type demand". Marketing calls it "hyper-personalised". No generative AI or AI offer selection found in Oaky's help center or marketing. | Homepage, help center, Apaleo store, Stayntouch helpdesk |
| Payment options | Not found as an online guest payment. Help center documents deals as "requests" that, on 2-way integrations, are added to the reservation folio in the PMS as a package or product, so the guest settles at the hotel. A search of the help center for "payment", "credit" and "pre-payment" returned no guest payment article (counted). No upfront discount vs pay at arrival option found. Hotel Tech Report's generic feature grid lists "accept and pay" but Oaky's own docs do not describe it. | Help center (Apaleo 2-way, Mews 2-way, Cloudbeds), help center search |
| Merchant of record | The hotel, by inference: charges post to the hotel's PMS folio and "Oaky doesn't handle payments" (stated in the front desk commission article). | Help center |
| Auto vs manual approval | With a 2-way PMS integration, requests are auto-approved and written to the PMS ("100% pilot mode"). With 1-way, or when a 2-way post fails, requests land in the dashboard for manual approve or reject, with an email alert. On Cloudbeds, services with exclusive taxes fall back to manual approval. | Apaleo store, help center (Cloudbeds, Apaleo) |
| Inventory checks | Yes. Real-time room type availability from the PMS so guests only see available upgrades. Weekly and seasonal availability, time slots per service, and an upgrade is hidden if any night of the stay is blocked. Front desk view shows units left per room type. | Apaleo store, help center (weekly availability, FDU) |
| Admin panel, what a hotel configures | Hotel settings (currency, time zone, users, notifications, blocked guests, integrations), email versions and content per language, send day and time, excluded segments, Services and Room Upgrades deals (image, copy under 100 words, price, availability, time slots), room price matrix and floor, branding (fonts, button style, header image, sender domain), translations in 25 languages, Front Desk agents, targets and incentives, Offer Links. Chain dashboard for multi-property. | Help center (New to Oaky, pre-live check, email, FDU), homepage |
| Analytics | Hotel Performance Dashboard v2 (June 2026): total upsell revenue, revenue by product and category, approved room nights and deals, guests emailed vs imported, email send rate, open rate, login (click-through) rate, deal level performance, rejections view, period comparison, export. Chain revenue reporting and a pre-arrival report email. Front desk performance tracking per agent. | Help center (Hotel Level Performance Report), homepage |
| Integrations, PMS | Help center list: Apaleo, Host PMS, Opera Cloud 2-way (OHIP), Protel Air 2-way, Guestline 2-way, Stayntouch, Amadeus, Mews 2-way, Cloudbeds 2-way. Also Shiji Enterprise Platform 2-way and Infor HMS (help articles). Channel managers: Cubilis, SiteMinder, D-Edge, STAAH, Dingus. RMS: OTA Insight, Duetto. Ops: HotelKit, Flexkeeping (via Mews). Feedback: ReviewPro. Omni-channel: HiJiffy. | https://help.getoaky.com/en/articles/6190006-oaky-integrations-overview |
| Booking source coverage | "OTA Access: reach all guests with your upsells". Requires the hotel to whitelist Oaky domains in the Booking.com extranet or links show as "[link removed]". | Homepage, help center (Booking.com whitelisting) |

## 3. Pricing and model

| Item | Price | Source |
|---|---|---|
| Pre-Stay Upsell | 5 percent monthly commission on generated revenue | https://store.apaleo.com/apps/oaky |
| In-Stay Upsell | 5 percent monthly commission on generated revenue | https://store.apaleo.com/apps/oaky |
| Front-Desk Upsell | 5 percent monthly commission on generated revenue | https://store.apaleo.com/apps/oaky |
| Scope of the commission | "The commission only applies to room revenue (room upgrades). For all other services Oaky charges a flat fee per room." Flat fee amount: not found. | https://store.apaleo.com/apps/oaky |
| Public pricing page | Not reachable. https://www.oaky.com/pricing serves the homepage shell and its link redirects to the Plusgrade acquisition post | checked 1 October 2026 |
| Third-party estimate | "custom pricing, starting at EUR 120/month" (third party, Software Finder, not confirmed by Oaky) | https://softwarefinder.com/hotel-management/oaky-by-plusgrade |
| Third-party estimate | "pricing is available on request" (third party, Runnr.ai) | https://runnr.ai/blog/best-hotel-upsell-software-europe |
| HTR price positioning | "priced in line with the average product in the category" | Hotel Tech Report |
| Setup fee | Not found. The Apaleo connection "is generally done by the Oaky Onboarding team and there are no extra costs involved" | Help center, Apaleo 2-way |
| Free trial | Not found. Entry is "Book a demo", "Take the product tour" (interactive), and biweekly onboarding webinars | Homepage, help center |

Model: hybrid. Success commission on room upgrades, flat per-room subscription for services. Hotel pays Oaky monthly; guest money goes to the hotel through the PMS folio.

## 4. Claims and metrics

| Claim | Label | Where |
|---|---|---|
| Join 3000+ hotels worldwide | vendor reported | Homepage |
| "Rated 5 out of 5 by 500+ customers" and "5/5 by 480+ customers" on Hotel Tech Report (two different counts on the same page) | vendor reported | Homepage |
| Hotel Tech Report actual: 4.8 out of 5 from 528 reviews, HT Score 92, ranked 3 of 65 in Upselling Software | counted (third party) | Hotel Tech Report, 1 October 2026 |
| Best Upselling Software "five consecutive years" (press release), "6 years in a row" (Apaleo, Mews listings), "7 years in a row" (Cloudbeds listing) | vendor reported, inconsistent | PR Newswire, Apaleo, Mews, Cloudbeds |
| Hard Rock Hotel New York: upsell revenue +360% in 2024, ROI of 41 | vendor reported | Homepage |
| Anantara World Islands Dubai: +62.5% upsell revenue, average ROI 51 | vendor reported | Homepage |
| Clarion Hotel Sign Stockholm: +381% upsell revenue "in just a few months", EUR 47.57 average upsell revenue per guest per month | vendor reported | Homepage |
| Hard Rock International: "minimum open rate of 80-85% every month" for Oaky emails | vendor reported (customer quote) | Homepage |
| 70% of hotels generate revenue on the day of going live | vendor reported | Apaleo store |
| RevPAR contribution of 2-5% | vendor reported | Apaleo store |
| Deal conversion rate of 10.8% | vendor reported | Apaleo store |
| Save 5 minutes per request with 2-way integrations | vendor reported | Apaleo store |
| Front desk upselling boosts ancillary revenue "by 5-9 times" | vendor reported | Apaleo store, Mews marketplace |
| Grand Hotel Amrath Amsterdam: +284% upsell revenue at the front desk | vendor reported (case study title in search result, page now redirects) | oaky.com customer page title |
| Hotels with 2-way integration average EUR 3.50 upsell revenue per room per month, 1-way up to EUR 2.50 | vendor reported (Oaky blog, seen only as a search snippet, page now redirects) | oaky.com blog |
| Room upgrade EUR 30-80+ per sale vs EUR 8-20 for small extras; 2-3 upgrades a day equals EUR 2,000-3,000 a month | vendor reported (training content) | Help center |
| 100+ deal templates, 25 languages | vendor reported | Homepage |
| Plusgrade: more than 2,500 hotel and resort properties and over 275 travel and financial brands | vendor reported | PR Newswire |
| 41 employees (HTR profile), 50+ employees (Apaleo profile) | vendor reported, inconsistent | HTR, Apaleo store |

## 5. Landing page teardown (https://www.oaky.com/)

| Element | Detail |
|---|---|
| Hero headline | "Find the Revenue You're Missing with Upselling" |
| Subhead | "Oaky is the hotel upsell software purpose-built for hotel chains to maximize TRevPAR with personalized offers and effortless automation." |
| Above the hero | Star badge: "Rated 5 out of 5 by 500+ customers on HoteltechReport" |
| Section order | 1. Hero with two CTAs. 2. Interactive product tour. 3. "Hotel upsell software that actually drives revenue" (four benefits: enhance guest experience, maximize revenue, scale strategy fast, personalize offers). 4. "Why hotel chains worldwide choose Oaky" (three case cards: Hard Rock NY, Anantara World Islands, Clarion Hotel Sign) plus Book a demo. 5. "serves you at every level" role tabs: Headquarters, Revenue and Distribution, Front Desk, Operations, Marketing and Branding, each with feature tiles. 6. Logo strip: Radisson Hotel Group, Hard Rock International, Minor Hotels, Sofitel, Pillows Hotels, Iberostar Beachfront Resorts. 7. Six testimonials with names and titles. 8. "Ready to get started?" split: Chat with sales, Oaky courses. 9. "Join 3000+ hotels worldwide" with Book a demo and video, plus a live "deals taken today" counter. 10. Footer. |
| CTAs | "Book a demo" (repeated 4 times), "Take the product tour", "Chat with sales", "Oaky courses", "Watch the video", "Show all features", "Learn more" per testimonial |
| Proof | Three case studies with percentage uplift and ROI, six enterprise logos, six named testimonials (Hard Rock VP RM and Distribution, Radisson Associate Director RM, Iberostar Global Director), HTR badge, live deals counter |
| Calculator, demo, lead magnet, trial | Revenue Calculator (nav and footer), interactive product tour, video, Downloads, LowKey Podcast, Oaky Courses certification, on-demand webinars, Oaky Awards 2024, referral program. No free trial. |
| Guarantee | None found |
| Tone | Confident, enterprise, revenue-manager language (TRevPAR, RevPAR, ROI), "No.1 Upsell tool for hotels" |
| Current state | All internal links resolve to a redirect page pointing to https://www.plusgrade.com/resources/plusgrade-acquires-oaky/, so prospects cannot reach pricing, integrations or case studies from oaky.com (checked 1 October 2026) |

## 6. Hook, guarantee and lead magnet

- Hook: "Find the revenue you're missing", tied to TRevPAR, with large multi-hundred-percent case study numbers.
- Lead magnets: Revenue Calculator ("Oaky incremental revenue calculator"), Oaky Courses with certification as an "upselling expert", LowKey Podcast, downloads, webinars, a 2024 customer awards program.
- Low-risk entry: commission on room upgrades means the hotel pays more only when upgrades sell (pricing), and the Apaleo connection has no extra cost.
- Social proof loop: Hotel Tech Report award badge and a referral program that asks customers to email peers with the Customer Success Manager in CC.
- Guarantee: not found.
- Free trial: not found.

## 7. Weaknesses and gaps

| Weakness | Evidence |
|---|---|
| Acquisition uncertainty | Plusgrade plans to merge Oaky into "a single upselling suite". Hotel Technology News: "Customers will want clarity on the migration path, feature parity and pricing". Runnr.ai warns "what's being evaluated today may not be the same product in a year". |
| Marketing site is effectively dead | Every link on oaky.com redirects to the acquisition press post. No live pricing, integrations, or case study pages. |
| No guest-side payment | Deals post to the folio and are paid at the hotel. No upfront collection, no deposit, no prepay discount found. Revenue is not locked in before arrival and can be refused at check-in. |
| No real AI | Personalization is manual segment rules plus RMS-driven upgrade pricing. No AI offer selection, AI copy, or per-guest generated offer found. |
| Reporting and integration complaints | HTR AI summary: "Challenges exist with reporting systems and integration issues with existing PMS". Older HTR summary cites "frequent issues with packages, especially the breakfast package". One recent HTR review is titled "Oaky Connectivity and Customer Care Concerns Affecting Hotel Revenue" (Cancun, 500+ rooms). |
| Product stability | Help center notice (12 February 2026) on a deal management incident: deal creation bugs with translations, empty titles, pages not loading, approved requests reverting to pending. |
| Integration limits | Cloudbeds: no market codes, no guest language so all emails go in English, manual reversal not synced to PMS. Apaleo: cannot post specific dates. Mews: currency is not converted (EUR 1 in Oaky becomes USD 1 in Mews). |
| Email-only core channel | Default flow is two emails. Booking.com masks links unless the hotel whitelists domains. SMS not documented. |
| Not built for small hotels | Referral brief targets 50+ rooms and 3+ room types. Only 8 small-hotel HTR reviews (counted). |
| Inconsistent claims | "5 out of 5" badge vs actual 4.8; "5, 6, 7 years in a row" award claims across listings; 41 vs 50+ employees. |

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:
- The two-email default cadence (12 days and 3 days) as a starting template, with editable send day and time.
- A deal library of 100+ pre-written, translated offers so a hotel can go live in a day.
- Dynamic room upgrade pricing from the RMS with a hotel-set price floor.
- 2-way PMS write-back with auto-approve, and a fallback queue with email alert when the write fails.
- Hotel-level dashboard metrics: emailed vs imported, open rate, login rate, approved revenue, rejections.
- Offer Links with merge tags so a hotel's CRM can drive guests to the offer page.
- Case cards with uplift percentage, ROI multiple, and revenue per guest.

Beat them:
- Take payment on the offer page. Oaky has none. UpLayer's pay-now-at-a-discount vs reserve-and-pay-at-arrival choice locks in cash and reduces no-shows on extras. This is the clearest gap.
- Real per-guest AI offers (ranking, bundling and copy generated from the booking), against Oaky's manual segment rules.
- Channel coverage out of the box: email plus SMS, with portal and channel manager bookings included.
- Stability and focus while Oaky is mid-merger. Target Oaky customers worried about migration, pricing changes, and a dead marketing site.
- Serve the sub-50-room hotels Oaky deprioritizes.
- Note on the "triple upsell revenue" promise: Oaky already publishes +360% and +381% cases (vendor reported), so "3x" alone is not differentiated. UpLayer needs its own measured proof before using it in outbound.

## 9. Sources

All checked 1 October 2026.

| URL | What it gave |
|---|---|
| https://www.oaky.com/ | Hero, sections, case cards, logos, testimonials, CTAs |
| https://www.oaky.com/redirect.html | Shows all site links redirect to Plusgrade |
| https://www.oaky.com/pricing | Serves homepage shell, no pricing |
| https://www.plusgrade.com/resources/plusgrade-acquires-oaky/ | Acquisition announcement, 6 October 2025 |
| https://en.prnasia.com/releases/apac/plusgrade-acquires-oaky-strengthening-its-position-as-a-global-leader-in-hospitality-upselling-506102.shtml | Press release, advisors, Plusgrade footprint |
| https://hoteltechnologynews.com/2025/10/plusgrade-acquires-oaky-to-build-unified-hotel-upsell-platform/ | Acquisition analysis |
| https://www.hotelmanagement-network.com/news/plusgrade-expands-capabilities-oaky-deal/ | Acquisition coverage |
| https://store.apaleo.com/apps/oaky | Pricing (5 percent commission, flat fee), metrics, languages |
| https://www.mews.com/en/products/marketplace/oaky | Marketplace listing, metrics |
| https://www.cloudbeds.com/integrations/oakybyplusgrade/ | Marketplace listing, features |
| https://stayntouch.freshdesk.com/support/solutions/articles/24000059856-oaky-upsell-two-way-api-integration | Upgrade pricing algorithm, API usage |
| https://help.getoaky.com/en/ | Help center collections |
| https://help.getoaky.com/en/articles/6190006-oaky-integrations-overview | Integration list |
| https://help.getoaky.com/en/articles/4298793-new-to-oaky | Admin panel overview |
| https://help.getoaky.com/en/articles/2666635-how-to-customize-the-emails-per-email-part-1 | Email timing defaults |
| https://help.getoaky.com/en/articles/2666591-weekly-availability-feature | Availability rules |
| https://help.getoaky.com/en/articles/11660533-dynamic-pricing-floor | Dynamic pricing floor |
| https://help.getoaky.com/en/articles/12321681-how-is-the-earned-commission-paid | "Oaky doesn't handle payments" |
| https://help.getoaky.com/en/articles/12330297-how-does-front-desk-upselling-fdu-work-on-oaky | Front desk tool |
| https://help.getoaky.com/en/articles/3195727-cloudbeds-connection-features-limitations | Cloudbeds limitations |
| https://help.getoaky.com/en/articles/4166729-apaleo-2-way | Auto-approval, Apaleo limits |
| https://help.getoaky.com/en/articles/2997974-mews-set-up-2-way-room-upgrades | Mews setup, currency note |
| https://help.getoaky.com/en/articles/8985432-how-to-whitelist-oaky-in-the-booking-com-extranet | Booking.com link masking |
| https://help.getoaky.com/en/articles/13632035-deal-management-update-ongoing-fixes-temporary-workarounds | Product incident |
| https://help.getoaky.com/en/articles/15971604-offer-links-for-crm-guest-experience-platforms | Offer Links |
| https://help.getoaky.com/en/articles/14994889-hotel-level-performance-report-dashboard-v2 | Analytics |
| https://help.getoaky.com/en/articles/5567807-oaky-customer-referral | ICP and referral program |
| https://help.getoaky.com/en/articles/11951548-why-focusing-on-room-upgrades-drives-bigger-wins-for-you-and-your-hotel | Upgrade value figures |
| https://hoteltechreport.com/revenue-management/upselling-software/oaky-app | Rating, rank, segment splits, reviews |
| https://softwarefinder.com/hotel-management/oaky-by-plusgrade | Third-party price estimate |
| https://runnr.ai/blog/best-hotel-upsell-software-europe | Third-party summary |
| https://www.roommaster.com/blog/best-hotel-upsell-software | Third-party summary |
| Capterra, G2, Trustpilot | Not found. Pages returned 403 to automated access and the search budget was exhausted |
