# UpsellGuru

Competitor research for the UpLayer AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

UpsellGuru GmbH is a Frankfurt am Main, Germany company founded by Karl Schmidtner, Matteo Galli and Hans Schmidtner (incorporated 2017 per its About page, "Founded in 2016" per Hotel Tech Report), self-funded ("no external funding"). It built what it calls "the first bidding system tailored specifically for the hotel sector": guests bid on a room upgrade inside a hotel-set range in a branded pre-arrival email. It now sells three programs, Pre-Arrival, On-Arrival (front desk upselling with training, incentives and auditing) and In-Stay, plus paid professional services (on-site training, a dedicated Customer Success Consultant). Buyers are upscale and luxury independents and branded hotels: named customers include Althoff Hotels, AMResorts, Autograph Collection Hotels, Best Western, Ascott Limited, HEI Hotels, Malmaison, LUX* Resorts, Village Hotel Club, Danubius Hotels, JW Marriott Savannah, St. Ermin's (London), The Mayfair House (Miami) and Hotel Drei Quellen Therme (vendor reported). It claims "1,000+ hotels across 50 countries" (vendor reported). Hotel Tech Report lists 13 employees and the Apaleo store "10+". Third parties position it for "boutique and luxury hotels" (Runnr.ai) and "mid-sized independent hotels" (Roommaster).

## 2. Features

| Area | What UpsellGuru does | Source |
|---|---|---|
| Upsell types | Room upgrades (bid or fixed price), early check-in, late check-out, room attributes (balcony, outdoor shower), spa, F&B vouchers, restaurant and bar packages, welcome amenities, transport, stay extensions. Case studies stress room-related items as 80-95% of upsells. | FAQ, case studies |
| Channels | Branded pre-arrival email (core), SMS and WhatsApp (pricing page lists "WhatsApp and SMS" under Guest Communication), online registration card, QR codes, chatbots, digital guest directory, confirmation, cancellation and post-stay emails, front desk agent tool. Online check-in: a "registration card" with upselling, full online check-in not found. | Homepage, Features, In-Stay, Pricing |
| Timing triggers | Booking confirmation, pre-arrival ("a few days before arrival", exact default not found), on-arrival at check-in, in-stay, post-stay. "Segment offers based on specific guest journey touchpoints." | Features, Apaleo store, UpsellGuru blog snippet |
| Personalization and AI | Rule-based offer segmentation ("display only relevant offers for each guest"). Dynamic pricing engine "driven by smart algorithms", optionally fed by RMS (IDeaS, HQ revenue, RIMS listed). Bid range with an "offer strength" indicator shown to the guest. AI appears only in staff training: "AI Voice Coach", one-on-one sessions "trained on your hotel's specific room types". LUX* case mentions "AI-driven coaching". No AI offer selection or AI copy for guests found. | Features, Pre-Arrival, Front Desk, case study |
| Payment options | Not found as a documented mechanism. Pre-arrival FAQ: "Approved bids are automatically processed". A third-party list says "automated payment collection on accepted offers" (Roommaster, unverified). A UpsellGuru blog snippet says the guest "pays the additional amount" if the bid is accepted, method not stated. A HTR reviewer asks for "manually processed transactions to automatically post to the PMS", which implies charges post to the PMS. No upfront discount vs pay at arrival option found. | Pre-Arrival FAQ, HTR review, Roommaster |
| Merchant of record | Not found. Most likely the hotel through the PMS folio (inference from PMS posting, not confirmed). | n/a |
| Auto vs manual approval | "Auto-Pilot" evaluates offers in real time "to accept, wait, or reject based on demand and availability", and per Runnr.ai confirms any bid within a preset floor and ceiling. With 1-way PMS integrations the hotel must update the upgrade in the PMS manually. | Features, Integrations, Runnr.ai |
| Inventory checks | Yes. Pulls room availability from the PMS; Auto-Pilot uses availability before accepting; "real-time tracking prevents underselling". | Features, Integrations FAQ |
| Admin panel, what a hotel configures | Offers, audiences (segments), transactions, bid ranges and floor/ceiling, dynamic pricing, branded email templates, sender domains and URLs, multi-property dashboards, front desk agent incentive programs and monthly targets (Target Setting Calculator), audits that flag upsells not matching the PMS. | Homepage, Features, Front Desk |
| Analytics | Revenue, ROI, conversion rate, open rate, click-through rate, accept/deny ratios, multi-property comparisons by location, brand and period, individual and team agent performance, commission summaries. HTR reviewer wants "more educational information ... like optimal pricing". | Features, HTR review |
| Integrations, PMS | From the integrations page logos (counted, 37 unique PMS): Opera PMS, Opera Cloud, Micros Fidelio Suite 8, Mews, Infor, RMS, Apaleo, Guestline, protel, SIHOT, Stayntouch, Cloudbeds, TOTVS, Guesty, Booking Factory, AVALON, WINHMS, HQbeds, RoomRaccoon, Sirvoy, Desbravador, ACI Group, GuestCentrix, room, hoteltime solutions, Clock, Little Hotelier, eZee, Cover, HotSoft 8, Haven, Jazotel, VHP, 5stelle, RoomKey, Engisoft, NewHotel, Comanche. 2-way vs 1-way per PMS not listed. | https://upsellguru.com/integrations/ |
| Other integrations | Guest communication and CRM: Salesforce, Campaign Monitor, Dailypoint, Serenata CRM, Bookboost, AKS. Channel managers (fallback if PMS missing): SiteMinder, STAAH, hapi. Pricing and data: RIMS, HQ revenue, Infinito, Data Studio, Slack, IDeaS. | https://upsellguru.com/integrations/ |

