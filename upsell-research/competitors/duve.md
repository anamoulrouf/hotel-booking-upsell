# Duve

Competitor research for the UpLayer AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

Duve is a guest experience platform founded in 2016 in Tel Aviv, Israel by Jeremy Atlan, David Mezuman and Shai Bar, former managers of a vacation rental business (About page, Hotel Tech Report). Its billing entity for marketplace payouts is Servi Smart Solutions, with Israeli and French VAT numbers (help center). Upselling is one module inside a suite: online check-in, branded guest web app, Communication Hub (WhatsApp, SMS, email, OTA messaging), DuveAI agents, mobile keys, digital menus and mobile ordering, room directory, and analytics. Upsells are only sold on the Premium plan and above. It sells to "any type or size of property, from a single independent hotel to a multi-brand group, a hostel, or a vacation rental portfolio" (pricing FAQ). Case studies lean on Accor brands (Sofitel, Pullman, Novotel, MGallery), Leonardo Hotels, The Gate Collection, SLS Barcelona, Conscious Hotels, OYO, and vacation rental operators (vendor reported). It claims 3450+ customers in 96+ countries, 150+ integrations and 3.3M+ engaged guests per month (vendor reported). Hotel Tech Report lists 52 employees.

## 2. Features

| Area | What Duve does | Source |
|---|---|---|
| Upsell types | Room upgrades (fixed "deals" and "bids"), smart early check-in and late check-out, Custom Products (spa, breakfast, bike rental, parking, pet fee, mid-stay cleaning, free services), Transportation module with dynamic quoting for airport transfers, Menu Products tied to POS, third-party Marketplace services, visitor upsells to non-guests (day use, spa, F&B, parking) via a public guest app and QR "Digital Spots". Price types include "% of accommodation" (for example insurance). | Upsell page FAQ, pricing matrix, help center |
| Channels | Pre-arrival email, online check-in flow, branded guest web app (one link, no app store, no password), WhatsApp, SMS, OTA messaging (Airbnb, Booking.com, Expedia), WeChat, QR codes, DuveAI agent sending purchase links in chat, Front Desk Upsell for staff-initiated sales (Premium plan). | Upsell page, Integrations, DuveAI page |
| Timing triggers | "A pre-arrival email a few days out, a room upgrade prompt during online check-in, browsing in the Guest App mid-stay, a scheduled message for late checkout on the last night, and a front desk agent". Flows with "Message Triggers" and "Advanced sending conditions". "Minimum time before order" cut-off per product. "Off Market Times" setup. Duve calls online check-in "The Highest-Converting Moment". | Upsell page, pricing matrix, help center |
| Personalization and AI | Rule-based visibility: standard, custom tag, selected rooms, plus layered conditions (adults, children, agent, arrival method, birthdate, booking source, custom question answers, floor, guest country, past purchases, in-house, last stay, marketing source, membership, nights, number of stays, payment status, rate plan, pre-check-in status, reservation status, room tags, VIP code, consent). DuveAI (generative AI messaging in 100+ languages) "matches a guest's request, or where they are in their stay, to a configured upsell and sends a direct purchase link", and uses reservation details, loyalty tier, booking source and stay history. It does not create offers or set prices; it picks from configured upsells. | Help center (Upsell Conditions), DuveAI page, Segmentation page |
| Payment options | Guests pay by credit card online in the app, or the charge is "Add to hotel bill" (folio), or cash. Security deposits and pre-authorization supported. Refunds by percentage, amount, or full. Room upgrade bids. No upfront discount vs pay at arrival full price option found. | Pricing matrix, help center (Duve Upsells, Balance Page, Refunding Orders) |
| Merchant of record | Not stated. Two routes: the hotel's own Stripe account ("receive the payments to your bank or Stripe account"), or where Stripe is unsupported, Duve collects and pays out to the hotel's Payoneer account 7 days after delivery date (minimum EUR 19 payout). Also integrates with hotel PSPs (Adyen, Nexi, Worldline, Planet and others). Duve auto-splits funds with external suppliers. So the hotel is MoR on the Stripe and PSP routes, and Duve holds funds on the Payoneer route (inference). | Help center (Duve Upsells, Balance Page), Integrations |
| Auto vs manual approval | Per product: "Instant Booking" (button reads "Book Now", order confirmed) or "Require Approval" (button reads "Send Request", staff approve or deny with optional explanation). Pending requests auto-expire one day after check-in (early check-in) or check-out (others). | Help center (Upsell Operations, Upsells FAQ, Expired Requests) |
| Inventory checks | Yes for room-related upsells: "Room-related upsells check live availability in your PMS before they're shown." Live availability articles for OHIP, Optima, Protel. Help FAQ notes exact dates cannot be excluded for early check-in, late checkout, custom products or upgrades. | Upsell page, help center |
| Admin panel, what a hotel configures | Enable upsells and payment settings, create products (price type, images, availability, minimum time before order, booking option, special request field), visibility filters and conditions, sort order of "Top picks for you", suppliers and their payouts, order notification emails, PMS sync mapping (folio products, transaction codes, VAT), early check-in and late checkout rules per brand, staff goals for Front Desk Upsell. | Help center |
| Analytics | Upsell orders and Manage pages with export, Balance page (earnings by payment method, payouts), upsell conversion by offer and segment, check-in adoption, response times, satisfaction, private feedback routing before public reviews. HTR reviewers ask for "Additional reporting and analytics around guest engagement and upsell performance". | Help center, Segmentation page, HTR |
| Integrations, PMS | 52 PMS and channel managers listed (counted), including Apaleo, Cloudbeds, Guestline, Guesty, Infor, Medialog, Mews, Opera and Oracle (OHIP), Optima, Protel, RMS, RoomRaccoon, Sihot, Stayntouch, Thais, Webrezpro, Clock PMS, Eviivo, Hostaway, Lodgify, Smoobu, Rentals United, MisterBooking, Mini Hotel. Payment providers (11): Adyen, BridgerPay, Credit Guard, Global Blue, Nexi, Payoneer, Pelecard, Planet, Smart Payments, Stripe, Worldline. Locks (20), task tools (8), POS (Simphony, Infrasys), tours (Bokun, Rezdy, TourCMS). | https://duve.com/integrations/ |

