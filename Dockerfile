# Estágio de construção
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Estágio de produção
FROM node:24-bookworm-slim AS runner

WORKDIR /app

ARG APP_PORT

ENV PORT=${APP_PORT}

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./

USER node

EXPOSE ${APP_PORT}

CMD ["npm", "start"]