FROM node:20.0-alpine
WORKDIR /app/frontend

COPY yarn.lock ./

RUN yarn install
COPY . ./
