# Bookboost, competitor profile

Checked 1 October 2026. Start URL `https://www.bookboost.io/`.

## 1. What it is

Bookboost is a Swedish hospitality CRM and customer data platform (CDP), founded in 2016 in Malmo out of Lund University by Daan de Bruijn and Willem Rabsztyn (third party: Oresund Startups, Tracxn). It raised EUR 3.6M (reported as USD 3.9M) in March 2025 led by Vendep Capital (third party: HotelSpeak, Hotel Technology News). It sells a modular stack: CDP (mandatory), Journey automation, Broadcasts, Unified Inbox, Guest App, AI Agent and an Insights analytics platform. Upselling is not a core product. It happens through campaign messages, a Payment Form type in the Guest App, and the Oaky integration on its marketplace. Buyers are mid-size hotel groups, lifestyle and boutique hotels, hostels and serviced apartments. Named customers include Stayery, Nobis, Placemakr, Citybox, Ruby Hotels, Kronen Hotels, Little BIG, Hakuba, Yellow Square, Cityhub (logos on homepage, counted 10). Country footprint by Hotel Tech Report reviewers: Sweden (53), Germany (40), Netherlands (35), Italy (13), UK (11), 179 hotels in Europe (counted, from HTR). Bookboost says "customers in over 25 countries" (vendor reported) and the data is "GDPR-native, EU hosted". Pricing is published in EUR, GBP, USD and SEK. The minimum fee of EUR 399 per month implies a floor of roughly 70 to 80 rooms before per-room pricing kicks in (estimate, see section 3), so very small independents are not the target.

## 2. Features

### Upsell vs cross-sell types

| Type | Evidence |
|---|---|
| Late check-out | Jorplace Beach Hostel case study, sold by SMS |
| Parking | Jorplace case study and 2020 Mews blog, SMS with purchase link to guests likely arriving by car |
| Early check-in, late check-out time change written back to PMS | Help article "Mews 2-way forms", Mews only, form updates arrival or departure time |
| Green option (skip cleaning) | Ruby Hotels case study, a cost saver rather than revenue upsell |
| Room service, spa, restaurant, seasonal packages, events | Help article "What to put on your Guest App pages", "Services" and "An event or offer" pages |
| Room upgrades, services, merchandise with dynamic pricing | Only via the Oaky integration (marketplace listing) |
| Local attractions via deep links | Digital Brochure page, "Personalised deep-links" |
| Native upsell catalogue with stock, bundles, approval | Not found on bookboost.io or in the help center. Hotel Tech Report search snippets mention "Purchase Links", "Upsell Marketplace", "Charge to Folio" and "Upsell Fulfillment Tracking" features, but none of these appear in Bookboost's own 2026 site, pricing page or help center. Treat as unverified or legacy |

### Channels

| Channel | Available | Notes |
|---|---|---|
| Email | Yes | Included in subscription |
| SMS | Yes | Billed on usage, flat rate per message, failed sends still charged |
| WhatsApp | Yes | Billed on usage, varies by template type and guest country |
| Messenger, Instagram, Telegram, web chat | Yes | Inbox and marketplace |
| OTA messaging (Booking.com, Expedia) | Yes | Inbox |
| Guest app | Yes, web app, no download | EUR 1.40 per room per month add-on, requires Journey |
| Online check-in | Yes | Mews: sends Mews' own check-in link. Apaleo: Bookboost form writes back. Every other PMS: "Nothing reaches your PMS", staff re-key data |

### Timing triggers

| Item | Detail |
|---|---|
| Trigger categories | Reservation, time (stay milestones), space (room status), guest action, external (API), administrative (consent) |
| Count | "+30 triggers for workflows" (vendor reported), 21 presets of trigger plus timing (counted by Bookboost help article) |
| Modes | Exactly, At most, At least. Help center recommends "Pre-arrival upsell: use At least. Trigger: At least seven days before check-in" |
| Time of day pinning | Yes |
| Reservation update triggers | Three, with a 30 minute window |
| Form submission trigger | Yes, send a campaign after a Guest App form is submitted |

### Personalization and AI, what it actually does

