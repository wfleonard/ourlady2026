# Parish Outreach Email Campaigns

Three-email sequence, sent over ~10–12 days, to a 100-contact list of U.S. Catholic parishes and Guadalupe/Hispanic ministries. Every link points at **primosmaternos.com/parishes** (the parish-focused landing page) or the codex-symbols blog post.

## Segments

Split your CSV into two OpenMoves lists before sending:

| Segment | Who | File | Lands on |
|---------|-----|------|----------|
| **A** | Parishes and shrines dedicated to Our Lady of Guadalupe (named for her, or her shrine is central) | [segment-a-guadalupe-parishes.md](segment-a-guadalupe-parishes.md) | `/parishes` |
| **B** | Guadalupe / Hispanic ministries at Catholic parishes not named for her | [segment-b-guadalupe-ministries.md](segment-b-guadalupe-ministries.md) | `/parishes` |
| **C** | Catholic schools (K–12) with Hispanic enrollment or a Marian devotional culture | [segment-c-catholic-schools.md](segment-c-catholic-schools.md) | `/schools` |
| **Retail — Holiday** | Individual customers + newsletter subscribers, Nov–Dec 2026 | [holiday-retail-2026.md](holiday-retail-2026.md) | `/gifts` |

Same 3-email cadence, different opening framing per segment. Segment C uses the schools-specific landing page and emphasizes bulk pricing for outfitting multiple classrooms.

## Cadence

| Email | Day | Subject direction | Purpose |
|-------|-----|-------------------|---------|
| 1 | Day 0 (Tue or Wed) | Authenticity + offer | Introduce Primos Maternos, name the price, land the CTA |
| 2 | Day 4 | Symbolism of the image | Give value (blog post), no hard sell |
| 3 | Day 10 | Parish use cases | Concrete ways to use it, final CTA |

Send Tuesday/Wednesday mornings, Eastern time. Avoid Mondays and Fridays.

## Personalization variables

The CSV should include these OpenMoves merge fields. All emails below use them.

| Variable | Example |
|----------|---------|
| `{{FirstName}}` | Maria |
| `{{ParishName}}` | Our Lady of Guadalupe Parish |
| `{{City}}` | Newark |
| `{{State}}` | NJ |
| `{{ContactRole}}` | Hispanic Ministry Coordinator |
| `{{GuadalupeConnection}}` | Parish patronage / Guadalupe shrine / Hispanic ministry |

If any field is missing for a row, either fill a sensible default in the CSV or exclude the row from that send — an email that says `Dear ,` is worse than no email.

## UTM tracking

Append UTM parameters to every link so Google Analytics on primosmaternos.com attributes the traffic to the campaign:

```
?utm_source=openmoves&utm_medium=email&utm_campaign=parish-outreach-2026&utm_content=<segment>-<email-number>
```

Segments A and B use `utm_campaign=parish-outreach-2026`. Segment C uses `utm_campaign=school-outreach-2026` (separate campaign so schools traffic doesn't co-mingle with parish traffic in GA).

Examples:
```
https://primosmaternos.com/parishes?utm_source=openmoves&utm_medium=email&utm_campaign=parish-outreach-2026&utm_content=a-1
https://primosmaternos.com/schools?utm_source=openmoves&utm_medium=email&utm_campaign=school-outreach-2026&utm_content=c-1
```

The email files below already include the UTM-tagged URLs.

## Compliance

Include a physical mailing address and unsubscribe link in the footer of every email — OpenMoves handles both automatically, but confirm the template has them turned on before sending.

## After the campaign

Watch three signals over the first 14 days:

1. **Open rate** by segment — if Segment A opens noticeably better than B, next campaign leans on that framing
2. **Landing-page traffic** in GA filtered by `utm_campaign=parish-outreach-2026`
3. **Actual orders** — check `orders` table in Postgres for `stripe_payment_intent` records placed by parish emails

If a parish orders, follow up personally with a short thank-you and ask what they're using it for. That's next campaign's testimonial.
