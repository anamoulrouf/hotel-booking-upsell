# AeroGuest

Competitor profile for the UpLayer AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

AeroGuest is a Danish "Guest Management System" for hotels, with offices in Aarhus and Copenhagen. It sells a full guest-journey suite (online check-in and check-out, digital key, payments, pay by link, email and SMS communication, hotel directory, a CRM called Audience) built on a two-way PMS integration. Upselling is one module, called Extras, which the company announced as available "starting January 2026", so it is a recent addition to a check-in product, not a dedicated upsell engine. The FAQ names independent hotels, hotel chains, resorts, aparthotels and boutique hotels as targets, and the site has use-case pages for luxury, boutique, conference, hostels and staffless hotels. Not aimed at vacation rentals. Published customers are mostly in Denmark, plus Sweden, Iceland, the Faroe Islands and London. Hotel Tech Report lists founding year 2016, 40 employees, and operations in Denmark, UK, Sweden, Finland and UAE (third-party listing).

| Attribute | Finding |
|---|---|
| HQ | Aarhus and Copenhagen, Denmark (aeroguest.com/contact) |
| Founded | 2016 (Hotel Tech Report listing) |
| Employees | 40 (Hotel Tech Report listing) |
| Segment | Hotels, chains, resorts, aparthotels, boutique, conference, hostels, staffless hotels |
| Vacation rentals | Not targeted, not found |
| Countries with named customers | Denmark, Sweden, Iceland, Faroe Islands, UK (counted from case studies and blog) |
| Upsell module launch | "starting January 2026" (vendor reported) |

## 2. Features

### Upsell types

| Type | Source |
|---|---|
| Room upgrade | Extras page |
| Breakfast, per specific day ("Breakfast for just Tuesday") | Extras page |
| Parking ("weekend parking") | Extras page |
| Bike rental with time slot ("bike rental at 3 PM") | Extras page |
| Experiences and activities, bookable time slots | Extras page, FAQ |
| Food and beverage | FAQ |
| Early check-in or late check-out | FAQ |
| Spa and wellness | FAQ, Flow page |
| Room service listings, local recommendations | Flow page |
| Choose your room at check-in | Hotel Tech Report review mentions "choose room feature" |

### Channels

| Channel | Status |
|---|---|
| Email | Live, drag and drop editor and template library |
| SMS | Live |
| App messages (AeroGuest App and mobile web) | Live |
| In-app chat to front desk via AeroGuest Flow | Live |
| WhatsApp, Expedia, WeChat via Unified Inbox | Not live. Guest Communication page says "by Q3 2026"; Hotel FAQ says "Q1 2027". Conflicting dates on their own site |
| Hotel directory (digital in-room guide) | Live |

### Timing triggers

| Trigger | Source |
|---|---|
| Reservation status, arrival date, room type, guest preferences, booking source, stay milestones | Hotel FAQ |
| Rate code, room type, reservation comments | Guest Communication, Hotel Directory pages |
| Scheduled follow-ups, for example check-in email then SMS reminder days later | Homepage |
| Pre-arrival and in-stay ordering of Extras | Extras page |

### Personalization and AI, what it actually does

| Claim | What is actually described |
|---|---|
| "tailored pre-arrival offers" | Hotel-built menu with rule-based visibility. The one concrete example is suppression: "If breakfast is already included, it won't show up for purchase." |
| "Guests only see what's relevant to them" | Visibility rules by inclusion, adult or child pricing, time slots |
| "Spot a guest who skipped breakfast? Offer a tailored deal" | Trigger rule based on reservation data, configured by the hotel |
| "it listens, understands, and delivers the right offer at the right time" | No mechanism described. No model, no recommendation engine, no per-guest offer generation documented |
| Agentic AI, "AI Operating System for Hotels" | Positioning statement: "AeroGuest is aiming to be". Describes two-way PMS read and write as the foundation. No shipped AI upsell feature named |
| AeroGuest AI "lives inside our orchestration engine" | Philosophy page. No specific functions listed |
| Audience CRM "will come with its own AI-powered marketing assistant" | Future tense, "In Development" per blog |

Verdict: personalization today is segment and rule based (rate code, room type, what is already on the booking, booking source). No evidence of AI-generated per-guest offers, AI copy, or AI pricing. AI is roadmap and positioning.

### Payment options

