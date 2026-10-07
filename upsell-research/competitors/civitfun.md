# Competitor: Civitfun (Upselling and Cross-selling)

Checked 1 October 2026.

Punctuation note: quotes are verbatim except where Civitfun's copy used a dash, which is replaced with a comma.

## 1. What it is

Civitfun (Palma de Mallorca, Spain, founded 2014 by Mariano de Oleza, Germán March and Xavi Gómez) is an online check-in and check-out suite for hotels, hotel chains and vacation rentals. Upselling and Cross-selling are two add-on modules that sit inside the online check-in flow or run alone from a link. Its core is two-way PMS integration, document scanning, ID verification, digital signature, guest registration with police authorities, payments and tourist tax, door opening and a tablet kiosk (T-Paperless). Since 14 May 2025 it has been part of HBX Group (Hotelbeds), the B2B travel distribution company. Buyers are mostly mid-size and large Spanish hotel chains and resorts: named clients include Meliá, Barceló, PortAventura World, Lopesan, ILUNION, Sercotel, NN Hotels, R2 Hotels and Ferrer Hotels, plus logos for Accor, IHG, Hyatt Spain, Hard Rock Hotels and Room Mate. It also serves small hotels and vacation rentals. Vendor reported scale: "+3,000 hotels", "250,000 rooms", "+30 countries", "5 million online check-ins processed", "30 Civitfun employees" (about-us page). The same page also says "more than 1,500 hotels and holiday apartments", the integrations pages say "over 3,500 hotels", and the HBX announcement says "more than 3500 clients across 36 countries". All of these are vendor reported and they do not agree with each other. Hotel Tech Report reviewers are from Spain (4), Italy, Costa Rica and Georgia (counted). HotelMinder recommends it for "midscale properties" in "Europe".

## 2. Features

### 2.1 Feature table

