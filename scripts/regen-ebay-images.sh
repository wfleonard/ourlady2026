#!/bin/bash
# Regenerate the eBay-ready image set from the published web assets and the
# high-resolution source PNGs in /images/. Output lands in docs/ebay-images/.
#
# Run any time source images change:
#   ./scripts/regen-ebay-images.sh
#
# Requires: sips (built into macOS).

set -euo pipefail
cd "$(dirname "$0")/.."

DEST=docs/ebay-images
mkdir -p "$DEST"

echo "▶ Converting published web crops (webp → jpg)..."
for name in face gold stars weave; do
  src="app/public/about/detail-${name}.webp"
  [ -f "$src" ] || { echo "  skip: $src not found"; continue; }
  sips -s format jpeg -s formatOptions 92 "$src" --out "$DEST/detail-${name}.jpg" >/dev/null
  printf "  ✓ %s\n" "$DEST/detail-${name}.jpg"
done

echo "▶ Converting certificate scans..."
for name in certification jubileo; do
  src="app/public/about/${name}.webp"
  [ -f "$src" ] || { echo "  skip: $src not found"; continue; }
  sips -s format jpeg -s formatOptions 92 "$src" --out "$DEST/certificate-${name}.jpg" >/dev/null
  printf "  ✓ %s\n" "$DEST/certificate-${name}.jpg"
done

echo "▶ Downsizing high-res source PNGs to under eBay's 12 MB per-image limit..."
# Long edge capped at 2400px, JPEG quality 90 — still 1600px+ for eBay zoom.
while IFS='|' read -r src out; do
  [ -f "$src" ] || { echo "  skip: $src not found"; continue; }
  sips -Z 2400 -s format jpeg -s formatOptions 90 "$src" --out "$DEST/$out" >/dev/null
  printf "  ✓ %-40s (%s)\n" "$DEST/$out" "$(du -h "$DEST/$out" | cut -f1)"
done <<'EOF'
images/Our-Lady-Guadalupe-head-2026.png|detail-head-hires.jpg
images/Our-Lady-Guadalupe-hands-2026.png|detail-hands-hires.jpg
images/Our-Lady-Guadalupe-midsection-2026.png|detail-midsection-hires.jpg
images/Our-Lady-Guadalupe-infant-2026.png|detail-infant-hires.jpg
images/Our-Lady-Guadalupe-gold-edging-water-damage-2026.png|detail-gold-edging-hires.jpg
EOF

echo "Done."
