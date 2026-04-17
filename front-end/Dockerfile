# build stage
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

# serve pakai nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html