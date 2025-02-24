FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk update && apk add git

COPY . .

CMD ["npm", "run", "dev"]
