# Booking Upsell Report: Data Test on The Dolli

Test of section 4 of `industries/travel/upsell/booking-upsell-report-brief.md` against https://www.thedolli.com/, run 2 October 2026.

Method: crawled 11 public pages on the hotel's website plus its booking engine page, then ran 3 Google searches in Chrome.

Result: 9 of the 10 data points in the brief collected, plus about 15 more. The hotel is in Athens, Greece, so the tool would disqualify it from the US ICP. This was a test of what the tool can read.

---

## 1. The brief's 10 data points

| # | Data point | Found | Value | Source |
|---|---|---|---|---|
| 1 | Name, address, city | Yes | Grecotel The Dolli at Acropolis, Mitropoleos 49, Athens 105 56, Greece. Phone +30 2160047000. Map coordinates 37.9760, 23.7288 | schema.org `Hotel` markup on the homepage |
| 2 | Star rating | Yes | 5 stars | Booking.com listing via Google. Not stated on the hotel's own site |
| 3 | Room count | Yes | 46 rooms, suites and apartments, across 13 room types | "The Story" page; matched by an Escape Australia review |
| 4 | Brand | Yes | Logo, photo library, WordPress site (theme "LuxeLodge"), 5 languages: English, Greek, French, German, Russian | Homepage and schema.org markup |
| 5 | Booking engine | Yes | WebHotelier, a Greek booking engine, at reservethedolli.grecotel.com. Sells hotel plus flight packages (thedolli.hotelwithflight.com) and has a Privilege Club loyalty code | Booking page code |
| 6 | Likely PMS | No | Grecotel's group PMS is not public. Protel is likely in the Greek market, unconfirmed | Google |
| 7 | Upsell or guest tools in use | Yes, none | No Oaky, Chekin, Duve, UpsellGuru or similar. Uses The Hotels Network (booking conversion widget, not an upsell tool) | Homepage and booking page code |
| 8 | Packages already offered | Yes | Over 20 sellable items, listed in section 3 | 11 pages: FAQ, dining, experiences, pool and gym, shop, events and others |
| 9 | Add-ons in the booking flow | Partly | The booking page mentions "extras" 6 times. A second request returned HTTP 403, so the extras step could not be confirmed | Booking page |
| 10 | Mobile quality | Not run | Needs a headless browser, part of the v1 build | None |

## 2. Additional data points

