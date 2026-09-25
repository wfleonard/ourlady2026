# eBay-Ready Images

All the image assets you need for the [eBay listing rewrite](../ebay-listing-2026.md), pre-converted to JPG at sizes eBay accepts.

**eBay photo rules to know:**
- Max 24 photos per listing (12 on the free tier)
- 1600×1600 pixels or larger unlocks the zoom feature — recommended
- 12 MB max per image
- JPEG, PNG, TIFF, BMP accepted; **WebP is not**
- First photo becomes the gallery thumbnail — pick the strongest

## Suggested upload order

Load in this order so the listing thumbnail and the first swipe carry the most weight:

| Slot | File | What it shows | Why here |
|------|------|---------------|----------|
| 1 (thumb) | `../../app/public/products/olg-24x36-gold.jpg` (or whichever frame you're selling) | The framed canvas as sold | Gallery thumbnail — the buyer needs to know what they're getting |
| 2 | `detail-face.jpg` | Full face of Our Lady | The one image everyone recognizes |
| 3 | `detail-head-hires.jpg` | Higher-resolution head crop | Proves the fidelity of the image |
| 4 | `detail-hands-hires.jpg` | Hands and the black cross brooch | The famous prayerful-hands detail |
| 5 | `detail-midsection-hires.jpg` | Sash + Nahui Ollin flower | The pregnant-virgin symbolism |
| 6 | `detail-stars.jpg` | Stars on the mantle | Signal detail — most listings never show this |
| 7 | `detail-infant-hires.jpg` | The area around the angel/Christ Child | Another distinctive crop |
| 8 | `detail-gold.jpg` | Gold thread in the robe | Print quality proof |
| 9 | `detail-gold-edging-hires.jpg` | Gold edging showing water damage on the original tilma | Authenticity signal — this is what the actual 500-year-old cloth looks like |
| 10 | `detail-weave.jpg` | Canvas weave detail | Shows the print substrate quality |
| 11 | `certificate-certification.jpg` | Mexican Catholic Church certificate | 1998 Rivera Carrera certification |
| 12 | `certificate-jubileo.jpg` | 2000 Jubileo seal | Second Mexican certificate |

If you have a paid eBay listing with 24 slots, add:
- Back-of-canvas shot showing the stretcher bars
- Corner detail (mitered join on the frame)
- Packaging you'll ship in (tube for rolled, box for framed)
- Scale reference — canvas hanging next to a doorway or on a wall for size sense

## Files in this folder

| File | Size | Source |
|------|------|--------|
| `detail-face.jpg` | 984 KB | published web asset, converted from `app/public/about/detail-face.webp` |
| `detail-stars.jpg` | 1.0 MB | published web asset |
| `detail-gold.jpg` | 695 KB | published web asset |
| `detail-weave.jpg` | 685 KB | published web asset |
| `detail-head-hires.jpg` | 2.6 MB | derived from `images/Our-Lady-Guadalupe-head-2026.png` (14 MB source) |
| `detail-hands-hires.jpg` | 3.2 MB | derived from `images/Our-Lady-Guadalupe-hands-2026.png` (26 MB source) |
| `detail-midsection-hires.jpg` | 914 KB | derived from `images/Our-Lady-Guadalupe-midsection-2026.png` (17 MB source) |
| `detail-infant-hires.jpg` | 2.0 MB | derived from `images/Our-Lady-Guadalupe-infant-2026.png` (28 MB source) |
| `detail-gold-edging-hires.jpg` | 2.4 MB | derived from `images/Our-Lady-Guadalupe-gold-edging-water-damage-2026.png` (24 MB source) |
| `certificate-certification.jpg` | 250 KB | published web asset |
| `certificate-jubileo.jpg` | 150 KB | published web asset |

All are under eBay's 12 MB per-image limit and above 1600 pixels on the long edge, so the zoom feature works.

## Regenerating

If you swap out or add source PNGs in `/images/`, rerun the conversion:

```bash
cd docs/ebay-images && ../../scripts/regen-ebay-images.sh
```

(Script matches the one behind these files — see `scripts/regen-ebay-images.sh`.)
