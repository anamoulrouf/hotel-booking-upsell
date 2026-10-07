# Competitor: Chekin (Upsellings and Experiences)

Checked 1 October 2026. CEO's primary reference competitor.

Punctuation note: Chekin's own copy uses em dashes and en dashes. In every quote below they are replaced with a comma or a plain hyphen, as marked. Wording is otherwise verbatim.

## 1. What it is

Chekin (legal name Chekin Soluciones Digitales, S.L., Seville, Spain, founded 2018 per its own "by the numbers" page, 2017 per PitchBook) is a guest check-in and compliance platform that has added upselling on top. Its core job is online check-in, ID and biometric verification, automatic reporting of guest data to police and statistics authorities, tourist tax collection, and payments. Upselling ("Upsellings & Experiences") is a module inside that platform, not a standalone product. It sells to short-term rental managers, apartments, villas, aparthotels, hotels, hostels and campsites, from single units up to 200-plus-unit portfolios and small hotel groups. The hotel plan has a 10-room minimum. Vendor reported scale: 200,000+ properties, 25M+ check-ins, active in 45+ countries, direct legal authority integration in 18 countries (strongest in Spain, Italy, Portugal, Croatia, Austria, Germany, Czech Republic, Dubai, Colombia). Third-party estimates: $4.2M total funding, last round $2.5M to $3.0M in late 2024, roughly 132 employees, about $6.8M revenue in 2024 (GetLatka estimate, unverified).

## 2. Experiences and upsell product in detail

### 2.1 Architecture: three sources, three surfaces

Chekin's own explanation (blog, 27 May 2026) is the clearest model of the product:

| Layer | Option | How it works |
|---|---|---|
| Source | Host's own services | Early check-in, late checkout, room upgrade, breakfast, parking, welcome packs, spa, in-house transfers. Host sets price, keeps price minus 10% Chekin commission |
| Source | Host's own external partners | Restaurant, surf school, wine cellar, masseuse. Host negotiates off-platform, uploads photo, description, price. Chekin only processes the guest payment |
| Source | Chekin marketplace | Pre-integrated partners: eSIM, airport transfers (Mozio), walking tours, curated activities. One-click activation, Chekin pays commission into host's balance |
| Surface | Online check-in form | Offers tied to the reservation shown while guest completes registration. Chekin calls this the highest-converting surface |
| Surface | Digital Guidebook | Offers appear inside the guidebook after check-in is confirmed |
| Surface | Unified Inbox with AI | AI reads guest messages (WhatsApp, email, SMS, OTA, phone) and proposes matching catalogue items in context |
| Surface (new) | Travel Guide | Guest answers 4-5 questions at check-in, gets a day-by-day trip plan mixing free tips with bookable services |

One catalogue propagates to every active surface. A direct offer link can also be copied and sent manually.

### 2.2 Upsell types

| Type | Detail on site | Source URL |
|---|---|---|
| Room upgrades | "Suggest the next category, mapped from your PMS room types, with a single tap" | /experiences/ |
| Early check-in | "Turn 'what time can I arrive?' into instant revenue." Demo: "Arrive 2 h earlier, if available" EUR 25 | /experiences/ |
| Late checkout | "Offered dynamically based on the next booking." | /experiences/ |
| Breakfast and F&B | Daily packages, room service, mini-bar bundles | /experiences/ |
| Parking and transfers | On-site parking, airport pickups, EV charging | /experiences/ |
| Spa and wellness | Treatments and packages booked before arrival | /experiences/ |
| Experiences and tours | Curated local activities "with built-in commissions" | /experiences/ |
| Pet packages | Beds, bowls, dog walking | /experiences/ |
| Special packages | Champagne, birthdays, anniversary kits | /experiences/ |
| Luggage storage | Sold by the Inbox AI | /unified-inbox/ |
| Third-party marketplace | Global eSIM (200+ countries), local walking tours, airport transfers, curated experiences | /experiences/ |
| Templates | Early check-in, Late check-out, Transportation, Pizza on arrival, welcome packs | /blog/upselling-tool/ |

