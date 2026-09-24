#!/bin/bash
# Regenerate all email campaign PDFs from their markdown sources.
# Run from docs/email-campaigns/ or from anywhere — it cd's to its own dir.
#
# Requires: pandoc (brew install pandoc) and Google Chrome.
#
# Usage:
#   ./regen-pdfs.sh

set -euo pipefail
cd "$(dirname "$0")"
mkdir -p pdf

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [ ! -x "$CHROME" ]; then
  echo "Google Chrome not found at $CHROME"
  exit 1
fi

CSS_FILE="$(mktemp -t primos-pdf-css.XXXXXX.html)"
trap 'rm -f "$CSS_FILE" /tmp/primos-email-*.html' EXIT
cat > "$CSS_FILE" <<'HTML'
<style>
  @page { size: letter; margin: 0.75in; }
  body { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.55; color: #1c1410; max-width: 6.75in; }
  h1 { font-size: 20pt; border-bottom: 2px solid #8b1538; padding-bottom: 6px; margin-top: 0; color: #8b1538; }
  h2 { font-size: 15pt; margin-top: 28px; color: #8b1538; }
  h3 { font-size: 12pt; margin-top: 20px; }
  hr { border: 0; border-top: 1px solid #ddd; margin: 24px 0; page-break-after: always; }
  code { font-family: "SF Mono", Consolas, monospace; background: #f5f2ec; padding: 1px 4px; border-radius: 3px; font-size: 10pt; }
  pre { background: #f5f2ec; padding: 10px 14px; border-radius: 4px; overflow-x: auto; font-size: 9.5pt; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 4px solid #8b1538; padding-left: 14px; margin-left: 0; color: #4a3833; font-style: italic; }
  table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 10pt; }
  th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
  th { background: #f5f2ec; font-weight: 600; }
  a { color: #8b1538; }
  ul, ol { padding-left: 22px; }
  li { margin-bottom: 4px; }
</style>
HTML

echo "Regenerating PDFs..."
for md in README.md segment-a-guadalupe-parishes.md segment-b-guadalupe-ministries.md \
          segment-c-catholic-schools.md segment-d-diocesan-offices.md \
          holiday-retail-2026.md novena-drip-2026.md; do
  name="${md%.md}"
  html="/tmp/primos-email-${name}.html"
  pdf="pdf/${name}.pdf"
  pandoc "$md" -f markdown -t html5 --standalone --metadata title="$name" -H "$CSS_FILE" -o "$html"
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdf" "file://$html" 2>/dev/null || true
  printf "  ✓ %-45s (%s)\n" "$pdf" "$(du -h "$pdf" | cut -f1)"
done
echo "Done."