## 3. Pricing and model

| Item | Price | Source |
|---|---|---|
| Silver: Pre-Arrival and In-Stay upselling, guest communications | EUR 2.30 per room per month (yearly billing) | https://upsellguru.com/pricing/ |
| Gold: Silver plus On-Arrival upselling | EUR 3.50 per room per month (yearly billing) | https://upsellguru.com/pricing/ |
| Platinum: Gold plus front desk upselling training | EUR 8 per room per month (yearly billing) | https://upsellguru.com/pricing/ |
| Monthly billing | "+20%" toggle on the pricing page | https://upsellguru.com/pricing/ |
| One-time fees | "On-Arrival Agent Launch Training (On-Site) one-time fee" and "1:1 Front Desk Coaching Sessions one-time fee", amount not stated; Professional Services "GOLD (Additional fees apply)" | https://upsellguru.com/pricing/, https://upsellguru.com/professional-services/ |
| Apaleo store plans (different names and prices) | Starter Package EUR 1 per room per month; UpStart EUR 1.5 per room per month with "150 EUR minimum fee" (also shown as "$150"); UpSuite 360 EUR 4.5 per room per month | https://store.apaleo.com/apps/upsellguru |
| Setup fee | None: "No setup fees and lock-in contracts", "Completely FREE setup" | https://store.apaleo.com/apps/upsellguru |
| Commission model | Apaleo: "Flexible payment models". Roommaster says "commission on the upsell revenue it generates" (third party, not confirmed on upsellguru.com) | Apaleo store, Roommaster |
| Free trial | Not found. "Starter Package" on Apaleo is described as "Try our pre-arrival upselling platform with lite access" | Apaleo store |
| Main CTA | "Contact us for detailed pricing and a personalized quote", "Book a Call" | Pricing page |

Model: per-room monthly subscription, tiered by program, plus one-time training fees. Possibly commission on request.

## 4. Claims and metrics

| Claim | Label | Where |
|---|---|---|
| 1000+ hotels, 50 countries | vendor reported | Homepage, About |
| Silver 4x-12x ROI, Gold 6x-20x ROI, Platinum 10x-40x ROI ("Average Impact") | vendor reported | Pricing |
| "Hotels typically see an ROI of 5x-12x on their investment or a 2-4% REVPAR contribution" | vendor reported | FAQ |
| Online registration card "boosts upsells by 20%" | vendor reported | Homepage |
| Top producing hotels: pre-arrival conversion 14.47%, in-house conversion 29.25% | vendor reported | Apaleo store |
| Althoff Hotels: pre-arrival conversion averaging 5%, top properties 8%; 80% of upsells on premium rooms and room features; "near 85% profit flow through" | vendor reported | Althoff case study, 21 January 2025 |
| JW Marriott Savannah (419 rooms): "From $0 to $100,000 in upselling revenue within months" | vendor reported | "Zero to Six Figures", 14 January 2026 |
| LUX* Resorts: "we've seen tripling of these revenues and beyond that" (SVP quote, no base figure) | vendor reported | "No More Money Left on the Table", 16 January 2026 |
| The Mayfair House (179 rooms): 15% conversion of arrivals, 95% of upsells room related, +$31 revenue per arrival, $82 average extras spend, $287 per upsold reservation for upgrades | vendor reported | Mayfair case study, 16 September 2024 |
| St. Ermin's (331 rooms): GBP 83 average upsell per night, GBP 48,000 average monthly upsell revenue, about 30% pre-arrival and 70% on-arrival, 80% room related | vendor reported | St. Ermin's case study, 2 July 2024 |
| On-site training "typically spans 2-3 days" | vendor reported | Professional Services FAQ |
| Hotel Tech Report: 4.9 out of 5 from 41 reviews, HT Score 74, ranked 9 of 65 in Upselling Software | counted (third party) | Hotel Tech Report |
| HTR segment ranks: 7 of 12 Small, 10 of 16 Mid-sized, 11 of 13 Large, 9 of 17 Luxury, 7 of 17 Europe, 7 of 7 Asia Pacific | counted (third party) | Hotel Tech Report |