## 3. Pricing and model

| Item | Price | Source |
|---|---|---|
| Basic (online check-in and guest app) | Minimum package USD 120 per month | https://duve.com/pricing/ |
| Pro (Basic plus Communication Hub) | Minimum package USD 150 per month | https://duve.com/pricing/ |
| Premium (Pro plus Upsells and eCommerce) | Minimum package USD 200 per month | https://duve.com/pricing/ |
| Enterprise | "Contact us" | https://duve.com/pricing/ |
| Per-room price | Not published by Duve. Third parties: "starts at EUR 5 per room per month" and Capterra "EUR 5 per feature, per month" (third party, not confirmed) | Search snippets of SourceForge, Software Finder, Capterra |
| Add-ons with extra charges | SMS and WhatsApp messages, unique phone number, inbound messaging, security deposit collection, contactless check-in automation, staff-assisted check-in, mobile key connection, tailored onboarding | https://duve.com/pricing/ |
| Upsell commission | Contradictory on the same page: "No. On Duve Pro, hotels keep 100% of upsell revenue" vs "Commission depends on your plan and contract. On Pro and Premium plans, Duve typically doesn't charge commission on upsells fulfilled directly by the property". Marketplace (third-party supplier) products carry a service fee. | https://duve.com/customized-upsells-platform-for-hotels/ |
| Card fees | "depend on the connected payment provider" | Help center, Upsells FAQ |
| Setup fee | Not found. "Tailored onboarding" is listed as an extra-charge item. Go live "in as little as 10 days" | Pricing page |
| Free trial | Not found. "Book a demo" and a virtual tour sandbox | Pricing page, footer |
| HTR price positioning | "priced in line with the average product in the category" | Hotel Tech Report |

Model: monthly SaaS subscription with plan minimums, upsells gated to Premium, per-usage messaging add-ons, a service fee on marketplace sales.

## 4. Claims and metrics

