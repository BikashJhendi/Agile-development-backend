# Set the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
