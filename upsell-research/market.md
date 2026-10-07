# Hotel pre-arrival upsell platform, market and evidence base

Status: initial research, checked 1 October 2026. Scope is the evidence base for an AI-personalized pre-arrival upsell product for hotels (booking data in from PMS or channel manager, personalized email or SMS offer, offer landing page, payment on platform with a pay-now discount or pay-at-arrival option). Per-competitor teardowns are out of scope and live elsewhere.

Labels used on every number:

- **Counted**: a census, filing, or statistics agency count.
- **Benchmark**: an aggregated industry dataset from a research firm (CBRE, HotStats, STR, Knight Frank).
- **Vendor reported**: a figure published by a software vendor about its own customers. Not independently verified, usually selected, usually best case.
- **Estimate**: UpLayer's own arithmetic from the figures above. Method shown.

---

## 1. Baseline, how much ancillary and upsell revenue a hotel makes

### 1.1 Revenue mix by segment

| Metric | Value | Segment, period | Label | Source |
|---|---|---|---|---|
| Rooms revenue as share of total operating revenue | 68.1% | US, all hotels in CBRE Trends sample, 2015 | Benchmark | CBRE via Revenue Hub [S1] |
| Rooms revenue as share of total | over 97% | US limited-service and extended-stay, 2015 | Benchmark | CBRE via Revenue Hub [S1] |
| Rooms revenue as share of total | 51.8% | US resorts, 2015 | Benchmark | CBRE via Revenue Hub [S1] |
| Other operated departments (spa, parking, retail, golf, etc) as share of total | 4.3% (down from 5.2% in 2010) | US, CBRE Trends sample, 2016 | Benchmark | CBRE, R. Mandelbaum [S2] |
| Other operated departments as share of total | 10.1% | US resorts, 2016 | Benchmark | CBRE [S2] |
| Other operated departments as share of total | 1.4% | US limited-service, 2016 | Benchmark | CBRE [S2] |
| TRevPAR, all US hotels in P&L sample | USD 209.67 (+7.2% YoY) | US, 2024 | Benchmark | STR/CoStar HOST data, press release (page returned 403, figure taken from search index) [S3] |
| RevPAR vs TRevPAR, London | GBP 194.8 RevPAR vs GBP 249.9 TRevPAR, so rooms are about 78% of total, non-rooms about GBP 55 per available room | London, Jan to Sep YTD 2025 | Benchmark (HotStats data, skewed to upscale) | Knight Frank UK Hotel Dashboard Q3 2025 [S4] |
| RevPAR vs TRevPAR, regional UK | GBP 81.6 RevPAR vs GBP 124.7 TRevPAR, so rooms are about 65% of total, non-rooms about GBP 43 per available room | Regional UK, Jan to Sep YTD 2025 | Benchmark (HotStats data, skewed to upscale) | Knight Frank [S4] |
| F&B revenue per occupied room growth | +3.8% vs +3.0% total revenue | US full-service, resort, convention, H1 2025, sample of 866 | Benchmark | CBRE [S5] |
| Ancillary "should be" 20% to 30% of total revenue | target, not a measured average | Not stated | Vendor reported | Cloudbeds blog [S6] |

What this means:

- Most non-room revenue in a full-service hotel is F&B, mostly from walk-ins, banquets and on-property spend. That is not upsell revenue and a pre-arrival tool does not own it.
- The part a pre-arrival platform can actually touch is narrower: room upgrades, early check-in and late check-out, parking, breakfast, packages (romance, celebration), spa and experience pre-booking, transfers. In US limited-service hotels non-room revenue is under 3% of total, so the pool is thin. In resorts and upscale independents it is 10% or more of revenue before F&B.
- Per occupied room, by segment: not found as a recent primary breakdown. CBRE and HotStats publish it behind paywalls. The UK figures above are per available room.

### 1.2 How much comes from pre-arrival upselling specifically

No independent (non-vendor) measurement of pre-arrival upsell revenue as a share of hotel revenue was found. Every figure below is vendor reported.

| Claim | Value | Label | Source |
|---|---|---|---|
| Upselling programmes lift total revenue | 5% to 10%, of which pre-arrival 1.5% to 3%, on-arrival 3% to 6%, in-stay 0.5% to 1% | Vendor reported (UpsellGuru blog; seen in search index, page not machine-readable, treat as unverified) | [S7] |
| Pre-arrival upsell revenue, 5-star European hotels | EUR 29 per room per month on average, best case EUR 141 per room per month | Vendor reported (Oaky 2024 Europe report, via search index; report page now redirects) | [S8] |
| Upsell revenue per guest per month | EUR 35 to EUR 200 | Vendor reported (Oaky, cited by Runnr) | [S9] |
| Upsell revenue per booking, pre-arrival email | USD 95 (North America) | Vendor reported (Revinate 2026 benchmark) | [S10] |
| Upsell revenue per booking, confirmation email | USD 93 (North America); USD 83 average in Revinate upsells page | Vendor reported (Revinate) | [S10] [S11] |
| Average incremental revenue over booked rate, upgrade transactions | 17% per transaction, about 100 properties, 2023 | Vendor reported (Oracle Nor1 eStandby, via search index) | [S12] |
| Canary customers | USD 1,000 to USD 10,000 per month extra | Vendor reported | [S13] |

### 1.3 Estimate: a typical baseline for the ICP hotel

Estimate, method shown. A 100-room independent hotel, 70% occupancy, about 25,500 occupied room nights a year.

| Scenario | Annual pre-arrival upsell revenue | Method |
|---|---|---|
| No structured pre-arrival upsell (front desk only, or a PMS confirmation email with a static add-on) | close to zero to low five figures | Most independents have no dedicated tool. Not measured anywhere, this is an assumption to validate in discovery calls. |
| Running a mature upsell tool, upscale hotel | about EUR 35,000 a year | Oaky EUR 29 per room per month x 100 rooms x 12 (vendor reported input) |
| Running a mature upsell tool, upper bound on UpsellGuru claim | about 1.5% to 3% of total revenue, so roughly USD 45,000 to USD 90,000 on USD 3m revenue | UpsellGuru percentages (vendor reported, unverified) x assumed USD 3m total revenue |

Per occupied room night that is roughly EUR 1 to EUR 4. That is the realistic number to anchor every ROI promise to.

---

## 2. Pre-arrival upsell benchmarks

All figures vendor reported unless marked otherwise. None are audited.

### 2.1 Email and message engagement

