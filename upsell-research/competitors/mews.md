# Mews, built-in upsell (booking engine, online check-in, kiosk, Automations) and Mews Marketplace upsell apps

Status: competitor research for the AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

Mews, founded in Prague in 2012, positions itself as "the operating system for hospitality". It covers the PMS, POS, RMS, channel manager, booking engine, embedded payments, guest technology (AI messaging over WhatsApp and SMS, kiosk, digital key), BI and housekeeping (Flexkeeping). Upselling is not a separate product. It is spread across the booking engine, online check-in in the guest portal, Mews Kiosk, "Spaces and Amenities" (bookable non-room inventory) and Automations. For deeper upselling, Mews points hotels to its Marketplace, which has an "Upselling" category of 8 apps (counted on the Marketplace filter on 1 October 2026), including Oaky and UpsellGuru.

- Customers: from 10-room independents to chains and multi-brand groups (Core, Pro and Enterprise plans).
- Customer count: "15,000+ hotels using Mews" in 85 countries, 1,300+ staff (About page, vendor reported). The pricing page says "15,000+ hoteliers". The About page timeline says 12,500 customers in 2025 (vendor reported).

## 2. Built-in upsell features

**Channels**
- Booking engine ("add products and services during booking"), online check-in and check-out in the guest portal, Mews Kiosk on property, QR codes.
- AI messaging over WhatsApp and SMS is listed under guest technology in Mews Pro.
- Pre-arrival upsell emails: Mews' own blog says "A smart hospitality cloud like Mews can automate pre-arrival upselling emails, or you can integrate with specialized upselling tools". The Upsells page says offers appear "across booking, pre-arrival, check-in and in-stay moments". No help article was found that documents a configurable pre-arrival upsell email with a product page.

**Timing**
- At booking, at online check-in, at kiosk check-in, and through Automations triggers "at booking, check-in or based on the rules you set".
- Mews' own 2026 blog splits the market into four types: basic upgrade automation, dynamic pre-arrival engines, messaging-driven add-ons and full lifecycle platforms. It places itself in the lifecycle type.

**Personalization and AI**
- Automations can "send personalized upsell offers automatically, triggered by guest data like loyalty status or VIP tags" (Upsells page).
- Online check-in hides a product the guest already has on the reservation (help result).
- Room upgrade in online check-in shows a higher category if space exists. The guest pays "the new category price minus the price already booked" (help result). This started as a beta program.
- No documented AI offer generation or per-guest offer pages. Mews' blog says "dynamic pricing that reads occupancy and demand will out-earn a flat upgrade fee", but the dynamic upsell pricing it describes is not documented as a native Mews feature.

**Payment options**
- Embedded Mews Payments: card tokenized once at booking, then reused "to cover every room charge or extra". Kiosk detects early check-in, shows the fee and adds the charge automatically.
- Charges post to the **guest profile** (not a room folio), optionally linked to a reservation.
- Upfront discount versus pay-at-arrival full price: not found.

**Admin config**
- Products are configured under services (for example breakfast, early check-in, pet fee, parking) with an ordering value that sets display order.
- Upgrade-eligible space categories can be excluded.
- Spaces and Amenities sets pricing, rules and availability for hourly, daily, nightly or monthly bookable resources.
- Automations workflows are built "directly in Mews, no developer". Pricing FAQ: Automations is a Pro feature or a paid add-on on Core.

**Analytics**
- "Revenue is tracked automatically in reporting" (Upsells page). BI with custom dashboards in Pro. No upsell-specific report (conversion per offer, attachment rate) was documented in the pages checked.

## 3. Is it an add-on, and what does it cost

- https://www.mews.com/en/pricing shows three plans, **Mews Core**, **Mews Pro** ("most popular") and **Enterprise**, all with "Get pricing" or "talk to sales". No public figures.
  - Pricing is per room. The page says prices shown are "indicative of a 10-room property", but no figures render.
- Booking engine upsells, online check-in and Kiosk sit inside the platform plans.
- **Automations** (the trigger-based upsell workflows) is Pro only or a paid add-on on Core.
- **Spaces and Amenities** and **POS** are paid add-ons ("available as add-ons for properties that want to tailor their offering").
- Payment processing is charged separately from the subscription. Fees vary by card type, currency and method, and are quoted.
- Marketplace: "1,000+ integrations. No connection fees." Mews does not charge the hotel a connection fee for a Marketplace app. The app vendor (for example Oaky or UpsellGuru) bills the hotel directly. UpsellGuru's Mews listing says "No up-front fees OR lock-in contracts".
- Exact Mews upsell price: not found.

## 4. Claims and metrics (all vendor reported unless noted)

