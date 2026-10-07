# Straiv

Competitor research for the UpLayer AI-personalized hotel upsell platform. Checked 1 October 2026.

## 1. What it is

Straiv GmbH (formerly CODE2ORDER, rebranded 2022) is a Stuttgart, Germany SaaS company founded in 2015 that sells a modular "digital guest journey" suite: online check-in and check-out, digital registration form, self-service kiosk, digital door opening, digital payment, AI-assisted guest messaging, a digital concierge with an AI chatbot, and upselling. Upselling is one module inside the check-in flow, not a standalone product. It sells to independent hotels, hotel groups and chains, and serviced apartments, explicitly "from budget to five-star" per its Benelux reseller. It claims "over 3,400 hotels in 30 countries" (vendor reported), 62 employees from 20 nations as of April 2025 (vendor reported), and is self-funded. The core market is DACH: of 98 Hotel Tech Report reviews with a country listed, 76 are Germany, 11 Switzerland, 5 Austria (counted). Expansion: The Fold Group became official Benelux reseller in January 2026, and a third party (LeadIQ) reports a France office opening in February 2026 (not confirmed on straiv.io). Reviewed properties range from 25-49 room boutiques and hostels to a 500+ room property, with "Small" the largest size bucket (39 reviews, counted).

## 2. Features

| Area | What Straiv does | Source |
|---|---|---|
| Upsell vs cross-sell types | Upsell: higher room category or upgrade. Cross-sell: breakfast, parking (including EV spots priced differently), early check-in, late check-out, "individual extras". Blog examples also mention spa, restaurant dinner, airport transfer, sparkling wine, picnic basket. A large-hotel reviewer wants a "larger selection of upsell categories". | Upselling page, upselling blog posts, HTR |
| Channels | Upsells appear mainly inside the web check-in (smartphone web app, no app download) and the Digital Concierge web app. Guest Messaging sends via email, SMS and WhatsApp (one inbox) and can carry check-in links and "seasonal offers". Self-service kiosk for on-site check-in and payment. | Upselling, Guest Messaging, Digital Concierge pages, Apaleo store |
| Timing triggers | "Offers appear at the ideal time during the digital check-in process" (one-pager). Messaging is event-driven off PMS booking status, for example "2 days before arrival, on the day of departure". Post-stay email 2 days after departure with rebooking offer (CLOUD N°7 case). No dedicated upsell-only campaign scheduler found. | One-pager PDF, Guest Messaging FAQ, CLOUD N°7 story |
| Personalization and AI | Upselling: rule-based "segmentation" so offers target "certain target groups and points in the guest journey"; hotel can "create individual offers for specific guest profiles, like loyalty members" and "prioritize certain categories for promotion". No AI in upsell selection, pricing or copy was found. AI exists elsewhere: Messaging Hub drafts and translates replies (30+ languages), Digital Concierge AI chatbot (50+ languages). | Upselling FAQ, upselling blog, Guest Messaging, Digital Concierge |
| Payment options | Guest pays on smartphone via integrated payment (Apple Pay, Google Pay, PayPal, cards) or charge to the room account in the PMS. Hotel sets whether payment is optional or mandatory, can pre-authorize amounts and take deposits or full prepayment before arrival. No "pay upfront for a discount vs pay at arrival full price" choice for upsells found. | Upselling FAQ, Digital Payment page |
| Merchant of record | Not stated. Payments run through the hotel's own PSP or PMS payment (Adyen, Planet, Nexi, Computop, Worldline, Apaleo Pay, ASA Pay, ibelsaPay) and post to the PMS folio, which implies the hotel is merchant of record (inference, not confirmed). | Digital Payment page, Tech Partners |
| Auto vs manual approval | Described as "fully automated", "processed digitally 24/7 without burdening the front office". Bookings sync to the PMS automatically. No manual approval queue found. | Upselling page |
| Inventory checks | Yes. Two-way PMS integration so parking and upgrades "are only offered when they are actually available". Early check-in and late check-out "only appear when the system reports a genuine vacancy" and "only when a clean room is available". Parking inventory synced in real time to avoid overbooking. | Upselling page, upselling blog |
| Admin panel, what a hotel configures | Hotel configures images, text and prices per offer, segmentation rules, which categories to promote, time windows (for example breakfast minimum booking times, flexible check-in/out times), multiple parking offers, branding per property, central multi-property templates. HTR reviewers note "setup options have grown, overall navigation and configuration have become more complex" and ask for a backend mobile app. | Upselling FAQ, upselling blog, Guest Messaging, HTR |
| Analytics | Straiv Analytics Dashboard (2026): hero KPIs are Digital Check-in Rate, Upsell Revenue, Guest Satisfaction Score; upsell view shows most-booked services, conversion rate of services offered during check-in, monthly revenue trends; messaging funnel with open rates by channel; estimated staff hours saved. Rollout gated to "customers with suitable PMS interfaces". HTR AI review summary says hotels "want ... better reporting". | Analytics blog, HTR |
| Integrations, PMS | Apaleo, ASA, Casablanca, Guestline, ibelsa, Infor, Mews, Oracle OPERA Cloud, Oracle Suite 8, Protel Cloud, Protel on Premise, Sihot, Shiji Daylight (13 counted). Locks: Assa Abloy, Dormakaba, Häfele, Hotek, Messerschmitt, Onity, SAG, Salto. Payments: Adyen, Apaleo Pay, ASA Pay, Computop, ibelsaPay, Planet, Worldline, Nexi. Kiosk/key: keyBoy, Kiosk Embedded Systems. No channel manager or booking portal integration found. | Tech Partners page |