| Area | What Civitfun does | Source |
|---|---|---|
| Upsell types | Room upgrades only, in practice. Hotel creates every room type with its PMS room ID, then sets which room can upgrade to which, and a price per Night, Week or Entire Stay. The marketing page also says "superior room, full board, spa access", and the homepage says "room, diet, etc.", but the help center configuration covers room types only | Academy: Room Creation and Upselling Opportunities |
| Cross-sell types | Three item types: Service (per person, with time slots and capacity), Product (per item, with quantity limit), Transfer (one way, return, round trip, per person). Items can be the hotel's own or third-party experiences, but there is no marketplace and no partner commission | Academy: Service, Product and Transfer Creation; cross-selling page |
| Surfaces | (a) Inside online check-in, offers shown right after the check-in form. (b) Standalone link: upsell.civitfun.com and cross-sell.civitfun.com, with a deeplink carrying hotel slug, booking code and arrival date. (c) Inside T-Paperless tablet check-in at the desk (implied by suite, not documented for upsell) | Academy: Upselling Module; Upselling Guest Communication Strategies |
| Channels | Email only, through Guestlink. Guests can also arrive through check-in links that Civitfun pushes into Booking.com, Expedia, HBX and other channels. SMS: not found. WhatsApp: not found. Guest app: not found, it is a web flow | Guestlink page; Academy home ("Check-in Channels") |
| Timing triggers | Guestlink pre-stay emails at 24, 48 and 72 hours before arrival. The documented upsell and cross-sell templates are fixed at "Upsell 48h before entrance date" and "Cross-sell 48h before entrance date". Intra-stay and post-stay emails exist but are framed for check-out and reviews. No booking-time trigger found | Guestlink page; Academy articles |
| Personalization and AI | Marketing says "personalized upselling", but what the docs describe is a static rule: a guest who booked room type A sees the upgrades the hotel mapped to A, at the fixed price. No guest profile, segment, channel, length-of-stay or price-elasticity logic found. AI is mentioned only for "AI-powered document scanning" in the Meliá story. No AI offer generation found | Academy: Room Creation; Meliá story |
| Payment options | Marketing: guest "optionally decides to pay at the moment or later". Help center: the guest only sends a request, and the payment link arrives in the approval email after the hotel approves, and only if the hotel also buys the Payment Protection module. The hotel must add the charge to the PMS reservation manually or the link shows nothing. Pay-at-hotel is the default fallback. Prepay discount: not found. Deposits: not found | Upselling page; Academy: Manage Upselling Requests |
| Merchant of record | The hotel. Payments run through the hotel's own gateway (Stripe, Adyen, Redsys, Paycomet, Sipay, Trust Payments, Addon Payments, Planet Payment, Mercado Pago, Webpay, Montevideo Comm, Paytef, counted from logos), and "you receive the payment in your bank account" | Payment integrations page; Payment Protection page |
| Auto vs manual approval | Manual only. Every upsell and cross-sell request lands as Pending, the hotel gets an email, and staff click Approve or Reject in the dashboard. Approved requests are written to the PMS as a note, not as a rate or room change. No auto-approve option found | Academy: Upselling Module; Manage Upselling Requests |
| Inventory checks | Not for rooms. Upgrade availability is not checked against PMS inventory, which is why approval is manual. Cross-sell services and transfers have per-slot capacity ("Total available persons per slot"), products have a per-booking quantity cap | Academy: Room Creation; Service, Product and Transfer Creation |
| Admin panel | Dashboard sections: Rooms (name, description, up to 5 photos, PMS ID, amenity and feature icons, upgrade targets and prices, active or disabled, bulk actions), Items (services, products, transfers, terms, slots, prices), Upsell Status and Cross-Selling Status (approve, reject), Appearance (logo, corporate colors), Guestlink (templates, scheduling, translations for every enabled language), Reports | Academy articles |
| Analytics | Reports panel: total upsells, pending, rejected, upsell revenue, upsells by day, top 3 grouped by status and by room type. Same for cross-sell plus bestsellers. No conversion rate, no take rate per offer, no A/B test, no revenue attribution found | Academy: Tracking Reports |
| Integrations | "Two-way" with "more than 70 PMS" (product pages), "more than 50 PMS" (homepage), "60 PMS" (HBX press), all vendor reported. PMS logos on the integrations page (counted, 51): 5stelle, Apaleo, Avaibook, Avalon, Avirato, Beds24, Bookipro, Cloudbeds, CQR, CTM, Deversor, DF Sistemes, Elektraweb, Ericsoft, FrontHotel, Green Software, GrupHotel, Grupo SIME, Guest Hotel Software, Guestline, GuestPro, Host, Hoteliga, Hotelizer, HStays, Innovaciones Informáticas, MasterYield, Mews, Mini Hotel, Noray, Octorate, Ofihotel, Oracle (Opera), OTA Sync, Othello, Passepartout, Protel, Quohotel, RMS, RoomCloud, Roomdoo, Sihot, Suitech, Tec-Soft, Timon Hotel, Totvs, Ubikos, Ulyses Cloud, Verial, Winhotel, WuBook. Also 12 payment gateways (counted) and lock systems. Civitfun Hub sells the same integrations as one API to OTAs and guest apps (claims "more than 100 PMS") | PMS integrations page; Civitfun Hub page |

### 2.2 Guest journey (vendor described)

1. "Enters the booking information through a unique link."
2. "Reviews the upgrade offer available and choose the option that best suits their needs."
3. "Optionally decides to pay at the moment or later and the data is sent directly to the PMS, updating the reservation immediately."
4. "Upselling completed."

The help center contradicts step 3: the request is pending until staff approve it, payment is a later email link, and the PMS gets a note.

## 3. Pricing and model

