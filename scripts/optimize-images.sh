#!/usr/bin/env bash
# Makes the web copies of the site's images: WebP, no wider than they're ever
# shown, in src/assets/images/web/. The originals stay where they are (they
# aren't sent to visitors once nothing imports them).
#
#   scripts/optimize-images.sh                      # every image listed below
#   scripts/optimize-images.sh path/to/new.png 1600 # one image, at most 1600 px wide
#
# Needs ffmpeg with libwebp (`ffmpeg -encoders | grep webp`).
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=src/assets/images
OUT=src/assets/images/web
mkdir -p "$OUT"

convert() {
  local file="$1" width="$2"
  local name
  name="$(basename "${file%.*}").webp"
  # Quality 78 looks the same as the original on these photos at a fraction
  # of the size; images are never enlarged.
  ffmpeg -loglevel error -y -i "$file" \
    -vf "scale='min($width,iw)':-2:flags=lanczos" \
    -c:v libwebp -quality 78 -compression_level 6 \
    "$OUT/$name"
  printf '%-34s %6s KB -> %5s KB\n' "$(basename "$file")" "$(( $(stat -c%s "$file") / 1024 ))" "$(( $(stat -c%s "$OUT/$name") / 1024 ))"
}

if [ $# -gt 0 ]; then
  convert "$1" "${2:-1600}"
  exit
fi

# Full-width photos: 1600 px covers a laptop screen and a phone's cropped view.
for f in chill-office rooftop-fuzzy-hd fuzzy-collab final-fuzzy-hero focused-fuzzy convo-fuzzy \
  fuzzy-setup fuzzy-success ping-pong-fuzzy fuzzy-chillin fuzzy-closing fuzzy-work studio-fuzzy \
  fuzzy-web-design home-office-fuzzy funny-maintain fuzzy-automation ai-automations pool-fuzzy fuzzy-squad; do
  convert "$SRC/$f.png" 1600
done
# Shown smaller.
for f in fuzzy-time-2 fuzz_fuzzy; do convert "$SRC/$f.png" 1200; done
for f in fuzzy-web fuzzy-maintenance ai-gameplan strategy-sesh; do convert "$SRC/$f.png" 1000; done
convert "$SRC/Brand/iconik-white-logo.png" 800