| Option | Supported | Detail |
|---|---|---|
| Pay upfront before arrival | Yes | Online check-in takes "PCI-compliant payments in advance"; reviewer says "Easy for the guest to pay before arrival" |
| Pay at arrival or settle at check-out | Yes | "Pay and check-out online", outstanding charges settled before check-out, posted to PMS |
| Deposits | Yes | Charges a sum, refunded after checkout if unused |
| Pre-authorization and card on file | Yes | Card on file captured at online check-in |
| Pay by link | Yes | Staff-generated link by email, posted to PMS |
| Prepaid OTA and virtual card detection | Yes | Avoids double charging Booking.com VCC reservations |
| Discount for paying upfront on extras | Not found |
| Adult and child pricing per item, VAT per item | Yes |
| Payment methods | "+20 payment methods" on payments page, "more than 25 payment methods" in navigation (vendor reported, inconsistent), including Apple Pay, Google Pay, Swish |

### Merchant of record

Not found stated explicitly. Payments run through named PSP partners Shift4, Planet, Nexi, Adyen and Viva, and are posted to the hotel folio in the PMS. Estimate: the hotel is merchant of record via its own PSP account, AeroGuest is the integration layer.

### Auto vs manual approval

Not found. Extras with time slots suggest automated booking against slots, and items post to the PMS automatically. No documented approve or decline queue for upgrades or requests.

### Admin panel (AeroGuest Flow)

| Capability | Source |
|---|---|
| Build Extras menu, decide what shows and when, adult and child prices, allergens, VAT per item, time slots | Extras page |
| Reservation dashboard, guest digital journey status, billing activity, digital key use, activity log | Flow page |
| Chat inbox for in-app requests | Flow page |
| Custom branding: colors, images, logos, content | Flow page |
| Group bookings: contact form to collect group guest details | Flow page |
| Multi-property: templates, journey flows, upselling strategies across properties | Hotel FAQ |
| Pay by link status: attempts, expired links, completed | Pay by Link page |

### Analytics

"Usage reports" mentioned on the Flow page. No upsell revenue dashboard, conversion reporting or A/B testing found.

### Integrations

| Category | Named partners |
|---|---|
| PMS (two-way, counted 12 on integrations page) | Infor HMS, VisBook, Oracle, GODO, Spectra Systems, Apaleo, Hotsoft, Hoteltime Solution, Mews, Booking Factory, Protel Cloud, Stayntouch |
| Payments (counted 5) | Shift4, Planet, Nexi Group, Adyen, Viva |
| Other (third-party listings) | SiteMinder, SALTO, Onity, dormakaba, Sweeply, Loopon |
| Total integrations | 24 (Hotel Tech Report upsell listing), 25 (Hotel Tech Report app listing) |

## 3. Pricing and model

No public pricing on aeroguest.com. Every CTA is "Book a demo". No /pricing page found.

| Source | Price | Label |
|---|---|---|
| HotelMinder, https://www.hotelminder.com/partner=AeroGuest | "€400 to €700 per month depending on the property size. €0 integration and Onboarding Fees." | Third-party listing |
| Hotel Tech Report upsell compare, https://hoteltechreport.com/compare/aeroguest-upselling-vs-lux-pricing-luxsell | "From $200/mo", custom quote | Third-party listing |
| Hotel Tech Report check-in listing | "Below average for the category" | Third-party listing |
| Search summary, unverified secondary source | EUR 300 per month small hotels, EUR 400 medium, custom enterprise | Unverified, treat as estimate |

Model: flat monthly SaaS subscription per property, tiered by size. No revenue share or commission on upsells found.

## 4. Claims and metrics

| Claim | Label |
|---|---|
| Coco Hotel: "40% of guests are now checked in before their arrival" | Vendor reported |
| Coco Hotel GM quote: "around 50% of guests are using the mobile check-in" | Vendor reported |
| The Landmark London went "from 2 to 25 payment methods" in one month | Vendor reported |
| The Landmark London: complete guest journeys up 50%, online payment volume up 50% | Vendor reported |
| Hotel Østerport: 39% of guests check in using AeroGuest Journey | Vendor reported |
| Templeton Garden London: 50% increase in OTA online check-in after simplifying messages and moving a 15% next-stay discount into the message | Vendor reported |
| "+20 payment methods" and "more than 25 payment methods" | Vendor reported, inconsistent |
| Integrates with "all major" PMS | Vendor reported |
| Skift: "47% of hotel guests are more inclined to book" with digital DIY services | Third-party stat cited by vendor |
| Any upsell revenue, conversion or attach-rate number | Not found |
| Hotel Tech Report Journey: 4.7 of 5, 11 reviews, 94% recommend (16 hotels) | Third-party, counted by HTR |
| Hotel Tech Report Check-in: 4.7 of 5, 13 reviews, ranked #12 of 88 | Third-party |
| Hotel Tech Report Upselling: 4.4 of 5, 3 reviews, 87% recommend | Third-party |
| HotelMinder: 5.0 of 5 from 1 review (Karim Nielsen, who is also Head of AeroGuest Advisory Board per their blog) | Third-party, conflicted reviewer |

