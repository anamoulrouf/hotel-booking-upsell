# Hotelbuddy

Competitor teardown for the UpLayer AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

HotelBuddy (HotelBuddy Technology OÜ, registry code 16202409, Tallinn, Estonia, founded 2021 per its About page, 2020 per Hotel Tech Report) is a web-based, no-download guest self-service app: online check-in and check-out, room upgrades, extra service sales, minibar, chat and AI chat, mobile keys (including its own IoT door-lock retrofit modules), QR kiosk, TV casting and a communication suite. Upselling is one module inside a check-in-led guest journey suite, not a standalone product. It sells to independent hotels and small groups, mostly 50 to 199 room city, spa and boutique properties (Hotel Tech Report reviewers are 50-74, 75-99 and 100-199 room hotels, counted), plus a free "Lite" tier for guesthouses and small properties with no PMS. It also pitches a white-label app to Accor properties and hotel groups. Customers named on its site are in Estonia, Latvia, Lithuania and Finland (Grand Poet Riga, Lydia Tartu, Jurmala Spa, Nordic Hotel Forum, Hestia, Kultaranta Resort, Centennial Tallinn). The site is in English and Italian, and it lists Payfast and CallPay (South African PSPs), which hints at a reseller presence there, but no named hotels outside the Baltics and Finland were found. Small company: Hotel Tech Report says 10 employees (vendor profile); Inforegister forecasts 2026 turnover of €149,995 (third-party estimate). It has received Estonian public grants of €270,645, €291,402.63 and €149,800 (vendor reported).

## 2. Features

