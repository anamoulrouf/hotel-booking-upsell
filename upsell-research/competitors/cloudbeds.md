# Cloudbeds, built-in upsell (Cloudbeds Guest Experience, Upsell module)

Status: competitor research for the AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

Cloudbeds is a cloud hospitality platform (PMS, channel manager, booking engine, payments, CRM, revenue management, guest experience) sold to independent hotels, hostels, B&Bs, vacation rentals and small groups. Upselling lives inside **Cloudbeds Guest Experience**, the former Whistle product (help center URLs still carry the "Whistle" slug). Guest Experience includes an Upsell store, unified inbox, AI chatbot, guest portal, digital check-in and check-out, kiosk, and tickets and tasks.

- Customers: independents and small to mid groups, from hostels to multi-property hotel groups.
- Customer count: no property count found on first-party pages checked. The About page lists 150 countries served, 650 team members, 500 partners and 350 properties onboarded monthly (vendor reported). Third-party sources cite "20,000+" to "26,000+" properties (third-party reported, not verified).

## 2. Built-in upsell features

**Channels**
- Upsell store link sent to guests, plus offers inside the guest portal, digital check-in cart, kiosk and booking engine.
- Messaging over email, SMS and WhatsApp (SMS and WhatsApp on paid messaging credits via Twilio). The unified inbox also covers OTA chat (Booking.com, Expedia, Airbnb, VRBO, Agoda, Ctrip).
- Order confirmation goes to the guest by email and SMS.

**Timing**
- Cloudbeds' own guide maps offers to six stages: discovery, pre-arrival, arrival, in-stay, departure and post-stay. It recommends sending the marketplace link "a few days before arrival".
- Automation triggers named in the guide: reservation status, arrival date, stay type and guest data.

**Personalization and AI**
- Marketing copy says "personalized upsell offers" and claims that a "shared data layer" makes offers "increasingly personalized" with every stay.
- In the help center, products and categories are **created manually** in Guest Experience after the PMS is connected. No help article was found that describes AI-generated or per-guest generated offers. The AI in Guest Experience is the chatbot and auto-translation, not offer generation.
- Segmentation by booking channel, stay purpose and party composition is recommended as a technique in the guide. It is not documented as an Upsell store feature.

**Payment options**
- Two payment types on upsell orders: **Credit Card (Stripe)** and **Room Charge** (added to the reservation folio, paid at the property).
- Stripe is used only for upsell orders. **Cloudbeds Payments is not supported** for upsell orders (help center, "Post to Folio" article).
- Tips and delivery fees can be enabled.
- Upfront payment discount versus pay-at-arrival full price: not found. Products have an "Offers" field, but no documented rule that gives a discount for paying in advance.

**Admin config**
- Upsell tab with Categories (title, description, image) and Products (name, SKU, description, quantity, delivery fee, tax class, availability, images, pricing, category, modifiers, offers).
- Modifiers for variants (for example size).
- Taxes and fees can reuse the Cloudbeds PMS tax and fee setup. Translations for up to 29 languages.
- Store design: theme, logo, announcement, header, button text.
- Order management: Open, Archived and Cancelled statuses. Not Posted, Posted and Voided folio states. Unfulfilled and Fulfilled states. Admins get an email for each new order.
- Auto post to folio when a valid reservation is detected. Manual post, void, refund and partial refund are also available.

**Analytics**
- Marketing copy says "the reporting layer shows which offers are converting, which are being ignored". No help article on upsell-specific reports was found.
- The guide recommends attachment rate, ancillary share of revenue, conversion by channel and average upsell value as metrics. It does not say whether the product reports all of them.

## 3. Is it an add-on, and what does it cost

- Plans on https://www.cloudbeds.com/pricing/: **Flex**, **One**, **Experience** and **Enterprise**. All are "Request a quote", and no public prices are shown.
- Guest Experience (which includes Upsell) is bundled in the **Experience** plan ("Everything in One" plus Guest Experience and Reputation Management). On Flex and One it is not included.
- Third-party estimates (not Cloudbeds published, estimate):
  - Flex from $180 a month, One $220 a month, Experience $320 a month (costbench.com, roommaster.com).
  - Add-ons at roughly $1 per room or $15 per property per module.
