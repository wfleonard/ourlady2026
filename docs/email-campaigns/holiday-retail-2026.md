# Holiday Retail Campaign — Advent + December 12

Four-email sequence for the retail customer list, spread from mid-November through the December 12 feast day. Sends past buyers and newsletter subscribers to the new [`/gifts`](https://primosmaternos.com/gifts) landing page.

**Segment target:** anyone in your OpenMoves list who is NOT a parish/school (parishes get a different sequence). If you don't have prior-buyer segmentation yet, one blast to everyone is fine — the copy reads for both prospects and past customers.

**Send window:** Nov 12 → Dec 10, four sends. Skip the first email if you're kicking this off after Nov 12.

---

## Personalization variables

Same base as the parish campaigns, minus the parish-specific fields:

| Variable | Example |
|----------|---------|
| `{{FirstName}}` | Elena |
| `{{City}}` | San Antonio |
| `{{State}}` | TX |

Optional, if you have prior-buyer data:

| Variable | Example |
|----------|---------|
| `{{LastOrderYear}}` | 2024 |
| `{{LastOrderSKU}}` | 24"×36" Gold Frame |

---

## UTM tracking

```
?utm_source=openmoves&utm_medium=email&utm_campaign=holiday-2026&utm_content=<email-number>
```

Emails below use these tags already.

---

## Email 1 — "Order early for December 12"

**Send:** Wednesday, Nov 12 (mid-morning, Eastern)

**Subject:** Order by Dec 4 for December 12 delivery

**Preview text:** The Guadalupe canvas gift guide is up. Framed, rolled, and gallery wrap — from $57.

**Body:**

Dear {{FirstName}},

Two devotional dates are coming up faster than you'd think.

- **December 12** — the feast of Our Lady of Guadalupe
- **December 3–11** — the traditional Novena leading into it

If you're planning to give the tilma canvas as a gift for the feast, or to have it on your own wall for the Novena, the earlier you order the better. Last order date for **December 12 delivery is December 4**. For **Christmas delivery, December 17**. For **Three Kings Day, December 30**.

The full gift guide is up:

[**See the gift guide →**](https://primosmaternos.com/gifts?utm_source=openmoves&utm_medium=email&utm_campaign=holiday-2026&utm_content=1)

Eight SKUs, from a $57 gallery wrap to a $324 large rolled canvas, with five framed 24"×36" options in the middle at $214. All Church-authorized, printed in Mexico from the original tilma scan, certificate of authenticity, free U.S. shipping.

Thanks,
Peace Bill

William F. Leonard
Saxon Enterprises, Inc. — dba Primos Maternos
Tinton Falls, NJ

---

## Email 2 — Post-Thanksgiving gift-guide push

**Send:** Monday, Nov 30 (morning, Eastern — Cyber Monday)

**Subject:** For the person who already has "everything Guadalupe"

**Preview text:** Three price bands, six recipients, one image. And it's not "Cyber Monday" copy.

**Body:**

Dear {{FirstName}},

No discount code. No "Cyber Monday" panic.

Just this: the canvas is Church-authorized, printed in Mexico from a high-resolution scan of the original tilma, and it lasts. The 24"×36" framed at $214 is the piece most people give — ready to hang the moment it's unwrapped, five frame styles to match the recipient's home.

Some ideas for who to give it to:

- Grandparents or parents with roots in Mexico or Latin America
- A newlywed couple's first apartment (the $57 gallery wrap fits any wall)
- A godchild at confirmation
- A pastor's rectory or a religious sister's cell
- The family member who hosts the Dec 12 celebration every year

[**Pick a canvas →**](https://primosmaternos.com/gifts?utm_source=openmoves&utm_medium=email&utm_campaign=holiday-2026&utm_content=2)

Order by Dec 4 for December 12 delivery.

Thanks,
Peace Bill

---

## Email 3 — Novena reminder

**Send:** Tuesday, Dec 2 (morning, Eastern — day before Novena begins)

**Subject:** The Novena starts tomorrow

**Preview text:** Nine days of prayer for the four apparitions, leading into the December 12 feast. A short read on the story if you're new to it.

**Body:**

Dear {{FirstName}},

Tomorrow — Wednesday, December 3 — the traditional Novena to Our Lady of Guadalupe begins. Nine days of prayer, one for each of the four apparitions to Juan Diego and the one to Juan Bernardino, leading into the feast day on December 12.

If you'd like a short read on the apparition itself — what actually happened at Tepeyac in 1531, what the roses on the frozen hilltop meant — we published a piece on the site:

[**Read: The Sign on the Tilma →**](https://primosmaternos.com/blog/apparition?utm_source=openmoves&utm_medium=email&utm_campaign=holiday-2026&utm_content=3a)

And if a canvas ordered by this Thursday (Dec 4) is still on the list, it arrives in time to be part of the Novena and the feast:

[**See the gift guide →**](https://primosmaternos.com/gifts?utm_source=openmoves&utm_medium=email&utm_campaign=holiday-2026&utm_content=3b)

Thanks,
Peace Bill

---

## Email 4 — Last call for the feast

**Send:** Wednesday, Dec 10 (morning, Eastern)

**Subject:** Last call for a December 12 canvas

**Preview text:** Order by end of day tomorrow to have it in time for the feast.

**Body:**

Dear {{FirstName}},

Short one.

December 4 was the recommended order date for guaranteed December 12 arrival, but we can usually squeeze in one more day. **If you order by end of day Thursday, Dec 11, we'll do our best to get a rolled canvas or gallery wrap to you before Friday's feast** — no promises on framed pieces at this point.

The Jubilee Year for Our Lady of Guadalupe that opened in Mexico City on October 12 runs a full year — through October 12, 2027. If the canvas doesn't get to you before December 12, it still lands in the middle of a Jubilee year of grace.

[**Order for December 12 →**](https://primosmaternos.com/gifts?utm_source=openmoves&utm_medium=email&utm_campaign=holiday-2026&utm_content=4)

Christmas order deadline is Dec 17. Three Kings Day is Dec 30.

Thanks and a blessed Advent to you.

Peace Bill

William F. Leonard
Saxon Enterprises, Inc. — dba Primos Maternos

---

## Notes for future improvement

- **Gift shipping to a different address:** Stripe Checkout collects one shipping address per order. Customers giving a gift may want it shipped to the recipient — right now they use the "shipping different from billing" flow in Stripe Checkout. Works, but "Ship as a gift" copy on the /gifts page could make this clearer. Not blocking.
- **Gift notes / gift wrap:** neither is currently offered. If demand shows up in feedback, add a Stripe custom field for a gift note on the checkout. Not blocking.
- **Segment past-buyers vs prospects:** past buyers can get a slightly different Email 1 ("thanks for last year's order, here's what's new"). Nothing has been segmented yet — flag if worth doing before send.