| Item | Detail | Source |
|---|---|---|
| Model | SaaS subscription per property. No commission on upsell revenue found | apaleo Store |
| Listed price | "90 €/monthly Per property" (vendor reported, apaleo Store listing, covers the Civitfun app on apaleo, modules not itemized) | https://store.apaleo.com/apps/civitfun-hospitality |
| Public pricing on own site | Not found. Every CTA is "Request a demo" | en.civitfun.com |
| Third-party view | HotelMinder: pricing "isn't publicly available", "will depend on several factors such as number of rooms, requested integrations, location". Hotel Tech Report: "priced lower than the average product in the category" | HotelMinder; Hotel Tech Report |
| Module add-ons | Upselling and Cross-selling are separate products. Payment links require the separate Payment Protection module. Pricing of each: not found | Products page; Academy |
| Hidden costs (review) | A Spanish 200 to 499 room hotel reports having to buy an extra paid interface from its PMS vendor to use Civitfun, found only in contract fine print | Hotel Tech Report review |
| Setup fee | Not found. One Italian reviewer mentions an "advance payment via bank transfer" | Hotel Tech Report review |
| Free trial | Not found for hotels. Civitfun Hub (the API for OTAs) has a "Sign up for free" button | Civitfun Hub page |

## 4. Claims and metrics

| Claim | Where | Label |
|---|---|---|
| Reduce front desk workload by 40% | Homepage | vendor reported |
| Decrease reception paper usage by 70% | Homepage | vendor reported |
| "Monetize 50% more than in the traditional way" | Homepage | vendor reported |
| Decrease fraud and chargeback by 90% | Homepage, Payment Protection page | vendor reported |
| "Increase your revenue by €3,000 per month" | Homepage | vendor reported, no basis given |
| Improve guest rating ratios by 90% | Homepage | vendor reported |
| 95% customer satisfaction | Homepage | vendor reported |
| 5 million check-ins completed | Homepage, about-us | vendor reported |
| +3,000 hotels, 250,000 rooms, +30 countries, +70 integrations, 30 employees | About-us | vendor reported |
| More than 1,500 hotels and holiday apartments | About-us body text | vendor reported |
| Over 3,500 hotels worldwide | PMS and payment integrations pages | vendor reported |
| 60 PMS, more than 3,500 clients, 36 countries | HBX acquisition coverage (Travel Daily News) | vendor reported |
| More than 100 PMS via Civitfun Hub | Civitfun Hub page | vendor reported |
| "80% of guests return to hotels for personalized experiences and services" | Cross-selling page, no source cited | vendor reported |
| Sercotel: +35% check-in conversion vs prior native app, 14.5% online check-in growth 2023 vs 2024, 68% completed check-in conversion, +6,200 rooms | Sercotel story | vendor reported |
| Lopesan: 26% of bookings completed online check-in, 169.93% check-in growth 2023 vs 2024, EUR 18,286 paper and ink saved in 2024, 2,825 hours saved in 2024, +16% TTV, +16% direct bookings, 6% conversion rate, live in 65% of chain, 20 hotels, +7,000 rooms | Lopesan story | vendor reported |
| NN Hotels: 85% of bookings via Civitfun check-in, +194.5% check-ins 2023 vs 2022, 90% mobile, 9% computer, 1% tablet, 12 hotels and 1 apartment building, +1,200 rooms | NN Hotels story | vendor reported |
| Meliá: digital check-in used for "nearly 90% of arrivals" in recent Dominican Republic rollouts | Meliá story | vendor reported |
| Barceló: "over 100 hotels" live | Homepage testimonial | vendor reported |
| Upsell or cross-sell revenue for any named client | All case studies checked | not found |

No case study publishes an upsell revenue number. Every published result is about check-in adoption, paper and staff time.

## 5. Landing page teardown

### 5.1 Upselling page (https://en.civitfun.com/products/upselling/)