| Area | What HotelBuddy does | Source |
| --- | --- | --- |
| Upsell vs cross-sell | Upsell: room category upgrades shown during online check-in, plus "last-minute room category upselling", and package upgrades (for example suite plus romantic setup). Cross-sell: extra services such as early check-in, late check-out, breakfast, spa, parking, transfers, tours, wine, slippers and bathrobes, minibar, gift cards and virtual services via a webshop that also sells to non-guests. Tours via Viator "Explore the area". | /upselling, PMS walkthrough post, webshop post, /packages |
| Channels | Email (branded pre-arrival invitation with tokenized link), SMS (add-on on every tier, sent from the hotel's own number since 15 June, year not stated), web guest app (no download), online check-in, QR codes in rooms, QR kiosk, in-app chat and AI chat. WhatsApp: "Coming Soon" on the Communication Suite page, so not live. No native app. | /communication-suite, product update posts |
| Timing triggers | Invitation sent X days before arrival, hotel-configurable ("e.g., 2 days before arrival"). Upgrades shown inside the online check-in flow (step 2 of 4). In-stay ordering via guest app. Communication Suite triggers on booking created, check-in, check-out, plus one-off segment campaigns. Notifications for "room is ready" and "check-out available". | PMS walkthrough post, /communication-suite |
| Personalization and AI | Rules-based, not AI-generated offers. Automation rules read rate code, reservation notes, and (Opera OHIP) market code, source code, reservation type, travel agent ID to: send or skip invitations, mark prepaid, allow or block room upgrades (example: no suite upgrade for CORP rate with "PET" in notes). Language auto-detected from PMS nationality or language field. Segmenting by status, room type, channel, length of stay in the Communication Suite. The only AI is "AI Chat", trained on hotel data, which answers questions and "proactively prompts upsells". Every guest sees the same catalog of extras; no per-guest offer generation, no dynamic pricing found. Hotel must write its own translations ("We do not automatically translate your content"). | automation rules post, Lite setup guide, /guestchat |
| Payment options | Prepay or authorize deposit during check-in step 4; skipped for prepaid bookings by rule. Per extra: auto-confirm, require prepayment, or post to PMS folio on confirmation or at service time (pre-arrival posting depends on PMS). Pricing per item, per person, per hour or per night. 7-day cancellation period per item. Pay-at-checkout via folio pre-view. No "pay now at a discount vs pay later at full price" option found. | product update posts, PMS walkthrough post |
| Merchant of record | The hotel. HotelBuddy "does not handle, process, or receive any card details"; payment request goes to the hotel's PSP (Stripe, Everypay, Payfast, CallPay) and the payment is posted to the PMS folio. Exception: Lite webshop takes a 5% commission on sales, the mechanism (whether HotelBuddy collects funds) was not found. | PMS walkthrough post, /packages |
| Auto vs manual approval | Per service toggle. "Autoconfirm" on: guest gets instant confirmation, staff notified. Off: staff gets email, must confirm, guest gets "forwarded to hotel" then confirmed or declined email. Upgrades write directly to the PMS (category changed, old room released, fee added). | PMS walkthrough post |
| Inventory checks | Upgrade step is skipped or hidden if no higher-category availability in the PMS, checked in real time. Remaining-room counter ("5 rooms remaining!") was removed. Extras: hotel sets quantity limits and availability times; webshop has resource management (spa therapists, seminar rooms) and "real-time availability". | product update posts, webshop post |
| Admin panel, what a hotel configures | Settings for guest emails, guest info fields, arrival info, documents, PMS value mapping, guest journey steps, automation rules, extra services (drag and drop, copy, edit, price type, payment mode, cancellation), room upgrade categories with pictures, descriptions and prices, excluded segments, top nationalities, SMS on/off, users and roles (Admin, Manager), MFA. Front desk dashboard with guest list and guest profiles. Field mapping is done by HotelBuddy during onboarding; account managers "audit your automation setup". | Lite setup guide, product update posts, /packages |
| Analytics | "Performance & usage reports" in Professional and Enterprise. Dashboard shows extra service and upsell revenue, reception work time saved, mobile key door openings (per Grand Poet GM). A 2025 grant funds a "data-driven reporting prototype", so reporting is still being built. No A/B testing, attribution or conversion funnel analytics found. | /packages, Grand Poet case study, home page |
| Integrations | PMS (2-way): Oracle Opera Cloud, Oracle Suite8, Oracle Opera 5.6 (validated, also Fidelio per case study), Mews, Infor HMS, HotelTime, Hotsoft. 7 named, counted. Locks: Weblock, Assa Abloy Tesa, plus own IoT modules. Network: RUCKUS. Payments: Stripe, Everypay, Payfast, CallPay. Chat infra: Stream. Tours: Viator. Estonian police TURS registration (in development). No channel manager or booking engine integration found; Lite has no PMS integration. | /partners, PMS walkthrough post, /llms, home page |

## 3. Pricing and model

The pricing page (https://www.hotelbuddy.eu/packages, checked 1 October 2026) renders three different price grids in its HTML, likely old and new tabs. All are listed, vendor reported.

| Tier | Grid A (first shown) | Grid B | Grid C | Includes upselling? |
| --- | --- | --- | --- | --- |
| Starter / Lite (free) | Lite: Free, "Get started in 10 minutes", webshop at 5% commission on sales | Lite: Free, no PMS integration | Starter: Free | Webshop and extra service sales only, as add-on. No room upgrades. |
| Lite (paid) | n/a | n/a | 3 EUR/room/month, min 20 EUR/month | Webshop, extra services add-on |
| Professional | Ask for quote, depending on modules, minimum 190 EUR/month | €5,99/room/month | 6 EUR/room/month, min 120 EUR/month | Yes: room upselling, extra services, minibar |
| Enterprise | Ask for quote, for hotel groups | Ask for quote | Ask for quote | Yes, plus white label |

Other pricing facts:
- "HotelBuddy starts at €6.00 per room/month, with no setup fees" (https://www.hotelbuddy.eu/online-check-in, vendor reported).
- "Starting at just €6 per room per month" (https://www.hotelbuddy.eu/guest-app, vendor reported).
- Add-ons priced separately, prices not found: SMS, mobile key and IoT lock modules, QR kiosk, AI chat, TV casting, housekeeping, premium support, white label.
- Model: per-room monthly subscription. No commission on upsell revenue in Professional. Commission (5%) only on the free Lite webshop.
- Free trial: "Start Free Trial" buttons on home and ROI pages link to a Calendly discovery call, so no self-serve trial of the PMS-integrated product. The free Lite tier is the de facto trial.
- Hotel Tech Report: "priced in line with the average product in the category" on the guest app listing, "Pricing Available By Request" on the mobile key listing.
- Estimate: a 100 room hotel on Professional would pay about 600 EUR/month (6 x 100) before add-ons.

## 4. Claims and metrics

All vendor reported unless marked otherwise.

| Claim | Where |
| --- | --- |
| 25% increase in upsell revenue | Home page stat block |
| 60% registration cards filled online | Home page |
| 50% shorter check-in queues | Home page, /online-check-in |
| 1200+ working hours saved annually | Home page |
| Typically 20-30% increase in ancillary revenue | /upselling FAQ |
| €500 to €10,000 per month extra revenue, depending on property | /upselling FAQ |
| Grand Poet Hotel (168 rooms, 5-star, Riga): upsell revenue through HotelBuddy up 62% in 2024 vs 2023 | /upselling, Grand Poet case study |
| Grand Poet: 5-10 guests per day skip reception | Grand Poet case study |
| Grand Poet: setup took 4-6 months depending on PMS and locks; first contact September 2021, live in 6-8 months | Grand Poet case study |
| Lydia Hotel: nearly €10,000 in room upgrades and extra service sales, March to November 2025 | /upselling, Lydia case study |
| 58% of guests save personal data online, 32% complete full online check-in including upsells and payment (one hotel testimonial) | /online-check-in |
| 50-60% of invited guests complete at least the registration step | PMS walkthrough post |
| On average 60% of invited guests check in online | /benefits, /accor |
| Check-in takes 2-3 minutes for the guest | /benefits |
| Up to 50% less front desk workload during busy hours | /online-check-in |
| Up to 30% operational cost reduction | /benefits |
| Go live in 2 weeks | Home page, /accor (contradicts the 4-6 month case study) |
| Lite set up in about 10 minutes | /packages, Lite setup guide |
| Hotel Tech Report: 4.9/5 overall, ease of use 5.0, support 4.7-4.8, ROI 4.5-4.6, implementation 4.8; 5 reviews on the guest app listing, 6 on the mobile key listing (counted, third-party platform) | Hotel Tech Report |
| Third-party stats quoted as their own selling points: 70% of guests would use a digital solution, 74% prefer digital alternatives, 81% plan sustainable stays, 79% of Tripadvisor users prefer higher rated hotels, pre-arrival emails 7-10 days out get 48% CTR and 10.6% conversion | /benefits, /guest-app, hotel upselling post (sources not cited) |

## 5. Landing page teardown (https://www.hotelbuddy.eu/upselling)

- Hero headline, word for word: "Increase Revenue with Room Upsells & Extra Service Sales"
- Subhead, word for word: "HotelBuddy's upsell and extra service modules are designed to help hotels boost revenue by offering real-time room upgrades and personalized extra services. By leveraging guest data and timing offers strategically, you can create meaningful value for your guests while increasing your bottom line."
- Section order:
  1. Hero
  2. "Benefits of Automatic Upselling": Increased Revenue, Enhanced Guest Experience, Automation & Ease (three image cards)
  3. "What Guests Say" (intro text about digital keys, guest testimonials not rendered in text)
  4. "What Hoteliers Say": four quotes (Maris Alnis GM Grand Poet with the 62% number, Diana Timberg GM Lydia with nearly €10,000, Ineta Kalpina Jurmala Spa, Ilze Falaļejeva Grand Poet)
  5. Guest app screenshot
  6. "How Upselling Works": Pre-Arrival Offers, In-Stay Opportunities, Real-Time Updates
  7. "Get Started with Upselling" (short paragraph)
  8. FAQ (about 10 SEO-style items, including the 20-30% and €500-€10,000 claims and a list of extras to sell)
  9. "Ready to boost your hotel revenue? Discover how easy it is to get started." CTA band
  10. "More About Upselling" blog feed, footer with grant disclosures
- CTAs: "BOOK A DEMO" in nav (Calendly 30 min discovery call), "BOOK A CALL" (Calendly, marketing director). Same CTA repeated, no pricing link in body, no self-serve signup.
- Proof: four named hotelier testimonials with photos and titles, two hard numbers (62%, nearly €10,000). No logo bar on this page (home page has a "Trusted By" section). No third-party badges on the page.
- Calculator: none on this page. A separate /roi-calculator page exists, but it only models time saved on online check-in, not upsell revenue, and it still shows Wix template filler text ("This is your Client description...") six times (counted).
- Demo: Calendly call only. No video on the upsell page (home page has a product video).
- Lead magnet: none on this page. Blog link to an article on writing extra service descriptions. Monthly newsletter in footer.
- Free trial: not on this page. Home page has "Start Free Trial" which actually opens a discovery call, and "Start for free with Lite!".
- Guarantee: none found.
- Tone: plain, operational, hotelier-to-hotelier, generic SEO copy ("Delight your guests with tailored recommendations"). Positioned as "no front desk pressure" and "non-intrusive" upselling. Light on mechanics, no screenshots of the admin side.

## 6. Hook, guarantee and lead magnet

| Lever | What they use |
| --- | --- |
| Primary hook | Free Lite tier: digital guest directory plus webshop, "Get started in 10 minutes", "zero investment", 5% commission on webshop sales. Land with no PMS integration, upsell to Professional. |
| Secondary hook | "Book a free strategy call" and "Start Free Trial" (both Calendly). "Go live in 2 weeks". "No setup fees". |
| Price anchor | "Starting at just €6 per room per month", "cost-effective alternative to developing custom solutions" and "Developing a mobile app from scratch can cost tens or even hundreds of thousands of euros" (/accor). |
| Guarantee | Not found. |
| Lead magnet | Not found beyond blog posts, newsletter, a product deck page and a Canva template for on-site signage (mentioned in setup post). An ROI calculator exists but is about check-in time saved. |
| Other | In-person, founder-led sales in the Baltics ("they provided an in-person approach", Grand Poet GM). Estonian events "Work smart not hard" in Riga, Tallinn, Helsinki. A "BUDDY token" crypto community promo on the home page. |

## 7. Weaknesses and gaps

From reviews and case studies (quoted):

- Hotel Tech Report has only 5 guest app reviews and 6 mobile key reviews, all 5 stars, all from Estonia, Latvia and Lithuania (counted). No critical reviews found. HTR flags: "HotelBuddy has 0 reviews from United States" and "This vendor is missing critical support info".
- Capterra, G2, Trustpilot, GetApp: no HotelBuddy listing found. A different Indian product also uses the name HotelBuddy (hotelbuddy.online), which muddies search.
- Missing guest emails kill reach: "We do not have everyone's email address before their arrival due to third-party reservations, so many guests do not know that they could both check in and check out on their mobile" (Ilze Falalejeva, Grand Poet case study). Their own setup guide admits OTA bookings "can arrive at the hotel without a guest email or phone number, making it impossible to send pre-arrival communication" and tells hotels to whitelist HotelBuddy in the Booking.com extranet or links get blocked.
- Slow, heavy implementation for the integrated product: "setup takes just 4-6 months depending on your PMS and door locks" (Grand Poet GM), against a "Go live in 2 weeks" homepage claim.
- Adoption depends on the hotel pushing it: their optimization post asks hotels to rewrite emails, add 6-8 extras, print A4 signs and train front desk to "Mention HotelBuddy at check-in".
- Usage skews to locals: "Estonian travellers are the most active users of HotelBuddy" (Lydia Hotel case study).

From missing features:

- Upsell is a step inside online check-in, so a guest who skips check-in never sees the offer. Only 32% complete the full flow at one hotel (vendor reported).
- No AI-generated or per-guest offers. Personalization is rules and exclusions on PMS fields. Everyone sees the same extras list.
- No pay-upfront discount vs pay-at-arrival choice. Prepay is a policy toggle, not a conversion lever.
- No dynamic or bid-based upgrade pricing found.
- WhatsApp not live ("Coming Soon"), SMS is a paid add-on everywhere.
- 7 PMS integrations only (counted), Opera-heavy. No Cloudbeds, Apaleo, Protel, Stayntouch, SiteMinder or channel manager entry point found.
- Hotel writes every translation manually.
- Analytics are basic usage reports; reporting prototype still being built with grant money.
- Upsell revenue claims are small in absolute terms (nearly €10,000 over nine months at Lydia, vendor reported).
- Website quality issues: three conflicting price grids, template filler text on the ROI page, a wrong description on the home page "Extra services" tile (copy of the chat description), a crypto token promo next to enterprise sales.

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:

| Idea | Why |
| --- | --- |
| Rules engine on rate code, notes, source and market code (prepaid detection, upgrade exclusions such as pets or corporate) | Hoteliers praise it (Hestia revenue manager testimonial). UpLayer needs the same guardrails under the AI. |
| Per-service approval mode (autoconfirm vs staff confirm) and post-to-folio timing | Practical control hotels expect. |
| Upgrade hidden when PMS shows no higher-category availability | Cheap inventory safety, avoids overselling. |
| Price per item, per person, per hour, per night | Covers parking, spa, breakfast cleanly. |
| Free no-integration tier as a land motion | Low-friction entry for small hotels, upgrade path to integrated product. |
| Hotel stays merchant of record via its own PSP | Simpler compliance, faster sales cycle with finance teams. |
| Named GM testimonials with euro numbers on the upsell page | Their strongest proof element. |

Beat them:

| Gap | UpLayer angle |
| --- | --- |
| Offers are generic and hidden inside check-in | Standalone pre-arrival offer email and SMS with a dedicated, per-guest landing page, so the guest does not have to start check-in to see it. |
| No AI personalization of the offer | AI picks the 2-3 offers and writes copy per guest from booking data (party size, length of stay, purpose, source, arrival time, language). Auto-translation. |
| No pay-now discount | Two-option checkout (pay now at a discount, or reserve and pay at arrival at full price) as a conversion lever. They have nothing like it. |
| OTA guests without email are unreachable | Ingest from channel manager and portals, not only PMS, and support SMS and WhatsApp from day one. |
| Small revenue proof, no guarantee | Lead with a revenue-share or performance guarantee and an upsell revenue calculator, both absent here. |
| 4-6 month integrations, 7 PMS | Faster onboarding through broader connectors, and a no-PMS mode that still personalizes. |
| Basic analytics | Per-offer conversion, revenue per arrival, A/B tests and attribution in the admin panel. |
| Regional, small team (about 10 staff, about €150k forecast turnover, estimate) | UpLayer can out-market them outside the Baltics with ease, they have almost no presence in the US, UK, DACH or Southern Europe review ecosystems. |

## 9. Sources

All checked 1 October 2026.

| URL | Used for |
| --- | --- |
| https://www.hotelbuddy.eu/upselling | Hero, sections, FAQ claims, testimonials |
| https://www.hotelbuddy.eu/ | Home page claims, CTAs, grants, tiles |
| https://www.hotelbuddy.eu/packages | Pricing grids, feature list |
| https://www.hotelbuddy.eu/roi-calculator | ROI calculator scope, filler text |
| https://www.hotelbuddy.eu/partners | Integrations |
| https://www.hotelbuddy.eu/llms | PMS list, positioning |
| https://www.hotelbuddy.eu/benefits | Claims |
| https://www.hotelbuddy.eu/aboutus | Founders, founding year |
| https://www.hotelbuddy.eu/online-check-in | €6 per room, no setup fees, 58% and 32% testimonial |
| https://www.hotelbuddy.eu/guest-app | Pricing, third-party stats |
| https://www.hotelbuddy.eu/communication-suite | Triggers, segments, WhatsApp coming soon |
| https://www.hotelbuddy.eu/guestchat | AI Chat |
| https://www.hotelbuddy.eu/hotelbuddy-lite | Free tier |
| https://www.hotelbuddy.eu/accor | White label pitch, Opera Cloud |
| https://www.hotelbuddy.eu/mews | Mews integration, email or SMS link |
| https://www.hotelbuddy.eu/white-label | White label |
| https://www.hotelbuddy.eu/online-check-out | Check-out |
| https://www.hotelbuddy.eu/sitemap.xml | Page discovery |
| https://www.hotelbuddy.eu/post/a-complete-walkthrough-of-how-hotelbuddy-connects-with-your-pms-and-automates-the-entire-guest-journ | Check-in steps, upgrade logic, approvals, payments, PMS list |
| https://www.hotelbuddy.eu/post/product-updates-new-customization-and-automation-features | Automation rules, PSPs, SMS sender, upgrade availability |
| https://www.hotelbuddy.eu/post/product-updates-more-flexibility-and-personalization | Pricing units, payment modes, SMS toggle |
| https://www.hotelbuddy.eu/post/from-setup-to-upselling-optimize-hotelbuddy-to-boost-usage-and-revenue | Language detection, Booking.com whitelist, adoption tips |
| https://www.hotelbuddy.eu/post/hotelbuddy-lite-setup-guide | Admin panel, roles, manual translation |
| https://www.hotelbuddy.eu/post/hotelbuddy-webshop-unlocking-seamless-service-management-and-revenue-growth | Webshop, gift cards, resources |
| https://www.hotelbuddy.eu/post/case-study-how-the-5-star-grand-poet-hotel-enhanced-guest-experience-and-revenue-with-hotelbuddy | 62% claim, 4-6 month setup, email gap quote |
| https://www.hotelbuddy.eu/post/case-study-lydia-hotel-s-journey-with-hotelbuddy-digital-efficiency-meets-boutique-hospitality | Nearly €10,000 claim, Estonian usage |
| https://www.hotelbuddy.eu/post/case-study-cru-hotel-shows-how-smart-tech-helps-boutique-hotels-operate-efficiently-on-a-small-team | Case study context |
| https://www.hotelbuddy.eu/post/hotel-upselling | Third-party stats |
| https://www.hotelbuddy.eu/post/how-independent-hotels-can-use-ai-to-boost-guest-experience-and-efficiency | AI positioning |
| https://www.hotelbuddy.eu/post/hotelbuddy-guest-journey-all-steps-explained | Grant amounts |
| https://hoteltechreport.com/guest-experience/hotel-guest-apps/hotelbuddy | Reviews, ratings, size |
| https://hoteltechreport.com/guest-experience/mobile-key-hotel/hotelbuddy-mobile-key | Reviews, ratings |
| https://getstream.io/blog/hotel-chat-experience/ | Chat infrastructure |
| https://www.inforegister.ee/en/16202409-HOTELBUDDY-TECHNOLOGY-OU/ | Registry, turnover forecast |
| Web searches for HotelBuddy on Capterra, G2, Trustpilot | No listings found |
