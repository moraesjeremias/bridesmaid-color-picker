FROM node:20-alpine AS build
ARG VITE_API_BASE_URL
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV POSTGRES_DB=bridemaid
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_URL=bridesmaid
ENV POSTGRES_PORT=5432
EXPOSE 3000
CMD ["npm", "run", "start"]
