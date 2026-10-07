# HiJiffy, competitor profile

Checked 1 October 2026. The brief URL `https://www.hijiffy.com/hotel-upselling-softwareb` returns HTTP 404. This profile uses `https://www.hijiffy.com/hotel-upselling-software`.

## 1. What it is

HiJiffy is a Portuguese guest communications platform (founded 2016, proprietary AI engine called Aplysia) that sells an AI chatbot, omnichannel inbox, WhatsApp campaigns and a "Virtual Concierge" to hotels. Upselling is a module inside that communications hub, not the core product. The homepage now positions it as "The Guest Communications Platform for Hotel Groups", and Hotel Tech Report shows its heaviest users are large hotels (100 to 499 rooms), boutique hotels and resorts, plus hostels and glamping. Vacation rentals are not a stated focus. Country footprint per Hotel Tech Report reviews: Portugal (83 reviewers), Spain (39), UK (19), France (17), United States (15) (counted, from HTR). HiJiffy claims 2,100+ hotels in 50+ countries on its case study page and 2,600+ hotels on its homepage (both vendor reported, the two pages disagree).

## 2. Features

### Upsell types

| Type | Where stated |
|---|---|
| Room upgrades "catered to their preferences" | Upselling page, pre-stay section |
| Airport transfers | Upselling page |
| Early check-in | Upselling page |
| Spa treatments, gourmet menus, activities | Upselling page, in-stay section |
| Late check-out, rebooking discounts, loyalty sign-ups | Upselling page, check-out section |
| Breakfast, parking, champagne, in-room extras (pulled from Mews) | Mews integration page |
| Products and services in a custom "Upsell" marketplace (CMS) | Hotel Tech Report feature list ("Purchase Links", "Upsell Marketplace") |

### Channels

| Channel | Available | Notes |
|---|---|---|
| WhatsApp | Yes | Primary upsell channel. Campaigns sit in the Premium tier |
| SMS | Yes | Premium tier. "Fallback from WhatsApp to SMS (US-numbers only)" |
| Email | Yes | Premium tier, "Management of Email Conversations" |
| Web chat widget | Yes | All tiers |
| Facebook, Instagram, Telegram | Yes | Pro tier and up |
| OTA messaging (Booking.com, Expedia) | Yes | Homepage and HTR integration list |
| Voice | Yes | Pro tier lists "Voice & Text" |
| Native guest app | Not found. Web based concierge only |

### Timing triggers

Rules based on PMS events, launched April 2024 as "hyper-personalised guest messaging based on real-time PMS updates". Triggers named: booking completion, check-in, check-out, digital check-in completed, digital check-out completed. Example flows: digital check-in push the day before arrival, dinner offer at check-in, checkout reminder the night before departure, express checkout offer, review request post checkout. Premium plan includes "4 campaigns included per reservation" (vendor reported) from a list of 10 campaign types (welcome, digital check-in, loyalty promo, upsell and cross-sell, surveys, check-out, reviews, thank you, loyalty updates, promotional).

### Personalization and AI, what it actually does

| Claim | What the evidence shows |
|---|---|
| "AI-powered hotel upselling" | The AI is the conversational chatbot (Aplysia, generative AI on Pro and up, 132 languages, sentiment analysis, "self-learning"). It answers questions and can surface add-ons in chat |
| "Personalised upselling campaigns" | Timing comes from PMS event triggers. The upselling page FAQ says "segmentation can be used to personalise further. The system uses guest data from PMS to determine the best pitching offer." This is segment and rule logic, not per-guest generated offers |
| "Hyper-personalised" messaging (2024 launch) | Event triggers from PMS (Mews, Cloudbeds, Apaleo). No mention of models choosing offers, pricing or copy per guest |
| Room upgrades "catered to their preferences" | No mechanism described. Not found |
| Upgrade bidding | Only via partner UpsellGuru ("personalized proposals using a bidding system"), not native |

Verdict: real AI is in the conversation layer. Offer selection and personalization are segment and trigger rules. No evidence of per-guest AI offer generation, dynamic pricing or AI-written landing pages.

### Payment options

| Option | Status |
|---|---|
| Charge to folio (pay at hotel) | Yes. Mews: "the order is created and processed in Mews automatically, updating their bill and reservation instantly". HTR feature list: "Charge to Folio" |
| Pay upfront online before arrival | Implied by "Purchase Links" to the Upsell marketplace and the integrations page category "Payment and Financing Gateways ... collect real-time deposits". Gateway names not found |
| Deposits | Payment gateway category mentions "real-time deposits", details not found |
| Discount for paying upfront | Not found |
| Upgrade bidding | Only via UpsellGuru partner |