| Item | Detail |
|---|---|
| Tokens | "80+ personalisation tokens" (vendor reported), Twig logic for dynamic content, dynamic room type pictures |
| Segmentation | Real-time audiences on stay history, booking channel, preferences, form answers. Case study segmented Jorplace guests by age and behaviour ("party animals" for late check-out) |
| OTA data enrichment | Profiling form to recover OTA guest emails, "up to 23%" (vendor reported, Room Republic) |
| AI Agent | Conversational agent for inbox, "Average response under 5 seconds" (vendor reported), multilingual, draws on CDP profile, escalates to staff. EUR 3.00 per room per month |
| AI for offers | Not found. No AI-generated per-guest offer, no AI pricing in Bookboost itself. Dynamic pricing of upsells exists only through Oaky. AI analytics prompts include "Which guest segment responds best to upsell offers?" |

### Payment options

| Item | Detail |
|---|---|
| Payment Form | A Guest App form type "for taking a payment", with a "Payment Unavailable Message" setting |
| Payment links | Mentioned on check-in page as a feature for operations teams |
| Upfront vs pay at arrival choice | Not found |
| Deposits, pre-authorisation | Not found |
| Discount for paying upfront | Not found |
| Payment provider | Not found in help center (searched "stripe", "payment") |
| Charge to folio | Only via D3X AI integration on Mews with a separate D3X to Mews API connection. Native folio posting not found in 2026 docs |

### Other controls

| Item | Detail |
|---|---|
| Merchant of record | Not found. No evidence Bookboost is MoR. Payment form appears to collect for the hotel |
| Auto vs manual approval | Not found natively. Form submissions land in "Guest App > Submissions (Legacy)" with a "marked done" status, which implies manual handling |
| Inventory checks | Not found |
| Admin panel | Journey builder (drag and drop), Broadcasts, Inbox routing, Guest App page builder with Card, Carousel, List, Map components, form builder with prefill and PMS write-back toggle, brand fonts, consent management, per-property settings |
| Analytics | Campaign report per channel, Insights Platform with custom dashboards, campaign ROI, revenue attribution, segment and CLTV analysis. Insights EUR 2.00 per room per month plus seats |

### Integrations

| Category | Named |
|---|---|
| PMS with help docs | Mews, Apaleo, Clock, Cloudbeds, Shiji, Oracle OPERA Cloud (counted 6) |
| PMS on marketplace | Also Preno, Vikey |
| PMS claim | "70+" on homepage, "80+" on pricing and Why Bookboost page (vendor reported, pages disagree) |
| Channel manager | SiteMinder |
| Upselling | Oaky (only named upsell partner). Blog also mentions UpsellGuru |
| AI operators | D3X |
| Locks | Goki live, Glutz, ASSA ABLOY, SALTO KS coming soon |
| Ops and reputation | hotelkit, ReviewPro, Flexkeeping (coming soon) |
| API | bookboost-api.readme.io |

## 3. Pricing and model

Source: `https://www.bookboost.io/pricing` (vendor published). Subscription only, per room per month (per bed for hostels, per unit for apartments). No commission on upsells found.

| Line | EUR | GBP | USD | SEK | Notes |
|---|---|---|---|---|---|
| CDP (mandatory) | 2.20 | 1.90 | 2.60 | 24 | Includes all PMS integrations |
| Journey | 2.80 | 2.40 | 3.30 | 30 | Automation, email, SMS, WhatsApp |
| Broadcasts | 1.80 | 1.60 | 2.10 | 20 | Newsletters, A/B testing |
| Inbox | 2.80 | 2.40 | 3.30 | 30 | |
| Guest App add-on | 1.40 | 1.20 | 1.60 | 15 | Requires Journey |
| AI Agent add-on | 3.00 | 2.60 | 3.50 | 32 | Requires Inbox |
| Door Locks | coming soon | | | | |
| Insights Platform | 2.00 | 1.70 | 2.30 | 22 | Plus Creator seat EUR 200/month, Viewer seat EUR 50/month |
| Minimum monthly fee | 399 | 350 | 465 | 4,300 | |

| Item | Detail |
|---|---|
| Messaging | SMS and WhatsApp billed on usage per property, invoiced after the period, no spending cap (help center) |
| Setup fee | Not found |
| Free trial | Not found |
| Volume discounts | "available" for multi-property (vendor FAQ) |
| Example | 100-room hotel with CDP, Journey and Guest App: 100 x (2.20 + 2.80 + 1.40) = EUR 640 per month, plus SMS and WhatsApp usage, plus Oaky if it wants a real upsell engine (estimate, counted from list prices) |
| Floor | CDP plus Journey is EUR 5.00 per room, so hotels under about 80 rooms pay the EUR 399 minimum (estimate) |