| Element | Detail |
|---|---|
| Hero headline | "Hotel upselling software" |
| Subhead | "Enhance your guests' experience and boost your revenue per booking" |
| Supporting line | "Offer your guests a superior stay with personalized upselling, improve your reviews, and increase your RevPAR effortlessly." |
| Section order | Hero, "Automated upselling solution" ("Increasing your revenue and improving your reviews, made easier"), video block "Experience Civitfun's suite in action", "How Upselling works" with 4-step guest journey, "Benefits of Upselling" with 6 benefit tiles, "Clients and Partners" with 3 story cards, closing CTA, footer |
| CTAs | "Request a demo", 3 times (counted). No other CTA |
| Proof | Story cards: PortAventura World, Sercotel ("BOOSTING ONLINE CHECK-IN CONVERSION"), "Insights from hoteliers" on Spanish regulations. None are about upselling. No number on the page |
| Benefits list | Better reviews and satisfaction, Revenue growth, Automated with no manual tasks, Two-way integration with PMS, Paper savings at the front desk, Streamlined processes and operations |
| Calculator | None |
| Demo | Request a demo form, plus an embedded product video |
| Lead magnet or trial | None |
| Guarantee | None |
| Tone | Generic, operations-first, feature-light. Phrases like "increase your revenue without you even realizing it" and "Avoid free upsells". Revenue is a soft benefit next to paper savings |

### 5.2 Cross-selling page (https://en.civitfun.com/products/cross-selling/)

| Element | Detail |
|---|---|
| Hero headline | "Hotel cross-selling software" |
| Subhead | "Personalize your guest's stay and increase the value of your bookings" |
| Supporting line | "Offer your guests the perfect experience by providing extra services and activities with our cross-sell solution for hotels. Generate more revenue per booking with less effort." |
| Section order | Hero, "Automated cross-selling for hotels" ("A custom-made adventure impossible to forget"), video block, "How Cross-selling works" ("Unforgettable stays, satisfied guests") with 4-step journey, "Benefits of Cross-selling" with 6 tiles, "Clients and Partners", closing CTA |
| CTAs | "Request a demo", 3 times (counted) |
| Proof | Same three story cards. Two numbers: "80% of guests return to hotels for personalized experiences and services" (unsourced) and "integrated with more than 70 PMS" |
| Calculator, trial, lead magnet, guarantee | None |
| Tone | Same template as upselling page, slightly warmer travel language ("Gastronomic experiences, transfers, excursions") |

### 5.3 Homepage hero for context

"Online check-in software for hotels", subhead "The contactless check-in software that revolutionizes hotel digitization". Upselling is one of 17 feature tabs. The homepage carries the stat strip (40%, 70%, 50%, 90%, EUR 3,000, 90%) and three named testimonials (Pablo Pérez, NN Hotels; Robert Magi, PortAventura World; Álvaro Montalvo, Barceló), none about upsell revenue.

## 6. Hook, guarantee and lead magnet

| Lever | What they use |
|---|---|
| Hook | Compliance and front desk relief, not revenue. "Get your accommodation ready for the new Spanish guest registration law" (RD 933/2021) runs across the blog. Upsell rides along as a module |
| Distribution hook | Check-in links pushed through Booking.com, Expedia, HBX and other channels so the hotel "reaches 100% of their bookings" (HBX announcement) |
| Guarantee | Not found |
| Lead magnet | Not found on product pages. Blog content such as "8 Examples of upselling for hotels" (2023) and Spanish regulation guides |
| Free trial | Not found for hotels |
| Entry offer | Demo request only |

## 7. Weaknesses and gaps

### 7.1 From reviews

Hotel Tech Report: 3.3 from 7 reviews on the profile page (counted on 1 October 2026), 4 excellent, 1 average, 2 terrible. No Civitfun listing found on Capterra, G2, GetApp, Software Advice or Trustpilot (Trustpilot returns 404).

| Theme | Quote | Source |
|---|---|---|
| Hidden PMS costs, poor transparency | "we were never informed that we would need to assume additional costs from our PMS provider... this requirement is something Civitfun is fully aware of, but it's relegated to the fine print of the contract" | Hotel Tech Report, IT Manager, 200 to 499 room hotel, Spain, about 1 month ago |
| Failed implementation | "One of them never even had the service operational... The other one suffered so many problems for approximately six months" | Same review |
| Low guest uptake | "people just dont use it. We had conversion rates of people who check-in far lower than the advertised rates" | Hotel Tech Report, CEO, 5 to 9 room boutique, Georgia |
| Hard to cancel | "I literally had to send 4 e-mails asking the exact same thing: 'Cancel my subscription please'" | Same review |
| Contract opacity, absent rep | "The contract is structured so that the bulk of the costs are not highlighted... once the package was sold, the contact seller for Italy became practically unavailable" | Hotel Tech Report, owner, 50 to 74 room hotel, Sanremo, Italy |
| Positive | "reliable, easy to set up, and user-friendly" | Hotel Tech Report, revenue manager, 100 to 199 room boutique, Barcelona |

