FROM node:20-alpine AS build
ARG VITE_API_BASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN VITE_API_BASE_URL=$VITE_API_BASE_URL \
    npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server.js .

EXPOSE 3000
CMD ["npm", "run", "serve"]