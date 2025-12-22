# -------- Stage 1: Build the production assets --------
FROM node:20-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies (using ci for reproducibility)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# Copy rest of project files and build production output
COPY . .
RUN npm run build

# -------- Stage 2: Serve static files with nginx --------
FROM nginx:stable-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy production build output from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy a custom nginx config for SPAs (uncomment if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx in foreground (container main process)
CMD ["nginx", "-g", "daemon off;"]
