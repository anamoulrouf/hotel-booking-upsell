# Minimal worker image — hardened in M2 (non-root user, healthcheck).
FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY worker/package.json worker/
COPY packages/shared/package.json packages/shared/
RUN corepack enable && pnpm install --filter worker --filter @uplayer/shared
COPY worker/src worker/src
COPY packages/shared/src packages/shared/src

ENV PORT=4310
EXPOSE 4310
CMD ["pnpm", "--filter", "worker", "start"]
