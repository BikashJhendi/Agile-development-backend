# Set the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]