### 2.3 How offers reach the guest

| Channel | Status | Evidence |
|---|---|---|
| Email | Yes, but as the online check-in invite, not a dedicated upsell campaign | Workflow table: "Online check-in invite, Guest receives the link to complete check-in, Email/SMS" |
| SMS | Yes, same check-in invite. "Channel fees apply (per call, WhatsApp, SMS message)" on pricing page | /blog/upselling-tool/, /pricing/ |
| WhatsApp | Through Unified Inbox (conversational, reactive). FAQ: "WhatsApp integration is ready" | /unified-inbox/ |
| Guest app / web app | Yes, Chekin Guest App and white-label Branded Guest App (Premium feature) | Mozio help article, /pricing/ |
| Online check-in flow | Primary surface | All pages |
| Digital Guidebook | Yes | /blog/upselling-tool/ |
| OTA messaging (Airbnb, Booking) | Through Unified Inbox | /experiences/ |
| Dedicated, personalized pre-arrival upsell email with its own landing page | Not found. Chekin's own hotel upsell guide recommends automated pre-arrival emails 2 to 5 days out, but no product page shows Chekin sending one | /blog/hotel-upsell/ |

### 2.4 Timing triggers

| Trigger | What is documented |
|---|---|
| Booking confirmation | Reservation enters Chekin from PMS or OTA, check-in invite goes out |
| During online check-in | Offers shown in the form |
| After check-in confirmed | Guidebook with offers opens |
| Guest writes a message | AI matches message to catalogue |
| Check-out approaching | "When check-out day approaches without an extension request, the AI can proactively propose a late check-out" |
| Per-offer availability window | Date range, quantity per day, lead time |
| Travel Guide moments | Pre-stay, check-in day, in-stay, check-out |
| Configurable scheduled campaign (for example 7 days, 3 days, 1 day before arrival) | Not found |

### 2.5 Personalization and AI

| Element | What Chekin says | Assessment |
|---|---|---|
| Guest profile targeting | Host picks which profiles see each offer: families, couples, business travelers, solo guests, using check-in data | Rule-based filter set by the host, not generated per guest |
| AI matching claim | Hotels page: "AI-matched by stay length, party size and guest profile". Calculator: "Adapted by guest type, length of stay and booking channel" | Inputs are the same few booking fields. No evidence of per-guest generated copy, pricing or bundles |
| Travel Guide | Personalized day-by-day plan from 4-5 questions (trip style, interests, budget, pace), checks opening hours and availability. Signals: destination, dates, family, pet, length of stay | The most genuinely personalized piece, but it is an in-stay itinerary, not a pre-arrival offer |
| Inbox AI | Reads messages, matches catalogue, replies in guest's language, trained on uploaded property manual. Live "within 10 minutes" | Reactive, only fires when the guest writes |
| Dynamic pricing | Not found | Prices are fixed per offer |
| A/B testing | Not found (their own buyer guide lists it as a criterion) | |
| Personalization depends on check-in data | Yes, the profile comes from the online check-in form | A guest who never opens check-in gets no personalization |

### 2.6 Payment options

| Option | Status | Evidence |
|---|---|---|
| Pay upfront in flow | Yes, "Guest pays in one click. No redirect, no second form" | /blog/upselling-tool/ |
| Payment link | Yes, upsells can be charged "through a payment link that you can share" | /payments/ |
| Pay at arrival / reserve now pay later for upsells | Not found. Payments page: upsells charged "during online check-in (if they are accepted and paid immediately) or through a payment link" | /payments/ |
| Prepay discount (for example 20% off if paid before arrival) | Not found | |
| Deposits | Yes, for the stay, as a card hold auto-released after stay. Fee 1.5% + EUR 0.30 | /payments/, /pricing/ |
| Status values | "Pending, paid, refunded, awaiting approval" | /blog/upselling-tool/ |

