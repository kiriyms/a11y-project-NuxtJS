# --- Stage 1: Build the app ---
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the Nuxt app
RUN npm run build

# --- Stage 2: Run the app ---
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the built output and necessary files
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the Nuxt port
EXPOSE 3000

# Default environment
ENV NODE_ENV=production

# Start the Nuxt server
CMD ["node", ".output/server/index.mjs"]
