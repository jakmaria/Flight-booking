# Start from the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Add the `package.json` and `package-lock.json` (if available)
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]