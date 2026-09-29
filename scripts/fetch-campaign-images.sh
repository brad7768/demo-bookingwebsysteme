#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMG="$ROOT/public/images"
mkdir -p "$IMG/hero" "$IMG/services" "$IMG/studio" "$IMG/staff" "$IMG/details"
Q="w=1800&q=86&fit=crop"
dl() { curl -fsSL "$1" -o "$2"; echo "  ok $2"; }

dl "https://images.unsplash.com/photo-1560066984-138dadb4c035?${Q}" "$IMG/hero/hero-salon.jpg"
dl "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1400&q=86&fit=crop" "$IMG/hero/hero-stylist.jpg"

dl "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1400&q=86&fit=crop" "$IMG/services/service-cut.jpg"
dl "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1400&q=86&fit=crop" "$IMG/services/service-color.jpg"
dl "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=86&fit=crop" "$IMG/services/service-balayage.jpg"
dl "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=86&fit=crop&sat=-20" "$IMG/services/service-blowout.jpg"
dl "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=86&fit=crop&crop=entropy" "$IMG/services/service-consultation.jpg"

dl "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=86&fit=crop" "$IMG/studio/studio-interior.jpg"
dl "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&q=86&fit=crop" "$IMG/studio/studio-mirror.jpg"
dl "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=86&fit=crop" "$IMG/studio/studio-products.jpg"

dl "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1000&q=86&fit=crop" "$IMG/staff/emma.jpg"
dl "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1000&q=86&fit=crop" "$IMG/staff/sofia.jpg"
dl "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1000&q=86&fit=crop" "$IMG/staff/mia.jpg"

dl "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=2200&q=88&fit=crop" "$IMG/details/balayage-detail.jpg"
dl "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1800&q=86&fit=crop" "$IMG/details/texture-glow.jpg"

echo "Campaign library ready."