| Metric | Value | Context | Source |
|---|---|---|---|
| Pre-arrival email open rate | 55.7% | Revinate North America benchmark | [S10] |
| Confirmation email open rate | 66.9% | Revinate North America benchmark | [S10] |
| Automated hotel email campaigns, all types | 56.6% open, 15.17% CTR | Revinate 2025 benchmark, as summarised in search index | [S14] |
| One-time marketing campaigns, for contrast | 32.2% open, 2.37% CTR | Revinate 2025 benchmark | [S14] |
| Emails with "upgrade" in the subject | 65% average open | Revinate | [S11] |
| Oaky pre-arrival email, best send day | 12 days before check-in, CTR 48%, conversion 10.6%; follow-up at 9 to 10 days, CTR 42% to 43%, conversion 12% to 11% | Oaky data published by Amadeus | [S15] |
| Oaky send time | CTR 44% to 53% midday to 2pm, up to 53% at 6pm | Oaky via Amadeus | [S15] |
| Oaky email open rate, Hard Rock hotels | 80% to 85% minimum every month | Customer testimonial on Oaky site | [S16] |
| Departure-day SMS open rate | over 50% in some cases | Runnr blog | [S9] |

Note: Apple Mail Privacy Protection inflates email open rates since 2021, so open rates are a weak signal. Click and conversion rates matter more.

### 2.2 Take rate and conversion

| Metric | Value | Source |
|---|---|---|
| Oaky average deal conversion | 10.8% before 2020 redesign, average ROI 13.8 | Oaky via Revenue Hub [S17] |
| Oaky average conversion (later claim) | 13% | Oaky, via search index [S8] |
| Duve guest app upsell conversion | 8% to 12% | Duve product page [S18] |
| Guests taking a pre-arrival upsell when offered right after booking | about 1 in 5 | Oaky, cited by Runnr [S9] |
| Late check-out opt-in via app on departure day | about 10% to 15% | Resort case, Runnr [S9] |
| Attachment rate target, share of guests buying at least one upsell | 10% to 20% "for most properties" | Cloudbeds blog, presented as target not measurement [S6] |
| Early check-in offers in conversation | 25% to 30% acceptance | Conduit, vendor reported [S19] |
| Early check-in and late check-out share of total upsell revenue | about 12% | Oaky via Runnr [S9] |
| Breakfast share of total ancillary revenue on Oaky | about 29% | Oaky via Runnr [S9] |
| F&B as the most preferred upsell category | 42% of guests | Revinate [S11] |

Working benchmark range for planning (estimate): 8% to 15% of bookings buying at least one pre-arrival item on a mature tool, with best-in-class properties near 20%.

### 2.3 Average upsell value and revenue per booking

| Metric | Value | Source |
|---|---|---|
| Upsell revenue per booking, pre-arrival email | USD 95 | Revinate [S10] |
| Upsell revenue per booking, confirmation email | USD 93 | Revinate [S10] |
| Upgrade revenue over booked rate | 17% per upgrade transaction | Oracle Nor1 [S12] |
| Average upsell revenue per guest per month, Clarion Hotel Sign | EUR 47.57 | Oaky case study [S16] |

Caveat: "revenue per booking" in Revinate's benchmark is not defined publicly. It is most likely revenue per booking that bought, not revenue per booking sent. If so, multiplied by a 10% take rate it gives about USD 9.50 per booking sent, which lines up with the EUR 1 to EUR 4 per occupied room night estimate above for multi-night stays.

### 2.4 What drives uplift

| Driver | Evidence | Strength |
|---|---|---|
| Timing | Oaky data: 12 days out gives best CTR (48%) and 10.6% conversion; a second touch 9 to 10 days out converts 11% to 12%; sending after booking rather than at booking lifts conversion by 8.23% [S15]. Offering right after booking: about 1 in 5 take an upsell [S9]. | Vendor data, large volume, decent |
| Multiple touchpoints | Revinate: confirmation and pre-arrival emails earn nearly the same USD 93 to 95 per booking, so two stages add up [S10] | Vendor data |
| Personalization | See section 3. Airline evidence: 10% to 25% more revenue per offer. Hotel evidence: vendor case studies only. | Medium in airlines, weak in hotels |
| Images and design | Oaky's 2020 redesign (upgrade tabs, vertical scroll, mobile) was said to improve conversion, but no uplift figure was published [S17] | Not found as a number |
| Price anchoring | Common practice (show on-site price next to pre-booked price). No controlled study found for hotels. | Not found as a number |
| Upfront payment | See section 4. No hotel study found on pay-now-at-discount vs pay-at-arrival for add-ons. | Not found |
| Channel | Canary claims AI messaging at The LINE SF converted 4x higher than link-based upsells [S13]. One case, vendor reported. | Weak |

### 2.5 Uplift multiples vendors claim

| Vendor | Claim | Baseline | Label | Source |
|---|---|---|---|---|
| Oaky | Hard Rock Hotel New York +360% upsell revenue in 2024, ROI 41 | Previous year, prior setup unknown | Vendor reported case | [S16] |
| Oaky | Clarion Hotel Sign +381% upsell revenue "in a few months" (front desk upselling) | Pre-tool | Vendor reported case | [S16] |
| Oaky | Anantara World Islands +62.5% | Prior period | Vendor reported case | [S16] |
| Oaky | ROI 6x to 215x | Software cost | Vendor reported | [S8] |
| Canary | "increase upsells by up to 250%", "10x ROI" | Unstated | Vendor reported | [S13] |
| Canary | Williamsburg Lodge 10x annual upsell revenue, USD 5K to USD 50K+; Brochner Hotels 5x | Pre-tool, very low base | Vendor reported case | [S13] |
| Revinate | Zoku 300% YoY upsell revenue growth; Hotel Spero upsells returned 3x their cost | Prior year | Vendor reported case | [S11] |
| Runnr | "timely, personalized upsells can boost ancillary revenue by 10% to 30% or more" | Unstated | Vendor reported | [S9] |

Pattern: every multiple of 3x or more is a single case that started from a near-zero or manual baseline. Portfolio-level claims are much smaller (10% to 30%, or "up to" figures). See the verdict section.

---

## 3. Personalization evidence

### 3.1 Airlines (the strongest evidence)

| Study | Setting | Result vs rule-based | Quality | Source |
|---|---|---|---|---|
| Kolbeinsson, Shukla, Gupta, Marla, Yellepeddi, "Galactic Air Improves Ancillary Revenues with Dynamic Personalized Pricing", INFORMS Journal on Applied Analytics 52(3), 2022 | Deepair with a major European airline (pseudonym), 6-month live deployment | +25% ancillary revenue per offer, +15% conversion vs human-curated rule-based prices | Peer reviewed, live test, but co-authored by the vendor | [S20] |
| Shukla et al., "Dynamic Pricing for Airline Ancillaries with Customer Context", KDD 2019 / arXiv 1902.02236 | Same partnership, online test | Traditional ML beat rule-based by +36% conversion and +10% revenue per offer; deep learning did better offline | Peer reviewed conference, vendor co-authored | [S21] |
| "Dynamic offer creation for airline ancillaries using a Markov chain choice model", Journal of Revenue and Pricing Management, 2022 | Model study | Relevant offers raise ancillary revenue over unsegmented pricing; irrelevant offers reduce revenue and purchase rate | Academic, simulation | [S22] |