## 3. Pricing and model

| Item | Price | Source |
|---|---|---|
| Upselling module | 5 percent commission "only on add-ons and upgrades that are actually sold". "If you don't generate any additional revenue, you don't pay anything." | https://straiv.io/en/solutions/upselling |
| Check-in/out | "starting at" 2.5 EUR per room per month (online registration, integrated payment, mobile door opening) | https://store.apaleo.com/apps/straiv |
| Guest Messaging | "starting at" 1 EUR per room per month | https://store.apaleo.com/apps/straiv |
| Digital Concierge | "starting at" 1 EUR per room per month | https://store.apaleo.com/apps/straiv |
| Other packages | "price on request" | https://store.apaleo.com/apps/straiv |
| Public pricing page | Not found (https://straiv.io/en/pricing returns 404) | checked |
| Setup fee | Not found. Setup "is performed once by an expert team" (Digital Payment FAQ), fee not stated | https://straiv.io/en/solutions/digital-payment |
| Free trial | Not found. Entry is a sales demo | https://straiv.io/en/demo |
| HTR price positioning | "priced in line with the average product in the category" | Hotel Tech Report |

Model: per-room monthly subscription for the guest journey modules, plus a 5 percent success commission on upsell revenue. Upselling runs inside check-in, so in practice it requires the check-in module subscription (inference).

## 4. Claims and metrics

| Claim | Label | Where |
|---|---|---|
| "On average, 30% of all breakfast offerings are booked directly through Straiv" | vendor reported | Upselling page, problem-to-profit blog |
| Automated parking offers convert at 60% | vendor reported | Upselling page |
| Partner hotels "currently generate an average of €1,000 in additional revenue per month with Straiv" | vendor reported | Upselling page |
| 5% commission on sold upsells | vendor reported (pricing) | Upselling page |
| Zeitwohnhaus: breakfast bookings up 20% through automated "Fancy some breakfast?" prompts; "significant additional revenue" for parking (not quantified) | vendor reported | Zeitwohnhaus success story |
| Over 3,400 hotels in 30 countries | vendor reported | Homepage, About |
| 11+ years of industry expertise | vendor reported | Homepage |
| 98% customer satisfaction | vendor reported | Homepage, 10th anniversary post |
| 4.8 out of 5 (homepage badge) | vendor reported | Homepage |
| More than 500 Apaleo installs | vendor reported | Apaleo store listing |
| Save up to 40 working hours per week at the front desk | vendor reported | Guest Messaging, Independent Hotels |
| ROI "in under 12 months" for independent hotels | vendor reported | Independent Hotels page |
| 70% of guests at their independent hotels check in before arrival; mobile check-in adoption "over 70%" | vendor reported | Independent Hotels, Online Check-in |
| Digital check-in rate "over 80%" achievable | vendor reported | About |
| Save up to 10 minutes per guest; up to 2 hours a day on check-in | vendor reported | Online Check-in, Independent Hotels |
| 99.96% system uptime | vendor reported | Independent Hotels |
| WhatsApp open rates up to 98% vs email 20 to 25% | vendor reported | Guest Messaging FAQ |
| H24 Hotels: completed pre-check-ins incl. payment up around 50%; savings equal to 8 to 10 employees for a 24/7 front desk | vendor reported (customer quote) | Online Check-in |
| CLOUD N°7: about 70% of arrivals handled digitally, 4 min saved per traveler, 167 minutes saved daily at 50 arrivals | vendor reported | CLOUD N°7 story |
| Zeitwohnhaus: digital check-in 70 to 90% | vendor reported | Zeitwohnhaus story |
| Avaneo: 80% digital rate; Estrel: around 80% online check-ins, 900 daily check-ins and check-outs; Tauern Spa: 60% pre-check-in | vendor reported | Success stories |
| HTR: 4.7 overall from 99 reviews; Ease of Use 4.7, Support 4.7, ROI 4.4, Implementation 4.6; HT Score 76 | third-party platform rating | Hotel Tech Report |
| HTR rating split: 86 Excellent, 8 Very Good, 3 Average, 1 Terrible | counted | Hotel Tech Report |

## 5. Landing page teardown (https://straiv.io/en/solutions/upselling)

- Hero headline (word for word): "Automatically increase ancillary revenue along the guest journey"
- Eyebrow: "Upselling in Hotels"
- Subhead (word for word): "No more missed opportunities at check-in: With Straiv, you can turn simple overnight stays into lucrative stays. Our intelligent Upselling software for hotels offers guests upgrades and services exactly when they're ready to buy - fully automated, digital, and seamlessly integrated into your PMS."

Section order:

1. Hero with "Book a Demo" in nav
2. Logo bar, "Those who offer more, earn more / These hotels are already turning hospitality into additional revenue": Das Schlafwerk, Bollwerk, Cocoon, Coffee Fellows Hotels (4 logos, counted)
3. Benefits grid, "Every guest is a potential upsell": increase hotel revenue, full PMS integration, dynamic availability, fully automated revenues, secure payment processing, positioning product diversity
4. Problem section, "Why You Can No Longer Afford to Do Without Upselling and Cross-Selling", with downloadable "Upselling benefits overview" one-pager PDF
5. "Measurable Results Instead of Gut Feelings": Breakfast Booster 30%, Parking Guarantee 60%, Risk-Free Performance 5% commission and EUR 1,000 per month, CTA "Book an Upselling Demo Now"
6. "Strategic Distinction: Upselling vs. Cross-Selling", CTA "Read the blog post and learn more"
7. "Customized Upselling for Every Hotel Model": owner-operated, chains, serviced apartments, CTA "Book a Personal Consultation"
8. FAQs (5 questions: definition, what can be sold, real-time availability, customization, pricing, PMS integrations)
9. Newsletter signup, footer

| Element | Finding |
|---|---|
| CTAs | "Book a Demo", "Book an Upselling Demo Now", "Book a Personal Consultation", "Read the blog post and learn more", "Sign up for the newsletter" |
| Proof | 4 customer logos, 3 headline stats, no testimonial on the upselling page itself (quotes appear on other pages) |
| Calculator | None on the page (HTR hosts a room-count price estimator, not Straiv) |
| Demo | Sales demo form asking for current tech stack, no self-serve product tour or video on the upselling page |
| Lead magnet | 2-page "Upselling benefits overview" PDF; site-wide e-books (Kiosk e-book, German-only system migration e-book) and white papers |
| Free trial | Not found |
| Guarantee | No formal guarantee. "Risk-Free Performance" framing: pay 5% only on sales. "Parking Guarantee" is a stat label, not a guarantee |
| Tone | Practical, operational, German B2B. Leads with staff shortage and front-desk relief as much as revenue. Calm, not hype |

## 6. Hook, guarantee and lead magnet

- Hook: zero-risk commission pricing, "If you don't generate any additional revenue, you don't pay anything", paired with "the system costs practically pay for themselves".
- Second hook: labor relief, upsells sell themselves without front-desk staff, framed against staff shortages.
- Guarantee: none formal. Risk reversal is purely the pay-on-success commission.
- Lead magnets: upselling one-pager PDF, Kiosk e-book, migration e-book, white papers, monthly newsletter, personal demo.
- Bundle logic: the upsell module is pitched as a reason to adopt check-in, and existing customers can "request" the upselling module from inside their account.

## 7. Weaknesses and gaps

From reviews (Hotel Tech Report, https://hoteltechreport.com/guest-experience/contactless-checkin/straiv):

| Quote | Reviewer |
|---|---|
| HTR AI summary: hotels "want stronger upselling, better reporting, more stable backend/admin tools, and broader mobile/kiosk support" | AI summary of all reviews on HTR |
| Wants a "Larger selection of upsell categories" | IT Project Coordinator, 500+ rooms, Germany |
| "setup options have grown, overall navigation and configuration have become more complex" | Project Leader, 75-99 rooms, Switzerland |
| Needs "Group arrivals and digital group registration form" and "Digital registration form as an attachment in Opera Cloud" | IT Project Coordinator, 500+ rooms, Germany |
| "A faster communication via WhatsApp would be great, without having to use another messaging program" | Hotelier, 25-49 rooms, Germany |
| Steep learning curve, wants a "simpler introduction to various functions" | Hoteldirektor, 75-99 rooms, Switzerland |
| "design of the guest app could use a refresh" | CEO, 25-49 rooms, Germany |
| "would like to have a mobile app for the backend" | COO, 50-74 rooms, Germany |
| Wants to "make QR code for check-in available for other check-in machines" | Manager, 25-49 rooms, Germany |

Capterra, G2, Trustpilot: no Straiv listing found (Trustpilot straiv.io returns 404, G2 blocked, Capterra search returned nothing).

Missing features:

- No AI in upselling. Personalization is manual segmentation rules; no per-guest generated offer, copy, bundle or price.
- No dedicated pre-arrival upsell campaign with its own landing page. Offers live inside the check-in flow, so a guest who skips online check-in sees no offer.
- No pay-now-discount vs pay-at-arrival choice for add-ons.
- Narrow catalog: breakfast, parking, upgrades, early/late. Experiences and third-party partners are only in blog examples.
- No upsell pricing optimization, A/B testing or dynamic pricing found.
- PMS only. No channel manager or OTA/portal data source, so it depends on supported PMS.
- Upselling is not sold standalone in practice; it rides on the check-in subscription.
- Headline result is small: EUR 1,000 per month average per hotel (vendor reported).
- DACH-centric; English and German only on Apaleo listing.

## 8. What UpLayer should copy, and where UpLayer can beat them

Copy:

- The pay-on-success commission framing ("you don't pay anything if you don't sell") as risk reversal.
- Hard inventory checks against the PMS so early check-in, late check-out, parking and upgrades only show when available.
- Simple, concrete per-category stats on the landing page (breakfast take rate, parking conversion) rather than vague uplift claims.
- Upsell revenue as a hero KPI in the dashboard, plus top-sold services and conversion by offer.
- Breadth of PMS connectors as a trust signal; list them by name.
- Property-type sections (independent, chain, serviced apartment).

Beat them:

- AI-generated per-guest offers (bundle, copy, imagery, price) vs Straiv's manual segment rules. HTR reviewers already ask for "stronger upselling".
- Standalone pre-arrival offer email/SMS with its own landing page, independent of whether the guest does online check-in.
- The pay-upfront-at-discount vs pay-at-arrival choice, which Straiv does not offer for add-ons.
- Booking data from PMS, channel manager or portal, not PMS only.
- Outcome framing: Straiv's own average is EUR 1,000 per month (vendor reported). A credible "triple your upsell revenue" target is a clear contrast, but UpLayer has no proof yet and must not claim it as a result.
- Upsell-only product, no requirement to buy a check-in suite, and faster setup with a simpler admin than reviewers describe.
- Markets outside DACH, where Straiv is thin.

## 9. Sources

All checked 1 October 2026.

- https://straiv.io/en/solutions/upselling
- https://straiv.io/media/pages/loesungen/upselling/23b8c83051-1781167841/onepager_upselling_en_0626.pdf
- https://straiv.io/en/
- https://straiv.io/en/pricing (404)
- https://straiv.io/en/tech-partners
- https://straiv.io/en/solutions/digital-payment
- https://straiv.io/en/solutions/guest-messaging
- https://straiv.io/en/solutions/online-check-in-hotel
- https://straiv.io/en/solutions/digital-concierge
- https://straiv.io/en/property-type/independent-hotels
- https://straiv.io/en/about-us
- https://straiv.io/en/demo
- https://straiv.io/en/success-stories
- https://straiv.io/en/success-stories/zeitwohnhaus-90-digital-check-in-rate
- https://straiv.io/en/success-stories/cloud-n7
- https://straiv.io/en/success-stories/estrel-berlin
- https://straiv.io/en/success-stories/avaneo-hotel-marktredwitz
- https://straiv.io/en/success-stories/tauern-spa-zell-am-see-kaprun
- https://straiv.io/en/success-stories/das-schlafwerk
- https://straiv.io/en/success-stories/meiser-hotels
- https://straiv.io/en/success-stories/empire-riverside
- https://straiv.io/en/blog/analytics-dashboard
- https://straiv.io/en/blog/all-about-straiv-upselling-for-hotels
- https://straiv.io/en/blog/from-problem-to-profit-source-upselling-as-a-solution
- https://straiv.io/en/blog/upselling-in-your-hotel-the-digital-sales-booster
- https://straiv.io/en/blog/straiv-celebrates-10th-anniversary
- https://straiv.io/en/white-papers
- https://store.apaleo.com/apps/straiv
- https://hoteltechreport.com/guest-experience/contactless-checkin/straiv
- https://hotelvak.eu/en/hoteltech/structural-upselling-increases-revenue-per-guest/
- https://leadiq.com/c/straiv/5a1ddb9d2300005b00e951d7 (search snippet only, France office claim)
- https://www.trustpilot.com/review/straiv.io (404, no listing)
- https://www.g2.com/products/straiv/reviews (blocked, not found)
