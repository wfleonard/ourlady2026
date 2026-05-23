#!/bin/bash
# ──────────────────────────────────────────────────────────────
# Primos Maternos Store — Server Deploy Script
# Run on a fresh Ubuntu 22.04/24.04 host as root.
#
# Usage:
#   bash deploy.sh
# ──────────────────────────────────────────────────────────────
set -euo pipefail

APP_USER="deploy"
APP_DIR="/opt/primos-store"
REPO="git@github.com:wfleonard/primos-maternos.git"
BRANCH="main"

echo "═══════════════════════════════════════════════"
echo "  Primos Maternos Store — Server Setup"
echo "═══════════════════════════════════════════════"

# System
apt-get update -qq && apt-get upgrade -y -qq

if ! command -v docker &>/dev/null; then
  curl -fsSL https://get.docker.com | sh
fi
apt-get install -y -qq docker-compose-plugin ufw fail2ban git

# Firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3001/tcp comment "Next.js (primos store)"
echo "y" | ufw enable

# User
if ! id "$APP_USER" &>/dev/null; then
  useradd -m -s /bin/bash -G docker "$APP_USER"
else
  usermod -aG docker "$APP_USER"
fi

# Repo
mkdir -p "$APP_DIR"
chown "$APP_USER:$APP_USER" "$APP_DIR"
if [ -d "$APP_DIR/.git" ]; then
  sudo -u "$APP_USER" git -C "$APP_DIR" pull origin "$BRANCH"
else
  if ! sudo -u "$APP_USER" git clone -b "$BRANCH" "$REPO" "$APP_DIR" 2>/dev/null; then
    sudo -u "$APP_USER" git clone -b "$BRANCH" \
      "https://github.com/wfleonard/primos-maternos.git" "$APP_DIR"
  fi
fi

# Env
ENV_FILE="$APP_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  cat > "$ENV_FILE" <<'ENVEOF'
POSTGRES_PASSWORD=CHANGE_ME
STRIPE_SECRET_KEY=sk_live_or_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ENVEOF
  chown "$APP_USER:$APP_USER" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
  echo "  ⚠  Edit $ENV_FILE with real credentials, then re-run this script."
  read -p "  Press Enter after editing (or Ctrl+C to do it later)..."
fi

# Build & start
cd "$APP_DIR"
sudo -u "$APP_USER" docker compose build
sudo -u "$APP_USER" docker compose up -d

# Update helper
cat > /usr/local/bin/pm-update <<'SCRIPT'
#!/bin/bash
set -euo pipefail
cd /opt/primos-store
git pull origin main
docker compose build
docker compose up -d
echo "✓ Updated and restarted"
SCRIPT
chmod +x /usr/local/bin/pm-update

systemctl enable docker

echo ""
echo "═══════════════════════════════════════════════"
echo "  ✓ Setup complete!"
echo "═══════════════════════════════════════════════"
echo "  Store:    http://$(hostname -I | awk '{print $1}'):3001"
echo "  Update:   pm-update"
echo "  Logs:     cd $APP_DIR && docker compose logs -f"
echo ""
