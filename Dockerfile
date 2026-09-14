# Estágio de construção
FROM node:24-bookworm-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG HOST_API
ENV HOST_API=${HOST_API}

# Repassa HOST_API para NEXT_PUBLIC_HOST_API caso não seja declarada separadamente no build
ARG NEXT_PUBLIC_HOST_API=${HOST_API}
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}

RUN npm run build

# Estágio de produção
FROM node:24-bookworm-slim AS runner

WORKDIR /app

ARG APP_PORT
ARG HOST_API

ENV PORT=${APP_PORT}
# Injeta HOST_API em runtime para Server Components e autenticação Node.js
ENV HOST_API=${HOST_API}
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./

RUN chown -R node:node /app/.next

USER node

EXPOSE ${APP_PORT}

CMD ["npm", "start"]