## 4. Claims and metrics

| Claim | Source | Label |
|---|---|---|
| 23% OTA guest data recovered (Room Republic) | Homepage, case study | vendor reported |
| Around 55% increase in direct bookings (Room Republic) | Case study | vendor reported |
| 9x conversions with multi-channel (Ruby Hotels) | Homepage | vendor reported |
| "9x higher conversion than traditional systems" | Homepage | vendor reported |
| "increase conversions by up to 8x" | Why Bookboost page | vendor reported |
| 29% vs 0.1% conversion, "290x" CTR, green option (Ruby Hotels) | Case study | vendor reported |
| "high 5-digit" annual cleaning savings, 42 litres water per skipped clean (Ruby) | Case study | vendor reported |
| Google review scores up 8-11%, 4.7 vs 4.4 (Ruby) | Case study | vendor reported |
| 5-digit annual savings (CityBox) | Homepage | vendor reported |
| 70+ PMS integrations | Homepage | vendor reported |
| 80+ PMS integrations | Pricing, Why Bookboost | vendor reported |
| 80+ personalisation tokens | Homepage | vendor reported |
| +30 workflow triggers | Why Bookboost | vendor reported |
| 2h+ saved per employee per day | Homepage | vendor reported |
| Up to 2 hours per day saved (Northern Lights Village) | Case study title | vendor reported |
| 92% of repetitive inquiries handled (Grand Hotel Lund) | Case study | vendor reported |
| Late check-out 10% conversion, 88% of late check-out sales via Bookboost (Jorplace) | Case study | vendor reported |
| 33% of targeted guests clicked parking purchase link (Jorplace) | Case study | vendor reported |
| Parking sales up 87% in 3 weeks, 100% of bookings via Bookboost (Jorplace) | Case study, Mews blog 2020 | vendor reported |
| 99% opening rate, 10% engagement rate, conversion up to 8% with personalised offers | Mews blog, 2 January 2020 | vendor reported |
| 2-5% RevPAR increase from targeted upselling | Bookboost blog, 17 December 2024 | vendor reported, industry claim, no source given |
| 15M engaged guests, 3 hubs, 15 nationalities, 7 departments | About us | vendor reported |
| "4.9 rating in Hotel Tech Report" | About us | vendor reported. HTR shows 4.8 (counted) |
| Customers in over 25 countries | Why Bookboost | vendor reported |
| AI Agent average response under 5 seconds, trained on 5 years of data | AI Agent page | vendor reported |
| 17% improvement in guest satisfaction, 8-11% rise in reviews, 55% direct bookings | Hotel Technology News, March 2025, from Bookboost press release | vendor reported |
| HTR CRM: 4.8/5, 144 to 145 reviews, 96% recommended | Hotel Tech Report | counted, third party |
| HTR Unified Inbox: 4.8/5, 194 reviews | Hotel Tech Report | counted, third party |

## 5. Landing page teardown

Homepage, `https://www.bookboost.io/`.

| Element | Detail |
|---|---|
| Announcement bar | "New webinar: how smart hotels automate the guest journey and keep it human." with "Register today" |
| Hero headline | "Turn guest data into" followed by a rotating phrase: "direct bookings", "personalised journeys", "lasting guest loyalty". Page title: "Turn Guest Data Into Loyalty & Direct Bookings" |
| Subhead | "Bookboost unifies your CRM, messaging, and automation so your team can build guest loyalty and reduce OTA dependency." |
| Hero CTAs | "Book a Demo", "Watch 3-min Demo" |

Section order:

1. Hero
2. Proven results: 23% (Room Republic), 9x (Ruby Hotels), 5-digit savings (CityBox), each linked to a case study
3. Trusted by: 10 logos
4. For every role: guest experience (check-in, feedback, loyalty), front desk (inbox, automation, chatbot), marketing ("Personalised campaigns that increase conversion and revenue")
5. How it works: Unify, Segment, Activate, Measure
6. The platform: CDP, Journey, Guest App add-on, Broadcasts, Unified Inbox, AI Agent add-on, Insights, each with a stat badge (70+, 9x, 80+, 2h+, "Live")
7. Integrations
8. Testimonials: Hendrik Renken (Capsule), Laura Neuberger (Stayery), Meghan Dinegar (Yours Truly, "We've seen a big increase in repeat guests")
9. Blog
10. Final CTA: "Let's deliver an amazing experience. Are you ready to increase your revenue and build lasting guest relationships? Take the first step today." Button "Book a demo"

