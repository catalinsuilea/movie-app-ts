FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3001
EXPOSE 3001

# Run the React app when the container launches
CMD ["npm", "start"]