| Claim | Label | Where |
|---|---|---|
| Properties see 8-12% upsell conversion "without chasing" | vendor reported | Upsell page |
| DuveAI adds "a 20% average lift in upsell revenue" platform-wide | vendor reported | DuveAI page |
| 3450+ customers, 96+ countries, 150+ integrations, 3.3M+ engaged guests per month | vendor reported | About |
| Go live "in as little as 10 days" | vendor reported | Pricing FAQ |
| Automated translations in up to 20 languages; DuveAI 100+ languages | vendor reported | Pricing FAQ, DuveAI page |
| Sofitel Mexico City Reforma: "ROI between 700% and 800%", case title 816% ROI | vendor reported | Pricing, Calculator, Case studies |
| Pullman Paris Tour Eiffel: over EUR 25,000 in the first month | vendor reported | Case studies |
| Sofitel Fiji: EUR 25K upsell revenue in 2 months | vendor reported | Case studies |
| Sofitel Sydney Darling Harbour: over $35K upsell in one month | vendor reported | Case studies |
| Novotel Geelong: 58% online check-in rate, room upsell revenue +200% | vendor reported | Case studies |
| Pullman Phuket Panwa: 462% ROI | vendor reported | Case studies |
| The Gate Collection: 5x app engagement, 1030% ROI | vendor reported | Case studies |
| Hotel Le Six Paris: 206% ROI; Domaine de Biar: 143% ROI | vendor reported | Case studies |
| Conscious Hotels: upsell revenue +20-25% | vendor reported | Case studies |
| ULIV: $20K monthly upsell revenue; Hotel Am Konzerthaus: EUR 6,500 upsell revenue; first results "about three days" after go-live | vendor reported | Case studies, Upsell page |
| Edgar Suites: DuveAI automates 80% of guest inquiries; HUSWELL: response times -30% | vendor reported | Case studies |
| Hotel Tech Report: Duve App 4.7 out of 5 from 643 reviews, HT Score 100, ranked 1 of 94 Hotel Guest Apps, 2 of 65 Upselling Software (359 reviews), 2 of 88 Guest Messaging, 2 of 88 Contactless Check-in | counted (third party) | Hotel Tech Report |
| Hotel Tech Awards: Best Guest App 2022, 2024, 2025, 2026; Hoteliers Choice 2024 to 2026; Best Mobile Ordering 2025, 2026 | vendor reported | Footer |
| Capterra: 16 reviews | counted (third party, search snippet) | Capterra |

## 5. Landing page teardown (https://duve.com/customized-upsells-platform-for-hotels/)

| Element | Detail |
|---|---|
| Hero headline | "Upsell Software for Hotels: Turn Every Interaction Into Revenue" |
| Subhead | "Every stage of the stay is a chance to offer something guests actually want, matched to their profile and to real-time availability in your PMS. Duve makes it automatic, so your team doesn't have to remember to ask." |
| Section order | 1. Hero with "Book a demo". 2. "Join thousands of hoteliers already experiencing the power of Duve" with three named testimonials (Hotel Am Konzerthaus, ULIV, Sofitel Sydney). 3. "The Highest-Converting Moment: Online Check-In". 4. "In-Stay and Front Desk: Revenue From Every Interaction". 5. "Visitor Upsells: Revenue From People Who Never Booked a Room". 6. "Book a demo". 7. FAQ (eight questions: PMS sync, commission twice, non-guests, automation, product types, definition, journey moments). 8. "Everything you need to exceed guest expectations" product grid (Guest App, Online Check-in, Communication, DuveAI, Upsells, Mobile Keys, Hotel Brand, Room Directory, Menus, Analytics). 9. Closing "Give your guests the experience they deserve." with "Book a demo". 10. Award badges footer. |
| CTAs | "Book a demo" (header plus three on page), "Learn more" per product, "Book a demo now" in nav |
| Proof | Three named testimonials, "thousands of hoteliers", 8-12% conversion stat, Hotel Tech Awards badges. Pricing page adds a Sofitel ROI quote. |
| Calculator, demo, lead magnet, trial | Revenue Calculator at /calculator/ (rooms, ADR, occupancy, length of stay, top-selling items, outputs monthly uplift, "Claim this revenue"), virtual tour sandbox, e-books, webinars, case studies. No free trial. |
| Guarantee | None found |
| Tone | Practical, operator-friendly, "automatic, so your team doesn't have to remember to ask", commission-free as a selling point |

## 6. Hook, guarantee and lead magnet

- Hook: upsells live where guests already are (online check-in, guest app, chat), so no extra effort for staff. "Hotels keep 100% of upsell revenue" (no commission) is positioned against commission-based tools like Oaky.
- Lead magnet: Revenue Calculator with a "Claim this revenue" CTA that leads to a demo; e-books such as "Unlocking New Revenue in Hospitality"; webinars; virtual tour sandbox.
- Speed claim: live "in as little as 10 days", first upsell results in "about three days".
- Guarantee: not found.
- Free trial: not found.

## 7. Weaknesses and gaps

