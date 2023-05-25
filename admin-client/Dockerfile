FROM node:18-alpine AS builder

WORKDIR /app

ARG ARG_NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_API_BASE_URL=$ARG_NEXT_PUBLIC_API_BASE_URL

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN  yarn build

FROM node:18-alpine

WORKDIR /app

ARG ARG_NODE_ENV="production"
ARG ARG_PORT=3000

ENV NODE_ENV="production"
ENV PORT=$ARG_PORT

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY prod-server.js ./

RUN yarn install --production

EXPOSE $PORT

CMD [ "yarn", "start" ]
