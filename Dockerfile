# Estágio de construção
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Declare os ARGs que o Docker vai receber de fora
ARG NEXT_PUBLIC_HOST_API
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}

RUN npm run build

# Estágio de produção
FROM node:24-bookworm-slim AS runner

WORKDIR /app

ARG APP_PORT=3000

ENV PORT=${APP_PORT}
ENV HOSTNAME="0.0.0.0"

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE ${APP_PORT}

CMD ["node", "server.js"]