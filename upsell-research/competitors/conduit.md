# Conduit (conduit.ai), formerly HostAI

Checked 1 October 2026. Every number below is labeled: **vendor reported** (published by Conduit), **third-party reported** (published by a reviewer or rival), **counted** (counted by us on the page), or **estimate**.

## 1. What it is

Conduit is a San Francisco AI agent platform for hospitality guest operations, founded in 2024 as HostAI (a Y Combinator W24 AI messaging tool for Airbnb hosts) and rebranded to Conduit in 2025 alongside a $3.1M seed round led by Pi Labs (third-party reported, PhocusWire via search snippet; Conduit's own about page names YC, Pi Labs, Unpopular Ventures, Transpose Platform and yventures as investors). It sells to three segments named in its navigation: short-term rental managers, independent hotels, and hotel groups, plus serviced apartments. Its customer stories are mostly vacation rental operators (HomeHop, Renjoy, Haven, Cascadia Getaways, Bali Luxury Stays) and one boutique hotel (The Lauderdale). It claims "300+ hospitality brands in 120+ countries" (vendor reported). Upselling is not the core product; it is a module inside a broader "AI agents for guest operations" suite (chat and voice agents, unified inbox, workflows, guest portals, smart devices, operations tasks).

## 2. Features

### Product map

| Module | What it does | Upsell role |
|---|---|---|
| Agents | LLM chat and voice agents that answer guests using knowledge base, PMS reservation data, Skills and tools | Delivers offers inside live conversations, answers objections, confirms |
| Inbox | Unified inbox for messages, calls, handoffs | Staff oversight of agent upsell conversations |
| Portals | Branded per-stay web link (no app): check-in, ID checks, waivers, deposits, upsells, AI concierge | The "store": offers with Stripe checkout |
| Workflows | Visual builder, triggers on PMS events and booking dates, branching | Scheduled pre-arrival and in-stay offer sends |
| Operations (coming soon) | Housekeeping, maintenance, inspections | Executes the operational side of accepted upsells |

### Upsell types

| Type | Source |
|---|---|
| Early check-in, late checkout | Upselling page, room upgrades page |
| Room upgrades (fixed price, explicitly no bidding) | Room upgrades page FAQ |
| Gap-night fills sent to recent viewers | Upselling page |
| Mid-stay extensions (portal self-service added 25 Sep 2026) | Upselling page, changelog v3.16 |
| F&B, spa, local experiences, in-room dining | Upselling page |
| Airport pickup, mid-stay clean (API examples) | Portal Offers API docs |
| Damage waivers, security deposits, conditional check-in fees | Pricing page, changelog v3.14 and v3.16 |

### Channels

| Channel | Supported | Notes |
|---|---|---|
| Email | Yes | Up to 20 sending addresses per domain (changelog) |
| SMS | Yes | Via Twilio integration |
| WhatsApp | Yes | Templates managed in workspace |
| OTA messaging | Airbnb, Expedia live; Booking.com and VRBO marked "Coming soon" on integrations page | Hero copy still says "Works across Airbnb, VRBO, Booking.com, Expedia" |
| Voice | Yes, inbound and outbound AI voice | Billed in credits |
| Web chat, social | Yes (home page: "email, WhatsApp, OTAs, socials") | |
| Guest app | No native app. Branded web portal, custom domain available | |
| Slack | Staff can "send upsells" from Slack | Integration page |

### Timing triggers

| Trigger | Detail |
|---|---|
| Workflow triggers | Booking confirmation, check-in, PMS events and booking dates, keyword detected in a guest message (blog) |
| Skill triggers | Early check-in on arrival morning, late checkout on departure day, upgrade when guest confirms arrival time and PMS shows a superior room free, extension when the next night opens, gap-night when inventory opens |
| Portal offer availability | `visibleFrom`, `visibleUntil`, `bookableFrom`, `bookableUntil` windows per offer (API docs) |
| Targeting | Property, inbox, booking channel, nights, vacancy (for example `minVacantNightsBeforeArrival: 1`), custom reservation attributes |

### Personalization and AI, what it actually does

| Claim | What it really is |
|---|---|
| "Personalized" offers | Rule-based. Revenue teams "set the trigger conditions, pricing rules, and eligibility criteria once." Portal offers are targeted by property, channel, vacancy and custom attributes. No guest-level propensity model, no AI-chosen offer, no AI-set price found |
| AI in the upsell | The LLM agent is the salesperson, not the merchandiser. It inserts the offer into an active thread, answers follow-up questions with PMS-backed facts (room size, view, price difference), and confirms acceptance in the same thread |
| "Dynamic rate" upgrades | Pricing follows "your current rate strategy" from the PMS and rules the hotel sets. No Conduit pricing model found |
| Execution | On acceptance, agent updates PMS reservation, alerts housekeeping, resets access code, confirms to guest (vendor reported, depends on integration) |
| AI engine | Retrieval over a knowledge base, Skill matching (conditional playbooks), tool calls, Guardrails and Persona checks, then send or escalate (docs, "Inside the AI Engine") |
| Optional AI copy | Workflow messages can be "AI-generated" (costs 3 extra credits per message) |

Verdict: segment and rules personalization, with a genuinely conversational LLM layer for objection handling. The personalization is in the timing and the dialogue, not in what is offered or at what price.

### Payment options

| Option | Supported | Source |
|---|---|---|
| Pay upfront in portal | Yes, card, Apple Pay, Google Pay, Link via the hotel's connected Stripe account | Portals FAQ |
| Reuse booking card | No, "Guests enter their payment method in the portal rather than reusing the card from the original booking" | Portals FAQ |
| Pay at arrival, reserve now | Partial. Offers of `kind: "request"` do not charge, so a request-then-settle-on-property flow is possible. No explicit "pay at hotel" option found | API docs |
| Prepay discount vs pay-later full price | Not found. A `compare_at_price_in_cents` field allows a strike-through price, but no dual pricing by payment timing | API docs |
| Percentage pricing | Yes, percent of total price, gross rent, net rent, subtotal, fees or taxes | API docs |
| Variant pricing | Yes, `by_option` (for example sedan vs van) | API docs |
| Deposits and holds | Yes, collect, hold, capture, release security deposits | Changelog v3.14 |
| Refunds | Yes, across payment types from one place | Changelog v3.16 |
| Channel rules | Payment and verification rules can exclude OTA flows where policy requires | Portals FAQ |
| In-chat payment | Agents "collect payments" through connected tools | Agents page |

### Merchant of record

Not stated. Payments run through the hotel's own Stripe account ("Connect your Stripe account"), which implies the hotel is the merchant of record (estimate, inferred from the Stripe connection, not confirmed by Conduit).

### Auto vs manual approval

| Path | Behavior |
|---|---|
| Conversational upgrade | Agent confirms instantly in thread when PMS availability is verified (vendor reported) |
| Portal `purchase` offer | Charged at checkout |
| Portal `request` offer | No charge, request goes to team (manual) |
| Agent autonomy | Hotels choose "which decisions need your approval"; docs describe moving agents "from copilot to autopilot" |

### Admin panel

| Area | Detail |
|---|---|
| Portals | Offers, Verification, Transactions (security deposits), Settings (custom domain), templates with layout blocks, brand kit, guides |
| Agent Hub | Knowledge, Skills, Persona, Guardrails, Tools, Behavior, Sandbox testing, backtesting of fixes |
| Workflows | Visual builder with branches, filters, waits |
| Configuration by chat | "You can change their instructions, skills, and approval rules by talking to them" |
| API and MCP | Public REST API covers portal offers, templates, sessions and orders; MCP server |
| Onboarding | Agent product managers, 2 to 4 weeks to first automations, then 4 to 8 weeks of review (vendor reported) |

### Analytics

| Item | Detail |
|---|---|
| Dashboards | AI Automation Dashboard, Calls Dashboard, Metrics, Queue Report |
| Upsell reporting | "Track acceptance and revenue by offer type. Compare timing and pricing" |
| Agent metrics | Automation rate, response time, resolution rate, guest satisfaction |
| Upsell attribution vs control group | Not found |

### Integrations

43 integrations listed on the page (vendor reported; 43 counted).

| Category | Names |
|---|---|
| PMS (19 counted) | Apaleo, Beds24 (listed as "Bed24"), Cloudbeds, Escapia, Guesty, HomHero, Hostaway, Hostfully, Hostify, Lodgify, Mews, Oracle Opera Cloud, OwnerRez, RMS Cloud, Resly, Smily, StayNTouch, Streamline, Track |
| OTA and channels | Airbnb, Expedia, Booking.com (coming soon), VRBO (coming soon), WhatsApp, Email, Twilio |
| Revenue | Wheelhouse |
| CRM and data | HubSpot, Salesforce, Airtable, Apollo.io |
| Knowledge | Notion, Google Drive, Google Docs, Google Sheets, Firecrawl |
| Tasks and collaboration | Slack, Asana, ClickUp, GitHub, Calendly, Cal.com, Google Calendar |
| Payments | Stripe (via Portals) |
| Verification | Autohost, among others |

## 3. Pricing and model

Source: https://www.conduit.ai/pricing (checked 1 October 2026). "Starting rates shown. Pricing scales beyond 50 listings." All vendor reported.

| Package | Price | Credits | Includes |
|---|---|---|---|
| Messaging | $18 per unit per month | 40 per unit per month | Unified inbox, voice AI, PMS and OTA integrations, Operator, workflows, analytics |
| Guest | $30 per unit per month | 60 per unit per month | Messaging plus in-portal AI concierge, guidebooks, damage waivers "no SKU fee", "Upsells with One-click Payment" |
| Guest + Devices | $36 per unit per month | 80 per unit per month | Plus smart home, access codes |
| Full Suite | $48 per unit per month | 100 per unit per month | Plus tasks, workforce, scheduling, inventory |
| Startup (0 to 25 units) | $899 per month | 2,000 per month | Full feature set, no implementation fee |

Upsells require at least the Guest package. Portals FAQ: "Portals is a paid add-on priced by contracted listing count with graduated volume pricing... Bundles and guest-transaction terms can change the final rate." Transaction fee or revenue share on upsells: not published.

Credit costs (docs, vendor reported): non-AI email 1, AI email 4, non-AI SMS 2, AI SMS 5, WhatsApp 2 or 5, AI voice 8 per minute, regular voice 1 per minute, Run AI Prompt 2, Web Search 5. Inbox AI replies do not consume credits. Overage billed on next invoice.

Estimate: a 100-room hotel on Guest would pay about $3,000 per month ($30 x 100) at list, before volume discounts and transaction terms.

Older public pricing, now superseded: $649 per month Starter up to 50 listings, $1,499 Growth up to 120 listings (third-party reported, BNBCalc 2026); "Growth plan at $500/month" (third-party reported, Enso Connect, April 2026). No free trial, demo-led sales.

## 4. Claims and metrics

| Claim | Label | Where |
|---|---|---|
| 4.7 / 5 rating (G2 widget) | Vendor reported | Home page |
| 300+ hospitality brands in 120+ countries | Vendor reported | Home, customers, company |
| 25-30% acceptance rate on early check-in offers delivered in-context | Vendor reported, no methodology | Upselling page |
| 25-30% upgrade acceptance in-conversation vs sub-10% for pre-arrival email | Vendor reported, no source for the sub-10% | Room upgrades page |
| Pre-arrival upgrade campaigns "typically sit in single digits" | Vendor reported, no source | Upselling page |
| $3,400 NOI increase per month, The Lauderdale Hotel | Vendor reported. The case study attributes it to cost cuts and fewer refunds, while the upselling page attributes it to upsell acceptance (see section 7) | Upselling page, case study |
| $500,000 added asset value at an 8% cap rate, almost $600,000 at 7% | Vendor reported, derived from the $3,400 | Lauderdale case study |
| Support cost cut from $4,000 to $600 per month | Vendor reported | Lauderdale case study |
| Response time 57 minutes to 2 minutes | Vendor reported | Lauderdale case study |
| BlueGems 65% of guest communication automated, $6-8K monthly labor savings | Vendor reported | Upselling page |
| HomeHop 40 to 108 properties, 70% of messaging automated, no new hires | Vendor reported | Home, upselling page |
| Haven Vacation Rentals 90% automation | Vendor reported | Upselling page |
| Renjoy 40% automation in first month | Vendor reported | Home |
| Cash Flow Street 35 properties, 96% AI automation, sub-one-minute response | Vendor reported | Blog |
| Bali Luxury Stays saved $22K per month | Vendor reported | Case study title |
| Pre-arrival emails generate $95 per booking in upsell revenue | Third-party reported (Revinate benchmark, cited by Conduit) | Blog |
| Breakfast bundle at 15-20% discount vs walk-in rate | Recommendation in blog, not a measured result | Blog |
| Setup 2 to 4 weeks, then 4 to 8 weeks of tuning | Vendor reported | Company page |
| 43 integrations | Vendor reported, 43 counted | Integrations page |
| 77,000+ properties, 30+ channels, 140+ languages, 70-90% automation | Vendor reported, from an older Conduit blog title and search snippet | Blog |
| SOC 2 Type II, HIPAA-ready | Vendor reported | Home, upselling page |
| $3.1M seed round | Third-party reported | PhocusWire (via search) |

## 5. Landing page teardown

### Home page (https://www.conduit.ai/)

| Element | Detail |
|---|---|
| Hero headline | "AI agents for guest operations." |
| Subhead | "Automate guest messaging and calls, coordinate your teams, and drive revenue." |
| Section order | Hero with G2 4.7/5 and "Trusted by 300+ hospitality brands in 120+ countries" logo bar, then Product (Chat, Voice, Internal agents), Agents built for production (multilingual, integrations, agent activity, scheduled workflows, reporting, API and MCP), Features (escalations, improve replies, procedures, internal systems), Customer stories grid, Security (SOC 2, enterprise controls, HIPAA), closing CTA |
| CTAs | "Book a demo" (repeated), "Sign in". No self-serve signup |
| Proof | G2 stars, logo bar, 13 customer story cards with numbers |
| Calculator, demo, lead magnet, trial | Demo only. No calculator, no free trial, newsletter signup only |
| Guarantee | None found |
| Tone | Confident, operator-focused, "AI agent" category language |

### Upselling page (https://www.conduit.ai/industry/hotel-groups/upselling)

| Element | Detail |
|---|---|
| Hero headline | "Offer hotel upgrades in guest conversations" |
| Subhead | "Offer available room upgrades, early check-in, and extra nights while helping guests plan their stay. Use booking details and rules set by your team." |
| Section order | Hero, "Works across Airbnb, VRBO, Booking.com, Expedia", The conversion gap (4 problems: cold offers, unanswered questions, manual execution, timing), How it works (4 steps), Proven results stats, Revenue plays (6), Customer proof quotes, Security, How we compare (vs email campaigns), FAQ (8), closing CTA |
| CTAs | "Book a demo" only |
| Proof | 25-30%, $3,400 NOI, 65%, 90% stat bar, 4 customer quotes |
| Calculator, lead magnet, trial | None |
| Guarantee | None. FAQ hedges: "Acceptance depends on pricing, availability, the offer, and when it is sent" |
| Tone | Problem-agitation against "traditional" upsell tools (Canary and Oaky named in FAQ), mechanism-led ("the mechanism difference drives the conversion rate difference") |

### Room upgrades page, independent hotels (https://www.conduit.ai/industry/independent-hotels/room-upgrades)

| Element | Detail |
|---|---|
| Hero headline | "Offer room upgrades in guest conversations" |
| Subhead | "Use availability and booking details to offer relevant room upgrades and early check-in. Let guests ask questions and respond in the same conversation." |
| Distinct angle | Anti-bidding ("Bidding Models Add Unnecessary Complexity"), one-message offer example: "Your suite is available tonight for $45, would you like it?" |

### Blog (https://www.conduit.ai/blog/hotel-upselling)

Title "15 Hotel Upselling Techniques to Boost Revenue in 2026". SEO listicle ranking Conduit number 1 among 14 tools (Canary, Oaky, Duve, RoomRaccoon, HiJiffy, NexGen Guest, Mews, Akia, SiteMinder and others). Its key takeaway contradicts the product pages: the blog says "Pre-arrival is the highest-converting upsell moment," while the upselling page says pre-arrival emails convert in "single digits." "Open in ChatGPT" and "Open in Claude" buttons sit at the top.

## 6. Hook, guarantee and lead magnet

| Item | Conduit |
|---|---|
| Hook | "Offer upgrades in the conversation, not in a cold email": the AI agent sells, answers objections and executes the PMS change, housekeeping alert and door code in one thread |
| Secondary hook | Operational execution, "Your team doesn't coordinate the upsell. Conduit executes it." |
| Guarantee | Not found |
| Lead magnet | Not found (no calculator, audit, template or trial). Blog content and comparison pages ("Conduit vs." 14 alternatives, Build vs Buy) act as SEO capture |
| Offer | Demo call, Startup plan with no implementation fee |

## 7. Weaknesses and gaps

| Weakness | Evidence |
|---|---|
| Inconsistent proof | The $3,400 monthly NOI is presented on the upselling page as upsell revenue, but the Lauderdale case study says it came from support cost cuts ($4,000 to $600) and "significant fewer refunds." The case study does not mention upselling |
| Contradictory positioning | Blog says pre-arrival is the highest-converting moment; product pages say pre-arrival converts in single digits |
| No published upsell acceptance number of their own beyond 25-30% | FAQ answers "Acceptance depends on..." instead of a number |
| Personalization is rules, not AI | Targeting by property, channel, vacancy and custom attributes; hotel sets prices and eligibility |
| No prepay discount mechanic | No upfront-discount vs pay-at-arrival dual pricing found |
| Card re-entry friction | Guests must enter a new card in the portal, cannot reuse the booking card |
| Upsell is a module, not the product | Messaging-first; upsells need the Guest tier or Portals add-on |
| Hallucinations and reliability | Users quoted by Enso Connect (a rival, third-party reported): "In other areas, it hallucinates all the time and starts making recommendations of things hundreds of miles away"; users switched to manual approval of each message |
| Integration friction | Users report switching between PMS and Conduit (third-party reported, Enso) |
| Price floor | $899 per month minimum for 0 to 25 units; no free trial, demo-only (vendor reported). BNBCalc: small hosts "cannot get in the door" |
| Thin public reviews | Capterra 5.0 from 8 reviews, GetApp 5.0 on a "comparable handful," described as "thin and dated" (third-party reported, BNBCalc). G2 4.7 shown by Conduit; G2, Capterra, Hotel Tech Report and Trustpilot pages returned HTTP 403 to our fetch, so review counts could not be verified directly |
| OTA coverage gap | Booking.com and VRBO marked "Coming soon" on integrations page while hero copy claims both |
| Hotel depth | Customer base skews to STR; only one named hotel case study |
| Long ramp | 2 to 4 weeks setup plus 4 to 8 weeks tuning (vendor reported) |
| Dated rival claim | Enso Connect says Conduit has no guest app, verification or e-commerce upsells; that is now outdated (Portals, Stripe payments, deposits, verification shipped by mid 2026 per changelog), but the gap was real until recently |

## 8. What UpLayer should copy, and where UpLayer can beat them

### Copy

| Idea | Why |
|---|---|
| Conversational objection handling | Let the guest reply to the offer and get PMS-backed answers (room size, view, price difference) |
| Execution on acceptance | Write back to the PMS and trigger housekeeping or access changes, so the upsell creates no staff work |
| Moment-based triggers | Arrival morning for early check-in, departure day for late checkout, open next night for extensions, gap nights |
| Offer data model | Flat, by-option and percent-of-booking pricing, visibility windows, targeting by vacancy and channel, `compare_at` strike-through price |
| Fixed-price upgrades, not bidding | Simpler for guests |
| Problem-agitation page structure | "The conversion gap" section framing four failure modes of email-only upsell tools |
| Transparent per-unit pricing table | Rare in this category |

### Beat them

| Gap | UpLayer play |
|---|---|
| Personalization is rules | Generate the offer set and copy per guest from booking data (party size, lead time, stay purpose, channel, length, arrival time, past stays), and show the guest why it was picked |
| No prepay discount | Make the two-path payment the core mechanic: pay now at a discount (for example 20 percent off) or reserve now and pay at arrival at full price. Conduit has neither framing |
| Upsell is a side module | Be upsell-first with one KPI: upsell revenue per booking, with a goal of tripling it |
| Proof is messy | Publish clean attribution, holdout control groups and per-offer revenue. Never repeat Conduit's mistake of reusing a cost-saving number as upsell revenue |
| High price floor, demo-only | Lower entry, or a performance-based model tied to incremental upsell revenue |
| Card re-entry | Pre-filled one-tap checkout, wallet pay, and a reserve-now path with no card needed up front |
| PMS, channel manager or portal agnostic intake | Accept bookings from PMS, channel manager or booking portal, wherever the booking came from; Conduit relies on PMS integrations and still lacks Booking.com |
| Hotel-specific depth | Conduit's proof is STR-heavy; target hotels with hotel case studies |
| AI reliability fears | Offer copy and pages generated within guardrails from structured offer data, with human review option, so no hallucinated details reach guests |

## 9. Sources

All checked 1 October 2026.

| URL | Used for |
|---|---|
| https://www.conduit.ai/blog/hotel-upselling | Blog teardown, $95 Revinate stat, workflow triggers, Cash Flow Street |
| https://www.conduit.ai/ | Home hero, proof, product map, customer cards |
| https://www.conduit.ai/pricing | Pricing table |
| https://www.conduit.ai/industry/hotel-groups/upselling | Upsell features, metrics, FAQ |
| https://www.conduit.ai/industry/independent-hotels/room-upgrades | Room upgrade page, no-bidding, FAQ |
| https://www.conduit.ai/product/portals | Portal features, Stripe payments, Portals pricing FAQ |
| https://www.conduit.ai/product/agents | Channels, payments via agents |
| https://www.conduit.ai/product/workflows | Workflow triggers |
| https://www.conduit.ai/integrations | Integration list |
| https://www.conduit.ai/customers | Customer stories |
| https://www.conduit.ai/customers/lauderdale-hotel | Lauderdale case study |
| https://www.conduit.ai/company | Founding, investors, onboarding timeline, approval rules |
| https://www.conduit.ai/changelog | Stay extensions, deposits, refunds, custom domains, Autohost |
| https://docs.conduit.ai/llms.txt | Docs index, copilot to autopilot, dashboards |
| https://docs.conduit.ai/api-reference/portals/overview | Portal structure |
| https://docs.conduit.ai/api-reference/portals/offers/overview | Offer kinds, pricing models, targeting |
| https://docs.conduit.ai/api-reference/portals/offers/create | Offer schema, compare_at price |
| https://docs.conduit.ai/overview/inside-the-ai-engine | How the AI works |
| https://docs.conduit.ai/workflows/workflow-usage | Workflow credit costs |
| https://docs.conduit.ai/setting-up-conduit/credits | Credit costs |
| https://www.bnbcalc.com/reviews/host-ai-review | Older pricing, Capterra and GetApp summary |
| https://ensoconnect.com/resources/alternatives-to-hostai-(conduit) | User complaints (rival source), older pricing |
| https://www.phocuswire.com/hostai-conduit-strs-artificial-intelligence-investment | Rebrand and seed round (HTTP 403, details from search snippet) |
| https://www.conduit.ai/blog/hostai-joins-y-combinator | YC history (search result) |
| https://www.g2.com/products/conduit-conduit-ai/reviews | G2 rating (HTTP 403, rating taken from Conduit widget) |
| https://www.capterra.com/p/10020845/HostAI/reviews/ | Capterra (HTTP 403, figures via BNBCalc) |
| https://www.getapp.com/hospitality-travel-software/a/hostai/ | GetApp (HTTP 403, figures via BNBCalc) |
| https://hoteltechreport.com/guest-experience/guest-messaging/conduit | Hotel Tech Report (HTTP 403, not found) |
| https://www.trustpilot.com/review/conduit.ai | Trustpilot (HTTP 403, not found) |