### 2.7 Merchant of record and commission flow

| Item | Finding |
|---|---|
| Who processes | Chekin. "Payment lands directly in the host's Chekin account" and "commissions land in your Chekin balance" |
| Merchant of record | Not found stated explicitly. Funds sit in a Chekin balance first, which implies Chekin controls the payment flow. Underlying PSP not found |
| Own services | Host keeps price minus 10% commission, charged only on what guests pay |
| Host's own partners | Host's negotiated price, Chekin processes payment. Commission on these not stated separately |
| Marketplace partners | Chekin pays a commission (rate not published) to host's balance. Mozio transfers booked on chekin.mozio.com |
| Contradiction | Travel Guide page says for own services "You set the price and keep the full revenue", while every other page says minus 10% |

### 2.8 Approval flows

| Item | Finding |
|---|---|
| Auto-accept | Default behaviour implied: offer bought and paid in one click |
| Manual approval | Only evidence is the booking status "awaiting approval". No help article explaining how or when approval is required |
| Auto-refund on decline | Not found |

### 2.9 Inventory and availability checks

| Item | Finding |
|---|---|
| Room upgrades | Mapped from PMS room types. Live availability check against PMS not stated |
| Late checkout | "Offered dynamically based on the next booking" |
| Early check-in | Demo copy "if available", no stated automatic check |
| Generic offers | Quantity per day and lead time caps set by host |
| Travel Guide | "checks opening hours and availability" for activities |

### 2.10 Admin panel (what a hotel configures)

- Upselling tab in top menu, between Bookings and Documents.
- "Create Offer": template or custom.
- Fields: title, description, price, availability window, quantity per day, lead time, image (upload or Chekin image library).
- Live mockup of how the offer looks in online check-in.
- Supplier registry for partner offers (left-side menu), offer linked to supplier.
- Targeting: which properties, which guest profiles.
- Marketplace toggles (for example Transfers on or off per property).
- Upload property manual to the Inbox AI.
- Copy a direct offer link.

### 2.11 Analytics

| Report | Detail |
|---|---|
| Booking details | Per-reservation offer status |
| Upselling reports | Which offers convert best, which guest profiles buy more, total upsell revenue for any time range |
| By channel, by season, A/B | Not found |

### 2.12 PMS and channel integrations

Vendor reported counts vary: "35+ PMS integrations" (hotels page), "50+ PMS and channel integrations" (numbers page), Hotel Tech Report lists 27.

| Category | Names found on integrations page logos or text |
|---|---|
| Hotel PMS | Mews, Cloudbeds, apaleo, Oracle Hospitality, Sihot, Little Hotelier, eviivo, Octorate, Amenitiz, RoomRaccoon, HOTELTIME, Hoteliga, Hotelizer, Yanolja Cloud Solution (HTR), Bookipro |
| Channel managers | SiteMinder, Channex, Smily, Avantio, Lodgify, Smoobu, Beds24, Guesty, Hostaway, Hostfully, Hostify, Hospitable, iGMS, Tokeet, other STR tools (RentalReady, Lavanda, Jurny, Resharmonic, Track) |
| OTAs | Airbnb, Booking.com, Expedia, Vrbo |
| Smart locks | Nuki, Salto, Dormakaba, igloohome, TTLock, Yale, August, Keycafe, Akiles, Omnitec |
| 2-way messaging PMS | Avantio, Guesty, Cloudbeds, Smoobu, Amenitiz, Hospitable |
| Upsell write-back to PMS folio | Not found. The Mews help article covers unit mapping and reservation sync only |
| Booking-source limits | iCal fallback exists for unintegrated sources. Offers only reach guests whose booking entered Chekin and who open the check-in link |

## 3. Business model and pricing

Source: https://chekin.com/en/pricing/ and pricing.js loaded by that page. All figures vendor published.

### 3.1 Subscription, hotel/hostel/camping, EUR per room per month, monthly billing, graduated tiers

