FROM node:20.0-alpine
WORKDIR /app/frontend

COPY package.json ./
RUN npm install 
COPY . ./
