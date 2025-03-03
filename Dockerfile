# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build:prod

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist/Hayaan /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Create script to replace PORT variable
RUN echo '#!/bin/sh\n\
envsubst "\$PORT" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf\n\
nginx -g "daemon off;"' > /docker-entrypoint.sh && \
chmod +x /docker-entrypoint.sh

# Expose port 8080
EXPOSE 8080

# Start nginx using the entrypoint script
CMD ["/docker-entrypoint.sh"]