| Rooms in tier | Basic | Premium | Enterprise |
|---|---|---|---|
| 1-10 | 1.50 | 2.50 | 5.00 |
| 11-20 | 1.35 | 2.35 | 4.70 |
| 21-50 | 1.20 | 2.20 | 4.40 |
| 51-100 | 1.05 | 2.05 | 4.10 |
| 101+ | 0.90 | 1.90 | 3.80 |

- Annual billing is 20% off (code multiplies monthly by 0.8). Minimum 10 rooms for hotels.
- Vacation rental equivalents: Basic from EUR 4.95 monthly, EUR 3.95 annual per property.
- Basic includes Online Check-in, Legal Compliance, iCals, Deposits and Damage Protection, Tourist Taxes, Online Payments, Upsells and Experiences, Unified Inbox.
- Premium adds one of: Identity Verification, Self Check-in, Branded Guest App, Digital Guidebooks, E-invoicing. Enterprise adds all.
- Note: Digital Guidebooks is a Premium choice, so the guidebook upsell surface is not in Basic.

Worked example (estimate, computed from the published tiers): a 100-room hotel on Basic pays EUR 117 per month monthly, or EUR 93.60 per month annual. Premium EUR 217, Enterprise EUR 434 per month monthly.

### 3.2 Transaction fees (Basic plan tooltips, mapped by tooltip order on the page)

| Item | Fee |
|---|---|
| Deposits | 1.5% + EUR 0.30 |
| Damage protection | USD 2.50 / 3.50 / 4.00 for USD 1,500 / 2,500 / 5,000 cover |
| Tourist taxes | 1.5% + EUR 0.99 per transaction |
| Online payments | 1% per transaction |
| Upsells and Experiences | 10% per transaction |
| Channels | "Channel fees apply (per call, WhatsApp, SMS message)", amounts not found |
| Advanced AI inbox usage | "credit-based add-on", price not found |

### 3.3 Other commercial terms

| Item | Finding |
|---|---|
| Upsell module fee | EUR 0 per month, "commission-only model" (numbers page) |
| Commission | 10% on actual guest spend, confirmed on blog, numbers page and pricing tooltip |
| Marketplace commission paid to host | Rate not found |
| Setup fee | Not found (none advertised) |
| Free trial | 14 days, "No credit card required" (blog CTA), 2 weeks per Mews help article |
| Free tier | Not found |
| Referral | Referrer earns 15% of referred customer's revenue, up to EUR 500 |

Implication (estimate): at Chekin's own "realistic" EUR 5,200/month uplift for 100 rooms, the 10% commission is EUR 520/month, about 4 to 5 times the Basic subscription. Upselling commission, not subscription, is the bigger revenue line per hotel.

## 4. Claims and metrics

All vendor reported unless marked.