No review mentions upselling or cross-selling at all (counted, 0 of 7).

### 7.2 Missing features

| Gap | Evidence |
|---|---|
| No instant purchase. Every upsell is a request that staff must approve, then the guest gets a second email to pay | Academy: Upselling Module |
| Payment is an extra module, and staff must add the charge to the PMS by hand before the link works | Academy: Manage Upselling Requests |
| No prepay discount, no pay-upfront vs pay-at-arrival choice with different prices | Not found anywhere |
| No real personalization or AI. Static room-to-room mapping with fixed prices | Academy: Room Creation |
| Email only, one fixed 48 hour slot for upsell. No SMS, no WhatsApp, no booking-time or multi-touch sequence | Guestlink page; Academy |
| No live inventory check for room upgrades | Academy; manual approval is the workaround |
| Writes a note to the PMS, not a room or rate change | Academy |
| Thin analytics, no conversion rate or revenue per offer | Academy: Tracking Reports |
| No upsell proof. Zero published upsell revenue numbers | All case studies |
| Product owned by a distributor (HBX Group), roadmap tied to check-in and distribution | HBX announcement |

## 8. What UpLayer should copy, and where UpLayer can beat them

### 8.1 Copy

| Item | Why |
|---|---|
| Standalone deeplink with booking code and arrival date that auto-searches the reservation | Zero-login landing, works from any channel |
| Upgrade mapping per PMS room type with price per Night, Week or Entire Stay | Simple mental model hotels already understand |
| Item types with slots and capacity (service, product, transfer) | Covers the cross-sell catalogue cleanly |
| Hotel stays merchant of record through its own gateway | Avoids MoR liability, hotels like money in their own account |
| Pushing links into OTA confirmation flows | Reaches OTA guests whose email the hotel does not have |
| Translations per enabled language for every offer | Table stakes for European leisure hotels |

### 8.2 Beat them

| Where | UpLayer angle |
|---|---|
| Instant purchase | Guest pays and is confirmed in one step. Auto-approve when inventory allows, manual only for edge cases |
| Two-price payment choice | Pay upfront at a discount or reserve and pay at arrival at full price. Civitfun has nothing like this |
| Real personalization | AI picks and orders the offer per guest (party, stay length, channel, purpose, past behavior) and writes the copy, versus Civitfun's static mapping |
| Channels and timing | Email plus SMS, multiple touches from booking to arrival, versus one 48 hour email |
| Revenue-first proof | Civitfun has no upsell numbers at all. A transparent upsell revenue dashboard with take rate per offer, and published client results, is an open lane |
| Transparent pricing | Reviews punish Civitfun for hidden PMS fees and fine print. Publish pricing and name any PMS interface cost up front |
| Easy exit | Month-to-month, one-click cancel, directly against the "4 e-mails" complaint |
| Independent of check-in | Civitfun buyers buy check-in and get upsell as a tick box. UpLayer can sell to hotels that already have check-in from Civitfun, Chekin or their PMS and only want upsell revenue |

## 9. Sources

All checked 1 October 2026.