Read-across: personalised offer selection and pricing beats rules by roughly 10% to 36% on conversion and revenue per offer in a data-rich, high-volume airline setting. That is a strong but incremental effect. It is not a 3x effect.

### 3.2 Hotels

| Evidence | Result | Quality | Source |
|---|---|---|---|
| Canary, The LINE SF | AI upsell conversion 4x higher than link-based upsells; 65% of early check-in revenue driven by AI | Single vendor case, mixes channel change (conversation vs link) with AI | [S13] |
| Revinate | "91% of customers expect relevant offers", "36% of guests will pay more for personalized experiences" | Survey claims, original survey not cited | [S11] |
| Phocuswright with Oracle Hospitality | Survey of 2,700+ US and European travellers prefers tailored services | Survey of stated preference, not behaviour; full report paywalled | via search index [S23] |
| Lopez Mateos, Cohen, Pyron, "Field Experiments for Testing Revenue Strategies in the Hospitality Industry", Cornell Hospitality Quarterly, 2022 | Describes experiment designs (property splits, alternating periods) and notes the lack of field experiments in hotels | Methods paper, no upsell uplift number | [S24] |
| Controlled study of AI personalization vs segment rules for hotel upsells | Not found | | |

Conclusion: there is no credible public, controlled evidence that AI personalization beats good segment rules in hotel upselling. The airline evidence supports a 10% to 36% improvement from personalised selection and pricing. UpLayer should plan to generate its own evidence with holdout groups (a share of bookings get the rules-based offer set) from the first pilot, because that becomes a real proof asset that competitors lack.

---

## 4. Payments

### 4.1 Pay upfront with a discount vs pay at arrival

| Finding | Label | Source |
|---|---|---|
| Prepaid bookings cancel "typically 50% lower than average" | Vendor reported, opinion of a D-Edge product manager, no method given | [S25] |
| Cancellation by channel, Oct 2024: direct 11.1%, Booking Group 37.2%, GDS 4.6% | Vendor reported (D-Edge) | [S25] |
| 680 European hotels 2014 to 2018: average cancellation rose from 32.9% to 39.6%; direct website 18.2%, Booking Holdings about 50%; bookings made 60+ days out 65% more likely to cancel | Vendor reported (D-Edge), via trade press | [S26] |
| Urrea, Huang, Zhang (2026), "The Effect of Pricing on Cancelations at a High-End U.S. Hotel", Cornell Hospitality Quarterly | Academic, paywalled, findings not read | [S27] |
| Conversion of prepay-at-discount vs pay-at-arrival for hotel rooms or add-ons | Not found | |
| Refund or no-show rate of prepaid add-ons vs pay-at-arrival add-ons | Not found | |

Implications:

- There is no published evidence that a 20% prepay discount lifts upsell conversion enough to pay for itself. A 20% discount means take rate must rise by 25% just to hold revenue flat. Treat the discount as a hypothesis and A/B test it (for example 0%, 10%, 20%) from the first pilot.
- Because about 1 in 3 OTA bookings cancels and long-lead bookings cancel more, prepaid add-ons will be refunded often. Refunds must be automatic on a booking-cancelled webhook, otherwise the hotel and the platform carry chargeback risk.

### 4.2 Who is merchant of record in this category

| Vendor | Money flow | Source |
|---|---|---|
| Duve | Stripe Connect direct charges into the hotel's own Stripe account; also Adyen and Mews Payments | [S28] |
| Oracle Nor1 | Charge posted to PMS folio, guest pays the hotel at checkout | [S29] |
| Canary | Charges posted to the folio; card tokenized and pushed into PMS | [S13] |
| Bookboost | Written back to folio (Mews, D3X) | [S30] |
| Stay (Ordering PRO) | On the hotel's own Stripe or Adyen account | [S31] |
| Cloudbeds Payments | Cloudbeds states it is "not a bank, payment institution, or money services business"; Stripe Connected Account Agreement with the hotel | [S32] |
| Apaleo Pay | Adyen, Apaleo manages merchant account, sub-merchant per property, 28-day authorisations by default | [S33] |
| UpsellGuru | Posts to PMS on acceptance (search summary only) | [S34] |
| Oaky (Plusgrade), Hudini | Not found | |

Pattern: in every verified case the hotel stays the seller. The upsell vendor is a software platform, never merchant of record.

### 4.3 Stripe Connect and Adyen for Platforms

| | Direct charges | Destination charges | Separate charges and transfers |
|---|---|---|---|
| Charge created on | Hotel's connected account | Platform account | Platform account |
| Business of record | Hotel | Platform, unless `on_behalf_of` set to hotel | Platform |
| Refunds and disputes debited from | Hotel balance | Platform (can reverse transfer to recover) | Platform |
| Typical use per Stripe | SaaS (Shopify) | Marketplaces (Airbnb, Lyft) | Multi-seller carts |

Sources: [S35] [S36]. Other points:

- Platform fee is an `application_fee_amount` on direct charges. On refund the platform keeps it unless `refund_application_fee=true` [S37].
- Liability by account type: Standard accounts carry their own fraud and dispute losses; with Express and Custom the platform does [S38]. Stripe now steers new builds to controller properties and Accounts v2, which set these liabilities explicitly.
- Adyen for Platforms uses split instructions; with none, the whole amount and fees land on the platform's liable account [S39].

### 4.4 Refunds, cancellations and card network rules

- Visa advance payment rules: at payment the guest must agree to the service description, cancellation and refund policy and refund expiry date; receipt must say "Advance Payment" or "Deposit"; full refund is required if the merchant does not keep to the terms [S40].
- Visa dispute windows (Core Rules, April 2026): 13.1 services not received, 120 days from the expected service date; 13.7 cancelled services, up to 540 days from processing [S41]. A prepaid upgrade bought 60 days before arrival stays disputable for many months after the stay.
- Visa Guaranteed Reservations (no-show charging) are reserved for lodging and vehicle rental merchant categories [S41]. A software platform selling as its own merchant cannot use them.

### 4.5 SCA under PSD2, UK and EU

| Situation | Rule | Source |
|---|---|---|
| Guest pays upfront on the offer page | Customer-initiated online card payment, SCA (3DS2) applies unless an exemption applies. UK rules: PSRs 2017 plus UK RTS, FCA | [S42] |
| Card saved now, charged at arrival without the guest present | Merchant-initiated transaction, out of SCA scope, but SCA is needed when the mandate is set up | EBA Q&A 2018_4031 [S43] |
| Stripe implementation | SetupIntent or `setup_future_usage=off_session` with a mandate stating permission, frequency and how the amount is set | [S44] [S45] |
| PSD3 and PSR | Political agreement Nov 2025, compromise texts April 2026, adoption expected 2026, application expected late 2027 or later. Law firm briefing, adoption not confirmed in the Official Journal | [S46] |

### 4.6 Card on file vs charge at arrival

