FROM node:20-alpine AS base

WORKDIR /app

ENV NODE_ENV=development \
    NPM_CONFIG_CACHE=/tmp/npm-cache \
    CI=true

COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]