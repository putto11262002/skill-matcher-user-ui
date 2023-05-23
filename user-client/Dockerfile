
FROM node:18 AS builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:18-alpine


WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY prod-server.js ./

RUN yarn install --production

CMD [ "yarn", "start" ]