## 5. Landing page teardown (https://upsellguru.com/)

| Element | Detail |
|---|---|
| Hero headline | "Smarter Upselling" with a rotating line "Pre-Arrival / On-Arrival / In-Stay" |
| Subhead | "Win-Win-Win: Increase your profit effortlessly by having happier guests that are willing to spend more. The way it should be!" then "Our pre-arrival, on-arrival, and in-stay products deliver just that every time: More profit. Happier guests. Less effort for you." |
| Section order | 1. Hero with two CTAs. 2. "Join the success stories of 1000+ hotels" logo strip (Althoff, AMResorts, Autograph Collection, Best Western, Ascott, HEI, Malmaison, LUX*, Village Hotel Club, Danubius). 3. "Revenue Potential" calculator (room count, ADR, occupancy, outputs pre-arrival, on-arrival, combined yearly revenue and yearly ROI ranges). 4. "Upselling When and Where it matters" (Pre-Arrival, On-Arrival, In-Stay blocks with bullets). 5. "UpsellGuru Platform: Your One-Stop Upselling Hub" (four tiles plus screenshots). 6. "Why Choose UpsellGuru?" (five reasons). 7. Case Studies (Althoff featured, four more). 8. Testimonials (eight unattributed quotes). 9. Closing CTA "Ready To Elevate Your Guest Experience, Revenue, And Profits?" |
| CTAs | "Book a Call" (header and closing), "Learn More" (hero and each program), "View Case Study", "Book a Demo" on FAQ and About |
| Proof | 10 brand logos, revenue calculator, five case studies with figures, eight testimonials with no names on the homepage |
| Calculator, demo, lead magnet, trial | Revenue Potential calculator on the homepage. Call or demo only. No free trial. Features page offers "Schedule a free consultation". |
| Guarantee | None found. Risk reversal is "No setup fees and lock-in contracts" (Apaleo listing) |
| Tone | Friendly, benefit-led, "win-win-win", training and culture heavy ("Upselling Culture"), gamification language for bidding |
| Quality slip | The public FAQ contains an unedited placeholder: "[name your actual top integrations here, e.g. Opera, Mews, Cloudbeds]" (checked 1 October 2026) |

## 6. Hook, guarantee and lead magnet

- Hook: guest bidding ("Dynamic bidding = Gamification = Higher Profits, happier guests") and "Smarter Upselling" across three stages.
- Lead magnet: homepage Revenue Potential calculator that outputs yearly revenue and ROI ranges from room count, ADR and occupancy.
- Risk reversal: no setup fee, no lock-in, free setup, "Flexible payment models" (Apaleo).
- Service hook: a dedicated Customer Success Consultant and on-site training, sold as part of Gold and Platinum.
- Free consultation call.
- Guarantee: not found.

## 7. Weaknesses and gaps

