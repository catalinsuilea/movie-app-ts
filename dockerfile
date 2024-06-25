# Stage 1: Build the React application
FROM node:16 AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

COPY .env.production ./.env.production

# Build the React app
RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates
COPY ssl /etc/nginx/ssl

# Expose port 8080 and 443
EXPOSE 8080
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
