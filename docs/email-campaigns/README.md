# Parish Outreach Email Campaigns

Three-email sequence, sent over ~10–12 days, to a 100-contact list of U.S. Catholic parishes and Guadalupe/Hispanic ministries. Segment A runs four emails over 14 days, since it carries the provenance email as well. Links point at **primosmaternos.com/parishes** (the parish-focused landing page), **primosmaternos.com/authenticity** (the certifications in full) or the codex-symbols blog post.

## Segments

Split the list into per-segment tabs (or per-segment Google Sheets) before sending. In Gmail native mail merge (Compose → toggle **Multi-send**), each send draws from one recipient list.

| Segment | Who | File | Lands on |
|---------|-----|------|----------|
| **A** | Parishes and shrines dedicated to Our Lady of Guadalupe (named for her, or her shrine is central) | [segment-a-guadalupe-parishes.md](segment-a-guadalupe-parishes.md) | `/parishes` |
| **B** | Guadalupe / Hispanic ministries at Catholic parishes not named for her | [segment-b-guadalupe-ministries.md](segment-b-guadalupe-ministries.md) | `/parishes` |
| **C** | Catholic schools (K–12) with Hispanic enrollment or a Marian devotional culture | [segment-c-catholic-schools.md](segment-c-catholic-schools.md) | `/schools` |
| **D** | Diocesan offices — chanceries, Hispanic ministry, school superintendents | [segment-d-diocesan-offices.md](segment-d-diocesan-offices.md) | `/dioceses` |
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

Emails use **Gmail native mail merge syntax** — an `@` prefix, all lowercase, no spaces. The column headers in your Google Sheet (or CSV imported into Sheets) must match these names exactly.

A ready-to-fill CSV template with all columns is at [`list-template.csv`](list-template.csv) in this folder — download, open in Google Sheets, add your rows.

All email files below use these merge fields:

| Variable | Example |
|----------|---------|
| `@firstname` | Maria |
| `@parishname` | Our Lady of Guadalupe Parish |
| `@city` | Newark |
| `@state` | NJ |
| `@contactrole` | Hispanic Ministry Coordinator |
| `@guadalupeconnection` | Parish patronage / Guadalupe shrine / Hispanic ministry |

Segment-specific extras (add only for the segment that uses them):

| Variable | Used by | Example |
|----------|---------|---------|
| `@schoolname` | Segment C | St. Ignatius Catholic School |
| `@schoollevel` | Segment C (optional) | K-8 / High School / PK-12 |
| `@diocesename` | Segment D | Diocese of Trenton |
| `@parishcount` | Segment D (optional) | 97 |
| `@lastordersku` | Holiday retail (optional) | 24"×36" Gold Frame |
| `@lastorderyear` | Holiday retail (optional) | 2024 |

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

## Compliance (CAN-SPAM)

Every commercial email needs these in the footer — Gmail multi-send doesn't add them automatically, so include them in the email template you save in Gmail:

- Physical mailing address: **Saxon Enterprises Inc, 15 Shea Ln, Tinton Falls, NJ 07724**
- Clear opt-out — e.g., "Reply UNSUBSCRIBE and I'll take you off the list."
- Honest subject line and from-address (already covered)

The Novena drip and holiday retail are subscriber-consent based (people opted in), so the compliance surface is lower — but include the unsubscribe line anyway.

## After the campaign

Watch three signals over the first 14 days:

1. **Open rate** by segment — Gmail multi-send doesn't track opens natively. If you need per-recipient open tracking, use YAMM (Yet Another Mail Merge) instead — it uses `{{First Name}}`-style tags, which means converting the emails back to `{{Var}}` syntax.
2. **Landing-page traffic** in GA filtered by `utm_campaign=parish-outreach-2026`
3. **Actual orders** — check `orders` table in Postgres for `stripe_payment_intent` records placed by parish emails

If a parish orders, follow up personally with a short thank-you and ask what they're using it for. That's next campaign's testimonial.
