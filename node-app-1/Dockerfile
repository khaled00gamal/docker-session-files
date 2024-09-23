# Use the official Node.js image from the Docker Hub
FROM node:14-alpine

RUN npm install -g nodemon

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000


# Command to run the app
CMD ["nodemon", "app.js"]




