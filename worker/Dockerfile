# Worker image — Playwright + Chromium base, non-root, healthcheck.
# Runs via tsx: shared workspace packages export raw TypeScript, so a tsc
# build would need rootDir surgery; tsx resolves them natively.
FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY worker/package.json worker/
COPY packages/shared/package.json packages/shared/
RUN corepack enable && pnpm install --filter worker --filter @uplayer/shared
COPY worker/src worker/src
COPY packages/shared/src packages/shared/src

# non-root (the base image's playwright user owns the browser cache)
USER pwuser

ENV PORT=4310
EXPOSE 4310
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4310)+'/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["pnpm", "--filter", "worker", "exec", "tsx", "src/index.ts"]