| Claim | Source page | Label |
|---|---|---|
| 20% of reservations via Mews Booking Engine include an upsell | Upsell software blog, booking engine page | vendor reported |
| Kiosk upsells convert 2.6x higher than at the front desk | Kiosk page | vendor reported |
| Kiosk guests are 3x more likely to buy an upsell and generate nearly 70% more upsell revenue per check-in | Kiosk page | vendor reported |
| Over 60% of guests choose self check-in if offered. Staff spend 35% more time with guests | Kiosk page | vendor reported |
| $686m in extra revenue for hoteliers (Spaces) | Upsells page | vendor reported |
| $97k revenue from bookable meeting rooms and parking. 150k savings on OTA fees | Booking engine page | vendor reported, case figures without context |
| Upgrades in online check-in almost doubled year on year, average EUR 30 per upgraded reservation, breakfast the biggest upsell (Data Snap Summer 2023) | Front desk upsell blog | vendor reported |
| Hotel Rival (Oaky plus Mews): EUR 10,009 front desk upsell in one month, +358% upsell revenue in month one, +683% in month two, upgrade in 3 clicks instead of 17 | Front desk upsell blog | vendor reported (customer and partner quote) |
| Article title "How to boost upsells by 600% with front desk upsell automation" | Front desk upsell blog | vendor reported |
| 8.7% revenue growth, 476% three-year ROI, 4-month payback, direct bookings +45% with Booking Engine, $1.3M average annual benefit per property | Pricing page and IDC study page | IDC study sponsored by Mews, 11 interviews covering 71 hotels, vendor sponsored |
| Up to 40% more direct bookings (Big Mama quote and FAQ) | Guest experience page | vendor reported |
| 15,000+ hotels, 85 countries, 1,300+ staff, $300M Series D | About page | vendor reported |
| 1,000+ Marketplace integrations, 8 in Upselling category | Marketplace page | vendor reported (category count counted on page) |
| UpsellGuru used by 1,500+ hotels | Mews Marketplace UpsellGuru listing | vendor reported (partner) |

## 5. Blog teardown, https://www.mews.com/en/blog/hotel-upsell-software

- **Headline:** "The 8 best upselling software for hotels in 2026" (published 6 June 2026, 5 min read, byline "Mews").
- **Section order:**
  1. Key takeaways (5 bullets)
  2. What is hotel upsell software
  3. Key features (multi-channel, personalization and dynamic pricing, automation, segmentation, multi-device)
  4. Benefits (5)
  5. Types of upsell software (basic upgrade automation, dynamic pre-arrival engines, messaging-driven add-ons, full lifecycle platforms)
  6. 8 tools (Canary, SiteMinder, Oracle Hospitality, Oaky, UpsellGuru, Bookboost, GuestJoy, Mews last)
  7. Key considerations (PMS integration depth, channel and timing coverage, automation vs manual effort, pricing logic, reporting tied to TRevPAR)
  8. Tips by property type (small, mid-size, resort, groups)
  9. "Boost ancillary revenue with Mews"
  10. FAQs (5)
- **CTAs:** "Get a demo" in the closing section, "Book a demo" in the footer band ("Ready for impact? See Mews in action."). Inline links to booking engine and hotel software pages.
- **Proof:** one stat, "20% of reservations made via the Mews Booking Engine including an upsell". Award badges (HotelTechAwards 2024 to 2026 Best PMS and others) in the footer. No customer quotes in the article.
- **Lead magnets:** none on this article. Elsewhere Mews uses the IDC "Business Value of Mews" study, Data Snap research, webinars and a Kiosk ebook ("6 creative uses").
- **Notable:**
  - Mews argues against single-moment tools and for "full lifecycle" upselling from "inside your existing system". That is the exact "the PMS already has it" objection UpLayer must answer.
  - Its own worked examples (suite upgrade only when category occupancy is under 60%, price raised on sold-out nights) describe dynamic pricing it does not document as native.
- **Related Mews page:** https://www.mews.com/en/blog/hotel-upselling-the-easiest-way-to-drive-ancillary-revenue. It admits "Many hotel booking engines don't give you access to a guest's email address" and recommends "an upselling platform that can reach OTA guests".

## 6. Limits

- **Only works for bookings inside Mews.** Every built-in surface (booking engine, online check-in, kiosk, Automations) acts on Mews reservations and guest profiles.
- **No cross-PMS support.** A group with properties on other PMSs cannot run Mews upsells there.
- **Generic offers.** Products are a fixed, ordered list per service. Personalization is rule-based (tags, loyalty status) through Automations, which is Pro only. No AI-generated offer copy, images or per-guest landing page documented. Upgrade pricing is the category price difference, not demand-based.
- **Thin pre-arrival upsell.** Upselling is strongest at booking and check-in. A long-running Mews feedback forum idea ("Upselling during the Guest Journey", comments 2019 to 2023) asked for upsells after booking and during stay. Mews replied in 2023 with a beta for upgrades in online check-in.
- **OTA guests.** Mews' own blog concedes booking channels often withhold guest emails and points to third-party upsell platforms.
- **Weak payment options.**
  - Payment runs on Mews Payments with a stored card.
  - No documented choice between a discounted prepay price and a full price paid at arrival.
  - No partial deposits for upsells documented.