| Claim | Where | Label |
|---|---|---|
| +EUR 5,200/month extra revenue | /experiences/ hero, /hotels/ | Vendor reported, modelled for a 100-room hotel, 9% attach x EUR 55 |
| Scenarios: Conservative +EUR 3,300, Realistic +EUR 5,200, Optimistic +EUR 7,500 | /experiences/, /hotels/ | Vendor reported model |
| +EUR 55 avg upsell per booking | /experiences/ | Vendor reported |
| 9-14% attach rate at check-in | /experiences/ | Vendor reported |
| +EUR 1.7 additional RevPAR | /experiences/ | Vendor reported model |
| 10,000+ properties (upsell page), 10,000+ hotels (hotels page), 200,000+ properties (pricing, numbers) | Various | Vendor reported, inconsistent |
| 20x faster replies, ~10 s AI reply vs 3-5 hours host average | /unified-inbox/ | Vendor reported |
| +15% upsell attach / conversion via inbox AI | /experiences/, /unified-inbox/ | Vendor reported |
| 70% fewer repetitive enquiries | /experiences/, /unified-inbox/ | Vendor reported |
| Up to 60% more revenue per booking with all surfaces | /blog/chekin-upselling/, numbers page | Vendor reported |
| Upselling adds 30 to 60% per booking, conversion 10 to 20% when well targeted | /blog/chekin-upselling/ | Vendor reported |
| Personalised offers convert +25% more than generic | /revenue-calculator/ | Vendor reported |
| STR case: 180 units, 14% attach, +EUR 4,680/month, +EUR 56K/year | /revenue-calculator/ | Vendor reported, anonymous, presented as scenario |
| Hotel case: 5-hotel group, 240 rooms, 9% attach, +EUR 12,470/month, +EUR 150K/year | /revenue-calculator/ | Vendor reported, anonymous, presented as scenario |
| Calculator assumptions: attach 9-15%, avg upsell EUR 38 STR / EUR 55 hotel | /revenue-calculator/ | Vendor reported |
| Structured upsell programmes lift RevPAR 10 to 30% | /blog/hotel-upsell/ | Vendor reported, no source cited |
| 15 to 25% conversion on pre-arrival room upgrade offers achievable | /blog/hotel-upsell/ | Vendor reported, no source cited |
| Upsell + cross-sell gives 15 to 25% more revenue per guest | /blog/hotel-upsell/ | Vendor reported, no source cited |
| Upsell = 5 to 10% of room revenue for mature hotels (attributed to PhocusWire 2024) | /blog/chekin-upselling/ | Third party, as cited by Chekin, not verified |
| 11-20 deals per guest highest conversion, SMS 97% open in 15 min | /blog/channels...booking-stage/ (2021) | Vendor reported, no source |
| 25M+ check-ins, 45+ countries, 18 with legal integration | numbers page | Vendor reported |
| Trustpilot 4.7 from 49,418 reviews | trustpilot.com | Counted on third-party site, mostly guest reviews of the check-in step |
| Hotel Tech Report 4.2, 6 reviews, 85% recommend | hoteltechreport.com | Counted on third-party site |
| Capterra 2.6, 7 reviews, customer service 2.1/5 | capterra.com | Counted on third-party site |

## 5. Landing page teardown of /experiences/

### 5.1 Hero (verbatim)

- Eyebrow: "Personalised upselling"
- H1: "Add +€5,200/month in extra revenue, without selling a single extra room." (original uses an em dash before "without")
- Subhead: "Turn every booking into an opportunity. Chekin surfaces the right offer to the right guest at the right moment, room upgrades, early check-in, breakfast, parking and experiences." (original uses an em dash before "room upgrades")
- CTAs: "Book a demo", "Calculate my uplift →"
- Stat bar: "+€55 avg upsell per booking", "9-14% attach rate at check-in", "10,000+ properties"
- Visual: animated phone mockup, "Explore our extras and upgrade your stay", with Early check-in EUR 25, Guided tour EUR 30, Spa and wellness EUR 50, Airport transfer EUR 30, running total ticking from EUR 0 to EUR 135, "Book" button.

### 5.2 Section order

| # | Section | Job |
|---|---|---|
| 1 | Hero + stats + phone demo | Anchor a big monthly number, show the guest view |
| 2 | "Upsells that fit your property and your guests" (9 cards) | Catalogue breadth, "Configure what you offer, set the price, choose when to show it. Chekin handles the rest." |
| 3 | RevPAR calculator teaser: "Run the numbers for your property." | Lead into calculator, shows +EUR 5,200, +EUR 1.7 RevPAR, three scenarios |
| 4 | Third-party marketplace: "Extra revenue from third-party services, with zero extra work." | Zero-ops revenue (eSIM, tours, transfers, experiences), CTA "Talk to our experts" |
| 5 | Smart Inbox AI: "Reply in seconds. Upsell along the way." | Cross-sell inbox, WhatsApp chat demo selling early check-in for EUR 25, stats 20x, +15%, 70% |
| 6 | Travel Guide (New): "A personalised trip plan for your guests. More revenue for you." | Personalization story, "Discover more →" |
| 7 | Benefits trio: Increase Revenue, Less Effort, Happier Guests | Summary |
| 8 | Closing CTA: "Stop selling rooms. Start selling stays." "Book 15 minutes and we'll show you the upsells that fit your property." | Demo booking |
| 9 | Footer: "What's your business?" segment links | Routing |