| Item | Present |
|---|---|
| ROI or revenue calculator | Not found |
| Demo | Book a demo, 3-minute recorded demo video |
| Free trial | Not found |
| Lead magnet | Webinar, newsletter subscription, events page |
| Guarantee | Not found |
| Upsell mention on homepage | None. The word "upsell" does not appear in the hero or section heads |
| Tone | Calm, data-led, enterprise CRM language (CDP, segments, ROI), guest loyalty and OTA independence rather than ancillary revenue |

## 6. Hook, guarantee and lead magnet

| Lever | What they use |
|---|---|
| Hook | Own your guest data and reduce OTA dependency, "Turn guest data into direct bookings" |
| Proof | Named lifestyle brands (Ruby, Nobis, Stayery) and 23 case studies, most without numbers (counted 19 of 23 with no metric on the index page) |
| Entry offer | Demo call, recorded 3-minute demo, webinars |
| Transparent pricing | Full per-room price list public, with currency switch, which is rare in the category |
| Guarantee | Not found |
| Free trial | Not found |
| Contract terms | Not found. Billing help says subscription is "agreed when you sign your contract" |

## 7. Weaknesses and gaps

From reviews:

| Quote | Source |
|---|---|
| "The user interface is a bit clumsy and not very customizable." (Chief Commercial Officer) | Hotel Tech Report, Unified Inbox |
| "It would be great to have the same ease of functionality as a normal messaging application, as WhatsApp or iMessage do." | Hotel Tech Report |
| "Areas for improvement include search functionality and reporting capabilities." | Hotel Tech Report, CRM |
| Reporting "needs enhancement in granularity and reliability" | Hotel Tech Report summary via search |
| Wanted "more AI in it" and "more intuitive email settings" | Hotel Tech Report, Unified Inbox |
| No listing found on Capterra, G2 or Trustpilot | Searched 1 October 2026 |

From missing features and docs:

| Gap | Evidence |
|---|---|
| No native upsell engine | Upsell catalogue, dynamic pricing and upsell analytics come from Oaky, a separate vendor and contract |
| No pay-upfront vs pay-at-arrival choice, no prepay discount | Not found anywhere |
| No inventory checks or auto approval | Not found. Submissions are marked done by staff |
| Merchant of record unclear | Not found |
| Weak PMS write-back outside Mews and Apaleo | Online check-in on "every other PMS": "Nothing reaches your PMS" |
| Folio posting only via third party | D3X on Mews, separate API connection, "Setup and pilot together take a couple of months" |
| Uncapped messaging costs | "No spending cap", "Failed messages still count" |
| Shiji folios not synced | Help center: "Folios are not currently synced" |
| Cost stacks fast | CDP is mandatory, Guest App needs Journey, AI Agent needs Inbox, plus usage, plus Oaky |
| Inconsistent claims | 70+ vs 80+ PMS, 4.9 vs 4.8 HTR, 8x vs 9x conversion |
| No guarantee, trial or calculator | Not found |

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:

| Idea | Why |
|---|---|
| Public per-room pricing with currency switch | Removes friction, rare in category |
| Trigger modes (At least seven days before check-in for upsells) | Simple rule that stops offers reaching guests too late |
| Token-prefilled links, no login | Guest lands knowing who they are, higher conversion |
| Segment-driven offers (car drivers get parking, nightlife guests get late check-out) | Jorplace numbers show targeted beats broadcast |
| PMS write-back for time changes | Early check-in and late check-out with no staff re-keying |
| Case studies tied to one metric per headline | Their best-performing proof pattern |

Beat them:

| Gap | UpLayer angle |
|---|---|
| Upselling is bolted on via Oaky | One product, one contract, one price, built for upsell revenue only |
| No upfront discount vs pay at arrival | Lead with the two-option checkout, prepay at a discount or reserve and pay later |
| No AI-generated offers | Per-guest AI offer generation, not just tokens in a template |
| Manual fulfilment | Auto approval with inventory checks, staff only see exceptions |
| PMS write-back limited to Mews and Apaleo | Ingest from any PMS, channel manager or portal, and post orders back where possible |
| Positioning is loyalty and OTA independence | Own the "triple your upsell revenue" outcome with a revenue calculator and a guarantee |
| CRM buyer (marketing, CX) | Sell to revenue and GM buyers who measure ancillary revenue |
| EUR 399 minimum | Entry tier for small independents below 80 rooms |

