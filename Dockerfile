# syntax=docker/dockerfile:1

FROM node:16.20.1 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm ci --prod

FROM node:16.20.1
USER node:node
WORKDIR /app
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json .
CMD ["node","build"]