| Option | Limit | Source |
|---|---|---|
| Save card (SetupIntent), charge off-session at arrival | SCA once at setup; issuer can still decline, build retry and a payment-link fallback | [S47] |
| Authorise now, capture later | 7 days online; Visa MIT holds 4 days 18 hours | [S48] |
| Extended authorisation | Up to 30 days; Visa allows it for lodging merchants; other categories pay a 0.08% Stripe fee; customer-initiated only | [S49] |
| Post to PMS folio | Hotel collects at checkout, no money passes through UpLayer | section 4.2 |

Bookings more than 30 days out cannot be held with an authorisation. They need a saved card, a folio post, or prepayment.

### 4.7 Risks for UpLayer if it collects the money

| Risk | Detail | Source |
|---|---|---|
| Chargebacks and refunds | With destination charges or separate charges, disputes hit UpLayer first; recovery depends on reversing transfers; exposure up to 540 days on advance services | [S35] [S41] |
| UK and EU licensing | The commercial agent exclusion only covers an agent acting for one side. A platform holding funds for both sides needs FCA authorisation unless exempt. Stripe Connect platforms avoid this because they do not receive funds owed to sellers | [S50] [S51] |
| US money transmission | FinCEN excludes payment processors acting by agreement with the seller through a clearing and settlement system (31 CFR 1010.100(ff)(5)(ii)(B)). State money transmitter laws: not researched, needs legal review | [S52] |
| PCI DSS | Using Stripe-hosted fields keeps scope small; handling raw card data means 300+ controls | [S53] |
| VAT and sales tax | The seller invoices and owes tax; as MoR that would be UpLayer | [S54] |
| Fraud | Platform carries fraud losses on Express/Custom or destination charges | [S38] |

### 4.8 Recommendation

1. Hotel is merchant of record. UpLayer is software.
2. Pay now: Stripe Connect direct charges on the hotel's connected account (hotel-liable configuration), with an application fee for UpLayer. SCA through Stripe Checkout or Payment Element.
3. Pay at arrival: post the item to the PMS folio where the API allows it (Mews, Cloudbeds, Apaleo, OPERA via OHIP, Stayntouch, eviivo). Where it does not (SiteMinder SMX read only), save the card on the hotel's connected account with an MIT mandate, or simply record the reservation and let the hotel charge at check-in.
4. Show the prepay discount as hotel-funded, show Visa-compliant terms at checkout, and auto-refund on booking cancellation.
5. Do not become MoR in v1. It brings licensing, chargeback, tax and fraud exposure for a 5% to 15% revenue line.

---

## 5. Integrations

### 5.1 Main PMS and channel managers

No credible vendor-level PMS market share for the US or UK was found. The only number seen is an aggregator's "Oracle 26% in 2024" (GMI), not fit to show a prospect [S55]. Skift's 2021 PMS benchmark is paywalled [S56]. Property counts below are vendor reported.

| System | Footprint (vendor reported) | Read reservations | Post charges to folio | Access and cost | Source |
|---|---|---|---|---|---|
| Oracle OPERA Cloud via OHIP | Total not found; Hyatt moving 1,000+ hotels | Yes, REST plus streamed events | Yes, cashiering APIs | Self-serve, metered, from USD 10 per 10,000 calls and USD 10 per 100,000 events per month (secondary quote, datasheet now 404) | [S57] [S58] |
| Mews | 15,000 customers, 85 countries | Yes, polling plus events | Yes, `orders/add` linked to reservation | Public docs, certification; "no connection fee" for hotels | [S59] [S60] |
| Cloudbeds | 20,000+ properties | Yes, webhooks | Yes, `postCustomItem` | Partner programme with sandbox; hotel API access in Premium/Enterprise or paid add-on | [S61] [S62] |
| Apaleo | 1,500+ properties (Oct 2024) | Yes, webhooks | Yes, folio charges | Fully open, free developer account | [S63] [S64] |
| SiteMinder (channel manager, SMX) | 56,000 properties, 2.6m rooms (FY26) | Yes, SMX read API for apps | Not found | Partnership agreement, fee not public | [S65] [S66] |
| Little Hotelier (SiteMinder) | "Thousands" | Only through certified partners | Not found | No public API | [S67] |
| Guestline Rezlynx (Access Group) | 2,500 to 3,500+ mostly UK and Ireland (secondary) | Yes | Yes, HTNG/OTA | Developer portal plus certification | [S68] |
| eviivo | 28,000 hoteliers | Yes, plus webhooks | Yes, ePOS API | Free APIs | [S69] |
| RMS Cloud | Not found | Yes | Yes | REST API, 100+ partners; USD 550 developer kit (secondary) | [S70] |
| Protel (Planet) | Not found | Yes | Not confirmed | Partner-gated | [S71] |
| Stayntouch | Not found | Yes, webhooks | Yes | No cost to join | [S72] |
| Maestro, Infor HMS, Clock PMS+ | Not found | Yes | Yes | Open or partner APIs | [S73] |
| Agilysys, Shiji Daylight | Not found | Yes | Not confirmed | API portals | [S73] |
| WebRezPro | Not found | Via Hapi | Not found | Partner only | [S74] |
| innRoad | Not found | No public API | No | | [S75] |

### 5.2 Middleware

| Name | Status | Source |
|---|---|---|
| Hapi | Active, two-way integration to OPERA, Infor, Protel, WebRezPro and others; hotel pays an annual fee, amount not public | [S76] |
| Impala | No evidence of acquisition by Booking.com. Its last product was a distribution and booking API, not folio access. Founder left as CEO June 2024. Current status unclear, site returned 403. Do not plan on it | [S77] |
| SiteMinder SMX | Active, one read integration across SiteMinder's PMS connections | [S66] |
| Oracle OHIP | Active, metered | [S57] |
| DerbySoft | Distribution connectivity, not built for guest apps | [S78] |
| Supergood | Builds unofficial APIs for systems without one; unsanctioned access, risky | [S79] |
| Nexus and other named candidates | No PMS-unifying API found. Not verified | |

### 5.3 Recommended integration route

1. **Mews** first for UK and EU independents: public docs, read plus folio write, no connection fee.
2. **Cloudbeds** for US independents: webhooks plus `postCustomItem`. Note Cloudbeds sells its own upsell module (Whistle), so it is both partner and competitor.
3. **SiteMinder SMX** for breadth across small properties behind 56,000 SiteMinder customers. Read only, so pair with on-platform payment.
4. **Apaleo** as the cheapest place to prove the read-and-post pattern.
5. **Guestline** for UK groups, and **OPERA Cloud via OHIP** for small US groups.

Use Hapi only if a pilot customer sits on a PMS without a usable API. Partner-side fees for Mews, Cloudbeds, SiteMinder and Guestline are not public and need direct contact.

---

## 6. Market size

### 6.1 United States

