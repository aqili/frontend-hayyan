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
FROM node:18-alpine

WORKDIR /app

# Copy built assets from build stage
COPY --from=build /app/dist/Hayaan ./dist/Hayaan
COPY --from=build /app/server.js ./
COPY --from=build /app/package.json ./

# Install production dependencies
RUN yarn install --production

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