### 5.3 CTAs

"Book a demo" (x2, hero and close), "Calculate my uplift →", "Open the calculator →", "Talk to our experts", "Discover more about Unified Inbox →", "Discover more →" (Travel Guide), nav "Try for free" and "Log in". Demo is the primary CTA, free trial is secondary in nav only.

### 5.4 Proof elements

| Type | On /experiences/ |
|---|---|
| Customer logos | None on this page |
| Testimonials | None on this page (calculator page has one anonymous quote from an "Operations Director, Boutique hotel group, Spain (4 properties)") |
| Numbers | +EUR 55, 9-14%, 10,000+, +EUR 5,200, +EUR 1.7, 20x, +15%, 70% |
| Case studies | None linked from this page |
| Third-party badges or ratings | None |

### 5.5 Calculator, demo, lead magnet, trial

- RevPAR calculator at /revenue-calculator/: pick profile (Apartments, Villas, Hotels, Campings), sliders for rooms (1-500), ADR (EUR 20-800), occupancy (10-100%), avg stay (1-30 nights), toggles for Personalised offers (+25%), Room upgrades, Early check-in, Late check-out, Breakfast, Experiences, Smart Inbox. Live result, then "Book a demo". Formula published: monthly bookings = units x 30 x occupancy / avg stay.
- 15-minute demo.
- 14-day free trial (nav and blog).
- No downloadable lead magnet on this page.

### 5.6 Guarantee

None found. The calculator page frames the numbers as "This isn't a promise. It's arithmetic." and "deliberately conservative", which is a credibility device, not a guarantee.

### 5.7 Tone

Confident, numbers-first, revenue-manager language (RevPAR, attach rate, ADR). Short punchy lines ("Stop selling rooms. Start selling stays."). Effort-removal theme ("zero extra work", "no ops, no contracts to chase", "Chekin handles the rest"). Mildly skeptical-buyer framing on the calculator ("Most upsell decks promise the moon"). No emotional guest storytelling on this page apart from the Travel Guide.

## 6. Hook, guarantee and lead magnet

| Lever | What Chekin uses |
|---|---|
| Primary hook | A large, specific monthly number (+EUR 5,200) tied to the hotel's own inputs via calculator |
| Risk reversal | EUR 0 monthly fee for upselling, 10% only on what guests buy. "If a guest doesn't buy anything, the host pays nothing." |
| Bundling hook | Upselling is included in every plan, so any hotel buying check-in for compliance already has it. Most hotels arrive via legal compliance, not via upselling |
| Trial | 14-day free trial, no credit card |
| Demo | 15-minute demo, "we'll show you the upsells that fit your property" / "build the playbook for your property together" |
| Lead magnet | Calculator. Separately, generic guides and templates in the resources menu |
| Guarantee | None |
| Referral | 15% of referred revenue, up to EUR 500 |

## 7. Weaknesses and gaps

