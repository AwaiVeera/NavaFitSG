#!/bin/bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
echo "[start-dev] Working directory: $PROJECT_ROOT"

echo "[start-dev] Fixing permissions..."
chmod -R u+rwX "$PROJECT_ROOT"
if command -v chown >/dev/null 2>&1; then
    chown -R "$(whoami)" "$PROJECT_ROOT" 2>/dev/null || true
fi

echo "[start-dev] Installing dependencies..."
cd "$PROJECT_ROOT"
npm install

echo "[start-dev] Building project..."
if npm run build; then
    echo "[start-dev] Build succeeded. Launching tools..."
    if command -v open >/dev/null 2>&1; then
        open -a "Cursor" "$PROJECT_ROOT" || true
    fi
    echo "[start-dev] Starting preview..."
    npm run preview
else
    echo "[start-dev] Build failed. Exiting gracefully." >&2
    exit 1
fi


