| Metric | Value | Label | Source |
|---|---|---|---|
| Establishments, NAICS 721110 hotels and motels except casino hotels, 2023 | 55,895 (1,497,840 employees) | Counted, Census CBP | [S80] |
| Same, 2022 | 56,920 | Counted, Census CBP | [S81] |
| Economic Census 2022, NAICS 721110 | 44,768 firms, 56,260 establishments, USD 206.19bn receipts | Counted | [S82] |
| AHLA | "More than 64,000 hotels" (Oct 2025); "six in ten hotels are small businesses" (2023) | Trade association statement | [S83] [S84] |
| Data vendor count | 91,797 hotels, about 5.8m rooms | Vendor reported (Orbital), wider definition, not primary | [S85] |
| US rooms | about 5.79m rooms across 65,400 properties | Secondary | [S86] |
| Independent share | "less than 40% of all hotels" (2018 data) | Benchmark, CoStar, dated | [S87] |
| Room-size bands | Not found. CBP employment bands used as proxy | | |

CBP 2023 establishments by employee size (counted): under 5: 17,262; 5 to 9: 8,340; 10 to 19: 12,120; 20 to 49: 12,907; 50 to 99: 2,764; 100 to 249: 1,717; 250 to 499: 508; 500 to 999: 220; 1,000+: 57 [S80].

### 6.2 United Kingdom

| Metric | Value | Label | Source |
|---|---|---|---|
| Local units, SIC 55.10 hotels and similar, 2026 | 13,415 | Counted, ONS IDBR via Nomis, rounded to 5 | [S88] |
| Enterprises, SIC 55.10, 2026 | 10,175 | Counted, ONS IDBR | [S88] |
| England hotels, VisitEngland stock audit (June 2026) | 16,377 hotels, 784,884 bedrooms; 28,778 serviced establishments, 884,431 bedrooms | Count with estimated rooms | [S89] |
| Branded vs independent | about two thirds of UK hotels independent | Secondary, undated | [S90] |
| Room supply growth | about 17,000 new rooms expected in 2025, 2.5% on 2024 stock | Benchmark, Savills | [S91] |

ONS local units by employee size, 2026 (counted): 0 to 4: 3,930; 5 to 9: 1,660; 10 to 19: 2,560; 20 to 49: 3,365; 50 to 99: 1,245; 100 to 249: 550; 250 to 499: 90; 500 to 999: 20 [S88].

### 6.3 ICP subset

Target: independent and small-group hotels with roughly 20 to 300 rooms on a cloud PMS. Estimate, method shown. Employee band 10 to 249 is used as a stand-in for 20 to 300 rooms, which is an assumption.

| Step | US | UK |
|---|---|---|
| Establishments with 10 to 249 employees | 29,508 (counted) | 7,720 (counted) |
| x independent share | under 40% (CoStar, dated) so about 11,800 | about 60% (secondary) so about 4,600 |
| x cloud PMS share | 60% to 65% (aggregator, unverified) so about 7,000 to 7,700 | assume 50% to 65% (unverified) so about 2,300 to 3,000 |
| **ICP estimate** | **about 7,000 to 7,700 hotels** | **about 2,300 to 3,000 hotels** |

Before showing these to a prospect: buy a CoStar/STR census extract for room bands and the independent split, and replace the cloud PMS share with a primary figure.

---

## 7. Pricing norms