| Weakness | Evidence |
|---|---|
| Payment flow undocumented | No public description of how guests pay, whether card is captured, or who is merchant of record. A reviewer asks for manual transactions to "automatically post to the PMS". |
| Rigid emails | HTR review: "emails are relatively rigid in look and feel". HTR AI summary: "lack of customization in email templates". |
| Limited 2-way PMS coverage | HTR AI summary cites "limited two-way PMS integrations". 1-way means "requires hotel to update upgrades in the PMS". The site does not say which PMS are 2-way. |
| Reporting depth | HTR AI summary: "necessity for enhanced reporting features". Reviewer wants pricing optimization insights. |
| Small vendor, weak HTR position | 13 employees, 41 reviews, ranked 9 of 65, and ranked 11 of 13 for large hotels and last for APAC (counted). |
| AI only for staff | AI is used for front desk coaching, not to personalize or price guest offers. |
| Pre-arrival focus | Roommaster: reviewers note "it is focused mainly on the pre-arrival window". |
| Pricing inconsistency | Website tiers (EUR 2.30, 3.50, 8) differ from Apaleo tiers (EUR 1, 1.5, 4.5, EUR 150 minimum) and third-party claims of commission pricing. |
| Sloppy web content | Placeholder text left in the public FAQ. Homepage testimonials carry no names. Site blocks automated fetches with a CAPTCHA. |
| Bid friction | Bidding adds a step and uncertainty for the guest (accept or decline later). Not a fit for instant purchase of extras. |

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:
- The homepage revenue calculator (rooms, ADR, occupancy to yearly revenue and ROI range). UpLayer can use it as the free-tool lead magnet.
- Tier ROI ranges on the pricing page to frame price against return.
- Auto-Pilot rules: accept, wait or reject an upgrade based on availability and a floor price.
- Case study format with conversion percentage, revenue per arrival, and revenue per upsold reservation.
- Focus on high-margin room items (upgrades, early check-in, late check-out, room attributes) as the default offer set.
- Agent incentive tracking if UpLayer ever adds a front desk view.

Beat them:
- Instant checkout with payment on the landing page, plus UpLayer's pay-now discount vs pay-at-arrival choice. UpsellGuru documents neither.
- AI that generates the offer and copy per guest, not only a staff training coach.
- A fully custom, conversion-designed landing page per guest, against "relatively rigid" email templates. This plays to UpLayer's design strength.
- Clear, single public pricing. UpsellGuru shows two different price lists.
- Note on "triple": UpsellGuru already publishes a LUX* quote claiming "tripling of these revenues" (vendor reported). UpLayer's 3x promise needs its own measured proof to stand out.

## 9. Sources

All checked 1 October 2026.

| URL | What it gave |
|---|---|
| https://upsellguru.com/ | Hero, sections, logos, calculator, testimonials |
| https://upsellguru.com/pricing/ | Tier prices, ROI ranges, feature matrix |
| https://upsellguru.com/features/ | Feature list, Auto-Pilot, dynamic pricing, reporting |
| https://upsellguru.com/integrations/ | PMS, CRM, channel manager, RMS logos and FAQ |
| https://upsellguru.com/pre-arrival-upselling/ | Bidding flow, FAQ |
| https://upsellguru.com/front-desk-upselling/ | On-arrival, AI Voice Coach, incentives |
| https://upsellguru.com/in-stay-upselling-services-guest-experience-solutions-upsellguru/ | In-stay channels |
| https://upsellguru.com/in-house-communication/ | In-stay channels |
| https://upsellguru.com/professional-services/ | Training and CSC, fees |
| https://upsellguru.com/faqs/ | ROI claim, customers, placeholder text |
| https://upsellguru.com/about-us/ | Founders, funding, footprint |
| https://upsellguru.com/category/case-studies/ | Case study list |
| https://upsellguru.com/driving-profitability-through-personalized-upselling-althoffhotels-success-with-upsellguru/ | Althoff metrics |
| https://upsellguru.com/no-more-money-left-on-the-table/ | LUX* tripling quote |
| https://upsellguru.com/zero-to-six-figures-2/ | JW Marriott Savannah metrics |
| https://upsellguru.com/a-recipe-for-upselling-success-the-mayfair-house-hotel-garden/ | Mayfair metrics |
| https://upsellguru.com/a-recipe-for-success-st-ermins-hotels-upselling-journey-with-upsellguru/ | St. Ermin's metrics |
| https://store.apaleo.com/apps/upsellguru | Alternate pricing, conversion claims, no setup fee |
| https://hoteltechreport.com/revenue-management/upselling-software/upsell-guru | Rating, rank, reviews, AI summary |
| https://runnr.ai/blog/best-hotel-upsell-software-europe | Third-party summary, Auto-Pilot floor and ceiling |
| https://www.roommaster.com/blog/best-hotel-upsell-software | Third-party summary, commission claim |
| https://hoteltechnologynews.com/2025/10/plusgrade-acquires-oaky-to-build-unified-hotel-upsell-platform/ | Market positioning ("niche with bid-based upgrades") |
| Capterra, G2, Trustpilot | Not found. Pages returned 403 to automated access and the search budget was exhausted |