| Gap | Evidence | Severity for UpLayer's angle |
|---|---|---|
| Offers depend on the guest opening online check-in | Primary surface is the check-in form, profile data comes from it, guidebook opens after it. No dedicated upsell campaign found | High. Guests who skip online check-in (common for hotels outside compliance-heavy markets) see nothing |
| Weak personalization | Host-chosen filters for 4 profiles (families, couples, business, solo) plus stay length and party size. No per-guest generated offer, copy, bundle or price | High |
| Generic offers | Same catalogue item and price for everyone in a segment. No dynamic pricing, no A/B testing found | High |
| No pay-at-arrival option for upsells | Payments page: paid immediately in check-in or via payment link | High, directly matches UpLayer's reserve-now-pay-later option |
| No prepay discount mechanic | Not found anywhere | High, UpLayer's 20%-off-if-prepaid is unmatched |
| No dedicated personalized offer landing page | Offers live inside check-in, guidebook or chat, not a standalone per-guest page | Medium-high |
| Email and SMS are only the check-in invite | Workflow table | Medium-high |
| Approval flow undocumented | Only an "awaiting approval" status | Medium |
| No upsell write-back to PMS folio documented | Mews help article covers reservation sync only | Medium, matters to hotel finance |
| Inventory checks partial | Late checkout uses next booking, upgrades "mapped" from room types, no stated live PMS availability check | Medium |
| Per-booking-source limits | Works only for bookings that reach Chekin via PMS, channel manager or iCal. OTA guests without email cannot be reached except via OTA messaging in the inbox | Medium |
| 10% take rate scales with success | At EUR 5,200/month uplift, EUR 520/month commission, about 4 to 5x Basic subscription | Medium, opens a pricing wedge |
| Guidebook surface is Premium-only | Pricing compare table | Low-medium |
| Support quality | Capterra customer service 2.1/5, quotes: "Support is zero", "Almost impossible to contact customer service, responses take many days"; HTR 0.5/5 review on unanswered tickets | Medium |
| Guest UX complaints | Capterra: "Guests found it complicated to use"; Trustpilot summary mentions repeated document uploads and selfie problems | Medium, friction in the same flow that carries the offers |
| Upsell is a feature, not the product | Positioning is check-in and compliance first. Hotel buyer for revenue (revenue manager, GM) sees an ops tool | Strategic |
| Inconsistent claims | 10,000+ vs 200,000+ properties, 35+ vs 50+ integrations, Travel Guide "keep the full revenue" vs 10% commission | Low, but useful in sales conversations |
| Setup effort | Low by design: templates, "one afternoon", no-code. Not a weakness | n/a |
| Upsell-specific reviews | Only one HTR review mentions upselling (positive). No negative upsell-specific review found | n/a |

## 8. What UpLayer should copy, and where UpLayer can beat them

### Copy

| Idea | Why |
|---|---|
| Hero built on a specific monthly number plus a calculator with editable inputs and published formula | Strong, credible hook for a revenue buyer |
| Conservative, Realistic, Optimistic scenario band | Defensible in a GM budget meeting |
| "Not a promise, it's arithmetic" framing | Builds trust without a guarantee |
| Commission-only, no monthly fee for the upsell module | Removes adoption risk |
| Sources-and-surfaces model: own services, own partners, marketplace | Clean mental model for the admin panel |
| Offer builder with templates, live preview, quantity per day, lead time, date range | Low setup effort |
| Late checkout gated by the next booking, upgrades mapped to PMS room types | Basic inventory safety |
| Zero-ops third-party catalogue (eSIM, transfers, tours) | Adds revenue for hotels with thin in-house offers |
| Reporting by offer and by guest profile | Lets hotels retire weak offers |

### Beat them

| Where | How UpLayer wins |
|---|---|
| Reach | Send the personalized offer for every booking from any source, independent of whether the guest opens online check-in |
| Real personalization | AI-generated offer per guest: which items, bundle, order, copy and hero image chosen from booking data (source, party, stay length, purpose, lead time, origin, history), not 4 static segments |
| Dedicated per-guest landing page | One page built for that guest, the thing Chekin does not have |
| Two payment paths | Pay now at a discount or reserve now and pay at arrival at full price. Chekin offers neither the discount nor pay-at-arrival for upsells |
| Scheduled pre-arrival sequence | Email and SMS at configurable intervals, which Chekin's own blog says is the highest-converting window but its product does not run |
| Pricing wedge | Flat fee or lower take rate. Chekin's 10% outgrows its subscription quickly at the volumes it advertises |
| Revenue-buyer positioning | Sell to GM and revenue manager as a revenue product with a tripling target, versus Chekin's compliance-first ops tool |
| Hotel finance fit | Post charges to the PMS folio and handle approval plus auto-refund explicitly |
| Proof | Chekin shows no named upsell case studies. Named, verifiable pilot results would stand out (do not invent any) |
| Coexistence | Many Spanish, Italian and Portuguese hotels must keep Chekin for police reporting. UpLayer can sit alongside it as the upsell layer instead of asking them to switch |