| Vendor | Model | Price | Source |
|---|---|---|---|
| Oaky (Plusgrade) | Commission | 5% of upsell revenue (not confirmed on Oaky's page) | [S92] |
| UpsellGuru | Per room or commission | EUR 2.30, 3.50 or 8 per room per month, or 15% commission plus USD 250 to 450 setup (search summary, page did not render) | [S93] |
| Duve | Per room plus minimum | USD 6 to 7.50 per room per month, minimum USD 120 to 150; from EUR 5 or GBP 4.50 | [S94] |
| Nor1 (Oracle) | Performance based | No upfront fee, rate not public | [S95] |
| Plusgrade | Revenue share | Not public | [S96] |
| Canary | Subscription | "No commission take on upsell revenue", price by quote | [S13] |
| Bookboost | Per room plus minimum | EUR 2.20 to 6 per room per month per module, from EUR 199 per property | [S97] |
| HiJiffy | Per property | From EUR 99, 159 or 319 per month, setup EUR 599 per 5 properties | [S98] |
| Chekin | Commission | 10% of upsell sales, no monthly fee (search summary) | [S99] |
| Runnr.ai | Per property | EUR 100, 200 or 400 per month, no setup | [S100] |
| Conduit | Per unit | USD 18 to 48 per unit per month, or flat USD 899 up to 25 units | [S101] |
| GuestJoy (SiteMinder) | Monthly plus per room | From EUR 150 per month, no commission | [S102] |
| Zaplox | Upfront plus per room | USD 10k to 50k upfront plus USD 3 to 6 per room per month (2021 data) | [S103] |
| Mews, Cloudbeds (Whistle), Hudini, Akia, Stay, Nonius | Bundled or by quote | Not public | [S104] |

Norms (vendor reported):

- **Per room per month**: about USD 2 to 8, with a property minimum of about USD 100 to 200.
- **Commission on upsell revenue**: 5% (Oaky), 10% (Chekin), 15% (UpsellGuru).
- **Per property**: about EUR 99 to 400 per month.
- **Setup**: zero to about USD 600, most vendors offer no-setup plans.
- Canary and GuestJoy market "no commission" as a selling point, so a pure commission model will be compared against flat fees.

---

## 8. Messaging rules

### 8.1 United States

| Topic | Rule | Source |
|---|---|---|
| Consent tiers (TCPA, 47 CFR 64.1200) | Informational autodialed texts need prior express consent. Telemarketing or advertising texts need prior express written consent. Solicitation only 8am to 9pm local | [S105] |
| Is an upsell to a booked guest telemarketing? | Most likely yes. FCC 2003 Order para 142: dual-purpose calls to existing customers offering new services are in most cases unsolicited advertisements | [S106] |
| Pure booking confirmations | Phan v. Agoda (N.D. Cal. 2018): confirmation texts tied to completing an existing transaction are not ads. This protects confirmations, not offers | [S107] |
| One-to-one consent rule | Vacated, Insurance Marketing Coalition v. FCC, 11th Cir., 24 Jan 2025 | [S108] |
| Revocation | Any reasonable means; "stop", "quit", "end", "revoke", "opt out", "cancel", "unsubscribe" are valid per se. The revoke-all-unrelated-messages part is delayed to 31 Jan 2027 | [S105] [S109] |
| CAN-SPAM email | Mixed emails are commercial if the subject line reads as promotional or the transactional content is not at the start of the body (16 CFR 316.3). Transactional means facilitating or confirming an agreed transaction | [S110] [S111] |
| Carrier rules (CTIA) | Express written consent for marketing; honour opt-outs | [S112] |
| A2P 10DLC | Brand and campaign registration with The Campaign Registry; use case such as Marketing, Customer Care or Mixed. Fees about USD 4.50 brand (low volume), USD 46 with vetting, USD 15 campaign vetting, USD 1.50 to 10 per month per campaign (search summary) | [S113] [S114] |
| Toll-free alternative | Toll-Free Verification required | [S115] |

### 8.2 United Kingdom (PECR)

| Topic | Rule | Source |
|---|---|---|
| Is the pre-arrival upsell marketing? | Yes. ICO: a message that promotes or encourages use of a service, special offer or upgrade is likely direct marketing. Neutral service messages are not | [S116] |
| Soft opt-in, reg 22(3) | All of: details obtained by the hotel itself, during a sale or negotiation, for its own similar products, with an opt-out at collection and in every message. Details from a third party never qualify | [S117] |
| OTA bookings | UpLayer's reading of the above: guest details passed by an OTA probably fail the soft opt-in, so OTA-sourced guests need explicit consent before marketing email or SMS | [S117] |
| Who is responsible | The hotel is the instigator. A sender acting on its behalf may also be liable. If UpLayer writes and targets offers it is closer to co-sender than passive processor | [S117] |
| Data (Use and Access) Act 2025 | Royal Assent 19 June 2025; PECR and data protection changes in force from 5 Feb 2026 per ICO; PECR fines aligned with UK GDPR levels; charity soft opt-in added | [S118] [S119] |

EU: ePrivacy Directive Art 13(2) has the same soft opt-in conditions [S120].

### 8.3 Is a pre-arrival upsell email transactional or marketing?

Marketing, in both markets, if it leads with offers. A pure confirmation or check-in logistics message is transactional. Mixing an offer block into a transactional email is defensible under CAN-SPAM only if the subject line and opening are transactional. Under PECR the ICO's test is the content, so any promotional content makes it marketing.

### 8.4 Product requirements that follow

1. Separate the transactional message (confirmation, check-in info) from the offer message, or keep offers below transactional content with a neutral subject in US email.
2. Per hotel, per guest, per channel consent store with timestamp, source, wording and booking channel.
3. Use soft opt-in only for UK direct bookings where an opt-out was shown at booking. OTA-sourced guests get an email-only, consent-seeking flow, or a neutral service message with a link to opt in.
4. SMS only with prior express written consent naming the hotel. Unticked checkbox at booking or in the pre-arrival service flow.
5. STOP and unsubscribe handling in every message, hotel identity and postal address on emails, US quiet hours, per-hotel revoke-all ready before 31 Jan 2027.
6. 10DLC registration per hotel brand with a Marketing or Mixed use case, toll-free as fallback.
7. UpLayer contract with each hotel: hotel is sender and controller, UpLayer processor, with the hotel warranting consent.

---

## 9. Verdict, is "3x upsell revenue" defensible?

**Not as a general promise. Yes, as a conditional one.**

Why not as a general promise:

1. **The only 3x+ numbers are single vendor cases from low baselines.** Williamsburg Lodge USD 5K to 50K, Clarion +381%, Hard Rock NY +360%, Zoku +300% (all vendor reported). Portfolio-level claims are much smaller: Runnr's "10% to 30% or more", Canary's "up to 250%".
2. **Personalization alone does not triple anything.** The best controlled evidence (airlines, peer reviewed) shows +10% to +25% revenue per offer and +15% to +36% conversion vs rules. No controlled hotel study exists.
3. **The base matters.** If "upsell revenue" means all ancillary revenue including F&B and spa walk-ins, 3x is not plausible: other operated departments are 1.4% to 10% of revenue and F&B is mostly on-property spend a pre-arrival tool does not touch. Against a hotel already running Oaky, Canary or Duve well, 3x would mean beating the category leaders by 200%, which no evidence supports.

Where 3x is credible:

- Hotels that sell little or nothing before arrival today (front desk only, or a static PMS email). Going from zero to a mature tool is how the vendor 3x to 10x cases happened. Estimate: on a 100-room independent, moving from roughly USD 10K to USD 30K to 40K a year of pre-arrival revenue is in line with Oaky's EUR 29 per room per month.
- The levers are mostly reach and timing, not AI: send to every booking (including OTA guests, where consent allows), two touches (confirmation, then 7 to 12 days out), a broad catalogue (breakfast is about 29% of revenue on Oaky, early and late check-out about 12%), and a frictionless pay or reserve step. Personalization then adds the last 10% to 30%.

Honest version of the promise:

> "For hotels selling little or nothing before arrival today, we aim to triple your pre-arrival upsell revenue within 6 months, measured against your last 12 months on the same items. Hotels already running an upsell tool should expect 10% to 30% more from personalization, proven with a holdout group, not a before and after."

Conditions to attach before this goes to outbound (to pass `.claude/uplayer-offer-rules.md`):

- Define the metric as pre-arrival upsell revenue sold through the platform, net of refunds, not total ancillary.
- Measure with a holdout (for example 10% of bookings receive the rules-based offer or no offer). That also creates the first independent hotel personalization evidence in the market.
- No UpLayer proof exists yet. Every number in outbound must be labelled as vendor reported industry data, not UpLayer results.

---

## Sources

All checked 1 October 2026. "Search index" means the figure was taken from a search engine summary because the page blocked automated access.

- [S1] Revenue Hub, CBRE, Contribution of hotel rooms revenue to total revenue: https://revenue-hub.com/hotel-rooms-revenue-total-revenue/
- [S2] Revenue Hub, R. Mandelbaum (CBRE), Other operated departments minor source of revenue: https://revenue-hub.com/operated-departments-revenue-source/
- [S3] CoStar/STR press release, US hotel profits grew in 2024 (403, search index): https://www.costar.com/products/str-benchmark/resources/press-releases/us-hotel-profits-grew-2024-were-limited-inflation
- [S4] Knight Frank, UK Hotel Dashboard Q3 2025 (HotStats data): https://www.knightfrank.co.uk/site-assets/research/report-pdfs/hotels/uk-hotel-dashboard_q3-2025.pdf
- [S5] CBRE, Hotel Food and Beverage, A Bright Spot in 2025: https://www.cbre.com/insights/articles/hotel-food-and-beverage-a-bright-spot-in-2025
- [S6] Cloudbeds, Hotel upselling: https://www.cloudbeds.com/hotel-guest/upsell/
- [S7] UpsellGuru, Building a case for investing in upselling (search index): https://upsellguru.com/building-a-case-for-investing-in-upselling-a-strategic-approach-to-enhancing-hotel-profitability/
- [S8] Oaky, Hotel upselling performance in Europe report (search index, page redirects): https://oaky.com/en/downloads/hotel-upselling-performance-in-europe-report
- [S9] Runnr.ai, The most impactful upselling moments during a guest journey: https://runnr.ai/blog/the-most-impactful-upselling-moments-during-a-guest-journey-with-data
- [S10] Revinate, Hotel Email Channel North America: https://www.revinate.com/hospitality-report/email-channel-north-america/
- [S11] Revinate, Hotel upsells marketing: https://www.revinate.com/strategies/hospitality-upsells-marketing/
- [S12] Oracle Nor1 eStandby datasheet (403, search index): https://www.oracle.com/a/ocom/docs/industries/hospitality/hosp-nor1-estandby-ds.pdf
- [S13] Canary Technologies, Dynamic Upsells: https://www.canarytechnologies.com/products/hotel-upsells
- [S14] Revinate, 2026 Hospitality Benchmark Report (search index): https://www.revinate.com/hospitality-benchmark-report/
- [S15] Amadeus Hospitality, The Art of the Upsell (Oaky data): https://www.amadeus-hospitality.com/insight/the-art-of-the-upsell/
- [S16] Oaky website case studies: https://oaky.com/en/blog/hotel-upselling
- [S17] Revenue Hub, Oaky best converting design: https://revenue-hub.com/launch-best-converting-design-for-hotel-upselling-so-far-oaky/
- [S18] Duve, Personalized upsell platform: https://duve.com/customized-upsells-platform-for-hotels/
- [S19] Conduit, Hotel groups upselling: https://www.conduit.ai/industry/hotel-groups/upselling
- [S20] Kolbeinsson et al., Galactic Air, INFORMS J. Applied Analytics 2022: https://pubsonline.informs.org/doi/10.1287/inte.2021.1105
- [S21] Shukla et al., Dynamic Pricing for Airline Ancillaries with Customer Context: https://arxiv.org/abs/1902.02236
- [S22] Dynamic offer creation for airline ancillaries using a Markov chain choice model, JRPM: https://link.springer.com/article/10.1057/s41272-022-00398-3
- [S23] Oracle and Phocuswright, Creating the Coveted Hotel Guest Experience: https://www.oracle.com/webfolder/s/delivery_production/docs/FY16h1/doc35/Guest-Experience-Report-2016-V7.pdf
- [S24] Lopez Mateos, Cohen, Pyron, Cornell Hospitality Quarterly 2022: https://journals.sagepub.com/doi/10.1177/19389655211014470
- [S25] D-Edge, Avoid guests ghosting: https://www.d-edge.com/avoid-guests-ghosting/
- [S26] Hospitality Technology, global cancellation rate reaches 40%: https://hospitalitytech.com/global-cancellation-rate-hotel-reservations-reaches-40-average
- [S27] Urrea, Huang, Zhang, Cornell Hospitality Quarterly 2026: https://doi.org/10.1177/19389655261455346
- [S28] Duve Stripe FAQ: https://helpcenter.duve.com/hc/en-us/articles/12409439817885-Stripe-FAQ
- [S29] Oracle Nor1 user guide, check-in merchandising: https://docs.oracle.com/en/industries/hospitality/nor1-cloud/norug/ch_checkin_merchandising.htm
- [S30] Bookboost help centre: https://intercom-help.eu/bookboost/en/?q=folio
- [S31] Stay App blog: https://www.stay-app.com/blog/how-to-increase-room-service-revenue-stay
- [S32] Cloudbeds Payments terms: https://www.cloudbeds.com/terms/cloudbeds-payments/stripe/
- [S33] Apaleo Pay overview: http://apaleo.dev/guides/pay-integration/overview.html
- [S34] UpsellGuru pre-arrival upselling (search index): https://upsellguru.com/pre-arrival-upselling/
- [S35] Stripe Connect charges: https://docs.stripe.com/connect/charges
- [S36] Stripe destination charges: https://docs.stripe.com/connect/destination-charges
- [S37] Stripe direct charges: https://docs.stripe.com/connect/direct-charges
- [S38] Stripe Connect accounts: https://docs.stripe.com/connect/accounts
- [S39] Adyen for Platforms, split transactions: https://docs.adyen.com/platforms/online-payments/split-transactions
- [S40] Visa advance payment guidance: https://usa.visa.com/dam/VCOM/global/support-legal/documents/visa-advance-payment.pdf
- [S41] Visa Core Rules, April 2026: https://usa.visa.com/dam/VCOM/download/about-visa/visa-rules-public.pdf
- [S42] FCA, Strong customer authentication: https://www.fca.org.uk/firms/strong-customer-authentication
- [S43] EBA Q&A 2018_4031: https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2018_4031
- [S44] Stripe, SCA: https://docs.stripe.com/strong-customer-authentication
- [S45] Stripe, CITs and MITs: https://docs.stripe.com/payments/cits-and-mits
- [S46] Morrison Foerster, PSD3 and PSR key developments: https://www.mofo.com/resources/insights/260430-psd3-and-the-payment-services-regulation-key-developments
- [S47] Stripe, save and reuse: https://docs.stripe.com/payments/save-and-reuse
- [S48] Stripe, place a hold: https://docs.stripe.com/payments/place-a-hold-on-a-payment-method
- [S49] Stripe, extended authorization: https://docs.stripe.com/payments/extended-authorization
- [S50] FCA PERG 15.5: https://handbook.fca.org.uk/handbook/PERG/15/5.html
- [S51] Stripe, How PSD2 impacts marketplaces and platforms: https://stripe.com/guides/how-psd2-impacts-marketplaces-and-platforms
- [S52] 31 CFR 1010.100: https://www.ecfr.gov/current/title-31/section-1010.100
- [S53] Stripe security guide: https://docs.stripe.com/security/guide
- [S54] Stripe Tax for Connect: https://docs.stripe.com/tax/connect
- [S55] GMI, Hotel PMS market: https://www.gminsights.com/industry-analysis/hotel-property-management-system-market
- [S56] Skift Research, PMS benchmark 2021: https://research.skift.com/reports/hotel-tech-benchmark-property-management-systems-2021/
- [S57] Oracle Hospitality Integration Platform: https://www.oracle.com/hospitality/integration-platform/
- [S58] Hyatt selects OPERA Cloud: https://www.prnewswire.com/news-releases/hyatt-selects-oracle-opera-cloud-as-property-management-system-for-its-global-properties-302249580.html
- [S59] Mews Connector API: https://docs.mews.com/connector-api/getting-started and https://docs.mews.com/connector-api/operations/orders
- [S60] Mews marketplace and funding: https://www.mews.com/en/products/marketplace and https://www.mews.com/en/press/mews-secures-300-million-investment
- [S61] Cloudbeds API and partner programme: https://www.cloudbeds.com/cloudbeds-api/ and https://www.cloudbeds.com/partner-with-cloudbeds/
- [S62] Cloudbeds developer docs: https://developers.cloudbeds.com/docs/webhooks-1 and https://developers.cloudbeds.com/v1.2/docs/check-in-upsell-upgrade
- [S63] Apaleo 1,500 properties: https://apaleo.com/blog/apaleo-news/apaleo-surpasses-1500-properties
- [S64] Apaleo developer docs: https://apaleo.dev/
- [S65] SiteMinder FY26 annual report: https://www.siteminder.com/wp-content/uploads/2026/08/Annual-Report-SiteMinder-FY26.pdf
- [S66] SiteMinder SMX: https://developer.siteminder.com/smx-api/guides/quick-start
- [S67] Little Hotelier: https://www.littlehotelier.com/about/ and https://hoteltechreport.com/little-hotelier/integrations
- [S68] Guestline developer portal: https://developers.guestline.com/
- [S69] eviivo API: https://eviivo.com/api/
- [S70] RMS Cloud API: https://www.rmscloud.com/platform/api
- [S71] Planet protel: https://www.weareplanet.com/news/planet-enhances-protel-cloud-pms-empower-hoteliers-greater-integration-efficiency-and-control
- [S72] Stayntouch partnerships: https://www.stayntouch.com/partnerships/
- [S73] Maestro, Infor, Clock, Agilysys, Shiji: https://www.maestropms.com/ , https://hoteltechreport.com/operations/property-management-systems/infor-hms , https://developers.clock-software.com/ , https://agys-dev.developer.azure-api.net/ , https://www.shijigroup.com/daylight-pms
- [S74] WebRezPro and Hapi: https://webrezpro.com/press-releases/webrezpro-eliminates-data-barriers-with-hapi-connection/
- [S75] RapidEye, PMS open API comparison: https://rapideyeinspections.com/blog/hotel-pms-open-api-comparison/
- [S76] Hapi: https://www.stayhapi.com/product/hapi-connectivity
- [S77] Impala, Travolution: https://www.travolution.com/news/travel-sectors/accommodation/impala-launches-self-service-api-tech-to-push-democratisation-of-hotel-retailing/
- [S78] DerbySoft API overview: https://pc.knowledgebase.derbysoftsec.com/en/support/solutions/articles/70000157127-api-overview
- [S79] Supergood: https://supergood.ai/
- [S80] US Census CBP 2023: https://www2.census.gov/programs-surveys/cbp/datasets/2023/cbp23us.zip
- [S81] US Census CBP 2022: https://www2.census.gov/programs-surveys/cbp/datasets/2022/cbp22us.zip
- [S82] US Economic Census 2022, sector 72: https://www2.census.gov/programs-surveys/economic-census/data/2022/sector72/EC2272BASIC.zip
- [S83] AHLA, top general managers 2025: https://www.ahla.com/news/ahla-names-2025s-top-general-managers-hospitality-show
- [S84] AHLA, small business week statement: https://www.ahla.com/news/ahla-statement-regarding-national-small-business-week
- [S85] Orbital, how many hotels in the US: https://www.withorbital.com/data/how-many-hotels-in-the-us/
- [S86] MMCG Invest, hospitality market by chain scale: https://www.mmcginvest.com/post/the-hospitality-market-by-chain-scale-a-complete-industry-analysis
- [S87] CoStar, shifting scene of independent hotels: https://www.costar.com/article/692181233/the-shifting-scene-of-independent-hotels-in-america
- [S88] ONS UK Business Counts via Nomis, SIC 5510: https://www.nomisweb.co.uk/api/v01/dataset/NM_141_1.data.csv?geography=K02000001&industry=138417542&employment_sizeband=0,1,2,3,4,5,6,7,8,9&legal_status=0&measures=20100&date=latest
- [S89] VisitEngland accommodation stock: https://www.visitbritain.org/media/5872/download
- [S90] Hotel Industry UK data: https://www.hotel-industry.co.uk/data/hotel-data-industry-size/
- [S91] Savills, Spotlight UK Hotels 2024: https://www.savills.co.uk/research_articles/229130/367949-0
- [S92] Oaky on Apaleo Store: https://store.apaleo.com/apps/oaky
- [S93] UpsellGuru pricing: https://upsellguru.com/pricing/
- [S94] Duve pricing: https://duve.com/pricing/
- [S95] Hotel Tech Report, Nor1: https://hoteltechreport.com/revenue-management/upselling-software/nor1
- [S96] Hotel Tech Report, Plusgrade: https://hoteltechreport.com/revenue-management/upselling-software/plusgrade
- [S97] Bookboost pricing: https://www.bookboost.io/pricing
- [S98] HiJiffy pricing: https://www.hijiffy.com/plans-and-pricing
- [S99] Chekin upselling: https://chekin.com/en/blog/chekin-upselling/
- [S100] Runnr.ai pricing: https://runnr.ai/pricing
- [S101] Conduit pricing: https://www.conduit.ai/pricing
- [S102] GuestJoy: https://hoteltechreport.com/en/revenue-management/upselling-software/guestjoy and https://www.phocuswire.com/siteminder-acquire-guestjoy-hotel-commerce
- [S103] Hotel Tech Report, Zaplox (2021): https://hoteltechreport.com/index.php/guest-experience/keyless-entry/zaplox
- [S104] Hotel Tech Report upselling software category: https://hoteltechreport.com/revenue-management/upselling-software
- [S105] 47 CFR 64.1200: https://www.law.cornell.edu/cfr/text/47/64.1200
- [S106] FCC 2003 TCPA Order (FCC 03-153): https://docs.fcc.gov/public/attachments/FCC-03-153A1.pdf
- [S107] Phan v. Agoda, law firm summary: https://www.consumerfinancialserviceslawmonitor.com/2018/12/tcpa-suit-over-hotel-text-messages-dismissed-on-summary-judgment-booking-confirmations-are-not-advertisements/
- [S108] Insurance Marketing Coalition v. FCC, 11th Cir.: https://media.ca11.uscourts.gov/opinions/pub/files/202410277.pdf
- [S109] FCC DA 25-312 and DA 26-12: https://docs.fcc.gov/public/attachments/DA-25-312A1.pdf and https://docs.fcc.gov/public/attachments/DA-26-12A1.pdf
- [S110] 16 CFR 316.3: https://www.ecfr.gov/current/title-16/section-316.3
- [S111] 15 USC 7702: https://www.law.cornell.edu/uscode/text/15/7702
- [S112] CTIA Messaging Principles: https://api.ctia.org/wp-content/uploads/2023/05/230523-CTIA-Messaging-Principles-and-Best-Practices-FINAL.pdf
- [S113] Twilio A2P 10DLC: https://www.twilio.com/docs/messaging/compliance/a2p-10dlc
- [S114] Twilio 10DLC fees (search index): https://help.twilio.com/articles/1260803965530
- [S115] Twilio toll-free verification: https://www.twilio.com/docs/messaging/compliance/toll-free/console-onboarding
- [S116] ICO, identify direct marketing: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/identify-direct-marketing/
- [S117] ICO, electronic mail marketing rules: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-direct-marketing-using-electronic-mail/how-do-we-comply-with-the-pecr-electronic-mail-marketing-rules/
- [S118] GOV.UK, DUAA commencement: https://www.gov.uk/guidance/data-use-and-access-act-2025-plans-for-commencement
- [S119] ICO, Data (Use and Access) Act 2025: https://ico.org.uk/about-the-ico/what-we-do/legislation-we-cover/data-use-and-access-act-2025/
- [S120] ePrivacy Directive 2002/58/EC: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32002L0058
