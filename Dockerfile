FROM node:22-alpine

RUN apk update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG APP_PORT

ENV PORT=${APP_PORT}

EXPOSE ${APP_PORT}

CMD ["npm", "run", "dev"]