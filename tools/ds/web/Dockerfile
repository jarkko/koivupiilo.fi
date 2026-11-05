# The ds-web image: Playwright's Chromium, axe, Lighthouse CI and the ds-web runner (addendum §5).
# Built locally by ds on first use; never pushed to a registry.
#
# Base pinned by its multi-platform index digest (looked up 2026-10-31 from mcr.microsoft.com,
# tag v1.64.1-noble), so linux/amd64 and linux/arm64 builds each resolve their own image. Keep
# BASE_IMAGE in src/web/image.ts in step; a test checks it.
FROM mcr.microsoft.com/playwright:v1.64.1-noble@sha256:47b510dd9230bf0b9bfc9b20102241e577ea7a99334ab4c3ca19f19770e9b8ea

WORKDIR /opt/ds-web
ENV NODE_ENV=production \
    NPM_CONFIG_UPDATE_NOTIFIER=false

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund

COPY ds-web.mjs ./
