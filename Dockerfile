FROM node:19.0-alpine
WORKDIR /app/frontend

COPY . ./

RUN apk add build-base
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN yarn install
