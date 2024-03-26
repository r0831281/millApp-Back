# Use a Node.js base image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN ng build --configuration=production

# Use Nginx base image for serving the Angular app
FROM nginx:alpine

# Copy the built Angular app files from the builder stage to the Nginx directory
COPY --from=builder /app/dist/inventory-front/browser /usr/share/nginx/html

# Expose port 80 (default port for HTTP)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
