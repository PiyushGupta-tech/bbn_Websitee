#!/bin/bash
# Run on production as root after deploy
set -euo pipefail
ROOT="${1:-/www/wwwroot/BBNshop}"
mkdir -p "$ROOT/data"
chown -R www:www "$ROOT/data"
chmod 775 "$ROOT/data"
chown -R www:www "$ROOT/api/auth"
echo "OK: $ROOT/data is writable by PHP (www)"