## 7. API and integration surface

- **Docs:** Mews Connector API at https://docs.mews.com/connector-api, with OpenAPI at https://api.mews.com/Swagger/connector/swagger.yaml and a public GitHub repo (MewsSystems/open-api-docs).
- **Access terms** (https://docs.mews.com/connector-api/your-journey/certification): the API is "completely open and self-service, free of charge for integration partners and Mews customers alike". There is a public demo sandbox.
  - Listing on the Marketplace requires passing certification through a certification form. Partners register via the Partner form.
  - No dedicated technical contact per integration.
  - "No connection fees" to hotels.
- **Upsell use case guide** (https://docs.mews.com/connector-api/use-cases/upsell):
  - Pull services and products (`Get all services`, products).
  - Check upgrade availability (`Get service availability`).
  - Get reservations, including checked-in guests.
  - Write back with **Add order**, using `ProductOrders` for products that exist in Mews or `Items` for custom items, and `LinkedReservationId` to tie the order to a reservation.
  - Send accounting category IDs on items for correct reporting. Staff reminders can also be created.
  - Charges post to the guest profile.
- **Webhooks:** General Webhooks (https://docs.mews.com/connector-api/events/wh-general) include `ServiceOrderUpdated` (reservations), `ProductUpdated` and `ProductDeleted`, plus WebSockets.
- **Verdict:** a third party can read reservations and write upsell charges back. Mews is the most open of the four platforms checked.

## 8. What UpLayer should copy, and where UpLayer can beat them

**Copy**
- One stored payment token reused for every extra, and automatic early check-in fee detection. Frictionless payment is what drives the kiosk numbers.
- Upgrade priced as the category difference, with excluded categories. A good default rule before UpLayer's AI pricing kicks in.
- Hide products the guest already bought.
- The four-type market map from the blog. UpLayer should place itself as a "lifecycle" product that also works outside one PMS.
- Write orders with accounting categories and staff reminders, so the hotel's reporting and operations stay clean.

**Beat**
- **Cross-PMS and OTA reach:** one upsell program for a group running Mews in some hotels and other PMSs elsewhere. Mews' own blog says OTA guests are hard to reach from the PMS.
- **AI-generated personalized offer page per guest**, versus Mews' fixed product list and tag-based Automations (Pro only).
- **Real pre-arrival campaign** by email and SMS with a dedicated landing page, versus Mews' booking-time and check-in-time focus.
- **Prepay-at-a-discount versus pay-at-arrival choice**, which Mews does not document.
- **Measured 3x goal:** attachment rate and upsell revenue per booking against baseline. Mews reports revenue only in general BI.
- **Integration:** the free, self-service Connector API with Add order, `LinkedReservationId` and webhooks makes Mews hotels the easiest first PMS for UpLayer to certify on.

## 9. Sources (all checked 1 October 2026)

- https://www.mews.com/en/blog/hotel-upsell-software
- https://www.mews.com/en/blog/hotel-upselling-the-easiest-way-to-drive-ancillary-revenue
- https://www.mews.com/en/blog/front-desk-upsell-automation-webinar
- https://www.mews.com/en/pricing
- https://www.mews.com/en/products/upsells
- https://www.mews.com/en/products/booking-engine
- https://www.mews.com/en/products/check-in-kiosk
- https://www.mews.com/en/products/guest-journey
- https://www.mews.com/en/about-us
- https://www.mews.com/en/marketplace
- https://www.mews.com/en/products/marketplace/upsellguru
- https://www.mews.com/en/partnerships
- https://www.mews.com/en/resources/research/business-value-of-mews-operating-system
- https://feedback.mews.com/forums/955598-mews-guest-journey/suggestions/44582730-upselling-during-the-guest-journey
- https://community.mews.com/mews-beta-program-43/closed-increase-revenue-with-upgrades-in-online-check-in-376/index4.html
- https://docs.mews.com/connector-api
- https://docs.mews.com/connector-api/use-cases/upsell
- https://docs.mews.com/connector-api/operations/orders
- https://docs.mews.com/connector-api/events/wh-general
- https://docs.mews.com/connector-api/your-journey/certification
- https://oaky.com/en/integrations/mews-pms
