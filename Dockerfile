# Build stage
FROM node:20-alpine as builder

# Install necessary build tools
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies with legacy-peer-deps and verbose logging
RUN npm install --legacy-peer-deps --verbose

# Copy the rest of the application
COPY . .

# Try to build with more detailed output
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build || \
    (echo "Build failed. Showing npm logs:" && \
     cat npm-debug.log || true && \
     cat /root/.npm/_logs/*-debug.log || true && \
     exit 1)

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist/*/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
