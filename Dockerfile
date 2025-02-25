FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk update

COPY . .

CMD ["npm", "run", "dev"]
