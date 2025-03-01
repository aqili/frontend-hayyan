# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Show installed packages and attempt build with verbose logging
RUN npm list || true && \
    npm run build --verbose || (echo "Build failed with error:" && npm run build --verbose)

# Serve stage
FROM nginx:alpine

# Copy built assets
# Update this path based on your project name and Angular version
COPY --from=builder /app/dist/*/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