| Data point | Value | Source |
|---|---|---|
| Room types (13) | Bijou Room, Antique Bijou Room, Athenian Room, Balcony Athenian Room, Deluxe Room, Balcony Deluxe Room, Grand Deluxe Room, Junior Suite, Metropolis Junior Suite, Luxury Junior Suite, Acropolis Junior Suite, Acropolis Luxury Junior Suite, Apartments and Pied a Terre | Accommodation page |
| Guest ratings | Booking.com 9.4 (242 reviews), Expedia 9.8 (176), Tripadvisor 4.8 (176), Trip.com 9.7 (42) | Google results |
| Price | Trip.com "From $1,220" a night. Tripadvisor price range $$$ | Google results |
| Owner and group | Grecotel S.A., a Greek hotel group. Also listed under Grecotel Hotels and Resorts | Website footer, LinkedIn |
| Staff | About 56 employees | RocketReach (third party, estimate) |
| Buyer | General Manager: Mary Karassouli (since January 2023). Resident Manager: George Vournazos | LinkedIn, Kiran Robinson blog (2023), GTP Headlines (October 2025) |
| Check-in and check-out | 15:00 and 11:00 | schema.org markup |
| Payment at booking | Prepayment required. A secure payment link is emailed after the booking; bank transfer also accepted | FAQ |
| Payment at hotel | Visa, Amex, Mastercard, UnionPay, Discover, JCB, Diners, debit, cash (under €500). Euros only | FAQ |
| Direct booking parity | Same offers and benefits by website, email or phone | FAQ |
| Breakfast | Included in every booking (Signature Breakfast at Dolli's Rooftop Restaurant) | FAQ |
| Not available | No traditional spa, no kids club, no business centre or meeting room, no in-house salon, no complimentary shuttle | FAQ |
| Facilities | Rooftop infinity pool (in-house guests only), 24-hour gym, 24-hour sauna, rooftop restaurant, bars, library, pool lounge | Pool and gym, dining, FAQ |
| Dining outlets | Dolli's Rooftop Restaurant (lunch, dinner), Dolli's Thursdays, The Maestro Table, Le Salon (patisserie), Le Bar Secret, Library (all day), Pool Lounge | Dining page |
| Press and awards | Condé Nast Traveller Best Hotel in Greece 2024, Prix Versailles 2024 Special Prize for an Exterior, No. 1 City Hotel in Athens (LinkedIn post, about August 2026); press links to Michelin, Vogue, FT, The Times, Travel and Leisure, Town and Country | Story page, homepage links, LinkedIn |
| Location context | 500 m from the Acropolis, 35 km from Athens airport, 5 minutes' walk from Monastiraki metro, 12 km from Piraeus port | FAQ |
| Online shop | Yes, with prices: notebooks €10 to €30, the Dolli Bag and scarves | Shop page |
| Robots.txt | Only `/wp-admin/` blocked; crawling public pages is allowed | robots.txt |

## 3. Sellable packages found

None has a price or a buy button on the website. Every item is arranged by email or phone with the concierge.

| Group | Package | Detail from the site |
|---|---|---|
| Stay | Early check-in | Not guaranteed; the site suggests booking an extra night |
| Stay | Late checkout | "Different options with applicable charges", confirmed at reception the day before |
| Stay | Extra bed | Metropolis Junior Suite only, child up to 11 |
| Arrival | Private airport transfer | Sedan, SUV or minivan, booked through the concierge |
| Arrival | Valet parking | Extra charge, advance notice needed |
| Food and drink | Private dinner | In a suite, outdoor space or unique setting |
| Food and drink | The Maestro Table | Listed under dining and experiences |
| Food and drink | Special occasion table | Bookable for celebrations |
| Food and drink | Breakfast box | For early flights, on request |
| Food and drink | 24-hour room service | Available |
| Family | Babysitting | Extra charge, advance notice |
| Family | Kids' menu and baby food | On request |
| Wellness | Personal training | Coaches on request |
| Wellness | In-room wellness, nearby spa access | Arranged by the hotel |
| Experiences | Acropolis tours | The Short and Sweet Tour (3 hours), The Detailed Tour, Acropolis Private Site Tour, NYX at the Acropolis Museum (exclusive) |
| Experiences | Art tours | The Collector's Tour, Bespoke Art Tours, Hydra Art Trip |
| Experiences | Adventures | Olympian Fitness, rock climbing with Acropolis views, sea kayaking at the Athenian Riviera and the Temple of Poseidon, diving at Sounio, Aegean Odyssey, Skyward Bound |
| Experiences | Boat and helicopter trips | Boat trips to the coast and islands; helicopter excursions over Athens |
| Experiences | The Dolli Wonderland, The Pied a Terre Experience | Listed as signature experiences |
| Events | Event spaces | "One-of-a-kind event spaces" page |

## 4. What the report would show

| Section | Result |
|---|---|
| Upsell score | About 45, grade D (estimate). Packages exist: high. Sellable online: low, no prices or buy buttons. Pre-arrival reach: none, no upsell tool. Presentation: photos and descriptions, no prices. Personalization: minimal. Mobile: not tested |
| Main finding | "You have over 20 things guests would buy, from transfers to helicopter flights. Every one of them needs an email to the concierge." |
| Missed revenue (brief's current formula) | 46 rooms x 65% x 365 / 2.2 nights = about 4,960 bookings a year. x 8% to 15% x USD 95 = about USD 38,000 to 71,000. Too low for this hotel; see learning 1 |
| Fit | Perfect prospect profile, wrong country. Disqualified from the US ICP |

## 5. Learnings for the brief

1. **Spend per booking must scale with price.** USD 95 per buying booking (Revinate) undercounts a USD 1,220 a night hotel selling private dinners and helicopter trips. Scale spend by price band, using the star rating and the OTA price.
2. **Detect what is already included.** Breakfast is included in every booking here, so the tool must read the FAQ and rate pages and drop included items from the package ideas.
3. **Booking engines block crawlers.** WebHotelier returned HTTP 403 after one request. The crawler needs a real browser, a polite rate and a fallback to the engine's known capabilities.
4. **OTA listings are the best source for stars, ratings and price.** The tool needs a Google search step, through a search API or browser search.
5. **Add "payment link after booking" as a trigger.** A hotel that emails a payment link by hand after booking already does the pre-arrival payment step manually. It is a strong outreach angle.
6. **Extend the booking engine list.** Add WebHotelier and other regional engines. Run the same test on 3 to 5 US hotels to confirm the main US engines.