- SMS and WhatsApp use prepaid messaging credits, priced per country from a Cloudbeds spreadsheet. WhatsApp is charged per outbound message, and inbound messages are free (https://myfrontdesk.cloudbeds.com/hc/en-us/articles/19512399011355).
- Stripe processing fees apply to card upsell orders (Stripe's standard fees, not a Cloudbeds number).

## 4. Claims and metrics (all vendor reported unless noted)

| Claim | Source page | Label |
|---|---|---|
| Ancillary revenue from upsells is "more than 18% of total hotel income on average" | Upsell guide | vendor reported, no primary source given |
| Guests spend "approximately 20% more on average" through a self-service upsell marketplace than in person | Upsell guide | vendor reported |
| Guest Experience users see +40% direct bookings, +22% ancillary revenue, 5x more positive reviews | Guest Experience page | vendor reported |
| Global ADR down 5.8%, RevPAR down 5.4% (2026 State of Independent Hotels Report) | Upsell guide | vendor reported (Cloudbeds' own report) |
| Live chat users show a 40% increase in conversions | Upsell guide | vendor reported, uncited |
| 70% of business travelers want to buy more than core hotel products | Upsell guide, citing PhocusWire | third-party reported |
| Australian hotel chain grew F&B spend 8% with in-room QR codes (podcast guest) | Upsell guide | anecdotal, vendor reported |
| Industry target attachment rate 10-20%, ancillary share 20-30% | Upsell guide | vendor reported benchmark |
| One-point review score boost allows up to 11% higher rates (Cornell) | Guest Experience and pricing pages | third-party reported via vendor |
| CRM boosts repeat bookings up to 40%, Digital Marketing 10x ROI, Websites up to 25% more direct bookings, RMS forecast accuracy up to 95% | Pricing page | vendor reported |
| "Number one reason hotels don't have an upselling strategy is a lack of technology" | Upsell guide | vendor reported, uncited |
| Oaky used by 3,000+ hotels in 90 countries | Upsell guide | vendor reported (about a partner) |
| 150 countries, 650 team members, 99.95%+ uptime, 500 partners, 96% CSAT, 350 properties onboarded monthly | Our Story | vendor reported |
| 400+ integration partners via API | Pricing page | vendor reported |

## 5. Landing page teardown, https://www.cloudbeds.com/hotel-guest/upsell/

- **Headline:** "Hotel upselling: 12 techniques and top tech". Title tag: "Hotel Upselling: 12 Techniques & 6 Top Systems". TL;DR: "Guests don't want generic offers. They want 'you get me' moments."
- **Section order:**
  1. Intro with the 18% stat
  2. What is hotel upselling
  3. Why it matters (ADR and RevPAR decline, report CTA)
  4. Upselling vs cross-selling
  5. What to upsell (room, in-property, off-site)
  6. Video session CTA
  7. Upselling by property type (hotel, hostel, B&B, vacation rental)
  8. When to upsell (six-stage table with channels)
  9. Measuring performance (five metrics)
  10. 12 techniques
  11. Sample pre-arrival script
  12. 6 best upselling software (Cloudbeds first, then Akia, Canary, Duve, Oaky, UpsellGuru)
  13. "Building a scalable upselling strategy with Cloudbeds"
  14. Key takeaways
  15. Closing CTA
- **CTAs:**
  - "Request a Demo" (nav)
  - "Read report" (State of Independent Hotels)
  - "Watch now" (twice)
  - "Book a demo" under "Upselling made easy. Turn every booking into more revenue with Cloudbeds."
  - "Get the playbook"
  - Footer "Turn your PMS into an intelligent growth engine, Request a Demo"
- **Proof:** quotes from Brandie Jackson (Cloudbeds staff) and Ted Horner (consultant, podcast). No customer upsell case study on the page.
- **Lead magnets:**
  - Upsell playbook ebook ("Great upselling isn't pushy, it's personalized"), gated by name, email, property type, property name and country.
  - 2026 State of Independent Hotels Report.
  - Passport user-conference session video.
- **Notable:** Cloudbeds lists its own partners (Oaky, UpsellGuru, Akia, Canary, Duve) as alternatives. The built-in tool is positioned as one option among marketplace apps, not as a complete answer.

## 6. Limits

- **Only works for Cloudbeds reservations.** Folio posting requires a Cloudbeds PMS reservation to be assigned to the order. There is no documented cross-PMS mode.
- **No cross-PMS support.** Guest Experience is sold as part of the Cloudbeds platform. A hotel group with mixed PMSs cannot run one upsell program through it.
- **Generic offers.** Categories and products are built manually. One store is shown to every guest. No documented per-guest offer generation, dynamic pricing or AI offer selection in the Upsell module. Cloudbeds itself points to Oaky for "dynamic pricing based on occupancy and demand".
- **Weak payment options.**
  - Card payments only through a separate Stripe Connect account.
  - Cloudbeds Payments not supported for upsells.
  - Card orders "must be manually posted" when the payment type is not Room Charge (orders help article). The Post to Folio article says paid and unpaid orders can both be posted, so the docs conflict.
  - No documented prepay discount versus pay-at-arrival price.
- **Room upgrades are not clearly in the Upsell store.** Upgrade logic appears in the developer docs for partners, not as a configured Upsell product type.
- **Bundle lock-in.** Upsell is effectively gated behind the Experience plan or a quoted add-on.

## 7. API and integration surface

- **Docs:** https://developers.cloudbeds.com (REST API v1.2 plus a GraphQL API, with `llms.txt` and Markdown versions for AI agents).
- **Read reservations:** yes, through `getReservations` and related endpoints, and through webhooks.
- **Webhooks** (https://developers.cloudbeds.com/docs/webhooks-1): `reservation/created`, `reservation/status_changed`, `reservation/changed`, `reservation/deleted`, accommodation change events, `guest/created`, `guest/details_changed`, `integration/appstate_changed`, `night_audit/completed`, `accounting/transaction` and more.
  - Event order is not guaranteed.
  - A handler slower than 2 seconds counts as a failure and triggers a retry.
- **Write charges back:** yes. The "Check-in / Upsell / Upgrade" guide (https://developers.cloudbeds.com/v1.2/docs/check-in-upsell-upgrade) covers:
  - `postItem` with `reservationID` to post an inventory item to the folio.
  - `postCustomItem` for custom items to a reservation or house account.
  - `postPayment` to record payment.
  - `postVoidItem` to cancel.
  - `getAvailableRoomTypes` plus `putReservation` and `postAdjustment` for room upgrades.
  - Charges post only in the property default currency.
- **Auth:** OAuth 2.0 with optional migration to API keys for technology partners. API keys are the preferred method at certification.
- **Partner terms:**
  - Request a partner test account from integrations@cloudbeds.com, then partner review, development with partner-level credentials (email support with 1-2 business day response) and a short certification call.
  - Certified partners are listed in the Marketplace (https://www.cloudbeds.com/marketplace/).
  - API terms: https://www.cloudbeds.com/terms/api/.
  - Certification fee: not found.
- **Marketplace upsell apps today:** Oaky, UpsellGuru, Akia, Canary Technologies and Duve all integrate.

## 8. What UpLayer should copy, and where UpLayer can beat them

**Copy**
- Folio posting with item-level taxes and fees, auto-post when a reservation match is found, void and partial refund handling. Hotels expect this as table stakes.
- Room Charge as a payment option. It maps directly to UpLayer's "reserve now, pay at arrival".
- Product modifiers, 29-language translations, store theming and admin new-order emails.
- The six-stage journey table and the attachment-rate metric framing. Hotels already think in these terms.
- The gated playbook as a lead magnet. Cloudbeds proves hoteliers trade contact details for an upsell playbook.

**Beat**
- **Cross-PMS:** UpLayer works whether the booking came from Cloudbeds, another PMS, a channel manager or a portal. Cloudbeds' tool stops at the Cloudbeds reservation.
- **Generated, per-guest offers:** Cloudbeds shows the same manual store to everyone. UpLayer generates a different offer page per guest from booking data (party, length of stay, channel, arrival time, purpose).
- **Two-price payment logic:** prepay at a discount or reserve and pay at arrival at full price, on one page. Cloudbeds has card or room charge with no price difference and no Cloudbeds Payments support.
- **Personalized landing page per guest** instead of a generic store link.
- **Attribution to the CEO's "3x" goal:** report upsell revenue per booking and attachment rate against a pre-UpLayer baseline. Cloudbeds' upsell reporting is thinly documented.
- **Integration path:** the write-back APIs (`postItem`, `postCustomItem`, `postPayment`, webhooks) are open to certified partners. UpLayer can sit on top of Cloudbeds hotels instead of fighting them, and Cloudbeds already lists rivals on its own guide page.

## 9. Sources (all checked 1 October 2026)

- https://www.cloudbeds.com/hotel-guest/upsell/
- https://www.cloudbeds.com/pricing/
- https://www.cloudbeds.com/guest-engagement-software/
- https://www.cloudbeds.com/our-story/
- https://www.cloudbeds.com/partner-with-cloudbeds/
- https://www.cloudbeds.com/marketplace/
- https://www.cloudbeds.com/integrations/oakybyplusgrade/
- https://myfrontdesk.cloudbeds.com/hc/en-us/sections/8699722067483-Cloudbeds-Guest-Experience-Upsell
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/8700069705115-Configure-Cloudbeds-Guest-Experience-Upsell-Products-Categories-and-Design
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/8700119510939-Cloudbeds-Guest-Experience-Post-to-Folio-Integration-With-Cloudbeds-PMS-Reservations
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/8700086119067-Manage-your-Cloudbeds-Guest-Experience-Upsell-Orders
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/8700078695707-Whistle-for-Cloudbeds-Integration-Stripe-for-Upsell-Connection-Guide
- https://myfrontdesk.cloudbeds.com/hc/en-us/articles/19512399011355-Whistle-Global-Messaging-SMS-and-WhatsApp-pricing
- https://developers.cloudbeds.com/v1.2/docs/check-in-upsell-upgrade
- https://developers.cloudbeds.com/docs/webhooks-1
- https://developers.cloudbeds.com/docs/migration-from-oauth-20-to-api-keys-for-technology-partners-optional
- https://integrations.cloudbeds.com/hc/en-us/articles/360006626313-API-Integration-Guide
- https://www.cloudbeds.com/terms/api/
- https://costbench.com/software/hotel-management/cloudbeds/ (third-party price estimate)
- https://www.roommaster.com/blog/cloudbeds-pricing (third-party price estimate)