| Weakness | Evidence |
|---|---|
| Upsell is a module, not the product | Upsells require Premium (USD 200 minimum per month) on top of check-in and messaging. Hotels that only want upsell revenue pay for a full suite. |
| Personalization is manual rules | Hotels configure filters and conditions by hand. HTR reviewer: "We would like to see even deeper customization options for guest segmentation and automated upsell campaigns". Another asks for "broader range of customization options for upsell campaigns". |
| AI is for messaging, not offers | DuveAI suggests existing configured upsells in chat. It does not generate offers, bundles or prices per guest. An HTR reviewer asks for "more work on the AI messaging assistant to reduce hallucinations". |
| Reporting | HTR reviewers ask for easier access to key performance metrics and more upsell analytics. |
| Sync and scale issues | HTR AI summary: "Buyers should watch for PMS/POS sync gaps, automation quirks, and scalability issues in multi-property setups." Reviewer asks for flexibility in Opera links before systems sync. |
| Complexity | HTR reviewer: "It seems bit complicated for team." Roommaster: "the breadth takes time to configure". |
| Date controls | Help FAQ: cannot exclude specific dates for early check-in, late checkout, custom products or upgrades. Smart tools always sit at the top of "Top picks" and cannot be removed. |
| Language defaults | Swiss hotel reviewer: English forced as the primary check-in language, German speakers confused. |
| Contradictory commission copy | Two FAQ answers on the same page give different commission policies. |
| No prepay incentive | No discount for paying upfront vs at arrival. Payouts on the Payoneer route are delayed 7 days after delivery. |

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:
- Per-product "Instant Booking" vs "Require Approval", with auto-expiry of stale requests.
- Layered visibility conditions (booking source, nights, party mix, rate plan, past purchases, loyalty) as the data inputs UpLayer's AI should read.
- Folio write-back with transaction code and VAT mapping per PMS, and live availability for upgrades.
- Payment via the hotel's own Stripe or PSP, plus "add to hotel bill" as the pay-at-arrival path. This maps directly to UpLayer's two payment options.
- Refunds by percent or amount, security deposits.
- The revenue calculator and "Claim this revenue" CTA.
- "Commission-free" as a pricing message, if UpLayer's model allows it.

Beat them:
- Sell upsell standalone, without forcing check-in and messaging subscriptions. Duve's upsell floor is USD 200 a month plus a full-suite rollout.
- AI that builds the offer per guest (selection, bundle, price, copy) instead of a hotel hand-writing filter rules.
- The pay-upfront discount vs pay-at-arrival choice, which Duve does not offer.
- A single-purpose, conversion-designed offer page per guest instead of a general guest app where upsells compete with house rules and menus.
- Simple setup for a revenue manager, against Duve's breadth that "takes time to configure".
- Clear, consistent commission and pricing copy.

## 9. Sources

All checked 1 October 2026.

| URL | What it gave |
|---|---|
| https://duve.com/customized-upsells-platform-for-hotels/ | Hero, sections, FAQ, commission statements, 8-12% claim |
| https://duve.com/pricing/ | Plans, minimums, feature matrix, FAQ |
| https://duve.com/integrations/ | PMS, PSP, lock and POS lists |
| https://duve.com/calculator/ | Revenue calculator, case links |
| https://duve.com/case-studies/ | Case study titles and metrics |
| https://duve.com/duve-ai/ | DuveAI upsell behaviour, 20% lift claim |
| https://duve.com/aboutus/ | Founders, customer and country counts |
| https://duve.com/hotel-analytics-and-segmentation/ | Analytics and segmentation |
| https://helpcenter.duve.com/hc/en-us/categories/7715916147613-Upsells | Upsell help category |
| https://helpcenter.duve.com/hc/en-us/articles/7805483603357-Duve-Upsells | Payments via Stripe or Payoneer, suppliers |
| https://helpcenter.duve.com/hc/en-us/articles/14390385161245-Upsells-FAQ | Approvals, date limits, card fees |
| https://helpcenter.duve.com/hc/en-us/articles/7881517237021-Upsell-Operations-Immediate-Confirmation | Instant booking |
| https://helpcenter.duve.com/hc/en-us/articles/7881531069981-Upsell-Operations-Request-Approval-Upsell | Require approval |
| https://helpcenter.duve.com/hc/en-us/articles/23060807595933-Expired-Upsell-Requests | Request expiry |
| https://helpcenter.duve.com/hc/en-us/articles/28051780546717-Upsell-Conditions | Targeting conditions |
| https://helpcenter.duve.com/hc/en-us/articles/14392169087261-Smart-Tools-FAQ | Smart tools limits |
| https://helpcenter.duve.com/hc/en-us/articles/13128004202141-Balance-Page | Payouts, Payoneer, marketplace invoicing |
| https://helpcenter.duve.com/hc/en-us/articles/9881084746909-Refunding-Orders | Refunds |
| https://helpcenter.duve.com/hc/en-us/articles/10179557765661-Price-Type-for-Upsells-Percentage-of-Accommodation | Price type, supported PMS |
| https://hoteltechreport.com/guest-experience/hotel-guest-apps/duve-app | Rating, ranks, reviews, AI summary |
| https://www.roommaster.com/blog/best-hotel-upsell-software | Third-party summary |
| https://capterra.com/p/174666/Wishbox/ | Review count and price note (search snippet only, page returned 403) |
| https://sourceforge.net/software/product/Duve/ | EUR 5 per room claim (search snippet only) |
| G2, Trustpilot | Not found. Pages returned 403 to automated access and the search budget was exhausted |