## 9. Sources

All checked 1 October 2026.

| URL | What it gave |
|---|---|
| https://chekin.com/en/experiences/ | Landing page, all upsell types, stats, marketplace, inbox, Travel Guide |
| https://chekin.com/en/upselling/ | Same page as /experiences/ (canonical) |
| https://chekin.com/en/blog/hotel-upsell/ | Hotel upsell guide, timing advice, benchmark claims, 14-day trial CTA |
| https://chekin.com/en/blog/upselling-tool/ | Full mechanics: sources, surfaces, setup steps, targeting, statuses, reports, 10% commission |
| https://chekin.com/en/blog/chekin-upselling/ | 60% claim, pricing of upselling (EUR 0 fee, 10%) |
| https://chekin.com/en/blog/hotel-upsell-software/ | Chekin's own buyer criteria and positioning |
| https://chekin.com/en/blog/channels-we-have-to-use-to-sell-upsells-depending-on-the-booking-stage/ | 2021 channel and timing advice |
| https://chekin.com/en/blog/chekin-by-the-numbers-2026/ | Company facts, integrations, commission, EUR 0 module fee |
| https://chekin.com/en/blog/guest-data/ | Guest data strategy (context) |
| https://chekin.com/en/pricing/ | Plans, features, transaction fee tooltips, FAQ |
| https://chekin.com/wp-content/cache/min/1/wp-content/themes/chekin2020/assets/js/pricing.js | Hotel per-room tier prices, annual 20% discount logic |
| https://chekin.com/en/hotels/ | Hotel positioning, AI-matching claim, PMS-mapped upgrades |
| https://chekin.com/en/payments/ | Upsell payment modes, no pay-at-arrival for upsells |
| https://chekin.com/en/travel-guide/ | Travel Guide personalization, "keep the full revenue" line |
| https://chekin.com/en/revenue-calculator/ | Calculator inputs, formula, two scenario case studies, testimonial |
| https://chekin.com/en/unified-inbox/ | Inbox AI, channels, 2-way PMS list, AI credit add-on |
| https://chekin.com/en/integrations/ | Integration partner logos |
| https://support.chekin.com/en/upselling | Help center upselling category (one article only) |
| https://support.chekin.com/en/upselling-transfers-with-mozio | Mozio transfers marketplace activation |
| https://support.chekin.com/en/mews-integration-chekin-help-center | Mews connection, 10-room hotel minimum, 2-week trial |
| https://chekin.com/experiencias/ | Spanish page, checked for FAQ or approval detail, none found |
| https://www.capterra.com/p/236453/CheKin-App/reviews/ | 2.6/5, 7 reviews, support complaints |
| https://hoteltechreport.com/guest-experience/contactless-checkin/chekin | 4.2/5, 6 reviews, 85% recommend, 27 integrations |
| https://www.trustpilot.com/review/chekin.com | 4.7/5, 49,418 reviews, mostly guests |
| https://www.roommaster.com/blog/best-hotel-upsell-software | Third-party ranking, Chekin as small and short-stay pick |
| https://pitchbook.com/profiles/company/181422-37 | Founding, HQ, funding (via search snippet) |
| https://getlatka.com/companies/chekin/team | Revenue and customer estimate (via search snippet, unverified) |
| https://www.g2.com/products/chekin/reviews | Blocked (HTTP 403), not found |
| Mews and Cloudbeds marketplace listings for Chekin | Not found |