### Merchant of record

Not found. Evidence points to the hotel (charges posted to the hotel PMS folio, or the hotel's own gateway). No sign HiJiffy collects funds itself.

### Auto vs manual approval

Mews flow is automatic, "no manual steps required from staff". HTR lists "Upsell Fulfillment Tracking" with a fulfilment dashboard that updates status once fulfilled. A separate hotel approve or decline step was not found.

### Admin panel

"Console" (console.hijiffy.com): omnichannel inbox, filter, assign and note conversations, canned responses, translation, contact pages, Campaigns Manager for WhatsApp campaigns, upsell marketplace CMS, guest requests and tickets per team, fulfilment dashboard. One HTR reviewer: "There is no preview of the campaign which was setup".

### Analytics

Basic reporting on Basic, "Advanced Reporting & Dashboards" and CSAT on Pro and up. Upsell specific revenue attribution dashboards not found. Cloudbeds page mentions "advanced revenue tracking".

### Integrations

Claimed counts: "80+ Integrations" (integrations page), "100+ integrations" (homepage), "60+ integrations" (integrations FAQ), all vendor reported and inconsistent.

| Category | Named partners found |
|---|---|
| PMS | Mews, Cloudbeds, Apaleo, Planet (formerly Protel), Guestline, Medialog, Oracle (listing on Oracle Cloud Marketplace) |
| Booking engine | D-EDGE, Cloudbeds, Mews, Guestline, BookOnlineNow |
| CRM | Cendyn CRM |
| Upsell partners | Oaky (since June 2022), UpsellGuru |
| OTAs | Booking.com, Expedia |
| Other named | Acigrup, allora.ai, Angelfish, Bikube, Bowo |
| Categories without names found | Payment gateways, mobile keys, maintenance, reputation, digital check-in |

## 3. Pricing and model

Source: https://www.hijiffy.com/pricing. "Special progressive rates are offered based on the number of rooms/beds." Prices shown are "Starting at", per month, with a yearly vs monthly toggle (which toggle the shown figures belong to was not confirmed).

| Plan | EUR | USD | GBP | Setup fee (per 5 properties) | Upsell relevance |
|---|---|---|---|---|---|
| Basic | 99/month | 109/month | 99/month | 99 EUR, 109 USD, 99 GBP | FAQ bot only, website channel, 25 FAQ topics, 3 languages |
| Pro (most popular) | 159/month | 179/month | 159/month | 399 EUR, 449 USD, 399 GBP | Generative AI chatbot, social channels, webchat pop-up campaigns |
| Premium | 319/month | 359/month | 319/month | 599 EUR, 699 USD, 599 GBP | WhatsApp, SMS, email, PMS integration, 4 automated campaigns per reservation incl. upsell |
| Enterprise | Custom | Custom | Custom | Custom | Not detailed |

Add-ons listed under Premium with no price shown: Check-in, Upsell, Digital Keys, Reviews. So the full upsell marketplace is a paid add-on on top of the 319 EUR tier. WhatsApp message costs, contract length, commission or transaction fees: not found. Capterra India lists "Starting at €149.90/month" with a free trial (third party listing, likely outdated). HiJiffy's own site offers a demo, not a free trial. Model: SaaS subscription by room count plus setup, no revenue share found.

## 4. Claims and metrics

All vendor reported unless noted.

| Metric | Source page |
|---|---|
| WhatsApp campaign open rates "exceeding 80%" | Upselling page, homepage |
| 92% CSAT | Upselling page |
| 60% online check-ins | Upselling page |
| 5% direct booking conversion via chatbot | Upselling page |
| 70% reduction of incoming calls | Upselling page |
| AI "handles up to 90% of guest conversations automatically" | Homepage |
| Answers "over 85% of guest enquiries", trained "6+ years" | Digital concierge page |
| 200+ hospitality FAQ topics, 250+ campaign ideas | Upselling page |
| 2,100+ hotels, 50+ countries | Case studies, upselling page |
| 2,600+ hotels | Homepage |
| 1,400 hotels in 30 countries (June 2022) | Oaky press release on HTR |
| Aplysia approx. 3 million conversations, $43.37M+ in bookings | Third party summary via search, not verified on HiJiffy site |
| Sweet Accommodations: 20% upselling increase, 30% online check-in increase | Case study |
| GHT Hotels: 89% enquiry automation, EUR 733,000 generated | Case study |
| AutoCamp: $1.6 million+ generated, 15% operational cost savings | Case study |
| Lub d: 7.9x ROI | Case study |
| AX Hotels: 93% automation, 86% WhatsApp open rate | Case study |
| Paradise Resort: 12% more direct bookings, 82% WhatsApp engagement | Case study |
| Domaine and Demeure: EUR 157K direct bookings | Case study |
| Hotel l'Elysee Val d'Europe: direct bookings tripled in 2024 | Case study |
| Kabannas: "90x industry average conversion rates" | Case study |
| Hotel Tech Report: 4.4/5, 186 reviews, 89% recommend, Ease of use 4.6, Support 4.6, ROI 4.3, Implementation 4.4 | HTR (third party, counted) |
| Homepage claims "4.5/5 on HotelTechReport" from "200+ verified reviews" | Vendor reported, differs from HTR live figure |
| Capterra India: 4.0/5 from 1 review, value for money 2.0/5 | Capterra (third party, counted) |

No published upsell revenue uplift average, upsell conversion rate or revenue per guest figure was found. The only upsell specific metric is Sweet Accommodations' 20%.

## 5. Landing page teardown

URL: https://www.hijiffy.com/hotel-upselling-software

| Element | Content |
|---|---|
| Hero H1 (word for word) | "Hotel upselling software" |
| Subhead (word for word) | "Automated, contactless and personalised" |
| Hero body | "HiJiffy's Hotel Virtual Concierge is available 24/7, from pre-stay to departure. Engage guests before arrival, offer seamless online check-in/check-out, and provide personalised upselling and cross-selling opportunities during their stay, enhancing their experience and boosting your hotel's revenue." |
| Primary CTA | "BOOK A DEMO" |

Section order:

1. Hero with Arrival, In-stay, Departure tabs
2. "Boost revenue with AI-powered hotel upselling and cross-selling software"
3. "Transform the pre-stay experience" (upgrades, transfers, early check-in via WhatsApp, 80% open rate)
4. "Make the most of the in-stay cross-selling" (spa, menus, activities)
5. "Turn check-out into one more opportunity" (late checkout, rebooking discount, loyalty)
6. "Campaigns Manager" (LEARN MORE)
7. "Automated upselling campaigns and so much more!" (feature grid: digital check-in, upsell campaigns, FAQs, notifications, surveys)
8. "OUR CLIENTS' METRICS" (92%, 60%, 5%, 70%)
9. Client testimonials, "more than 2,100 hotels" (BROWSE CASE STUDIES)
10. "Hotel upselling software: FAQs" (five long SEO answers)
11. Closing "Discover how 2,100+ hotels are using HiJiffy's Guest Communications Hub to boost upselling revenue" (BOOK A DEMO)

| Item | Detail |
|---|---|
| CTAs | BOOK A DEMO (repeated), LEARN MORE, BROWSE CASE STUDIES, "Book your free demo today" |
| Proof | 2,100+ hotels, HTR 4.5/5 badge, client metrics block, case study link. No upsell specific screenshot of a guest offer page found |
| Calculator | ROI Calculator linked in site resources, not embedded on the page |
| Demo | Free demo booking, interactive product tour |
| Lead magnets | Free publications (e-books, white papers), 250+ campaign library, "Virtual Coffees" |
| Free trial | Not found on site |
| Guarantee | Not found |
| Tone | Generic and SEO driven. Feature led, hospitality jargon, no hard revenue promise. Upselling page is a content page for search more than a conversion page |

Homepage hero for context: H1 "One Platform for Every Guest Conversation." Subhead "HiJiffy's AI handles up to 90% of guest conversations automatically across web, social, WhatsApp, and OTA channels, always on-brand." CTAs "Book a Free Demo", "Take a Product Tour".

## 6. Hook, guarantee and lead magnet

| Element | HiJiffy |
|---|---|
| Hook | Automation and workload reduction first ("up to 90% of guest conversations"), revenue second. Upselling hook is "80%+ WhatsApp open rates" |
| Guarantee | Not found |
| Lead magnet | 250+ campaign ideas library, ROI calculator, e-books, product tour |
| Offer | Free demo |

## 7. Weaknesses and gaps

| Gap | Evidence |
|---|---|
| Upsell is a bolt-on, not the product | Upsell is a paid add-on on top of the 319 EUR Premium tier. Historically relied on Oaky and UpsellGuru for offer commerce |
| Personalization is rules and segments | PMS event triggers and segmentation, no per-guest offer generation |
| No pay-upfront discount mechanic | Not found. No early payment incentive or prepay vs pay-at-hotel choice |
| Payment model opaque | No gateway names, no merchant of record statement |
| Campaign setup friction | HTR: "There is no preview of the campaign which was setup" |
| Support and onboarding complaints | HTR: "mediocre to bad support, at least long wait times and not helpful solutions", "Integration of tool not completely finished but onboarding phase was ended" |
| Sales vs contract mismatch | HTR: "Sales talks promised a package, but contract included other packages" |
| Micromanagement needed | HTR: "If you are good in micromanagement, you have loads to do with the tool, as there is no continous trust" |
| AI training lag | Capterra: "Long process before the bot understands our guests" |
| Value for money | Capterra value for money 2.0/5 (1 review) |
| SMS fallback limited | "US-numbers only" |
| Inconsistent claims | 2,100+ vs 2,600+ hotels, 60+ vs 80+ vs 100+ integrations, 4.5 vs 4.4 HTR rating |
| No upsell revenue proof | Only one upsell metric (20%, Sweet Accommodations) |
| Trustpilot, G2 | No HiJiffy profile with reviews found |

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:

| Idea | Why |
|---|---|
| WhatsApp as a first class channel with SMS fallback | 80%+ open rate claim is their strongest upsell hook |
| PMS event triggers (booking, digital check-in, day before arrival) | Table stakes for timing |
| Writing orders back to the PMS folio automatically (Mews style) | Removes staff work, hotels expect it |
| Fulfilment dashboard with order status | Ops teams need it |
| Campaign idea library and ROI calculator as lead magnets | Cheap, effective top of funnel |

Beat them:

| Angle | How |
|---|---|
| Upsell as the core product | HiJiffy sells conversation automation; UpLayer sells upsell revenue. Lead with revenue, not inbox |
| Real per-guest AI | Generate the offer set, ranking, copy and landing page per booking from booking data (stay length, party, channel, lead time, purpose), versus HiJiffy's segment rules |
| Prepay discount vs pay at arrival | A native two-option checkout (for example 20 percent off upfront or full price at arrival). Not found at HiJiffy |
| Transparent pricing | Publish price and whether there is a revenue share; HiJiffy hides add-on prices |
| Campaign preview and no-micromanagement automation | Directly answers HTR complaints |
| Revenue proof | Publish upsell revenue per booking and attach rate; HiJiffy has almost none |
| Channel agnostic ingestion | Bookings from PMS, channel manager or portal, not only PMS integrations |
| Pair with HiJiffy | Since HiJiffy partners with Oaky and UpsellGuru, UpLayer could position as an upsell engine that plugs into communication hubs |

## 9. Sources

All checked 1 October 2026.

| URL | Used for |
|---|---|
| https://www.hijiffy.com/hotel-upselling-softwareb | Returns 404 |
| https://www.hijiffy.com/hotel-upselling-software | Landing page teardown, features, metrics, FAQ |
| https://www.hijiffy.com/pricing | Plans, prices, setup fees, add-ons |
| https://www.hijiffy.com/ | Homepage hero, hotel count, positioning |
| https://www.hijiffy.com/integrations | Integration counts and categories |
| https://www.hijiffy.com/case-studies | Case study metrics |
| https://www.hijiffy.com/integrations/mews | Folio charging, auto processing |
| https://www.hijiffy.com/integrations/upsellguru | Upgrade bidding partner |
| https://www.hijiffy.com/integrations/cloudbeds | PMS list (via search result) |
| https://www.hijiffy.com/integrations/planet | PMS list (via search result) |
| https://www.hijiffy.com/integrations/guestline | PMS list (via search result) |
| https://www.hijiffy.com/integrations/medialog | PMS list (via search result) |
| https://www.hijiffy.com/news/hyper-personalised-guest-messaging-based-on-real-time-pms-updates | Trigger logic, April 2024 |
| https://www.hijiffy.com/digital-concierge | AI claims |
| https://www.hijiffy.com/de/erfolgsgeschichten/sweet-accommodations | 20% upsell metric (via search result) |
| https://hoteltechreport.com/guest-experience/guest-messaging-platforms/hijiffy | Ratings, reviews, countries, complaints, Purchase Links, Charge to Folio |
| https://hoteltechreport.com/news/oaky-hijiffy | Oaky partnership, 2022 hotel count |
| https://marketplace.oracle.com/listings/161602416 | Oracle marketplace listing (via search result) |
| https://www.capterra.in/software/182515/hijiffy | Capterra rating and review |
| https://www.cloudbeds.com/integrations/hijiffy/ | Cloudbeds marketplace listing (via search result) |
