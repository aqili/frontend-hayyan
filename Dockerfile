# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Build the app (removed the flag from build command)
RUN npm run build || (echo "Build failed" && cat /app/.npm/_logs/*-debug.log && exit 1)

# Serve stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist/frontend-hayyan/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
