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

# Define build arguments for SSL certificates
ARG SSL_CERT_MOVIE_FULLCHAIN
ARG SSL_CERT_MOVIE_PRIVKEY
ARG SSL_CERT_API_FULLCHAIN
ARG SSL_CERT_API_PRIVKEY
ARG SSL_DHPARAMS

# Create the SSL directories
RUN mkdir -p /etc/nginx/ssl/movie-pilot-app /etc/nginx/ssl/api-movie-pilot-app /etc/nginx/ssl/dhparams

# Write the SSL certificates to the appropriate files
RUN echo "$SSL_CERT_MOVIE_FULLCHAIN" > /etc/nginx/ssl/movie-pilot-app/fullchain.pem
RUN echo "$SSL_CERT_MOVIE_PRIVKEY" > /etc/nginx/ssl/movie-pilot-app/privkey.pem
RUN echo "$SSL_CERT_API_FULLCHAIN" > /etc/nginx/ssl/api-movie-pilot-app/fullchain-api.pem
RUN echo "$SSL_CERT_API_PRIVKEY" > /etc/nginx/ssl/api-movie-pilot-app/privkey-api.pem
RUN echo "$SSL_DHPARAMS" > /etc/nginx/ssl/dhparams/ssl-dhparams.pem

# Set permissions
RUN chmod -R 600 /etc/nginx/ssl

# Expose port 80 and 443
EXPOSE 80
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