## 5. Landing page teardown (https://aeroguest.com/extras-upsell/)

**Hero headline:** "Extras & Upsell"

**Subhead:** "Drive additional revenue with tailored pre-arrival offers for extra services, giving guests exactly what they want, at the right time."

| # | Section | Content |
|---|---|---|
| 1 | Hero | Headline, subhead, product image, BOOK A DEMO |
| 2 | "Upselling without the awkward ask" | Extras lets guests add services before arrival or in-stay. Examples: Upgrade Room, Breakfast for just Tuesday, weekend parking, bike rental at 3 PM |
| 3 | "Hotels stay in the driver's seat" | Own menus, adult and child pricing, hide what is already included, allergens, VAT per item, time slots |
| 4 | "More choice for guests, more revenue for hotels" | Extras as automated service with perfect timing |
| 5 | "Ready to enter the new era of guest management?" | Demo form: first name, last name, email, company (optional), PMS (optional), consent |
| 6 | Footer and newsletter signup | |

| Element | Finding |
|---|---|
| CTAs | "BOOK A DEMO" after every section, "Book a demo" in nav and personal demo popup. Single CTA type |
| Proof | None on /extras-upsell/. The sister page /aeroguest-extras/ adds four GM testimonials (The Audo, Coco Hotel, Varbergs Kusthotell, Hotel Sanders), none about upsell revenue |
| Calculator | Not found |
| Interactive demo | Not found, live demo only |
| Lead magnet | Not found on page. Newsletter only |
| Free trial | Not found |
| Guarantee | Not found |
| Tone | Calm, operational, Scandinavian, control-focused. Sells "service with perfect timing" more than revenue. Minor typos ("Effeciency", "Powerfull", "deffinitely") |

## 6. Hook, guarantee and lead magnet

| Item | Finding |
|---|---|
| Hook | "Upselling without the awkward ask", move the sell from the front desk to pre-arrival self-service |
| Brand hook | "Efficiency in. Complexity out." and "Make time for what matters" |
| AI hook | "The AI Operating System for Hotels", stated as an aim |
| Guarantee | Not found |
| Lead magnet | Not found. Blog "Next-Gen Hotel Insights" and a newsletter act as content. A spa hotel upsell playbook exists as a blog post, ungated |
| Offer sweetener | "€0 integration and Onboarding Fees" (HotelMinder listing) |

## 7. Weaknesses and gaps

| Gap | Evidence |
|---|---|
| Upsell is new and bolt-on | Extras launched January 2026 inside a check-in product |
| No real AI personalization | All mechanisms described are hotel-set rules; AI copy is future tense or aspirational |
| No upsell ROI proof | Zero published upsell revenue or conversion metrics; all case numbers are check-in or payment adoption |
| No upfront payment discount mechanic | Not found. No pay-now-save versus pay-at-arrival choice for extras |
| No WhatsApp yet | Unified Inbox slipping, Q3 2026 on one page, Q1 2027 on another |
| Weak analytics | Only "usage reports" mentioned |
| Payment reliability complaints | HTR reviewer: "Payment solution has been acting up a bit and could be improved" |
| Implementation effort | HTR reviewer: implementation "took a lot of time" |
| Notification flexibility | HTR reviewer wants to "customize times for notices in the app and be able to send one to everyone at the same time" |
| Low review volume | 3 upsell reviews on HTR; not found on Capterra, G2 or Trustpilot |
| Geography | Nordic-heavy, limited outside Denmark and Sweden |
| Opaque pricing | Demo-only, third-party listings disagree ($200, €300 to €700) |
| Conflicted proof | HotelMinder sole review is from their advisory board head |
| Requires full suite | Upsell sits inside a check-in, key and payments platform; not sold as a standalone revenue tool |

## 8. What UpLayer should copy, and where UpLayer can beat them

