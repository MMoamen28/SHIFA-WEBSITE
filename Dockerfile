# Dockerfile
# STAGE 1 — dev dependencies
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN rm -f package-lock.json && npm install
COPY . .

# STAGE 2 — builder
FROM dev AS builder
RUN npm run build

# STAGE 3 — production server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
