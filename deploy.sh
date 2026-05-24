#!/bin/bash
# ──────────────────────────────────────────────────────────────
# Primos Maternos Store — Server Deploy Script
# Run on a fresh Ubuntu 22.04/24.04 host as root.
#
# Sets up:
#   - Docker + Compose
#   - UFW firewall
#   - Caddy reverse proxy with auto-HTTPS for primosmaternos.com
#   - App stack (Postgres + Next.js) via docker compose
#   - /usr/local/bin/pm-update helper for "git pull + restart"
#
# Usage:
#   bash deploy.sh
# ──────────────────────────────────────────────────────────────
set -euo pipefail

APP_USER="deploy"
APP_DIR="/opt/primos-store"
REPO="git@github.com:wfleonard/ourlady2026.git"
REPO_HTTPS="https://github.com/wfleonard/ourlady2026.git"
BRANCH="main"
DOMAIN="primosmaternos.com"

echo "═══════════════════════════════════════════════"
echo "  Primos Maternos Store — Server Setup"
echo "  Domain: $DOMAIN"
echo "═══════════════════════════════════════════════"

# ── 1. System & deps ──────────────────────────────────────────
apt-get update -qq && apt-get upgrade -y -qq

if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi
apt-get install -y -qq docker-compose-plugin ufw fail2ban git curl debian-keyring debian-archive-keyring apt-transport-https

# ── 2. Caddy (reverse proxy + auto-TLS) ───────────────────────
if ! command -v caddy &>/dev/null; then
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
    | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
    | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -qq
  apt-get install -y -qq caddy
fi

# ── 3. Firewall ───────────────────────────────────────────────
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp   comment "Caddy HTTP (ACME challenge)"
ufw allow 443/tcp  comment "Caddy HTTPS"
# Note: 3001 stays internal — Caddy proxies it
echo "y" | ufw enable

# ── 4. Deploy user ────────────────────────────────────────────
if ! id "$APP_USER" &>/dev/null; then
  useradd -m -s /bin/bash -G docker "$APP_USER"
else
  usermod -aG docker "$APP_USER"
fi

# ── 5. Clone repo ─────────────────────────────────────────────
mkdir -p "$APP_DIR"
chown "$APP_USER:$APP_USER" "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  sudo -u "$APP_USER" git -C "$APP_DIR" pull origin "$BRANCH"
else
  if ! sudo -u "$APP_USER" git clone -b "$BRANCH" "$REPO" "$APP_DIR" 2>/dev/null; then
    echo "  SSH clone failed — falling back to HTTPS"
    sudo -u "$APP_USER" git clone -b "$BRANCH" "$REPO_HTTPS" "$APP_DIR"
  fi
fi

# ── 6. .env ───────────────────────────────────────────────────
ENV_FILE="$APP_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<ENVEOF
POSTGRES_PASSWORD=CHANGE_ME
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://$DOMAIN
ENVEOF
  chown "$APP_USER:$APP_USER" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
  echo ""
  echo "  ⚠  Edit $ENV_FILE with real credentials before continuing:"
  echo "     nano $ENV_FILE"
  read -p "  Press Enter after editing (or Ctrl+C to do it later)..."
fi

# ── 7. Caddyfile ──────────────────────────────────────────────
cat > /etc/caddy/Caddyfile <<CADDYEOF
$DOMAIN, www.$DOMAIN {
    encode zstd gzip
    reverse_proxy 127.0.0.1:3001
}
CADDYEOF
systemctl reload caddy || systemctl restart caddy
systemctl enable caddy

# ── 8. Build & start app stack ────────────────────────────────
cd "$APP_DIR"
sudo -u "$APP_USER" docker compose build
sudo -u "$APP_USER" docker compose up -d

# ── 9. pm-update helper ───────────────────────────────────────
cat > /usr/local/bin/pm-update <<'SCRIPT'
#!/bin/bash
set -euo pipefail
cd /opt/primos-store

echo "▶ Pulling latest from git..."
git pull origin main

echo "▶ Building app image..."
docker compose build

echo "▶ Restarting containers..."
docker compose up -d

echo "▶ Re-applying catalog seed (idempotent: upserts products, soft-deletes removed)..."
# Wait for postgres to be ready before applying seed
for i in {1..15}; do
  if docker compose exec -T postgres pg_isready -U primos -d primos_store >/dev/null 2>&1; then
    break
  fi
  sleep 1
done
docker compose exec -T postgres psql -U primos -d primos_store < db/init.sql >/dev/null

echo "✓ Updated, restarted, catalog synced"
SCRIPT
chmod +x /usr/local/bin/pm-update

systemctl enable docker

# ── 10. Done ──────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════"
echo "  ✓ Setup complete!"
echo "═══════════════════════════════════════════════"
echo ""
echo "  Site:        https://$DOMAIN"
echo "  Update:      pm-update"
echo "  App logs:    cd $APP_DIR && docker compose logs -f"
echo "  Caddy logs:  journalctl -u caddy -f"
echo ""
echo "  Next steps:"
echo "    1. Point DNS A records for $DOMAIN and www.$DOMAIN at this server's IP"
echo "    2. Wait a couple minutes — Caddy will auto-issue Let's Encrypt certs"
echo "    3. Add the Stripe webhook endpoint: https://$DOMAIN/api/webhooks/stripe"
echo "       and paste its signing secret into $APP_DIR/.env, then run pm-update"
echo ""
