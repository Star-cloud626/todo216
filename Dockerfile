FROM node:16.14.0-alpine

WORKDIR /app

COPY ./src/backend/package.json .
COPY ./src/backend/package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]