| Copy | Why |
|---|---|
| Suppress what the guest already has (breakfast included, no breakfast offer) | Simple, high-trust relevance rule |
| Per-day and per-slot extras ("breakfast for just Tuesday", "bike at 3 PM") | Granular items raise attach rate |
| Adult and child pricing, VAT and allergens per item in admin | Real hotel ops requirements |
| OTA virtual card detection to avoid double charging | Critical for OTA bookings |
| Plain-text OTA message with a clear link | Their own Templeton Garden test shows rich HTML breaks in OTA channels |
| Two-way PMS posting of paid extras to the folio | Removes manual front desk work |
| "Upselling without the awkward ask" framing | Strong, guest-friendly angle |

| Beat them | How |
|---|---|
| Real AI per-guest offers | Generate each offer from booking data (party, length of stay, source, lead time, room, rate) instead of static menus |
| Pay now at a discount vs reserve and pay at arrival | A mechanic AeroGuest does not show; drives cash upfront |
| Upsell revenue analytics | Attach rate, revenue per booking, offer-level conversion, with a baseline against the hotel's prior year |
| Standalone, works with any source | Sell beside an existing check-in tool, not as a suite replacement |
| Outcome claim with proof | They publish no upsell numbers; a triple-upsell-revenue promise with a guarantee would have no direct rival here |
| Transparent pricing or performance pricing | They hide pricing; a revenue-share or public tier is a differentiator |
| WhatsApp from day one | Their unified inbox is not live |
| Interactive demo, ROI calculator | Their pages offer only "Book a demo" |

## 9. Sources

All checked 1 October 2026.

| URL | Used for |
|---|---|
| https://aeroguest.com/extras-upsell/ | Landing page teardown, features |
| https://aeroguest.com/aeroguest-extras/ | January 2026 launch, testimonials |
| https://aeroguest.com/next-gen-hotel-insights/upselling-without-the-awkward-ask/ | Extras launch note |
| https://aeroguest.com/ | Homepage, triggers, positioning |
| https://aeroguest.com/hotel-faq/ | Segments, triggers, channels, upsell types, Unified Inbox Q1 2027, AI statement |
| https://aeroguest.com/guest-communication/ | Channels, personalization claims, Unified Inbox Q3 2026 |
| https://aeroguest.com/automated-operations/ | Two-way PMS sync |
| https://aeroguest.com/agentic-ai/ | AI positioning |
| https://aeroguest.com/aeroguest-ai/ | AI philosophy |
| https://aeroguest.com/embedded-aeroguest-ai/ | AI page |
| https://aeroguest.com/crm-permissions/ | Audience CRM, future AI assistant |
| https://aeroguest.com/hotel-directory/ | Directory, triggers |
| https://aeroguest.com/aeroguest-flow/ | Admin panel |
| https://aeroguest.com/pay-by-link/ | Pay by link |
| https://aeroguest.com/remodel-guest-payments/ | Deposits, card on file, OTA VCC, payment methods |
| https://aeroguest.com/integrations-pms/ | PMS list |
| https://aeroguest.com/integrations-payment/ | PSP list |
| https://aeroguest.com/next-gen-hotel-insights/ | Blog index |
| https://aeroguest.com/next-gen-hotel-insights/aeroguest-expands-intelligent-hospitality-payments-through-strategic-partnership-with-shift4/ | Shift4 partnership |
| https://aeroguest.com/next-gen-hotel-insights/deposit-why-collecting-it-in-advance-matters/ | Deposits |
| https://aeroguest.com/next-gen-hotel-insights/better-timing-higher-revenue-a-new-playbook-for-spa-hotels/ | Spa upsell playbook |
| https://aeroguest.com/next-gen-hotel-insights/struggling-with-ota-guest-check-in/ | Templeton Garden metric |
| https://aeroguest.com/use-cases-hotels/ | Customer list and countries |
| https://aeroguest.com/use-cases/coco-hotel/ | Coco Hotel metric |
| https://aeroguest.com/use-cases/excellence-hotels/ | Landmark London, Hotel Østerport metrics |
| https://aeroguest.com/use-cases/savoy-hotel-copenhagen/ | Skift stat |
| https://aeroguest.com/use-cases/munkebjerg-hotel/ | Customer detail |
| https://aeroguest.com/contact/ | HQ locations |
| https://hoteltechreport.com/compare/aeroguest-upselling-vs-lux-pricing-luxsell | Upsell rating, "From $200/mo" |
| https://hoteltechreport.com/guest-experience/hotel-apps/aeroguest-app | Rating, company facts, critical reviews |
| https://hoteltechreport.com/guest-experience/contactless-checkin/aeroguest-checkin | Rating, ranking, critical reviews |
| https://www.hotelminder.com/partner=AeroGuest | €400 to €700 per month pricing |
| Capterra, G2, Trustpilot searches | No AeroGuest listing found |