| URL | What it gave |
|---|---|
| https://en.civitfun.com/products/upselling/ | Upselling page copy, journey, CTAs |
| https://en.civitfun.com/products/cross-selling/ | Cross-selling page copy, 80% and 70 PMS claims |
| https://en.civitfun.com/ | Homepage stats, testimonials, feature list |
| https://en.civitfun.com/products/ | Product suite, Payment Protection 90% claim |
| https://en.civitfun.com/products/guestlink/ | Email timing 24, 48, 72 hours, client logos |
| https://en.civitfun.com/products/payment-protection/ | Payment flow, Scan and Pay |
| https://en.civitfun.com/pms-integrations/ | PMS logos, 70 PMS, 3,500 hotels |
| https://en.civitfun.com/payment-integrations/ | Payment gateway logos |
| https://en.civitfun.com/civitfun-hub/ | Integration API, 100 PMS, free sign-up |
| https://en.civitfun.com/solutions/hotel-chains/ | Chain positioning |
| https://en.civitfun.com/about-us/ | Founders, history, scale numbers |
| https://en.civitfun.com/clients-and-partners/customer-stories/ | Case study list |
| https://en.civitfun.com/clients-and-partners/customer-stories/sercotel/ | Sercotel metrics |
| https://en.civitfun.com/clients-and-partners/customer-stories/lopesan-hotel-group/ | Lopesan metrics |
| https://en.civitfun.com/clients-and-partners/customer-stories/nn-hotels/ | NN Hotels metrics |
| https://en.civitfun.com/clients-and-partners/customer-stories/portaventura/ | No metrics returned |
| https://www.civitfun.com/blog/en/melia-success-story/ | Meliá, AI document scanning, 90% of arrivals |
| https://www.civitfun.com/blog/en/civitfun-joins-hbx-group/ | HBX acquisition, 14 May 2025 |
| https://www.civitfun.com/blog/en/8-examples-of-upselling-for-hotels/ | Upsell content marketing |
| https://www.civitfun.com/productos/upselling/ | Spanish upselling page, same structure |
| https://academy.civitfun.com/hc/en-gb | Help center structure |
| https://academy.civitfun.com/hc/en-gb/articles/18607269226013-Upselling-Module | Request, approve, note to PMS |
| https://academy.civitfun.com/hc/en-gb/articles/17699479259933-Room-Creation-and-Upselling-Opportunities | Room setup, upgrade pricing |
| https://academy.civitfun.com/hc/en-gb/articles/17699640585757-Manage-Upselling-Requests-Approve-or-Reject | Manual approval, manual PMS charge |
| https://academy.civitfun.com/hc/en-gb/articles/17699484168861-Tracking-Reports-Upselling-Metrics-and-Bestsellers | Upsell reports |
| https://academy.civitfun.com/hc/en-gb/articles/18607278917533-Upselling-Guest-Communication-Strategies | 48 hour email, deeplink format |
| https://academy.civitfun.com/hc/en-gb/articles/18934432969501-Using-Upselling-Module-Independently | Standalone module |
| https://academy.civitfun.com/hc/en-gb/articles/20048790472477-Cross-Selling-Module | Cross-sell flow |
| https://academy.civitfun.com/hc/en-gb/articles/20079267281053-Service-Product-and-Transfer-Creation | Item types, slots, capacity |
| https://academy.civitfun.com/hc/en-gb/articles/20102384984733-Manage-Cross-Selling-Requests-Approve-or-Reject | Cross-sell approval |
| https://academy.civitfun.com/hc/en-gb/articles/20103283790365-Tracking-Reports-Cross-Selling-Metrics-and-Bestsellers | Cross-sell reports |
| https://academy.civitfun.com/hc/en-gb/articles/20103456288029-Cross-Selling-Guest-Communication-Strategy | 48 hour cross-sell email |
| https://store.apaleo.com/apps/civitfun-hospitality | EUR 90 per month per property |
| https://www.hotelminder.com/partner=Civitfun | Pricing not public, 50 PMS, recommended for midscale Europe |
| https://hoteltechreport.com/guest-experience/contactless-checkin/civitfun | 3.3 from 7 reviews, review quotes |
| https://www.traveldailynews.com/technology/hbx-group-integrates-civitfun-into-its-portfolio-to-digitalise-hotel-operations-and-improve-guest-experience/ | 60 PMS, 3,500 clients, 36 countries |
| https://www.phocuswire.com/hbx-group-acquires-civitfun | Returned 403, used search snippet only |
| https://www.trustpilot.com/review/civitfun.com | 404, no listing |
