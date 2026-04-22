# Stage 1: Build the Vue frontend
FROM node:24-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and build the application
COPY . .
RUN npm run build

# Stage 2: Serve the frontend using NGINX
FROM nginx:alpine

# Copy the custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