Note: Bookboost is a likely partner channel as well as a competitor, since it already integrates Oaky as an upsell layer on top of its CRM.

## 9. Sources

All checked 1 October 2026.

| URL | Used for |
|---|---|
| https://www.bookboost.io/ | Hero, sections, metrics, logos, testimonials |
| https://www.bookboost.io/pricing | Full price list |
| https://www.bookboost.io/guest-web-app | Guest app channels |
| https://www.bookboost.io/checkin-checkout | Check-in, payment links |
| https://www.bookboost.io/digital-brochure | Deep links, audience brochures |
| https://www.bookboost.io/ai-agent | AI Agent claims |
| https://www.bookboost.io/why-bookboost-crm | 8x, 25 countries, 80+ PMS, 30 triggers |
| https://www.bookboost.io/about-us | 15M guests, team |
| https://www.bookboost.io/customer-stories | Case study index |
| https://www.bookboost.io/customer-stories/the-perfect-cross-sell-tool-for-hotels | Jorplace upsell numbers |
| https://www.bookboost.io/customer-stories/how-ruby-hotels-increased-click-through-rates | Ruby numbers |
| https://www.bookboost.io/customer-stories/how-roomrepublic-recovers-up-to-23-of-guest-details-from-otas-and-increases-direct-bookings | Room Republic numbers |
| https://www.bookboost.io/customer-stories/grand-hotel-lund-automated-92-of-their-repetitive-questions | Lund 92% |
| https://www.bookboost.io/integrations-categories/upselling | Oaky only upsell partner |
| https://www.bookboost.io/post/targeted-upselling-guest-experiences | 2-5% RevPAR claim |
| https://marketplace.bookboost.io/integrations | Integration list |
| https://marketplace.bookboost.io/integrations/oaky | Oaky features |
| https://intercom-help.eu/bookboost/en/ | Help center structure |
| https://intercom-help.eu/bookboost/en/collections/1455986-integrations | PMS list |
| https://intercom-help.eu/bookboost/en/articles/561835-online-check-in | Check-in by PMS |
| https://intercom-help.eu/bookboost/en/articles/561838-create-a-form | Payment Form |
| https://intercom-help.eu/bookboost/en/articles/561833-what-to-put-on-your-guest-app-pages | Services and offers pages |
| https://intercom-help.eu/bookboost/en/articles/561283-understanding-campaign-triggers-in-journeys | Triggers |
| https://intercom-help.eu/bookboost/en/articles/561282-trigger-modes | Pre-arrival upsell rule |
| https://intercom-help.eu/bookboost/en/articles/744994-update-reservation-arrival-and-departure-times-with-mews-2-way-forms | Time change write-back |
| https://intercom-help.eu/bookboost/en/articles/663092-d3x-integration-with-the-bookboost-unified-inbox | Folio via D3X |
| https://intercom-help.eu/bookboost/en/articles/561963-how-messaging-costs-work | Usage billing |
| https://intercom-help.eu/bookboost/en/articles/663098-how-bookboost-billing-works | Subscription and contract |
| https://intercom-help.eu/bookboost/en/articles/742026-shiji-integration-limitations-and-things-to-know | Shiji folios not synced |
| https://hoteltechreport.com/marketing/hotel-crm/bookboost-crm | Score, reviews, countries |
| https://hoteltechreport.com/guest-experience/guest-messaging-platforms/bookboost | Reviews, criticism |
| https://www.mews.com/en/blog/bookboost | 2020 upsell numbers |
| https://hoteltechnologynews.com/2025/03/bookboost-secures-3-9-million-to-help-hotels-enhance-ai-powered-guest-engagement-and-increase-direct-bookings/ | Funding, press metrics |
| https://oresundstartups.com/bookboost-secures-e3-6m-to-revolutionize-hospitality-crm/ | Funding (search snippet) |
| https://www.capterra.com/search/?query=bookboost | No listing found |
| https://www.g2.com/search?query=bookboost | Returned HTTP 403, not checked |
